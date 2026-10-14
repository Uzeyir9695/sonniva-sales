<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\StreamedResponse;

class AdminPaymentController extends Controller
{
    private const array RELATIONS = [
        'user:id,name,lastname,email',
        'order:id,invoice_no,delivery_type,delivery_cost',
    ];

    public function index(Request $request): \Inertia\Response
    {
        return Inertia::render('Admin/payments/Index', [
            'payments' => Inertia::defer(fn () => $this->filteredPayments($request)
                ->with(self::RELATIONS)
                ->latest()
                ->paginate($request->integer('per_page', 15))
                ->withQueryString()
                ->through(fn (Payment $payment) => $this->paymentRow($payment))),
            'dateFrom' => $request->input('date_from'),
            'dateTo' => $request->input('date_to'),
        ]);
    }

    public function export(Request $request): StreamedResponse
    {
        $payments = $this->filteredPayments($request)->with(self::RELATIONS)->latest();

        return response()->streamDownload(function () use ($payments) {
            $out = fopen('php://output', 'w');
            fwrite($out, "\u{FEFF}");
            fputcsv($out, ['Order №', 'Customer', 'Provider', 'Status', 'Amount', 'Method', 'Transaction ID', 'Delivery', 'Processed', 'Date']);

            $payments->lazy(500)->each(function (Payment $payment) use ($out) {
                $row = $this->paymentRow($payment);

                fputcsv($out, [
                    $row['invoice_no'], $row['user_name'], $row['provider'], $row['status'], $row['amount'],
                    $row['payment_method'], $row['transaction_id'], $row['delivery_type'], $row['processed_at'], $row['created_at'],
                ]);
            });

            fclose($out);
        }, 'payments.csv', ['Content-Type' => 'text/csv; charset=UTF-8']);
    }

    private function filteredPayments(Request $request): Builder
    {
        return Payment::query()
            ->when($request->input('date_from'), fn ($q, $date) => $q->whereDate('created_at', '>=', $date))
            ->when($request->input('date_to'), fn ($q, $date) => $q->whereDate('created_at', '<=', $date))
            ->when($request->filled('invoice_no'), fn ($q) => $q->where('invoice_no', 'like', $request->string('invoice_no').'%'))
            ->when($request->filled('provider'), fn ($q) => $q->where('provider', $request->string('provider')))
            ->when($request->filled('status'), fn ($q) => $q->where('status', $request->string('status')))
            ->when($request->filled('customer_name'), fn ($q) => $q->whereHas('user', function ($u) use ($request) {
                $name = '%'.$request->string('customer_name').'%';
                $u->where('name', 'like', $name)
                    ->orWhere('lastname', 'like', $name)
                    ->orWhereRaw("concat(name, ' ', lastname) like ?", [$name]);
            }));
    }

    private function paymentRow(Payment $payment): array
    {
        return [
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
        ];
    }
}
