<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Item;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Collection;

class HmsController extends Controller
{
    private const BRAND_ATTRIBUTE = 'ბრენდი';

    private const BRANDS = ['HMS', 'HMSFIX'];

    /**
     * All HMS / HMSFIX brand items for the sonniva-hms site, grouped by their
     * second-level category (the item's own category when it sits at level 2,
     * its parent when the item sits at a level-3 leaf).
     */
    public function items(): JsonResponse
    {
        $items = Item::query()
            ->whereHas('attributes', function (Builder $query): void {
                $query->where('name', self::BRAND_ATTRIBUTE)
                    ->whereIn('value', self::BRANDS);
            })
            ->with('attributes:id,bc_attribute_id,name,value,item_id')
            ->orderByRaw('sales_rank IS NULL')
            ->orderBy('sales_rank')
            ->orderByRaw('CASE WHEN inventory > 0 THEN 0 ELSE 1 END')
            ->orderBy('id')
            ->get();

        $level2ByCode = $this->resolveLevel2Categories($items->pluck('category_code'));

        $groups = $items
            ->groupBy(fn (Item $item) => optional($level2ByCode->get($item->category_code))->code ?? 'unknown')
            ->map(function (Collection $group) use ($level2ByCode): array {
                $category = $level2ByCode->get($group->first()->category_code);

                return [
                    'category_code' => $category?->code,
                    'category_name' => $category?->name,
                    'items_count' => $group->count(),
                    'items' => $group->values(),
                ];
            })
            ->sortBy('category_code')
            ->values();

        return response()->json([
            'brands' => self::BRANDS,
            'items_count' => $items->count(),
            'groups' => $groups,
        ]);
    }

    /**
     * @param  Collection<int, ?string>  $codes
     * @return Collection<string, ?Category>
     */
    private function resolveLevel2Categories(Collection $codes): Collection
    {
        $categories = Category::query()
            ->with('parent')
            ->whereIn('code', $codes->filter()->unique()->values())
            ->get()
            ->keyBy('code');

        return $codes->filter()->unique()->mapWithKeys(function (string $code) use ($categories): array {
            $category = $categories->get($code);
            $level2 = $category && $category->level === 3 ? $category->parent : $category;

            return [$code => $level2];
        });
    }
}
