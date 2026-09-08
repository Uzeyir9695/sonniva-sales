<?php

use App\Models\Category;
use App\Models\Item;
use Illuminate\Support\Str;

function makeCutCategory(string $code, ?string $parentId, int $level): Category
{
    return Category::forceCreate([
        'code' => $code,
        'name' => 'Cat '.$code,
        'slug' => 'cat-'.$code.'-'.Str::random(6),
        'parent_id' => $parentId,
        'level' => $level,
        'sort_order' => 0,
    ]);
}

function makeCutItem(string $categoryCode): Item
{
    return Item::create([
        'no' => 'SKU'.Str::random(6),
        'name' => 'ტესტ პროდუქტი',
        'slug' => 'item-'.Str::random(8),
        'category_code' => $categoryCode,
        'inventory' => 5,
        'unit_price' => 10,
    ]);
}

it('offers the custom-cut service when a listed ancestor category matches', function () {
    makeCutCategory('1400', null, 1);
    makeCutCategory('1499', '1400', 2);
    $item = makeCutItem('1499');

    $this->get(route('items.show', $item))
        ->assertOk()
        ->assertInertia(fn ($page) => $page->where('offersCustomCut', true));
});

it('offers the custom-cut service when the leaf category itself is listed', function () {
    makeCutCategory('1600', null, 1);
    makeCutCategory('1604', '1600', 2);
    makeCutCategory('1604-01', '1604', 3);
    $item = makeCutItem('1604-01');

    $this->get(route('items.show', $item))
        ->assertOk()
        ->assertInertia(fn ($page) => $page->where('offersCustomCut', true));
});

it('does not offer the custom-cut service for unlisted categories', function () {
    makeCutCategory('1100', null, 1);
    makeCutCategory('1101', '1100', 2);
    $item = makeCutItem('1101');

    $this->get(route('items.show', $item))
        ->assertOk()
        ->assertInertia(fn ($page) => $page->where('offersCustomCut', false));
});
