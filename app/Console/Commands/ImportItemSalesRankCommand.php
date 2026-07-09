<?php

namespace App\Console\Commands;

use App\Models\Item;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class ImportItemSalesRankCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'items:import-sales-rank {path : Path to the Business Central CSV (columns: No, Code, Rank)}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Import per-category sales rank for items from a Business Central export CSV';

    public function handle(): int
    {
        $path = $this->argument('path');

        if (! is_file($path)) {
            $this->error("File not found: {$path}");

            return self::FAILURE;
        }

        $handle = fopen($path, 'rb');
        $header = fgetcsv($handle);

        if ($header === false) {
            $this->error('The CSV file is empty.');
            fclose($handle);

            return self::FAILURE;
        }

        // Strip a UTF-8 BOM from the first header cell, if present.
        $header[0] = preg_replace('/^\x{FEFF}/u', '', $header[0]);

        $noIndex = array_search('No', $header, true);
        $codeIndex = array_search('Code', $header, true);

        if ($noIndex === false || $codeIndex === false) {
            $this->error('CSV must contain "No" and "Code" columns.');
            fclose($handle);

            return self::FAILURE;
        }

        $itemIdsByNo = Item::query()->pluck('id', 'no');

        $updates = [];
        $skipped = [];
        $lastCode = null;
        $rank = 0;

        while (($row = fgetcsv($handle)) !== false) {
            $no = trim($row[$noIndex] ?? '');
            $code = trim($row[$codeIndex] ?? '');

            $rank = $code === $lastCode ? $rank + 1 : 1;
            $lastCode = $code;

            $id = $itemIdsByNo[$no] ?? null;

            if ($id === null) {
                $skipped[] = $no;

                continue;
            }

            $updates[$id] = $rank;
        }

        fclose($handle);

        $this->info(sprintf(
            'Parsed %d rows: %d matched an existing item, %d skipped (no matching item).',
            count($updates) + count($skipped),
            count($updates),
            count($skipped)
        ));

        if (! $this->confirm('Reset all existing sales_rank values and apply this ranking now?', true)) {
            return self::SUCCESS;
        }

        $bar = $this->output->createProgressBar(count($updates));
        $bar->start();

        DB::transaction(function () use ($updates, $bar) {
            Item::query()->whereNotNull('sales_rank')->update(['sales_rank' => null]);

            foreach (array_chunk($updates, 500, true) as $chunk) {
                $cases = [];
                $bindings = [];

                foreach ($chunk as $id => $rank) {
                    $cases[] = 'WHEN ? THEN ?';
                    $bindings[] = $id;
                    $bindings[] = $rank;
                }

                $ids = array_keys($chunk);
                $placeholders = implode(',', array_fill(0, count($ids), '?'));

                DB::statement(
                    'UPDATE items SET sales_rank = CASE id '.implode(' ', $cases).' END WHERE id IN ('.$placeholders.')',
                    [...$bindings, ...$ids]
                );

                $bar->advance(count($chunk));
            }
        });

        $bar->finish();
        $this->newLine();

        if (! empty($skipped)) {
            $this->newLine();
            $this->warn(count($skipped).' item No.(s) from the CSV did not match any current item, e.g.:');
            $this->line(implode(', ', array_slice($skipped, 0, 20)).(count($skipped) > 20 ? ', ...' : ''));
        }

        $this->info('Done.');

        return self::SUCCESS;
    }
}
