import { computed, toValue } from "vue";
function visiblePrices(item) {
  return (item?.prices ?? []).filter((p) => p.priceGroup !== "Wholesales");
}
function effectiveUnitPrice(item) {
  return item?.discounted_price ?? item?.unit_price ?? 0;
}
function hasDiscount(item) {
  return item?.discounted_price != null;
}
function getOriginalPrice(item) {
  return item?.unit_price ?? null;
}
function calculateTierPrice(item, qty, selectedUOM = null, isVip = false) {
  if (!item) return 0;
  if (!item.prices?.length) return effectiveUnitPrice(item);
  const prices = isVip ? item.prices : item.prices.filter((p) => p.priceGroup !== "VIP");
  if (item.unit_price == 0 && selectedUOM) {
    const entry = [...prices].filter((p) => p.UOM === selectedUOM).sort((a, b) => b.custMinQuantity - a.custMinQuantity).find((p) => qty >= p.custMinQuantity);
    return entry?.price ?? 0;
  }
  const tier = [...prices].sort((a, b) => b.custMinQuantity - a.custMinQuantity).find((p) => qty >= p.custMinQuantity);
  if (!tier || tier.priceGroup === "Retail") return effectiveUnitPrice(item);
  return tier.price;
}
function getDisplayPrice(item) {
  if (item?.unit_price != 0) return effectiveUnitPrice(item);
  const prices = visiblePrices(item);
  return prices[0]?.price ?? null;
}
function getDisplayUOM(item) {
  if (item?.unit_price != 0) return null;
  const prices = visiblePrices(item);
  return prices[0]?.UOM ?? null;
}
function usePricing(item) {
  const get = () => toValue(item);
  const isPackageItem = computed(() => {
    const i = get();
    return i?.unit_price == 0 && i?.prices?.length > 0;
  });
  const prices = computed(
    () => (get()?.prices ?? []).filter((p) => p.priceGroup !== "Wholesales" && p.priceGroup !== "VIP")
  );
  const displayPrice = computed(
    () => isPackageItem.value ? prices.value[0]?.price ?? null : effectiveUnitPrice(get())
  );
  const displayUOM = computed(
    () => isPackageItem.value ? prices.value[0]?.UOM ?? null : null
  );
  const itemHasDiscount = computed(() => !isPackageItem.value && hasDiscount(get()));
  const originalPrice = computed(
    () => itemHasDiscount.value ? get()?.unit_price : null
  );
  return { isPackageItem, prices, displayPrice, displayUOM, hasDiscount: itemHasDiscount, originalPrice };
}
export {
  getDisplayUOM as a,
  getOriginalPrice as b,
  calculateTierPrice as c,
  getDisplayPrice as g,
  hasDiscount as h,
  usePricing as u
};
//# sourceMappingURL=usePricing-oDne5BPU.js.map
