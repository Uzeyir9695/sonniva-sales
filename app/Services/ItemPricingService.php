<?php

namespace App\Services;

use App\Models\Item;

/**
 * Server-side port of resources/js/composables/usePricing.js — the tiered
 * (Retail/Wholesale/VIP) and package-UOM pricing math the web cart/checkout
 * pages compute client-side. Mobile has no client-side JS to run this in, so
 * this exists to compute the same numbers once, here, for any endpoint that
 * needs a final chargeable price (currently CartController::index()).
 *
 * Keep this in lockstep with usePricing.js by hand — there is no shared
 * source between the two runtimes. Each method's docblock names its JS
 * counterpart.
 */
class ItemPricingService
{
    /**
     * Visible price tiers — Wholesale/VIP are never shown to a non-VIP
     * viewer. Mirrors `visiblePrices()`.
     *
     * @return array<int, array<string, mixed>>
     */
    private static function visiblePrices(Item $item): array
    {
        return collect($item->prices ?? [])
            ->reject(fn (array $p) => in_array($p['priceGroup'] ?? null, ['Wholesales', 'VIP']))
            ->values()
            ->all();
    }

    /**
     * General "is this a package/tiered item" check — no standalone
     * unit_price, priced entirely from its `prices` tiers. Mirrors the
     * module-scope `isPackageItem()`. Note `calculateTierPrice()` /
     * `activeDiscountType()` in JS shadow this with a *different*,
     * UOM-selection-based local of the same name — see
     * `isUomSelectedPackage()` below for that one.
     */
    private static function isPackageItem(Item $item): bool
    {
        return (float) $item->unit_price === 0.0 && ! empty($item->prices);
    }

    /**
     * The JS local (re)definition of "isPackageItem" inside
     * `calculateTierPrice()` / `activeDiscountType()`: no unit_price AND the
     * caller explicitly selected a UOM — used there to decide whether tier
     * matching should scope to that UOM. Deliberately not the same
     * condition as `isPackageItem()` above.
     */
    private static function isUomSelectedPackage(Item $item, ?string $selectedUom): bool
    {
        return (float) $item->unit_price === 0.0 && $selectedUom !== null;
    }

    /** Mirrors `effectiveUnitPrice()`. */
    private static function effectiveUnitPrice(Item $item): float
    {
        return (float) ($item->discounted_price ?? $item->unit_price ?? 0);
    }

    /** Mirrors `hasDiscount()`. */
    public static function hasDiscount(Item $item): bool
    {
        if (self::isPackageItem($item)) {
            return (float) $item->discount > 0;
        }

        return $item->discounted_price !== null;
    }

    /** Mirrors `hasFakePrice()`. */
    public static function hasFakePrice(Item $item): bool
    {
        return $item->fake_price !== null && (float) $item->fake_price > 0;
    }

    /**
     * Struck-through reference price. Mirrors `getOriginalPrice()`.
     */
    public static function originalPrice(Item $item): ?float
    {
        if (self::isPackageItem($item)) {
            if (! self::hasDiscount($item)) {
                return null;
            }

            $cheapest = self::visiblePrices($item)[0] ?? null;

            return $cheapest !== null ? (float) $cheapest['price'] : null;
        }

        if (self::hasDiscount($item)) {
            return self::hasFakePrice($item) ? (float) $item->fake_price : (float) $item->unit_price;
        }

        if (self::hasFakePrice($item)) {
            return (float) $item->fake_price;
        }

        return null;
    }

    /**
     * Applies the discount matching a tier's price group. Mirrors
     * `discountedTierPrice()`.
     *
     * @param  array<string, mixed>  $tier
     */
    private static function discountedTierPrice(Item $item, array $tier): float
    {
        $priceGroup = $tier['priceGroup'] ?? 'Retail';

        $percent = (float) match ($priceGroup) {
            'Retail' => $item->discount,
            'VIP' => $item->vip_discount_percent,
            default => $item->wholesale_discount_percent,
        };

        $price = (float) $tier['price'];

        return $percent > 0 ? $price * (1 - $percent / 100) : $price;
    }

