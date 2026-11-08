<?php

use App\Models\Item;
use App\Models\User;
use Illuminate\Support\Str;

function detailsItem(array $attributes = []): Item
{
    return Item::create([
        'no' => 'DTSKU',
        'name' => 'Drill',
        'slug' => 'item-'.Str::random(6),
        'inventory' => 1,
        'unit_price' => 100,
        ...$attributes,
    ]);
}

function detailsAdmin(): User
{
    return User::factory()->create(['role' => 'pricing_manager']);
}

it('saves the notice in all four languages without touching pricing', function () {
    $item = detailsItem(['discount' => 15, 'fake_price' => 120]);

    $this->actingAs(detailsAdmin())
        ->put(route('admin.items.details.update', $item), [
            'notice_title' => 'ყურადღება',
            'notice_title_en' => 'Attention',
            'notice_description' => 'აღწერა',
            'notice_description_ru' => 'Описание',
        ])
        ->assertSessionHasNoErrors();

    $item->refresh();

    expect($item->getRawOriginal('notice_title'))->toBe('ყურადღება')
        ->and($item->getRawOriginal('notice_title_en'))->toBe('Attention')
        ->and($item->getRawOriginal('notice_description_ru'))->toBe('Описание')
        ->and($item->getRawOriginal('notice_title_tr'))->toBeNull()
        ->and((float) $item->discount)->toBe(15.0)
        ->and((float) $item->fake_price)->toBe(120.0);
});

it('blocks regular users from managing item details', function () {
    $item = detailsItem();
    $this->actingAs(User::factory()->create(['role' => 'user']));

    $this->getJson(route('admin.items.details.show', $item))->assertForbidden();
    $this->put(route('admin.items.details.update', $item), ['notice_title' => 'x'])->assertForbidden();
});
