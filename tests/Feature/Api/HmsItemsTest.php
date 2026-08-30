<?php

use App\Models\Attribute;
use App\Models\Category;
use App\Models\Item;
use Illuminate\Support\Str;

function makeHmsCategory(array $overrides = []): Category
{
    return Category::forceCreate(array_merge([
        'code' => Str::random(8),
        'name' => 'Test Category',
        'slug' => 'test-category-'.Str::random(8),
        'parent_id' => null,
        'level' => 1,
        'sort_order' => 0,
    ], $overrides));
}

function makeHmsItem(string $categoryCode, ?string $brand, array $overrides = []): Item
{
    $item = Item::create(array_merge([
        'no' => Str::random(10),
        'category_code' => $categoryCode,
        'name' => 'Test Item',
        'slug' => 'test-item-'.Str::random(8),
        'inventory' => 5,
        'unit_price' => 10,
    ], $overrides));

    if ($brand !== null) {
        Attribute::create([
            'item_id' => $item->id,
            'bc_attribute_id' => 1,
            'name' => 'ბრენდი',
            'value' => $brand,
        ]);
    }

    return $item;
}

it('returns HMS and HMSFIX items grouped by their second-level category', function () {
    makeHmsCategory(['code' => '1100', 'level' => 1]);
    makeHmsCategory(['code' => '1101', 'name' => 'Hinges', 'parent_id' => '1100', 'level' => 2]);
    makeHmsCategory(['code' => '1101-01', 'name' => 'Soft-close hinges', 'parent_id' => '1101', 'level' => 3]);
    makeHmsCategory(['code' => '1102', 'name' => 'Drawer slides', 'parent_id' => '1100', 'level' => 2]);

    makeHmsItem('1101', 'HMS', ['name' => 'Hinge A']);
    makeHmsItem('1101-01', 'HMSFIX', ['name' => 'Hinge B']);
    makeHmsItem('1102', 'HMS', ['name' => 'Slide A']);

    makeHmsItem('1102', 'Blum', ['name' => 'Other brand']);
    makeHmsItem('1102', null, ['name' => 'No brand']);

    $response = $this->getJson('/api/hms/items');

    $response->assertSuccessful();
    $response->assertJsonPath('brands', ['HMS', 'HMSFIX']);
    $response->assertJsonPath('items_count', 3);
    $response->assertJsonCount(2, 'groups');

    $response->assertJson([
        'groups' => [
            ['category_code' => '1101', 'category_name' => 'Hinges', 'items_count' => 2],
            ['category_code' => '1102', 'category_name' => 'Drawer slides', 'items_count' => 1],
        ],
    ]);
});

it('includes each item\'s attributes in the payload', function () {
    makeHmsCategory(['code' => '2101', 'name' => 'Lighting', 'level' => 2]);
    makeHmsItem('2101', 'HMS', ['name' => 'Strip light']);

    $response = $this->getJson('/api/hms/items');

    $response->assertSuccessful();
    $response->assertJsonPath('groups.0.items.0.attributes.0.name', 'ბრენდი');
});

it('excludes soft-deleted items', function () {
    makeHmsCategory(['code' => '1101', 'name' => 'Hinges', 'level' => 2]);
    $item = makeHmsItem('1101', 'HMS');
    $item->delete();

    $response = $this->getJson('/api/hms/items');

    $response->assertSuccessful();
    $response->assertJsonPath('items_count', 0);
    $response->assertJsonCount(0, 'groups');
});

it('does not require authentication', function () {
    $this->getJson('/api/hms/items')->assertSuccessful();
});
