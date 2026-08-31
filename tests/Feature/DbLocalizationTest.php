<?php

use App\Models\Category;
use App\Models\Item;
use App\Models\Translation;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

afterEach(fn () => app()->setLocale(config('app.default_locale')));

function makeLocalizationCategory(array $overrides = []): Category
{
    return Category::forceCreate(array_merge([
        'code' => Str::random(8),
        'name' => 'ავეჯის ფურნიტურა',
        'slug' => 'cat-'.Str::random(6),
        'parent_id' => null,
        'level' => 1,
        'sort_order' => 0,
    ], $overrides));
}

it('returns the raw column on the default locale and the translation otherwise', function () {
    $category = makeLocalizationCategory(['name_en' => 'Furniture hardware', 'name_ru' => 'Мебельная фурнитура']);

    app()->setLocale('ka');
    expect($category->fresh()->name)->toBe('ავეჯის ფურნიტურა');

    app()->setLocale('en');
    expect($category->fresh()->name)->toBe('Furniture hardware');

    app()->setLocale('ru');
    expect($category->fresh()->name)->toBe('Мебельная фурнитура');
});

it('falls back to the raw column when the translation is missing', function () {
    $category = makeLocalizationCategory(['name_en' => 'Furniture hardware']);

    app()->setLocale('tr');
    expect($category->fresh()->name)->toBe('ავეჯის ფურნიტურა');
});

it('translates dictionary strings for the active locale with source fallback', function () {
    Translation::create(['source_text' => 'წითელი', 'en' => 'Red', 'ru' => 'Красный']);

    app()->setLocale('en');
    expect(Translation::get('წითელი'))->toBe('Red');
    expect(Translation::get('ლურჯი'))->toBe('ლურჯი');

    app()->setLocale('ka');
    expect(Translation::get('წითელი'))->toBe('წითელი');
});

it('imports translated category and item files keyed by business key', function () {
    Storage::fake('local');

    $category = makeLocalizationCategory(['code' => 'TESTCAT']);
    $item = Item::create([
        'no' => 'TESTSKU',
        'name' => 'უჯრის სისტემა',
        'slug' => 'item-'.Str::random(6),
        'inventory' => 1,
        'unit_price' => 10,
    ]);

    Storage::put('localization/categories.json', json_encode([
        'TESTCAT' => ['source' => 'x', 'en' => 'Furniture hardware', 'ru' => '', 'tr' => 'Mobilya aksesuarları'],
    ]));
    Storage::put('localization/items_name.json', json_encode([
        'TESTSKU' => ['source' => 'x', 'en' => 'Drawer system', 'ru' => '', 'tr' => ''],
    ]));

    $this->artisan('localize:import', ['file' => 'localization/categories.json', '--review' => true])->assertOk();
    $this->artisan('localize:import', ['file' => 'localization/items_name.json'])->assertOk();

    $category->refresh();
    expect($category->name_en)->toBe('Furniture hardware')
        ->and($category->name_ru)->toBeNull()
        ->and($category->name_tr)->toBe('Mobilya aksesuarları')
        ->and($category->needs_review)->toBeTrue();

    expect($item->fresh()->name_en)->toBe('Drawer system');
});
