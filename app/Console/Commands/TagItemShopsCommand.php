<?php

namespace App\Console\Commands;

use App\Services\BusinessCentralService;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class TagItemShopsCommand extends Command
{
    protected $signature = 'items:tag-shops';

    protected $description = 'Tag zero-weight items with their shop location from Business Central';

    public function __construct(protected BusinessCentralService $bc)
    {
        parent::__construct();
    }

    public function handle(): int
    {
        $startedAt = now();
        $this->info('Fetching zero-weight items...');

        $items = DB::table('items')
            ->select('no')
            ->whereJsonContains('weights', ['weight' => 0])
            ->get();

        $this->info("Processing {$items->count()} items...");

        $bar = $this->output->createProgressBar($items->count());
        $bar->start();

        foreach ($items as $item) {
            $inventory = $this->bc->calcInventory($item->no);

            $shop = match (true) {
                $inventory['shop1Total'] > 0 && $inventory['shop2Total'] > 0 => 'BOTH',
                $inventory['shop1Total'] > 0 => 'SHOP01',
                $inventory['shop2Total'] > 0 => 'SHOP02',
                default => null,
            };

            DB::table('items')
                ->where('no', $item->no)
                ->update(['shop' => $shop]);

            $bar->advance();
        }

        $bar->finish();
        $this->newLine();

        $totalSeconds = $startedAt->diffInSeconds(now());
        $this->info("Done in {$totalSeconds}s.");

        return self::SUCCESS;
    }
}
