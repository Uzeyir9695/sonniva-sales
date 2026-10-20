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

it('clears the notice when submitted empty', function () {
    $item = detailsItem(['notice_title' => 'Old', 'notice_title_en' => 'Old en']);

    $this->actingAs(detailsAdmin())
        ->put(route('admin.items.details.update', $item), [])
        ->assertSessionHasNoErrors();

    expect($item->fresh()->getRawOriginal('notice_title'))->toBeNull()
        ->and($item->fresh()->getRawOriginal('notice_title_en'))->toBeNull();
});

it('returns the raw notice for every language', function () {
    $item = detailsItem(['notice_title' => 'ყურადღება', 'notice_title_en' => 'Attention']);

    $this->actingAs(detailsAdmin())
        ->getJson(route('admin.items.details.show', $item))
        ->assertOk()
        ->assertJson([
            'notice_title' => 'ყურადღება',
            'notice_title_en' => 'Attention',
            'notice_title_ru' => '',
            'notice_description' => '',
        ]);
});

it('rejects a title longer than 255 characters', function () {
    $this->actingAs(detailsAdmin())
        ->put(route('admin.items.details.update', detailsItem()), ['notice_title_ru' => str_repeat('a', 256)])
        ->assertSessionHasErrors('notice_title_ru');
});

it('blocks regular users from managing item details', function () {
    $item = detailsItem();
    $this->actingAs(User::factory()->create(['role' => 'user']));

    $this->getJson(route('admin.items.details.show', $item))->assertForbidden();
    $this->put(route('admin.items.details.update', $item), ['notice_title' => 'x'])->assertForbidden();
});

it('localizes the notice and falls back to Georgian', function () {
    $item = detailsItem([
        'notice_title' => 'ყურადღება',
        'notice_title_en' => 'Attention',
        'notice_description' => 'აღწერა',
    ]);

    app()->setLocale('en');
    expect($item->notice_title)->toBe('Attention')
        ->and($item->notice_description)->toBe('აღწერა')
        ->and($item->toArray())->not->toHaveKey('notice_title_en');

    app()->setLocale('ka');
    expect($item->notice_title)->toBe('ყურადღება');
});
