<?php

namespace App\Services\Payments;

use App\Models\Cart;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Payment;
use Illuminate\Support\Facades\DB;

/**
 * Places an order for a non-card provider (invoice/limit/cash) — creates
 * the Order + OrderItem rows and a Payment row, then deletes the matched
 * Cart rows. Mirrors InvoiceController::createOrder() exactly so the
 * mobile API can reuse the same logic without duplicating it inline;
 * InvoiceController keeps its own copy for the web flow, untouched.
 */
class OrderPlacementService
{
    public function __construct(protected OrderCalculatorService $calculatorService) {}

    /**
     * @param  array{cart_ids: array<int, string>, delivery_type: string, delivery_price_type?: ?string, city?: ?string, branch?: ?string, address?: ?string, apartment_number?: ?string, comment?: ?string}  $data
     * @return array{order: Order, invoiceNo: string, payment: Payment}
     */
    public function place(array $data, int|string $userId, string $status, string $provider): array
    {
        $calc = $this->calculatorService->calculate(
            $data['cart_ids'],
            $data['delivery_type'],
            $userId,
            $data['delivery_price_type'] ?? null,
            $data['city'] ?? null
        );

        do {
            $invoiceNo = 'S'.random_int(100000, 999999);
        } while (Order::where('invoice_no', $invoiceNo)->exists());

        Order::where('user_id', $userId)
            ->where('status', 'awaiting_payment')
            ->whereDoesntHave('payment', fn ($q) => $q->where('status', 'completed'))
            ->delete();

        $order = $payment = null;

        DB::transaction(function () use ($data, $calc, $invoiceNo, $status, $provider, $userId, &$order, &$payment) {
            $orderData = [
                'user_id' => $userId,
                'invoice_no' => $invoiceNo,
                'status' => $status,
                'delivery_type' => $data['delivery_type'],
                'delivery_cost' => $calc['delivery_cost'],
                'city' => $data['city'] ?? null,
                'branch' => $data['branch'] ?? null,
                'address' => $data['address'] ?? null,
                'apartment_number' => $data['apartment_number'] ?? null,
                'comment' => $data['comment'] ?? null,
                'subtotal' => $calc['subtotal'],
                'wholesale_discount' => $calc['wholesale_discount'],
                'total' => $calc['total'],
            ];

            $orderData[in_array($provider, ['limit', 'cash']) ? 'approved_at' : 'invoiced_at'] = now();

            $order = Order::create($orderData);

            foreach ($calc['items'] as $item) {
                OrderItem::create([
                    'order_id' => $order->id,
                    'item_id' => $item['item_id'],
                    'quantity' => $item['quantity'],
                    'unit_of_measure_code' => $item['unit_of_measure_code'],
                    'unit_price' => $item['unit_price'],
                    'unit_weight' => $item['unit_weight'],
                    'subtotal' => $item['subtotal'],
                    'discount' => $item['discount'],
                    'bc_discount' => $item['bc_discount'],
                    'wholesale_discount' => $item['wholesale_discount'],
                    'fake_price' => $item['fake_price'],
                    'with_service' => $item['with_service'],
                    'service_price' => $item['service_price'],
                ]);
            }

            $payment = Payment::create([
                'user_id' => $userId,
                'order_id' => $order->id,
                'invoice_no' => $invoiceNo,
                'provider' => $provider,
                'amount' => $calc['total'],
                'status' => in_array($provider, ['limit', 'cash']) ? 'completed' : 'pending',
            ]);
        });

        Cart::where('user_id', $userId)
            ->whereIn('id', $data['cart_ids'])
            ->delete();

        return ['order' => $order, 'invoiceNo' => $invoiceNo, 'payment' => $payment];
    }
}
