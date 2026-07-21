import { computed, toValue } from 'vue'

// Plain helper for use inside v-for loops (SearchBar, etc.) - only the Retail tier is ever
// shown to anonymous/regular browsers, Wholesale and VIP prices are never public.
function visiblePrices(item) {
    return (item?.prices ?? []).filter(p => p.priceGroup !== 'Wholesales' && p.priceGroup !== 'VIP')
}

function isPackageItem(item) {
    return item?.unit_price == 0 && item?.prices?.length > 0
}

// `discounted_price` is computed on the backend (Item::getDiscountedPriceAttribute) from
// unit_price + discount%. Discount only ever applies to unit_price, never to package/tiered prices.
function effectiveUnitPrice(item) {
    return item?.discounted_price ?? item?.unit_price ?? 0
}

// Package items have no `discounted_price` accessor (that's a normal-item/unit_price concept),
// but the same `discount` field still applies to their Retail tier price (see discountedTierPrice).
export function hasDiscount(item) {
    if (isPackageItem(item)) return Number(item?.discount) > 0
    return item?.discounted_price != null
}

// fake_price is an admin-set display price, always higher than unit_price. When a real
// discount also exists, the backend already computes discounted_price off fake_price instead
// of unit_price (see Item::getDiscountedPriceAttribute), so effectiveUnitPrice/calculateTierPrice
// pick that up automatically with no change here - that combined case is genuinely chargeable,
// not fake. Only the fake-price-with-no-discount case is display-only: shown price is fake_price,
// but the real charge stays unit_price (effectiveUnitPrice falls through to unit_price since
// there's no discounted_price to prefer).
export function hasFakePrice(item) {
    return item?.fake_price != null && Number(item.fake_price) > 0
}

// Struck-through reference price: the raw (undiscounted) price of the cheapest visible tier for
// package items; for normal items, fake_price when there's no real discount to override it, else
// unit_price for a plain discount, else the fake_price the discount was computed from.
export function getOriginalPrice(item) {
    if (isPackageItem(item)) {
        return hasDiscount(item) ? visiblePrices(item)[0]?.price ?? null : null
    }
    if (hasDiscount(item)) return hasFakePrice(item) ? item.fake_price : item.unit_price
    if (hasFakePrice(item)) return item.fake_price
    return null
}

// Applies the discount matching a price tier's group: Retail uses the item's own `discount`,
// Wholesale and VIP each use their own dedicated discount field instead. Package items are
// always priced this way (they have no standalone unit_price); normal items only reach here
// once a genuine Wholesale/VIP tier is matched.
export function discountedTierPrice(item, tier) {
    const priceGroup = tier.priceGroup ?? 'Retail'
    const percent = Number(
        priceGroup === 'Retail' ? item?.discount
            : priceGroup === 'VIP' ? item?.vip_discount_percent
                : item?.wholesale_discount_percent
    ) || 0

    const price = Number(tier.price)
    return percent > 0 ? price * (1 - percent / 100) : price
}

// Highest-custMinQuantity tier the given qty still qualifies for, optionally scoped to a UOM.
function matchTier(prices, qty, uom = null) {
    return [...prices]
        .filter(p => !uom || p.UOM === uom)
        .sort((a, b) => b.custMinQuantity - a.custMinQuantity)
        .find(p => qty >= p.custMinQuantity)
}

// Resolves the price actually charged for a quantity/UOM. Package items (unit_price = 0) are
// always priced from their matched UOM tier; normal items use their own unit_price/discount
// unless a Wholesale/VIP tier is matched.
export function calculateTierPrice(item, qty, selectedUOM = null, isVip = false) {
    if (!item) return 0
    if (!item.prices?.length) return effectiveUnitPrice(item)

    const isPackageItem = item.unit_price == 0 && selectedUOM

    const prices = isVip
        ? item.prices
        : item.prices.filter(p => p.priceGroup !== 'VIP')

    const tier = matchTier(prices, qty, isPackageItem ? selectedUOM : null)

    // Normal items: a Retail tier (or no match) is a plain retail purchase - the item's own
    // unit_price/discount is authoritative, any Retail tier entry is not used as the price.
    if (!isPackageItem && (!tier || tier.priceGroup === 'Retail')) return effectiveUnitPrice(item)

    // Package items have no standalone price - nothing matched means nothing to sell at.
    if (!tier) return 0

    return discountedTierPrice(item, tier)
}

