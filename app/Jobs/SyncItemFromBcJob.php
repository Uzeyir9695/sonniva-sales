<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\Middleware\WithoutOverlapping;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Artisan;

class SyncItemFromBcJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $timeout = 1800;

    public $tries = 3;

    public $backoff = 60;

    public function __construct(protected ?string $itemNo = null) {}

    /**
     * @return array<int, object>
     */
    public function middleware(): array
    {
        return [(new WithoutOverlapping($this->itemNo ?? 'new-items'))->dontRelease()->expireAfter($this->timeout)];
    }

    public function handle(): void
    {
        $args = $this->itemNo ? ['no' => $this->itemNo] : [];

        // Weights are derived from unit_price/prices, so sync-data must run first.
        Artisan::call('items:sync', $args);
        Artisan::call('items:sync-data', $args);
        Artisan::call('items:sync-weights', $this->itemNo ? $args : ['--missing' => true]);
    }
}
