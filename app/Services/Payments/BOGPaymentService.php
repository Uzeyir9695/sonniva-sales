<?php

namespace App\Services\Payments;

use App\Models\Order;
use App\Models\Payment;
use Exception;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class BOGPaymentService
{
    protected $apiKey;
    protected $secretKey;
    protected $apiUrl;
    protected $callbackUrl;
    protected $accessToken;

    public function __construct()
    {
        $config = config('payments.bog');

        $this->apiKey = $config['api_key'];
        $this->secretKey = $config['secret_key'];
        $this->apiUrl = $config['api_url'];
        $this->callbackUrl = $config['callback_url'];
    }

    /**
     * Get access token from BOG API
     *
     * @return string|null
     * @throws Exception
     */
    protected function getAccessToken(): ?string
    {
        $cacheKey = 'bog_access_token_' . md5($this->apiKey);

        if ($cached = Cache::get($cacheKey)) {
            return $cached;
        }

        try {
            if ($this->apiKey && $this->secretKey) {
                $credentials = base64_encode($this->apiKey . ':' . $this->secretKey);
                $response = Http::withHeaders([
                    'Authorization' => 'Basic ' . $credentials,
                    'Content-Type'  => 'application/x-www-form-urlencoded',
                ])
                    ->asForm()
                    ->timeout(15)
                    ->connectTimeout(5)
                    ->post('https://oauth2.bog.ge/auth/realms/bog/protocol/openid-connect/token', [
                        'grant_type' => 'client_credentials',
                    ]);
            }

            if (!$response->successful()) {
                throw new Exception('Failed to get BOG access token: ' . $response->body());
            }

            $data  = $response->json();
            $token = $data['access_token'] ?? null;

            if (!$token) {
                throw new Exception('BOG access token missing from response');
            }

            Cache::put($cacheKey, $token, now()->addMinutes(5));

            return $token;

        } catch (Exception $e) {
            Log::channel('payment')->error('BOG Get Access Token Error', [
                'message' => $e->getMessage(),
            ]);
            throw $e;
        }
    }

    /**
     * Create payment request with BOG API
     */
    public function createPaymentRequest(Order $order, string $returnUrl, float $totalAmount, string $language = 'ka'): array
    {
        try {
            $token = $this->getAccessToken();

            if (!$token) {
                throw new Exception('Failed to obtain BOG access token');
            }

            $basket = $order->items->map(fn($item) => [
                'product_id' => $item->item_id,
                'quantity'   => $item->quantity,
                'unit_price' => $item->unit_price,
            ])->toArray();

            $payload = [
                'external_order_id' => 'ORDER-' . $order->invoice_no,
                'callback_url'      => $this->callbackUrl,
                'capture'           => 'automatic',
                'purchase_units'    => [
                    'currency'     => 'GEL',
                    'total_amount' => round($totalAmount, 2),
                    'basket'       => $basket,
                ],
                'redirect_urls' => [
                    'success' => $returnUrl,
                    'fail'    => route('payment.cancel', ['provider' => 'bog']),
                ],
                'payment_method' => ['card', 'google_pay', 'apple_pay'],
            ];

            $response = Http::withHeaders([
                'Authorization'   => 'Bearer ' . $token,
                'Content-Type'    => 'application/json',
                'Accept-Language' => $language,
            ])->post($this->apiUrl, $payload);

            if (!$response->successful()) {
                throw new Exception('BOG API Unable to Create Payment. Error: ' . $response->body());
            }

            $data = $response->json();

            if (!isset($data['id']) || !isset($data['_links']['redirect']['href'])) {
                throw new Exception('Invalid response structure from BOG API');
            }

            session()->put('order_id', $data['id']);

            return [
                'success'      => true,
                'order_id'     => $data['id'],
                'redirect_url' => $data['_links']['redirect']['href'],
                'details_url'  => $data['_links']['details']['href'] ?? null,
                'raw_response' => $data,
            ];
        } catch (Exception $e) {
            Log::channel('payment')->error('BOG Payment Creation Error', [
                'message'  => $e->getMessage(),
                'order_id' => $order->id,
            ]);

            return [
                'success' => false,
                'error'   => $e->getMessage(),
            ];
        }
    }

    /**
     * Get payment details from BOG API
     *
     * @param  string  $orderId
     * @return array
     * @throws Exception
     */
    public function getPaymentDetails(string $orderId): array
    {
        try {
            $token = $this->getAccessToken();

            if (!$token) {
                throw new Exception('Failed to obtain BOG access token');
            }

            $response = Http::withHeaders([
                'Authorization' => 'Bearer '.$token,
            ])->get('https://api.bog.ge/payments/v1/receipt/'.$orderId);

            if (!$response->successful()) {
                throw new Exception('Failed to get payment details: '.$response->body());
            }

            return $response->json();
        } catch (Exception $e) {
            Log::channel('payment')->error('BOG Get Payment Details Error', [
                'message' => $e->getMessage(),
                'orderId' => $orderId,
            ]);

            throw $e;
        }
    }

    /**
     * Validate callback from BOG
     *
     * @param  array  $callbackData
     * @return array
     */
    public function validateCallback(array $callbackData): array
    {
        try {
            $orderId = $callbackData['body']['order_id'] ?? session()->get('order_id');

            if (!$orderId) {
                return [
                    'valid' => false,
                    'error' => 'Missing order_id in callback',
                ];
            }

            // Get payment details from BOG
            $paymentDetails = $this->getPaymentDetails($orderId);

            // Check if payment is in final status
            $finalStatuses = ['completed', 'rejected', 'refunded', 'refunded_partially'];
            $status = $paymentDetails['order_status']['key'] ?? null;

            if (!in_array($status, $finalStatuses)) {
                return [
                    'valid' => false,
                    'error' => 'Payment not in final status',
                    'status' => $status,
                    'reject_reason' => $paymentDetails['reject_reason'] ?? null,
                ];
            }

            return [
                'valid' => true,
                'orderId' => $orderId,
                'status' => $status,
                'transactionId' => $paymentDetails['payment_detail']['transaction_id'] ?? null,
                'amount' => $paymentDetails['purchase_units']['request_amount'] ?? null,
                'currency' => $paymentDetails['purchase_units']['currency_code'] ?? null,
                'raw_response' => $paymentDetails,
            ];
        } catch (Exception $e) {
            Log::channel('payment')->error('BOG Callback Validation Error', [
                'message' => $e->getMessage(),
                'callback_data' => $callbackData,
            ]);

            return [
                'valid' => false,
                'error' => $e->getMessage(),
            ];
        }
    }

    /**
     * Find payment by order_id and update status
     *
     * @param  string  $orderId
     * @return Payment|null
     */
    public function findAndUpdatePayment(string $orderId): ?Payment
    {
        try {
            $paymentDetails = $this->getPaymentDetails($orderId);

            // Find payment by transaction_id or response_data
            $payment = Payment::whereJsonContains('response_data->order_id', $orderId)
                ->orWhere('transaction_id', $paymentDetails['payment_detail']['transaction_id'] ?? null)
                ->first();

            if ($payment) {
                $status = $this->mapBOGStatus($paymentDetails['order_status']['key'] ?? null);

                $payment->update([
                    'status' => $status,
                    'transaction_id' => $paymentDetails['payment_detail']['transaction_id'] ?? $payment->transaction_id,
                    'response_data' => $paymentDetails,
                ]);

                return $payment;
            }

            return null;
        } catch (Exception $e) {
            Log::channel('payment')->error('BOG Find and Update Payment Error', [
                'message' => $e->getMessage(),
                'orderId' => $orderId,
            ]);

            return null;
        }
    }

    /**
     * Map BOG payment status to our system status
     *
     * @param  string  $bogStatus
     * @return string
     */
    protected function mapBOGStatus(string $bogStatus): string
    {
        $statusMap = [
            'created' => 'pending',
            'processing' => 'processing',
            'completed' => 'completed',
            'rejected' => 'failed',
            'refund_requested' => 'pending',
            'refunded' => 'cancelled',
            'refunded_partially' => 'processing',
            'auth_requested' => 'processing',
            'blocked' => 'processing',
            'partial_completed' => 'processing',
        ];

        return $statusMap[$bogStatus] ?? 'pending';
    }
}
