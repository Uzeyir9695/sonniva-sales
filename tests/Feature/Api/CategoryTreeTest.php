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

it('reports items_count on leaf-level subs with no further children', function () {
    makeCategory(['code' => '1200', 'name' => 'Electronics']);
    makeCategory(['code' => '1200-1', 'name' => 'Phones', 'parent_id' => '1200']);

    $response = $this->getJson('/api/v1/categories');

    $response->assertSuccessful();
    $response->assertJsonPath('0.subs.0.items_count', 0);
    $response->assertJsonPath('0.subs.0.items', []);
});

it('returns an empty subs array for a top-level category with no children', function () {
    makeCategory(['code' => '1300', 'name' => 'Leaf category']);

    $response = $this->getJson('/api/v1/categories');

    $response->assertSuccessful();
    $response->assertJsonPath('0.subs', []);
});

it('does not require authentication', function () {
    makeCategory(['code' => '1400']);

    $this->getJson('/api/v1/categories')->assertSuccessful();
});
