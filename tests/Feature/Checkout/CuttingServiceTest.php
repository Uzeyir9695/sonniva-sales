<?php

use App\Models\Cart;
use App\Models\Item;
use App\Models\Order;
use App\Models\Service;
use App\Models\User;
use App\Services\BusinessCentralService;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Queue;
use Illuminate\Support\Str;

function cuttingCart(User $owner, float $unitPrice = 100, int $quantity = 2): Cart
{
    $item = Item::create([
        'no' => Str::random(10),
        'category_code' => 'test-category',
        'name' => 'Aluminium profile',
        'slug' => 'aluminium-'.Str::random(8),
        'inventory' => 10,
        'unit_price' => $unitPrice,
        'discount' => 0,
        'prices' => [],
    ]);

    return Cart::create(['user_id' => $owner->id, 'item_id' => $item->id, 'quantity' => $quantity]);
}

function placeInvoiceOrder(User $actingUser, Cart $cart, array $overrides = [])
{
    return test()->actingAs($actingUser)->post(route('initiate.payment.invoice'), array_merge([
        'delivery_type' => 'office',
        'cart_ids' => [$cart->id],
        'provider' => 'invoice',
    ], $overrides));
}

beforeEach(fn () => Queue::fake());

it('adds the cutting service to an admin order total', function () {
    $admin = User::factory()->create(['role' => 'admin']);
    $customer = User::factory()->create(['role' => 'user']);

    placeInvoiceOrder($admin, cuttingCart($admin), [
        'customer_id' => $customer->id,
        'cutting_quantity' => 3,
    ])->assertRedirect();

    $order = Order::with('services.service')->latest()->firstOrFail();

    expect((float) $order->subtotal)->toBe(200.0)
        ->and((float) $order->total)->toBe(215.0)
        ->and((float) $order->payment->amount)->toBe(215.0)
        ->and($order->services)->toHaveCount(1)
        ->and($order->services->first()->service->no)->toBe(Service::CUTTING_NO)
        ->and($order->services->first()->quantity)->toBe(3)
        ->and((float) $order->services->first()->subtotal)->toBe(15.0);
});

it('snapshots the cutting price at order time', function () {
    $admin = User::factory()->create(['role' => 'admin']);

    placeInvoiceOrder($admin, cuttingCart($admin), ['cutting_quantity' => 2])->assertRedirect();

    Service::where('no', Service::CUTTING_NO)->update(['unit_price' => 50]);

    expect((float) Order::latest()->firstOrFail()->services->first()->unit_price)->toBe(5.0);
});

it('counts the cutting service toward the free Tbilisi delivery threshold', function () {
    $admin = User::factory()->create(['role' => 'admin']);
    $customer = User::factory()->create(['role' => 'user']);

    placeInvoiceOrder($admin, cuttingCart($admin, unitPrice: 490, quantity: 1), [
        'customer_id' => $customer->id,
        'delivery_type' => 'tbilisi',
        'delivery_price_type' => 'tbilisi',
        'city' => 'ვაკე',
        'address' => 'Tbilisi, Vake',
        'cutting_quantity' => 2,
    ])->assertRedirect();

    $order = Order::latest()->firstOrFail();

    expect((float) $order->delivery_cost)->toBe(0.0)
        ->and((float) $order->total)->toBe(500.0);
});

it('places no service when the cutting quantity is empty or zero', function (?int $quantity) {
    $admin = User::factory()->create(['role' => 'admin']);

    placeInvoiceOrder($admin, cuttingCart($admin), ['cutting_quantity' => $quantity])->assertRedirect();

    $order = Order::latest()->firstOrFail();

    expect($order->services)->toBeEmpty()
        ->and((float) $order->total)->toBe(200.0);
})->with([null, 0]);

it('forbids a non-admin from adding the cutting service', function () {
    $user = User::factory()->create(['role' => 'user']);

    placeInvoiceOrder($user, cuttingCart($user), ['cutting_quantity' => 3])->assertForbidden();

    expect(Order::count())->toBe(0);
});

it('rejects an invalid cutting quantity', function (mixed $quantity) {
    $admin = User::factory()->create(['role' => 'admin']);

    placeInvoiceOrder($admin, cuttingCart($admin), ['cutting_quantity' => $quantity])
        ->assertSessionHasErrors('cutting_quantity');

    expect(Order::count())->toBe(0);
})->with([-1, 1.5, 'abc', 10001]);

it('only gives admins the cutting service at checkout', function (string $role, bool $sees) {
    $user = User::factory()->create(['role' => $role]);
    $cart = cuttingCart($user);

    $this->actingAs($user)->get(route('checkout.index', ['cart_ids' => [$cart->id]]))
        ->assertInertia(fn ($page) => $sees
            ? $page->where('cuttingService.no', Service::CUTTING_NO)
            : $page->where('cuttingService', null));
})->with([
    'admin' => ['admin', true],
    'customer' => ['user', false],
]);

it('shows the cutting service on the invoice PDF', function () {
    $admin = User::factory()->create(['role' => 'admin']);
    $customer = User::factory()->create(['role' => 'user']);

    placeInvoiceOrder($admin, cuttingCart($admin), [
        'customer_id' => $customer->id,
        'cutting_quantity' => 3,
    ])->assertRedirect();

    $order = Order::with('items.item', 'user', 'services.service')->latest()->firstOrFail();

    $html = view('orders.order-pdf', ['order' => $order, 'payment' => $order->payment])->render();

    expect($order->payment->provider)->toBe('invoice')
        ->and($html)->toContain(Service::CUTTING_NO)
        ->and($html)->toContain('ალუმინის დაჭრის მომსახურება')
        ->and($html)->toContain('15.00 ლარი')
        ->and($html)->toContain('215.00 ლარი');
});

it('sends the cutting service to BC as its own order line', function () {
    $admin = User::factory()->create(['role' => 'admin']);
    $customer = User::factory()->create(['role' => 'user']);

    placeInvoiceOrder($admin, cuttingCart($admin), [
        'customer_id' => $customer->id,
        'cutting_quantity' => 4,
    ])->assertRedirect();

    Http::fake(['*' => Http::response(['No' => 'SO-1'])]);

    $bc = Mockery::mock(BusinessCentralService::class, [])->makePartial();
    $bc->shouldReceive('getAccessToken')->andReturn('fake-token');

    $bc->addSalesOrderLines(Order::latest()->firstOrFail(), collect(), 'SO-1');

    Http::assertSent(fn ($request) => str_ends_with($request->url(), 'SalesOrderLines')
        && $request['No'] === Service::CUTTING_NO
        && $request['Quantity'] === 4
        && $request['Unit_of_Measure_Code'] === 'ცალი/UNIT');
});
