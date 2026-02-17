<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Services\SmsService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Propaganistas\LaravelPhone\PhoneNumber;

class RegisterController extends Controller
{

    public function register(Request $request, SmsService $smsService)
    {
        $validated = $request->validate([
            'user_type' => 'required|string|max:20',
            'tax_id' => 'required|string|min:9|max:50',
            'name' => 'required|string|max:30',
            'phone_country'  => 'required|string',
            'phone'          => 'required|phone:phone_country|unique:users,phone',
            'email' => 'required|email|unique:users,email,max:255',
            'password' => 'required|string|min:6|confirmed',
        ]);

        $phone = new PhoneNumber($request->phone, 'GE');

        if (User::where('phone', $phone->formatE164())->exists()) {
            return back()->withErrors(['phone' => __('controller-messages.phone_exists')]);
        }

        // Generate OTP
        $otp = $smsService->generateOtp(6); // 6-digit code

        session([
            'register_data' => [
                'user_type' => $validated['user_type'],
                'tax_id' => $validated['tax_id'],
                'name' => $validated['name'],
                'phone_country' => $validated['phone_country'],
                'phone' => $phone,
                'email' => $validated['email'] ?? null,
                'password' => $validated['password'], // hash later
            ],
            'otp' => $otp,
            'otp_expires_at' => now()->addMinutes(15),
        ]);

        session(['phone' => $phone]);

        $result = $smsService->sendOtp($phone, $otp);

        if ($result['success']) {
            return to_route('register.verify-phone.show')->with([
                'success' => __('controller-messages.verification_code_sent')
            ]);
        }

        return back()->with('error', $result['message']);
    }

    public function resendCode(SmsService $smsService)
    {
        $phone = session('phone');

        $result = $this->sendSMS($phone, $smsService);

        if ($result['success']) {
            return back()->with('message', __('controller-messages.verification_code_sent'));
        }

        return back()->withErrors(['message' =>  $result['message']]);
    }
    public function verifyCode(Request $request)
    {
        $request->validate([
            'otp' => 'required|string|size:6',
        ]);

        $otp = session('otp');

        $otpExpiresAt = session('otp_expires_at');
        $registerData = session('register_data');

        if (!$otp || !$registerData) {
            return back()->withErrors(['message' => __('controller-messages.session_expired')]);
        }

        // Check expiration
        if (now()->greaterThan($otpExpiresAt)) {
            session()->forget(['otp', 'otp_expires_at', 'register_data']);
            return back()->withErrors(['message' => __('controller-messages.verification_code_expired')]);
        }

        // Check code
        if ($otp !== $request->otp) {
            return back()->withErrors(['message' => __('controller-messages.invalid_verification_code')]);
        }

        // Create user after successful verification
        $user = User::create([
            'user_type' => $registerData['user_type'],
            'tax_id' => $registerData['tax_id'],
            'name' => $registerData['name'],
            'phone_country' => $registerData['phone_country'],
            'phone' => $registerData['phone'],
            'email' => $registerData['email'],
            'password' => Hash::make($registerData['password']),
            'phone_verified_at' => now(),
        ]);

        $custEndpoint = 'Customers?$filter=VAT_Registration_No eq '."'".$user->tax_id."'";

        $bcCustomer = $this->bcService->getCustomer($custEndpoint);

        if(empty($bcCustomer['value'])) {
            $this->addCustomerToBC($user);
        } else {
            $user->bc_customer_no = $bcCustomer['value'][0]['No'];
            $user->save();
        }

        Auth::login($user);
        $request->session()->regenerate();

        // Clear session data
        session()->forget(['otp', 'otp_expires_at', 'phone', 'register_data']);

        return to_route('account.index');
    }
}
