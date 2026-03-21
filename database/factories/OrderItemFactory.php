<?php

namespace Database\Factories;

use App\Models\Item;
use App\Models\Order;
use Illuminate\Database\Eloquent\Factories\Factory;

class OrderItemFactory extends Factory
{
    public function definition(): array
    {
        $item     = Item::where('inventory', '>', 0)->inRandomOrder()->first();
        $quantity = rand(1, 5);
        $price    = $item->unit_price;

        return [
            'order_id'   => Order::inRandomOrder()->value('id'),
            'item_id'    => $item->id,
            'quantity'   => $quantity,
            'unit_price' => $price,
            'subtotal'   => $price * $quantity,
        ];
    }
}