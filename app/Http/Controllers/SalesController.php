<?php

namespace App\Http\Controllers;

use App\Models\Item;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SalesController extends Controller
{
    public function index(Request $request): Response
    {
        $items = Item::where('discount', '>', 0)
            ->orderByDesc('discount')
            ->orderByRaw('CASE WHEN inventory > 0 THEN 0 ELSE 1 END')
            ->orderBy('id')
            ->paginate(24);

        return Inertia::render('Sales/Index', [
            'items' => Inertia::defer(fn () => $items),
        ]);
    }
}
