<?php

namespace App\Http\Controllers;

use App\Models\Item;
use App\Models\StockNotification;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CartController extends Controller
{
    public function index(Request $request): Response
    {
        $cartItems = $request->user()
            ->carts()
            ->whereHas('item')
            ->with('item')
            ->latest()
            ->get();

        $outOfStockItemIds = $cartItems
            ->filter(fn ($c) => $c->item->inventory <= 0)
            ->pluck('item_id');

        $subscribedItemIds = $outOfStockItemIds->isNotEmpty()
            ? StockNotification::where('user_id', $request->user()->id)
                ->whereIn('item_id', $outOfStockItemIds)
                ->pluck('item_id')
            : collect();

        return Inertia::render('Cart/Index', [
            'cartItems' => $cartItems,
            'subscribedItemIds' => $subscribedItemIds,
        ]);
    }

    // Add or increment quantity
    public function add(Request $request, Item $item): JsonResponse
    {
        $request->validate([
            'quantity' => ['integer', 'min:1'],
            'selected_uom' => ['nullable', 'string'],
            'with_service' => ['boolean'],
        ]);

        $quantity = $request->input('quantity', 1);
        $withService = $request->boolean('with_service') && $item->hasSetupService();

        $cart = $request->user()->carts()->firstOrCreate(
            ['item_id' => $item->id, 'selected_uom' => $request->input('selected_uom')],
            ['quantity' => 0, 'with_service' => $withService]
        );

        $cart->increment('quantity', $quantity);

        return response()->json([
            'item_id' => $item->id,
            'quantity' => $cart->fresh()->quantity,
        ]);
    }

    // Set quantity directly (manual input case)
    public function update(Request $request, Item $item): JsonResponse
    {
        $request->validate([
            'quantity' => ['required', 'integer', 'min:1'],
            'selected_uom' => ['nullable', 'string'],
            'with_service' => ['boolean'],
        ]);

        $cart = $request->user()->carts()
            ->where('item_id', $item->id)
            ->where('selected_uom', $request->input('selected_uom'))
            ->first();

        if (! $cart) {
            $cart = $request->user()->carts()->create([
                'item_id' => $item->id,
                'selected_uom' => $request->input('selected_uom'),
                'quantity' => $request->quantity,
                'with_service' => $request->boolean('with_service') && $item->hasSetupService(),
            ]);
        } else {
            $cart->update(['quantity' => $request->quantity]);
        }

        return response()->json([
            'item_id' => $item->id,
            'quantity' => $cart->quantity,
        ]);
    }

    public function toggleService(Request $request, Item $item): JsonResponse
    {
        if (! $item->hasSetupService()) {
            return response()->json(['message' => 'This item is not eligible for the setup service.'], 422);
        }

        $request->validate([
            'selected_uom' => ['nullable', 'string'],
        ]);

        $cart = $request->user()->carts()
            ->where('item_id', $item->id)
            ->where('selected_uom', $request->input('selected_uom'))
            ->first();

        if (! $cart) {
            return response()->json(['message' => 'Item is not in your cart.'], 404);
        }

        $cart->update(['with_service' => ! $cart->with_service]);

        return response()->json([
            'item_id' => $item->id,
            'with_service' => $cart->with_service,
        ]);
    }

    public function remove(Request $request, Item $item): JsonResponse
    {
        $request->validate([
            'selected_uom' => ['nullable', 'string'],
        ]);

        $request->user()->carts()
            ->where('item_id', $item->id)
            ->where('selected_uom', $request->input('selected_uom'))
            ->delete();

        return response()->json([
            'item_id' => $item->id,
            'removed' => true,
        ]);
    }

    // Merge guest cart after login
    public function syncGuest(Request $request): JsonResponse
    {
        $eligibleItemIds = Item::whereIn('id', collect($request->items)->pluck('id'))
            ->where('category_code', Item::SETUP_SERVICE_CATEGORY_CODE)
            ->pluck('id')
            ->flip();

        foreach ($request->items as $guestItem) {
            $request->user()->carts()->updateOrCreate(
                ['item_id' => $guestItem['id'], 'selected_uom' => $guestItem['uom'] ?? null],
                [
                    'quantity' => $guestItem['quantity'],
                    'with_service' => ! empty($guestItem['with_service']) && $eligibleItemIds->has($guestItem['id']),
                ]
            );
        }

        $carts = $request->user()->carts()->get(['id', 'item_id', 'quantity', 'selected_uom', 'with_service']);

        $key = fn ($c) => $c->selected_uom
            ? $c->item_id.'__'.$c->selected_uom
            : (string) $c->item_id;

        return response()->json([
            'items' => $carts->mapWithKeys(fn ($c) => [$key($c) => $c->quantity]),
            'uoms' => $carts->filter(fn ($c) => $c->selected_uom)
                ->mapWithKeys(fn ($c) => [$key($c) => $c->selected_uom]),
            'services' => $carts->filter(fn ($c) => $c->with_service)
                ->mapWithKeys(fn ($c) => [$key($c) => true]),
        ]);
    }
}
