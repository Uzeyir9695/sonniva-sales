<?php

use App\Models\Cart;
use App\Models\Item;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Payment;
use App\Models\User;
use Illuminate\Support\Str;
use Laravel\Sanctum\Sanctum;

function ordersApiItem(array $overrides = []): Item
{
    return Item::create(array_merge([
        'no' => Str::random(10),
        'category_code' => 'test-category',
        'name' => 'Test Item',
        'slug' => 'test-item-'.Str::random(8),
        'images' => ['a.jpg'],
        'inventory' => 10,
        'unit_price' => 100,
        'discount' => 0,
        'fake_price' => null,
        'wholesale_discount_percent' => 0,
        'vip_discount_percent' => 0,
        'prices' => [],
    ], $overrides));
}

function ordersApiOrder(User $user, array $overrides = []): Order
{
    $order = Order::factory()->for($user)->create(array_merge([
        'status' => 'paid',
        'subtotal' => 200,
        'total' => 270,
        'delivery_cost' => 70,
    ], $overrides));

    $item = ordersApiItem();
    OrderItem::create([
        'order_id' => $order->id,
        'item_id' => $item->id,
        'quantity' => 2,
        'unit_price' => 100,
        'subtotal' => 200,
    ]);

    return $order;
}

it('rejects unauthenticated requests', function () {
    $this->getJson('/api/v1/orders')->assertUnauthorized();
});

it('returns the paginated order list as JSON with a summary', function () {
    $user = User::factory()->create();
    ordersApiOrder($user);
    Order::factory()->for($user)->create(['status' => 'awaiting_payment']);

    Sanctum::actingAs($user);

    $res = $this->getJson('/api/v1/orders')->assertOk();

    $res->assertJsonPath('orders.total', 1)
        ->assertJsonStructure([
            'orders' => ['data' => [['id', 'invoice_no', 'status', 'total', 'discount_total', 'created_at', 'items']], 'current_page', 'last_page'],
            'ordersSummary' => ['total', 'discount'],
        ]);
});

it('only returns the authenticated user\'s orders', function () {
    $me = User::factory()->create();
    $other = User::factory()->create();
    ordersApiOrder($me);
    $theirOrder = ordersApiOrder($other);

    Sanctum::actingAs($me);

    $this->getJson('/api/v1/orders')
        ->assertOk()
        ->assertJsonPath('orders.total', 1)
        ->assertJsonMissing(['id' => $theirOrder->id]);
});

it('returns a single order detail with item ids', function () {
    $user = User::factory()->create();
    $order = ordersApiOrder($user);
    Payment::create([
        'user_id' => $user->id,
        'order_id' => $order->id,
        'provider' => 'bog',
        'status' => 'completed',
        'amount' => 270,
    ]);

    Sanctum::actingAs($user);

    $this->getJson("/api/v1/orders/{$order->id}")
        ->assertOk()
        ->assertJsonPath('order.id', $order->id)
        ->assertJsonPath('order.payment.provider', 'bog')
        ->assertJsonStructure(['order' => ['items' => [['item_id', 'item_no', 'item_name', 'item_slug', 'quantity', 'subtotal']]]]);
});

it('forbids viewing another user\'s order', function () {
    $order = ordersApiOrder(User::factory()->create());

    Sanctum::actingAs(User::factory()->create());

    $this->getJson("/api/v1/orders/{$order->id}")->assertForbidden();
});

it('reorders selected items into the cart', function () {
    $user = User::factory()->create();
    $order = ordersApiOrder($user);
    $orderItemId = $order->items()->value('id');

    Sanctum::actingAs($user);

    $this->postJson("/api/v1/orders/{$order->id}/reorder", ['order_item_ids' => [$orderItemId]])
        ->assertOk()
        ->assertJsonPath('added', 1);

    expect(Cart::where('user_id', $user->id)->count())->toBe(1);
});
