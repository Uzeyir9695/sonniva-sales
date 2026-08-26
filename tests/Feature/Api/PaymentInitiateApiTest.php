<?php

use App\Models\Cart;
use App\Models\Item;
use App\Models\Payment;
use App\Models\User;
use App\Services\Payments\TBCPaymentService;
use Illuminate\Support\Str;
use Laravel\Sanctum\Sanctum;

function paymentInitiateTestItem(array $overrides = []): Item
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

it('rejects an unauthenticated request', function () {
    $this->postJson('/api/v1/payment/initiate', [])->assertUnauthorized();
});

it('initiates a TBC card payment and returns a redirect url, reachable under Sanctum like the web session flow', function () {
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
    $item = paymentInitiateTestItem();
    $cart = Cart::create(['user_id' => $user->id, 'item_id' => $item->id, 'quantity' => 1]);

    Sanctum::actingAs($user);

    $response = $this->postJson('/api/v1/payment/initiate', [
        'provider' => 'tbc',
        'delivery_type' => 'office',
        'cart_ids' => [$cart->id],
    ]);

    $response->assertOk()->assertJsonStructure(['redirect_url', 'payment_id']);
    expect($response->json('redirect_url'))->toBe('https://tbc.example/pay/123');

    $payment = Payment::find($response->json('payment_id'));
    expect($payment->provider)->toBe('tbc');
    expect($payment->status)->toBe('pending');
});

it('surfaces a provider failure as a JSON error instead of an Inertia redirect', function () {
    $this->mock(TBCPaymentService::class, function ($mock) {
        $mock->shouldReceive('createPaymentRequest')->once()->andReturn([
            'success' => false,
            'error' => 'Bank unreachable',
        ]);
    });

    $user = User::factory()->create();
    $item = paymentInitiateTestItem();
    $cart = Cart::create(['user_id' => $user->id, 'item_id' => $item->id, 'quantity' => 1]);

    Sanctum::actingAs($user);

    $this->postJson('/api/v1/payment/initiate', [
        'provider' => 'tbc',
        'delivery_type' => 'office',
        'cart_ids' => [$cart->id],
    ])->assertStatus(400)->assertJsonStructure(['error']);
});
