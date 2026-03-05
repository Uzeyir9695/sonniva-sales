<?php

namespace App\Http\Controllers;

use App\Models\Attribute;
use App\Models\Category;
use App\Models\Item;
use App\Services\BusinessCentralService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
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
        $allAttributes = Attribute::whereHas('item', fn($q) => $q->whereIn('category_code', $codes))
            ->select('bc_attribute_id', 'name', 'value')
            ->distinct()
            ->get();

        $attributes = $allAttributes
            ->groupBy('bc_attribute_id')
            ->map(fn($group) => [
                'id'     => $group->first()->bc_attribute_id,
                'name'   => $group->first()->name,
                'values' => $group->pluck('value')->filter()->unique()->values(),
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
            ->when($request->stock === 'in', fn($q) => $q->where('inventory', '>', 0))
            ->when($request->stock === 'out', fn($q) => $q->where('inventory', '<=', 0))
            ->with('attributes:id,bc_attribute_id,name,value,item_id')
            ->paginate(24);

        // Build related categories for sidebar navigation
        $relatedCategories = match($category->level) {
            1 => Category::where('parent_id', $category->code)
                ->orderBy('sort_order')
                ->get(['name', 'slug', 'code']),

            2 => $category->children->isEmpty()
                // no children → show siblings
                ? Category::where('parent_id', $category->parent_id)
                    ->orderBy('sort_order')
                    ->get(['name', 'slug', 'code'])
                // has children → show itself + children
                : Category::where('parent_id', $category->code)
                    ->orderBy('sort_order')
                    ->get(['name', 'slug', 'code']),

            3 => Category::where('parent_id', $category->parent_id)
                ->orderBy('sort_order')
                ->get(['name', 'slug', 'code']),

            default => collect(),
        };

        $relatedCategoriesParent = $category->level === 3
            ? ['name' => $category->parent->name, 'slug' => $category->parent->slug]
            : ($category->level === 2 && $category->children->isNotEmpty()
                ? ['name' => $category->name, 'slug' => $category->slug]
                : null);

        $breadcrumbs = $this->buildCategoryBreadcrumbs($category);

        return Inertia::render('items/Index', [
            'attributes' => $attributes,
            'items' => Inertia::defer(fn() => $items),
            'breadcrumbs' => $breadcrumbs,
            'relatedCategories' => $relatedCategories,
            'relatedCategoriesParent' => $relatedCategoriesParent,
            'currentCategorySlug' => $category->slug,
        ]);
    }

    public function show(Item $item, BusinessCentralService $bcService)
    {
        $similarItems = Item::where('category_code', $item->category_code)
            ->where('id', '!=', $item->id)
            ->limit(10)
            ->get(['id', 'name', 'slug', 'unit_price', 'images', 'inventory']);

        $inventory = $bcService->calcInventory($item->no);

        $breadcrumbs = $this->buildBreadcrumbs($item);

        return Inertia::render('items/Show', [
            'item' => $item,
            'attributes' => $item->attributes,
            'similarItems' => $similarItems,
            'breadcrumbs' => $breadcrumbs,
            'inventory' => $inventory,
        ]);
    }

    private function buildBreadcrumbs(Item $item): array
    {
        $category = Category::where('code', $item->category_code)->first();

        $crumbs = $category
            ? $this->buildCategoryBreadcrumbs($category)
            : [];

        $crumbs[] = [
            'label' => $item->name,
            'slug' => null,
        ];

        return $crumbs;
    }

    private function buildCategoryBreadcrumbs(Category $category): array
    {
        $chain = [];
        $current = $category;

        while ($current) {
            array_unshift($chain, $current);
            $current = $current->parent;
        }

        return collect($chain)->map(fn($cat) => [
            'label' => $cat->name,
            'slug' => $cat->slug,
        ])->toArray();
    }

    public function search(Request $request)
    {
        $q = $request->input('q', '');

        if (strlen($q) < 2) {
            return response()->json([]);
        }

        $items = Item::where('name', 'like', "%{$q}%")
            ->with('attributes:id,bc_attribute_id,name,value,item_id')
            ->limit(100)
            ->get(['id', 'no', 'name', 'slug', 'unit_price', 'images', 'inventory']);

        return response()->json($items);
    }
}
