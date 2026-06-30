<?php

namespace App\Console\Commands;

use App\Models\Item;
use App\Services\BusinessCentralService;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;

class SyncItemWeightsCommand extends Command
{
    protected $signature = 'items:sync-weights';

    protected $description = 'Sync item weights from Business Central ItemUnitOfMeasureAPI';

    public function __construct(protected BusinessCentralService $bc)
    {
        parent::__construct();
    }

    public function handle(): int
    {
        $startedAt = now();
        $this->info('Starting item weights sync...');

        $token = $this->bc->getAccessToken();
        $tokenFetchedAt = now();

        $items = DB::table('items')
            ->select('no', 'unit_price', 'prices')
            ->get();

        $this->info("Processing {$items->count()} items in parallel chunks...");

        $baseUrl = config('bc.api_base_url')
            ."904668f4-6aa7-44ce-8285-5c27b33faeeb/Production/ODataV4/Company('SONNIVA')/ItemUnitOfMeasureAPI";

        $updatedCount = 0;
        $zeroWeightCount = 0;

        $bar = $this->output->createProgressBar($items->count());
        $bar->start();

        foreach ($items->chunk(50) as $chunk) {
            if (now()->diffInMinutes($tokenFetchedAt) >= 55) {
                $token = $this->bc->getAccessToken(forceRefresh: true);
                $tokenFetchedAt = now();
            }

            $responses = Http::pool(function ($pool) use ($chunk, $token, $baseUrl) {
                foreach ($chunk as $item) {
                    $pool->withToken($token)
                        ->timeout(60)
                        ->get($baseUrl, [
                            '$filter' => "Item_No eq '{$item->no}'",
                            '$select' => 'Qty_per_Unit_of_Measure,Weight',
                        ]);
                }
            });

            foreach ($responses as $index => $response) {
                $bar->advance();

                if ($response instanceof \Throwable || $response->failed()) {
                    continue;
                }

                $item = $chunk->values()[$index];
                $entries = $response->json()['value'] ?? [];

                if (empty($entries)) {
                    continue;
                }

                $weights = $this->buildWeights($item, $entries);

                if (collect($weights)->every(fn ($w) => ($w['weight'] ?? 0) == 0)) {
                    $zeroWeightCount++;
                }

                DB::table('items')
                    ->where('no', $item->no)
                    ->update(['weights' => json_encode($weights)]);

                $updatedCount++;
            }
        }

        $bar->finish();
        $this->newLine();

        $totalSeconds = $startedAt->diffInSeconds(now());
        $this->info("Done in {$totalSeconds}s. Updated: {$updatedCount} items.");

        if ($zeroWeightCount > 0) {
            $this->newLine();
            $this->warn("{$zeroWeightCount} item(s) have zero weight in BC.");
        }

        return self::SUCCESS;
    }

    private function buildWeights(object $item, array $entries): array
    {
        $perUnitWeight = $this->resolvePerUnitWeight($entries);

        // Per-item sold: weight is the derived per-unit weight
        if ((float) $item->unit_price > 0) {
            return [['weight' => round($perUnitWeight, 6)]];
        }

        // Package item: multiply per-unit weight by each Retail UOM's quantity
        $prices = json_decode($item->prices ?? '[]', true);

        $weights = [];

        foreach ($prices as $entry) {
            if (($entry['priceGroup'] ?? '') !== 'Retail') {
                continue;
            }

            $uom = $entry['UOM'] ?? '';
            $quantity = $this->parseUomQuantity($uom);

            $weights[] = [
                'uom' => $uom,
                'quantity' => $quantity,
                'weight' => round($perUnitWeight * $quantity, 6),
            ];
        }

        return $weights;
    }

    private function resolvePerUnitWeight(array $entries): float
    {
        $collection = collect($entries);

        // Prefer qty=1 entry if it has a non-zero weight
        $base = $collection->firstWhere('Qty_per_Unit_of_Measure', 1);
        if ($base && (float) ($base['Weight'] ?? 0) > 0) {
            return (float) $base['Weight'];
        }

        // Fall back to any non-zero entry and derive per-unit weight
        $nonZero = $collection->first(fn ($e) => (float) ($e['Weight'] ?? 0) > 0);
        if (! $nonZero) {
            return 0.0;
        }

        $qty = max((int) ($nonZero['Qty_per_Unit_of_Measure'] ?? 1), 1);

        return (float) $nonZero['Weight'] / $qty;
    }

    private function parseUomQuantity(string $uom): int
    {
        if ($uom === 'ცალი/UNIT') {
            return 1;
        }

        if ($uom === 'წყვილი') {
            return 2;
        }

        // Strip Georgian ც (U+10EA) from either end, keep the number
        $numeric = preg_replace('/^ც|ც$/u', '', $uom);

        return (int) $numeric ?: 1;
    }
}
