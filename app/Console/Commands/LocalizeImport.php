<?php

namespace App\Console\Commands;

use App\Models\Category;
use App\Models\Item;
use App\Models\Translation;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class LocalizeImport extends Command
{
    protected $signature = 'localize:import
        {file : path under storage/app (e.g. localization/categories.json) or a project-relative path (e.g. database/localization/categories.json)}
        {--type= : categories|items|dictionary|item-descriptions — overrides filename inference}
        {--field=name : items only — name|description}
        {--review : mark imported rows needs_review=true}';

    protected $description = 'Import translated strings from a JSON file into the locale columns / dictionary';

    private const LOCALES = ['en', 'ru', 'tr'];

    public function handle(): int
    {
        $file = $this->argument('file');

        if (Storage::exists($file)) {
            $contents = Storage::get($file);
        } elseif (is_file(base_path($file))) {
            $contents = file_get_contents(base_path($file));
        } else {
            $this->error("File not found: {$file}");

            return self::FAILURE;
        }

        $data = json_decode($contents, true);

        if (! is_array($data)) {
            $this->error('File is not valid JSON.');

            return self::FAILURE;
        }

        $base = basename($file, '.json');
        $review = (bool) $this->option('review');
        $type = $this->option('type') ?? match (true) {
            $base === 'categories' => 'categories',
            $base === 'dictionary' => 'dictionary',
            $base === 'item_descriptions' => 'item-descriptions',
            str_starts_with($base, 'items_') => 'items',
            default => null,
        };
        $field = $this->option('field') ?: (str_starts_with($base, 'items_name') ? 'name' : (str_starts_with($base, 'items_description') ? 'description' : 'name'));

        $count = match ($type) {
            'categories' => $this->categories($data, $review),
            'items' => $this->items($field, $data, $review),
            'dictionary' => $this->dictionary($data, $review),
            'item-descriptions' => $this->itemDescriptions($data, $review),
            default => null,
        };

        if ($count === null) {
            $this->error("Can't infer type from filename [{$base}]. Pass --type=categories|items|dictionary.");

            return self::FAILURE;
        }

        $this->info("Imported {$count} rows from {$file}.");

        return self::SUCCESS;
    }

    private function localeValues(array $row): array
    {
        return collect(self::LOCALES)
            ->mapWithKeys(fn ($l) => [$l => isset($row[$l]) && trim((string) $row[$l]) !== '' ? trim($row[$l]) : null])
            ->filter()
            ->all();
    }

    private function categories(array $data, bool $review): int
    {
        $n = 0;
        foreach ($data as $code => $row) {
            $values = $this->localeValues($row);
            if (empty($values)) {
                continue;
            }
            $update = collect($values)->mapWithKeys(fn ($v, $l) => ["name_{$l}" => $v])->all();
            if ($review) {
                $update['needs_review'] = true;
            }
            $n += Category::where('code', (string) $code)->update($update);
        }

        Category::flushNavCache();

        return $n;
    }

    private function items(string $field, array $data, bool $review): int
    {
        if (! in_array($field, ['name', 'description'], true)) {
            $this->error("Unknown item field [{$field}].");

            return 0;
        }

        $n = 0;
        foreach ($data as $no => $row) {
            $values = $this->localeValues($row);
            if (empty($values)) {
                continue;
            }
            $update = collect($values)->mapWithKeys(fn ($v, $l) => ["{$field}_{$l}" => $v])->all();
            if ($review) {
                $update['needs_review'] = true;
            }
            $n += Item::where('no', (string) $no)->update($update);
        }

        return $n;
    }

    /**
     * Descriptions are shared marketing blurbs — a handful of distinct strings
     * across thousands of items. Each row is {ka, en, ru, tr}; matched on the
     * raw `description` text and written to every item that carries it.
     */
    private function itemDescriptions(array $data, bool $review): int
    {
        $n = 0;
        foreach ($data as $row) {
            $ka = trim((string) ($row['ka'] ?? ''));
            $values = $this->localeValues($row);
            if ($ka === '' || empty($values)) {
                continue;
            }
            $update = collect($values)->mapWithKeys(fn ($v, $l) => ["description_{$l}" => $v])->all();
            if ($review) {
                $update['needs_review'] = true;
            }
            $n += Item::whereRaw('TRIM(description) = ?', [$ka])->update($update);
        }

        return $n;
    }

    private function dictionary(array $data, bool $review): int
    {
        $n = 0;
        DB::transaction(function () use ($data, $review, &$n) {
            foreach ($data as $source => $row) {
                $values = $this->localeValues($row);
                if (empty($values)) {
                    continue;
                }
                Translation::updateOrCreate(
                    ['source_text' => (string) $source],
                    [...$values, 'needs_review' => $review],
                );
                $n++;
            }
        });
        Translation::flushCache();

        return $n;
    }
}