// Which discount is actually active for a quantity/UOM right now: 'retail', 'wholesale', 'vip',
// or null if none applies. Mirrors calculateTierPrice's own tier-matching branch for branch, so
// the badge shown always agrees with the price actually charged.
export function activeDiscountType(item, qty, selectedUOM = null, isVip = false) {
    if (!item) return null
    if (!item.prices?.length) return Number(item.discount) > 0 ? 'retail' : null

    const isPackageItem = item.unit_price == 0 && selectedUOM

    const prices = isVip
        ? item.prices
        : item.prices.filter(p => p.priceGroup !== 'VIP')

    const tier = matchTier(prices, qty, isPackageItem ? selectedUOM : null)

    if (!isPackageItem && (!tier || tier.priceGroup === 'Retail')) {
        return Number(item.discount) > 0 ? 'retail' : null
    }

    if (!tier) return null

    const priceGroup = tier.priceGroup ?? 'Retail'
    if (priceGroup === 'Retail') return Number(item.discount) > 0 ? 'retail' : null
    if (priceGroup === 'VIP') return Number(item.vip_discount_percent) > 0 ? 'vip' : null
    return Number(item.wholesale_discount_percent) > 0 ? 'wholesale' : null
}

// Reference "retail" price used only to display wholesale/VIP savings - the price the customer
// would pay for the same item at the Retail tier, discount included.
export function getRetailPrice(item, selectedUOM = null) {
    if (item.unit_price > 0) return effectiveUnitPrice(item)
    if (!selectedUOM || !item.prices?.length) return null
    const retailTier = item.prices.find(p => p.UOM === selectedUOM && (p.priceGroup ?? 'Retail') === 'Retail')
    return retailTier ? discountedTierPrice(item, retailTier) : null
}

export function getDisplayPrice(item) {
    if (item?.unit_price != 0) {
        if (hasFakePrice(item) && !hasDiscount(item)) return item.fake_price
        return effectiveUnitPrice(item)
    }
    const cheapest = visiblePrices(item)[0]
    return cheapest ? discountedTierPrice(item, cheapest) : null
}

export function getDisplayUOM(item) {
    if (item?.unit_price != 0) return null
    return visiblePrices(item)[0]?.UOM ?? null
}

// Pass item as a getter: usePricing(() => props.item)
// Prices are sorted by price ASC from the seeder, so prices[0] is always cheapest.
export function usePricing(item) {
    const get = () => toValue(item)

    const isPackageItem = computed(() => {
        const i = get()
        return i?.unit_price == 0 && i?.prices?.length > 0
    })

    const prices = computed(() => visiblePrices(get()))

    // Fake-only (no real discount) shows fake_price as the current price; every other case
    // (real discount with or without fake_price, or neither) is already correct via
    // effectiveUnitPrice, since discounted_price itself is fake-price-aware on the backend.
    const displayPrice = computed(() => {
        if (isPackageItem.value) {
            const cheapest = prices.value[0]
            return cheapest ? discountedTierPrice(get(), cheapest) : null
        }
        const i = get()
        if (hasFakePrice(i) && !hasDiscount(i)) return i.fake_price
        return effectiveUnitPrice(i)
    })

    const displayUOM = computed(() =>
        isPackageItem.value ? prices.value[0]?.UOM ?? null : null
    )

    const itemHasDiscount = computed(() => hasDiscount(get()))

    // Struck-through reference price - covers real discounts (normal or package items) and the
    // fake-price-only case (normal items only).
    const originalPrice = computed(() => getOriginalPrice(get()))

    return { isPackageItem, prices, displayPrice, displayUOM, hasDiscount: itemHasDiscount, originalPrice }
}