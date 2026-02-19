<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Services\ForgotPasswordService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ForgotPasswordController extends Controller
{
    protected ForgotPasswordService $forgotPasswordService;

    public function __construct(ForgotPasswordService $forgotPasswordService)
    {
        $this->forgotPasswordService = $forgotPasswordService;
    }

    /*
    |--------------------------------------------------------------------------
    | Show Forms
    |--------------------------------------------------------------------------
    */

    public function showForgetPasswordForm()
    {
        return Inertia::render('auth/ForgotPassword');
    }

    public function showFPVerifyPhone()
    {
        return Inertia::render('auth/ForgotPasswordVerifyPhone', [
            'success' => __('Verification code sent. Please check you phone!')
        ]);
    }

    public function showResetPasswordForm()
    {
        return Inertia::render('auth/ResetPassword');
    }

    /*
    |--------------------------------------------------------------------------
    | Step 1 — Send OTP
    |--------------------------------------------------------------------------
    */

    public function sendVerificationCode(Request $request)
    {
        $request->validate([
            'phone_country' => 'required|string',
            'phone'         => 'required|phone:phone_country',
        ]);

        $phone = $this->forgotPasswordService->formatPhone($request->phone, $request->phone_country);

        if (!$this->forgotPasswordService->phoneExists($phone)) {
            return back()->withErrors(['phone' => 'This phone number is not registered.']);
        }

        $result = $this->forgotPasswordService->generateAndSendOtp($phone);

        if (!$result['success']) {
            return back()->withErrors(['message' => $result['message']]);
        }

        // Store in session for web flow
        session([
            'phone'          => $phone,
            'otp'            => $result['otp'],
            'otp_expires_at' => now()->addMinutes(5)->toDateTimeString(),
        ]);

        return to_route('forgot-password.verify-phone.show')->with('message', $result['message']);
    }

    /*
    |--------------------------------------------------------------------------
    | Step 2 — Resend OTP
    |--------------------------------------------------------------------------
    */

    public function resendCode()
    {
        $phone = session('phone');

        if (!$phone) {
            return back()->withErrors(['message' => __('Session expired. Please try resend code.')]);
        }

        $result = $this->forgotPasswordService->generateAndSendOtp($phone);

        if (!$result['success']) {
            return back()->withErrors(['message' => $result['message']]);
        }

        // Refresh OTP in session
        session([
            'otp'            => $result['otp'],
            'otp_expires_at' => now()->addMinutes(5)->toDateTimeString(),
        ]);

        return back()->with('message', __('Verification code resent. Please check your phone!'));
    }

    /*
    |--------------------------------------------------------------------------
    | Step 3 — Verify OTP
    |--------------------------------------------------------------------------
    */

    public function verifyCode(Request $request)
    {
        $request->validate([
            'otp' => 'required|string|size:6',
        ], [
            'otp.required' => 'The OTP code is required.',
            'otp.size'     => 'The OTP code must be 6-digit.',
        ]);

        $phone = session('phone');

        $verification = $this->forgotPasswordService->verifyOtpFromSession(
            sessionOtp:       session('otp'),
            sessionExpiresAt: session('otp_expires_at'),
            submittedOtp:     $request->otp,
        );

        if (!$verification['valid']) {
            if (str_contains($verification['message'], 'expired')) {
                session()->forget(['otp', 'otp_expires_at']);
            }
            return back()->withErrors(['message' => $verification['message']]);
        }

        // OTP verified — store verified phone for reset step
        session([
            'verified_phone' => $phone,
        ]);

        // Clear OTP but keep phone for potential resend on reset page
        session()->forget(['otp', 'otp_expires_at']);

        return to_route('forgot-password.reset.show');
    }

    /*
    |--------------------------------------------------------------------------
    | Step 4 — Reset Password
    |--------------------------------------------------------------------------
    */

    public function resetPassword(Request $request)
    {
        $request->validate([
            'password' => 'required|string|min:6|confirmed',
        ]);

        $verifiedPhone = session('verified_phone');

        if (!$verifiedPhone) {
            return back()->withErrors(['message' => __('Session expired. Please try resend code.')]);
        }

        $success = $this->forgotPasswordService->resetPassword(
            $verifiedPhone->formatE164(),
            $request->password
        );

        if (!$success) {
            return back()->withErrors(['message' => 'Failed to reset password.']);
        }

        // Clear all session data
        session()->forget(['verified_phone', 'phone']);

        return to_route('login')->with(['message' => __('Your password has been changed. Please log in again.')]);
    }
}
