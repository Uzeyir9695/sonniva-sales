<?php

namespace App\Services\Payments;

use App\Models\Cart;
use App\Models\Item;

class OrderCalculatorService
{
    const DELIVERY_COSTS = [
        'office' => 0,
        'tbilisi' => 70,
        'regions' => 200,
    ];

    const FREE_DELIVERY_THRESHOLD = 1000;

    public function calculate(array $cartIds, string $deliveryType, int|string $userId): array
    {
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
        $itemsData = [];

        foreach ($cartRows as $cartRow) {
            $qty = $cartRow->quantity;
            $unitPrice = $this->tierPrice($cartRow->item, $qty, $cartRow->selected_uom);
            $rowTotal = $unitPrice * $qty;
            $subtotal += $rowTotal;
            $retailPrice = $this->retailPrice($cartRow->item, $cartRow->selected_uom);
            if ($retailPrice !== null) {
                $wholesaleDiscount += ($retailPrice - $unitPrice) * $qty;
            }

            $itemsData[] = [
                'item_id' => $cartRow->item_id,
                'quantity' => $qty,
                'unit_price' => $unitPrice,
                'subtotal' => $rowTotal,
                'unit_of_measure_code' => $cartRow->selected_uom,
            ];
        }

        $deliveryCost = $this->deliveryCost($deliveryType, $subtotal);

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
            return (float) $item->unit_price;
        }

        if (! $uom || empty($item->prices)) {
            return null;
        }

        $entry = collect($item->prices)
            ->first(fn ($p) => $p['UOM'] === $uom && $p['priceGroup'] === 'Retail');

        return $entry ? (float) $entry['price'] : null;
    }

    private function tierPrice(Item $item, int $qty, ?string $uom = null): float
    {
        if (empty($item->prices)) {
            return $item->unit_price;
        }

        // Package item: price determined by selected UOM, with optional quantity-based wholesale
        if ($item->unit_price == 0 && $uom) {
            $entry = collect($item->prices)
                ->filter(fn ($p) => $p['UOM'] === $uom)
                ->sortByDesc('custMinQuantity')
                ->first(fn ($p) => $qty >= $p['custMinQuantity']);

            return $entry ? (float) $entry['price'] : 0;
        }

        $tier = collect($item->prices)
            ->sortByDesc('custMinQuantity')
            ->first(fn ($p) => $qty >= $p['custMinQuantity']);

        return $tier['price'] ?? $item->unit_price;
    }

    private function deliveryCost(string $deliveryType, float $subtotal): float
    {
        if ($deliveryType === 'tbilisi' && $subtotal >= self::FREE_DELIVERY_THRESHOLD) {
            return 0;
        }

        return self::DELIVERY_COSTS[$deliveryType] ?? 0;
    }
}
