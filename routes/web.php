<?php

use App\Http\Controllers\AccountController;
use App\Http\Controllers\Admin\AdminAnalyticsController;
use App\Http\Controllers\Admin\AdminBannerController;
use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\AdminItemController;
use App\Http\Controllers\Admin\AdminOrderController;
use App\Http\Controllers\Admin\AdminPaymentController;
use App\Http\Controllers\Admin\AdminStockNotificationController;
use App\Http\Controllers\Admin\AdminUserController;
use App\Http\Controllers\Auth\ForgotPasswordController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\Payment\InvoiceController;
use App\Http\Controllers\Payment\PaymentController;
use App\Http\Controllers\SalesController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\StockNotificationController;
use App\Http\Controllers\UserOrderController;
use App\Http\Controllers\WishlistController;
use App\Http\Middleware\NoIndexMiddleware;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/read-more', [HomeController::class, 'readMore'])->name('read.more');

/*******************************************************************************************************************
 * Auth Routes
 * *****************************************************************************************************************/
Route::middleware([NoIndexMiddleware::class])->group(function () {
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
});

Route::middleware(['auth', NoIndexMiddleware::class])->group(function () {
    /*******************************************************************************************************************
     * Admin Routes
     * *****************************************************************************************************************/
    Route::name('admin.')->prefix('admin')->middleware(['can:access-admin'])->group(function () {
        // ******** Admin Users Controllers ********//
        Route::get('/', [AdminController::class, 'index'])->name('index');

        // ******** Admin Orders Controllers ********//
        Route::get('/orders', [AdminOrderController::class, 'index'])->name('orders.index');
        Route::get('/orders/{order}', [AdminOrderController::class, 'show'])->name('orders.show');
        Route::put('/orders/{order}/approve', [AdminOrderController::class, 'approve'])->name('orders.approve');
        Route::put('/orders/{order}/ready', [AdminOrderController::class, 'markAsReady'])->name('orders.ready');
        Route::put('/orders/{order}/cancel', [AdminOrderController::class, 'cancel'])->name('orders.cancel');
        Route::post('/orders/{order}/send-pdf', [AdminOrderController::class, 'sendPdf'])->name('orders.send-pdf');
        Route::post('/orders/{order}/send-onway', [AdminOrderController::class, 'sendToOnway'])->name('orders.send-onway');
        Route::delete('/orders/{order}', [AdminOrderController::class, 'destroy'])->name('orders.destroy');

        // ******** Admin Items ********//
        Route::get('/items', [AdminItemController::class, 'index'])->name('items.index');
        Route::post('/items/sync-category', [AdminItemController::class, 'syncCategory'])->name('items.sync-category');
        Route::get('/items/search', [AdminItemController::class, 'search'])->name('items.search');
        Route::put('/items/{item}', [AdminItemController::class, 'update'])->name('items.update');
        Route::get('/categories/search', [AdminItemController::class, 'searchCategories'])->name('categories.search');
        Route::post('/categories/{category}/fetch-image', [AdminItemController::class, 'updateCategoryImage'])->name('categories.fetch-image');

        // ******** Admin Payments ********//
        Route::get('/payments', [AdminPaymentController::class, 'index'])->name('payments.index');

        // ******** Admin Stock Notifications ********//
        Route::get('/stock-notifications', [AdminStockNotificationController::class, 'index'])->name('stock-notifications.index');
        Route::patch('/stock-notifications/{stockNotification}/toggle-called', [AdminStockNotificationController::class, 'toggleCalled'])->name('stock-notifications.toggle-called');
        Route::delete('/stock-notifications/{stockNotification}', [AdminStockNotificationController::class, 'destroy'])->name('stock-notifications.destroy');

        // ******** Admin Analytics ********//
        Route::get('/analytics', [AdminAnalyticsController::class, 'index'])->name('analytics.index');

        // ******** Admin Home Page Banners ********//
        Route::get('/home-page', [AdminBannerController::class, 'index'])->name('home-page.index');
        Route::post('/home-page/banners', [AdminBannerController::class, 'store'])->name('home-page.banners.store');
        Route::delete('/home-page/banners/{banner}', [AdminBannerController::class, 'destroy'])->name('home-page.banners.destroy');

        // ******** Admin Users Controllers ********//
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

    Route::name('user-orders.')->prefix('user-orders')->group(function () {
        Route::get('/', [UserOrderController::class, 'index'])->name('index');
        Route::get('/{order}', [UserOrderController::class, 'show'])->name('show');
    });
});

Route::middleware(['auth', NoIndexMiddleware::class])->group(function () {
    /*******************************************************************************************************************
     * Wishlist Route
     * *****************************************************************************************************************/
    Route::get('/wishlist', [WishlistController::class, 'index'])->name('wishlist.index');

    /*******************************************************************************************************************
     * Cart Route
     * *****************************************************************************************************************/
    Route::get('/cart', [CartController::class, 'index'])->name('cart.index');

    Route::get('/checkout', [CheckoutController::class, 'index'])->name('checkout.index');
    Route::get('/checkout/onway-regions', [CheckoutController::class, 'onwayRegions'])->name('checkout.onway-regions');
    Route::get('/checkout/credit-info', [CheckoutController::class, 'creditInfo'])->name('checkout.credit-info');
    Route::post('/checkout/office-inventory', [CheckoutController::class, 'officeInventory'])->name('checkout.office-inventory');

    /*******************************************************************************************************************
     * Payment Route
     * *****************************************************************************************************************/
    Route::post('/payment/initiate', [PaymentController::class, 'initiate'])->name('payment.initiate');
    Route::post('/initiate/payment/invoice', [InvoiceController::class, 'initiateInvoice'])->name('initiate.payment.invoice');
    Route::post('/initiate/payment/limit', [InvoiceController::class, 'initiateLimit'])->name('initiate.payment.limit');

    Route::get('/payment/success/{provider}', [PaymentController::class, 'success'])->name('payment.success');

    Route::get('/payment/cancel/{provider}', [PaymentController::class, 'cancel'])->name('payment.cancel');

    Route::get('/payment/invoice/{invoice}', [InvoiceController::class, 'success'])->name('payment.invoice.success');

    Route::get('/payment/limit/{invoice}', [InvoiceController::class, 'limitSuccess'])->name('payment.limit.success');

    Route::get('/pro-credit-bank/order-details', [PaymentController::class, 'proCreditBankCallback'])->name('payment.pcb.order.details');

});

Route::post('/bc-sales-order/{orderItem}', [PaymentController::class, 'sendOrderToBC'])->name('bc.send-order');

// Payment webhook/callback (NO auth middleware, NO CSRF)
Route::post('/payment/callback', [PaymentController::class, 'callback'])
    ->name('payment.callback')
    ->withoutMiddleware(['web']);

Route::get('/order/download/{filename}', [InvoiceController::class, 'download'])
    ->where('filename', '.*') // <- important
    ->name('download.file');

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
    return Inertia::render('Policies/TermsOfService');
})->name('terms-of-service');

