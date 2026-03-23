<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminOrderController extends Controller
{
    public function index(Request $request)
    {
        $status = $request->get('status', 'all');

        $orders = Order::with([
                'user:id,name,lastname,phone,tax_id',
                'payment:id,order_id,provider,status,amount,invoice_no,transaction_id',
            ])
            ->when($status !== 'all', fn($q) => $q->where('status', $status))
            ->latest()
            ->paginate(20)
            ->through(fn($order) => [
                'id'            => $order->id,
                'invoice_no'    => $order->invoice_no,
                'status'        => $order->status,
                'delivery_type' => $order->delivery_type,
                'subtotal'      => $order->subtotal,
                'total'         => $order->total,
                'created_at'    => $order->created_at,
                'user'          => $order->user ? [
                    'name'   => trim($order->user->name . ' ' . $order->user->lastname),
                    'phone'  => $order->user->phone,
                    'tax_id' => $order->user->tax_id,
                ] : null,
                'payment' => $order->payment ? [
                    'provider'       => $order->payment->provider,
                    'status'         => $order->payment->status,
                    'transaction_id' => $order->payment->transaction_id,
                    'amount'         => $order->payment->amount,
                    'invoice_no'     => $order->payment->invoice_no,
                ] : null,
            ]);

        $unseenCounts = Order::selectRaw('status, count(*) as count')
            ->whereNull('seen_at')
            ->whereIn('status', ['pending', 'approved'])
            ->groupBy('status')
            ->pluck('count', 'status');

        if (in_array($status, ['pending', 'approved'])) {
            Order::where('status', $status)->whereNull('seen_at')->update(['seen_at' => now()]);
        }

        return Inertia::render('Admin/orders/Index', [
            'orders'       => Inertia::defer(fn() => $orders),
            'unseenCounts' => $unseenCounts,
            'status'       => $status,
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
                'id'               => $order->id,
                'invoice_no'       => $order->invoice_no,
                'status'           => $order->status,
                'delivery_type'    => $order->delivery_type,
                'delivery_cost'    => $order->delivery_cost,
                'address'          => $order->address,
                'apartment_number' => $order->apartment_number,
                'subtotal'         => $order->subtotal,
                'total'            => $order->total,
                'comment'          => $order->comment,
                'created_at'       => $order->created_at,
                'approved_at'      => $order->approved_at,
                'ready_at'         => $order->ready_at,
                'user'             => $order->user,
                'payment'          => $order->payment,
                'items'            => $order->items->map(fn($oi) => [
                    'id'         => $oi->id,
                    'item_no'    => $oi->item?->no,
                    'item_name'  => $oi->item?->name,
                    'quantity'   => $oi->quantity,
                    'unit_price' => $oi->unit_price,
                    'subtotal'   => $oi->subtotal,
                ]),
            ],
        ]);
    }

    public function updateStatus(Request $request, Order $order)
    {
        $request->validate([
            'status' => 'required|in:approved,ready,cancelled',
        ]);

        $order->update([
            'status' => $request->status,
            ...match($request->status) {
                'approved' => ['approved_at' => now()],
                'ready'    => ['ready_at'    => now()],
                default    => [],
            },
        ]);

        return redirect()->back()->with('message', 'Order status updated.');
    }
}
