import { computed, toValue } from 'vue'

// Plain helpers for use inside v-for loops (SearchBar, etc.)
function visiblePrices(item) {
    return (item?.prices ?? []).filter(p => p.priceGroup !== 'Wholesales')
}

// `discounted_price` is computed on the backend (Item::getDiscountedPriceAttribute) from
// unit_price + discount%. Discount only ever applies to unit_price, never to package/tiered prices.
function effectiveUnitPrice(item) {
    return item?.discounted_price ?? item?.unit_price ?? 0
}

export function hasDiscount(item) {
    return item?.discounted_price != null
}

export function getOriginalPrice(item) {
    return item?.unit_price ?? null
}

export function calculateTierPrice(item, qty, selectedUOM = null, isVip = false) {
    if (!item) return 0
    if (!item.prices?.length) return effectiveUnitPrice(item)

    const prices = isVip
        ? item.prices
        : item.prices.filter(p => p.priceGroup !== 'VIP')

    if (item.unit_price == 0 && selectedUOM) {
        const entry = [...prices]
            .filter(p => p.UOM === selectedUOM)
            .sort((a, b) => b.custMinQuantity - a.custMinQuantity)
            .find(p => qty >= p.custMinQuantity)
        return entry?.price ?? 0
    }

    const tier = [...prices]
        .sort((a, b) => b.custMinQuantity - a.custMinQuantity)
        .find(p => qty >= p.custMinQuantity)

    // Retail-tier (or no tier matched) is a plain retail purchase, so the discount applies.
    // Wholesale/VIP tiers are already preferential pricing and keep their raw price.
    if (!tier || tier.priceGroup === 'Retail') return effectiveUnitPrice(item)
    return tier.price
}

export function getDisplayPrice(item) {
    if (item?.unit_price != 0) return effectiveUnitPrice(item)
    const prices = visiblePrices(item)
    return prices[0]?.price ?? null
}

export function getDisplayUOM(item) {
    if (item?.unit_price != 0) return null
    const prices = visiblePrices(item)
    return prices[0]?.UOM ?? null
}

// Pass item as a getter: usePricing(() => props.item)
// Prices are sorted by price ASC from the seeder, so prices[0] is always cheapest.
export function usePricing(item) {
    const get = () => toValue(item)

    const isPackageItem = computed(() => {
        const i = get()
        return i?.unit_price == 0 && i?.prices?.length > 0
    })

    const prices = computed(() =>
        (get()?.prices ?? []).filter(p => p.priceGroup !== 'Wholesales' && p.priceGroup !== 'VIP')
    )

    const displayPrice = computed(() =>
        isPackageItem.value ? prices.value[0]?.price ?? null : effectiveUnitPrice(get())
    )

    const displayUOM = computed(() =>
        isPackageItem.value ? prices.value[0]?.UOM ?? null : null
    )

    // Discount only applies to unit_price items, never package/tiered ones.
    const itemHasDiscount = computed(() => !isPackageItem.value && hasDiscount(get()))

    const originalPrice = computed(() =>
        itemHasDiscount.value ? get()?.unit_price : null
    )

    return { isPackageItem, prices, displayPrice, displayUOM, hasDiscount: itemHasDiscount, originalPrice }
}