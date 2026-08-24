<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Payment\InvoiceController;
use App\Http\Requests\PlaceOrderRequest;
use App\Jobs\SendOrderEmailJob;
use App\Jobs\SendOrderToBCJob;
use App\Services\Payments\OrderCalculatorService;
use App\Services\Payments\OrderPlacementService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * Mobile's JSON equivalent of the web checkout flow for the non-card
 * providers (invoice/limit/cash) — web's InvoiceController returns
 * Inertia redirects, which a mobile HTTP client can't consume. Card
 * providers (bog/tbc/pcb) don't need an equivalent here: PaymentController's
 * initiate() is already a pure JSON endpoint, just exposed under a new
 * routes/api.php entry pointing at the existing controller.
 */
class CheckoutController extends Controller
{
    public function __construct(protected OrderCalculatorService $calculatorService) {}

    public function meta(Request $request): JsonResponse
    {
        return response()->json([
            'allow_cash_payment' => (bool) $request->user()->allow_cash_payment,
        ]);
    }

    /**
     * Read-only pricing/delivery-cost preview — same calculation order
     * placement uses, with zero side effects (no Order/Cart writes).
     */
    public function preview(Request $request): JsonResponse
    {
        try {
            $calc = $this->calculatorService->calculate(
                $request->input('cart_ids', []),
                $request->input('delivery_type', ''),
                $request->user()->id,
                $request->input('delivery_price_type'),
                $request->input('city'),
            );
        } catch (\InvalidArgumentException $e) {
            return response()->json(['error' => $e->getMessage()], 422);
        }

        return response()->json($calc);
    }

    public function place(PlaceOrderRequest $request, OrderPlacementService $placementService, InvoiceController $invoiceController): JsonResponse
    {
        $validated = $request->validated();
        $provider = $validated['provider'];
        $user = $request->user();

        if ($provider === 'cash' && ! $user->allow_cash_payment) {
            return response()->json(['error' => 'Cash payment is not available for your account.'], 422);
        }

        $status = match ($provider) {
            'limit' => 'limit',
            'cash' => 'paid',
            default => 'pending', // invoice
        };

        try {
            $result = $placementService->place($validated, $user->id, $status, $provider);
        } catch (\InvalidArgumentException $e) {
            return response()->json(['error' => $e->getMessage()], 422);
        }

        if ($provider === 'invoice') {
            $invoiceController->generatePDF($result['order']->load('items'), $result['invoiceNo'], $result['payment']);
        } elseif ($provider === 'cash') {
            SendOrderEmailJob::dispatch($result['order']->id, $result['payment']->id, $result['invoiceNo'], $user);
            SendOrderToBCJob::dispatch($result['order']);
        }

        return response()->json([
            'order_id' => $result['order']->id,
            'invoice_no' => $result['invoiceNo'],
            'payment_id' => $result['payment']->id,
            'status' => $result['order']->status,
        ]);
    }
}
