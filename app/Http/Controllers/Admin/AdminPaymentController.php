<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminPaymentController extends Controller
{
    public function index(Request $request): \Inertia\Response
    {
        $dateFrom = $request->input('date_from');
        $dateTo = $request->input('date_to');

        $payments = Payment::with([
            'user:id,name,lastname,email',
            'order:id,invoice_no,delivery_type,delivery_cost',
        ])
            ->when($dateFrom, fn ($q) => $q->whereDate('created_at', '>=', $dateFrom))
            ->when($dateTo, fn ($q) => $q->whereDate('created_at', '<=', $dateTo))
            ->latest()
            ->get()
            ->map(fn ($payment) => [
                'id' => $payment->id,
                'invoice_no' => $payment->invoice_no,
                'provider' => $payment->provider,
                'transaction_id' => $payment->transaction_id,
                'payment_method' => $payment->payment_method,
                'amount' => $payment->amount,
                'currency' => $payment->currency,
                'status' => $payment->status,
                'processed_at' => $payment->processed_at?->format('Y-m-d H:i'),
                'created_at' => $payment->created_at?->format('Y-m-d H:i'),
                'user_name' => $payment->user ? trim($payment->user->name.' '.$payment->user->lastname) : null,
                'user_email' => $payment->user?->email,
                'delivery_type' => $payment->order?->delivery_type,
                'delivery_cost' => $payment->order?->delivery_cost,
            ]);

        return Inertia::render('Admin/payments/Index', [
            'payments' => Inertia::defer(fn () => $payments),
            'paymentsCount' => $payments->count(),
            'dateFrom' => $dateFrom,
            'dateTo' => $dateTo,
        ]);
    }
}
