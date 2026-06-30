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
            .'?$select=no,description,unitPrice,minQtyUnitPrice';

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
                    'min_qty_unit_price' => $item['minQtyUnitPrice'] ?? 0,
                ]);
        }

        $phase1Seconds = $startedAt->diffInSeconds(now());
        $this->info("Phase 1 done in {$phase1Seconds}s.");

        // ── Phase 2: fetch wholesale prices per item via Http::pool() ─────────────

        $this->info('Fetching wholesale prices in parallel chunks...');

        $phase2Start = now();
        $detailedBase = config('bc.api_base_url')
            ."Production/api/smart/sonniva/v1.0/companies(dc29e11b-78aa-ee11-be38-000d3ab8f033)/itemsDetailed('%s')?\$select=no&\$expand=itemUnitPrices";

        $updatedCount = 0;

        foreach ($items->chunk(50) as $chunkIndex => $chunk) {
            if (now()->diffInMinutes($tokenFetchedAt) >= 55) {
                $token = $this->bc->getAccessToken(forceRefresh: true);
                $tokenFetchedAt = now();
            }

            $responses = Http::pool(function ($pool) use ($chunk, $token, $detailedBase) {
                foreach ($chunk as $item) {
                    $pool->withToken($token)
                        ->timeout(60)
                        ->get(sprintf($detailedBase, $item['no']));
                }
            });

            $batch = [];

            foreach ($responses as $response) {
                if ($response instanceof \Throwable || $response->failed()) {
                    continue;
                }

                $detail = $response->json();

                if (empty($detail['no'])) {
                    continue;
                }

                $structuredPrices = collect($detail['itemUnitPrices'] ?? [])
                    ->map(fn ($entry) => [
                        'price'           => $entry['price'],
                        'priceGroup'      => $entry['priceGroup'],
                        'custMinQuantity' => $entry['custMinQuantity'],
                    ])->values()->all();

                $batch[] = [
                    'no'     => $detail['no'],
                    'prices' => json_encode($structuredPrices),
                ];
            }

            if (! empty($batch)) {
                DB::transaction(function () use ($batch): void {
                    foreach ($batch as $row) {
                        DB::table('items')
                            ->where('no', $row['no'])
                            ->update(['prices' => $row['prices']]);
                    }
                });
                $updatedCount += count($batch);
            }

            unset($responses);

            if ($chunkIndex % 50 === 0) {
                gc_collect_cycles();
            }
        }

        $phase2Seconds = $phase2Start->diffInSeconds(now());
        $totalSeconds = $startedAt->diffInSeconds(now());

        $this->info("Phase 2 done in {$phase2Seconds}s. Wholesale prices updated: {$updatedCount}.");
        $this->info("Total: {$totalSeconds}s.");

        $this->info('Running PriceListSeeder...');
        $this->call('db:seed', ['--class' => 'PriceListSeeder']);

        return self::SUCCESS;
    }
}
