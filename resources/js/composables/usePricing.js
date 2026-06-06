import { computed, toValue } from 'vue'

// Plain helpers for use inside v-for loops (SearchBar, etc.)
export function getDisplayPrice(item) {
    return item?.unit_price == 0 && item?.prices?.length
        ? item.prices[0]?.price ?? null
        : item?.unit_price
}

export function getDisplayUOM(item) {
    return item?.unit_price == 0 && item?.prices?.length
        ? item.prices[0]?.UOM ?? null
        : null
}

// Pass item as a getter: usePricing(() => props.item)
// Prices are sorted by price ASC from the seeder, so prices[0] is always cheapest.
export function usePricing(item) {
    const get = () => toValue(item)

    const isPackageItem = computed(() => {
        const i = get()
        return i?.unit_price == 0 && i?.prices?.length > 0
    })

    const prices = computed(() => get()?.prices ?? [])

    const displayPrice = computed(() =>
        isPackageItem.value ? prices.value[0]?.price ?? null : get()?.unit_price
    )

    const displayUOM = computed(() =>
        isPackageItem.value ? prices.value[0]?.UOM ?? null : null
    )

    return { isPackageItem, prices, displayPrice, displayUOM }
}