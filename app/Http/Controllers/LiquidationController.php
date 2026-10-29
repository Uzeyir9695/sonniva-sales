<?php

namespace App\Http\Controllers;

use App\Models\Item;
use App\Models\LiquidationItem;
use Inertia\Inertia;
use Inertia\Response;

class LiquidationController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Liquidation/Index', [
            'items' => Inertia::defer(fn () => Item::whereHas('liquidation')
                ->orderByRaw('CASE WHEN inventory > 0 THEN 0 ELSE 1 END')
                ->orderByDesc(LiquidationItem::select('created_at')->whereColumn('item_id', 'items.id'))
                ->paginate(24)),
        ]);
    }
}
