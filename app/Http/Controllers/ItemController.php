<?php

namespace App\Http\Controllers;

use App\Models\Attribute;
use App\Models\Category;
use App\Models\Item;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ItemController extends Controller
{
    //
    public function index(Request $request)
    {
        $activeSlug = last(array_filter($request->segments()));

        $category = Category::where('slug', $activeSlug)->firstOrFail();

        $code = $category->code;

        // Collect all codes to filter items by
        $codes = collect([$code]); // in order to include the current category code as well, pass $code to the collection as array

        if ($category->level === 1) {
            // root: get all sub and leaf codes
            $subs = Category::where('parent_id', $code)->pluck('code');
            $leaves = Category::whereIn('parent_id', $subs)->pluck('code');
            $codes = $codes->merge($subs)->merge($leaves);

        } elseif ($category->level === 2) {
            // sub: get all leaf codes
            $leaves = Category::where('parent_id', $code)->pluck('code');
            $codes = $codes->merge($leaves);
        }

        // Get distinct attributes for filter sidebar
        $attributes = Attribute::whereHas('item', fn($q) => $q->whereIn('category_code', $codes))
            ->select('bc_attribute_id', 'name')
            ->distinct()
            ->get()
            ->groupBy('bc_attribute_id')
            ->map(fn($group) => [
                'id'     => $group->first()->bc_attribute_id,
                'name'   => $group->first()->name,
                'values' => Attribute::whereHas('item', fn($q) => $q->whereIn('category_code', $codes))
                    ->where('bc_attribute_id', $group->first()->bc_attribute_id)
                    ->distinct()
                    ->pluck('value')
                    ->filter()
                    ->values(),
            ])
            ->values()
            ->filter(fn($attr) => $attr['values']->count() >= 2)
            ->values();

        $filters = json_decode($request->input('filters'), true) ?? [];

        $items = Item::whereIn('category_code', $codes)
            ->when(!empty($filters), function ($query) use ($filters) {
                foreach ($filters as $attributeId => $values) {
                    if (!empty($values)) {
                        $query->whereHas('attributes', function ($q) use ($attributeId, $values) {
                            $q->where('bc_attribute_id', $attributeId)
                                ->whereIn('value', $values);
                        });
                    }
                }
            })
            ->when($request->price_min, fn($q) => $q->where('unit_price', '>=', $request->price_min))
            ->when($request->price_max, fn($q) => $q->where('unit_price', '<=', $request->price_max))
            ->when($request->stock === 'in',  fn($q) => $q->where('inventory', '>', 0))
            ->when($request->stock === 'out', fn($q) => $q->where('inventory', '<=', 0))
            ->paginate(24);

        return Inertia::render('items/Index', [
            'attributes' => $attributes,
            'items' => Inertia::defer(fn () => $items),
        ]);
    }

    public function show(Item $item)
    {
        $similarItems = Item::where('category_code', $item->category_code)
            ->where('id', '!=', $item->id)
            ->limit(10)
            ->get(['id', 'name', 'slug', 'unit_price', 'images', 'inventory']);

        return Inertia::render('items/Show', [
            'item' => $item,
            'attributes' => $item->attributes,
            'similarItems' => $similarItems,
        ]);
    }
}
