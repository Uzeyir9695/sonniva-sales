<?php

namespace App\Services\Payments;

use App\Models\Cart;
use App\Models\Item;
use App\Models\User;

class OrderCalculatorService
{
    const FREE_DELIVERY_THRESHOLD = 500;

    const TBILISI_ZONE_RATES = [
        // I ზონა – 40 ₾
        'გლდანი' => 40, 'გლდანულა' => 40, 'სოფელი გლდანი' => 40, 'ზაჰესი' => 40, 'ავჭალა' => 40,
        'თემქა' => 40, 'მუხიანი' => 40, 'დიღომი 7' => 40, 'დიღმის მასივი' => 40, 'დიდი დიღომი' => 40, 'სოფელი დიღომი' => 40,
        // II ზონა – 50 ₾
        'ვაკე' => 50, 'საბურთალო' => 50, 'ბაგები' => 50, 'ლისი' => 50, 'ვაშლიჯვარი' => 50, 'ორთაჭალა' => 50,
        'მთაწმინდა' => 50, 'სოლოლაკი' => 50, 'ვერა' => 50, 'დიდუბე' => 50, 'ჩუღურეთი' => 50, 'ნაძალადევი' => 50,
        // III ზონა – 60 ₾
        'ისანი' => 60, 'სამგორი' => 60, 'ლილო' => 60, 'ორხევი' => 60, 'აეროპორტის დასახლება' => 60,
        'ქვემო ფონიჭალა' => 60, 'ზემო ფონიჭალა' => 60, 'რუსთავი' => 60, 'ვარკეთილი' => 60, 'წყნეთი' => 60,
        'კოჯორი' => 60, 'ტაბახმელა' => 60, 'წავკისი' => 60, 'შინდისი' => 60, 'ოქროყანა' => 60, 'ნაფეტვრები' => 60,
    ];

    const DELIVERY_RATES = [
        ['maxKg' => 1,    'tbilisi' => 6.5,  'region' => 10.5, 'office' => 6,   'village' => 15.5],
        ['maxKg' => 5,    'tbilisi' => 7.5,  'region' => 12.5, 'office' => 6,   'village' => 17.5],
        ['maxKg' => 10,   'tbilisi' => 11,   'region' => 16,   'office' => 10,  'village' => 21],
        ['maxKg' => 15,   'tbilisi' => 16,   'region' => 21,   'office' => 15,  'village' => 26],
        ['maxKg' => 20,   'tbilisi' => 19,   'region' => 26,   'office' => 20,  'village' => 31],
        ['maxKg' => 30,   'tbilisi' => 30,   'region' => 36,   'office' => 30,  'village' => 45],
        ['maxKg' => 50,   'tbilisi' => 45,   'region' => 65,   'office' => 50,  'village' => 80],
        ['maxKg' => 100,  'tbilisi' => 65,   'region' => 105,  'office' => 80,  'village' => 120],
        ['maxKg' => 150,  'tbilisi' => 80,   'region' => 145,  'office' => 110, 'village' => 175],
        ['maxKg' => 200,  'tbilisi' => 100,  'region' => 185,  'office' => 140, 'village' => 215],
        ['maxKg' => 250,  'tbilisi' => 120,  'region' => 220,  'office' => 170, 'village' => 250],
        ['maxKg' => 300,  'tbilisi' => 140,  'region' => 260,  'office' => 200, 'village' => 290],
        ['maxKg' => 500,  'tbilisi' => 220,  'region' => 340,  'office' => 280, 'village' => 390],
        ['maxKg' => 750,  'tbilisi' => 300,  'region' => 450,  'office' => 370, 'village' => 500],
        ['maxKg' => 1000, 'tbilisi' => 380,  'region' => 700,  'office' => 510, 'village' => 750],
    ];

