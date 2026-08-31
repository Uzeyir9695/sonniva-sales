<?php

namespace App\Http\Controllers;

use App\Models\Attribute;
use App\Models\Category;
use App\Models\Item;
use App\Models\StockNotification;
use App\Models\Translation;
use App\Models\User;
use App\Services\BusinessCentralService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\View;
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
        $allAttributes = Attribute::whereHas('item', fn ($q) => $q->whereIn('category_code', $codes))
            ->select('bc_attribute_id', 'name', 'value')
            ->distinct()
            ->get();

        $attributes = $allAttributes
            ->groupBy('bc_attribute_id')
            ->map(fn ($group) => [
                'id' => $group->first()->bc_attribute_id,
                'name' => Translation::get($group->first()->name),
                'values' => $group->pluck('value')->filter()->unique()->values(),
            ])
            ->values()
            ->filter(fn ($attr) => $attr['values']->count() >= 2)
            ->values();

        $filters = json_decode($request->input('filters'), true) ?? [];

        $items = Item::whereIn('category_code', $codes)
            ->when(! empty($filters), function ($query) use ($filters) {
                foreach ($filters as $attributeId => $values) {
                    if (! empty($values)) {
                        $query->whereHas('attributes', function ($q) use ($attributeId, $values) {
                            $q->where('bc_attribute_id', $attributeId)
                                ->whereIn('value', $values);
                        });
                    }
                }
            })
            ->when($request->price_min, fn ($q) => $q->where('unit_price', '>=', $request->price_min))
            ->when($request->price_max, fn ($q) => $q->where('unit_price', '<=', $request->price_max))
            ->when($request->stock === 'in', fn ($q) => $q->where('inventory', '>', 0))
            ->when($request->stock === 'out', fn ($q) => $q->where('inventory', '<', 1))
            ->with('attributes:id,bc_attribute_id,name,value,item_id')
            ->orderByRaw('sales_rank IS NULL')
            ->orderBy('sales_rank')
            ->orderByRaw('CASE WHEN inventory > 0 THEN 0 ELSE 1 END')
            ->orderBy('id')
            ->paginate(24);

        // Build related categories for sidebar navigation
        $relatedCategories = match ($category->level) {
            1 => Category::where('parent_id', $category->code)
                ->orderBy('sort_order')
                ->get(),

            2 => Category::where('parent_id', $category->code)
                ->orderBy('sort_order')
                ->get(),

            3 => Category::where('parent_id', $category->parent_id)
                ->orderBy('sort_order')
                ->get(),

            default => collect(),
        };

        $relatedCategoriesParent = $category->level === 3
            ? ['name' => $category->parent->name, 'slug' => $category->parent->slug]
            : ($category->level === 2 && $category->children->isNotEmpty()
                ? ['name' => $category->name, 'slug' => $category->slug]
                : null);

        // Image strip: always the level-1 category's children, kept visible while
        // browsing level-1 and level-2 pages, hidden once drilled into level-3.
        $level1Category = match ($category->level) {
            1 => $category,
            2 => $category->parent,
            3 => null,
            default => null,
        };

        $subcategoryStrip = $level1Category
            ? Category::where('parent_id', $level1Category->code)
                ->orderBy('sort_order')
                ->get()
            : collect();

        $breadcrumbs = $this->buildCategoryBreadcrumbs($category);

        if ($request->wantsJson()) {
            return response()->json([
                'attributes' => $attributes,
                'items' => $items,
                'breadcrumbs' => $breadcrumbs,
                'relatedCategories' => $relatedCategories,
                'relatedCategoriesParent' => $relatedCategoriesParent,
                'subcategoryStrip' => $subcategoryStrip,
                'currentCategorySlug' => $category->slug,
                'isOrderOnly' => $this->isOrderOnlyCategory($category),
            ]);
        }

        View::share('breadcrumb_json_ld', $this->buildBreadcrumbJsonLd($breadcrumbs));

        return Inertia::render('Items/Index', [
            'attributes' => $attributes,
            'items' => Inertia::defer(fn () => $items),
            'breadcrumbs' => $breadcrumbs,
            'relatedCategories' => $relatedCategories,
            'relatedCategoriesParent' => $relatedCategoriesParent,
            'subcategoryStrip' => $subcategoryStrip,
            'currentCategorySlug' => $category->slug,
            'isOrderOnly' => $this->isOrderOnlyCategory($category),
        ]);
    }

    public function show(Request $request, Item $item, BusinessCentralService $bcService)
    {
        $similarItems = Item::where('category_code', $item->category_code)
            ->where('id', '!=', $item->id)
            ->orderByRaw('CASE WHEN inventory > 0 THEN 0 ELSE 1 END')
            ->limit(10)
            ->get(['id', 'name', ...Item::LOCALE_NAME_COLUMNS, 'slug', 'unit_price', 'unit_price_override', 'discount', 'fake_price', 'images', 'inventory']);

        $attributes = $item->attributes->map(fn (Attribute $attr) => [
            'id' => $attr->id,
            'item_id' => $attr->item_id,
            'bc_attribute_id' => $attr->bc_attribute_id,
            'name' => Translation::get($attr->name),
            'value' => Translation::get($attr->value),
        ]);

        // 'sanctum' guard resolves both session (web) and Bearer token (mobile).
        $authUser = auth('sanctum')->user();

        $isSubscribedToNotification = $authUser
            ? StockNotification::where('user_id', $authUser->id)
                ->where('item_id', $item->id)
                ->whereNull('notified_at')
                ->exists()
            : false;

        $itemCategory = Category::where('code', $item->category_code)->first();
        $isOrderOnly = $itemCategory ? $this->isOrderOnlyCategory($itemCategory) : false;

        if ($request->wantsJson()) {
            return response()->json([
                'item' => $item,
                'attributes' => $attributes,
                'similarItems' => $similarItems,
                'tierPricing' => $this->visibleTierPricing($item, $authUser),
                'isSubscribedToNotification' => $isSubscribedToNotification,
                'isOrderOnly' => $isOrderOnly,
            ]);
        }

        $inventory = Inertia::defer(fn () => $bcService->calcInventory($item->no));

        $breadcrumbs = $this->buildBreadcrumbs($item);

        View::share('json_ld', $this->buildJsonLd($item));
        View::share('breadcrumb_json_ld', $this->buildBreadcrumbJsonLd($breadcrumbs, $item));

        return Inertia::render('Items/Show', [
            'item' => $item,
            'attributes' => $attributes,
            'similarItems' => $similarItems,
            'breadcrumbs' => $breadcrumbs,
            'inventory' => $inventory,
            'isSubscribedToNotification' => $isSubscribedToNotification,
            'isOrderOnly' => $isOrderOnly,
        ]);
    }

    /**
     * @return array<int, array{priceGroup: string, custMinQuantity: ?float, uom: ?string, price: float, rawPrice: float}>
     */
    private function visibleTierPricing(Item $item, ?User $user): array
    {
        $canViewVip = (bool) $user?->can_view_vip;
        $canViewWholesales = (bool) $user?->can_view_wholesales;

        return collect($item->prices ?? [])
            ->filter(function (array $price) use ($canViewVip, $canViewWholesales) {
                $priceGroup = $price['priceGroup'] ?? 'Retail';

                return $priceGroup === 'VIP' ? $canViewVip : $canViewWholesales;
            })
            ->map(function (array $price) use ($item) {
                $priceGroup = $price['priceGroup'] ?? 'Retail';
                $percent = (float) match ($priceGroup) {
                    'VIP' => $item->vip_discount_percent,
                    'Wholesales' => $item->wholesale_discount_percent,
                    default => $item->discount,
                };
                $rawPrice = (float) ($price['price'] ?? 0);

                return [
                    'priceGroup' => $priceGroup,
                    'custMinQuantity' => isset($price['custMinQuantity']) ? (float) $price['custMinQuantity'] : null,
                    'uom' => $price['UOM'] ?? null,
                    'price' => $percent > 0 ? round($rawPrice * (1 - $percent / 100), 2) : $rawPrice,
                    'rawPrice' => $rawPrice,
                ];
            })
            ->values()
            ->all();
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

        return collect($chain)->map(fn ($cat) => [
            'label' => $cat->name,
            'slug' => $cat->slug,
        ])->toArray();
    }

    private function buildBreadcrumbJsonLd(array $breadcrumbs, ?Item $item = null): array
    {
        $elements = [[
            '@type' => 'ListItem',
            'position' => 1,
            'name' => 'მთავარი',
            'item' => url('/'),
        ]];

        $position = 2;
        $paramNames = ['grandparentSlug', 'parentSlug', 'childSlug'];
        $routeParams = [];

        foreach (array_values(array_filter($breadcrumbs, fn ($c) => ! empty($c['slug']))) as $index => $crumb) {
            $routeParams[$paramNames[min($index, 2)]] = $crumb['slug'];

            $elements[] = [
                '@type' => 'ListItem',
                'position' => $position++,
                'name' => $crumb['label'],
                'item' => route('items.index', $routeParams),
            ];
        }

        $lastCrumb = end($breadcrumbs);
        if ($lastCrumb && empty($lastCrumb['slug'])) {
            $el = [
                '@type' => 'ListItem',
                'position' => $position,
                'name' => $lastCrumb['label'],
            ];
            if ($item) {
                $el['item'] = route('items.show', ['item' => $item->slug]);
            }
            $elements[] = $el;
        }

        return [
            '@context' => 'https://schema.org',
            '@type' => 'BreadcrumbList',
            'itemListElement' => $elements,
        ];
    }

    private function buildJsonLd(Item $item): array
    {
        $images = collect($item->images ?? [])
            ->map(fn (string $filename) => url("/storage/items/{$filename}"))
            ->values()
            ->toArray();

        $jsonLd = [
            '@context' => 'https://schema.org/',
            '@type' => 'Product',
            'name' => $item->name,
            'sku' => $item->no,
            'brand' => [
                '@type' => 'Brand',
                'name' => config('app.name'),
            ],
            'offers' => [
                '@type' => 'Offer',
                'url' => route('items.show', ['item' => $item->slug]),
                'priceCurrency' => 'GEL',
                'price' => number_format((float) $item->unit_price, 2, '.', ''),
                'availability' => $item->inventory > 0
                    ? 'https://schema.org/InStock'
                    : 'https://schema.org/OutOfStock',
                'itemCondition' => 'https://schema.org/NewCondition',
            ],
        ];

        if ($item->description) {
            $jsonLd['description'] = $item->description;
        }

        if (! empty($images)) {
            $jsonLd['image'] = $images;
        }

        return $jsonLd;
    }

    private function isOrderOnlyCategory(Category $category): bool
    {
        $orderOnlyCodes = ['1400', '1500', '1600', '1700'];

        return match ($category->level) {
            1 => in_array($category->code, $orderOnlyCodes),
            2 => in_array($category->parent_id, $orderOnlyCodes),
            3 => in_array(optional($category->parent)->parent_id, $orderOnlyCodes),
            default => false,
        };
    }

    public function search(Request $request)
    {
        $q = $request->input('q', '');

        if (strlen($q) < 2) {
            return response()->json([]);
        }

        // /api/v1/search is outside the `web` group, so SetLocale never runs —
        // the client (web SearchBar) passes its active locale explicitly so the
        // suggestion list shows translated item names.
        $locale = $request->input('locale');
        if ($locale && in_array($locale, config('app.supported_locales', []), true)) {
            App::setLocale($locale);
        }

        $items = Item::search($q)
            ->with('attributes:id,bc_attribute_id,name,value,item_id')
            ->get(['id', 'no', 'name', ...Item::LOCALE_NAME_COLUMNS, 'slug', 'unit_price', 'unit_price_override', 'discount', 'fake_price', 'prices', 'images', 'inventory']);

        return response()->json($items);
    }
}
