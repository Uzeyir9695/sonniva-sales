<?php

use App\Models\Item;
use App\Services\BusinessCentralService;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;

function inventoryItem(string $no, int $inventory): Item
{
    return Item::create([
        'no' => $no,
        'name' => 'Item '.$no,
        'slug' => 'item-'.Str::random(6),
        'inventory' => $inventory,
        'unit_price' => 10,
    ]);
}

beforeEach(function () {
    $this->mock(BusinessCentralService::class, function ($mock) {
        $mock->shouldReceive('getAccessToken')->andReturn('fake-token');
    });
});

it('zeroes items that BC leaves out of the response', function () {
    $returned = inventoryItem('INV001', 1);
    $missing = inventoryItem('INV002', 5);

    Http::fake(['*/items?*' => Http::response(['value' => [['no' => 'INV001', 'inventory' => 7]]])]);

    $this->artisan('inventory:sync')->assertSuccessful();

    expect($returned->fresh()->inventory)->toBe(7)
        ->and($missing->fresh()->inventory)->toBe(0);
});

it('leaves inventory untouched when BC returns no items at all', function () {
    $item = inventoryItem('INV003', 4);

    Http::fake(['*/items?*' => Http::response(['value' => []])]);

    $this->artisan('inventory:sync')->assertFailed();

    expect($item->fresh()->inventory)->toBe(4);
});
