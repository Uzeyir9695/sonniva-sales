<?php

use App\Models\Item;
use Illuminate\Support\Str;

it('exposes bc_unit_price and never throws when unit_price is not selected', function () {
    Item::create([
        'no' => 'BCSKU',
        'name' => 'უჯრის სისტემა',
        'slug' => 'item-'.Str::random(6),
        'inventory' => 1,
        'unit_price' => 42.5,
        'unit_price_override' => 60,
    ]);

    $full = Item::first();
    expect($full->bc_unit_price)->toBe(42.5)
        ->and((float) $full->unit_price)->toBe(60.0);

    $restricted = Item::query()->select(['id', 'no', 'name', 'slug'])->first();
    expect($restricted->bc_unit_price)->toBeNull()
        ->and($restricted->toArray())->toHaveKey('bc_unit_price');
});
