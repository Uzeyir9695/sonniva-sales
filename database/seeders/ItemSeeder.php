<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Artisan;

class ItemSeeder extends Seeder
{
    public function run(): void
    {
        Artisan::call('items:sync');

        $this->command?->info(Artisan::output());
    }
}
