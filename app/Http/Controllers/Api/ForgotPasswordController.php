<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\ForgotPasswordService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ForgotPasswordController extends Controller
{
    protected ForgotPasswordService $forgotPasswordService;

    public function __construct(ForgotPasswordService $forgotPasswordService)
    {
        $this->forgotPasswordService = $forgotPasswordService;
    }

    /*
    |--------------------------------------------------------------------------
    | Step 1 — Send OTP
    |--------------------------------------------------------------------------
    */

    public function sendVerificationCode(Request $request): JsonResponse
    {
        $request->validate([
            'phone_country' => 'required|string',
            'phone'         => 'required|phone:phone_country',
        ]);

        $phone = $this->forgotPasswordService->formatPhone($request->phone, $request->phone_country);

        if (!$this->forgotPasswordService->phoneExists($phone)) {
            return response()->json([
                'message' => 'This phone number is not registered.',
                'errors'  => ['phone' => ['This phone number is not registered.']],
            ], 422);
        }

        $result = $this->forgotPasswordService->generateAndSendOtp($phone);

        if (!$result['success']) {
            return response()->json(['message' => $result['message']], 500);
        }

        // Store in DB for API flow
        $this->forgotPasswordService->storeOtpInDb($phone, $result['otp']);

        return response()->json(['message' => $result['message']], 200);
    }

    /*
    |--------------------------------------------------------------------------
    | Step 2 — Resend OTP
    |--------------------------------------------------------------------------
    */

    public function resendCode(Request $request): JsonResponse
    {
        $request->validate([
            'phone'         => 'required|string',
            'phone_country' => 'required|string',
        ]);

        $phone = $this->forgotPasswordService->formatPhone($request->phone, $request->phone_country);

        if (!$this->forgotPasswordService->phoneExists($phone)) {
            return response()->json([
                'message' => 'This phone number is not registered.',
            ], 422);
        }

        $result = $this->forgotPasswordService->generateAndSendOtp($phone);

        if (!$result['success']) {
            return response()->json(['message' => $result['message']], 500);
        }

        // Update OTP in DB
        $this->forgotPasswordService->storeOtpInDb($phone, $result['otp']);

        return response()->json(['message' => __('Verification code is sent. Please check your phone.')], 200);
    }

    /*
    |--------------------------------------------------------------------------
    | Step 3 — Verify OTP
    |--------------------------------------------------------------------------
    */

    public function verifyCode(Request $request): JsonResponse
    {
        $request->validate([
            'phone'         => 'required|string',
            'phone_country' => 'required|string',
            'otp'           => 'required|string|size:6',
        ]);

        $phone = $this->forgotPasswordService->formatPhone($request->phone, $request->phone_country);

        $verification = $this->forgotPasswordService->verifyOtpFromDb(
            phoneE164:    $phone->formatE164(),
            submittedOtp: $request->otp,
        );

        if (!$verification['valid']) {
            return response()->json(['message' => $verification['message']], 422);
        }

        // OTP verified — generate reset token
        $resetToken = $this->forgotPasswordService->generateResetToken();

        $this->forgotPasswordService->storeResetToken($verification['phone'], $resetToken);

        return response()->json([
            'message'     => 'OTP verified',
            'reset_token' => $resetToken,
        ], 200);
    }

    /*
    |--------------------------------------------------------------------------
    | Step 4 — Reset Password
    |--------------------------------------------------------------------------
    */

    public function resetPassword(Request $request): JsonResponse
    {
        $request->validate([
            'reset_token' => 'required|string',
            'password'    => 'required|string|min:6|confirmed',
        ]);

        $phone = $this->forgotPasswordService->validateResetToken($request->reset_token);

        if (!$phone) {
            return response()->json([
                'message' => 'Invalid or expired reset token.',
            ], 422);
        }

        $success = $this->forgotPasswordService->resetPassword($phone, $request->password);

        if (!$success) {
            return response()->json(['message' => 'Failed to reset password.'], 500);
        }

        return response()->json([
            'message' => 'Password reset successfully. Please login with your new password.',
        ], 200);
    }
}
