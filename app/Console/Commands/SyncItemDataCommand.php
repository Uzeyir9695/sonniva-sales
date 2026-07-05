<?php

namespace App\Console\Commands;

use App\Services\BusinessCentralService;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;

class SyncItemDataCommand extends Command
{
    protected $signature = 'items:sync-data';

    protected $description = 'Sync item name, unit_price and wholesale prices from Business Central';

    public function __construct(protected BusinessCentralService $bc)
    {
        parent::__construct();
    }

    public function handle(): int
    {
        $startedAt = now();
        $this->info('Starting item data sync...');

        $token = $this->bc->getAccessToken();
        $tokenFetchedAt = now();

        // ── Phase 1: fetch name + prices from items endpoint (paginated) ──────────

        $url = config('bc.api_base_url')
            .'Production/api/smart/sonniva/v1.0/companies(dc29e11b-78aa-ee11-be38-000d3ab8f033)/items'
            .'?$select=no,description,unitPrice';

        $items = collect();

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
                $this->error('BC API error: '.$response->body());

                return self::FAILURE;
            }

            $data = $response->json();
            $items = $items->merge($data['value'] ?? []);
            $url = $data['@odata.nextLink'] ?? null;

        } while ($url);

        $this->info("Fetched {$items->count()} items. Updating name + prices...");

        foreach ($items as $item) {
            DB::table('items')
                ->where('no', $item['no'])
                ->update([
                    'name' => $item['description'] ?? null,
                    'unit_price' => $item['unitPrice'] ?? 0,
                ]);
        }

        $phase1Seconds = $startedAt->diffInSeconds(now());
        $this->info("Phase 1 done in {$phase1Seconds}s.");

        // ── Phase 2: fetch wholesale prices in bulk via itemsDetailed + $expand ────

        $this->info('Fetching wholesale prices in bulk...');

        $phase2Start = now();
        $detailedUrl = config('bc.api_base_url')
            .'Production/api/smart/sonniva/v1.0/companies(dc29e11b-78aa-ee11-be38-000d3ab8f033)/itemsDetailed'
            .'?$select=no&$expand=itemUnitPrices';

        $updatedCount = 0;

        do {
            if (now()->diffInMinutes($tokenFetchedAt) >= 55) {
                $token = $this->bc->getAccessToken(forceRefresh: true);
                $tokenFetchedAt = now();
            }

            $response = Http::withToken($token)
                ->timeout(120)
                ->retry(3, 2000)
                ->get($detailedUrl);

            if ($response->failed()) {
                $this->error('BC API error: '.$response->body());

                return self::FAILURE;
            }

            $data = $response->json();
            $details = collect($data['value'] ?? []);
            $detailedUrl = $data['@odata.nextLink'] ?? null;

            $batch = [];

            foreach ($details as $detail) {
                if (empty($detail['no'])) {
                    continue;
                }

                $structuredPrices = collect($detail['itemUnitPrices'] ?? [])
                    ->map(fn ($entry) => [
                        'price' => $entry['price'],
                        'priceGroup' => $entry['priceGroup'],
                        'custMinQuantity' => $entry['custMinQuantity'],
                    ])->values()->all();

                $batch[] = [
                    'no' => $detail['no'],
                    'prices' => json_encode($structuredPrices),
                ];
            }

            foreach (array_chunk($batch, 500) as $chunk) {
                DB::transaction(function () use ($chunk): void {
                    foreach ($chunk as $row) {
                        DB::table('items')
                            ->where('no', $row['no'])
                            ->update(['prices' => $row['prices']]);
                    }
                });
            }

            $updatedCount += count($batch);

        } while ($detailedUrl);

        $phase2Seconds = $phase2Start->diffInSeconds(now());
        $totalSeconds = $startedAt->diffInSeconds(now());

        $this->info("Phase 2 done in {$phase2Seconds}s. Wholesale prices updated: {$updatedCount}.");
        $this->info("Total: {$totalSeconds}s.");

        $this->info('Running PriceListSeeder...');
        $this->call('db:seed', ['--class' => 'PriceListSeeder']);

        return self::SUCCESS;
    }
}
