<?php

namespace App\Console\Commands;

use App\Models\Attribute;
use App\Models\Category;
use App\Models\Item;
use App\Services\BusinessCentralService;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Http;

class SyncItemsCommand extends Command
{
    private const array LEAF_LEVELS = [2, 3];

    private const string ITEMS_URL = 'Production/api/smart/sonniva/v1.0/companies(dc29e11b-78aa-ee11-be38-000d3ab8f033)/items';

    protected $signature = 'items:sync
        {no? : Only fetch this specific Business Central item number}
        {--all : Refresh every item in the leaf categories instead of importing only the new ones}';

    protected $description = 'Import items missing from the shop, or refresh a single item or the whole catalog from Business Central';

    protected BusinessCentralService $bc;

    public function handle(BusinessCentralService $bc): int
    {
        $this->bc = $bc;

        $startedAt = now();

        $token = $this->bc->getAccessToken();
        $tokenFetchedAt = now();

        $no = $this->argument('no');

        if ($no) {
            $this->info("Fetching item {$no} from Business Central...");

            $item = $this->fetchItems($token, $tokenFetchedAt, [$no])->first();

            if (! $item) {
                $this->error("Item {$no} was not found in Business Central.");

                return self::FAILURE;
            }

            $this->processItem($item, $token, $tokenFetchedAt);

            $this->info("Done in {$startedAt->diffInSeconds(now())}s.");

            return self::SUCCESS;
        }

        $failed = $this->option('all')
            ? $this->refreshAllItems($token, $tokenFetchedAt)
            : $this->importNewItems($token, $tokenFetchedAt);

        $elapsed = $startedAt->diffInSeconds(now());
        $this->info("Items synced successfully. Time taken: {$elapsed}s (".gmdate('H:i:s', $elapsed).')');

        return $failed > 0 ? self::FAILURE : self::SUCCESS;
    }

    private function refreshAllItems(string &$token, Carbon &$tokenFetchedAt): int
    {
        $categories = Category::select('code')->whereIn('level', self::LEAF_LEVELS)->get();

        $this->info("Found {$categories->count()} leaf categories.");

        foreach ($categories as $category) {
            $this->info("Fetching items for category: {$category->code}");

            $items = $this->fetchItemsForCategory($token, $tokenFetchedAt, $category->code);

            $this->info("  → {$items->count()} items found.");

            foreach ($items as $item) {
                $this->processItem($item, $token, $tokenFetchedAt);
            }
        }

        return 0;
    }

    private function importNewItems(string &$token, Carbon &$tokenFetchedAt): int
    {
        $newItemNos = $this->findNewItemNos($token, $tokenFetchedAt);

        $this->info('Found '.count($newItemNos).' new items.');

        $failed = 0;

        foreach (array_chunk($newItemNos, 30) as $chunk) {
            foreach ($this->fetchItems($token, $tokenFetchedAt, $chunk) as $item) {
                try {
                    $this->processItem($item, $token, $tokenFetchedAt);
                } catch (\Exception $e) {
                    report($e);
                    $this->error("  → Failed to import {$item['no']}: {$e->getMessage()}");
                    $failed++;
                }
            }
        }

        return $failed;
    }

    /**
     * Soft-deleted items count as new, so they get restored when they're back in BC.
     *
     * @return array<int, string>
     */
    private function findNewItemNos(string &$token, Carbon &$tokenFetchedAt): array
    {
        $leafCodes = Category::whereIn('level', self::LEAF_LEVELS)->pluck('code')->flip();
        $existingNos = Item::pluck('no')->flip();

        $url = config('bc.api_base_url').self::ITEMS_URL.'?$select=no,itemCategoryCode';

        return $this->fetchAllPages($token, $tokenFetchedAt, $url)
            ->filter(fn (array $item) => ! $existingNos->has($item['no'])
                && $leafCodes->has(trim($item['itemCategoryCode'] ?? '')))
            ->pluck('no')
            ->all();
    }

