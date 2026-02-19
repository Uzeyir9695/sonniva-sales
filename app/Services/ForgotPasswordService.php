<?php

namespace App\Services;

use App\Models\OtpVerification;
use App\Models\PasswordResetToken;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Propaganistas\LaravelPhone\PhoneNumber;

class ForgotPasswordService
{
    protected SmsService $smsService;

    public function __construct(SmsService $smsService)
    {
        $this->smsService = $smsService;
    }

    /*
    |--------------------------------------------------------------------------
    | Phone
    |--------------------------------------------------------------------------
    */

    /**
     * Format and return a PhoneNumber object in E164 format.
     */
    public function formatPhone(string $phone, string $country = 'GE'): PhoneNumber
    {
        return new PhoneNumber($phone, $country);
    }

    /**
     * Check if phone exists in users table.
     */
    public function phoneExists(PhoneNumber $phone): bool
    {
        return User::where('phone', $phone->formatE164())->exists();
    }

    /*
    |--------------------------------------------------------------------------
    | OTP Generation & Sending
    |--------------------------------------------------------------------------
    */

    /**
     * Generate a fresh OTP and send it via SMS.
     *
     * Returns:
     * [
     *   'success' => bool,
     *   'otp'     => string|null,
     *   'message' => string,
     * ]
     */
    public function generateAndSendOtp(PhoneNumber $phone): array
    {
        $otp = $this->smsService->generateOtp(6);

        $result = $this->smsService->sendOtp($phone, $otp);

        if ($result['success']) {
            return [
                'success' => true,
                'otp'     => $otp,
                'message' => __('Verification code sent. Please check you phone!'),
            ];
        }

        return [
            'success' => false,
            'otp'     => null,
            'message' => $result['message'],
        ];
    }

    /*
    |--------------------------------------------------------------------------
    | OTP Storage (API - DB based)
    |--------------------------------------------------------------------------
    */

    /**
     * Store OTP in database for API flow.
     */
    public function storeOtpInDb(PhoneNumber $phone, string $otp): void
    {
        OtpVerification::updateOrCreate(
            ['phone' => $phone->formatE164()],
            [
                'otp'               => $otp,
                'registration_data' => null, // not used for password reset
                'expires_at'        => now()->addMinutes(5), // 5 min for password reset
            ]
        );
    }

    /*
    |--------------------------------------------------------------------------
    | OTP Verification (Session - Web)
    |--------------------------------------------------------------------------
    */

    /**
     * Verify OTP from session for web flow.
     *
     * Returns:
     * [
     *   'valid'   => bool,
     *   'message' => string,
     * ]
     */
    public function verifyOtpFromSession(?string $sessionOtp, ?string $sessionExpiresAt, string $submittedOtp): array
    {
        if (!$sessionOtp) {
            return [
                'valid'   => false,
                'message' => __('controller-messages.session_expired'),
            ];
        }

        if (now()->greaterThan($sessionExpiresAt)) {
            return [
                'valid'   => false,
                'message' => __('controller-messages.verification_code_expired'),
            ];
        }

        if ($sessionOtp !== $submittedOtp) {
            return [
                'valid'   => false,
                'message' => __('controller-messages.invalid_verification_code'),
            ];
        }

        return ['valid' => true, 'message' => 'OTP verified'];
    }

    /*
    |--------------------------------------------------------------------------
    | OTP Verification (DB - API)
    |--------------------------------------------------------------------------
    */

    /**
     * Verify OTP from database for API flow.
     *
     * Returns:
     * [
     *   'valid'   => bool,
     *   'message' => string,
     *   'phone'   => string|null,  // E164 phone on success
     * ]
     */
    public function verifyOtpFromDb(string $phoneE164, string $submittedOtp): array
    {
        $record = OtpVerification::where('phone', $phoneE164)->latest()->first();

        if (!$record) {
            return [
                'valid'   => false,
                'message' => __('controller-messages.session_expired'),
                'phone'   => null,
            ];
        }

        if (now()->greaterThan($record->expires_at)) {
            $record->delete();
            return [
                'valid'   => false,
                'message' => __('controller-messages.verification_code_expired'),
                'phone'   => null,
            ];
        }

        if ($record->otp !== $submittedOtp) {
            return [
                'valid'   => false,
                'message' => __('controller-messages.invalid_verification_code'),
                'phone'   => null,
            ];
        }

        $phone = $record->phone;
        $record->delete(); // OTP used — clean it up

        return [
            'valid'   => true,
            'message' => 'OTP verified',
            'phone'   => $phone,
        ];
    }

    /*
    |--------------------------------------------------------------------------
    | Reset Token (API only)
    |--------------------------------------------------------------------------
    */

    /**
     * Generate a secure reset token.
     */
    public function generateResetToken(): string
    {
        return Str::random(64);
    }

    /**
     * Store reset token in database tied to a phone number.
     */
    public function storeResetToken(string $phoneE164, string $token): void
    {
        PasswordResetToken::updateOrCreate(
            ['phone' => $phoneE164],
            [
                'token'      => Hash::make($token), // hash token before storing
                'expires_at' => now()->addMinutes(15), // 15 min to reset
            ]
        );
    }

    /**
     * Validate reset token and return phone if valid.
     * Returns null if invalid or expired.
     */
    public function validateResetToken(string $token): ?string
    {
        $records = PasswordResetToken::where('expires_at', '>', now())->get();

        foreach ($records as $record) {
            if (Hash::check($token, $record->token)) {
                return $record->phone;
            }
        }

        return null;
    }

    /*
    |--------------------------------------------------------------------------
    | Password Reset
    |--------------------------------------------------------------------------
    */

    /**
     * Reset password for given phone.
     */
    public function resetPassword(string $phoneE164, string $newPassword): bool
    {
        $user = User::where('phone', $phoneE164)->first();

        if (!$user) {
            return false;
        }

        $user->update(['password' => Hash::make($newPassword)]);

        // Delete all password reset tokens for this phone
        PasswordResetToken::where('phone', $phoneE164)->delete();

        // Optional: revoke all Sanctum tokens for this user (force re-login on all devices)
        $user->tokens()->delete();

        return true;
    }
}
