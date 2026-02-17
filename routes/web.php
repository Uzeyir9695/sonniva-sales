<?php

use App\Http\Controllers\Auth\ForgotPasswordController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\PhoneVerifyController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

    Route::get('/home', [HomeController::class, 'index'])->name('home');
    Route::get('/read-more', [HomeController::class, 'readMore'])->name('read.more');

    /*******************************************************************************************************************
     * Auth Routes
     * *****************************************************************************************************************/
    Route::get('register', [RegisterController::class, 'showRegisterForm'])->name('register.show')->middleware('guest');
    Route::post('register/submit-form', [RegisterController::class, 'register'])->name('register')->middleware('guest');
    Route::get('register/verify-phone', [RegisterController::class, 'showRegisterVerifyPhone'])->name('register.verify-phone.show');
    Route::post('registration/verify/phone', [RegisterController::class, 'verifyCode'])->name('register.verify-code');
    Route::post('register/resend-code', [RegisterController::class, 'resendCode'])->name('register.resend-code');

    Route::get('login', [LoginController::class, 'showLoginForm'])->name('login')->middleware('guest');
    Route::post('login', [LoginController::class, 'login'])->name('login.post')->middleware('guest');

    /*******************************************************************************************************************
     * Phone Verification Routes
     * *****************************************************************************************************************/
    // 2.1 Notice page
    Route::get('/phone-verify', [PhoneVerifyController::class, 'showVerifyPage'])->name('phone-verify.show');

    /***********************************************************************************************************************
     * Forgot / Reset Password Routesf
     * *********************************************************************************************************************/
    Route::get('forgot-password', [ForgotPasswordController::class, 'showForgetPasswordForm'])
        ->name('show.forgot.password');

    Route::post('forgot-password/send-code', [ForgotPasswordController::class, 'sendVerificationCode'])
        ->name('forgot-password.send-verification-code');

    Route::post('forgot-password/resend-code', [ForgotPasswordController::class, 'resendCode'])
        ->name('forgot-password.resend-code');

    Route::get('forgot-password/verify-phone', [ForgotPasswordController::class, 'showFPVerifyPhone'])
        ->name('forgot-password.verify-phone.show');

    Route::post('forgot-password/verify-code', [ForgotPasswordController::class, 'verifyCode'])
        ->name('forgot-password.verify-code');

    Route::get('forgot-password/reset', [ForgotPasswordController::class, 'showResetPasswordForm'])
        ->name('forgot-password.reset.show');

    Route::post('forgot-password/reset', [ForgotPasswordController::class, 'resetPassword'])
        ->name('forgot-password.reset');

    /*******************************************************************************************************************
     * Log-out / Post Ad
     * *****************************************************************************************************************/
    Route::post('logout', [LoginController::class, 'logout'])->name('logout');


    /*******************************************************************************************************************
     * FAQ Route
     * *****************************************************************************************************************/
    Route::get('/frequently-asked-questions', function () {
        return Inertia::render('faq/Index');
    })->name('faq.index');

    /*******************************************************************************************************************
     * Policies Routes
     * *****************************************************************************************************************/
    Route::get('/about-us', function () {
        return Inertia::render('about-us/Index');
    })->name('about-us');

    Route::get('/terms-of-service', function () {
        return Inertia::render('policies/TermsOfService');
    })->name('terms-of-service');

    Route::get('/keep-conditions', function () {
        return Inertia::render('policies/KeepConditions');
    })->name('keep-conditions');

    Route::get('/privacy-policy', function () {
        return Inertia::render('policies/PrivacyPolicy');
    })->name('privacy-policy');

    Route::get('/cookie-policy', function () {
        return Inertia::render('policies/CookiePolicy');
    })->name('cookie-policy');


/***********************************************************************************************************************
 * Fallback Route
 * *********************************************************************************************************************/
Route::fallback(function() {
    return to_route('home');
});
