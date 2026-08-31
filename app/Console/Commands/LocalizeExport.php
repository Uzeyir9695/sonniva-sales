<?php

namespace App\Console\Commands;

use App\Models\Attribute;
use App\Models\Category;
use App\Models\Item;
use App\Models\Translation;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;

class LocalizeExport extends Command
{
    protected $signature = 'localize:export
        {type : categories|items|dictionary}
        {--field=name : items only — name|description}
        {--limit= : cap the number of rows exported}
        {--only-missing : skip rows already translated}';

    protected $description = 'Export untranslated Georgian source strings to a JSON file for translation';

    public function handle(): int
    {
        $type = $this->argument('type');
        $field = $this->option('field');
        $limit = $this->option('limit') ? (int) $this->option('limit') : null;
        $onlyMissing = (bool) $this->option('only-missing');

        $rows = match ($type) {
            'categories' => $this->categories($onlyMissing, $limit),
            'items' => $this->items($field, $onlyMissing, $limit),
            'dictionary' => $this->dictionary($onlyMissing, $limit),
            default => null,
        };

        if ($rows === null) {
            $this->error("Unknown type [{$type}]. Use categories, items or dictionary.");

            return self::FAILURE;
        }

        if ($rows->isEmpty()) {
            $this->info('Nothing to export — everything is already translated.');

            return self::SUCCESS;
        }

        $name = $type === 'items' ? "items_{$field}" : $type;
        $path = "localization/{$name}.json";
        Storage::put($path, json_encode($rows, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));

        $this->info("Exported {$rows->count()} entries to ".Storage::path($path));

        return self::SUCCESS;
    }

    private function categories(bool $onlyMissing, ?int $limit)
    {
        return Category::query()
            ->when($onlyMissing, fn ($q) => $q->whereNull('name_en'))
            ->orderBy('level')->orderBy('sort_order')
            ->when($limit, fn ($q) => $q->limit($limit))
            ->get(['code', 'name'])
            ->mapWithKeys(fn (Category $c) => [
                $c->code => ['source' => $c->getRawOriginal('name'), 'en' => '', 'ru' => '', 'tr' => ''],
            ]);
    }

    private function items(string $field, bool $onlyMissing, ?int $limit)
    {
        return Item::query()
            ->whereNotNull($field)->where($field, '!=', '')
            ->when($onlyMissing, fn ($q) => $q->whereNull("{$field}_en"))
            ->orderBy('no')
            ->when($limit, fn ($q) => $q->limit($limit))
            ->get(['no', $field])
            ->mapWithKeys(fn (Item $i) => [
                $i->no => ['source' => $i->getRawOriginal($field), 'en' => '', 'ru' => '', 'tr' => ''],
            ]);
    }

    private function dictionary(bool $onlyMissing, ?int $limit)
    {
        $sources = collect()
            ->merge(Attribute::query()->whereNotNull('name')->distinct()->pluck('name'))
            ->merge(Attribute::query()->whereNotNull('value')->distinct()->pluck('value'))
            ->merge(Item::query()->whereNotNull('base_uom_desc')->distinct()->pluck('base_uom_desc'))
            ->map(fn ($s) => trim((string) $s))
            ->filter()
            ->unique()
            ->values();

        if ($onlyMissing) {
            $known = Translation::whereNotNull('en')->pluck('source_text')->flip();
            $sources = $sources->reject(fn ($s) => $known->has($s))->values();
        }

        return $sources
            ->when($limit, fn ($c) => $c->take($limit))
            ->mapWithKeys(fn ($s) => [$s => ['en' => '', 'ru' => '', 'tr' => '']]);
    }
}
