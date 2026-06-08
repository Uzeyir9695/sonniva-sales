import { inject } from "vue";
var PrimeVueConfirmSymbol = /* @__PURE__ */ Symbol();
function useConfirm() {
  var PrimeVueConfirm = inject(PrimeVueConfirmSymbol);
  if (!PrimeVueConfirm) {
    throw new Error("No PrimeVue Confirmation provided!");
  }
  return PrimeVueConfirm;
}
export {
  PrimeVueConfirmSymbol as P,
  useConfirm as u
};
//# sourceMappingURL=index-DPwr32It.js.map
