<?php

namespace App\Jobs;

use App\Services\BusinessCentralService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Cache;

class SendOrderToBCJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $timeout = 300; // 10 minutes for large loops/slow APIs
    public $tries = 3;
    public $backoff = 60; // Wait 1 minute before retrying on API fail

    public function __construct(
        public Collection $orderItems
    ) {}

    public function handle(BusinessCentralService $bcService)
    {
        Cache::lock('bc-order-processing', 300)->block(310, function () use ($bcService) {
            foreach ($this->orderItems as $key => $orderItem) {
                $orderItem->update(['email_sent_at' => now()]);

                $bcService->addSalesOrders($orderItem, $key);

                // Add delay between orders to reduce BC load
                usleep(500000); // 0.5 seconds
            }

            if ($this->orderItems->isNotEmpty()) {
                $bcService->addShipToAddress($this->orderItems->first());
            }
        });
    }
}
