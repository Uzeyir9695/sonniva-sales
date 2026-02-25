<?php

use App\Http\Controllers\AccountController;
use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\AdminUserController;
use App\Http\Controllers\Auth\ForgotPasswordController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\ItemController;
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
    Route::post('logout', [LoginController::class, 'logout'])->middleware('auth')->name('logout');

    /***********************************************************************************************************************
     * Forgot / Reset Password Routes
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


    Route::middleware(['auth'])->group( function () {
        /*******************************************************************************************************************
         * Admin Routes
         * *****************************************************************************************************************/
        Route::name('admin.')->prefix('admin')->middleware(['can:access-admin'])->group(function () {
            //******** Admin Users Controllers ********//
            Route::get('/', [AdminController::class, 'index'])->name('index');

            //******** Admin Users Controllers ********//
            Route::get('/users', [AdminUserController::class, 'index'])->name('users.index');
            Route::get('/user/{user}', [AdminUserController::class, 'edit'])->name('users.get-user');
            Route::delete('/users/{user}', [AdminUserController::class, 'destroy'])->name('users.delete');
        });

        /*******************************************************************************************************************
         * Settings (Profile / Account) Routes
         * *****************************************************************************************************************/
        Route::name('account.')->prefix('account')->group(function () {
            Route::get('/', [AccountController::class, 'index'])->name('index');
            Route::put('/update/{user}', [AccountController::class, 'update'])->name('update');
            Route::put('/change-password', [AccountController::class, 'changePassword'])->name('change-password');
        });
    });

    /*******************************************************************************************************************
     * Items Routes
     * *****************************************************************************************************************/
    Route::get('/{grandparentSlug}/{parentSlug?}/{childSlug?}', [ItemController::class, 'index'])->name('items.index');
    Route::get('/items/{item}', [ItemController::class, 'show'])->name('items.show');
//    Route::get('/{parentSlug}/{slug}', [CategoryController::class, 'index'])->name('category.sub');
//    Route::get('/{slug}', [CategoryController::class, 'index'])->name('category.leaf');

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
