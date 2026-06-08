import { inject } from "vue";
var PrimeVueToastSymbol = /* @__PURE__ */ Symbol();
function useToast() {
  var PrimeVueToast = inject(PrimeVueToastSymbol);
  if (!PrimeVueToast) {
    throw new Error("No PrimeVue Toast provided!");
  }
  return PrimeVueToast;
}
export {
  PrimeVueToastSymbol as P,
  useToast as u
};
//# sourceMappingURL=index-Qb24q4w2.js.map
