<?php

use App\Jobs\SendOrderEmailJob;
use App\Jobs\SendOrderToBCJob;
use App\Models\Cart;
use App\Models\Item;
use App\Models\Order;
use App\Models\User;
use Illuminate\Support\Facades\Queue;
use Illuminate\Support\Str;

function onBehalfItem(array $overrides = []): Item
{
    return Item::create(array_merge([
        'no' => Str::random(10),
        'category_code' => 'test-category',
        'name' => 'Test Item',
        'slug' => 'test-item-'.Str::random(8),
        'inventory' => 10,
        'unit_price' => 100,
        'discount' => 0,
        'prices' => [],
    ], $overrides));
}

beforeEach(fn () => Queue::fake());

it('places an invoice order for the selected customer, attributed to the admin', function () {
    $admin = User::factory()->create(['role' => 'admin']);
    $customer = User::factory()->create(['role' => 'user', 'has_free_delivery' => true]);

    $item = onBehalfItem();
    $cart = Cart::create(['user_id' => $admin->id, 'item_id' => $item->id, 'quantity' => 2]);

    $this->actingAs($admin)->post(route('initiate.payment.invoice'), [
        'delivery_type' => 'regions',
        'delivery_price_type' => 'region',
        'cart_ids' => [$cart->id],
        'customer_id' => $customer->id,
        'address' => 'Tbilisi, Vake',
        'provider' => 'invoice',
    ])->assertRedirect();

    $order = Order::latest()->firstOrFail();
    expect($order->user_id)->toBe($customer->id)
        ->and($order->placed_by_id)->toBe($admin->id)
        ->and((float) $order->delivery_cost)->toBe(0.0)   // customer's free delivery, not the admin's
        ->and((float) $order->total)->toBe(200.0);

    // The admin's cart is what gets cleared.
    expect(Cart::find($cart->id))->toBeNull();
});

it('sends the confirmation to the customer for an on-behalf cash order', function () {
    $admin = User::factory()->create(['role' => 'admin']);
    $customer = User::factory()->create(['role' => 'user', 'allow_cash_payment' => true]);

    $item = onBehalfItem();
    $cart = Cart::create(['user_id' => $admin->id, 'item_id' => $item->id, 'quantity' => 1]);

    $this->actingAs($admin)->post(route('initiate.payment.cash'), [
        'delivery_type' => 'office',
        'cart_ids' => [$cart->id],
        'customer_id' => $customer->id,
        'provider' => 'cash',
    ])->assertRedirect();

    Queue::assertPushed(SendOrderEmailJob::class, fn ($job) => $job->customer->is($customer));
    Queue::assertPushed(SendOrderToBCJob::class);
});

it('blocks cash when the selected customer is not allowed to pay cash', function () {
    $admin = User::factory()->create(['role' => 'admin']);
    $customer = User::factory()->create(['role' => 'user', 'allow_cash_payment' => false]);

    $item = onBehalfItem();
    $cart = Cart::create(['user_id' => $admin->id, 'item_id' => $item->id, 'quantity' => 1]);

    $this->actingAs($admin)->post(route('initiate.payment.cash'), [
        'delivery_type' => 'office',
        'cart_ids' => [$cart->id],
        'customer_id' => $customer->id,
        'provider' => 'cash',
    ])->assertSessionHasErrors('message');

    expect(Order::count())->toBe(0);
});

it('forbids a non-admin from passing customer_id', function () {
    $user = User::factory()->create(['role' => 'user']);
    $victim = User::factory()->create(['role' => 'user']);

    $item = onBehalfItem();
    $cart = Cart::create(['user_id' => $user->id, 'item_id' => $item->id, 'quantity' => 1]);

    $this->actingAs($user)->post(route('initiate.payment.invoice'), [
        'delivery_type' => 'office',
        'cart_ids' => [$cart->id],
        'customer_id' => $victim->id,
        'provider' => 'invoice',
    ])->assertForbidden();
});
