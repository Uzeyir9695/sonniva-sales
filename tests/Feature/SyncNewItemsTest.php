<?php

use App\Models\Category;
use App\Models\Item;
use App\Services\BusinessCentralService;
use Illuminate\Http\Client\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Sleep;
use Illuminate\Support\Str;

function makeNewItemsCategory(string $code, int $level = 2): Category
{
    return Category::forceCreate([
        'code' => $code,
        'name' => "Category {$code}",
        'slug' => 'category-'.Str::random(8),
        'parent_id' => null,
        'level' => $level,
        'sort_order' => 0,
    ]);
}

function makeNewItemsExistingItem(string $no, string $categoryCode): Item
{
    return Item::create([
        'no' => $no,
        'category_code' => $categoryCode,
        'name' => "Name {$no}",
        'slug' => Str::slug($no),
        'inventory' => 1,
        'unit_price' => 10,
    ]);
}

/**
 * @param  array<string, string>  $catalog  item no => category code
 * @param  array<int, string>  $failingDetailNos
 */
function fakeBcCatalog(array $catalog, array &$failingDetailNos = []): void
{
    Http::fake(function (Request $request) use ($catalog, &$failingDetailNos) {
        $url = urldecode($request->url());

        if (str_contains($url, 'itemsDetailed')) {
            foreach ($failingDetailNos as $no) {
                if (str_contains($url, "('{$no}')")) {
                    return Http::response(['error' => 'boom'], 500);
                }
            }

            return Http::response(['itemUnitPrices' => []]);
        }

        if (! str_contains($url, '$expand')) {
            $list = collect($catalog)->map(fn ($code, $no) => ['no' => $no, 'itemCategoryCode' => $code]);

            return Http::response(['value' => $list->values()->all()]);
        }

        $details = collect($catalog)
            ->filter(fn ($code, $no) => str_contains($url, "no eq '{$no}'") || str_contains($url, "itemCategoryCode eq '{$code}'"))
            ->map(fn ($code, $no) => [
                'no' => $no,
                'itemCategoryCode' => $code,
                'description' => "BC name {$no}",
                'itemReview' => null,
                'inventory' => 5,
                'baseUOMDesc' => null,
                'unitPrice' => 99,
                'minQtyUnitPrice' => 0,
                'itemAttributeValues' => [],
            ]);

        return Http::response(['value' => $details->values()->all()]);
    });
}

beforeEach(function () {
    $this->mock(BusinessCentralService::class, function ($mock) {
        $mock->shouldReceive('getAccessToken')->andReturn('fake-token');
    });
});

it('imports only the items missing locally and leaves existing ones untouched', function () {
    makeNewItemsCategory('LEAF');
    $existing = makeNewItemsExistingItem('OLD1', 'LEAF');

    fakeBcCatalog(['OLD1' => 'LEAF', 'NEW1' => 'LEAF', 'NEW2' => 'LEAF']);

    $this->artisan('items:sync')->assertSuccessful();

    expect(Item::whereIn('no', ['NEW1', 'NEW2'])->count())->toBe(2);
    expect($existing->fresh()->name)->toBe('Name OLD1');
    expect((float) $existing->fresh()->unit_price)->toBe(10.0);

    Http::assertNotSent(fn (Request $request) => str_contains(urldecode($request->url()), "itemsDetailed('OLD1')"));
    Http::assertSentCount(4);
});

it('makes only the list request when nothing is new', function () {
    makeNewItemsCategory('LEAF');
    makeNewItemsExistingItem('OLD1', 'LEAF');

    fakeBcCatalog(['OLD1' => 'LEAF']);

    $this->artisan('items:sync')->assertSuccessful();

    Http::assertSentCount(1);
});

it('skips new items outside the level 2 and 3 categories', function (?string $categoryCode) {
    makeNewItemsCategory('LEAF');
    makeNewItemsCategory('ROOT', level: 1);

    fakeBcCatalog(['NEW1' => 'LEAF', 'SKIP1' => $categoryCode]);

    $this->artisan('items:sync')->assertSuccessful();

    expect(Item::where('no', 'NEW1')->exists())->toBeTrue();
    expect(Item::where('no', 'SKIP1')->exists())->toBeFalse();
})->with([
    'level 1 category' => 'ROOT',
    'unknown category' => 'NOT-SYNCED-YET',
    'no category' => null,
]);

it('restores a soft-deleted item that is back in Business Central', function () {
    makeNewItemsCategory('LEAF');
    $trashed = makeNewItemsExistingItem('BACK1', 'LEAF');
    $trashed->delete();

    fakeBcCatalog(['BACK1' => 'LEAF']);

    $this->artisan('items:sync')->assertSuccessful();

    expect($trashed->fresh()->trashed())->toBeFalse();
    expect(Item::withTrashed()->where('no', 'BACK1')->count())->toBe(1);
});

it('keeps importing when one item fails and picks it up on the next run', function () {
    Sleep::fake();
    makeNewItemsCategory('LEAF');

    $failing = ['BAD1'];

    fakeBcCatalog(['BAD1' => 'LEAF', 'NEW1' => 'LEAF'], $failing);

    $this->artisan('items:sync')->assertFailed();

    expect(Item::where('no', 'NEW1')->exists())->toBeTrue();
    expect(Item::where('no', 'BAD1')->exists())->toBeFalse();

    $failing = [];

    $this->artisan('items:sync')->assertSuccessful();

    expect(Item::where('no', 'BAD1')->exists())->toBeTrue();
});

it('fetches new items in chunks of 30', function () {
    makeNewItemsCategory('LEAF');

    $catalog = collect(range(1, 31))->mapWithKeys(fn (int $i) => ["NEW{$i}X" => 'LEAF'])->all();

    fakeBcCatalog($catalog);

    $this->artisan('items:sync')->assertSuccessful();

    expect(Item::count())->toBe(31);

    $chunkRequests = Http::recorded(fn (Request $request) => str_contains(urldecode($request->url()), "no eq '"));

    expect($chunkRequests)->toHaveCount(2);
});

it('still refreshes existing items with --all', function () {
    makeNewItemsCategory('LEAF');
    $existing = makeNewItemsExistingItem('OLD1', 'LEAF');

    fakeBcCatalog(['OLD1' => 'LEAF']);

    $this->artisan('items:sync', ['--all' => true])->assertSuccessful();

    expect((float) $existing->fresh()->unit_price)->toBe(99.0);
    expect($existing->fresh()->inventory)->toBe(5);
});

it('syncs weights only for live items without weights when using --missing', function () {
    makeNewItemsCategory('LEAF');
    makeNewItemsExistingItem('NOWEIGHT', 'LEAF');
    makeNewItemsExistingItem('HASWEIGHT', 'LEAF')->update(['weights' => [['weight' => 2]]]);
    makeNewItemsExistingItem('TRASHED', 'LEAF')->delete();

    Http::fake(['*' => Http::response(['value' => [['Qty_per_Unit_of_Measure' => 1, 'Weight' => 3]]])]);

    $this->artisan('items:sync-weights', ['--missing' => true])->assertSuccessful();

    Http::assertSentCount(1);
    Http::assertSent(fn (Request $request) => str_contains(urldecode($request->url()), "Item_No eq 'NOWEIGHT'"));
});
