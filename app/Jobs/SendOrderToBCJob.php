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

        // A customer an admin registered at checkout may not have their BC
        // customer record yet — that sync is queued too. Wait for it rather
        // than posting a null Sell_to_Customer_No.
        if ($order->user && ! $order->user->bc_customer_no && $this->attempts() < $this->tries) {
            $this->release(120);

            return;
        }

        Cache::lock('bc-order-processing', 300)->block(310, function () use ($bcService, $order) {
            $bcService->addSalesOrders($order, $order->items);
            $bcService->addShipToAddress($order);
        });
    }
}
