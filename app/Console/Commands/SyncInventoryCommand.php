<?php

namespace App\Console\Commands;

use App\Models\StockNotification;
use App\Services\BusinessCentralService;
use App\Services\SmsService;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;

class SyncInventoryCommand extends Command
{
    protected $signature = 'inventory:sync';

    protected $description = 'Sync item inventory from Business Central';

    public function __construct(
        protected BusinessCentralService $bc,
        protected SmsService $sms,
    ) {
        parent::__construct();
    }

    private function notifyWaitingUsers(array $itemNos): void
    {
        $restockedIds = DB::table('items')
            ->whereIn('no', $itemNos)
            ->where('inventory', '>', 0)
            ->pluck('id');

        if ($restockedIds->isEmpty()) {
            return;
        }

        $notifications = StockNotification::query()
            ->with(['user', 'item'])
            ->whereIn('item_id', $restockedIds)
            ->whereNull('notified_at')
            ->get();

        foreach ($notifications as $notification) {
            $phone = $notification->user->international_phone;
            $itemName = $notification->item->name;

            $this->sms->send(
                destination: $phone,
                content: "Sonniva: {$itemName} - მარაგი შეივსო. შეგიძლიათ შეიძინოთ ახლა."
            );

            $notification->update(['notified_at' => now()]);
        }

        $this->info("Notified {$notifications->count()} user(s) about restocked items.");
    }

    public function handle(): int
    {
        $startedAt = now();
        $this->info('Starting inventory sync...');

        $token = $this->bc->getAccessToken();
        $tokenFetchedAt = now();

        $url = config('bc.api_base_url')
            .'Production/api/smart/sonniva/v1.0/companies(dc29e11b-78aa-ee11-be38-000d3ab8f033)/items'
            .'?$select=no,inventory';

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
                $this->error('BC API error: '.$response->body());

                return self::FAILURE;
            }

            $data = $response->json();

            $items = $items->merge($data['value'] ?? []);

            $url = $data['@odata.nextLink'] ?? null;

        } while ($url);

        // Snapshot items that are currently out of stock and have pending notifications
        $waitedItemNos = StockNotification::query()
            ->whereNull('notified_at')
            ->join('items', 'items.id', '=', 'stock_notifications.item_id')
            ->where('items.inventory', '<', 1)
            ->pluck('items.no')
            ->unique()
            ->values();

        foreach ($items as $item) {
            DB::table('items')
                ->where('no', $item['no'])
                ->update([
                    'inventory' => (int) $item['inventory']
                ]);
        }

        // Find which of the waited items just got restocked
        if ($waitedItemNos->isNotEmpty()) {
            $this->notifyWaitingUsers($waitedItemNos->all());
        }

        $seconds = $startedAt->diffInSeconds(now());
        $this->info("Done. Updated {$items->count()} items in {$seconds}s.");

        return self::SUCCESS;
    }
}
