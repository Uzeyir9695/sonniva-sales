<?php

namespace App\Console\Commands;

use App\Models\Item;
use App\Services\BusinessCentralService;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;

class FetchMissingItemImagesCommand extends Command
{
    protected $signature = 'items:fetch-missing-images';

    protected $description = 'Fetch images from Business Central for in-stock items that have none yet';

    public function __construct(protected BusinessCentralService $bc)
    {
        parent::__construct();
    }

    public function handle(): int
    {
        $startedAt = now();

        $items = Item::where('inventory', '>', 0)
            ->where(function ($query) {
                $query->whereNull('images')->orWhereJsonLength('images', 0);
            })
            ->get(['id', 'no']);

        $this->info("Found {$items->count()} in-stock items with no images.");

        if ($items->isEmpty()) {
            return self::SUCCESS;
        }

        $token = $this->bc->getAccessToken();
        $tokenFetchedAt = now();
        $updated = 0;

        foreach ($items as $item) {
            if (now()->diffInMinutes($tokenFetchedAt) >= 55) {
                $this->info('Token expiring, refreshing...');
                $token = $this->bc->getAccessToken(forceRefresh: true);
                $tokenFetchedAt = now();
            }

            $detailUrl = config('bc.api_base_url')
                ."Production/api/smart/sonniva/v1.0/companies(dc29e11b-78aa-ee11-be38-000d3ab8f033)/itemsDetailed('{$item->no}')"
                .'?$select=image1,image2,image3,image4,image5';

            $response = Http::withToken($token)
                ->timeout(180)
                ->retry(3, 2000, throw: false)
                ->get($detailUrl);

            if ($response->failed()) {
                $this->error("  → Failed to fetch {$item->no}: ".$response->body());

                continue;
            }

            $detailed = $response->json();

            $images = [];
            foreach (['image1', 'image2', 'image3', 'image4', 'image5'] as $imageKey) {
                $fileName = Item::storeImageFromBase64($detailed[$imageKey] ?? '');
                if ($fileName && ! in_array($fileName, $images)) {
                    $images[] = $fileName;
                }
            }

            $item->update(['images' => $images]);

            if ($images) {
                $updated++;
                $this->info("  → {$item->no}: ".count($images).' image(s) stored.');
            }
        }

        $elapsed = $startedAt->diffInSeconds(now());
        $this->info("Done. {$updated}/{$items->count()} items got images in {$elapsed}s.");

        return self::SUCCESS;
    }
}
