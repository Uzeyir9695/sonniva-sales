<?php

use App\Models\Category;
use App\Models\Item;
use Illuminate\Support\Str;
use Inertia\Testing\AssertableInertia as Assert;

function makeItemsIndexCategory(array $overrides = []): Category
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

function makeItemsIndexItem(string $categoryCode, array $overrides = []): Item
{
    return Item::create(array_merge([
        'no' => Str::random(10),
        'category_code' => $categoryCode,
        'name' => 'Test Item',
        'slug' => 'test-item-'.Str::random(8),
        'inventory' => 5,
        'unit_price' => 10,
    ], $overrides));
}

it('returns a JSON paginator for a leaf category when the client wants JSON', function () {
    $top = makeItemsIndexCategory(['code' => 'top-a', 'level' => 1]);
    $sub = makeItemsIndexCategory(['code' => 'sub-a', 'parent_id' => 'top-a', 'level' => 2]);
    $leaf = makeItemsIndexCategory(['code' => 'leaf-1', 'parent_id' => 'sub-a', 'level' => 3]);
    makeItemsIndexItem('leaf-1', ['name' => 'Hammer']);
    makeItemsIndexItem('leaf-1', ['name' => 'Wrench']);

    $response = $this->getJson("/{$leaf->slug}");

    $response->assertSuccessful();
    $response->assertJsonStructure(['data', 'current_page', 'last_page', 'per_page', 'total']);
    $response->assertJsonCount(2, 'data');
});

it('aggregates items from descendant categories for a top-level category JSON request', function () {
    $top = makeItemsIndexCategory(['code' => 'top-1', 'level' => 1]);
    $sub = makeItemsIndexCategory(['code' => 'sub-1', 'parent_id' => 'top-1', 'level' => 2]);
    $leaf = makeItemsIndexCategory(['code' => 'leaf-2', 'parent_id' => 'sub-1', 'level' => 3]);
    makeItemsIndexItem('leaf-2', ['name' => 'Drill']);

    $response = $this->getJson("/{$top->slug}");

    $response->assertSuccessful();
    $response->assertJsonCount(1, 'data');
    $response->assertJsonPath('data.0.name', 'Drill');
});

it('returns a JSON paginator via the dedicated mobile /api/v1/items/{slug} route', function () {
    $top = makeItemsIndexCategory(['code' => 'top-d', 'level' => 1]);
    $sub = makeItemsIndexCategory(['code' => 'sub-d', 'parent_id' => 'top-d', 'level' => 2]);
    $leaf = makeItemsIndexCategory(['code' => 'leaf-4', 'parent_id' => 'sub-d', 'level' => 3]);
    makeItemsIndexItem('leaf-4', ['name' => 'Screwdriver']);

    $response = $this->getJson("/api/v1/items/{$leaf->slug}");

    $response->assertSuccessful();
    $response->assertJsonCount(1, 'data');
    $response->assertJsonPath('data.0.name', 'Screwdriver');
});

it('still returns the Inertia page for a normal browser request', function () {
    $top = makeItemsIndexCategory(['code' => 'top-c', 'level' => 1]);
    $sub = makeItemsIndexCategory(['code' => 'sub-c', 'parent_id' => 'top-c', 'level' => 2]);
    $leaf = makeItemsIndexCategory(['code' => 'leaf-3', 'parent_id' => 'sub-c', 'level' => 3]);
    makeItemsIndexItem('leaf-3', ['name' => 'Saw']);

    $this->get("/{$leaf->slug}")
        ->assertInertia(fn (Assert $page) => $page
            ->component('Items/Index')
            ->where('currentCategorySlug', $leaf->slug)
        );
});
