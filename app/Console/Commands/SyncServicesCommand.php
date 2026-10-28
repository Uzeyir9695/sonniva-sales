<?php

namespace App\Console\Commands;

use App\Models\Service;
use App\Services\BusinessCentralService;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;

class SyncServicesCommand extends Command
{
    protected $signature = 'services:sync';

    protected $description = 'Sync service names, units and prices from Business Central';

    public function handle(BusinessCentralService $bc): int
    {
        $services = Service::all();

        if ($services->isEmpty()) {
            $this->info('No services to sync.');

            return self::SUCCESS;
        }

        $filter = $services->map(fn (Service $service) => "no eq '{$service->no}'")->implode(' or ');

        $response = Http::withToken($bc->getAccessToken())
            ->timeout(60)
            ->retry(3, 2000, throw: false)
            ->get(config('bc.api_base_url').'Production/api/smart/sonniva/v1.0/companies(dc29e11b-78aa-ee11-be38-000d3ab8f033)/items', [
                '$select' => 'no,description,baseUOMDesc,unitPrice',
                '$filter' => $filter,
            ]);

        if ($response->failed()) {
            $this->error('BC API error: '.$response->body());

            return self::FAILURE;
        }

        $bcItems = collect($response->json('value', []))->keyBy('no');

        foreach ($services as $service) {
            $bcItem = $bcItems->get($service->no);

            if (! $bcItem) {
                $this->warn("{$service->no} not found in BC, left unchanged.");

                continue;
            }

            $service->update([
                'name' => $bcItem['description'],
                'uom' => $bcItem['baseUOMDesc'],
                'unit_price' => $bcItem['unitPrice'],
            ]);
        }

        $this->info("Synced {$bcItems->count()} of {$services->count()} services.");

        return self::SUCCESS;
    }
}
