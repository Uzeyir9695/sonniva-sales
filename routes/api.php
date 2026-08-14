<?php

use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\ForgotPasswordController;
use App\Http\Controllers\Api\LoginController;
use App\Http\Controllers\Api\RegisterController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\WishlistController;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//    return $request->user();
// })->middleware('auth:sanctum');

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

    Route::get('/search', [ItemController::class, 'search'])->name('items.search');

    Route::get('/categories', [CategoryController::class, 'tree'])->name('api.categories.tree');

    // Same ItemController::index() the web catalog uses (Route::get('/{grandparentSlug}/{parentSlug?}/{childSlug?}')
    // in routes/web.php) — it resolves the category from the last URL segment regardless of how many segments
    // precede it, and already branches to JSON via $request->wantsJson(). This route just gives mobile its own
    // path so it never touches the `web` middleware group (session, HandleInertiaRequests, etc.).
    Route::get('/items/{slug}', [ItemController::class, 'index'])->name('api.items.index');

    Route::middleware('auth:sanctum')->group(function () {
        // ── Wishlist ─────────────────────────────────────────────────────
        Route::get('wishlist/ids', [WishlistController::class, 'ids'])->name('api.wishlist.ids');
        Route::post('wishlist/sync', [WishlistController::class, 'syncGuest'])->name('api.wishlist.sync');
        Route::post('wishlist/{item}', [WishlistController::class, 'toggle'])->name('api.wishlist.toggle');
        Route::delete('wishlist/{item}', [WishlistController::class, 'destroy'])->name('api.wishlist.destroy');

        // ── Cart ─────────────────────────────────────────────────────────
        Route::post('cart/sync', [CartController::class, 'syncGuest'])->name('api.cart.sync');
        Route::post('cart/{item}', [CartController::class, 'add'])->name('api.cart.add');
        Route::put('cart/{item}', [CartController::class, 'update'])->name('api.cart.update');
        Route::delete('cart/{item}', [CartController::class, 'remove'])->name('api.cart.remove');
        Route::post('cart/{item}/toggle-service', [CartController::class, 'toggleService'])->name('api.cart.toggle-service');

    });
});
