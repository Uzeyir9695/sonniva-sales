<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class UserOrderController extends Controller
{
    public function index(): Response
    {
        $orders = Order::with([
            'payment:id,order_id,provider,invoice_no',
            'items.item:id,name,images',
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
                'discount_total' => $order->discountTotal(),
                'created_at' => $order->created_at,
                'tracking_number' => $order->tracking_number,
                'payment' => $order->payment ? [
                    'provider' => $order->payment->provider,
                    'invoice_no' => $order->payment->invoice_no,
                ] : null,
                'items' => $order->items->map(fn ($orderItem) => [
                    'id' => $orderItem->id,
                    'name' => $orderItem->item?->name,
                    'image' => $orderItem->item?->images[0] ?? null,
                    'storage_path' => $orderItem->item?->storage_path,
                    'quantity' => $orderItem->quantity,
                ]),
            ]);

        return Inertia::render('UserOrders/Index', [
            'orders' => Inertia::defer(fn () => $orders),
            'ordersSummary' => Inertia::defer(fn () => $this->ordersSummary()),
        ]);
    }

    /**
     * Aggregate total/discount across all of the user's orders (matching the "X orders" count
     * shown alongside it), not just the current pagination page.
     */
    private function ordersSummary(): array
    {
        $orders = Order::with('items:id,order_id,quantity,subtotal,discount,wholesale_discount,fake_price')
            ->where('user_id', Auth::id())
            ->whereNot('status', 'awaiting_payment')
            ->get(['id', 'total', 'wholesale_discount']);

        return [
            'total' => (float) $orders->sum('total'),
            'discount' => (float) $orders->sum(fn (Order $order) => $order->discountTotal()),
        ];
    }

    public function reorder(Order $order, Request $request): JsonResponse
    {
        abort_if($order->user_id !== Auth::id(), 403);

        $request->validate([
            'order_item_ids' => ['sometimes', 'array'],
            'order_item_ids.*' => ['uuid'],
        ]);

        $orderItemsQuery = $order->items()->with('item');

        if ($request->filled('order_item_ids')) {
            $orderItemsQuery->whereIn('id', $request->input('order_item_ids'));
        }

        $orderItems = $orderItemsQuery->get();

        $added = 0;
        $skippedNames = [];

        foreach ($orderItems as $orderItem) {
            $item = $orderItem->item;

            if (! $item || $item->inventory <= 0) {
                if ($item?->name) {
                    $skippedNames[] = $item->name;
                }

                continue;
            }

            $cart = Auth::user()->carts()->firstOrCreate(
                ['item_id' => $item->id, 'selected_uom' => $orderItem->unit_of_measure_code],
                ['quantity' => 0]
            );

            $cart->increment('quantity', $orderItem->quantity);
            $added++;
        }

        return response()->json([
            'added' => $added,
            'skipped_count' => $orderItems->count() - $added,
            'skipped_names' => $skippedNames,
        ]);
    }

    public function show(Order $order): JsonResponse
    {
        abort_if($order->user_id !== Auth::id(), 403);

        $order->load([
            'items.item:id,no,name,slug,images',
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
                'tracking_number' => $order->tracking_number,
                'payment' => $order->payment,
                'items' => $order->items->map(fn ($oi) => [
                    'id' => $oi->id,
                    'item_no' => $oi->item?->no,
                    'item_name' => $oi->item?->name,
                    'item_slug' => $oi->item?->slug,
                    'image' => $oi->item?->images[0] ?? null,
                    'storage_path' => $oi->item?->storage_path,
                    'quantity' => $oi->quantity,
                    'unit_price' => $oi->unit_price,
                    'subtotal' => $oi->subtotal,
                    'discount' => $oi->discount,
                    'wholesale_discount' => $oi->wholesale_discount,
                    'fake_price' => $oi->fake_price,
                    'with_service' => $oi->with_service,
                    'service_price' => $oi->service_price,
                ]),
            ],
        ]);
    }
}
