<?php

namespace App\Http\Controllers;

use App\Models\Item;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SearchController extends Controller
{
    public function index(Request $request): Response
    {
        $q = trim($request->input('q', ''));
        $priceMin = $request->input('price_min');
        $priceMax = $request->input('price_max');
        $stock = $request->input('stock');

        return Inertia::render('Search/Index', [
            'query' => $q,
            'items' => Inertia::defer(fn () => $this->fetchItems($q, $priceMin, $priceMax, $stock)),
        ]);
    }

    private function fetchItems(string $q, ?string $priceMin, ?string $priceMax, ?string $stock): mixed
    {
        return Item::where(function ($query) use ($q) {
            $query->where('name', 'like', "%{$q}%")
                ->orWhere('no', 'like', "%{$q}%");
        })
            ->when($priceMin !== null && $priceMin !== '', fn ($query) => $query->where('unit_price', '>=', $priceMin))
            ->when($priceMax !== null && $priceMax !== '', fn ($query) => $query->where('unit_price', '<=', $priceMax))
            ->when($stock === 'in', fn ($query) => $query->where('inventory', '>', 0))
            ->when($stock === 'out', fn ($query) => $query->where('inventory', '<', 1))
            ->orderByDesc('inventory')
            ->paginate(24)
            ->withQueryString();
    }
}
