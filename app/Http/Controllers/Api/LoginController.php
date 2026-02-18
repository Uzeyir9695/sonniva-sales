<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\LoginService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class LoginController extends Controller
{
    protected LoginService $loginService;

    public function __construct(LoginService $loginService)
    {
        $this->loginService = $loginService;
    }

    public function login(Request $request): JsonResponse
    {
        $credentials = $request->validate([
            'login'    => 'required|string',
            'password' => 'required|string|min:6',
        ]);

        // Service handles: phone format, rate limit, auth attempt, last_login_at update
        $result = $this->loginService->attemptLogin(
            $credentials['login'],
            $credentials['password'],
            false, // No "remember me" for API
        );

        if (!$result['success']) {
            $statusCode = match($result['error_type']) {
                'rate_limited' => 429,
                'invalid_phone' => 422,
                'invalid_credentials' => 401,
                default => 422,
            };

            return response()->json([
                'message' => $result['message'],
                'locked'  => $result['locked'],
                'seconds' => $result['seconds'],
            ], $statusCode);
        }

        $user = $result['user'];
        $token = $user->createToken('nativephp-mobile')->plainTextToken;

        return response()->json([
            'message' => 'Login successful',
            'token'   => $token,
            'user'    => [
                'id'    => $user->id,
                'name'  => $user->name,
                'email' => $user->email,
                'phone' => $user->phone,
                'role'  => $user->role,
            ],
        ], 200);
    }

    public function logout(Request $request): JsonResponse
    {
        // Delete only the current token used in this request
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Logged out successfully'], 200);
    }
}
