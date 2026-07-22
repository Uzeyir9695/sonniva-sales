<?php

namespace App\Console\Commands;

use App\Models\Item;
use App\Services\BusinessCentralService;
use Illuminate\Console\Command;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;

class SyncItemCategoryCommand extends Command
{
    protected $signature = 'items:sync-category';

    protected $description = 'Sync categories and item category_code from Business Central';

    public function __construct(protected BusinessCentralService $bc)
    {
        parent::__construct();
    }

    public function handle(): int
    {
        $startedAt = now();

        $this->info('Syncing categories...');
        // --force is required here: db:seed asks for confirmation in production,
        // and when this command runs inside a queued job there's no TTY to answer
        // it, so it silently no-ops and the categories table never gets updated.
        $this->call('db:seed', ['--class' => 'CategorySeeder', '--force' => true]);

        $this->info('Starting item category sync...');

        $token = $this->bc->getAccessToken();
        $tokenFetchedAt = now();

        $url = config('bc.api_base_url')
            .'Production/api/smart/sonniva/v1.0/companies(dc29e11b-78aa-ee11-be38-000d3ab8f033)/items'
            .'?$select=no,itemCategoryCode';

        $items = collect();

        do {
            if (now()->diffInMinutes($tokenFetchedAt) >= 55) {
                $token = $this->bc->getAccessToken(forceRefresh: true);
                $tokenFetchedAt = now();
            }

            $response = Http::withToken($token)
                ->timeout(120)
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

        $this->info("Fetched {$items->count()} items. Updating category_code...");

        foreach ($items as $item) {
            $categoryCode = isset($item['itemCategoryCode']) ? trim($item['itemCategoryCode']) : null;

            DB::table('items')
                ->where('no', $item['no'])
                ->update(['category_code' => $categoryCode]);
        }

        // $items is the full, current item list straight from Business Central,
        // so it doubles as the source of truth for "which items still exist".
        // Anything in our DB whose `no` isn't in this list was removed on the
        // BC side and should be pruned here too.
        $prunedCount = $this->pruneItemsNotIn($items->pluck('no'));

        $seconds = $startedAt->diffInSeconds(now());
        $this->info("Done. Updated {$items->count()} items, pruned $prunedCount in {$seconds}s.");

        return self::SUCCESS;
    }

    /**
     * Soft-delete local items whose `no` is not in the given list of item
     * numbers that Business Central currently knows about. Soft-deleting
     * (instead of a hard delete) keeps past orders intact, since order_items
     * rows reference items with a cascading foreign key.
     */
    private function pruneItemsNotIn(Collection $bcItemNos): int
    {
        return Item::whereNotIn('no', $bcItemNos)->delete();
    }
}
