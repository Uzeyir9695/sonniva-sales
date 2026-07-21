import { computed, toValue } from "vue";
function visiblePrices(item) {
  return (item?.prices ?? []).filter((p) => p.priceGroup !== "Wholesales" && p.priceGroup !== "VIP");
}
function isPackageItem(item) {
  return item?.unit_price == 0 && item?.prices?.length > 0;
}
function effectiveUnitPrice(item) {
  return item?.discounted_price ?? item?.unit_price ?? 0;
}
function hasDiscount(item) {
  if (isPackageItem(item)) return Number(item?.discount) > 0;
  return item?.discounted_price != null;
}
function hasFakePrice(item) {
  return item?.fake_price != null && Number(item.fake_price) > 0;
}
function getOriginalPrice(item) {
  if (isPackageItem(item)) {
    return hasDiscount(item) ? visiblePrices(item)[0]?.price ?? null : null;
  }
  if (hasDiscount(item)) return hasFakePrice(item) ? item.fake_price : item.unit_price;
  if (hasFakePrice(item)) return item.fake_price;
  return null;
}
function discountedTierPrice(item, tier) {
  const priceGroup = tier.priceGroup ?? "Retail";
  const percent = Number(
    priceGroup === "Retail" ? item?.discount : priceGroup === "VIP" ? item?.vip_discount_percent : item?.wholesale_discount_percent
  ) || 0;
  const price = Number(tier.price);
  return percent > 0 ? price * (1 - percent / 100) : price;
}
function matchTier(prices, qty, uom = null) {
  return [...prices].filter((p) => !uom || p.UOM === uom).sort((a, b) => b.custMinQuantity - a.custMinQuantity).find((p) => qty >= p.custMinQuantity);
}
function calculateTierPrice(item, qty, selectedUOM = null, isVip = false) {
  if (!item) return 0;
  if (!item.prices?.length) return effectiveUnitPrice(item);
  const isPackageItem2 = item.unit_price == 0 && selectedUOM;
  const prices = isVip ? item.prices : item.prices.filter((p) => p.priceGroup !== "VIP");
  const tier = matchTier(prices, qty, isPackageItem2 ? selectedUOM : null);
  if (!isPackageItem2 && (!tier || tier.priceGroup === "Retail")) return effectiveUnitPrice(item);
  if (!tier) return 0;
  return discountedTierPrice(item, tier);
}
function activeDiscountType(item, qty, selectedUOM = null, isVip = false) {
  if (!item) return null;
  if (!item.prices?.length) return Number(item.discount) > 0 ? "retail" : null;
  const isPackageItem2 = item.unit_price == 0 && selectedUOM;
  const prices = isVip ? item.prices : item.prices.filter((p) => p.priceGroup !== "VIP");
  const tier = matchTier(prices, qty, isPackageItem2 ? selectedUOM : null);
  if (!isPackageItem2 && (!tier || tier.priceGroup === "Retail")) {
    return Number(item.discount) > 0 ? "retail" : null;
  }
  if (!tier) return null;
  const priceGroup = tier.priceGroup ?? "Retail";
  if (priceGroup === "Retail") return Number(item.discount) > 0 ? "retail" : null;
  if (priceGroup === "VIP") return Number(item.vip_discount_percent) > 0 ? "vip" : null;
  return Number(item.wholesale_discount_percent) > 0 ? "wholesale" : null;
}
function getRetailPrice(item, selectedUOM = null) {
  if (item.unit_price > 0) return effectiveUnitPrice(item);
  if (!selectedUOM || !item.prices?.length) return null;
  const retailTier = item.prices.find((p) => p.UOM === selectedUOM && (p.priceGroup ?? "Retail") === "Retail");
  return retailTier ? discountedTierPrice(item, retailTier) : null;
}
function getDisplayPrice(item) {
  if (item?.unit_price != 0) {
    if (hasFakePrice(item) && !hasDiscount(item)) return item.fake_price;
    return effectiveUnitPrice(item);
  }
  const cheapest = visiblePrices(item)[0];
  return cheapest ? discountedTierPrice(item, cheapest) : null;
}
function getDisplayUOM(item) {
  if (item?.unit_price != 0) return null;
  return visiblePrices(item)[0]?.UOM ?? null;
}
function usePricing(item) {
  const get = () => toValue(item);
  const isPackageItem2 = computed(() => {
    const i = get();
    return i?.unit_price == 0 && i?.prices?.length > 0;
  });
  const prices = computed(() => visiblePrices(get()));
  const displayPrice = computed(() => {
    if (isPackageItem2.value) {
      const cheapest = prices.value[0];
      return cheapest ? discountedTierPrice(get(), cheapest) : null;
    }
    const i = get();
    if (hasFakePrice(i) && !hasDiscount(i)) return i.fake_price;
    return effectiveUnitPrice(i);
  });
  const displayUOM = computed(
    () => isPackageItem2.value ? prices.value[0]?.UOM ?? null : null
  );
  const itemHasDiscount = computed(() => hasDiscount(get()));
  const originalPrice = computed(() => getOriginalPrice(get()));
  return { isPackageItem: isPackageItem2, prices, displayPrice, displayUOM, hasDiscount: itemHasDiscount, originalPrice };
}
export {
  activeDiscountType as a,
  getDisplayUOM as b,
  calculateTierPrice as c,
  discountedTierPrice as d,
  getOriginalPrice as e,
  getRetailPrice as f,
  getDisplayPrice as g,
  usePricing as u
};
//# sourceMappingURL=usePricing-ssZPWxiP.js.map
