<?php

use App\Http\Controllers\Api\AccountController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\CheckoutController as ApiCheckoutController;
use App\Http\Controllers\Api\ForgotPasswordController;
use App\Http\Controllers\Api\LoginController;
use App\Http\Controllers\Api\RegisterController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\Payment\PaymentController;
use App\Http\Controllers\SalesController;
use App\Http\Controllers\StockNotificationController;
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

    // Same HomeController::index() the web homepage uses, already branching
    // to JSON via $request->wantsJson() — banners, brand carousels, and
    // admin-curated home sections, all cached the same way for both clients.
    Route::get('/home', [HomeController::class, 'index'])->name('api.home');

    // Same ItemController::index() the web catalog uses (Route::get('/{grandparentSlug}/{parentSlug?}/{childSlug?}')
    // in routes/web.php) — it resolves the category from the last URL segment regardless of how many segments
    // precede it, and already branches to JSON via $request->wantsJson(). This route just gives mobile its own
    // path so it never touches the `web` middleware group (session, HandleInertiaRequests, etc.).
    Route::get('/items/{slug}', [ItemController::class, 'index'])->name('api.items.index');

    // Binds by id (not slug), public (no auth:sanctum middleware).
    Route::get('/item/{item}', [ItemController::class, 'show'])->name('api.items.show');

    Route::get('/sales', [SalesController::class, 'index'])->name('api.sales.index');

    Route::middleware('auth:sanctum')->group(function () {
        // ── Account ──────────────────────────────────────────────────────
        Route::get('account', [AccountController::class, 'show'])->name('api.account.show');
        Route::put('account', [AccountController::class, 'update'])->name('api.account.update');
        Route::put('account/change-password', [AccountController::class, 'changePassword'])->name('api.account.change-password');

        // ── Wishlist ─────────────────────────────────────────────────────
        Route::get('wishlist', [WishlistController::class, 'index'])->name('api.wishlist.index');
        Route::get('wishlist/ids', [WishlistController::class, 'ids'])->name('api.wishlist.ids');
        Route::post('wishlist/sync', [WishlistController::class, 'syncGuest'])->name('api.wishlist.sync');
        Route::post('wishlist/{item}', [WishlistController::class, 'toggle'])->name('api.wishlist.toggle');
        Route::delete('wishlist/{item}', [WishlistController::class, 'destroy'])->name('api.wishlist.destroy');

        // ── Cart ─────────────────────────────────────────────────────────
        Route::get('cart', [CartController::class, 'index'])->name('api.cart.index');
        Route::post('cart/sync', [CartController::class, 'syncGuest'])->name('api.cart.sync');
        Route::post('cart/{item}', [CartController::class, 'add'])->name('api.cart.add');
        Route::put('cart/{item}', [CartController::class, 'update'])->name('api.cart.update');
        Route::delete('cart/{item}', [CartController::class, 'remove'])->name('api.cart.remove');
        Route::post('cart/{item}/toggle-service', [CartController::class, 'toggleService'])->name('api.cart.toggle-service');

        // ── Stock notifications ─────────────────────────────────────────────
        Route::post('items/{item}/notify', [StockNotificationController::class, 'subscribe'])->name('api.items.notify.subscribe');
        Route::delete('items/{item}/notify', [StockNotificationController::class, 'unsubscribe'])->name('api.items.notify.unsubscribe');

        // ── Checkout ─────────────────────────────────────────────────────
        // onway-regions/office-inventory/credit-info reuse the existing web
        // CheckoutController — those methods are already pure JsonResponse,
        // no Inertia/session coupling, so no new controller code is needed.
        Route::get('checkout/meta', [ApiCheckoutController::class, 'meta'])->name('api.checkout.meta');
        Route::post('checkout/preview', [ApiCheckoutController::class, 'preview'])->name('api.checkout.preview');
        Route::get('checkout/onway-regions', [CheckoutController::class, 'onwayRegions'])->name('api.checkout.onway-regions');
        Route::post('checkout/office-inventory', [CheckoutController::class, 'officeInventory'])->name('api.checkout.office-inventory');
        Route::get('checkout/credit-info', [CheckoutController::class, 'creditInfo'])->name('api.checkout.credit-info');
        Route::post('checkout', [ApiCheckoutController::class, 'place'])->name('api.checkout.place');

        // Card providers (bog/tbc/pcb) — reuses the existing PaymentController,
        // already a pure JSON endpoint, only reachable via web.php until now.
        Route::post('payment/initiate', [PaymentController::class, 'initiate'])->name('api.payment.initiate');
        Route::get('payment/status', [PaymentController::class, 'status'])->name('api.payment.status');
    });
});
