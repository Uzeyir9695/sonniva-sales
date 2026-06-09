<?php

namespace Database\Seeders;

use App\Models\Item;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;

class TempCategory120201ImageExportSeeder extends Seeder
{
    public function run(): void
    {
        $outputDir = public_path('1202-02-images');

        File::ensureDirectoryExists($outputDir);

        $items = Item::query()
            ->select('slug', 'images', 'inventory')
            ->where('category_code', '1202-02')
            ->where('images', '!=', '[]')
            ->get();

        $this->command->info("Found {$items->count()} items in category 1202-02 with inventory < 1.");

        $copied = 0;
        $missing = 0;

        foreach ($items as $item) {
            $images = $item->images ?? [];

            if (empty($images)) {
                continue;
            }

            foreach ($images as $index => $filename) {
                $source = storage_path("app/public/items/{$filename}");

                if (! File::exists($source)) {
                    $this->command->warn("Missing source file: {$filename} (slug: {$item->slug})");
                    $missing++;

                    continue;
                }

                $extension = pathinfo($filename, PATHINFO_EXTENSION);
                $suffix = $index === 0 ? '' : "_{$index}";
                $destination = "{$outputDir}/{$item->slug}{$suffix}.{$extension}";

                File::copy($source, $destination);
                $copied++;
            }
        }

        $this->command->info("Done. Copied {$copied} images to public/1202-02-images/. Missing: {$missing}.");
    }
}
