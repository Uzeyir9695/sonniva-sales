<?php

namespace Database\Seeders;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Payment;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory(10)->create();

        $statuses = ['pending', 'approved', 'ready', 'cancelled'];

        $users = User::all();

        foreach ($statuses as $status) {
            Order::factory(10)->$status()->recycle($users)->create()->each(function (Order $order) use ($status) {
                // Attach 1–3 order items
                OrderItem::factory()->count(rand(1, 3))->create(['order_id' => $order->id]);

                // Recalculate subtotal and total from actual items
                $subtotal = $order->items()->sum('subtotal');
                $order->update([
                    'subtotal' => $subtotal,
                    'total'    => $subtotal + $order->delivery_cost,
                ]);

                // Only approved and ready orders have a completed payment
                if (in_array($status, ['approved', 'ready'])) {
                    Payment::factory()->create([
                        'user_id'    => $order->user_id,
                        'order_id'   => $order->id,
                        'amount'     => $order->total,
                        'invoice_no' => $order->invoice_no,
                    ]);
                }
            });
        }
    }
}
