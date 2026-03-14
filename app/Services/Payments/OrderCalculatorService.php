<?php

namespace App\Services\Payments;

use App\Models\Cart;
use App\Models\Item;

class OrderCalculatorService
{
    const DELIVERY_COSTS = [
        'office'  => 0,
        'tbilisi' => 70,
        'regions' => 200,
    ];

    const FREE_DELIVERY_THRESHOLD = 1000;

    public function calculate(array $itemIds, string $deliveryType, int|string $userId): array
    {
        // Fetch only cart rows that belong to this user and match the requested item IDs.
        // This prevents a user from pricing items that belong to someone else.
        $cartRows = Cart::with('item')
            ->where('user_id', $userId)
            ->whereIn('item_id', $itemIds)
            ->get()
            ->keyBy('item_id');

        // Reject if any requested item wasn't found in this user's cart
        if ($cartRows->count() !== count($itemIds)) {
            throw new \InvalidArgumentException('One or more items not found in your cart.');
        }

        $subtotal  = 0;
        $itemsData = [];

        foreach ($cartRows as $cartRow) {
            $qty       = $cartRow->quantity;
            $unitPrice = $this->tierPrice($cartRow->item, $qty);
            $rowTotal  = $unitPrice * $qty;
            $subtotal += $rowTotal;

            $itemsData[] = [
                'item_id'    => $cartRow->item_id,
                'quantity'   => $qty,
                'unit_price' => $unitPrice,
                'subtotal'   => $rowTotal,
            ];
        }

        $deliveryCost = $this->deliveryCost($deliveryType, $subtotal);

        return [
            'subtotal'      => $subtotal,
            'delivery_cost' => $deliveryCost,
            'total'         => $subtotal + $deliveryCost,
            'items'         => $itemsData,
        ];
    }

    private function tierPrice(Item $item, int $qty): float
    {
        if (empty($item->prices)) return $item->unit_price;

        $tier = collect($item->prices)
            ->sortByDesc('custMinQuantity')
            ->first(fn($p) => $qty >= $p['custMinQuantity']);

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
