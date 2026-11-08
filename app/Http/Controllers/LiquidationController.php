<?php

namespace App\Http\Controllers;

use App\Models\Item;
use App\Models\LiquidationItem;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class LiquidationController extends Controller
{
    public function index(Request $request): Response|JsonResponse
    {
        $items = fn () => Item::whereHas('liquidation')
            ->orderByRaw('CASE WHEN inventory > 0 THEN 0 ELSE 1 END')
            ->orderByDesc(LiquidationItem::select('created_at')->whereColumn('item_id', 'items.id'))
            ->paginate(24);

        if ($request->wantsJson()) {
            return response()->json(['items' => $items()]);
        }

        return Inertia::render('Liquidation/Index', [
            'items' => Inertia::defer($items),
        ]);
    }
}
