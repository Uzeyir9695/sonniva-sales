<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Jobs\SendOrderEmailJob;
use App\Jobs\SendOrderToBCJob;
use App\Mail\ReadyOrderEmail;
use App\Models\Order;
use App\Services\SmsService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;
use Inertia\Response;

class AdminOrderController extends Controller
{
    public function __construct(protected SmsService $smsService) {}

    public function index(Request $request): Response
    {
        $status = $request->input('status', 'pending');

        $orders = Order::with([
            'user:id,name,lastname,phone,tax_id',
            'payment:id,order_id,provider,status,amount,invoice_no,transaction_id',
        ])
            ->whereNot('status', 'awaiting_payment')
            ->where('status', $status)
            ->when($status === 'pending' && $request->filled('start_date'), fn ($q) => $q->whereDate('invoiced_at', '>=', $request->start_date))
            ->when($status === 'pending' && $request->filled('end_date'), fn ($q) => $q->whereDate('invoiced_at', '<=', $request->end_date))
            ->when(in_array($status, ['paid', 'limit']) && $request->filled('start_date'), fn ($q) => $q->whereDate('approved_at', '>=', $request->start_date))
            ->when(in_array($status, ['paid', 'limit']) && $request->filled('end_date'), fn ($q) => $q->whereDate('approved_at', '<=', $request->end_date))
            ->when($status === 'ready' && $request->filled('approved_start'), fn ($q) => $q->whereDate('approved_at', '>=', $request->approved_start))
            ->when($status === 'ready' && $request->filled('approved_end'), fn ($q) => $q->whereDate('approved_at', '<=', $request->approved_end))
            ->when($status === 'ready' && $request->filled('ready_start'), fn ($q) => $q->whereDate('ready_at', '>=', $request->ready_start))
            ->when($status === 'ready' && $request->filled('ready_end'), fn ($q) => $q->whereDate('ready_at', '<=', $request->ready_end))
            ->latest()
            ->paginate(20)
            ->through(fn ($order) => [
                'id' => $order->id,
                'invoice_no' => $order->invoice_no,
                'status' => $order->status,
                'delivery_type' => $order->delivery_type,
                'subtotal' => $order->subtotal,
                'total' => $order->total,
                'created_at' => $order->created_at,
                'invoiced_at' => $order->invoiced_at,
                'approved_at' => $order->approved_at,
                'ready_at' => $order->ready_at,
                'user' => $order->user ? [
                    'name' => trim($order->user->name.' '.$order->user->lastname),
                    'phone' => $order->user->phone,
                    'tax_id' => $order->user->tax_id,
                ] : null,
                'payment' => $order->payment ? [
                    'provider' => $order->payment->provider,
                    'status' => $order->payment->status,
                    'transaction_id' => $order->payment->transaction_id,
                    'amount' => $order->payment->amount,
                    'invoice_no' => $order->payment->invoice_no,
                ] : null,
            ]);

        $unseenCounts = Order::selectRaw('status, count(*) as count')
            ->whereNull('seen_at')
            ->whereIn('status', ['pending', 'paid', 'limit'])
            ->groupBy('status')
            ->pluck('count', 'status');

        if (in_array($status, ['pending', 'paid', 'limit'])) {
            Order::where('status', $status)->whereNull('seen_at')->update(['seen_at' => now()]);
        }

        return Inertia::render('Admin/orders/Index', [
            'orders' => Inertia::defer(fn () => $orders),
            'unseenCounts' => $unseenCounts,
            'status' => $status,
        ]);
    }

    public function show(Order $order)
    {
        $order->load([
            'items.item:id,no,name',
            'payment',
            'user:id,name,lastname,phone,tax_id',
        ]);

        return response()->json([
            'order' => [
                'id' => $order->id,
                'invoice_no' => $order->invoice_no,
                'status' => $order->status,
                'delivery_type' => $order->delivery_type,
                'delivery_cost' => $order->delivery_cost,
                'city' => $order->city,
                'branch' => $order->branch,
                'address' => $order->address,
                'apartment_number' => $order->apartment_number,
                'subtotal' => $order->subtotal,
                'wholesale_discount' => $order->wholesale_discount,
                'total' => $order->total,
                'comment' => $order->comment,
                'created_at' => $order->created_at,
                'approved_at' => $order->approved_at,
                'ready_at' => $order->ready_at,
                'user' => $order->user,
                'payment' => $order->payment,
                'items' => $order->items->map(fn ($oi) => [
                    'id' => $oi->id,
                    'item_no' => $oi->item?->no,
                    'item_name' => $oi->item?->name,
                    'quantity' => $oi->quantity,
                    'unit_price' => $oi->unit_price,
                    'unit_weight' => $oi->unit_weight,
                    'subtotal' => $oi->subtotal,
                ]),
            ],
        ]);
    }

