<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Jobs\UpdateBusinessCentralCustomer;
use App\Models\User;
use App\Services\Account\DeleteAccountService;
use App\Services\BusinessCentralService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;
use Propaganistas\LaravelPhone\PhoneNumber;

class AccountController extends Controller
{
    public function __construct(protected BusinessCentralService $bcService) {}

    public function show(Request $request): JsonResponse
    {
        $user = $request->user();

        return response()->json([
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'lastname' => $user->lastname,
                'email' => $user->email,
                'phone' => $user->phone,
                'tax_id' => $user->tax_id,
                'address' => $user->address,
                'user_type' => $user->user_type,
            ],
        ]);
    }

    /**
     * Mirrors the user-editable half of the web AccountController::update() —
     * the admin-only permission checkboxes (can_view_wholesales, is_handyman,
     * etc.) are a separate admin-panel concern and deliberately not exposed
     * here. Always operates on the token's own user (no {user} route param),
     * so there's no cross-account edit surface to guard against.
     */
    public function update(Request $request): JsonResponse
    {
        $user = $request->user();

        $phoneChanged = $request->input('phone') !== $user->getRawOriginal('phone');

        $validated = $request->validate([
            'user_type' => 'nullable|string|in:individual,legal_entity',
            'name' => 'required|string|max:30',
            'lastname' => 'required_if:user_type,individual|max:30',
            'phone' => ['required', 'string', ...($phoneChanged ? ['phone:'.$user->phone_country] : [])],
            'email' => 'nullable|email|unique:users,email,'.$user->id,
            'tax_id' => ['required', 'string', 'max:30', Rule::when($request->input('tax_id') !== $user->tax_id, [
                Rule::unique(User::class, 'tax_id')->ignore($user->id),
            ])],
            'address' => [$user->role === 'admin' ? 'nullable' : 'required', 'string', 'max:100'],
        ], [
            'tax_id.required' => __($user->user_type === 'individual' ? 'The ID number is required.' : 'The tax id is required.'),
            'lastname.required_if' => __('The lastname field is required for the individual users.'),
            'tax_id.unique' => __('This tax ID is already registered to another customer.'),
        ]);

        if ($phoneChanged) {
            $phone = new PhoneNumber($validated['phone'], $user->phone_country);

            if (User::where('phone', $phone->formatE164())->whereKeyNot($user->id)->exists()) {
                throw ValidationException::withMessages(['phone' => __('This phone number is already registered.')]);
            }
        }

        // BC rejects a customer update outright if the VAT number is already claimed by a
        // different customer record - check for that up front instead of letting the queued
        // sync job fail silently after "updated successfully" has already been shown.
        if ($validated['tax_id'] !== $user->tax_id && $user->bc_customer_no) {
            try {
                $vatCheckEndpoint = "Customers?\$filter=VAT_Registration_No eq '".$validated['tax_id']."'";
                $bcCustomer = $this->bcService->getCustomer($vatCheckEndpoint);

                if (! empty($bcCustomer['value']) && $bcCustomer['value'][0]['No'] !== $user->bc_customer_no) {
                    return response()->json([
                        'message' => __('This tax ID is already registered to another customer.'),
                        'errors' => ['tax_id' => [__('This tax ID is already registered to another customer.')]],
                    ], 422);
                }
            } catch (\Exception) {
                // BC unreachable - don't block the local profile update over a transient
                // failure, the queued sync job below will retry and log as before.
            }
        }

        if (($validated['user_type'] ?? $user->user_type) === 'legal_entity') {
            $validated['lastname'] = null;
        }

        $user->update($validated);
        $user->refresh();

        $payload = [
            'Address' => $user->address ?? '',
            'Address_2' => '',
            'Phone_No' => $user->phone,
            'E_Mail' => $user->email ?? '',
            'Prices_Including_VAT' => true,
            'VAT_Registration_No' => $user->tax_id,
            'Gen_Bus_Posting_Group' => 'DOMESTIC',
            'Customer_Posting_Group' => 'DOMESTIC',
        ];

        $endpoint = "Customers(No='{$user->bc_customer_no}')";

        UpdateBusinessCentralCustomer::dispatch($user->id, $payload, $endpoint)->afterCommit();

        return response()->json(['message' => 'Account updated successfully!']);
    }

    /**
     * Revokes every token instead of the web flow's session logout, so all
     * of the user's devices are signed out the same way a password change
     * signs out every browser session on web.
     */
    public function changePassword(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'current_password' => 'required|string',
            'password' => 'required|string|min:6|confirmed',
        ]);

        $user = $request->user();

        if (! Hash::check($validated['current_password'], $user->password)) {
            return response()->json([
                'message' => __('Current password is incorrect.'),
                'errors' => ['current_password' => [__('Current password is incorrect.')]],
            ], 422);
        }

        $user->update(['password' => Hash::make($validated['password'])]);
        $user->tokens()->delete();

        return response()->json(['message' => 'Password changed successfully. Please log in again.']);
    }

    public function destroy(Request $request, DeleteAccountService $deleteAccount): JsonResponse
    {
        $validated = $request->validate([
            'password' => 'required|string',
        ]);

        $user = $request->user();

        if (! Hash::check($validated['password'], $user->password)) {
            return response()->json([
                'message' => __('Current password is incorrect.'),
                'errors' => ['password' => [__('Current password is incorrect.')]],
            ], 422);
        }

        if ($deleteAccount->hasActiveOrders($user)) {
            return response()->json([
                'message' => __('You have orders in progress. You can delete your account once they are completed.'),
            ], 409);
        }

        $deleteAccount->delete($user);

        return response()->json(['message' => __('Your account has been deleted.')]);
    }
}
