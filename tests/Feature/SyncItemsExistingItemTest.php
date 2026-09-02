<?php

use App\Models\Attribute;
use App\Models\Category;
use App\Models\Item;
use App\Services\BusinessCentralService;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;

function makeSyncItemsCategory(array $overrides = []): Category
{
    return Category::forceCreate(array_merge([
        'code' => Str::random(8),
        'name' => 'Test Category',
        'slug' => 'test-category-'.Str::random(8),
        'parent_id' => null,
        'level' => 2,
        'sort_order' => 0,
    ], $overrides));
}

it('refreshes an existing item without churning its slug or duplicating attributes', function () {
    $category = makeSyncItemsCategory();

    $item = Item::create([
        'no' => 'ITEM001',
        'category_code' => $category->code,
        'name' => 'Same Name',
        'slug' => 'same-name',
        'inventory' => 1,
        'unit_price' => 10,
    ]);

    Attribute::create([
        'item_id' => $item->id,
        'bc_attribute_id' => 1,
        'name' => 'Color',
        'value' => 'Red',
    ]);

    $this->mock(BusinessCentralService::class, function ($mock) {
        $mock->shouldReceive('getAccessToken')->andReturn('fake-token');
    });

    Http::fake([
        '*/items?*' => Http::response(['value' => [[
            'no' => 'ITEM001',
            'itemCategoryCode' => $category->code,
            'description' => 'Same Name',
            'itemReview' => 'updated description',
            'inventory' => 9,
            'baseUOMDesc' => 'pcs',
            'unitPrice' => 20,
            'minQtyUnitPrice' => 15,
            'itemAttributeValues' => [
                ['itemAttributeId' => 1, 'attributeName' => 'Color', 'attributeValue' => 'Blue'],
            ],
        ]]]),
        '*itemsDetailed*' => Http::response([
            // 1x1 transparent PNG - storeImageFromBase64 runs it through
            // Spatie Image, which needs real image bytes to decode.
            'image1' => 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=',
            'itemUnitPrices' => [],
        ]),
    ]);

    $this->artisan('items:sync', ['no' => 'ITEM001'])->assertSuccessful();

    $item->refresh();

    expect($item->slug)->toBe('same-name');
    expect($item->inventory)->toBe(9);
    expect((float) $item->unit_price)->toBe(20.0);
    expect(Attribute::where('item_id', $item->id)->count())->toBe(1);
    expect(Attribute::where('item_id', $item->id)->first()->value)->toBe('Blue');
});

it('stores BC name and description translations into the locale columns', function () {
    $category = makeSyncItemsCategory();

    $this->mock(BusinessCentralService::class, function ($mock) {
        $mock->shouldReceive('getAccessToken')->andReturn('fake-token');
    });

    Http::fake([
        '*/items?*' => Http::response(['value' => [[
            'no' => 'ITEM003',
            'itemCategoryCode' => $category->code,
            'description' => 'ჩარჩო',
            'itemReview' => 'ქართული აღწერა',
            'inventory' => 1,
            'baseUOMDesc' => null,
            'unitPrice' => 10,
            'minQtyUnitPrice' => 0,
            'itemAttributeValues' => [],
            'itemDescriptions' => [
                ['languageCode' => 'ENG', 'translation' => 'Frame - black wide'],
                ['languageCode' => 'RUS', 'translation' => 'Рама чёрная'],
                ['languageCode' => 'TUR', 'translation' => ''],
            ],
            'itemReviews' => [
                ['languageCode' => 'ENG', 'translation' => 'Durable aluminum frame.'],
                ['languageCode' => 'RUS', 'translation' => 'Прочная алюминиевая рама.'],
            ],
        ]]]),
        '*itemsDetailed*' => Http::response(['itemUnitPrices' => []]),
    ]);

    $this->artisan('items:sync', ['no' => 'ITEM003'])->assertSuccessful();

    $item = Item::where('no', 'ITEM003')->firstOrFail();

    expect($item->getAttributes())
        ->toMatchArray([
            'name_en' => 'Frame - black wide',
            'name_ru' => 'Рама чёрная',
            'name_tr' => null,
            'description_en' => 'Durable aluminum frame.',
            'description_ru' => 'Прочная алюминиевая рама.',
            'description_tr' => null,
        ]);
});

it('gives a renamed existing item a fresh slug instead of colliding with itself', function () {
    $category = makeSyncItemsCategory();

    $item = Item::create([
        'no' => 'ITEM002',
        'category_code' => $category->code,
        'name' => 'Old Name',
        'slug' => 'old-name',
        'inventory' => 1,
        'unit_price' => 10,
    ]);

    $this->mock(BusinessCentralService::class, function ($mock) {
        $mock->shouldReceive('getAccessToken')->andReturn('fake-token');
    });

    Http::fake([
        '*/items?*' => Http::response(['value' => [[
            'no' => 'ITEM002',
            'itemCategoryCode' => $category->code,
            'description' => 'New Name',
            'itemReview' => null,
            'inventory' => 3,
            'baseUOMDesc' => null,
            'unitPrice' => 10,
            'minQtyUnitPrice' => 0,
            'itemAttributeValues' => [],
        ]]]),
        '*itemsDetailed*' => Http::response(['itemUnitPrices' => []]),
    ]);

    $this->artisan('items:sync', ['no' => 'ITEM002'])->assertSuccessful();

    expect($item->fresh()->slug)->toBe('new-name');
});
