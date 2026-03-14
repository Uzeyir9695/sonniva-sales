<?php

namespace App\Jobs;

use App\Models\Order;
use App\Services\BusinessCentralService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Cache;

class SendOrderToBCJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $timeout = 300;
    public $tries = 3;
    public $backoff = 60;

    public function __construct(
        public Order $order
    ) {}

    public function handle(BusinessCentralService $bcService)
    {
        $order = Order::with(['items.item', 'user'])->findOrFail($this->order->id);

        Cache::lock('bc-order-processing', 300)->block(310, function () use ($bcService, $order) {
            foreach ($order->items as $key => $orderItem) {
                $bcService->addSalesOrders($orderItem, $key);
                usleep(500000);
            }

            $bcService->addShipToAddress($order);
        });
    }
}