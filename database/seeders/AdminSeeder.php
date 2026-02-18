<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::updateOrCreate(
            [
                'phone' => '+995574234084',
            ],
            [
                'name' => 'Admin',
                'lastname' => 'Panel',
                'tax_id' => '12345678910',
                'email' => 'sales@sonniva.ge',
                'role' => 'admin',
                'phone_country' => 'GE',
                'phone_verified_at' => now(),
                'email_verified_at' => now(),
                'password' => Hash::make('SonnivaSales2025@'),
            ]
        );

        User::updateOrCreate(
            [
                'phone' => '+995596720001'],
            [
                'name' => 'Manager',
                'lastname' => 'Panel',
                'tax_id' => '12345678910',
                'email' => 'manager@sonniva.ge',
                'role' => 'manager',
                'phone_country' => 'GE',
                'phone_verified_at' => now(),
                'email_verified_at' => now(),
                'password' => Hash::make('Sonniva2025@'),
            ]);
    }
}
