<?php

use App\Models\Order;
use App\Models\User;

function ordersReload(array $params): array
{
    $admin = User::factory()->create(['role' => 'admin']);

    $version = test()->withHeaders(['X-Inertia' => 'true'])
        ->actingAs($admin)
        ->get(route('admin.orders.index', $params))
        ->headers->get('X-Inertia-Version');

    return test()->withHeaders([
        'X-Inertia' => 'true',
        'X-Inertia-Version' => $version,
        'X-Inertia-Partial-Data' => 'orders',
        'X-Inertia-Partial-Component' => 'Admin/orders/Index',
    ])->actingAs($admin)
        ->get(route('admin.orders.index', $params))
        ->json('props.orders.data');
}

function pendingOrderFor(User $user, string $invoiceNo): Order
{
    return Order::factory()->for($user)->create([
        'status' => 'pending',
        'invoice_no' => $invoiceNo,
        'seen_at' => now(),
    ]);
}

it('filters the list by invoice number', function () {
    pendingOrderFor(User::factory()->create(), 'S100001');
    pendingOrderFor(User::factory()->create(), 'S100002');

    $rows = ordersReload(['status' => 'pending', 'invoice_no' => '00002']);

    expect($rows)->toHaveCount(1)
        ->and($rows[0]['invoice_no'])->toBe('S100002');
});

it('filters the list by customer tax id', function () {
    pendingOrderFor(User::factory()->create(['tax_id' => '11111111111']), 'S1');
    pendingOrderFor(User::factory()->create(['tax_id' => '22222222222']), 'S2');

    $rows = ordersReload(['status' => 'pending', 'tax_id' => '2222']);

    expect($rows)->toHaveCount(1)
        ->and($rows[0]['invoice_no'])->toBe('S2');
});

it('filters the list by customer last name', function () {
    pendingOrderFor(User::factory()->create(['name' => 'Nino', 'lastname' => 'Beridze']), 'S1');
    pendingOrderFor(User::factory()->create(['name' => 'Giorgi', 'lastname' => 'Kapanadze']), 'S2');

    $rows = ordersReload(['status' => 'pending', 'customer_name' => 'beridze']);

    expect($rows)->toHaveCount(1)->and($rows[0]['invoice_no'])->toBe('S1');
});

it('filters the list by full "first last" name', function () {
    pendingOrderFor(User::factory()->create(['name' => 'Nino', 'lastname' => 'Beridze']), 'S1');
    pendingOrderFor(User::factory()->create(['name' => 'Giorgi', 'lastname' => 'Kapanadze']), 'S2');

    expect(ordersReload(['status' => 'pending', 'customer_name' => 'Nino Beridze']))->toHaveCount(1);
});

it('returns every order when no filter is supplied', function () {
    pendingOrderFor(User::factory()->create(), 'S1');
    pendingOrderFor(User::factory()->create(), 'S2');

    expect(ordersReload(['status' => 'pending']))->toHaveCount(2);
});
