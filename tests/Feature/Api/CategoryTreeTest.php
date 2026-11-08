<?php

use App\Models\Category;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;

beforeEach(fn () => Cache::forget('nav_categories'));

function makeCategory(array $overrides = []): Category
{
    return Category::forceCreate(array_merge([
        'code' => Str::random(8),
        'name' => 'Test Category',
        'slug' => 'test-category-'.Str::random(8),
        'parent_id' => null,
        'sort_order' => 0,
    ], $overrides));
}

it('returns only whitelisted top-level categories, nested subs and items', function () {
    makeCategory(['code' => '1100', 'name' => 'Home', 'sort_order' => 1]);
    makeCategory(['code' => '1100-1', 'name' => 'Furniture', 'parent_id' => '1100', 'sort_order' => 1]);
    makeCategory(['code' => '1100-1-1', 'name' => 'Chairs', 'parent_id' => '1100-1', 'sort_order' => 1]);

    makeCategory(['code' => '9999', 'name' => 'Not whitelisted']);

    $response = $this->getJson('/api/v1/categories');

    $response->assertSuccessful();
    $response->assertJsonCount(1);
    $response->assertJson([
        [
            'code' => '1100',
            'name' => 'Home',
            'subs' => [
                [
                    'name' => 'Furniture',
                    'items_count' => null,
                    'items' => [
                        ['name' => 'Chairs', 'items_count' => 0],
                    ],
                ],
            ],
        ],
    ]);
});
