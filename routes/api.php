<?php

use App\Http\Controllers\Api\ForgotPasswordController;
use App\Http\Controllers\Api\LoginController;
use App\Http\Controllers\Api\RegisterController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// ============================================================================
// api.php — for NativePHP Mobile
// ============================================================================

Route::prefix('v1')->group(function () {
    Route::post('/register', [RegisterController::class, 'register']);
    Route::post('/register/verify-phone', [RegisterController::class, 'verifyCode']);
    Route::post('/register/resend-code', [RegisterController::class, 'resendCode']);

    Route::post('/login', [LoginController::class, 'login']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/logout', [LoginController::class, 'logout']);
    });

    Route::post('/forgot-password/send-code', [ForgotPasswordController::class, 'sendVerificationCode']);
    Route::post('/forgot-password/resend-code', [ForgotPasswordController::class, 'resendCode']);
    Route::post('/forgot-password/verify-code', [ForgotPasswordController::class, 'verifyCode']);
    Route::post('/forgot-password/reset', [ForgotPasswordController::class, 'resetPassword']);

});
