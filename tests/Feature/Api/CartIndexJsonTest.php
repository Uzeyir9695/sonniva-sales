<?php

use App\Models\Cart;
use App\Models\Item;
use App\Models\User;
use Illuminate\Support\Str;
use Laravel\Sanctum\Sanctum;

function makeCartItem(array $overrides = []): Item
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
    $this->getJson('/api/v1/cart')->assertUnauthorized();
});

it('returns cart rows with a computed pricing block', function () {
    $user = User::factory()->create(['can_view_vip' => false]);
    $item = makeCartItem(['unit_price' => 100, 'discount' => 20]);
    $cart = Cart::create(['user_id' => $user->id, 'item_id' => $item->id, 'quantity' => 2]);

    Sanctum::actingAs($user);

    $response = $this->getJson('/api/v1/cart');

    $response->assertOk()
        ->assertJsonStructure([
            'cartItems' => [['id', 'item_id', 'quantity', 'selected_uom', 'with_service', 'item', 'pricing' => [
                'unit_price', 'original_price', 'retail_price', 'discount_type',
            ]]],
            'subscribedItemIds',
            'isVip',
        ])
        ->assertJson([
            'isVip' => false,
            'cartItems' => [[
                'id' => $cart->id,
                'quantity' => 2,
                'pricing' => ['unit_price' => 80, 'original_price' => 100, 'discount_type' => 'retail'],
            ]],
        ]);
});

it('excludes rows whose item no longer exists', function () {
    $user = User::factory()->create();
    $item = makeCartItem();
    Cart::create(['user_id' => $user->id, 'item_id' => $item->id, 'quantity' => 1]);
    $item->delete();

    Sanctum::actingAs($user);

    $this->getJson('/api/v1/cart')->assertOk()->assertJsonCount(0, 'cartItems');
});

it('only unlocks VIP tier pricing for a VIP user', function () {
    // VIP's custMinQuantity is deliberately higher than Retail's (not tied)
    // so at qty 2 it's an unambiguous match for a VIP viewer — see
    // ItemPricingServiceTest for why a tie would make this depend on
    // stable-sort/array order instead of the quantity actually being tested.
    $item = makeCartItem([
        'unit_price' => 0,
        'vip_discount_percent' => 10,
        'prices' => [
            ['priceGroup' => 'Retail', 'price' => 50, 'custMinQuantity' => 1, 'UOM' => 'box'],
            ['priceGroup' => 'VIP', 'price' => 30, 'custMinQuantity' => 2, 'UOM' => 'box'],
        ],
    ]);

    $regularUser = User::factory()->create(['can_view_vip' => false]);
    Cart::create(['user_id' => $regularUser->id, 'item_id' => $item->id, 'quantity' => 2, 'selected_uom' => 'box']);
    Sanctum::actingAs($regularUser);
    $this->getJson('/api/v1/cart')->assertJsonPath('cartItems.0.pricing.unit_price', 50);

    $vipUser = User::factory()->create(['can_view_vip' => true]);
    Cart::create(['user_id' => $vipUser->id, 'item_id' => $item->id, 'quantity' => 2, 'selected_uom' => 'box']);
    Sanctum::actingAs($vipUser);
    $this->getJson('/api/v1/cart')->assertJsonPath('cartItems.0.pricing.unit_price', 27); // 30 * 0.9
});
