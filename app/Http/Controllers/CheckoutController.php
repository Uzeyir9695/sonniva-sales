<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class CheckoutController extends Controller
{
    public function index(Request $request)
    {
        $itemIds = $request->input('item_ids', []);

        $cartItems = $request->user()
            ->carts()
            ->with('item')
            ->when(count($itemIds), fn($q) => $q->whereIn('item_id', $itemIds))
            ->latest()
            ->get();

        // Redirect to cart if empty
        if ($cartItems->isEmpty()) {
            return redirect()->route('cart.index');
        }

        return Inertia::render('Checkout/Index', [
            'cartItems' => $cartItems,
        ]);
    }
}
