<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Spatie\Image\Enums\Fit;
use Spatie\Image\Image;

class OptimizeCategoryIcons extends Command
{
    protected $signature = 'icons:optimize';

    protected $description = 'Resize and optimize category icons in public/categories-icons/';

    public function handle(): void
    {
        $dir = public_path('categories-icons');
        $files = glob("{$dir}/*.png");

        if (empty($files)) {
            $this->warn('No PNG files found in public/categories-icons/');

            return;
        }

        $this->info('Found '.count($files).' icons. Processing...');

        $bar = $this->output->createProgressBar(count($files));
        $bar->start();

        foreach ($files as $path) {
            Image::load($path)
                ->fit(Fit::Contain, 200, 200)
                ->optimize()
                ->save($path);

            $bar->advance();
        }

        $bar->finish();
        $this->newLine();
        $this->info('Done.');
    }
}
