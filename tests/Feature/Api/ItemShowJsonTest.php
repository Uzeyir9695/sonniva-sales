<?php

use App\Models\Attribute;
use App\Models\Item;
use App\Models\StockNotification;
use App\Models\User;
use Illuminate\Support\Str;
use Laravel\Sanctum\Sanctum;

function makeShowItem(array $overrides = []): Item
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

it('lets a guest view an item without authentication', function () {
    $item = makeShowItem();

    $this->getJson("/api/v1/item/{$item->id}")
        ->assertOk()
        ->assertJsonStructure([
            'item' => ['id', 'name', 'slug'],
            'attributes',
            'similarItems',
            'tierPricing',
            'isSubscribedToNotification',
            'isOrderOnly',
        ])
        ->assertJson(['isSubscribedToNotification' => false]);
});

it('includes the item attributes and similar items from the same category', function () {
    $item = makeShowItem();
    Attribute::create(['item_id' => $item->id, 'bc_attribute_id' => 'color', 'name' => 'Color', 'value' => 'Red']);
    $similar = makeShowItem(['category_code' => $item->category_code]);

    $response = $this->getJson("/api/v1/item/{$item->id}")->assertOk();

    expect($response->json('attributes.0.value'))->toBe('Red')
        ->and(collect($response->json('similarItems'))->pluck('id'))->toContain($similar->id);
});

it('only unlocks VIP/wholesale tier pricing panels for a privileged user', function () {
    $item = makeShowItem([
        'unit_price' => 0,
        'wholesale_discount_percent' => 10,
        'vip_discount_percent' => 20,
        'prices' => [
            ['priceGroup' => 'Retail', 'price' => 50, 'custMinQuantity' => 1, 'UOM' => 'box'],
            ['priceGroup' => 'Wholesales', 'price' => 40, 'custMinQuantity' => 5, 'UOM' => 'box'],
            ['priceGroup' => 'VIP', 'price' => 30, 'custMinQuantity' => 5, 'UOM' => 'box'],
        ],
    ]);

    // Guest / regular user: neither tier shown.
    $this->getJson("/api/v1/item/{$item->id}")
        ->assertOk()
        ->assertJsonCount(0, 'tierPricing');

    // Wholesale-eligible: every non-VIP tier (Retail + Wholesales) — mirrors
    // web's Show.vue template condition, where can_view_wholesales gates any
    // priceGroup !== 'VIP', not just the Wholesales-labeled row.
    $wholesaleUser = User::factory()->create(['can_view_wholesales' => true, 'can_view_vip' => false]);
    Sanctum::actingAs($wholesaleUser);
    $this->getJson("/api/v1/item/{$item->id}")
        ->assertOk()
        ->assertJsonCount(2, 'tierPricing')
        ->assertJsonPath('tierPricing.0.priceGroup', 'Retail')
        ->assertJsonPath('tierPricing.0.price', 50)
        ->assertJsonPath('tierPricing.1.priceGroup', 'Wholesales')
        ->assertJsonPath('tierPricing.1.price', 36); // 40 * 0.9

    // VIP-eligible: only the VIP tier, discounted.
    $vipUser = User::factory()->create(['can_view_vip' => true, 'can_view_wholesales' => false]);
    Sanctum::actingAs($vipUser);
    $this->getJson("/api/v1/item/{$item->id}")
        ->assertOk()
        ->assertJsonCount(1, 'tierPricing')
        ->assertJsonPath('tierPricing.0.priceGroup', 'VIP')
        ->assertJsonPath('tierPricing.0.price', 24); // 30 * 0.8
});

it('reports an active (not yet notified) stock notification subscription', function () {
    $item = makeShowItem(['inventory' => 0]);
    $user = User::factory()->create();
    StockNotification::create(['user_id' => $user->id, 'item_id' => $item->id]);

    Sanctum::actingAs($user);

    $this->getJson("/api/v1/item/{$item->id}")
        ->assertOk()
        ->assertJson(['isSubscribedToNotification' => true]);
});

it('does not report a subscription that has already been notified', function () {
    $item = makeShowItem(['inventory' => 0]);
    $user = User::factory()->create();
    StockNotification::create(['user_id' => $user->id, 'item_id' => $item->id, 'notified_at' => now()]);

    Sanctum::actingAs($user);

    $this->getJson("/api/v1/item/{$item->id}")
        ->assertOk()
        ->assertJson(['isSubscribedToNotification' => false]);
});
