<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Jobs\UpdateBusinessCentralCustomer;
use App\Services\BusinessCentralService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

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

        $validated = $request->validate([
            'user_type' => 'required_if:user_type,individual,legal_entity|string',
            'name' => 'required|string|max:30',
            'lastname' => 'required_if:user_type,individual|max:30',
            'phone' => 'required|string|min:9|max:13|unique:users,phone,'.$user->id,
            'email' => 'required|email|unique:users,email,'.$user->id,
            'tax_id' => 'required|string|max:30',
            'address' => 'nullable|string|max:100',
        ], [
            'tax_id.required' => $user->user_type === 'individual' ? 'The ID number is required.' : 'The tax id is required.',
            'lastname.required_if' => 'The lastname field is required for the individual users.',
        ]);

        // BC rejects a customer update outright if the VAT number is already claimed by a
        // different customer record - check for that up front instead of letting the queued
        // sync job fail silently after "updated successfully" has already been shown.
        if ($validated['tax_id'] !== $user->tax_id && $user->bc_customer_no) {
            try {
                $vatCheckEndpoint = "Customers?\$filter=VAT_Registration_No eq '".$validated['tax_id']."'";
                $bcCustomer = $this->bcService->getCustomer($vatCheckEndpoint);

                if (! empty($bcCustomer['value']) && $bcCustomer['value'][0]['No'] !== $user->bc_customer_no) {
                    return response()->json([
                        'message' => 'This tax ID is already registered to another customer.',
                        'errors' => ['tax_id' => ['This tax ID is already registered to another customer.']],
                    ], 422);
                }
            } catch (\Exception) {
                // BC unreachable - don't block the local profile update over a transient
                // failure, the queued sync job below will retry and log as before.
            }
        }

        $user->update($validated);
        $user->refresh();

        $payload = [
            'Address' => $user->address ?? '',
            'Address_2' => '',
            'City' => $user->city ?? '',
            'Phone_No' => $user->phone,
            'E_Mail' => $user->email ?? 'Email not provided',
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
                'message' => 'Current password is incorrect.',
                'errors' => ['current_password' => ['Current password is incorrect.']],
            ], 422);
        }

        $user->update(['password' => Hash::make($validated['password'])]);
        $user->tokens()->delete();

        return response()->json(['message' => 'Password changed successfully. Please log in again.']);
    }
}
