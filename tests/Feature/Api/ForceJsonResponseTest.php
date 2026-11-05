<?php

use App\Models\Category;
use App\Models\Item;
use Illuminate\Support\Str;
use Inertia\Testing\AssertableInertia as Assert;

function makeForceJsonCategory(): Category
{
    return Category::forceCreate([
        'code' => Str::random(8),
        'name' => 'Test Category',
        'slug' => 'test-category-'.Str::random(8),
        'parent_id' => null,
        'level' => 2,
        'sort_order' => 0,
    ]);
}

it('returns JSON from the items API when the request has no JSON accept header', function () {
    $category = makeForceJsonCategory();

    $this->get("/api/v1/items/{$category->slug}")
        ->assertSuccessful()
        ->assertHeader('Content-Type', 'application/json')
        ->assertJsonStructure(['items', 'breadcrumbs']);
});

it('returns JSON from the item API when the request has no JSON accept header', function () {
    $category = makeForceJsonCategory();

    $item = Item::create([
        'no' => 'ITEM001',
        'category_code' => $category->code,
        'name' => 'Test Item',
        'slug' => 'test-item',
        'inventory' => 5,
        'unit_price' => 10,
    ]);

    $this->get("/api/v1/item/{$item->id}")
        ->assertSuccessful()
        ->assertHeader('Content-Type', 'application/json');
});

it('returns JSON from the home API when the request has no JSON accept header', function () {
    $this->get('/api/v1/home')
        ->assertSuccessful()
        ->assertHeader('Content-Type', 'application/json');
});

it('returns a JSON 404 instead of the Inertia error page for a missing API item', function () {
    $this->get('/api/v1/item/'.Str::uuid())
        ->assertNotFound()
        ->assertHeader('Content-Type', 'application/json');
});

it('returns a JSON 401 instead of a login redirect for a guest on a protected API route', function () {
    $this->get('/api/v1/account')->assertUnauthorized();
});

it('still renders the Inertia error page for a missing item on the web', function () {
    $this->get('/item/does-not-exist')
        ->assertNotFound()
        ->assertInertia(fn (Assert $page) => $page->component('Error'));
});
