<?php

namespace App\Http\Controllers\Payment;

use App\Http\Controllers\Controller;
use App\Http\Requests\PaymentRequest;
use App\Mail\PaymentInvoiceMail;
use App\Models\OrderItem;
use App\Models\Payment;
use App\Services\PDFGeneratorService;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class InvoiceController extends Controller
{
    protected $pdfService;
    public function __construct(PDFGeneratorService $pdfService)
    {
        $this->pdfService = $pdfService;
    }
    public function initiateInvoice(PaymentRequest $request)
    {
        $request->validated();

        do {
            $invoiceNo = 'S' . random_int(100000, 999999);
            $exists = OrderItem::where('invoice_no', $invoiceNo)->exists();
        } while ($exists);

        session()->put('invoice_no', $invoiceNo);

        OrderItem::whereIn('id', $request->order_item_ids)
            ->where('user_id', auth()->id())
            ->update([
                'invoice_no' => $invoiceNo,
                'invoiced_at' => now(),
                'payment_type' => 'invoice',
                'address' => $request->address,
                'apartment_number' => $request->apartment_number,
            ]);

        $payment = Payment::create([
            'provider' => 'invoice',
            'invoice_no' => $invoiceNo,
            'delivery_type' => $request->delivery_type,
            'delivery_cost' => $request->delivery_cost,
            'status' => 'pending',
        ]);

        $orderItems = OrderItem::where('invoice_no', $invoiceNo)
            ->with(['details'])
            ->get();

        if ($orderItems->isEmpty()) {
            return back()->withErrors(['message' => 'Invoice is already sent.']);
        }

        $this->generatePDF($orderItems, $invoiceNo, $payment);

        return to_route('payment.invoice.success', ['invoice' => $invoiceNo]);
    }

    public function generatePDF($orderItems, $invoiceNumber, $payment)
    {
        $user = auth()->user();

        $totalAmount = $orderItems->sum(function($item) {
            return $item->total;
        });

        $totalCost = $totalAmount + $payment->delivery_cost;

        $viewVars = [
            'payment' => $payment,
            'orderItems' => $orderItems,
            'invoiceNumber' => $invoiceNumber,
            'user' => $user,
            'tbcIBAN' => config('payments.tbc.iban'),
            'bogIBAN' => config('payments.bog.iban'),
            'totalAmount' => $totalCost?? 'Not set',
        ];

        $fileName = 'invoice_'.$invoiceNumber.'.pdf';

        dispatch(function () use ($orderItems, $viewVars, $invoiceNumber, $fileName, $user) {
            $this->pdfService->generate($viewVars, $fileName);

            $pdfUrl = route('download.file', ['filename' => $fileName]);

            Mail::to($user->email)->send(new PaymentInvoiceMail($pdfUrl, $invoiceNumber));
        });
    }

    public function success($locale, $invoice)
    {
        session()->forget('invoice_no');

        return Inertia::render('payment/InvoiceSuccess', [
            'invoiceNumber' => $invoice,
        ]);
    }

    public function download(string $filename)
    {
        $filename = basename($filename);
        $path = "invoices/{$filename}";
        Storage::disk('public')->exists($path);
//        abort_unless(
//           ,
//            404
//        );

        return Storage::disk('public')->download($path, $filename);
    }
}
