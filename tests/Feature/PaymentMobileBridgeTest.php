<?php

use App\Models\Cart;
use App\Models\Item;
use App\Models\Order;
use App\Models\Payment;
use App\Models\User;
use App\Services\Payments\BOGPaymentService;
use App\Services\Payments\TBCPaymentService;
use Illuminate\Support\Str;
use Inertia\Testing\AssertableInertia as Assert;
use Laravel\Sanctum\Sanctum;

function mobileBridgeTestItem(array $overrides = []): Item
{
    return Item::create(array_merge([
        'no' => Str::random(10),
        'category_code' => 'test-category',
        'name' => 'Test Item',
        'slug' => 'test-item-'.Str::random(8),
        'inventory' => 5,
        'unit_price' => 100,
        'discount' => 0,
        'fake_price' => null,
        'wholesale_discount_percent' => 0,
        'vip_discount_percent' => 0,
        'prices' => [],
    ], $overrides));
}

/**
 * initiate() is called by the mobile app over Sanctum (Bearer token, no
 * cookies); success()/cancel() are later hit by the bank redirecting the
 * user's OWN browser (Browser::auth() — a completely separate HTTP client
 * sharing no cookies with the app at all). Laravel's test session (array
 * driver) would otherwise silently persist across both calls within one
 * test regardless of cookies, masking exactly this gap — so every mobile
 * assertion below explicitly flushes the session between the two calls to
 * simulate the real disconnect.
 */
it('bridges a mobile BOG success purely from the return URL, with no session at all', function () {
    $capturedReturnUrl = null;

    $this->mock(BOGPaymentService::class, function ($mock) use (&$capturedReturnUrl) {
        $mock->shouldReceive('createPaymentRequest')
            ->once()
            ->withArgs(function ($order, $returnUrl, $totalAmount, $language = 'ka', $cancelUrl = null) use (&$capturedReturnUrl) {
                $capturedReturnUrl = $returnUrl;

                return true;
            })
            ->andReturn([
                'success' => true,
                'redirect_url' => 'https://bog.example/pay/123',
                'order_id' => 'bog-order-1',
                'raw_response' => ['ok' => true],
            ]);
    });

    $user = User::factory()->create();
    $item = mobileBridgeTestItem();
    $cart = Cart::create(['user_id' => $user->id, 'item_id' => $item->id, 'quantity' => 1]);

    Sanctum::actingAs($user);

    $this->postJson('/api/v1/payment/initiate', [
        'provider' => 'bog',
        'delivery_type' => 'office',
        'cart_ids' => [$cart->id],
        'platform' => 'mobile',
    ])->assertOk();

    expect($capturedReturnUrl)
        ->toContain('platform=mobile')
        ->toContain('invoice_no=');

    session()->flush();

    $response = $this->get($capturedReturnUrl);

    $response->assertOk()->assertViewIs('payment.mobile-bridge');
    expect($response->original->getData()['url'])->toStartWith('sonniva://payment/success?invoice_no=');
});

it('bridges a mobile BOG cancellation purely from the URL, with no session at all', function () {
    $capturedCancelUrl = null;

    $this->mock(BOGPaymentService::class, function ($mock) use (&$capturedCancelUrl) {
        $mock->shouldReceive('createPaymentRequest')
            ->once()
            ->withArgs(function ($order, $returnUrl, $totalAmount, $language = 'ka', $cancelUrl = null) use (&$capturedCancelUrl) {
                $capturedCancelUrl = $cancelUrl;

                return true;
            })
            ->andReturn([
                'success' => true,
                'redirect_url' => 'https://bog.example/pay/123',
                'order_id' => 'bog-order-1',
                'raw_response' => ['ok' => true],
            ]);
    });

    $user = User::factory()->create();
    $item = mobileBridgeTestItem();
    $cart = Cart::create(['user_id' => $user->id, 'item_id' => $item->id, 'quantity' => 1]);

    Sanctum::actingAs($user);

    $this->postJson('/api/v1/payment/initiate', [
        'provider' => 'bog',
        'delivery_type' => 'office',
        'cart_ids' => [$cart->id],
        'platform' => 'mobile',
    ])->assertOk();

    expect($capturedCancelUrl)->toContain('platform=mobile')->toContain('invoice_no=');

    session()->flush();

    $response = $this->get($capturedCancelUrl);

    $response->assertOk()->assertViewIs('payment.mobile-bridge');
    expect($response->original->getData()['url'])->toStartWith('sonniva://payment/cancel?');
});

it('still renders the Inertia success page for a non-mobile (web) payment', function () {
    $this->mock(TBCPaymentService::class, function ($mock) {
        $mock->shouldReceive('createPaymentRequest')->once()->andReturn([
            'success' => true,
            'redirect_url' => 'https://tbc.example/pay/123',
            'order_id' => 'tbc-order-1',
            'payment_id' => 'tbc-payment-1',
            'raw_response' => ['ok' => true],
        ]);
    });

    $user = User::factory()->create();
    $item = mobileBridgeTestItem();
    $cart = Cart::create(['user_id' => $user->id, 'item_id' => $item->id, 'quantity' => 1]);

    $this->actingAs($user);

    $this->post(route('payment.initiate'), [
        'provider' => 'tbc',
        'delivery_type' => 'office',
        'cart_ids' => [$cart->id],
    ])->assertOk();

    $this->get(route('payment.success', ['provider' => 'tbc']))
        ->assertInertia(fn (Assert $page) => $page->component('Payment/Success'));
});

it('does not require a web session on payment.success/cancel — the bug that sent mobile users to /login', function () {
    // Fully unauthenticated, no session at all — exactly what the bank's
    // redirect hits in the real mobile flow.
    $this->get(route('payment.success', ['provider' => 'bog']))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page->component('Payment/Success'));

    $this->get(route('payment.cancel', ['provider' => 'bog']))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page->component('Payment/Cancel'));
});

it('rejects unauthenticated payment status requests', function () {
    $this->getJson('/api/v1/payment/status?invoice_no=S000000')->assertUnauthorized();
});

it('returns the true payment status for the owning user', function () {
    $user = User::factory()->create();
    $order = Order::factory()->create(['user_id' => $user->id]);
    $payment = Payment::factory()->create([
        'user_id' => $user->id,
        'order_id' => $order->id,
        'invoice_no' => 'S123456',
        'provider' => 'tbc',
        'status' => 'completed',
    ]);

    Sanctum::actingAs($user);

    $this->getJson('/api/v1/payment/status?invoice_no='.$payment->invoice_no)
        ->assertOk()
        ->assertJson([
            'invoice_no' => 'S123456',
            'provider' => 'tbc',
            'status' => 'completed',
        ]);
});

it("does not leak another user's payment status", function () {
    $owner = User::factory()->create();
    $stranger = User::factory()->create();
    $order = Order::factory()->create(['user_id' => $owner->id]);

    $payment = Payment::factory()->create([
        'user_id' => $owner->id,
        'order_id' => $order->id,
        'invoice_no' => 'S999999',
        'status' => 'completed',
    ]);

    Sanctum::actingAs($stranger);

    $this->getJson('/api/v1/payment/status?invoice_no='.$payment->invoice_no)
        ->assertNotFound();
});
