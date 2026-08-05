<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Artisan;

class SyncItemFromBcJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $timeout = 1800;

    public $tries = 1;

    public function __construct(protected ?string $itemNo = null) {}

    public function handle(): void
    {
        $args = $this->itemNo ? ['no' => $this->itemNo] : [];

        // Order matters: weights are derived from unit_price/prices, so
        // sync-data must run before sync-weights.
        Artisan::call('items:sync', $args);
        Artisan::call('items:sync-data', $args);
        Artisan::call('items:sync-weights', $args);
    }
}
