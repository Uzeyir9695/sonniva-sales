<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\OtpVerification;
use App\Services\RegisterService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class RegisterController extends Controller
{
    protected RegisterService $registerService;

    public function __construct(RegisterService $registerService)
    {
        $this->registerService = $registerService;
    }

    /*
    |--------------------------------------------------------------------------
    | Step 1 — Validate, format phone, send OTP, store in DB
    |--------------------------------------------------------------------------
    */

    public function register(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'user_type'     => 'required|string|max:20',
            'tax_id'        => 'required|string|min:9|max:50',
            'name'          => 'required|string|max:30',
            'phone_country' => 'required|string',
            'phone'         => 'required|phone:phone_country',
            'email'         => 'required|email|unique:users,email|max:255',
            'password'      => 'required|string|min:6|confirmed',
        ]);

        $phone = $this->registerService->formatPhone($request->phone, $request->phone_country);

        if ($this->registerService->phoneExists($phone)) {
            return response()->json([
                'message' => __('controller-messages.phone_exists'),
                'errors'  => ['phone' => [__('controller-messages.phone_exists')]],
            ], 422);
        }

        $result = $this->registerService->generateAndSendOtp($phone);

        if (!$result['success']) {
            return response()->json(['message' => $result['message']], 500);
        }

        // API uses DB to hold OTP and registration data between steps (no session)
        $this->registerService->storeOtpInDb($phone, $result['otp'], [
            'user_type'     => $validated['user_type'],
            'tax_id'        => $validated['tax_id'],
            'name'          => $validated['name'],
            'phone_country' => $validated['phone_country'],
            'email'         => $validated['email'] ?? null,
            'password'      => Hash::make($validated['password']), // hash before storing in DB
        ]);

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

        $phone = $this->registerService->formatPhone($request->phone, $request->phone_country);

        // Make sure there is a pending registration for this phone
        $pending = OtpVerification::where('phone', $phone->formatE164())->exists();

        if (!$pending) {
            return response()->json([
                'message' => __('controller-messages.session_expired'),
            ], 422);
        }

        $result = $this->registerService->generateAndSendOtp($phone);

        if (!$result['success']) {
            return response()->json(['message' => $result['message']], 500);
        }

        // Update OTP in DB — storeOtpInDb uses updateOrCreate so safe to call again
        // registration_data stays unchanged, only OTP + expiry refreshed
        $record = OtpVerification::where('phone', $phone->formatE164())->first();

        $record->update([
            'otp'        => $result['otp'],
            'expires_at' => now()->addMinutes(15),
        ]);

        return response()->json(['message' => $result['message']], 200);
    }

    /*
    |--------------------------------------------------------------------------
    | Step 3 — Verify OTP, create user, sync BC, return token
    |--------------------------------------------------------------------------
    */

    public function verifyCode(Request $request): JsonResponse
    {
        $request->validate([
            'phone'         => 'required|string',
            'phone_country' => 'required|string',
            'otp'           => 'required|string|size:6',
        ]);

        $phone = $this->registerService->formatPhone($request->phone, $request->phone_country);

        // Verify OTP from DB
        $verification = $this->registerService->verifyOtpFromDb(
            phoneE164:    $phone->formatE164(),
            submittedOtp: $request->otp,
        );

        if (!$verification['valid']) {
            return response()->json([
                'message' => $verification['message'],
            ], 422);
        }

        $registrationData = $verification['registration_data'];

        // Password was already hashed before storing — pass a flag so createUser() skips hashing
        $user = $this->registerService->createUser($registrationData, $phone, passwordAlreadyHashed: true);

        // Sync with Business Central
        $this->registerService->syncWithBusinessCentral($user);

        // Return Sanctum token — no session, no redirect
        $token = $user->createToken('nativephp-mobile')->plainTextToken;

        return response()->json([
            'message' => 'Registration successful',
            'token'   => $token,
            'user'    => $user,
        ], 201);
    }
}
