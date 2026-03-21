<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class OrderFactory extends Factory
{
    public function definition(): array
    {
        return [
            'user_id'          => User::inRandomOrder()->value('id'),
            'invoice_no'       => 'INV-' . strtoupper(Str::random(8)),
            'status'           => 'pending',
            'delivery_type'    => fake()->randomElement(['office', 'tbilisi', 'regions']),
            'delivery_cost'    => fake()->randomElement([0, 70, 200]),
            'address'          => fake()->address(),
            'apartment_number' => fake()->numerify('##'),
            'subtotal'         => 0,
            'total'            => 0,
            'comment'          => fake()->optional(0.3)->sentence(),
            'seen_at'          => null,
            'approved_at'      => null,
            'invoiced_at'      => null,
            'ready_at'         => null,
        ];
    }

    public function pending(): static
    {
        return $this->state(['status' => 'pending']);
    }

    public function approved(): static
    {
        return $this->state([
            'status'      => 'approved',
            'seen_at'     => now()->subDays(rand(1, 5)),
            'approved_at' => now()->subDays(rand(1, 3)),
            'invoiced_at' => now()->subDays(rand(1, 2)),
        ]);
    }

    public function ready(): static
    {
        return $this->state([
            'status'      => 'ready',
            'seen_at'     => now()->subDays(rand(3, 7)),
            'approved_at' => now()->subDays(rand(2, 5)),
            'invoiced_at' => now()->subDays(rand(2, 4)),
            'ready_at'    => now()->subDays(rand(1, 2)),
        ]);
    }

    public function cancelled(): static
    {
        return $this->state([
            'status'  => 'cancelled',
            'seen_at' => now()->subDays(rand(1, 5)),
        ]);
    }
}