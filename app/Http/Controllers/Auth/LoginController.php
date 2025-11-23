<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\RateLimiter;
use Inertia\Inertia;

class LoginController extends Controller
{
    public function showLoginForm()
    {
        $url = url()->previous();
        session()->put('intended-url', $url);
        return Inertia::render('auth/Login');
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'login'    => 'required|string',
            'password' => 'required|string|min:6',
        ]);

        $key = 'login-attempt:' . $credentials['login'];

        if (RateLimiter::tooManyAttempts($key, 3)) {

            $seconds = RateLimiter::availableIn($key);
            $minutes = ceil($seconds / 60);

            return back()->withErrors([
                'message' => "Too many login attempts. Try again in {$minutes} minute(s)."
            ]);
        }

        $loginField = filter_var($credentials['login'], FILTER_VALIDATE_EMAIL) ? 'email' : 'phone';

        if (Auth::attempt([$loginField => $credentials['login'], 'password' => $credentials['password']], $request->boolean('remember'))) {
            $request->session()->regenerate();
            RateLimiter::clear($key);

            Auth::user()->update(['last_login_at' => now()]);

            if(Auth::user()->role === 'admin') {
                return to_route('admin.invoices.index');
            }

            return redirect()->intended(session('intended-url'));
        }

        $decayMinutes = 15 * 60;
        RateLimiter::hit($key, $decayMinutes);

        return redirect()->back()->withErrors(['message' => 'Invalid credentials. Please try again.']);
    }

    public function logout(Request $request)
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();
        // regenerate CSRF token
        $request->session()->regenerateToken();


        return redirect()->route('login');
    }
}
