<?php

namespace Database\Seeders;

use App\Models\Item;
use App\Services\BusinessCentralService;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Http;

class ItemRenewSeeder extends Seeder
{
    public function __construct(protected BusinessCentralService $bc) {}

    public function run(): void
    {
        $startedAt = now();

        $token = $this->bc->getAccessToken();
        $tokenFetchedAt = now();

        $this->command->info('Fetching item numbers from Business Central...');

        $bcNumbers = $this->fetchAllItemNumbers($token, $tokenFetchedAt);

        $this->command->info("Found {$bcNumbers->count()} items in BC.");

        $localNumbers = Item::pluck('no');

        $toSync = $localNumbers->intersect($bcNumbers);
        $toRemove = $localNumbers->diff($bcNumbers);

        foreach ($toSync->chunk(500) as $chunk) {
            Item::whereIn('no', $chunk)->update(['synced_at' => now()]);
        }

        $this->command->info("Marked {$toSync->count()} items as synced.");

        if ($toRemove->isEmpty()) {
            $this->command->info('No items to remove.');
        } else {
            $this->command->info("Removing {$toRemove->count()} items no longer in BC: {$toRemove->implode(', ')}");

            foreach ($toRemove->chunk(500) as $chunk) {
                Item::whereIn('no', $chunk)->delete();
            }
        }

        $elapsed = $startedAt->diffInSeconds(now());
        $this->command->info("Renew finished in {$elapsed}s (".gmdate('H:i:s', $elapsed).').');
    }

    private function fetchAllItemNumbers(string &$token, Carbon &$tokenFetchedAt): Collection
    {
        $all = collect();
        $url = config('bc.api_base_url')
            .'Production/api/smart/sonniva/v1.0/companies(dc29e11b-78aa-ee11-be38-000d3ab8f033)/items'
            .'?$select=no';

        do {
            if (now()->diffInMinutes($tokenFetchedAt) >= 55) {
                $token = $this->bc->getAccessToken(forceRefresh: true);
                $tokenFetchedAt = now();
            }

            $response = Http::withToken($token)
                ->timeout(60)
                ->retry(3, 2000)
                ->get($url);

            if ($response->failed()) {
                throw new \RuntimeException('BC API error: '.$response->body());
            }

            $data = $response->json();
            $all = $all->merge(collect($data['value'] ?? [])->pluck('no'));
            $url = $data['@odata.nextLink'] ?? null;

        } while ($url);

        return $all;
    }
}
