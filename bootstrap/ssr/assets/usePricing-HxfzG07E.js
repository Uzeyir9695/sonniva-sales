import { computed, toValue } from "vue";
function visiblePrices(item) {
  return (item?.prices ?? []).filter((p) => p.priceGroup !== "Wholesales");
}
function calculateTierPrice(item, qty, selectedUOM = null, isVip = false) {
  if (!item) return 0;
  if (!item.prices?.length) return item.unit_price ?? 0;
  const prices = isVip ? item.prices : item.prices.filter((p) => p.priceGroup !== "VIP");
  if (item.unit_price == 0 && selectedUOM) {
    const entry = [...prices].filter((p) => p.UOM === selectedUOM).sort((a, b) => b.custMinQuantity - a.custMinQuantity).find((p) => qty >= p.custMinQuantity);
    return entry?.price ?? 0;
  }
  const tier = [...prices].sort((a, b) => b.custMinQuantity - a.custMinQuantity).find((p) => qty >= p.custMinQuantity);
  return tier?.price ?? item.unit_price;
}
function getDisplayPrice(item) {
  if (item?.unit_price != 0) return item?.unit_price;
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
    () => isPackageItem.value ? prices.value[0]?.price ?? null : get()?.unit_price
  );
  const displayUOM = computed(
    () => isPackageItem.value ? prices.value[0]?.UOM ?? null : null
  );
  return { isPackageItem, prices, displayPrice, displayUOM };
}
export {
  getDisplayUOM as a,
  calculateTierPrice as c,
  getDisplayPrice as g,
  usePricing as u
};
//# sourceMappingURL=usePricing-HxfzG07E.js.map
