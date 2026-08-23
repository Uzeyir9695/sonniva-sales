<?php

use App\Models\Item;
use App\Models\StockNotification;
use App\Models\User;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Laravel\Sanctum\Sanctum;

function makeNotifyItem(array $overrides = []): Item
{
    return Item::create(array_merge([
        'no' => Str::random(10),
        'category_code' => 'test-category',
        'name' => 'Test Item',
        'slug' => 'test-item-'.Str::random(8),
        'inventory' => 0,
        'unit_price' => 100,
        'discount' => 0,
        'prices' => [],
    ], $overrides));
}

it('rejects an unauthenticated subscribe request', function () {
    $item = makeNotifyItem();

    $this->postJson("/api/v1/items/{$item->id}/notify")->assertUnauthorized();
});

it('subscribes an authenticated user to stock notifications', function () {
    Mail::fake();

    $item = makeNotifyItem();
    $user = User::factory()->create();
    Sanctum::actingAs($user);

    $this->postJson("/api/v1/items/{$item->id}/notify")
        ->assertOk()
        ->assertJson(['subscribed' => true, 'item_id' => $item->id]);

    expect(StockNotification::where('user_id', $user->id)->where('item_id', $item->id)->exists())->toBeTrue();
});

it('unsubscribes an authenticated user from stock notifications', function () {
    $item = makeNotifyItem();
    $user = User::factory()->create();
    StockNotification::create(['user_id' => $user->id, 'item_id' => $item->id]);
    Sanctum::actingAs($user);

    $this->deleteJson("/api/v1/items/{$item->id}/notify")
        ->assertOk()
        ->assertJson(['subscribed' => false, 'item_id' => $item->id]);

    expect(StockNotification::where('user_id', $user->id)->where('item_id', $item->id)->exists())->toBeFalse();
});
