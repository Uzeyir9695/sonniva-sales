<?php

use App\Models\Cart;
use App\Models\Item;
use App\Models\Order;
use App\Models\Payment;
use App\Models\User;
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

function mockTbcSuccess(): void
{
    test()->mock(TBCPaymentService::class, function ($mock) {
        $mock->shouldReceive('createPaymentRequest')->once()->andReturn([
            'success' => true,
            'redirect_url' => 'https://tbc.example/pay/123',
            'order_id' => 'tbc-order-1',
            'payment_id' => 'tbc-payment-1',
            'raw_response' => ['ok' => true],
        ]);
    });
}

it('bridges success back to the app via deep link when initiated with platform=mobile', function () {
    mockTbcSuccess();

    $user = User::factory()->create();
    $item = mobileBridgeTestItem();
    $cart = Cart::create(['user_id' => $user->id, 'item_id' => $item->id, 'quantity' => 1]);

    $this->actingAs($user);

    $this->post(route('payment.initiate'), [
        'provider' => 'tbc',
        'delivery_type' => 'office',
        'cart_ids' => [$cart->id],
        'platform' => 'mobile',
    ])->assertOk();

    $response = $this->get(route('payment.success', ['provider' => 'tbc']));

    $response->assertOk()->assertViewIs('payment.mobile-bridge');
    expect($response->original->getData()['url'])
        ->toStartWith('sonniva://payment/success?invoice_no=');
});

it('still renders the Inertia success page when initiated without platform=mobile', function () {
    mockTbcSuccess();

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

it('bridges a cancellation without consuming invoice_no from session', function () {
    mockTbcSuccess();

    $user = User::factory()->create();
    $item = mobileBridgeTestItem();
    $cart = Cart::create(['user_id' => $user->id, 'item_id' => $item->id, 'quantity' => 1]);

    $this->actingAs($user);

    $this->post(route('payment.initiate'), [
        'provider' => 'tbc',
        'delivery_type' => 'office',
        'cart_ids' => [$cart->id],
        'platform' => 'mobile',
    ])->assertOk();

    $cancel = $this->get(route('payment.cancel', ['provider' => 'tbc']));
    $cancel->assertOk()->assertViewIs('payment.mobile-bridge');
    expect($cancel->original->getData()['url'])->toStartWith('sonniva://payment/cancel?');

    // A retried attempt's success() should still be able to pull invoice_no —
    // cancel() must not have consumed it destructively.
    expect(session('invoice_no'))->not->toBeNull();
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
