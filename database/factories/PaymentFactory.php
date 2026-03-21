<?php

namespace Database\Factories;

use App\Models\Order;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class PaymentFactory extends Factory
{
    public function definition(): array
    {
        $order = Order::inRandomOrder()->first();

        return [
            'user_id'        => $order->user_id,
            'order_id'       => $order->id,
            'provider'       => fake()->randomElement(['bog', 'tbc', 'pcb', 'invoice']),
            'transaction_id' => strtoupper(Str::random(16)),
            'status'         => 'completed',
            'amount'         => $order->total,
            'currency'       => 'GEL',
            'response_data'  => null,
            'payment_method' => fake()->randomElement(['card', 'invoice']),
            'ip_address'     => fake()->ipv4(),
            'attempts'       => 1,
            'invoice_no'     => $order->invoice_no,
            'processed_at'   => now()->subDays(rand(1, 5)),
        ];
    }
}