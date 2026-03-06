<?php

namespace App\Http\Controllers;

use App\Models\Item;
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
            ->with('item')
            ->latest()
            ->get();

        return Inertia::render('Cart/Index', [
            'cartItems' => $cartItems,
        ]);
    }

    // Add or increment quantity
    public function add(Request $request, Item $item): JsonResponse
    {
        $request->validate([
            'quantity' => ['integer', 'min:1', 'max:999'],
        ]);

        $quantity = $request->input('quantity', 1);

        $cart = $request->user()->carts()->firstOrCreate(
            ['item_id' => $item->id],
            ['quantity' => 0]
        );

        $cart->increment('quantity', $quantity);

        return response()->json([
            'item_id'  => $item->id,
            'quantity' => $cart->fresh()->quantity,
        ]);
    }

    // Set quantity directly (manual input case)
    public function update(Request $request, Item $item): JsonResponse
    {
        $request->validate([
            'quantity' => ['required', 'integer', 'min:1', 'max:999'],
        ]);

        $cart = $request->user()->carts()->where('item_id', $item->id)->first();

        if (!$cart) {
            $cart = $request->user()->carts()->create([
                'item_id'  => $item->id,
                'quantity' => $request->quantity,
            ]);
        } else {
            $cart->update(['quantity' => $request->quantity]);
        }

        return response()->json([
            'item_id'  => $item->id,
            'quantity' => $cart->quantity,
        ]);
    }

    public function remove(Request $request, Item $item): JsonResponse
    {
        $request->user()->carts()->where('item_id', $item->id)->delete();

        return response()->json([
            'item_id' => $item->id,
            'removed' => true,
        ]);
    }

    // Merge guest cart after login
    public function syncGuest(Request $request): JsonResponse
    {
        foreach ($request->items as $guestItem) {
            $request->user()->carts()->updateOrCreate(
                ['item_id' => $guestItem['id']],
                ['quantity' => $guestItem['quantity']]
            );
        }

        $cartItems = $request->user()->carts()->get(['item_id', 'quantity']);

        return response()->json([
            'items' => $cartItems->mapWithKeys(fn($c) => [$c->item_id => $c->quantity]),
        ]);
    }
}
