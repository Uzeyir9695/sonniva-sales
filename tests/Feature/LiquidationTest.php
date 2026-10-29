<?php

use App\Models\Item;
use App\Models\LiquidationItem;
use App\Models\User;
use Illuminate\Support\Str;

function liquidationItem(array $overrides = []): Item
{
    return Item::create(array_merge([
        'no' => Str::random(10),
        'name' => 'Test Item',
        'slug' => 'item-'.Str::random(8),
        'inventory' => 5,
        'unit_price' => 10,
    ], $overrides));
}

it('adds an item to the liquidation list and removes it on the next toggle', function () {
    $item = liquidationItem();
    $this->actingAs(User::factory()->create(['role' => 'admin']));

    $this->postJson(route('admin.items.liquidation.toggle', $item))
        ->assertOk()
        ->assertJson(['is_liquidation' => true]);
    expect(LiquidationItem::where('item_id', $item->id)->exists())->toBeTrue();

    $this->postJson(route('admin.items.liquidation.toggle', $item))
        ->assertOk()
        ->assertJson(['is_liquidation' => false]);
    expect(LiquidationItem::where('item_id', $item->id)->exists())->toBeFalse();
});

it('flags liquidation items in admin search', function () {
    $item = liquidationItem(['name' => 'Liquidated drill']);
    $item->liquidation()->create();
    $this->actingAs(User::factory()->create(['role' => 'admin']));

    $this->getJson(route('admin.items.search', ['q' => 'Liquidated']))
        ->assertOk()
        ->assertJsonPath('0.is_liquidation', true);
});

it('forbids customers from toggling liquidation', function () {
    $item = liquidationItem();
    $this->actingAs(User::factory()->create(['role' => 'customer']));

    $this->postJson(route('admin.items.liquidation.toggle', $item))->assertForbidden();
});

it('shows only liquidation items to any visitor, in-stock first', function () {
    $outOfStock = liquidationItem(['inventory' => 0]);
    $outOfStock->liquidation()->create();
    $inStock = liquidationItem();
    $inStock->liquidation()->create();
    liquidationItem();

    $this->get(route('liquidation.index'))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('Liquidation/Index')
            ->loadDeferredProps(fn ($reload) => $reload
                ->has('items.data', 2)
                ->where('items.data.0.id', $inStock->id)
                ->where('items.data.1.id', $outOfStock->id)
            )
        );
});

it('lists liquidation items on the admin liquidation page', function () {
    $listed = liquidationItem(['name' => 'Listed']);
    $listed->liquidation()->create();
    liquidationItem(['name' => 'Not listed']);

    $this->actingAs(User::factory()->create(['role' => 'pricing_manager']))
        ->get(route('admin.items.liquidation'))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('Admin/items/DiscountedItems')
            ->where('title', 'Liquidation Items')
            ->has('items', 1)
            ->where('items.0.id', $listed->id)
            ->where('items.0.is_liquidation', true)
        );
});

it('hides the admin liquidation page from customers', function () {
    $this->actingAs(User::factory()->create(['role' => 'customer']))
        ->get(route('admin.items.liquidation'))
        ->assertForbidden();
});
