<?php

namespace App\Http\Controllers;

use App\Models\Attribute;
use App\Models\Item;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;
use Inertia\Response;

class BrandController extends Controller
{
    private const BRAND_ATTRIBUTE_NAME = 'ბრენდი';

    public function index(Request $request): Response|JsonResponse
    {
        $brands = Cache::remember('brands_list', now()->addHour(), fn () => Attribute::query()
            ->where('name', self::BRAND_ATTRIBUTE_NAME)
            ->whereHas('item')
            ->select('value as name')
            ->selectRaw('COUNT(*) as items_count')
            ->groupBy('value')
            ->orderBy('value')
            ->get()
            ->toArray());

        if ($request->wantsJson()) {
            return response()->json(['brands' => $brands]);
        }

        return Inertia::render('Brands/Index', [
            'brands' => $brands,
        ]);
    }

    public function show(string $brand): Response
    {
        $hasBrand = fn ($q) => $q->where('name', self::BRAND_ATTRIBUTE_NAME)->where('value', $brand);

        abort_unless(Item::whereHas('attributes', $hasBrand)->exists(), 404);

        return Inertia::render('Brands/Show', [
            'brand' => $brand,
            'items' => Inertia::defer(fn () => Item::whereHas('attributes', $hasBrand)
                ->orderByRaw('CASE WHEN inventory > 0 THEN 0 ELSE 1 END')
                ->orderBy('id')
                ->paginate(24)),
        ]);
    }
}
