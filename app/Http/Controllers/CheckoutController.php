<?php

namespace App\Http\Controllers;

use App\Services\BusinessCentralService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;

class CheckoutController extends Controller
{
    public function index(Request $request)
    {
        $cartIds = $request->input('cart_ids', []);
        $itemIds = $request->input('item_ids', []);
        $uom = $request->input('uom');

        $cartItems = $request->user()
            ->carts()
            ->whereHas('item', fn ($q) => $q->where('inventory', '>', 0))
            ->with('item')
            ->when(count($cartIds), fn ($q) => $q->whereIn('id', $cartIds))
            ->when(count($itemIds), fn ($q) => $q
                ->whereIn('item_id', $itemIds)
                ->when($uom, fn ($q) => $q->where('selected_uom', $uom))
            )
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

    public function onwayRegions(): JsonResponse
    {
        $data = Cache::remember('onway_regions', now()->addMonth(), function () {
            $response = Http::get('https://onway.ge/index.php?route=api/order/regions');
            $data = $response->json();

            if (isset($data['zones'])) {
                $data['zones'] = array_values(
                    array_filter($data['zones'], fn ($zone) => ! str_starts_with($zone['name'] ?? '', 'თბილისი'))
                );
            }

            return $data;
        });

        return response()->json($data);
    }

    public function creditInfo(Request $request, BusinessCentralService $bc): JsonResponse
    {
        $user = $request->user();

        if (! $user->tax_id) {
            return response()->json(['has_credit' => false, 'available' => 0, 'limit' => 0, 'used' => 0]);
        }

        try {
            return response()->json($bc->getCustomerCreditInfo($user->tax_id));
        } catch (\Exception $e) {
            return response()->json(['error' => 'ლიმიტის ინფორმაცია ვერ ჩაიტვირთა'], 500);
        }
    }
}
