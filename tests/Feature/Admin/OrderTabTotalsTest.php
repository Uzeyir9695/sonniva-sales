<?php

use App\Models\Item;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\User;
use Illuminate\Support\Str;

function summaryReload(string $status, array $params = []): array
{
    $admin = User::factory()->create(['role' => 'admin']);

    $version = test()->withHeaders(['X-Inertia' => 'true'])
        ->actingAs($admin)
        ->get(route('admin.orders.index', array_merge(['status' => $status], $params)))
        ->headers->get('X-Inertia-Version');

    return test()->withHeaders([
        'X-Inertia' => 'true',
        'X-Inertia-Version' => $version,
        'X-Inertia-Partial-Data' => 'ordersSummary',
        'X-Inertia-Partial-Component' => 'Admin/orders/Index',
    ])->actingAs($admin)
        ->get(route('admin.orders.index', array_merge(['status' => $status], $params)))
        ->json('props.ordersSummary');
}

function pendingOrder(float $total, string $invoicedAt): Order
{
    return Order::factory()->create([
        'status' => 'pending',
        'total' => $total,
        'subtotal' => $total,
        'invoiced_at' => $invoicedAt,
        'seen_at' => now(),
    ]);
}

it('totals every order in the tab, not just the visible page', function () {
    foreach (range(1, 25) as $i) {
        pendingOrder(100, now()->toDateString());
    }

    $summary = summaryReload('pending', ['per_page' => 20]);

    expect($summary['count'])->toBe(25)
        ->and($summary['after'])->toEqual(2500);
});

it('scopes the total to the requested tab status only', function () {
    Order::factory()->count(5)->create(['status' => 'pending', 'total' => 100, 'seen_at' => now()]);
    Order::factory()->count(3)->create(['status' => 'paid', 'total' => 50, 'seen_at' => now()]);

    $summary = summaryReload('paid');

    expect($summary['count'])->toBe(3)
        ->and($summary['after'])->toEqual(150);
});

it('respects the date range filter', function () {
    pendingOrder(100, '2026-03-10');
    pendingOrder(100, '2026-03-15');
    pendingOrder(100, '2026-04-01');

    $summary = summaryReload('pending', ['start_date' => '2026-03-01', 'end_date' => '2026-03-31']);

    expect($summary['count'])->toBe(2)
        ->and($summary['after'])->toEqual(200);
});

it('includes line-item discounts in the before/discount totals', function () {
    $item = Item::create([
        'no' => Str::random(10),
        'category_code' => 'test-category',
        'name' => 'Test Item',
        'slug' => 'test-item-'.Str::random(8),
        'inventory' => 10,
        'unit_price' => 100,
        'discount' => 0,
        'prices' => [],
    ]);

    $order = pendingOrder(90, now()->toDateString());
    OrderItem::create([
        'order_id' => $order->id,
        'item_id' => $item->id,
        'quantity' => 1,
        'unit_price' => 100,
        'subtotal' => 90,
        'discount' => 10,
    ]);

    $summary = summaryReload('pending');

    expect($summary['after'])->toEqual(90)
        ->and($summary['discount'])->toEqual(10)
        ->and($summary['before'])->toEqual(100);
});
