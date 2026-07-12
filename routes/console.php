<?php

use Illuminate\Support\Facades\Schedule;

// Schedule::command('sitemap:generate')->daily();
Schedule::command('inventory:sync')
    ->everyFiveMinutes()
    ->between('09:00', '18:00')
    ->timezone('Asia/Tbilisi')
    ->withoutOverlapping();

Schedule::command('items:sync-data')
    ->everyThirtyMinutes()
    ->between('09:00', '18:00')
    ->timezone('Asia/Tbilisi')
    ->withoutOverlapping();
