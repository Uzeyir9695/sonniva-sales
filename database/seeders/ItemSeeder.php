<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Item;
use App\Models\Attribute;
use App\Services\BusinessCentralService;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;
use Spatie\Image\Image;

class ItemSeeder extends Seeder
{
    public function __construct(protected BusinessCentralService $bc) {}

    public function run(): void
    {
        $token = $this->bc->getAccessToken();

        // Get only leaf categories (level 2)
        $categories = Category::select('code')->whereIn('level', [2, 3])->get();

        $this->command->info("Found {$categories->count()} leaf categories.");


        foreach ($categories as $category) {
            $this->command->info("Fetching items for category: {$category->code}");

            $items = $this->fetchItems($token, $category->code);

            $this->command->info("  → {$items->count()} items found.");

            foreach ($items as $item) {
                $created = Item::create([
                    'no'                 => $item['no'],
                    'category_code'      => $item['itemCategoryCode'],
                    'title'              => $item['description'] ?? null,
                    'description'        => $item['itemReview'] ?? null,
                    'slug'               => $this->makeSlug($item['description']),
                    'inventory'          => $item['inventory'] ?? 0,
                    'base_uom_desc'      => $item['baseUOMDesc'] ?? null,
                    'unit_price'         => $item['unitPrice'] ?? 0,
                    'min_qty_unit_price' => $item['minQtyUnitPrice'] ?? 0,
                    'image'              => $this->storeImage($item['imageBase64']),
                ]);

                $attrs = $item['itemAttributeValues'] ?? [];

                foreach ($attrs as $attr) {
                    Attribute::create([
                        'item_id'         => $created->id,
                        'bc_attribute_id' => $attr['itemAttributeId'],
                        'name'            => $attr['attributeName'],
                        'value'           => $attr['attributeValue'],
                    ]);
                }
            }
        }

        $this->command->info('Items seeded successfully.');
    }

    private function fetchItems(string $token, string $categoryCode): \Illuminate\Support\Collection
    {
        $all  = collect();
        $base = config('bc.api_base_url');
        $url  = $base . "Production/api/smart/sonniva/v1.0/companies(dc29e11b-78aa-ee11-be38-000d3ab8f033)/items?\$expand=itemAttributeValues&\$filter=itemCategoryCode eq '{$categoryCode}'";

        do {
            $response = Http::withToken($token)->timeout(180) ->get($url);

            if ($response->failed()) {
                throw new \RuntimeException("BC API error for {$categoryCode}: " . $response->body());
            }

            $data = $response->json();
            $all  = $all->merge($data['value'] ?? []);
            $url  = $data['@odata.nextLink'] ?? null;

        } while ($url);

        return $all;
    }

    private function makeSlug(string $text): string
    {
        $text = trim($text, " \t\n\r\0\x0B,.*");
        $text = preg_replace('/[-]+/u', ' ', $text);
        $text = preg_replace('/\s+/u', '-', $text);
        return mb_strtolower($text);
    }

    private function storeImage(string $base64): ?string
    {
        if (empty($base64)) {
            return null;
        }

        $imageData = base64_decode($base64);
        $hash = md5($imageData);

        $fileName = $hash . '.jpg';
        $path = "items/$fileName";

        if (!\Storage::disk('public')->exists($path)) {
            \Storage::disk('public')->put($path, $imageData);

            $fullPath = storage_path("app/public/{$path}");

            Image::load($fullPath)
                ->optimize()
                ->save($fullPath);
        }

        return $fileName;
    }
}
