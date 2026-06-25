<?php

namespace Database\Seeders;

use App\Models\Item;
use App\Models\StockNotification;
use Illuminate\Database\Seeder;

class StockNotificationSeeder extends Seeder
{
    public function run(): void
    {
        $userId = '019ed9ca-bc2f-7015-b01f-4067033543a6';

        Item::query()
            ->where('inventory', 0)
            ->get()
            ->each(function (Item $item) use ($userId) {
                StockNotification::firstOrCreate([
                    'user_id' => $userId,
                    'item_id' => $item->id,
                ]);
            });
    }
}