Route::get('/keep-conditions', function () {
    return Inertia::render('Policies/KeepConditions');
})->name('keep-conditions');

Route::get('/privacy-policy', function () {
    return Inertia::render('Policies/PrivacyPolicy');
})->name('privacy-policy');

Route::get('/cookie-policy', function () {
    return Inertia::render('Policies/CookiePolicy');
})->name('cookie-policy');

Route::get('/delivery-rates', function () {
    return Inertia::render('Policies/DeliveryRates');
})->name('delivery-rates');

/*******************************************************************************************************************
 * Items Routes
 * *****************************************************************************************************************/
Route::get('/item/{item:slug}', [ItemController::class, 'show'])->name('items.show');

Route::middleware(['auth'])->group(function () {
    Route::post('/items/{item:slug}/notify', [StockNotificationController::class, 'subscribe'])->name('stock-notifications.subscribe');
    Route::delete('/items/{item:slug}/notify', [StockNotificationController::class, 'unsubscribe'])->name('stock-notifications.unsubscribe');
});

Route::get('/search', [SearchController::class, 'index'])->name('search.index');

Route::get('/sales', [SalesController::class, 'index'])->name('sales.index');

Route::get('/{grandparentSlug}/{parentSlug?}/{childSlug?}', [ItemController::class, 'index'])
    ->name('items.index');

/***********************************************************************************************************************
 * Fallback Route
 * *********************************************************************************************************************/
Route::fallback(function () {
    return Inertia::render('Error', ['status' => 404]);
});