    public function approve(Order $order): RedirectResponse
    {
        $order->load(['user', 'payment']);

        $order->update([
            'status' => 'paid',
            'approved_at' => now(),
        ]);

        $order->payment()->whereNot('status', 'completed')->update(['status' => 'completed']);

        if ($order->payment) {
            SendOrderEmailJob::dispatch($order->id, $order->payment->id, $order->invoice_no, $order->user);
        }

        SendOrderToBCJob::dispatch($order);

        return redirect()->back()->with('message', 'Order approved.');
    }

    public function markAsReady(Request $request, Order $order): RedirectResponse
    {
        $order->update([
            'status' => 'ready',
            'ready_at' => now(),
        ]);

        if ($request->boolean('inform_user', true)) {
            $order->load('user');
            $invoice = $order->invoice_no;

            $message = match ($order->delivery_type) {
                'office' => "თქვენი შეკვეთა ინვოისის ნომრით (#{$invoice}) მზად არის. შეგიძლიათ გაიტანოთ ადგილიდან.",
                'tbilisi', 'regions' => "თქვენი შეკვეთა ინვოისის ნომრით (#{$invoice}) მზად არის. შეკვეთა გამოგზავნილია მისამართზე.",
                default => "თქვენი შეკვეთა ინვოისის ნომრით (#{$invoice}) მზად არის.",
            };

            $this->smsService->send($order->user->phone, $message, true);
            Mail::to($order->user->email)->queue(new ReadyOrderEmail($message));
        }

        return redirect()->back()->with('message', 'Order marked as ready.');
    }

    public function cancel(Order $order): RedirectResponse
    {
        $order->load('user');
        $order->update(['status' => 'cancelled']);

        $invoice = $order->invoice_no;
        $message = "სამწუხაროდ, თქვენი შეკვეთა ინვოისი ნომრით #{$invoice} უარყოფილია. დამატებითი ინფორმაციისთვის დაგვიკავშირდით.";

        $this->smsService->send($order->user->phone, $message, true);

        return redirect()->back()->with('message', 'Order cancelled.');
    }

    public function sendPdf(Request $request, Order $order): RedirectResponse
    {
        $order->load('payment');

        if ($request->boolean('send_to_email', true) && $order->payment) {
            SendOrderEmailJob::dispatch($order->id, $order->payment->id, $order->invoice_no);
        }

        if ($request->boolean('send_to_bc', true)) {
            SendOrderToBCJob::dispatch($order);
        }

        return redirect()->back()->with('message', 'PDF sent.');
    }

    public function sendToOnway(Order $order): RedirectResponse
    {
        $order->load(['user:id,name,lastname,phone,phone_country', 'items']);

        $payload = [
            'username' => config('onway.username'),
            'key' => config('onway.key'),
            'from_city' => config('onway.from.city'),
            'from_name' => config('onway.from.name'),
            'from_phone' => config('onway.from.phone'),
            'from_address' => config('onway.from.address'),
            'from_company' => config('onway.from.company'),
            'to_city' => $order->city,
            'to_name' => trim($order->user->name.' '.$order->user->lastname),
            'to_phone' => $order->user->local_phone,
            'to_address' => $order->address,
            'to_company' => $order->user->user_type === 'legal_entity' ? $order->user->name : null,
            'payment' => 3,
            'payer' => 3,
            'weight' => max($order->items->sum(fn ($i) => $i->unit_weight * $i->quantity), 0.1),
            'quantity' => $order->items->sum('quantity'),
            'service_level' => 1,
            'order_number' => $order->invoice_no,
        ];

        $response = Http::post(config('onway.url'), $payload);

        if ($response->failed()) {
            return redirect()->back()->withErrors(['message' => 'Onway API error: '.$response->body()]);
        }

        $result = $response->json();

        if (! empty($result['error'])) {
            return redirect()->back()->withErrors(['message' => 'Onway error: '.$result['error']]);
        }

        return redirect()->back()->with('message', 'Order sent to Onway successfully.');
    }

    public function destroy(Order $order): RedirectResponse
    {
        $order->delete();

        return redirect()->back()->with('message', 'Order deleted.');
    }
}
