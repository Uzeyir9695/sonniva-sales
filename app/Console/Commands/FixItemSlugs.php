<?php

namespace App\Console\Commands;

use App\Models\Item;
use Illuminate\Console\Command;

class FixItemSlugs extends Command
{
    protected $signature = 'app:fix-item-slugs';

    protected $description = 'Fix item slugs that contain invalid URL characters (%, comma, dot)';

    public function handle(): void
    {
        $items = Item::where('slug', 'LIKE', '%\%%')
            ->orWhere('slug', 'LIKE', '%,%')
            ->orWhere('slug', 'LIKE', '%.%')
            ->get(['id', 'no', 'name', 'slug']);

        $this->info("Found {$items->count()} items to fix.");

        $fixed = 0;

        foreach ($items as $item) {
            $clean = $this->makeSlug($item->name);

            if (Item::where('slug', $clean)->where('id', '!=', $item->id)->exists()) {
                $clean = $clean.'-'.mb_strtolower($item->no);
            }

            $this->line("  {$item->slug} → {$clean}");

            $item->slug = $clean;
            $item->save();
            $fixed++;
        }

        $this->info("Done. Fixed {$fixed} slugs.");
    }

    private function makeSlug(string $text): string
    {
        $text = trim($text, " \t\n\r\0\x0B,.*");
        $text = preg_replace('/[\/=%,.]+/u', '-', $text);
        $text = preg_replace('/[-\s]+/u', '-', $text);
        $text = trim($text, '-');

        return mb_strtolower($text);
    }
}
