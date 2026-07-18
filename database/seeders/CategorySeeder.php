<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Services\BusinessCentralService;
use Illuminate\Database\Seeder;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;

class CategorySeeder extends Seeder
{
    protected Collection $touchedCodes;

    public function __construct(protected BusinessCentralService $bc) {}

    public function run(): void
    {
        $token = $this->bc->getAccessToken();

        $this->command->info('Fetching categories from Business Central...');
        $items = $this->fetchAllCategories($token);
        $this->command->info("Fetched {$items->count()} categories.");

        if ($items->isEmpty()) {
            throw new \RuntimeException('Business Central returned zero categories; aborting sync to avoid wiping the categories table.');
        }

        Cache::forget('nav_categories');

        $this->touchedCodes = collect();

        DB::transaction(function () use ($items) {
            $this->insertLevel($items, null, 1);

            // Categories BC still lists but that never got placed in the tree
            // (e.g. their parentCategory doesn't resolve, or they're deeper
            // than the 3 levels the app supports) are left alone, not deleted.
            $skipped = $items->pluck('code')->diff($this->touchedCodes);
            if ($skipped->isNotEmpty()) {
                $this->command->warn('Skipped categories (broken parent chain or deeper than 3 levels): '.$skipped->implode(', '));
            }

            // Only remove categories that are genuinely gone from Business Central.
            // A category that simply moved to a different parent is still in
            // $items, so it's excluded here and just gets re-parented above.
            Category::whereNotIn('code', $items->pluck('code'))->delete();
        });

        $this->command->info('Categories seeded successfully.');
    }

    private function fetchAllCategories(string $token): Collection
    {
        $all = collect();
        //        $url = config('bc.api_base_url') . '904668f4-6aa7-44ce-8285-5c27b33faeeb/Production/ODataV4/Company(\'SONNIVA\')/ItemCategories';
        $url = 'https://api.businesscentral.dynamics.com/v2.0/Production/api/smart/sonniva/v1.0/companies(dc29e11b-78aa-ee11-be38-000d3ab8f033)/itemCategories?$select=code,description,parentCategory,imageBase64';

        do {
            $response = Http::withToken($token)->timeout(60)->get($url);

            if ($response->failed()) {
                throw new \RuntimeException('BC API error: '.$response->body());
            }

            $data = $response->json();

            $all = $all->merge(
                collect($data['value'] ?? [])->map(fn ($item) => $this->normalize($item))
            );

            $url = $data['@odata.nextLink'] ?? null;

        } while ($url);

        return $all;
    }

    private function normalize(array $item): array
    {
        return [
            'code' => trim($item['Code'] ?? $item['code'] ?? ''),
            'description' => $item['Description'] ?? $item['description'] ?? '',
            'parentCategory' => trim($item['Parent_Category'] ?? $item['parentCategory'] ?? ''),
            'imageBase64' => $item['imageBase64'] ?? null,
        ];
    }

    private function insertLevel(Collection $all, ?string $parentCode, int $level): void
    {
        $items = $all->filter(
            fn ($item) => $parentCode === null
                ? $item['parentCategory'] === ''
                : $item['parentCategory'] === $parentCode
        );

        foreach ($items as $index => $item) {
            $category = Category::updateOrCreate(
                ['code' => $item['code']],
                [
                    'name' => $item['description'] ?: null,
                    'slug' => $this->makeSlug($item['description'] ?: null),
                    'parent_id' => $parentCode,
                    'level' => $level,
                    'sort_order' => $index,
                ]
            );

            $this->touchedCodes->push($item['code']);

            if (! empty($item['imageBase64'])) {
                $fileName = Category::storeImageFromBase64($item['imageBase64']);
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
        $text = preg_replace('/[\/]+/u', '-', $text);
        $text = preg_replace('/[-]+/u', ' ', $text);
        $text = preg_replace('/\s+/u', '-', $text);

        return mb_strtolower($text);
    }
}
