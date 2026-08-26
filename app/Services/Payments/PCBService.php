<?php

namespace App\Services\Payments;

use App\Models\Order;
use Exception;
use Illuminate\Support\Facades\Http;

class PCBService
{
    protected array $config;

    public function __construct()
    {
        $this->config = config('payments.pcb');
    }

    /**
     * Create payment order
     */
    public function createPaymentRequest(Order $order, float $totalAmount, string $language = 'ka', ?string $platform = null): array
    {
        // Web keeps the exact same bare URL as always. Mobile-only: embed
        // invoice_no so proCreditBankCallback() can find this payment
        // without session() — see its docblock for why session can't work
        // for a mobile-initiated payment (the browser PCB redirects to
        // shares no cookies with the Sanctum-authenticated app that called
        // this method).
        $hppRedirectUrl = $platform === 'mobile'
            ? route('payment.pcb.order.details', ['invoice_no' => $order->invoice_no, 'platform' => 'mobile'])
            : route('payment.pcb.order.details');

        $response = Http::withOptions([
            'cert' => $this->config['cert_path'],
            'ssl_key' => $this->config['key_path'],
            'verify' => false,
        ])->post($this->config['base_url'].'/order',
            [
                'order' => [
                    'typeRid' => 225,
                    'amount' => $totalAmount,
                    'currency' => 'GEL',
                    'language' => strtolower($language),
                    'hppRedirectUrl' => $hppRedirectUrl,
                    'initiationEnvKind' => 'Browser',
                ],
            ]
        );

        if (! $response->successful()) {
            throw new \RuntimeException(
                'PCB createOrder failed: '.$response->body()
            );
        }

        $data = $response->json();

        if (! isset($data['order']) || ! isset($data['order']['id']) || ! isset($data['order']['password']) || ! isset($data['order']['hppUrl'])) {
            throw new Exception('Invalid response structure from PCB API Order Creation');
        }

        // Store order ID and password in session for later use in PaymentController
        session()->put('pcb_order_id', $data['order']['id']);
        session()->put('pcb_password', $data['order']['password']);

        $redirectUrl = $data['order']['hppUrl']
            .'?id='
            .$data['order']['id']
            .'&password='
            .$data['order']['password'];

        return [
            'success' => true,
            'order_id' => $data['order']['id'],
            'redirect_url' => $redirectUrl, // PCB Payment Page URL where user executes payment
            'raw_response' => $data,
        ];
    }

    /**
     * Get order details (final truth)
     */
    public function getOrderDetails(int $orderId, string $password): array
    {
        $response = Http::withOptions([
            'cert' => $this->config['cert_path'],
            'ssl_key' => $this->config['key_path'],
        ])->get(
            "{$this->config['base_url']}/order/{$orderId}",
            [
                'password' => $password,
                'tokenDetailLevel' => 2,
                'tranDetailLevel' => 1,
            ]
        );

        if (! $response->successful()) {
            throw new \RuntimeException(
                'PCB getOrder failed: '.$response->body()
            );
        }

        return $response->json();
    }
}
