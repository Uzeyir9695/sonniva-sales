const formatDiscount = (value) => {
  const number = Number(value);
  if (isNaN(number)) return 0;
  return Math.round(number);
};
const formatNumber = (value, locale = "en-US") => {
  if (value === null || value === void 0 || value === "") return "0.00";
  const number = Number(value);
  if (isNaN(number)) return "0.00";
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    useGrouping: true
  }).format(number);
};
export {
  formatNumber as a,
  formatDiscount as f
};
//# sourceMappingURL=numberFormat-BgUHwZc2.js.map
