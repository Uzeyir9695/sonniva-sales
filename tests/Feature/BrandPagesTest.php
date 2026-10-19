<?php

use App\Models\Attribute;
use App\Models\Item;
use Illuminate\Support\Str;

function makeBrandedItem(?string $brand, array $overrides = []): Item
{
    $item = Item::create(array_merge([
        'no' => Str::random(10),
        'category_code' => 'test-category',
        'name' => 'Test Item',
        'slug' => 'test-item-'.Str::random(8),
        'inventory' => 5,
        'unit_price' => 10,
    ], $overrides));

    if ($brand) {
        Attribute::create(['item_id' => $item->id, 'bc_attribute_id' => 1, 'name' => 'ბრენდი', 'value' => $brand]);
    }

    return $item;
}

it('lists each brand once with its item count, alphabetically', function () {
    makeBrandedItem('TOLSEN');
    makeBrandedItem('TOLSEN');
    makeBrandedItem('DEWALT');
    makeBrandedItem(null);

    $this->get('/brands')
        ->assertSuccessful()
        ->assertInertia(fn ($page) => $page
            ->component('Brands/Index')
            ->has('brands', 2)
            ->where('brands.0.name', 'DEWALT')
            ->where('brands.0.items_count', 1)
            ->where('brands.1.name', 'TOLSEN')
            ->where('brands.1.items_count', 2)
        );
});

it('leaves out brands whose items are all deleted', function () {
    makeBrandedItem('TOLSEN')->delete();

    $this->get('/brands')->assertInertia(fn ($page) => $page->has('brands', 0));
});

it('shows only the selected brand items, in-stock first', function () {
    $outOfStock = makeBrandedItem('TOLSEN', ['inventory' => 0]);
    $inStock = makeBrandedItem('TOLSEN');
    makeBrandedItem('DEWALT');

    $version = $this->withHeaders(['X-Inertia' => 'true'])->get('/brands/TOLSEN')->headers->get('X-Inertia-Version');

    $this->withHeaders([
        'X-Inertia' => 'true',
        'X-Inertia-Version' => $version,
        'X-Inertia-Partial-Data' => 'items',
        'X-Inertia-Partial-Component' => 'Brands/Show',
    ])->get('/brands/TOLSEN')
        ->assertSuccessful()
        ->assertJsonCount(2, 'props.items.data')
        ->assertJsonPath('props.items.data.0.id', $inStock->id)
        ->assertJsonPath('props.items.data.1.id', $outOfStock->id);
});

it('returns 404 for an unknown brand', function () {
    $this->get('/brands/NOPE')->assertNotFound();
});
