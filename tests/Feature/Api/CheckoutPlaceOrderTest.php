<?php

use App\Jobs\SendOrderEmailJob;
use App\Jobs\SendOrderToBCJob;
use App\Models\Cart;
use App\Models\Item;
use App\Models\Order;
use App\Models\Payment;
use App\Models\User;
use Illuminate\Support\Facades\Queue;
use Illuminate\Support\Str;
use Laravel\Sanctum\Sanctum;

function checkoutTestItem(array $overrides = []): Item
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
    $this->postJson('/api/v1/checkout', [])->assertUnauthorized();
});

it('places a cash order for a user allowed to pay cash', function () {
    Queue::fake();

    $user = User::factory()->create(['allow_cash_payment' => true]);
    $item = checkoutTestItem();
    $cart = Cart::create(['user_id' => $user->id, 'item_id' => $item->id, 'quantity' => 2]);

    Sanctum::actingAs($user);

    $response = $this->postJson('/api/v1/checkout', [
        'provider' => 'cash',
        'delivery_type' => 'office',
        'cart_ids' => [$cart->id],
    ]);

    $response->assertOk()->assertJsonStructure(['order_id', 'invoice_no', 'payment_id', 'status']);

    $order = Order::find($response->json('order_id'));
    expect($order)->not->toBeNull();
    expect($order->status)->toBe('paid');
    expect((float) $order->total)->toBe(200.0);

    $payment = Payment::find($response->json('payment_id'));
    expect($payment->provider)->toBe('cash');
    expect($payment->status)->toBe('completed');

    expect(Cart::find($cart->id))->toBeNull();

    Queue::assertPushed(SendOrderEmailJob::class);
    Queue::assertPushed(SendOrderToBCJob::class);
});

it('rejects cash for a user not allowed to pay cash', function () {
    $user = User::factory()->create(['allow_cash_payment' => false]);
    $item = checkoutTestItem();
    $cart = Cart::create(['user_id' => $user->id, 'item_id' => $item->id, 'quantity' => 1]);

    Sanctum::actingAs($user);

    $this->postJson('/api/v1/checkout', [
        'provider' => 'cash',
        'delivery_type' => 'office',
        'cart_ids' => [$cart->id],
    ])->assertStatus(422)->assertJsonStructure(['error']);

    expect(Cart::find($cart->id))->not->toBeNull();
});

it('places an invoice order and queues the PDF/email job', function () {
    Queue::fake();

    $user = User::factory()->create();
    $item = checkoutTestItem();
    $cart = Cart::create(['user_id' => $user->id, 'item_id' => $item->id, 'quantity' => 1]);

    Sanctum::actingAs($user);

    $response = $this->postJson('/api/v1/checkout', [
        'provider' => 'invoice',
        'delivery_type' => 'office',
        'cart_ids' => [$cart->id],
    ]);

    $response->assertOk();

    $order = Order::find($response->json('order_id'));
    expect($order->status)->toBe('pending');
    expect($order->invoiced_at)->not->toBeNull();

    $payment = Payment::find($response->json('payment_id'));
    expect($payment->status)->toBe('pending');
});

it('places a limit order', function () {
    $user = User::factory()->create();
    $item = checkoutTestItem();
    $cart = Cart::create(['user_id' => $user->id, 'item_id' => $item->id, 'quantity' => 1]);

    Sanctum::actingAs($user);

    $response = $this->postJson('/api/v1/checkout', [
        'provider' => 'limit',
        'delivery_type' => 'office',
        'cart_ids' => [$cart->id],
    ]);

    $response->assertOk();

    $order = Order::find($response->json('order_id'));
    expect($order->status)->toBe('limit');

    $payment = Payment::find($response->json('payment_id'));
    expect($payment->status)->toBe('completed');
});

it('rejects cart ids that do not belong to the user', function () {
    $user = User::factory()->create();
    $otherUser = User::factory()->create();
    $item = checkoutTestItem();
    $foreignCart = Cart::create(['user_id' => $otherUser->id, 'item_id' => $item->id, 'quantity' => 1]);

    Sanctum::actingAs($user);

    $this->postJson('/api/v1/checkout', [
        'provider' => 'limit',
        'delivery_type' => 'office',
        'cart_ids' => [$foreignCart->id],
    ])->assertStatus(422)->assertJsonStructure(['error']);
});

it('rejects out of stock items', function () {
    $user = User::factory()->create();
    $item = checkoutTestItem(['inventory' => 0]);
    $cart = Cart::create(['user_id' => $user->id, 'item_id' => $item->id, 'quantity' => 1]);

    Sanctum::actingAs($user);

    $this->postJson('/api/v1/checkout', [
        'provider' => 'limit',
        'delivery_type' => 'office',
        'cart_ids' => [$cart->id],
    ])->assertStatus(422)->assertJsonStructure(['error']);
});

it('validates required fields', function () {
    Sanctum::actingAs(User::factory()->create());

    $this->postJson('/api/v1/checkout', [])
        ->assertStatus(422)
        ->assertJsonValidationErrors(['provider', 'delivery_type', 'cart_ids']);
});
