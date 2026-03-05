<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Services\BusinessCentralService;
use Illuminate\Database\Seeder;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;
use Spatie\Image\Image;

class CategorySeeder extends Seeder
{
    public function __construct(protected BusinessCentralService $bc) {}

    public function run(): void
    {
        $token = $this->bc->getAccessToken();

        $this->command->info('Fetching categories from Business Central...');
        $items = $this->fetchAllCategories($token);
        $this->command->info("Fetched {$items->count()} categories.");

        Cache::forget('nav_categories');

        $this->insertLevel($items, null, 1);

        $this->command->info('Categories seeded successfully.');
    }

    private function fetchAllCategories(string $token): Collection
    {
        $all = collect();
        $url = config('bc.api_base_url') . '904668f4-6aa7-44ce-8285-5c27b33faeeb/Production/ODataV4/Company(\'SONNIVA\')/ItemCategories';

        do {
            $response = Http::withToken($token)->get($url);

            if ($response->failed()) {
                throw new \RuntimeException('BC API error: ' . $response->body());
            }

            $data = $response->json();
            $all  = $all->merge(
                collect($data['value'] ?? [])->map(fn($item) => $this->normalize($item))
            );
            $url  = $data['@odata.nextLink'] ?? null;

        } while ($url);

        return $all;
    }

    private function normalize(array $item): array
    {
        return [
            'code'           => trim($item['Code'] ?? $item['code'] ?? ''),
            'description'    => $item['Description'] ?? $item['description'] ?? '',
            'parentCategory' => trim($item['Parent_Category'] ?? $item['parentCategory'] ?? ''),
            'imageBase64'    => $item['imageBase64'] ?? null,
        ];
    }

    private function insertLevel(Collection $all, ?string $parentCode, int $level): void
    {
        $items = $all->filter(
            fn($item) => $parentCode === null
                ? $item['parentCategory'] === ''
                : $item['parentCategory'] === $parentCode
        );

        foreach ($items as $index => $item) {
            $category = Category::updateOrCreate(
                ['code' => $item['code']],
                [
                    'name'       => $item['description'] ?: null,
                    'slug'       => $this->makeSlug($item['description'] ?: null),
                    'parent_id'  => $parentCode,
                    'level'      => $level,
                    'sort_order' => $index,
                ]
            );

            if (!empty($item['imageBase64'])) {
                $fileName = $this->storeImage($item['imageBase64']);
                if ($fileName) {
                    $category->update(['image' => $fileName]);
                }
            }

            if ($level < 3) {
                $this->insertLevel($all, $item['code'], $level + 1);
            }
        }
    }

    private function makeSlug(string $text): string
    {
        $text = trim($text);
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
        $hash      = md5($imageData);
        $fileName  = $hash . '.jpg';
        $path      = "categories/{$fileName}";

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
