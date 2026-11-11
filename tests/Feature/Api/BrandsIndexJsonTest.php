<?php

use App\Models\Attribute;
use App\Models\Item;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;

function brandedItem(string $brand): Item
{
    $item = Item::create([
        'no' => Str::random(10),
        'name' => 'Test Item',
        'slug' => 'item-'.Str::random(8),
        'inventory' => 5,
        'unit_price' => 10,
    ]);

    Attribute::create(['item_id' => $item->id, 'bc_attribute_id' => 1, 'name' => 'ბრენდი', 'value' => $brand]);

    return $item;
}

beforeEach(fn () => Cache::forget('brands_list'));

it('returns brands as JSON for the mobile app, alphabetically with item counts', function () {
    brandedItem('Makita');
    brandedItem('Bosch');
    brandedItem('Bosch');

    $this->getJson(route('api.brands.index'))
        ->assertOk()
        ->assertExactJson(['brands' => [
            ['name' => 'Bosch', 'items_count' => 2],
            ['name' => 'Makita', 'items_count' => 1],
        ]]);
});

it('ignores non-brand attributes', function () {
    $item = brandedItem('Bosch');
    Attribute::create(['item_id' => $item->id, 'bc_attribute_id' => 2, 'name' => 'ფერი', 'value' => 'Red']);

    $this->getJson(route('api.brands.index'))
        ->assertOk()
        ->assertJsonCount(1, 'brands')
        ->assertJsonPath('brands.0.name', 'Bosch');
});

it('returns an empty list when there are no brands', function () {
    $this->getJson(route('api.brands.index'))
        ->assertOk()
        ->assertExactJson(['brands' => []]);
});
