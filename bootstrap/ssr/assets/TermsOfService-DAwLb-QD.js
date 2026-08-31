import { unref, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { Head } from "@inertiajs/vue3";
import { useI18n } from "vue-i18n";
const _sfc_main = {
  __name: "TermsOfService",
  __ssrInlineRender: true,
  setup(__props) {
    const { tm, rt, locale } = useI18n();
    function list(key) {
      void locale.value;
      return tm(`pol.terms.${key}`).map(rt);
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: _ctx.$t("pol.terms.title")
      }, null, _parent));
      _push(`<div class="max-w-3xl mx-auto px-4 py-10 sm:py-16"><div class="mb-10 border-b border-gray-200 pb-6"><h1 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">${ssrInterpolate(_ctx.$t("pol.terms.title"))}</h1></div><div class="space-y-10 text-gray-700 text-[15px] leading-8"><section><h2 class="text-lg font-semibold text-gray-900 mb-4">${ssrInterpolate(_ctx.$t("pol.terms.paymentH"))}</h2><div class="space-y-5"><div class="rounded-xl border border-gray-200 p-4"><h3 class="font-semibold text-gray-800 mb-2">${ssrInterpolate(_ctx.$t("pol.terms.payCardH"))}</h3><p class="mb-3">${ssrInterpolate(_ctx.$t("pol.terms.payCardIntro"))}</p><ul class="space-y-1.5 mb-3"><!--[-->`);
      ssrRenderList(["VISA", "MasterCard", "American Express"], (c) => {
        _push(`<li class="flex items-start gap-2"><span class="mt-2 w-1.5 h-1.5 rounded-full bg-brand-500 shrink-0"></span>${ssrInterpolate(c)}</li>`);
      });
      _push(`<!--]--></ul><p>${ssrInterpolate(_ctx.$t("pol.terms.payCardOutro"))}</p></div><div class="rounded-xl border border-gray-200 p-4"><h3 class="font-semibold text-gray-800 mb-2">${ssrInterpolate(_ctx.$t("pol.terms.payTransferH"))}</h3><p>${ssrInterpolate(_ctx.$t("pol.terms.payTransferP1"))}</p><p class="mt-2">${ssrInterpolate(_ctx.$t("pol.terms.payTransferP2"))}</p></div><div class="rounded-xl border border-gray-200 p-4"><h3 class="font-semibold text-gray-800 mb-2">${ssrInterpolate(_ctx.$t("pol.terms.payContractH"))}</h3><p>${ssrInterpolate(_ctx.$t("pol.terms.payContractP"))}</p></div></div></section><section><h2 class="text-lg font-semibold text-gray-900 mb-4">${ssrInterpolate(_ctx.$t("pol.terms.deliveryH"))}</h2><div class="space-y-5"><div class="rounded-xl border border-gray-200 p-4"><h3 class="font-semibold text-gray-800 mb-2">${ssrInterpolate(_ctx.$t("pol.terms.delFreeH"))}</h3><p>${ssrInterpolate(_ctx.$t("pol.terms.delFreeP"))}</p></div><div class="rounded-xl border border-gray-200 p-4"><h3 class="font-semibold text-gray-800 mb-2">${ssrInterpolate(_ctx.$t("pol.terms.delRegionsH"))}</h3><p>${ssrInterpolate(_ctx.$t("pol.terms.delRegionsP"))}</p></div><div><h3 class="font-semibold text-gray-800 mb-3">${ssrInterpolate(_ctx.$t("pol.terms.delZonesH"))}</h3><div class="space-y-3"><!--[-->`);
      ssrRenderList([1, 2, 3], (z) => {
        _push(`<div class="rounded-xl border border-gray-200 p-4"><p class="font-semibold text-gray-800 mb-2">${ssrInterpolate(_ctx.$t(`pol.terms.zone${z}`))}</p><ul class="space-y-1 text-sm"><!--[-->`);
        ssrRenderList(list(`zone${z}Items`), (n) => {
          _push(`<li class="flex items-start gap-2"><span class="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-500 shrink-0"></span>${ssrInterpolate(n)}</li>`);
        });
        _push(`<!--]--></ul></div>`);
      });
      _push(`<!--]--></div></div><div class="rounded-xl border border-gray-200 p-4"><h3 class="font-semibold text-gray-800 mb-3">${ssrInterpolate(_ctx.$t("pol.terms.delAdditionalH"))}</h3><ul class="space-y-2"><!--[-->`);
      ssrRenderList(list("delAdditionalItems"), (item, i) => {
        _push(`<li class="flex items-start gap-2"><span class="mt-2 w-1.5 h-1.5 rounded-full bg-brand-500 shrink-0"></span>${ssrInterpolate(item)}</li>`);
      });
      _push(`<!--]--><li class="flex items-start gap-2"><span class="mt-2 w-1.5 h-1.5 rounded-full bg-brand-500 shrink-0"></span><span>${ssrInterpolate(_ctx.$t("pol.terms.delFormulaItemPre"))} <span class="font-medium text-gray-800">${ssrInterpolate(_ctx.$t("pol.terms.delFormula"))}</span></span></li><li class="flex items-start gap-2"><span class="mt-2 w-1.5 h-1.5 rounded-full bg-brand-500 shrink-0"></span>${ssrInterpolate(_ctx.$t("pol.terms.delMaxLengthItem"))}</li></ul><p class="mt-4 text-sm text-gray-500">${ssrInterpolate(_ctx.$t("pol.terms.delContactNote"))}</p></div></div></section><section><h2 class="text-lg font-semibold text-gray-900 mb-4">${ssrInterpolate(_ctx.$t("pol.terms.returnsH"))}</h2><div class="space-y-5"><div class="rounded-xl border border-gray-200 p-4"><h3 class="font-semibold text-gray-800 mb-2">${ssrInterpolate(_ctx.$t("pol.terms.warrantyH"))}</h3><p>${ssrInterpolate(_ctx.$t("pol.terms.warrantyP1"))}</p><p class="mt-2">${ssrInterpolate(_ctx.$t("pol.terms.warrantyP2"))}</p><p class="mt-3">${ssrInterpolate(_ctx.$t("pol.terms.warrantyIntro"))}</p><ul class="space-y-1.5 mt-2"><!--[-->`);
      ssrRenderList(list("warrantyItems"), (item, i) => {
        _push(`<li class="flex items-start gap-2"><span class="mt-2 w-1.5 h-1.5 rounded-full bg-brand-500 shrink-0"></span>${ssrInterpolate(item)}</li>`);
      });
      _push(`<!--]--></ul><p class="mt-3">${ssrInterpolate(_ctx.$t("pol.terms.warrantyOutro"))}</p></div><div class="rounded-xl border border-gray-200 p-4"><h3 class="font-semibold text-gray-800 mb-2">${ssrInterpolate(_ctx.$t("pol.terms.exchangeH"))}</h3><p>${ssrInterpolate(_ctx.$t("pol.terms.exchangeIntro"))}</p><ul class="space-y-1.5 mt-2 mb-3"><!--[-->`);
      ssrRenderList(list("exchangeItems"), (item, i) => {
        _push(`<li class="flex items-start gap-2"><span class="mt-2 w-1.5 h-1.5 rounded-full bg-brand-500 shrink-0"></span>${ssrInterpolate(item)}</li>`);
      });
      _push(`<!--]--></ul><p>${ssrInterpolate(_ctx.$t("pol.terms.exchangeOutro"))}</p></div><div class="rounded-xl border border-gray-200 p-4"><h3 class="font-semibold text-gray-800 mb-2">${ssrInterpolate(_ctx.$t("pol.terms.returnH"))}</h3><p>${ssrInterpolate(_ctx.$t("pol.terms.returnIntro"))}</p><ul class="space-y-1.5 mt-2 mb-3"><!--[-->`);
      ssrRenderList(list("returnItems"), (item, i) => {
        _push(`<li class="flex items-start gap-2"><span class="mt-2 w-1.5 h-1.5 rounded-full bg-brand-500 shrink-0"></span>${ssrInterpolate(item)}</li>`);
      });
      _push(`<!--]--></ul><p>${ssrInterpolate(_ctx.$t("pol.terms.returnOutro"))}</p></div><div class="rounded-xl border border-gray-200 p-4"><h3 class="font-semibold text-gray-800 mb-2">${ssrInterpolate(_ctx.$t("pol.terms.storageH"))}</h3><p>${ssrInterpolate(_ctx.$t("pol.terms.storageP1"))}</p><p class="mt-3">${ssrInterpolate(_ctx.$t("pol.terms.storageIntro"))}</p><ul class="space-y-1.5 mt-2"><!--[-->`);
      ssrRenderList(list("storageItems"), (item, i) => {
        _push(`<li class="flex items-start gap-2"><span class="mt-2 w-1.5 h-1.5 rounded-full bg-brand-500 shrink-0"></span>${ssrInterpolate(item)}</li>`);
      });
      _push(`<!--]--></ul></div></div></section></div></div><!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Policies/TermsOfService.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=TermsOfService-DAwLb-QD.js.map