    /**
     * Highest-custMinQuantity tier the given qty still qualifies for,
     * optionally scoped to a UOM. Mirrors `matchTier()`.
     *
     * @param  array<int, array<string, mixed>>  $prices
     * @return array<string, mixed>|null
     */
    private static function matchTier(array $prices, int $qty, ?string $uom = null): ?array
    {
        return collect($prices)
            ->filter(fn (array $p) => $uom === null || ($p['UOM'] ?? null) === $uom)
            ->sortByDesc(fn (array $p) => (float) ($p['custMinQuantity'] ?? 0))
            ->first(fn (array $p) => $qty >= (float) ($p['custMinQuantity'] ?? 0));
    }

    /**
     * The price actually charged for a quantity/UOM. Mirrors
     * `calculateTierPrice()`.
     */
    public static function tierPrice(Item $item, int $qty, ?string $selectedUom = null, bool $isVip = false): float
    {
        if (empty($item->prices)) {
            return self::effectiveUnitPrice($item);
        }

        $isPackage = self::isUomSelectedPackage($item, $selectedUom);

        $prices = $isVip
            ? $item->prices
            : collect($item->prices)->reject(fn (array $p) => ($p['priceGroup'] ?? null) === 'VIP')->values()->all();

        $tier = self::matchTier($prices, $qty, $isPackage ? $selectedUom : null);

        if (! $isPackage && ($tier === null || ($tier['priceGroup'] ?? 'Retail') === 'Retail')) {
            return self::effectiveUnitPrice($item);
        }

        if ($tier === null) {
            return 0.0;
        }

        return self::discountedTierPrice($item, $tier);
    }

    /**
     * Which discount is actually active for a quantity/UOM right now.
     * Mirrors `activeDiscountType()`.
     */
    public static function activeDiscountType(Item $item, int $qty, ?string $selectedUom = null, bool $isVip = false): ?string
    {
        if (empty($item->prices)) {
            return (float) $item->discount > 0 ? 'retail' : null;
        }

        $isPackage = self::isUomSelectedPackage($item, $selectedUom);

        $prices = $isVip
            ? $item->prices
            : collect($item->prices)->reject(fn (array $p) => ($p['priceGroup'] ?? null) === 'VIP')->values()->all();

        $tier = self::matchTier($prices, $qty, $isPackage ? $selectedUom : null);

        if (! $isPackage && ($tier === null || ($tier['priceGroup'] ?? 'Retail') === 'Retail')) {
            return (float) $item->discount > 0 ? 'retail' : null;
        }

        if ($tier === null) {
            return null;
        }

        $priceGroup = $tier['priceGroup'] ?? 'Retail';

        if ($priceGroup === 'Retail') {
            return (float) $item->discount > 0 ? 'retail' : null;
        }

        if ($priceGroup === 'VIP') {
            return (float) $item->vip_discount_percent > 0 ? 'vip' : null;
        }

        return (float) $item->wholesale_discount_percent > 0 ? 'wholesale' : null;
    }

    /**
     * Reference "retail" price, used only to display wholesale/VIP savings.
     * Mirrors `getRetailPrice()`.
     */
    public static function retailPrice(Item $item, ?string $selectedUom = null): ?float
    {
        if ((float) $item->unit_price > 0) {
            return self::effectiveUnitPrice($item);
        }

        if ($selectedUom === null || empty($item->prices)) {
            return null;
        }

        $retailTier = collect($item->prices)
            ->first(fn (array $p) => ($p['UOM'] ?? null) === $selectedUom && ($p['priceGroup'] ?? 'Retail') === 'Retail');

        return $retailTier !== null ? self::discountedTierPrice($item, $retailTier) : null;
    }
}
