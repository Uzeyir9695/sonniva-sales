<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class CheckoutController extends Controller
{
    public function index(Request $request)
    {
        $cartIds = $request->input('cart_ids', []);

        $cartItems = $request->user()
            ->carts()
            ->whereHas('item', fn ($q) => $q->where('inventory', '>', 0))
            ->with('item')
            ->when(count($cartIds), fn ($q) => $q->whereIn('id', $cartIds))
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
