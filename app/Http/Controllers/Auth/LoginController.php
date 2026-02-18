<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Services\LoginService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class LoginController extends Controller
{
    protected LoginService $loginService;

    public function __construct(LoginService $loginService)
    {
        $this->loginService = $loginService;
    }

    public function showLoginForm()
    {
        return Inertia::render('auth/Login');
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'login'    => 'required|string',
            'password' => 'required|string|min:6',
        ]);

        // Service handles: phone format, rate limit, auth attempt, last_login_at update
        $result = $this->loginService->attemptLogin(
            $credentials['login'],
            $credentials['password'],
            $request->boolean('remember'),
        );

        if (!$result['success']) {
            return back()->withErrors(['message' => $result['message']]);
        }

        $request->session()->regenerate();

        $user = $result['user'];

        if ($user->role === 'admin' || $user->role === 'manager') {
            return to_route('admin.index');
        }

        return redirect()->intended('/home');
    }

    /*
    |--------------------------------------------------------------------------
    | Logout
    |--------------------------------------------------------------------------
    */

    public function logout(Request $request)
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('login');
    }
}
