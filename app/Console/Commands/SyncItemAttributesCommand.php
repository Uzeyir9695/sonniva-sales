<?php

namespace App\Console\Commands;

use App\Models\Attribute;
use App\Models\Item;
use App\Services\BusinessCentralService;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;

class SyncItemAttributesCommand extends Command
{
    protected $signature = 'items:sync-attributes';

    protected $description = 'Sync item attribute values from Business Central';

    public function __construct(protected BusinessCentralService $bc)
    {
        parent::__construct();
    }

    public function handle(): int
    {
        $startedAt = now();
        $this->info('Fetching item attribute values from Business Central...');

        $token = $this->bc->getAccessToken();
        $tokenFetchedAt = now();

        $url = config('bc.api_base_url')
            .'Production/api/smart/sonniva/v1.0/companies(dc29e11b-78aa-ee11-be38-000d3ab8f033)/items'
            .'?$select=no&$expand=itemAttributeValues($select=itemAttributeId,attributeName,attributeValue)';

        $items = collect();

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
                $this->error('BC API error: '.$response->body());

                return self::FAILURE;
            }

            $data = $response->json();
            $items = $items->merge($data['value'] ?? []);
            $url = $data['@odata.nextLink'] ?? null;

        } while ($url);

        $this->info("Fetched {$items->count()} items. Updating attributes...");

        $itemIdsByNo = Item::pluck('id', 'no');

        $rows = [];
        $itemIdsToClear = [];

        foreach ($items as $item) {
            $itemId = $itemIdsByNo[$item['no']] ?? null;

            if (! $itemId) {
                continue;
            }

            $itemIdsToClear[] = $itemId;

            foreach ($item['itemAttributeValues'] ?? [] as $attr) {
                $rows[] = [
                    'id' => (string) Str::uuid(),
                    'item_id' => $itemId,
                    'bc_attribute_id' => $attr['itemAttributeId'],
                    'name' => $attr['attributeName'],
                    'value' => $attr['attributeValue'],
                ];
            }
        }

        DB::transaction(function () use ($itemIdsToClear, $rows): void {
            Attribute::whereIn('item_id', $itemIdsToClear)->delete();

            foreach (array_chunk($rows, 500) as $chunk) {
                DB::table('attributes')->insert($chunk);
            }
        });

        $seconds = $startedAt->diffInSeconds(now());
        $this->info('Done. Updated attributes for '.count($itemIdsToClear)." items in {$seconds}s.");

        return self::SUCCESS;
    }
}
