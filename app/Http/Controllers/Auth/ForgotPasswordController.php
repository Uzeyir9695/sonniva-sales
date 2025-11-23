<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Services\SmsService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Propaganistas\LaravelPhone\PhoneNumber;

class ForgotPasswordController extends Controller
{
    public function showForgetPasswordForm()
    {
        return Inertia::render('auth/ForgotPassword');
    }

    public function showFPVerifyPhone()
    {
        return Inertia::render('auth/ForgotPasswordVerifyPhone', [
            'success' => __('controller-messages.verification_code_sent')
        ]);
    }

    public function showResetPasswordForm()
    {
        return Inertia::render('auth/ResetPassword');
    }

    public function sendVerificationCode(Request $request, SmsService $smsService)
    {
        $request->validate([
            'phone_country'  => 'required|string',
            'phone' => 'required|phone:phone_country',
        ]);

        $phone = new PhoneNumber($request->phone, 'GE');

        if (!User::where('phone', $phone->formatE164())->exists()) {
            return back()->withErrors(['phone' => 'This phone number is not registered.']);
        }

        session([
            'phone' => $phone,
        ]);

        $result = $this->sendSMS($phone, $smsService);

        if ($result['success']) {
            return to_route('forgot-password.verify-phone.show')->with('message', __('controller-messages.verification_code_sent'));
        }

        return back()->withErrors(['message' =>  $result['message']]);
    }

    public function resendCode(SmsService $smsService)
    {
        $phone = session('phone');

        $result = $this->sendSMS($phone, $smsService);

        if ($result['success']) {
            return back()->with('message', __('controller-messages.verification_code_resent'));
        }

        return back()->withErrors(['message' =>  $result['message']]);
    }

    public function sendSMS($phone, $smsService)
    {
        $otp = $smsService->generateOtp(6);

        session([
            'otp' => $otp,
            'otp_expires_at' => now()->addMinutes(5),
        ]);

        $result = $smsService->sendOtp(phoneNumber: $phone, code: $otp,);

        return $result;
    }

    public function verifyCode(Request $request)
    {
        $request->validate([
            'otp' => 'required|string|size:6',
        ], [
            'otp.required' => 'The OTP code is required.',
            'otp.size' => 'The OTP code must be 6-digit.',
        ]);

        $otp = session('otp');
        $otpExpiresAt = session('otp_expires_at');

        if (!$otp) {
            return back()->withErrors(['message' => __('controller-messages.session_expired')]);
        }
        // Check expiration
        if (now()->greaterThan($otpExpiresAt)) {
            session()->forget(['otp', 'otp_expires_at']);
            return back()->withErrors(['message' => __('controller-messages.verification_code_expired')]);
        }

        // Check code
        if ($otp !== $request->otp) {
            return back()->withErrors(['message' => __('controller-messages.invalid_verification_code')]);
        }

        // Clear session data
        session()->forget(['otp', 'otp_expires_at', 'phone']);

        return to_route('forgot-password.reset.show');
    }

    public function resetPassword(Request $request)
    {
        $request->validate([
            'phone' => 'required|numeric|exists:users',
            'password' => 'required|string|min:6|confirmed',
        ]);

        User::where('phone', $request->phone)->update(['password' => Hash::make($request->password)]);

        return to_route('login')->with(['message' => __('controller-messages.password_changed')]);
    }
}
