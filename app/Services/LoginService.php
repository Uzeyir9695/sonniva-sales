<?php

namespace App\Services;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\RateLimiter;
use Propaganistas\LaravelPhone\PhoneNumber;

class LoginService
{
    /*
    |--------------------------------------------------------------------------
    | Attempt Login
    |--------------------------------------------------------------------------
    |
    | Handles:
    | - Phone number formatting (if login is phone)
    | - Rate limiting (3 attempts per 15 minutes)
    | - Authentication attempt
    | - Last login timestamp update
    | - Rate limiter hit on failure
    |
    | Returns array with authentication result for controller to handle responses
    */

    public function attemptLogin(string $login, string $password, bool $remember = false): array
    {
        // Detect if login is email or phone
        $loginField = filter_var($login, FILTER_VALIDATE_EMAIL) ? 'email' : 'phone';

        // Format phone to E164 if needed
        if ($loginField === 'phone') {
            try {
                $phone = new PhoneNumber($login, 'GE');
                $login = $phone->formatE164();
            } catch (\Exception $e) {
                return [
                    'success' => false,
                    'user'    => null,
                    'message' => __('Use a valid email address or phone number.'),
                    'locked'  => false,
                    'seconds' => null,
                    'error_type' => 'invalid_phone',
                ];
            }
        }

        // Check rate limiter (3 attempts max)
        $key = 'login-attempt:' . $login;

        if (RateLimiter::tooManyAttempts($key, 3)) {
            $seconds = RateLimiter::availableIn($key);
            $minutes = ceil($seconds / 60);

            return [
                'success' => false,
                'user'    => null,
                'message' => "Too many login attempts. Try again in {$minutes} minute(s).",
                'locked'  => true,
                'seconds' => $seconds,
                'error_type' => 'rate_limited',
            ];
        }

        // Attempt authentication
        if (Auth::attempt([$loginField => $login, 'password' => $password], $remember)) {
            RateLimiter::clear($key);

            $user = Auth::user();
            $user->update(['last_login_at' => now()]);

            return [
                'success' => true,
                'user'    => $user,
                'message' => 'Login successful',
                'locked'  => false,
                'seconds' => null,
                'error_type' => null,
            ];
        }

        // Failed attempt — hit rate limiter
        $decayMinutes = 15 * 60; // 15 minutes in seconds
        RateLimiter::hit($key, $decayMinutes);

        return [
            'success' => false,
            'user'    => null,
            'message' => __('Invalid credentials. Please try again.'),
            'locked'  => false,
            'seconds' => null,
            'error_type' => 'invalid_credentials',
        ];
    }
}
