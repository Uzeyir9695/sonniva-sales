<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Rules\RecaptchaV3;
use App\Services\RegisterService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class RegisterController extends Controller
{
    protected RegisterService $registerService;

    public function __construct(RegisterService $registerService)
    {
        $this->registerService = $registerService;
    }

    /*
    |--------------------------------------------------------------------------
    | Show Forms
    |--------------------------------------------------------------------------
    */

    public function showRegisterForm()
    {
        return Inertia::render('auth/Register');
    }

    public function showRegisterVerifyPhone()
    {
        return Inertia::render('auth/RegisterVerifyPhone', [
            'success' => 'Verification code sent!'
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | Step 1 — Validate, format phone, send OTP, store in session
    |--------------------------------------------------------------------------
    */

    public function register(Request $request)
    {
        $validated = $request->validate([
            'user_type' => 'required|string|max:20',
            'tax_id' => 'required|string|min:9|max:50',
            'name' => 'required|string|max:30',
            'lastname'  => 'required_if:user_type,individual|max:30',
            'phone_country'  => 'required|string',
            'phone'          => 'required|phone:phone_country|unique:users,phone',
            'email' => 'required|email|unique:users,email,max:255',
            'password' => 'required|string|min:6|confirmed',
            'captcha_token' => array_filter([
                'required',
                app()->environment('testing') ? null : new RecaptchaV3('signup'),
            ]),
        ],
            [
                'lastname.required_if' => __('The lastname field is required when user type is individual.'),
            ]);

        $phone = $this->registerService->formatPhone($request->phone, $request->phone_country);

        if ($this->registerService->phoneExists($phone)) {
            return back()->withErrors(['phone' => __('This phone number is already registered.')]);
        }

        $result = $this->registerService->generateAndSendOtp($phone);

        if (!$result['success']) {
            return back()->with('error', $result['message']);
        }

        // Web uses session to hold OTP and registration data between steps
        session([
            'register_data' => [
                'user_type'     => $validated['user_type'],
                'tax_id'        => $validated['tax_id'],
                'name'          => $validated['name'],
                'phone_country' => $validated['phone_country'],
                'email'         => $validated['email'] ?? null,
                'password'      => $validated['password'], // hashed in service on createUser()
            ],
            'phone'          => $phone,
            'otp'            => $result['otp'],
            'otp_expires_at' => now()->addMinutes(15)->toDateTimeString(),
        ]);

        return to_route('register.verify-phone.show')->with([
            'success' => $result['message'],
        ]);
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
            return back()->withErrors(['message' => __('Session expired. Please try again.')]);
        }

        $result = $this->registerService->generateAndSendOtp($phone);

        if (!$result['success']) {
            return back()->withErrors(['message' => $result['message']]);
        }

        // Refresh OTP in session
        session([
            'otp'            => $result['otp'],
            'otp_expires_at' => now()->addMinutes(15)->toDateTimeString(),
        ]);

        return back()->with('message', $result['message']);
    }

    /*
    |--------------------------------------------------------------------------
    | Step 3 — Verify OTP, create user, sync BC, log in
    |--------------------------------------------------------------------------
    */

    public function verifyCode(Request $request)
    {
        $request->validate([
            'otp' => 'required|string|size:6',
        ]);

        $registerData = session('register_data');
        $phone        = session('phone');

        if(session('otp')) {
            // Verify OTP from session
            $verification = $this->registerService->verifyOtpFromSession(
                sessionOtp:       session('otp'),
                sessionExpiresAt: session('otp_expires_at'),
                submittedOtp:     $request->otp,
            );
        } else {
            return back()->withErrors(['message' => 'Session expired. Please try resend code.']);
        }

        if (!$verification['valid']) {
            if (str_contains($verification['message'], 'expired')) {
                session()->forget(['otp', 'otp_expires_at', 'register_data', 'phone']);
            }
            return back()->withErrors(['message' => $verification['message']]);
        }

        // Create user
        $user = $this->registerService->createUser($registerData, $phone);

        // Sync with Business Central
        $this->registerService->syncWithBusinessCentral($user);

        // Log in via session (web)
        Auth::login($user);
        $request->session()->regenerate();

        // Clean up session
        session()->forget(['otp', 'otp_expires_at', 'phone', 'register_data']);

        return to_route('home');
    }
}
