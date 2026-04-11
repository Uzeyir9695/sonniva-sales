<?php

namespace App\Http\Controllers\Payment;

use App\Http\Controllers\Controller;
use App\Jobs\SendOrderEmailJob;
use App\Jobs\SendOrderToBCJob;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Payment;
use App\Services\BusinessCentralService;
use App\Services\Payments\BOGPaymentService;
use App\Services\Payments\OrderCalculatorService;
use App\Services\Payments\PCBService;
use App\Services\Payments\TBCPaymentService;
use App\Services\PDFGeneratorService;
use App\Services\SmsService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class PaymentController extends Controller
{
    protected $bcService;

    protected $pdfService;

    protected $tbcService;

    protected $bogService;

    protected $pcbService;

    protected $smsService;

    protected $calculatorService;

    public function __construct(
        BusinessCentralService $bcService,
        TBCPaymentService $tbcService,
        BOGPaymentService $bogService,
        PCBService $pcbService,
        PDFGeneratorService $pdfService,
        SmsService $smsService,
        OrderCalculatorService $calculatorService
    ) {
        $this->bcService = $bcService;
        $this->pdfService = $pdfService;
        $this->tbcService = $tbcService;
        $this->bogService = $bogService;
        $this->pcbService = $pcbService;
        $this->smsService = $smsService;
        $this->calculatorService = $calculatorService;
    }

    /**
     * Initiate payment process
     */
    public function initiate(Request $request)
    {
        $provider = $request->provider;

        try {
            $calc = $this->calculatorService->calculate(
                $request->item_ids,
                $request->delivery_type,
                auth()->id()
            );
        } catch (\InvalidArgumentException $e) {
            return response()->json(['error' => $e->getMessage()], 422);
        }

        // Generate unique invoice number
        do {
            $invoiceNumber = 'S'.random_int(100000, 999999);
        } while (Order::where('invoice_no', $invoiceNumber)->exists());

        session()->put('invoice_no', $invoiceNumber);

        // Clean up stale awaiting_payment orders for this user before creating a new one
        Order::where('user_id', auth()->id())
            ->where('status', 'awaiting_payment')
            ->whereDoesntHave('payment', fn ($q) => $q->where('status', 'completed'))
            ->delete();

        // Create order and snapshot order items
        $order = DB::transaction(function () use ($request, $calc, $invoiceNumber) {
            $order = Order::create([
                'user_id' => auth()->id(),
                'invoice_no' => $invoiceNumber,
                'status' => 'awaiting_payment',
                'delivery_type' => $request->delivery_type,
                'delivery_cost' => $calc['delivery_cost'],
                'address' => $request->address,
                'apartment_number' => $request->apartment_number,
                'comment' => $request->comment,
                'subtotal' => $calc['subtotal'],
                'total' => $calc['total'],
            ]);

            foreach ($calc['items'] as $item) {
                OrderItem::create([
                    'order_id' => $order->id,
                    'item_id' => $item['item_id'],
                    'quantity' => $item['quantity'],
                    'unit_price' => $item['unit_price'],
                    'subtotal' => $item['subtotal'],
                ]);
            }

            return $order;
        });

        $order->load('items');
        $returnUrl = route('payment.success', ['provider' => $provider]);

        try {
            if ($provider === 'tbc') {
                $result = $this->tbcService->createPaymentRequest(
                    $order,
                    $returnUrl,
                    $calc['total'],
                );
            } elseif ($provider === 'bog') {
                $result = $this->bogService->createPaymentRequest(
                    $order,
                    $returnUrl,
                    $calc['total'],
                );
            } elseif ($provider === 'pcb') {
                $result = $this->pcbService->createPaymentRequest(
                    $order,
                    $calc['total'],
                );
            } else {
                return response()->json(['error' => 'Invalid provider'], 400);
            }

            if (! $result['success']) {
                Log::channel('payment')->error('Payment initiation failed', [
                    'provider' => $provider,
                    'error' => $result['error'] ?? 'Payment initiation failed',
                ]);

                return response()->json(['error' => $result['error'] ?? 'Failed to initiate payment'], 400);
            }

            $payment = DB::transaction(function () use ($provider, $order, $result, $invoiceNumber, $calc) {
                $responseData = ['initial_response' => $result['raw_response']];

                if ($provider === 'tbc') {
                    $responseData['order_id'] = $result['order_id'];
                    $transactionId = $result['payment_id'];
                } else {
                    $responseData['order_id'] = $result['order_id'];
                    $transactionId = null;
                }

                return Payment::create([
                    'user_id' => auth()->id(),
                    'order_id' => $order->id,
                    'invoice_no' => $invoiceNumber,
                    'provider' => $provider,
                    'transaction_id' => $transactionId,
                    'amount' => $calc['total'],
                    'status' => 'pending',
                    'response_data' => $responseData,
                ]);
            });

            Log::channel('payment')->info('Payment initiated successfully', [
                'payment_id' => $payment->id,
                'order_id' => $order->id,
            ]);

            return response()->json([
                'redirect_url' => $result['redirect_url'],
                'payment_id' => $payment->id,
            ]);
        } catch (\Exception $e) {
            Log::channel('payment')->error('Payment initiation exception', [
                'provider' => $provider,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return response()->json(['error' => 'Payment initiation failed'], 500);
        }
    }

    /**
     * Handle payment webhook/callback from bank
     */
    public function callback(Request $request)
    {
        $provider = $request->provider;

        try {
            Log::channel('payment')->info('Payment callback received', [
                'provider' => $provider,
            ]);

            if ($provider === 'tbc') {
                $validationResult = $this->tbcService->validateCallback($request->all());
                $paymentId = $validationResult['orderId'] ?? null;
            } elseif ($provider === 'bog') {
                $validationResult = $this->bogService->validateCallback($request->all());
                $paymentId = $validationResult['orderId'] ?? null;
            } else {
                return response()->json(['error' => 'Invalid provider'], 400);
            }

            if (! $validationResult['valid']) {
                Log::channel('payment')->warning('Invalid callback', $validationResult);

                return response()->json(['error' => 'Invalid callback'], 400);
            }

            $service = $provider === 'tbc' ? $this->tbcService : $this->bogService;
            $payment = $service->findAndUpdatePayment($paymentId);

            if (! $payment) {
                return response()->json(['error' => 'Payment not found'], 404);
            }

            if ($payment->status !== 'completed') {
                return response()->json(['status' => 'ok'], 200);
            }

            $this->completePaymentProcess($payment);

            return response()->json(['status' => 'ok'], 200);
        } catch (\Exception $e) {
            Log::channel('payment')->error('Payment callback error', [
                'provider' => $provider,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return response()->json(['error' => 'Callback processing error'], 500);
        }
    }

    public function proCreditBankCallback()
    {
        $orderId = session()->pull('pcb_order_id');
        $password = session()->pull('pcb_password');

        if (! $orderId || ! $password) {
            Log::channel('payment')->error('PCB callback missing session data');

            return response()->json(['error' => 'Missing session data'], 400);
        }

        $orderDetails = $this->pcbService->getOrderDetails($orderId, $password);

        $payment = Payment::where('response_data->order_id', $orderId)
            ->where('provider', 'pcb')
            ->first();

        if (! $payment) {
            Log::channel('payment')->error('PCB Payment not found for order ID', [
                'order_id' => $orderId,
            ]);

            return response()->json(['error' => 'Payment not found'], 404);
        }

        $status = $orderDetails['order']['status'] === 'FullyPaid' ? 'completed' : $orderDetails['order']['status'];

        $payment->update([
            'status' => $status,
            'response_data' => $orderDetails,
        ]);

        if ($status === 'completed') {

            // Send order confirmation email and send data to Business Central
            $this->completePaymentProcess($payment);

            return to_route('payment.success', ['provider' => 'pcb']);
        } else {
            return to_route('payment.cancel', ['provider' => 'pcb']);
        }
    }

    public function completePaymentProcess($payment)
    {
        $order = Order::where('invoice_no', $payment->invoice_no)
            ->with(['items.item', 'user'])
            ->first();

        if (! $order) {
            Log::channel('payment')->error('Order not found for payment', [
                'invoice_no' => $payment->invoice_no,
            ]);

            return;
        }

        $shouldProcess = false;
        $lockedPayment = null;

        DB::transaction(function () use (&$shouldProcess, &$lockedPayment, $payment, $order) {
            $lockedPayment = Payment::lockForUpdate()->find($payment->id);

            if ($lockedPayment->processed_at) {
                return;
            }

            $order->update([
                'status' => 'paid',
                'approved_at' => now(),
            ]);

            $lockedPayment->update(['processed_at' => now()]);

            $shouldProcess = true;
        });

        if ($shouldProcess) {
            $this->sendOrderToEmail($lockedPayment, $order);
            SendOrderToBCJob::dispatch($order);
        }
    }

    public function sendOrderToEmail($payment, $order)
    {
        if (! $order->user) {
            return;
        }

        SendOrderEmailJob::dispatch($order->id, $payment->id, $order->invoice_no, $order->user);
    }

    /**
     * Handle successful payment redirect
     */
    public function success(): \Inertia\Response
    {
        $invoiceNumber = session()->pull('invoice_no');

        return Inertia::render('Payment/Success', [
            'invoiceNumber' => $invoiceNumber,
        ]);
    }

    /**
     * Handle cancelled payment
     */
    public function cancel(Request $request, $provider)
    {
        return Inertia::render('Payment/Cancel', [
            'message' => 'Payment cancelled',
            'provider' => $provider,
        ]);
    }

    public function sendOrderToBC(Order $orderItem)
    {
        //        dispatch(function () use ($orderItem) {
        $this->bcService->addSalesOrderLines($orderItem, 'S012345', 0);
        //        });
    }
}
