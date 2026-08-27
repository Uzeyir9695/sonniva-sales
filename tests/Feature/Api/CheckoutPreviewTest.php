<?php

use App\Models\Cart;
use App\Models\Item;
use App\Models\Order;
use App\Models\User;
use Illuminate\Support\Str;
use Laravel\Sanctum\Sanctum;

function checkoutPreviewTestItem(array $overrides = []): Item
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
    $this->postJson('/api/v1/checkout/preview', [])->assertUnauthorized();
});

it('returns a pricing breakdown without creating an order or touching the cart', function () {
    $user = User::factory()->create();
    $item = checkoutPreviewTestItem();
    $cart = Cart::create(['user_id' => $user->id, 'item_id' => $item->id, 'quantity' => 2]);

    Sanctum::actingAs($user);

    $response = $this->postJson('/api/v1/checkout/preview', [
        'delivery_type' => 'office',
        'cart_ids' => [$cart->id],
    ]);

    $response->assertOk()->assertJsonStructure([
        'subtotal', 'wholesale_discount', 'delivery_cost', 'total', 'items',
    ])->assertJson(['subtotal' => 200, 'delivery_cost' => 0, 'total' => 200]);

    expect(Cart::find($cart->id))->not->toBeNull();
    expect(Order::count())->toBe(0);
});

it('charges a normal item the weight-based Tbilisi tariff under 50kg', function () {
    $user = User::factory()->create();
    $item = checkoutPreviewTestItem(['weights' => [['uom' => 'PCS', 'weight' => 10]]]);
    $cart = Cart::create(['user_id' => $user->id, 'item_id' => $item->id, 'quantity' => 1]);

    Sanctum::actingAs($user);

    $this->postJson('/api/v1/checkout/preview', [
        'delivery_type' => 'tbilisi',
        'delivery_price_type' => 'tbilisi',
        'city' => 'ვაკე',
        'cart_ids' => [$cart->id],
    ])->assertOk()->assertJson(['delivery_cost' => 11]);
});

it('charges a zone-only item the flat Tbilisi zone rate even under 50kg', function () {
    $user = User::factory()->create();
    $item = checkoutPreviewTestItem(['no' => 'ALU00865-011', 'weights' => [['uom' => 'PCS', 'weight' => 10]]]);
    $cart = Cart::create(['user_id' => $user->id, 'item_id' => $item->id, 'quantity' => 1]);

    Sanctum::actingAs($user);

    $this->postJson('/api/v1/checkout/preview', [
        'delivery_type' => 'tbilisi',
        'delivery_price_type' => 'tbilisi',
        'city' => 'ვაკე',
        'cart_ids' => [$cart->id],
    ])->assertOk()->assertJson(['delivery_cost' => 50]);
});

it('leaves regions delivery on the weight-based tariff for a zone-only item', function () {
    $user = User::factory()->create();
    $item = checkoutPreviewTestItem(['no' => 'ALU00865-011', 'weights' => [['uom' => 'PCS', 'weight' => 10]]]);
    $cart = Cart::create(['user_id' => $user->id, 'item_id' => $item->id, 'quantity' => 1]);

    Sanctum::actingAs($user);

    $this->postJson('/api/v1/checkout/preview', [
        'delivery_type' => 'regions',
        'delivery_price_type' => 'region',
        'cart_ids' => [$cart->id],
    ])->assertOk()->assertJson(['delivery_cost' => 16]);
});

it('rejects unknown cart ids with a 422', function () {
    Sanctum::actingAs(User::factory()->create());

    $this->postJson('/api/v1/checkout/preview', [
        'delivery_type' => 'office',
        'cart_ids' => [(string) Str::uuid()],
    ])->assertStatus(422)->assertJsonStructure(['error']);
});
