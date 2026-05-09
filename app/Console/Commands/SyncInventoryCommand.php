<?php

namespace App\Console\Commands;

use App\Services\BusinessCentralService;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;

class SyncInventoryCommand extends Command
{
    protected $signature = 'inventory:sync';

    protected $description = 'Sync item inventory from Business Central';

    public function __construct(protected BusinessCentralService $bc) {
        parent::__construct();
    }

    public function handle(): int
    {
        $startedAt = now();
        $this->info('Starting inventory sync...');

        $token = $this->bc->getAccessToken();
        $tokenFetchedAt = now();

        $url = config('bc.api_base_url')
            . "Production/api/smart/sonniva/v1.0/companies(dc29e11b-78aa-ee11-be38-000d3ab8f033)/items"
            . "?\$select=no,inventory";

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
                $this->error('BC API error: ' . $response->body());
                return self::FAILURE;
            }

            $data = $response->json();

            $items = $items->merge($data['value'] ?? []);

            $url = $data['@odata.nextLink'] ?? null;

        } while ($url);

        foreach ($items as $item) {
            DB::table('items')->where('no', $item['no'])->update(['inventory' => (int) $item['inventory']]);
        }

        $seconds = $startedAt->diffInSeconds(now());
        $this->info("Done. Updated {$items->count()} items in {$seconds}s.");

        return self::SUCCESS;
    }
}
