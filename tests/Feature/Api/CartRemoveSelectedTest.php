<?php

use App\Models\Cart;
use App\Models\Item;
use App\Models\User;
use Illuminate\Support\Str;
use Laravel\Sanctum\Sanctum;

function cartRowFor(User $user, ?string $uom = null): Cart
{
    $item = Item::create([
        'no' => Str::random(10),
        'category_code' => 'test-category',
        'name' => 'Test Item',
        'slug' => 'test-item-'.Str::random(8),
        'inventory' => 5,
        'unit_price' => 100,
        'discount' => 0,
        'fake_price' => null,
        'wholesale_discount_percent' => 0,
        'vip_discount_percent' => 0,
        'prices' => [],
    ]);

    return Cart::create(['user_id' => $user->id, 'item_id' => $item->id, 'quantity' => 1, 'selected_uom' => $uom]);
}

it('rejects an unauthenticated request', function () {
    $this->deleteJson('/api/v1/cart', ['cart_ids' => [(string) Str::uuid()]])->assertUnauthorized();
});

it('deletes only the selected rows', function () {
    $user = User::factory()->create();
    $selected = cartRowFor($user);
    $selectedPackage = cartRowFor($user, 'box');
    $kept = cartRowFor($user);

    Sanctum::actingAs($user);

    $this->deleteJson('/api/v1/cart', ['cart_ids' => [$selected->id, $selectedPackage->id]])
        ->assertOk()
        ->assertJson(['removed' => 2]);

    expect(Cart::whereKey([$selected->id, $selectedPackage->id])->exists())->toBeFalse()
        ->and(Cart::whereKey($kept->id)->exists())->toBeTrue();
});

it('does not delete rows belonging to another user', function () {
    $user = User::factory()->create();
    $otherUsersRow = cartRowFor(User::factory()->create());

    Sanctum::actingAs($user);

    $this->deleteJson('/api/v1/cart', ['cart_ids' => [$otherUsersRow->id]])
        ->assertOk()
        ->assertJson(['removed' => 0]);

    expect(Cart::whereKey($otherUsersRow->id)->exists())->toBeTrue();
});

it('rejects invalid cart ids', function (array $payload) {
    Sanctum::actingAs(User::factory()->create());

    $this->deleteJson('/api/v1/cart', $payload)->assertUnprocessable();
})->with([
    'missing' => [[]],
    'empty' => [['cart_ids' => []]],
    'not an array' => [['cart_ids' => 'abc']],
    'not a uuid' => [['cart_ids' => ['abc']]],
]);
