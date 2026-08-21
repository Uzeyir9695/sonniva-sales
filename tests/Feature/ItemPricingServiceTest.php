<?php

use App\Models\Item;
use App\Services\ItemPricingService;
use Illuminate\Support\Str;

/**
 * Mirrors usePricing.js's own behavior 1:1 — see ItemPricingService's
 * docblock. Each test names the JS function it's pinning down.
 */
function makePricingItem(array $overrides = []): Item
{
    return Item::create(array_merge([
        'no' => Str::random(10),
        'category_code' => 'test-category',
        'name' => 'Test Item',
        'slug' => 'test-item-'.Str::random(8),
        'inventory' => 5,
        'unit_price' => 100,
        'discount' => 0,
        'fake_price' => null,
        'wholesale_discount_percent' => 0,
        'vip_discount_percent' => 0,
        'prices' => [],
    ], $overrides));
}

describe('a plain (non-package) item', function () {
    it('charges unit_price when there is no discount', function () {
        $item = makePricingItem(['unit_price' => 100]);

        expect(ItemPricingService::tierPrice($item, 1))->toBe(100.0)
            ->and(ItemPricingService::originalPrice($item))->toBeNull()
            ->and(ItemPricingService::activeDiscountType($item, 1))->toBeNull();
    });

    it('charges the discounted price and shows unit_price struck through', function () {
        $item = makePricingItem(['unit_price' => 100, 'discount' => 20]);

        expect(ItemPricingService::tierPrice($item, 1))->toBe(80.0)
            ->and(ItemPricingService::originalPrice($item))->toBe(100.0)
            ->and(ItemPricingService::activeDiscountType($item, 1))->toBe('retail');
    });

    it('discounts off fake_price instead of unit_price when both are set', function () {
        $item = makePricingItem(['unit_price' => 100, 'fake_price' => 150, 'discount' => 20]);

        // Item::getDiscountedPriceAttribute() bases the discount off fake_price
        // when set — ItemPricingService reads that accessor, not unit_price directly.
        expect(ItemPricingService::tierPrice($item, 1))->toBe(120.0)
            ->and(ItemPricingService::originalPrice($item))->toBe(150.0);
    });

    it('shows fake_price struck through with no real discount (a discount illusion, not a charge)', function () {
        $item = makePricingItem(['unit_price' => 100, 'fake_price' => 150, 'discount' => 0]);

        expect(ItemPricingService::tierPrice($item, 1))->toBe(100.0)
            ->and(ItemPricingService::originalPrice($item))->toBe(150.0)
            ->and(ItemPricingService::activeDiscountType($item, 1))->toBeNull();
    });
});

describe('a package (UOM-tiered) item', function () {
    // Distinct custMinQuantity per tier — deliberately no ties. matchTier()
    // picks the highest-custMinQuantity tier a quantity qualifies for; two
    // tiers tied at the same threshold would make the "which wins" answer
    // depend on stable-sort/array order instead of the quantity actually
    // being tested, which isn't something worth pinning a test to.
    function packagePrices(): array
    {
        return [
            ['priceGroup' => 'Retail', 'price' => 50, 'custMinQuantity' => 1, 'UOM' => 'box'],
            ['priceGroup' => 'VIP', 'price' => 30, 'custMinQuantity' => 10, 'UOM' => 'box'],
            ['priceGroup' => 'Wholesales', 'price' => 35, 'custMinQuantity' => 20, 'UOM' => 'box'],
        ];
    }

    it('has no standalone price and charges the matched Retail tier below any tier threshold', function () {
        $item = makePricingItem(['unit_price' => 0, 'prices' => packagePrices()]);

        expect(ItemPricingService::tierPrice($item, 1, 'box'))->toBe(50.0);
    });

    it('matches the Wholesale tier once quantity reaches it, for a non-VIP viewer', function () {
        $item = makePricingItem(['unit_price' => 0, 'prices' => packagePrices(), 'wholesale_discount_percent' => 10]);

        expect(ItemPricingService::tierPrice($item, 20, 'box', isVip: false))->toBe(31.5) // 35 * 0.9
            ->and(ItemPricingService::activeDiscountType($item, 20, 'box', isVip: false))->toBe('wholesale');
    });

    it('never reaches the VIP tier for a non-VIP viewer, even at a qualifying quantity', function () {
        $item = makePricingItem(['unit_price' => 0, 'prices' => packagePrices(), 'vip_discount_percent' => 5]);

        // qty 10 qualifies for VIP's threshold but not Wholesale's (20) —
        // a non-VIP viewer should fall back to Retail, not see VIP at all.
        expect(ItemPricingService::tierPrice($item, 10, 'box', isVip: false))->toBe(50.0)
            ->and(ItemPricingService::activeDiscountType($item, 10, 'box', isVip: false))->toBeNull();
    });

    it('matches the VIP tier once quantity reaches it, for a VIP viewer', function () {
        $item = makePricingItem(['unit_price' => 0, 'prices' => packagePrices(), 'vip_discount_percent' => 5]);

        expect(ItemPricingService::tierPrice($item, 10, 'box', isVip: true))->toBe(28.5) // 30 * 0.95
            ->and(ItemPricingService::activeDiscountType($item, 10, 'box', isVip: true))->toBe('vip');
    });

    it('is nothing to sell at when no tier matches', function () {
        $item = makePricingItem(['unit_price' => 0, 'prices' => packagePrices()]);

        expect(ItemPricingService::tierPrice($item, 5, 'pallet'))->toBe(0.0);
    });

    it('shows the cheapest tier struck through as the original price only when discounted', function () {
        $item = makePricingItem(['unit_price' => 0, 'prices' => packagePrices()]);

        // No discount field set on the tiers themselves in this fixture, so
        // hasDiscount() is false for a package item unless `discount` > 0.
        expect(ItemPricingService::originalPrice($item))->toBeNull();

        $item->discount = 15;
        expect(ItemPricingService::originalPrice($item))->toBe(50.0); // cheapest visible tier
    });

    it('reports the first matching Retail-tier price for savings comparisons (qty-agnostic, like getRetailPrice in JS)', function () {
        $item = makePricingItem(['unit_price' => 0, 'prices' => packagePrices()]);

        // JS's .find() takes the FIRST Retail/UOM match regardless of
        // custMinQuantity or the quantity being priced — packagePrices()
        // only has one Retail 'box' tier (price 50), so this can't
        // distinguish "first" from "only", but the qty-agnostic contract
        // (no qty param at all) is the behavior worth documenting.
        expect(ItemPricingService::retailPrice($item, 'box'))->toBe(50.0)
            ->and(ItemPricingService::retailPrice($item, 'pallet'))->toBeNull();
    });
});
