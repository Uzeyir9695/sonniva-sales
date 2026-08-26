<?php

namespace App\Http\Controllers\Payment;

use App\Http\Controllers\Controller;
use App\Jobs\SendOrderEmailJob;
use App\Jobs\SendOrderToBCJob;
use App\Models\Cart;
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
use Illuminate\View\View;
use Inertia\Inertia;
use Inertia\Response;

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
                $request->cart_ids,
                $request->delivery_type,
                auth()->id(),
                $request->delivery_price_type,
                $request->city
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
                'city' => $request->city,
                'branch' => $request->branch,
                'address' => $request->address,
                'apartment_number' => $request->apartment_number,
                'comment' => $request->comment,
                'subtotal' => $calc['subtotal'],
                'wholesale_discount' => $calc['wholesale_discount'],
                'total' => $calc['total'],
            ]);

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

            return $order;
        });

        $order->load('items');

        // The bank redirects the user's own browser here, which for mobile
        // is a fresh system browser (Browser::auth()) sharing no cookies at
        // all with the Sanctum-authenticated app that called this endpoint —
        // session() can't carry anything across that gap. So platform/invoice
        // travel in the return URL itself instead; route() appends any extra
        // params not matched by the route's own {provider} segment as a
        // query string, so these are absent (unchanged URLs) for web.
        $mobileParams = $request->platform === 'mobile'
            ? ['platform' => 'mobile', 'invoice_no' => $invoiceNumber]
            : [];

        $returnUrl = route('payment.success', ['provider' => $provider, ...$mobileParams]);
        $cancelUrl = route('payment.cancel', ['provider' => $provider, ...$mobileParams]);

        // TEMPORARY mobile testing hack: charge BOG 1 tetri instead of the
        // real total while re-verifying the deep-link payment flow, so real
        // money doesn't move on every test run. The order/payment records
        // below still store the real $calc['total'] — only the amount BOG
        // actually charges is overridden. Remove this before launch.
        $bogAmount = ($provider === 'bog' && $request->platform === 'mobile') ? 0.01 : $calc['total'];

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
                    $bogAmount,
                    cancelUrl: $cancelUrl,
                );
            } elseif ($provider === 'pcb') {
                $result = $this->pcbService->createPaymentRequest(
                    $order,
                    $calc['total'],
                    platform: $request->platform === 'mobile' ? 'mobile' : null,
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

    public function proCreditBankCallback(Request $request)
    {
        $orderId = session()->pull('pcb_order_id');
        $password = session()->pull('pcb_password');
        $isMobile = $request->query('platform') === 'mobile';

        // Web (unchanged, existing behavior): session carries order_id/password
        // straight through, since it's the same browser session for the whole
        // flow. Mobile never reaches this: the browser PCB redirects to shares
        // no cookies with the Sanctum-authenticated app that called initiate(),
        // so session() is always empty here. Fall back to the invoice_no
        // PCBService embedded in the return URL, pulling order_id/password
        // back out of the already-stored Payment record instead.
        if ((! $orderId || ! $password) && $request->query('invoice_no')) {
            $fallbackPayment = Payment::where('invoice_no', $request->query('invoice_no'))
                ->where('provider', 'pcb')
                ->first();

            $orderId = $fallbackPayment->response_data['initial_response']['order']['id'] ?? null;
            $password = $fallbackPayment->response_data['initial_response']['order']['password'] ?? null;
        }

        if (! $orderId || ! $password) {
            Log::channel('payment')->error('PCB callback missing session data');

            return response()->json(['error' => 'Missing session data'], 400);
        }

        $orderDetails = $this->pcbService->getOrderDetails((int) $orderId, (string) $password);

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
            'payment_method' => $orderDetails['order']['srcToken']['displayName'] ?? $payment->payment_method,
            'response_data' => $orderDetails,
        ]);

        if ($status === 'completed') {

            // Send order confirmation email and send data to Business Central
            $this->completePaymentProcess($payment);

            return $isMobile
                ? $this->mobileBridge('payment/success', ['invoice_no' => $payment->invoice_no])
                : to_route('payment.success', ['provider' => 'pcb']);
        } else {
            return $isMobile
                ? $this->mobileBridge('payment/cancel', ['invoice_no' => $payment->invoice_no, 'provider' => 'pcb'])
                : to_route('payment.cancel', ['provider' => 'pcb']);
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
            // Delete only the exact cart rows that were ordered (matched by item + UOM)
            Cart::where('user_id', $order->user_id)
                ->where(function ($q) use ($order) {
                    foreach ($order->items as $orderItem) {
                        $q->orWhere(fn ($q2) => $q2
                            ->where('item_id', $orderItem->item_id)
                            ->where('selected_uom', $orderItem->unit_of_measure_code)
                        );
                    }
                })
                ->delete();

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
    public function success(Request $request): Response|View
    {
        $invoiceNumber = session()->pull('invoice_no');

        // Mobile can't rely on session() here — see the comment in
        // initiate() on $mobileParams. platform/invoice_no travel in the
        // return URL itself instead, since this request (the bank
        // redirecting the user's own browser) shares no session with the
        // Sanctum-authenticated app that called initiate().
        if ($request->query('platform') === 'mobile') {
            return $this->mobileBridge('payment/success', ['invoice_no' => $request->query('invoice_no', $invoiceNumber)]);
        }

        return Inertia::render('Payment/Success', [
            'invoiceNumber' => $invoiceNumber,
        ]);
    }

    /**
     * Handle cancelled payment
     */
    public function cancel(Request $request, $provider): Response|View
    {
        if ($request->query('platform') === 'mobile') {
            return $this->mobileBridge('payment/cancel', ['invoice_no' => $request->query('invoice_no'), 'provider' => $provider]);
        }

        return Inertia::render('Payment/Cancel', [
            'message' => 'Payment cancelled',
            'provider' => $provider,
        ]);
    }

    /**
     * Bridge page for the mobile app: the bank's return-URL redirect lands
     * here (a normal https:// page, which every gateway accepts), and this
     * hands off to the app itself via its custom URL scheme deep link —
     * gateways won't accept a `sonniva://` URL as a return URL directly.
     *
     * @param  array<string, mixed>  $query
     */
    private function mobileBridge(string $path, array $query = []): View
    {
        $scheme = config('services.mobile_app.deeplink_scheme');
        $url = $scheme.'://'.$path.'?'.http_build_query(array_filter($query, fn ($v) => $v !== null));

        return view('payment.mobile-bridge', ['url' => $url]);
    }

    public function sendOrderToBC(Order $order)
    {
        $this->bcService->addSalesOrders($order, $order->items);
    }

    /**
     * True payment status for the mobile app to poll after a deep-link
     * return — the bank's webhook (callback()) is the actual source of
     * truth for completion, which may race the user's browser redirect, so
     * the app re-checks here rather than trusting the redirect itself.
     */
    public function status(Request $request)
    {
        $payment = Payment::where('invoice_no', $request->query('invoice_no'))
            ->where('user_id', auth()->id())
            ->latest()
            ->first();

        if (! $payment) {
            return response()->json(['error' => 'Payment not found'], 404);
        }

        return response()->json([
            'invoice_no' => $payment->invoice_no,
            'provider' => $payment->provider,
            'status' => $payment->status,
        ]);
    }
}
