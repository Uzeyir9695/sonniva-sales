<?php

namespace App\Http\Controllers\Payment;

use App\Http\Controllers\Controller;
use App\Mail\PaymentInvoiceMail;
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
        try {
            $calc = $this->calculatorService->calculate(
                $request->item_ids,
                $request->delivery_type,
                auth()->id()
            );
        } catch (\InvalidArgumentException $e) {
            return back()->withErrors(['message' => $e->getMessage()]);
        }

        do {
            $invoiceNo = 'S'.random_int(100000, 999999);
        } while (Order::where('invoice_no', $invoiceNo)->exists());

        session()->put('invoice_no', $invoiceNo);

        Order::where('user_id', auth()->id())
            ->where('status', 'awaiting_payment')
            ->whereDoesntHave('payment', fn ($q) => $q->where('status', 'completed'))
            ->delete();

        DB::transaction(function () use ($request, $calc, $invoiceNo, &$order, &$payment) {
            $order = Order::create([
                'user_id' => auth()->id(),
                'invoice_no' => $invoiceNo,
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

            $payment = Payment::create([
                'user_id' => auth()->id(),
                'order_id' => $order->id,
                'invoice_no' => $invoiceNo,
                'provider' => 'invoice',
                'amount' => $calc['total'],
                'status' => 'pending',
            ]);
        });

         $this->generatePDF($order->load('items'), $invoiceNo, $payment);

        return to_route('payment.invoice.success', ['invoice' => $invoiceNo]);
    }

    public function generatePDF($orderItems, $invoiceNumber, $payment): void
    {
        $user = auth()->user();

        $totalCost = $orderItems->sum('subtotal') + $payment->delivery_cost;

        $viewVars = [
            'payment' => $payment,
            'orderItems' => $orderItems,
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

    public function success($invoice): Response
    {
        session()->forget('invoice_no');

        return Inertia::render('Payment/InvoiceSuccess', [
            'invoiceNumber' => $invoice,
        ]);
    }

    public function download(string $filename)
    {
        $filename = basename($filename);
        $path = "invoices/{$filename}";

        return Storage::disk('public')->download($path, $filename);
    }
}
