<?php

use App\Models\Order;
use App\Models\Payment;
use App\Models\User;
use App\Services\Payments\PCBService;

function pcbTestPayment(array $overrides = []): Payment
{
    $user = User::factory()->create();
    $order = Order::factory()->create(['user_id' => $user->id, 'invoice_no' => 'S123456']);

    return Payment::factory()->create(array_merge([
        'user_id' => $user->id,
        'order_id' => $order->id,
        'invoice_no' => 'S123456',
        'provider' => 'pcb',
        'status' => 'pending',
        'response_data' => [
            'initial_response' => [
                'order' => ['id' => 555111, 'password' => 'secret-pass'],
            ],
            'order_id' => 555111,
        ],
    ], $overrides));
}

function mockPcbOrderDetails(string $status = 'FullyPaid'): void
{
    test()->mock(PCBService::class, function ($mock) use ($status) {
        $mock->shouldReceive('getOrderDetails')
            ->once()
            ->with(555111, 'secret-pass')
            ->andReturn([
                'order' => [
                    'status' => $status,
                    'srcToken' => ['displayName' => 'Visa ****1234'],
                ],
            ]);
    });
}

it('completes a web PCB payment via session, unchanged from before', function () {
    $payment = pcbTestPayment();
    mockPcbOrderDetails();

    session()->put('pcb_order_id', 555111);
    session()->put('pcb_password', 'secret-pass');

    $this->get(route('payment.pcb.order.details'))
        ->assertRedirect(route('payment.success', ['provider' => 'pcb']));

    expect($payment->fresh()->status)->toBe('completed');
});

it('bridges a mobile PCB success purely from invoice_no, with no session at all', function () {
    $payment = pcbTestPayment();
    mockPcbOrderDetails();

    // No session at all — exactly what the browser PCB redirects to gets
    // for a mobile-initiated payment (see PCBService::createPaymentRequest
    // and proCreditBankCallback's docblock/comment).
    $response = $this->get(route('payment.pcb.order.details', [
        'invoice_no' => 'S123456',
        'platform' => 'mobile',
    ]));

    $response->assertOk()->assertViewIs('payment.mobile-bridge');
    expect($response->original->getData()['url'])->toStartWith('sonniva://payment/success?invoice_no=S123456');
    expect($payment->fresh()->status)->toBe('completed');
});

it('bridges a mobile PCB non-completion to the cancel deep link', function () {
    $payment = pcbTestPayment();
    mockPcbOrderDetails(status: 'Declined');

    $response = $this->get(route('payment.pcb.order.details', [
        'invoice_no' => 'S123456',
        'platform' => 'mobile',
    ]));

    $response->assertOk()->assertViewIs('payment.mobile-bridge');
    expect($response->original->getData()['url'])->toStartWith('sonniva://payment/cancel?');
    expect($payment->fresh()->status)->toBe('Declined');
});

it('still returns the missing-session error when neither session nor a matching invoice_no is available', function () {
    pcbTestPayment();

    $this->get(route('payment.pcb.order.details'))
        ->assertStatus(400)
        ->assertJson(['error' => 'Missing session data']);
});

it('does not require a web session on the PCB callback route — same class of bug fixed for BOG/TBC', function () {
    $payment = pcbTestPayment();
    mockPcbOrderDetails();

    // Fully unauthenticated, no session — the real mobile scenario.
    $this->get(route('payment.pcb.order.details', [
        'invoice_no' => 'S123456',
        'platform' => 'mobile',
    ]))->assertOk();

    expect($payment->fresh()->status)->toBe('completed');
});
