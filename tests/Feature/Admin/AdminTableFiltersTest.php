<?php

use App\Models\Order;
use App\Models\Payment;
use App\Models\User;
use Illuminate\Support\Str;

beforeEach(function () {
    $this->admin = User::factory()->create(['role' => 'admin']);
});

function paymentFor(User $user, array $attributes = []): Payment
{
    $order = Order::factory()->for($user)->create(['invoice_no' => 'S'.Str::random(8)]);

    return Payment::factory()->create(['user_id' => $user->id, 'order_id' => $order->id, 'invoice_no' => $order->invoice_no, ...$attributes]);
}

function exportedCsvRows($response): array
{
    $lines = array_filter(explode("\n", ltrim($response->streamedContent(), "\u{FEFF}")));

    return array_map('str_getcsv', array_values($lines));
}

it('paginates and filters payments on the server', function () {
    $nino = User::factory()->create(['name' => 'Nino', 'lastname' => 'Beridze']);
    foreach (range(1, 16) as $i) {
        paymentFor($nino, ['provider' => 'bog']);
    }
    paymentFor($nino, ['provider' => 'tbc']);
    paymentFor(User::factory()->create(['name' => 'Giorgi', 'lastname' => 'Kapanadze']), ['provider' => 'bog']);

    $this->actingAs($this->admin)
        ->get(route('admin.payments.index', ['customer_name' => 'beridze', 'provider' => 'bog', 'page' => 2]))
        ->assertInertia(fn ($page) => $page->loadDeferredProps(fn ($reload) => $reload
            ->where('payments.total', 16)
            ->has('payments.data', 1)
        ));
});

it('exports every filtered payment', function () {
    $nino = User::factory()->create(['name' => 'Nino', 'lastname' => 'Beridze']);
    $payment = paymentFor($nino, ['status' => 'failed']);
    paymentFor($nino, ['status' => 'completed']);

    $rows = exportedCsvRows($this->actingAs($this->admin)
        ->get(route('admin.payments.export', ['status' => 'failed']))
        ->assertOk());

    expect($rows)->toHaveCount(2)
        ->and($rows[1][0])->toBe($payment->invoice_no)
        ->and($rows[1][1])->toBe('Nino Beridze');
});

it('paginates users on the server and totals paid orders of every filtered user', function () {
    $users = User::factory()->count(16)->create(['lastname' => 'Beridze']);
    User::factory()->create(['lastname' => 'Kapanadze']);
    Order::factory()->for($users->first())->create(['status' => 'paid']);
    Order::factory()->for($users->last())->create(['status' => 'delivered']);
    Order::factory()->for($users->last())->create(['status' => 'pending']);

    $this->actingAs($this->admin)
        ->get(route('admin.users.index', ['name' => 'beridze', 'page' => 2]))
        ->assertInertia(fn ($page) => $page->loadDeferredProps(fn ($reload) => $reload
            ->where('users.total', 16)
            ->has('users.data', 1)
            ->where('paidOrdersTotal', 2)
        ));
});

it('exports every filtered user with paid order counts', function () {
    $user = User::factory()->create(['name' => 'Nino', 'lastname' => 'Beridze', 'phone' => '+995555123456']);
    User::factory()->create(['phone' => '+995599000000']);
    Order::factory()->for($user)->create(['status' => 'paid']);

    $rows = exportedCsvRows($this->actingAs($this->admin)
        ->get(route('admin.users.export', ['phone' => '123456']))
        ->assertOk());

    expect($rows)->toHaveCount(2)
        ->and($rows[1][0])->toBe('Nino Beridze')
        ->and($rows[1][3])->toBe('1');
});
