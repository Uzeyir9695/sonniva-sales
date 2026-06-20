<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class UserOrderController extends Controller
{
    public function index(): Response
    {
        $orders = Order::with([
            'payment:id,order_id,provider,invoice_no',
        ])
            ->where('user_id', Auth::id())
            ->whereNot('status', 'awaiting_payment')
            ->latest()
            ->paginate(20)
            ->through(fn ($order) => [
                'id' => $order->id,
                'invoice_no' => $order->invoice_no,
                'status' => $order->status,
                'delivery_type' => $order->delivery_type,
                'total' => $order->total,
                'created_at' => $order->created_at,
                'payment' => $order->payment ? [
                    'provider' => $order->payment->provider,
                    'invoice_no' => $order->payment->invoice_no,
                ] : null,
            ]);

        return Inertia::render('UserOrders/Index', [
            'orders' => Inertia::defer(fn () => $orders),
        ]);
    }

    public function show(Order $order): JsonResponse
    {
        abort_if($order->user_id !== Auth::id(), 403);

        $order->load([
            'items.item:id,no,name',
            'payment',
        ]);

        return response()->json([
            'order' => [
                'id' => $order->id,
                'invoice_no' => $order->invoice_no,
                'status' => $order->status,
                'delivery_type' => $order->delivery_type,
                'delivery_cost' => $order->delivery_cost,
                'address' => $order->address,
                'apartment_number' => $order->apartment_number,
                'subtotal' => $order->subtotal,
                'wholesale_discount' => $order->wholesale_discount,
                'total' => $order->total,
                'comment' => $order->comment,
                'created_at' => $order->created_at,
                'approved_at' => $order->approved_at,
                'ready_at' => $order->ready_at,
                'payment' => $order->payment,
                'items' => $order->items->map(fn ($oi) => [
                    'id' => $oi->id,
                    'item_no' => $oi->item?->no,
                    'item_name' => $oi->item?->name,
                    'quantity' => $oi->quantity,
                    'unit_price' => $oi->unit_price,
                    'subtotal' => $oi->subtotal,
                ]),
            ],
        ]);
    }
}
