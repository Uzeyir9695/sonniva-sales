<?php

use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

//Schedule::command('sitemap:generate')->daily();
Schedule::command('inventory:sync')->everyFiveMinutes()->withoutOverlapping();
