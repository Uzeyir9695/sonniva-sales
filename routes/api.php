<?php

use App\Http\Controllers\Api\RegisterController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/register', [RegisterController::class, 'register']);
Route::post('/register/verify-phone', [RegisterController::class, 'verifyCode']);
Route::post('/register/resend-code', [RegisterController::class, 'resendCode']);