    public function calculate(array $cartIds, string $deliveryType, int|string $userId, ?string $deliveryPriceType = null, ?string $city = null): array
    {
        $isVip = User::find($userId)?->can_view_vip ?? false;

        // Fetch only cart rows that belong to this user and match the requested cart UUIDs.
        // Using cart IDs (not item IDs) correctly handles the same item with different UOMs.
        $cartRows = Cart::with('item')
            ->where('user_id', $userId)
            ->whereIn('id', $cartIds)
            ->get();

        // Reject if any requested cart row wasn't found in this user's cart
        if ($cartRows->count() !== count($cartIds)) {
            throw new \InvalidArgumentException('One or more items not found in your cart.');
        }

        // Reject if any item is out of stock
        $outOfStock = $cartRows->filter(fn ($row) => $row->item->inventory <= 0);
        if ($outOfStock->isNotEmpty()) {
            throw new \InvalidArgumentException('One or more items are out of stock.');
        }

        $subtotal = 0;
        $wholesaleDiscount = 0;
        $totalWeightKg = 0.0;
        $itemsData = [];

        foreach ($cartRows as $cartRow) {
            $qty = $cartRow->quantity;
            $unitPrice = $this->tierPrice($cartRow->item, $qty, $cartRow->selected_uom, $isVip);
            $rowTotal = $unitPrice * $qty;
            $subtotal += $rowTotal;

            $retailPrice = $this->retailPrice($cartRow->item, $cartRow->selected_uom);
            $rowWholesaleDiscount = $retailPrice !== null ? ($retailPrice - $unitPrice) * $qty : 0;
            $wholesaleDiscount += $rowWholesaleDiscount;

            $unitWeightKg = $this->unitWeightKg($cartRow);
            $totalWeightKg += $unitWeightKg * $qty;

            $itemsData[] = [
                'item_id' => $cartRow->item_id,
                'quantity' => $qty,
                'unit_price' => $unitPrice,
                'subtotal' => $rowTotal,
                'unit_of_measure_code' => $cartRow->selected_uom,
                'unit_weight' => $unitWeightKg,
                'discount' => $cartRow->item->discount,
                'wholesale_discount' => $rowWholesaleDiscount,
            ];
        }

        $deliveryCost = $this->deliveryCost($deliveryType, $subtotal, $deliveryPriceType, $totalWeightKg, $city);

        return [
            'subtotal' => $subtotal,
            'wholesale_discount' => $wholesaleDiscount,
            'delivery_cost' => $deliveryCost,
            'total' => $subtotal + $deliveryCost,
            'items' => $itemsData,
        ];
    }

    private function retailPrice(Item $item, ?string $uom): ?float
    {
        if ($item->unit_price > 0) {
            return (float) ($item->discounted_price ?? $item->unit_price);
        }

        if (! $uom || empty($item->prices)) {
            return null;
        }

        $entry = collect($item->prices)
            ->first(fn ($p) => $p['UOM'] === $uom && $p['priceGroup'] === 'Retail');

        return $entry ? (float) $entry['price'] : null;
    }

    private function tierPrice(Item $item, int $qty, ?string $uom = null, bool $isVip = false): float
    {
        if (empty($item->prices)) {
            return (float) ($item->discounted_price ?? $item->unit_price);
        }

        $prices = collect($item->prices)
            ->when(! $isVip, fn ($c) => $c->filter(fn ($p) => ($p['priceGroup'] ?? '') !== 'VIP'));

        // Package item: price determined by selected UOM, with optional quantity-based wholesale
        if ($item->unit_price == 0 && $uom) {
            $entry = $prices
                ->filter(fn ($p) => $p['UOM'] === $uom)
                ->sortByDesc('custMinQuantity')
                ->first(fn ($p) => $qty >= $p['custMinQuantity']);

            return $entry ? (float) $entry['price'] : 0;
        }

        $tier = $prices
            ->sortByDesc('custMinQuantity')
            ->first(fn ($p) => $qty >= $p['custMinQuantity']);

        // Retail-tier (or no tier matched) is a plain retail purchase, so the discount applies.
        // Wholesale/VIP tiers are already preferential pricing and keep their raw price.
        if (! $tier || ($tier['priceGroup'] ?? null) === 'Retail') {
            return (float) ($item->discounted_price ?? $item->unit_price);
        }

        return (float) $tier['price'];
    }

    private function deliveryCost(string $deliveryType, float $subtotal, ?string $priceType, float $weightKg, ?string $city = null): float
    {
        if ($deliveryType === 'office') {
            return 0;
        }

        if ($priceType === 'tbilisi' && $subtotal >= self::FREE_DELIVERY_THRESHOLD) {
            return 0;
        }

        if (! $priceType) {
            return 0;
        }

        if ($priceType === 'tbilisi') {
            return (float) (self::TBILISI_ZONE_RATES[$city] ?? 0);
        }

        $rate = collect(self::DELIVERY_RATES)->first(fn ($r) => $weightKg <= $r['maxKg'])
            ?? collect(self::DELIVERY_RATES)->last();

        return (float) ($rate[$priceType] ?? 0);
    }

    private function unitWeightKg(Cart $cartRow): float
    {
        $weights = $cartRow->item->weights ?? [];

        if ($cartRow->item->unit_price == 0 && $cartRow->selected_uom) {
            $entry = collect($weights)->first(fn ($w) => $w['uom'] === $cartRow->selected_uom);

            return $entry ? (float) $entry['weight'] : 0.0;
        }

        return (float) ($weights[0]['weight'] ?? 0);
    }
}
