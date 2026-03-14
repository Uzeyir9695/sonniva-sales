<?php

namespace App\Services\Payments;

use App\Models\Order;
use App\Models\Payment;
use Exception;
use Illuminate\Support\Facades\Log;

class TBCPaymentService
{
    protected $merchantId;
    protected $secretKey;
    protected $apiVersion;
    protected $callbackUrl;
    protected $requestType;

    public function __construct()
    {
        $config = config('payments.flitt');
        $this->merchantId = $config['merchant_id'];
        $this->secretKey = $config['secret_key'];
        $this->apiVersion = $config['api_version'];
        $this->requestType = $config['request_type'];
        $this->callbackUrl = $config['callback_url'];

        // Initialize Flitt SDK
        \Flitt\Configuration::setMerchantId($this->merchantId);
        \Flitt\Configuration::setSecretKey($this->secretKey);
        \Flitt\Configuration::setApiVersion($this->apiVersion);
        \Flitt\Configuration::setRequestType($this->requestType);
    }

    /**
     * Create payment request with Flitt API
     */
    public function createPaymentRequest(Order $order, string $returnUrl, float $totalAmount, string $language = 'en'): array
    {
        try {
            $amountInCents = (int) round($totalAmount * 100);
            $orderId = 'ORDER-' . $order->invoice_no;

            $paymentData = [
                'order_id'            => $orderId,
                'currency'            => 'GEL',
                'amount'              => $amountInCents,
                'response_url'        => $returnUrl,
                'server_callback_url' => $this->callbackUrl,
                'lang'                => $this->mapLanguage($language),
                'merchant_data'       => [
                    'order_id' => $order->id,
                    'user_id'  => auth()->id(),
                ],
            ];

            $checkoutUrl  = \Flitt\Checkout::url($paymentData);
            $checkoutData = $checkoutUrl->getData();

            return [
                'success'      => true,
                'order_id'     => $orderId,
                'payment_id'   => $checkoutData['payment_id'] ?? null,
                'redirect_url' => $checkoutData['checkout_url'] ?? null,
                'raw_response' => $checkoutData,
            ];

        } catch (Exception $e) {
            Log::channel('payment')->error('Flitt Payment Creation Error', [
                'message'  => $e->getMessage(),
                'order_id' => $order->id,
                'trace'    => $e->getTraceAsString(),
            ]);

            return [
                'success' => false,
                'error'   => $e->getMessage(),
            ];
        }
    }

    /**
     * Get order status from Flitt API
     *
     * @param  string  $orderId
     * @return array
     */
    public function getOrderStatus(string $orderId): array
    {
        try {
            $statusData = [
                'order_id' => $orderId,
            ];

            $orderStatus = \Flitt\Order::status($statusData);
            $statusInfo = $orderStatus->getData();

            return [
                'success' => true,
                'is_approved' => $orderStatus->isApproved(),
                'data' => $statusInfo,
            ];

        } catch (Exception $e) {
            Log::channel('payment')->error('Flitt Get Order Status Error', [
                'message' => $e->getMessage(),
                'order_id' => $orderId,
            ]);

            return [
                'success' => false,
                'error' => $e->getMessage(),
            ];
        }
    }

    /**
     * Validate callback from Flitt server_callback_url
     * Flitt SDK Result class handles signature validation automatically
     *
     * @param  array  $callbackData
     * @return array
     */
    public function validateCallback(array $callbackData): array
    {
        try {
            // Use Flitt SDK Result class to validate callback
            $result = new \Flitt\Result\Result();

            if (!$result->getData()) {
                return [
                    'valid' => false,
                    'error' => 'No callback data',
                ];
            }

            // Validate signature
            if (!$result->isValid()) {
                return [
                    'valid' => false,
                    'error' => 'Invalid signature',
                ];
            }

            $isApproved = $result->isApproved();
            $callbackInfo = $result->getData();
            $orderId = $callbackInfo['order_id'] ?? null;

            if (!$orderId) {
                return [
                    'valid' => false,
                    'error' => 'Missing order_id in callback',
                ];
            }

            return [
                'valid' => true,
                'orderId' => $orderId,
                'is_approved' => $isApproved,
                'status' => $isApproved ? 'completed' : 'pending',
                'raw_response' => $callbackInfo,
            ];

        } catch (Exception $e) {
            Log::channel('payment')->error('Flitt Callback Validation Error', [
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
            // Find payment record by order_id
            $payment = Payment::whereJsonContains('response_data->order_id', $orderId)
                ->first();

            if (!$payment) {
                return null;
            }

            // Get latest status from Flitt API
            $statusResult = $this->getOrderStatus($orderId);

            if (!$statusResult['success']) {
                Log::channel('payment')->warning('Failed to get status from Flitt', [
                    'order_id' => $orderId,
                ]);
                return $payment;
            }

            $status = $statusResult['is_approved'] ? 'completed' : 'pending';
            $additionalInfo = json_decode($statusResult['data']['additional_info'], true);
            $transactionId = $additionalInfo['transaction_id'] ?? null;

            $payment->update([
                'status' => $status,
                'transaction_id' => $transactionId,
                'response_data' => array_merge(
                    $payment->response_data ?? [],
                    $statusResult['data']
                ),
            ]);

            return $payment;

        } catch (Exception $e) {
            Log::channel('payment')->error('Flitt Find and Update Payment Error', [
                'message' => $e->getMessage(),
                'order_id' => $orderId,
            ]);

            return null;
        }
    }

    /**
     * Map language codes
     *
     * @param  string  $language
     * @return string
     */
    protected function mapLanguage(string $language): string
    {
        $languageMap = [
            'ka' => 'ka',
            'en' => 'en',
            'ru' => 'ru',
            'tr' => 'en',
        ];

        return $languageMap[$language] ?? 'en';
    }

    /**
     * Refund payment
     *
     * @param  string  $orderId
     * @param  int  $amount (in base currency, will be converted to cents)
     * @param  string  $currency
     * @return array
     */
    public function refundPayment(string $orderId, int $amount, string $currency = 'GEL'): array
    {
        try {
            $refundData = [
                'order_id' => $orderId,
                'amount' => $amount * 100, // Convert to cents
                'currency' => $currency,
            ];

            $refundResult = \Flitt\Order::reverse($refundData);

            return [
                'success' => $refundResult->isReversed(),
                'data' => $refundResult->getData(),
            ];

        } catch (Exception $e) {
            Log::channel('payment')->error('Flitt Refund Error', [
                'message' => $e->getMessage(),
                'order_id' => $orderId,
            ]);

            return [
                'success' => false,
                'error' => $e->getMessage(),
            ];
        }
    }
}
