<?php

namespace App\Http\Controllers\Payment;

use App\Http\Controllers\Controller;
use App\Mail\PaymentInvoiceMail;
use App\Models\Cart;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Payment;
use App\Services\Payments\OrderCalculatorService;
use App\Services\PDFGeneratorService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class InvoiceController extends Controller
{
    public function __construct(
        protected PDFGeneratorService $pdfService,
        protected OrderCalculatorService $calculatorService,
    ) {}

    public function initiateInvoice(Request $request): RedirectResponse
    {
        $result = $this->createOrder($request, 'pending', 'invoice');

        $this->generatePDF($result['order']->load('items'), $result['invoiceNo'], $result['payment']);

        return to_route('payment.invoice.success', ['invoice' => $result['invoiceNo']]);
    }

    public function initiateLimit(Request $request): RedirectResponse
    {
        $result = $this->createOrder($request, 'limit', 'limit');

        return to_route('payment.limit.success', ['invoice' => $result['invoiceNo']]);
    }

    private function createOrder(Request $request, string $status, string $provider): array
    {
        try {
            $calc = $this->calculatorService->calculate(
                $request->cart_ids,
                $request->delivery_type,
                auth()->id(),
                $request->delivery_price_type
            );
        } catch (\InvalidArgumentException $e) {
            back()->withErrors(['message' => $e->getMessage()]);
        }

        do {
            $invoiceNo = 'S'.random_int(100000, 999999);
        } while (Order::where('invoice_no', $invoiceNo)->exists());

        session()->put('invoice_no', $invoiceNo);

        Order::where('user_id', auth()->id())
            ->where('status', 'awaiting_payment')
            ->whereDoesntHave('payment', fn ($q) => $q->where('status', 'completed'))
            ->delete();

        $order = $payment = null;

        DB::transaction(function () use ($request, $calc, $invoiceNo, $status, $provider, &$order, &$payment) {
            $orderData = [
                'user_id' => auth()->id(),
                'invoice_no' => $invoiceNo,
                'status' => $status,
                'delivery_type' => $request->delivery_type,
                'delivery_cost' => $calc['delivery_cost'],
                'city' => $request->city,
                'address' => $request->address,
                'apartment_number' => $request->apartment_number,
                'comment' => $request->comment,
                'subtotal' => $calc['subtotal'],
                'wholesale_discount' => $calc['wholesale_discount'],
                'total' => $calc['total'],
            ];

            $orderData[$provider === 'limit' ? 'approved_at' : 'invoiced_at'] = now();

            $order = Order::create($orderData);

            foreach ($calc['items'] as $item) {
                OrderItem::create([
                    'order_id' => $order->id,
                    'item_id' => $item['item_id'],
                    'quantity' => $item['quantity'],
                    'unit_of_measure_code' => $item['unit_of_measure_code'],
                    'unit_price' => $item['unit_price'],
                    'subtotal' => $item['subtotal'],
                ]);
            }

            $payment = Payment::create([
                'user_id' => auth()->id(),
                'order_id' => $order->id,
                'invoice_no' => $invoiceNo,
                'provider' => $provider,
                'amount' => $calc['total'],
                'status' => $provider === 'limit' ? 'completed' : 'pending',
            ]);
        });

        Cart::where('user_id', auth()->id())
            ->whereIn('id', $request->cart_ids)
            ->delete();

        return ['order' => $order, 'invoiceNo' => $invoiceNo, 'payment' => $payment];
    }

    public function generatePDF($orderItems, $invoiceNumber, $payment): void
    {
        $user = auth()->user();

        $totalCost = $orderItems->sum('subtotal') + $payment->delivery_cost;

        $viewVars = [
            'payment' => $payment,
            'order' => $orderItems,
            'invoiceNumber' => $invoiceNumber,
            'user' => $user,
            'tbcIBAN' => config('payments.tbc.iban'),
            'bogIBAN' => config('payments.bog.iban'),
            'totalAmount' => $totalCost,
        ];

        $fileName = 'invoice_'.$invoiceNumber.'.pdf';

        dispatch(function () use ($viewVars, $invoiceNumber, $fileName, $user) {
            $this->pdfService->generate($viewVars, $fileName);
            $pdfUrl = route('download.file', ['filename' => $fileName]);
            Mail::to($user->email)->send(new PaymentInvoiceMail($pdfUrl, $invoiceNumber));
        });
    }

    public function success(string $invoice): Response
    {
        session()->forget('invoice_no');

        return Inertia::render('Payment/InvoiceSuccess', [
            'invoiceNumber' => $invoice,
        ]);
    }

    public function limitSuccess(string $invoice): Response
    {
        session()->forget('invoice_no');

        return Inertia::render('Payment/LimitSuccess', [
            'invoiceNumber' => $invoice,
        ]);
    }

    public function download(string $filename)
    {
        $filename = basename($filename);

        if (str_ends_with($filename, '.pdf')) {
            $path = "invoices/{$filename}";
        } elseif (Storage::disk('public')->exists("invoices/invoice_{$filename}.pdf")) {
            $path = "invoices/invoice_{$filename}.pdf";
        } else {
            $path = "invoices/order_{$filename}.pdf";
        }

        if (! Storage::disk('public')->exists($path)) {
            abort(404, 'Invoice file not found.');
        }

        return Storage::disk('public')->download($path, basename($path));
    }
}
