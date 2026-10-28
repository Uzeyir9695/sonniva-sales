<?php

use App\Models\Cart;
use App\Models\Item;
use App\Models\Order;
use App\Models\User;
use Illuminate\Support\Facades\Queue;
use Illuminate\Support\Str;

function deliveryOverrideCart(User $owner, float $unitPrice = 100): Cart
{
    $item = Item::create([
        'no' => Str::random(10),
        'category_code' => 'test-category',
        'name' => 'Test Item',
        'slug' => 'test-item-'.Str::random(8),
        'inventory' => 10,
        'unit_price' => $unitPrice,
        'discount' => 0,
        'prices' => [],
    ]);

    return Cart::create(['user_id' => $owner->id, 'item_id' => $item->id, 'quantity' => 1]);
}

function placeTbilisiInvoiceOrder(User $actingUser, Cart $cart, array $overrides = [])
{
    return test()->actingAs($actingUser)->post(route('initiate.payment.invoice'), array_merge([
        'delivery_type' => 'tbilisi',
        'delivery_price_type' => 'tbilisi',
        'city' => 'ვაკე',
        'address' => 'Tbilisi, Vake',
        'cart_ids' => [$cart->id],
        'provider' => 'invoice',
    ], $overrides));
}

beforeEach(fn () => Queue::fake());

it('stores the admin-edited delivery cost instead of the calculated one', function (float $override) {
    $admin = User::factory()->create(['role' => 'admin']);
    $customer = User::factory()->create(['role' => 'user']);

    placeTbilisiInvoiceOrder($admin, deliveryOverrideCart($admin), [
        'customer_id' => $customer->id,
        'delivery_cost_override' => $override,
    ])->assertRedirect();

    $order = Order::latest()->firstOrFail();

    expect((float) $order->delivery_cost)->toBe($override)
        ->and((float) $order->total)->toBe(100 + $override)
        ->and((float) $order->payment->amount)->toBe(100 + $override);
})->with([25.5, 0.0]);

it('overrides free delivery too', function () {
    $admin = User::factory()->create(['role' => 'admin']);
    $customer = User::factory()->create(['role' => 'user', 'has_free_delivery' => true]);

    placeTbilisiInvoiceOrder($admin, deliveryOverrideCart($admin, unitPrice: 600), [
        'customer_id' => $customer->id,
        'delivery_cost_override' => 30,
    ])->assertRedirect();

    expect((float) Order::latest()->firstOrFail()->delivery_cost)->toBe(30.0);
});

it('keeps the calculated delivery cost when no override is sent', function () {
    $admin = User::factory()->create(['role' => 'admin']);
    $customer = User::factory()->create(['role' => 'user']);

    placeTbilisiInvoiceOrder($admin, deliveryOverrideCart($admin), [
        'customer_id' => $customer->id,
        'delivery_cost_override' => null,
    ])->assertRedirect();

    expect((float) Order::latest()->firstOrFail()->delivery_cost)->toBe(6.5);
});

it('forbids a non-admin from overriding the delivery cost', function () {
    $user = User::factory()->create(['role' => 'user']);

    placeTbilisiInvoiceOrder($user, deliveryOverrideCart($user), ['delivery_cost_override' => 0])
        ->assertForbidden();

    expect(Order::count())->toBe(0);
});

it('rejects an invalid delivery cost override', function (mixed $override) {
    $admin = User::factory()->create(['role' => 'admin']);

    placeTbilisiInvoiceOrder($admin, deliveryOverrideCart($admin), ['delivery_cost_override' => $override])
        ->assertSessionHasErrors('delivery_cost_override');

    expect(Order::count())->toBe(0);
})->with([-1, 'abc', 10001]);
