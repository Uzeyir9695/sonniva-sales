<?php

use App\Models\Category;
use App\Models\Item;

it('does not collide with a soft-deleted item that holds the cleaned slug', function () {
    Category::forceCreate([
        'code' => 'CAT1',
        'name' => 'Test Category',
        'slug' => 'test-category',
        'parent_id' => null,
        'level' => 2,
        'sort_order' => 0,
    ]);

    $trashed = Item::create([
        'no' => 'ITEM001',
        'category_code' => 'CAT1',
        'name' => 'Clean Name',
        'slug' => 'clean-name',
        'inventory' => 1,
        'unit_price' => 10,
    ]);
    $trashed->delete();

    $item = Item::create([
        'no' => 'ITEM002',
        'category_code' => 'CAT1',
        'name' => 'Clean Name',
        'slug' => 'clean,name',
        'inventory' => 1,
        'unit_price' => 10,
    ]);

    $this->artisan('app:fix-item-slugs')->assertSuccessful();

    expect($item->fresh()->slug)->toBe('clean-name-item002');
});
