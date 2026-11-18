<?php

use App\Models\Cart;
use App\Models\Item;
use App\Models\Order;
use App\Models\User;
use App\Services\BusinessCentralService;
use Illuminate\Support\Facades\Queue;
use Illuminate\Support\Str;
use Illuminate\Testing\TestResponse;
use Laravel\Sanctum\Sanctum;

function stockCheckItem(array $overrides = []): Item
{
    return Item::create(array_merge([
        'no' => Str::random(10),
        'category_code' => 'test-category',
        'name' => 'Test Item',
        'slug' => 'test-item-'.Str::random(8),
        'inventory' => 2000,
        'unit_price' => 0,
        'discount' => 0,
        'wholesale_discount_percent' => 0,
        'vip_discount_percent' => 0,
        'prices' => [
            ['UOM' => 'ც50', 'price' => 2.6, 'priceGroup' => 'Retail', 'custMinQuantity' => 0],
            ['UOM' => 'ც500', 'price' => 16.1, 'priceGroup' => 'Retail', 'custMinQuantity' => 0],
        ],
        'weights' => [
            ['uom' => 'ც50', 'weight' => 0.1, 'quantity' => 50],
            ['uom' => 'ც500', 'weight' => 1, 'quantity' => 500],
        ],
    ], $overrides));
}

function previewOffice(User $user, array $cartIds): TestResponse
{
    Sanctum::actingAs($user);

    return test()->postJson('/api/v1/checkout/preview', [
        'delivery_type' => 'office',
        'cart_ids' => $cartIds,
    ]);
}

it('counts package quantity in pieces against inventory', function (int $packages, bool $allowed) {
    $user = User::factory()->create();
    $item = stockCheckItem();
    $cart = Cart::create(['user_id' => $user->id, 'item_id' => $item->id, 'quantity' => $packages, 'selected_uom' => 'ც500']);

    $response = previewOffice($user, [$cart->id]);

    $allowed ? $response->assertOk() : $response->assertUnprocessable()->assertJsonFragment(['error' => 'მარაგში საკმარისი რაოდენობა არ არის: Test Item']);
})->with([
    '4 × 500 = 2000 pieces' => [4, true],
    '5 × 500 = 2500 pieces' => [5, false],
]);

it('returns the not-enough-stock error in the requested locale', function () {
    $user = User::factory()->create();
    $item = stockCheckItem();
    $cart = Cart::create(['user_id' => $user->id, 'item_id' => $item->id, 'quantity' => 5, 'selected_uom' => 'ც500']);

    Sanctum::actingAs($user);

    $this->withHeader('Accept-Language', 'en')
        ->postJson('/api/v1/checkout/preview', ['delivery_type' => 'office', 'cart_ids' => [$cart->id]])
        ->assertUnprocessable()
        ->assertJsonFragment(['error' => 'Not enough stock for: Test Item']);
});

it('sums pieces across package sizes of the same item', function () {
    $user = User::factory()->create();
    $item = stockCheckItem();
    $big = Cart::create(['user_id' => $user->id, 'item_id' => $item->id, 'quantity' => 4, 'selected_uom' => 'ც500']);
    $small = Cart::create(['user_id' => $user->id, 'item_id' => $item->id, 'quantity' => 1, 'selected_uom' => 'ც50']);

    previewOffice($user, [$big->id, $small->id])->assertUnprocessable();
});

it('compares normal item quantity directly against inventory', function (int $quantity, bool $allowed) {
    $user = User::factory()->create();
    $item = stockCheckItem(['unit_price' => 10, 'inventory' => 5, 'prices' => [], 'weights' => []]);
    $cart = Cart::create(['user_id' => $user->id, 'item_id' => $item->id, 'quantity' => $quantity]);

    $response = previewOffice($user, [$cart->id]);

    $allowed ? $response->assertOk() : $response->assertUnprocessable();
})->with([
    'exactly in stock' => [5, true],
    'one over' => [6, false],
]);

function placeCashOrder(User $user, Cart $cart): TestResponse
{
    Sanctum::actingAs($user);

    return test()->postJson('/api/v1/checkout', [
        'provider' => 'cash',
        'delivery_type' => 'office',
        'cart_ids' => [$cart->id],
    ]);
}

it('rejects the order when live BC stock is lower than the synced stock', function () {
    Queue::fake();
    $user = User::factory()->create(['allow_cash_payment' => true]);
    $item = stockCheckItem();
    $cart = Cart::create(['user_id' => $user->id, 'item_id' => $item->id, 'quantity' => 4, 'selected_uom' => 'ც500']);

    fakeLiveInventory([$item->no => 1500]);

    placeCashOrder($user, $cart)->assertUnprocessable();
    expect(Order::count())->toBe(0);
});

it('places the order when live BC stock covers it', function () {
    Queue::fake();
    $user = User::factory()->create(['allow_cash_payment' => true]);
    $item = stockCheckItem(['inventory' => 0]);
    $cart = Cart::create(['user_id' => $user->id, 'item_id' => $item->id, 'quantity' => 4, 'selected_uom' => 'ც500']);

    fakeLiveInventory([$item->no => 2000]);

    placeCashOrder($user, $cart)->assertOk();
});

it('falls back to synced stock when BC is unreachable', function () {
    Queue::fake();
    $user = User::factory()->create(['allow_cash_payment' => true]);
    $item = stockCheckItem();
    $cart = Cart::create(['user_id' => $user->id, 'item_id' => $item->id, 'quantity' => 4, 'selected_uom' => 'ც500']);

    $bc = Mockery::mock(BusinessCentralService::class, [])->makePartial();
    $bc->shouldReceive('getItemsInventory')->andThrow(new Exception('BC down'));
    $this->instance(BusinessCentralService::class, $bc);

    placeCashOrder($user, $cart)->assertOk();
});

it('does not call BC for the checkout preview', function () {
    $user = User::factory()->create();
    $item = stockCheckItem();
    $cart = Cart::create(['user_id' => $user->id, 'item_id' => $item->id, 'quantity' => 4, 'selected_uom' => 'ც500']);

    $bc = Mockery::mock(BusinessCentralService::class, [])->makePartial();
    $bc->shouldNotReceive('getItemsInventory');
    $this->instance(BusinessCentralService::class, $bc);

    previewOffice($user, [$cart->id])->assertOk();
});