    /**
     * Restore-if-trashed, then create or refresh a single item's category, images,
     * prices and attributes from its Business Central item detail.
     */
    private function processItem(array $item, string &$token, Carbon &$tokenFetchedAt): void
    {
        if (now()->diffInMinutes($tokenFetchedAt) >= 55) {
            $this->info('Token expiring, refreshing...');
            $token = $this->bc->getAccessToken(forceRefresh: true);
            $tokenFetchedAt = now();
        }

        $existing = Item::withTrashed()->where('no', $item['no'])->first();

        if ($existing && $existing->trashed()) {
            $existing->restore();
            $this->info("  → Restored previously removed item {$item['no']}");
        } elseif ($existing) {
            $this->info("  → Refreshing existing item {$item['no']}");
        }

        $detailUrl = "https://api.businesscentral.dynamics.com/v2.0/Production/api/smart/sonniva/v1.0/companies(dc29e11b-78aa-ee11-be38-000d3ab8f033)/itemsDetailed('{$item['no']}')"
            .'?$select=image1,image2,image3,image4,image5'
            .'&$expand=itemUnitPrices($select=price,custMinQuantity,priceGroup)';

        $response = Http::withToken($token)
            ->timeout(180)
            ->retry(3, 2000)
            ->get($detailUrl);

        $detailed = $response->json();

        $images = [];
        foreach (['image1', 'image2', 'image3', 'image4', 'image5'] as $imageKey) {
            $base64 = $detailed[$imageKey] ?? '';
            $fileName = Item::storeImageFromBase64($base64);
            if ($fileName && ! in_array($fileName, $images)) {
                $images[] = $fileName;
            }
        }

        $slug = ($existing && $existing->name === ($item['description'] ?? null))
            ? $existing->slug
            : $this->makeUniqueSlug($item['description'], $item['no'], $existing?->id);

        $created = Item::updateOrCreate(
            ['no' => $item['no']],
            [
                'category_code' => $item['itemCategoryCode'],
                'name' => $item['description'] ?? null,
                'description' => $item['itemReview'] ?? null,
                'slug' => $slug,
                'inventory' => $item['inventory'] ?? 0,
                'base_uom_desc' => $item['baseUOMDesc'] ?? null,
                'unit_price' => $item['unitPrice'] ?? 0,
                'min_qty_unit_price' => $item['minQtyUnitPrice'] ?? 0,
                'prices' => $detailed['itemUnitPrices'] ?? [],
                'images' => $images,
                ...$this->localeColumns('name', $item['itemDescriptions'] ?? []),
                ...$this->localeColumns('description', $item['itemReviews'] ?? []),
            ]
        );

        // No unique constraint on item_id + bc_attribute_id to upsert against.
        Attribute::where('item_id', $created->id)->delete();

        $attrs = $item['itemAttributeValues'] ?? [];

        foreach ($attrs as $attr) {
            Attribute::create([
                'item_id' => $created->id,
                'bc_attribute_id' => $attr['itemAttributeId'],
                'name' => $attr['attributeName'],
                'value' => $attr['attributeValue'],
            ]);
        }
    }

    /**
     * Map a Business Central translations collection (itemDescriptions for the
     * name, itemReviews for the description) onto our `<column>_<locale>`
     * columns, keyed by BC's uppercase language code. Missing or empty
     * translations are skipped so a partial BC payload never wipes a column.
     *
     * @param  array<int, array{languageCode?: string, translation?: string}>  $translations
     * @return array<string, string>
     */
    private function localeColumns(string $column, array $translations): array
    {
        $locales = ['ENG' => 'en', 'RUS' => 'ru', 'TUR' => 'tr'];
        $columns = [];

        foreach ($translations as $translation) {
            $locale = $locales[$translation['languageCode'] ?? ''] ?? null;
            $value = trim((string) ($translation['translation'] ?? ''));

            if ($locale && $value !== '') {
                $columns["{$column}_{$locale}"] = $value;
            }
        }

        return $columns;
    }

    /**
     * @param  array<int, string>  $nos
     */
    private function fetchItems(string &$token, Carbon &$tokenFetchedAt, array $nos): Collection
    {
        $url = config('bc.api_base_url').self::ITEMS_URL.'?'.http_build_query([
            '$select' => 'no,itemCategoryCode,description,itemReview,inventory,baseUOMDesc,unitPrice,minQtyUnitPrice',
            '$expand' => 'itemAttributeValues($select=itemAttributeId,attributeName,attributeValue),itemDescriptions($select=languageCode,translation),itemReviews($select=languageCode,translation)',
            '$filter' => collect($nos)->map(fn (string $no) => "no eq '{$no}'")->implode(' or '),
        ], encoding_type: PHP_QUERY_RFC3986);

        return $this->fetchAllPages($token, $tokenFetchedAt, $url);
    }

    private function fetchItemsForCategory(string &$token, Carbon &$tokenFetchedAt, string $categoryCode): Collection
    {
        $url = config('bc.api_base_url').self::ITEMS_URL."?\$select=no,itemCategoryCode,description,itemReview,inventory,baseUOMDesc,unitPrice,minQtyUnitPrice&\$expand=itemAttributeValues(\$select=itemAttributeId,attributeName,attributeValue)&\$filter=itemCategoryCode eq '{$categoryCode}'";

        return $this->fetchAllPages($token, $tokenFetchedAt, $url);
    }

    private function fetchAllPages(string &$token, Carbon &$tokenFetchedAt, string $url): Collection
    {
        $all = collect();

        do {
            if (now()->diffInMinutes($tokenFetchedAt) >= 55) {
                $token = $this->bc->getAccessToken(forceRefresh: true);
                $tokenFetchedAt = now();
            }

            $response = Http::withToken($token)
                ->timeout(180)
                ->retry(3, 2000)
                ->get($url);

            if ($response->failed()) {
                throw new \RuntimeException('BC API error: '.$response->body());
            }

            $data = $response->json();
            $all = $all->merge($data['value'] ?? []);
            $url = $data['@odata.nextLink'] ?? null;

        } while ($url);

        return $all;
    }

    private function makeSlug(string $text): string
    {
        $text = trim($text, " \t\n\r\0\x0B,.*");
        $text = preg_replace('/[\/=%,.]+/u', '-', $text);
        $text = preg_replace('/[-\s]+/u', '-', $text);
        $text = trim($text, '-');

        return mb_strtolower($text);
    }

    private function makeUniqueSlug(string $text, string $no, ?string $excludeId = null): string
    {
        $base = $this->makeSlug($text);

        $taken = Item::withTrashed()->where('slug', $base)
            ->when($excludeId, fn ($query) => $query->where('id', '!=', $excludeId))
            ->exists();

        if (! $taken) {
            return $base;
        }

        return $base.'-'.mb_strtolower($no);
    }
}
