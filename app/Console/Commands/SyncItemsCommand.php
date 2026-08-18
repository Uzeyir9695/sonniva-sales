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
    protected $signature = 'items:sync {no? : Only fetch this specific Business Central item number}';

    protected $description = 'Import new items from Business Central, and refresh category, images, prices and attributes for existing ones';

    public function __construct(protected BusinessCentralService $bc)
    {
        parent::__construct();
    }

    public function handle(): int
    {
        $startedAt = now();

        $token = $this->bc->getAccessToken();
        $tokenFetchedAt = now();

        $no = $this->argument('no');

        if ($no) {
            $this->info("Fetching item {$no} from Business Central...");

            $item = $this->fetchItem($token, $no);

            if (! $item) {
                $this->error("Item {$no} was not found in Business Central.");

                return self::FAILURE;
            }

            $this->processItem($item, $token, $tokenFetchedAt);

            $this->info("Done in {$startedAt->diffInSeconds(now())}s.");

            return self::SUCCESS;
        }

        // Get only leaf categories (level 2)
        $categories = Category::select('code')->whereIn('level', [2, 3])->get();

        $this->info("Found {$categories->count()} leaf categories.");

        foreach ($categories as $category) {
            $this->info("Fetching items for category: {$category->code}");

            $items = $this->fetchItemsForCategory($token, $tokenFetchedAt, $category->code);

            $this->info("  → {$items->count()} items found.");

            foreach ($items as $item) {
                $this->processItem($item, $token, $tokenFetchedAt);
            }
        }

        $elapsed = $startedAt->diffInSeconds(now());
        $this->info("Items synced successfully. Time taken: {$elapsed}s (".gmdate('H:i:s', $elapsed).')');

        return self::SUCCESS;
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

        // Collect and store images
        $images = [];
        foreach (['image1', 'image2', 'image3', 'image4', 'image5'] as $imageKey) {
            $base64 = $detailed[$imageKey] ?? '';
            $fileName = Item::storeImageFromBase64($base64);
            if ($fileName && ! in_array($fileName, $images)) {
                $images[] = $fileName;
            }
        }

        // Keep the existing slug when the name hasn't changed, so re-syncing an
        // already-imported item doesn't rewrite its URL (makeUniqueSlug would
        // otherwise see the item's own current slug as "taken").
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
            ]
        );

        // Replace attributes wholesale rather than appending, so re-syncing an
        // existing item doesn't pile up duplicate rows (there's no unique
        // constraint on item_id + bc_attribute_id to upsert against).
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

    private function fetchItem(string $token, string $no): ?array
    {
        $base = config('bc.api_base_url');
        $url = $base."Production/api/smart/sonniva/v1.0/companies(dc29e11b-78aa-ee11-be38-000d3ab8f033)/items?\$select=no,itemCategoryCode,description,itemReview,inventory,baseUOMDesc,unitPrice,minQtyUnitPrice&\$expand=itemAttributeValues(\$select=itemAttributeId,attributeName,attributeValue)&\$filter=no eq '{$no}'";

        $response = Http::withToken($token)
            ->timeout(180)
            ->retry(3, 2000)
            ->get($url);

        if ($response->failed()) {
            throw new \RuntimeException("BC API error for item {$no}: ".$response->body());
        }

        return $response->json()['value'][0] ?? null;
    }

    private function fetchItemsForCategory(string &$token, Carbon &$tokenFetchedAt, string $categoryCode): Collection
    {
        $all = collect();
        $base = config('bc.api_base_url');
        $url = $base."Production/api/smart/sonniva/v1.0/companies(dc29e11b-78aa-ee11-be38-000d3ab8f033)/items?\$select=no,itemCategoryCode,description,itemReview,inventory,baseUOMDesc,unitPrice,minQtyUnitPrice&\$expand=itemAttributeValues(\$select=itemAttributeId,attributeName,attributeValue)&\$filter=itemCategoryCode eq '{$categoryCode}'";

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
                throw new \RuntimeException("BC API error for {$categoryCode}: ".$response->body());
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

        $taken = Item::where('slug', $base)
            ->when($excludeId, fn ($query) => $query->where('id', '!=', $excludeId))
            ->exists();

        if (! $taken) {
            return $base;
        }

        return $base.'-'.mb_strtolower($no);
    }
}
