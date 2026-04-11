<?php

namespace Database\Seeders;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Payment;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class OrderSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('payments')->delete();
        DB::table('order_items')->delete();
        DB::table('orders')->delete();

        $statuses = ['pending', 'paid', 'ready', 'cancelled'];

        $users = User::all();

        if ($users->isEmpty()) {
            $users = User::factory(10)->create();
        }

        foreach ($statuses as $status) {
            Order::factory(10)->$status()->recycle($users)->create()->each(function (Order $order) use ($status) {
                OrderItem::factory()->count(rand(1, 3))->create(['order_id' => $order->id]);

                $subtotal = $order->items()->sum('subtotal');
                $order->update([
                    'subtotal' => $subtotal,
                    'total' => $subtotal + $order->delivery_cost,
                ]);

                if (in_array($status, ['paid', 'ready'])) {
                    Payment::factory()->create([
                        'user_id' => $order->user_id,
                        'order_id' => $order->id,
                        'amount' => $order->total,
                        'invoice_no' => $order->invoice_no,
                    ]);
                }
            });
        }
    }
}
