<?php

namespace Database\Seeders;

use App\Models\Item;
use App\Services\BusinessCentralService;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Http;

class PriceListSeeder extends Seeder
{
    private const API_URL = "https://api.businesscentral.dynamics.com/v2.0/904668f4-6aa7-44ce-8285-5c27b33faeeb/Production/ODataV4/Company('SONNIVA')/Price_List_Lines_Excel";

    public function __construct(protected BusinessCentralService $bc) {}

    public function run(): void
    {
        $token = $this->bc->getAccessToken();
        $tokenFetchedAt = now();

        $items = Item::where('unit_price', 0)->select('id', 'no')->get();

        $this->command->info("Found {$items->count()} items with unit_price = 0.");

        foreach ($items as $item) {
            if (now()->diffInMinutes($tokenFetchedAt) >= 55) {
                $this->command->info('Token expiring, refreshing...');
                $token = $this->bc->getAccessToken(forceRefresh: true);
                $tokenFetchedAt = now();
            }

            $prices = $this->fetchPrices($token, $item->no);

            if ($prices->isEmpty()) {
                $this->command->info("  → No prices found for {$item->no}, skipping.");

                continue;
            }

            $item->update(['prices' => $prices->values()->all()]);

            $this->command->info("  → Updated {$item->no} with {$prices->count()} price entries.");
        }

        $this->command->info('Price list seeding complete.');
    }

    private function fetchPrices(string $token, string $assetNo): \Illuminate\Support\Collection
    {
        $all = collect();
        $url = self::API_URL;

        do {
            $response = Http::withToken($token)
                ->timeout(60)
                ->retry(3, 2000)
                ->get($url, [
                    '$filter' => "Asset_No eq '{$assetNo}'",
                    '$select' => 'Unit_Price,Cust_Min_Quantity,PTE_Price_Group,Unit_of_Measure_Code',
                ]);

            if ($response->failed()) {
                throw new \RuntimeException("BC API error for {$assetNo}: ".$response->body());
            }

            $data = $response->json();

            $mapped = collect($data['value'] ?? [])->map(fn ($line) => [
                'price' => $line['Unit_Price'],
                'custMinQuantity' => $line['Cust_Min_Quantity'],
                'priceGroup' => $line['PTE_Price_Group'],
                'UOM' => $line['Unit_of_Measure_Code'],
            ]);

            $all = $all->merge($mapped);
            $url = $data['@odata.nextLink'] ?? null;

        } while ($url);

        return $all->sortBy('price')->values();
    }
}
