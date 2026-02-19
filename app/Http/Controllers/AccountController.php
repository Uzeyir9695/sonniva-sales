<?php

namespace App\Http\Controllers;

use App\Jobs\UpdateBusinessCentralCustomer;
use App\Models\User;
use App\Services\BusinessCentralService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class AccountController extends Controller
{
    protected $bcService;
    public function __construct(BusinessCentralService $bcService)
    {
        $this->bcService = $bcService;
    }

    public function index()
    {
        $user = Auth::user();

        return Inertia::render('account/Index', [
            'user' => $user,
        ]);
    }
    public function changePassword(Request $request)
    {
        $request->validate([
            'current_password' => 'required|string',
            'password' => 'required|string|min:6|confirmed',
        ]);

        $user = auth()->user();

        if (Hash::check($request->current_password, $user->password)) {
            $user->fill(['password' => Hash::make($request->password)])->save();
        } else {
            return back()->withErrors(['message' => __('Current password is incorrect.')]);
        }

        Auth::logout();

        // regenerate CSRF token
        $request->session()->regenerateToken();

        inertia()->clearHistory();

        return to_route('login')->with(['message' => __('Password changed successfully. Please log in again.')]);
    }

    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            'user_type' => 'required_if:user_type,individual,legal_entity|string',
            'name'      => 'required|string|max:30',
            'is_handyman' => 'required',
            'lastname'  => 'required_if:user_type,individual|max:30',
            'phone_country'  => 'required|string',
            'phone'     => 'required|string|min:9|max:13|unique:users,phone,' . $user->id,
            'email'     => 'required|email|unique:users,email,' . $user->id,
            'tax_id' => 'required|string|max:30',
            'address'   => 'nullable|string|max:100',
        ],
        [
            'lastname.required_if' => __('The lastname field is required when user type is individual.'),
        ]);

        $user->update($validated);
        $user->refresh();

        $payload = [
            'Address' => $user->address ?? '',
            'Address_2' => '',
            'City' => $user->city ?? '',
            'Phone_No' => $user->phone,
            'E_Mail' => $user->email?? 'Email not provided',
            'Prices_Including_VAT' => true,
            'VAT_Registration_No' => $user->tax_id,
            'Gen_Bus_Posting_Group' => 'DOMESTIC',
            'Customer_Posting_Group' => 'DOMESTIC'
        ];

        $endpoint = "Customers(No='{$user->bc_customer_no}')";

        $userId = $user->id;

        UpdateBusinessCentralCustomer::dispatch($userId, $payload, $endpoint)->afterCommit();

        return back()->with('message', __('Account updated successfully!'));
    }
}
