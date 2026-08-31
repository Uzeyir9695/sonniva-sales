<?php

use App\Models\Category;
use App\Models\Item;
use Illuminate\Support\Str;

function makeSearchKeywordCategory(array $overrides = []): Category
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

function makeSearchKeywordItem(string $categoryCode, array $overrides = []): Item
{
    return Item::create(array_merge([
        'no' => Str::random(10),
        'category_code' => $categoryCode,
        'name' => 'ტესტ ნივთი',
        'slug' => 'test-item-'.Str::random(8),
        'inventory' => 5,
        'unit_price' => 10,
    ], $overrides));
}

it('finds keyword-matched items on the deferred search reload', function () {
    $category = makeSearchKeywordCategory();
    $item = makeSearchKeywordItem($category->code, ['en_keywords' => 'drawer slide']);

    $version = $this->withHeaders(['X-Inertia' => 'true'])
        ->get('/search?q=drawer')
        ->headers->get('X-Inertia-Version');

    // Inertia's automatic deferred-prop reload (fired on page mount and on
    // every filter change) reuses the page's query string, so the keyword
    // match must survive purely via the `q` param.
    $response = $this->withHeaders([
        'X-Inertia' => 'true',
        'X-Inertia-Version' => $version,
        'X-Inertia-Partial-Data' => 'items',
        'X-Inertia-Partial-Component' => 'Search/Index',
    ])->get('/search?q=drawer');

    $response->assertSuccessful();
    $response->assertJsonPath('props.items.data.0.id', $item->id);
});
