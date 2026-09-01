import { computed, resolveComponent, unref, withCtx, createVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderAttr } from "vue/server-renderer";
import { Head } from "@inertiajs/vue3";
import { useI18n } from "vue-i18n";
const TBILISI_FREE_THRESHOLD = 500;
const _sfc_main = {
  __name: "DeliveryRates",
  __ssrInlineRender: true,
  setup(__props) {
    const { t, tm, rt, locale } = useI18n();
    const deliveryMethods = computed(() => [
      {
        icon: "pi pi-building",
        title: t("pol.delivery.methodOfficeTitle"),
        subtitle: t("pol.delivery.methodOfficeSubtitle"),
        subtitle2: t("pol.delivery.methodOfficeSubtitle2"),
        badge: t("pol.delivery.free"),
        badgeClass: "bg-emerald-100 text-emerald-700",
        cardClass: "border-emerald-200",
        iconClass: "bg-emerald-50 text-emerald-600"
      },
      {
        icon: "pi pi-map-marker",
        title: t("pol.delivery.methodTbilisiTitle"),
        subtitle: t("pol.delivery.methodTbilisiSubtitle"),
        subtitle2: t("pol.delivery.methodTbilisiSubtitle2"),
        badge: "5 – 60 ₾",
        badgeClass: "bg-blue-100 text-blue-700",
        cardClass: "border-blue-200",
        iconClass: "bg-blue-50 text-blue-600"
      },
      {
        icon: "fa-solid fa-truck-fast",
        title: t("pol.delivery.methodRegionsTitle"),
        subtitle: t("pol.delivery.methodRegionsSubtitle"),
        subtitle2: t("pol.delivery.methodRegionsSubtitle2"),
        badge: "6 – 750 ₾",
        badgeClass: "bg-violet-100 text-violet-700",
        cardClass: "border-violet-200",
        iconClass: "bg-violet-50 text-violet-600"
      }
    ]);
    const officeBranches = computed(() => [
      { address: t("pol.delivery.avchalaAddress"), hours: t("pol.delivery.hours"), mapUrl: "https://maps.app.goo.gl/3YwH55CnhUUfJoYQ9" },
      { address: t("pol.delivery.didubeAddress"), hours: t("pol.delivery.hours"), mapUrl: "https://maps.app.goo.gl/mUedJ9Jf9j1tR9nt6" }
    ]);
    const tbilisiZones = computed(() => {
      void locale.value;
      return [
        { label: t("pol.delivery.zone1"), price: "5-40", color: "blue", neighborhoods: tm("pol.terms.zone1Items").map(rt) },
        { label: t("pol.delivery.zone2"), price: "5-50", color: "indigo", neighborhoods: tm("pol.terms.zone2Items").map(rt) },
        { label: t("pol.delivery.zone3"), price: "5-60", color: "violet", neighborhoods: tm("pol.terms.zone3Items").map(rt) }
      ];
    });
    const DELIVERY_RATES = [
      { maxKg: 1, region: 10.5, office: 6, village: 15.5 },
      { maxKg: 5, region: 12.5, office: 6, village: 17.5 },
      { maxKg: 10, region: 16, office: 10, village: 21 },
      { maxKg: 15, region: 21, office: 15, village: 26 },
      { maxKg: 20, region: 26, office: 20, village: 31 },
      { maxKg: 30, region: 36, office: 30, village: 45 },
      { maxKg: 50, region: 65, office: 50, village: 80 },
      { maxKg: 100, region: 105, office: 80, village: 120 },
      { maxKg: 150, region: 145, office: 110, village: 175 },
      { maxKg: 200, region: 185, office: 140, village: 215 },
      { maxKg: 250, region: 220, office: 170, village: 250 },
      { maxKg: 300, region: 260, office: 200, village: 290 },
      { maxKg: 500, region: 340, office: 280, village: 390 },
      { maxKg: 750, region: 450, office: 370, village: 500 },
      { maxKg: 1e3, region: 700, office: 510, village: 750 }
    ];
    function weightLabel(rate, index) {
      const prev = index === 0 ? 0 : DELIVERY_RATES[index - 1].maxKg;
      return t("pol.delivery.weightRange", { from: prev, to: rate.maxKg });
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_i18n_t = resolveComponent("i18n-t");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: _ctx.$t("pol.delivery.title")
      }, null, _parent));
      _push(`<div class="min-h-screen bg-gray-50"><div class="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-10"><div class="text-center space-y-3"><div class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-500/10 mb-2"><i class="fa-solid fa-truck-fast text-3xl text-brand-500"></i></div><h1 class="text-2xl sm:text-3xl font-bold text-gray-900">${ssrInterpolate(_ctx.$t("pol.delivery.title"))}</h1><p class="text-gray-500 text-sm max-w-md mx-auto">${ssrInterpolate(_ctx.$t("pol.delivery.headerSubtitle"))}</p></div><div class="grid grid-cols-1 sm:grid-cols-3 gap-4"><!--[-->`);
      ssrRenderList(deliveryMethods.value, (method) => {
        _push(`<div class="${ssrRenderClass([method.cardClass, "bg-white rounded-2xl border p-5 flex flex-col gap-3 shadow-sm"])}"><div class="flex items-center justify-between"><div class="${ssrRenderClass([method.iconClass, "w-10 h-10 rounded-xl flex items-center justify-center shrink-0"])}"><i class="${ssrRenderClass([method.icon, "text-lg"])}"></i></div><span class="${ssrRenderClass([method.badgeClass, "text-xs font-bold px-2.5 py-1 rounded-full"])}">${ssrInterpolate(method.badge)}</span></div><div><p class="font-semibold text-gray-900 text-sm">${ssrInterpolate(method.title)}</p><p class="text-xs text-gray-400 mt-0.5">${ssrInterpolate(method.subtitle)}</p>`);
        if (method.subtitle2) {
          _push(`<p class="text-xs text-gray-400 font-bold mt-2">${ssrInterpolate(method.subtitle2)}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      });
      _push(`<!--]--></div><section class="bg-white rounded-2xl border border-emerald-200 shadow-sm overflow-hidden"><div class="bg-emerald-50 px-6 py-4 flex items-center gap-3 border-b border-emerald-100"><i class="pi pi-building text-emerald-600 text-lg"></i><div><h2 class="font-bold text-gray-900 text-base">${ssrInterpolate(_ctx.$t("pol.delivery.officeSectionTitle"))}</h2><p class="text-xs text-emerald-600 font-medium mt-0.5">${ssrInterpolate(_ctx.$t("pol.delivery.officeFullyFree"))}</p></div><span class="ml-auto text-xl font-bold text-emerald-600">0 ₾</span></div><div class="p-6 grid sm:grid-cols-2 gap-4"><!--[-->`);
      ssrRenderList(officeBranches.value, (branch) => {
        _push(`<div class="flex items-start gap-2 text-sm text-gray-600 rounded-xl border border-gray-200 ring-1 ring-gray-100 p-4"><i class="pi pi-map-marker text-brand-500 mt-0.5 shrink-0"></i><div class="space-y-1"><p class="font-medium text-gray-800">${ssrInterpolate(branch.address)}</p><p class="text-xs text-gray-400 mt-0.5">${ssrInterpolate(branch.hours)}</p><a${ssrRenderAttr("href", branch.mapUrl)} target="_blank" class="text-brand-500 underline">${ssrInterpolate(_ctx.$t("pol.delivery.mapLinkText"))}</a></div></div>`);
      });
      _push(`<!--]--></div></section><section class="space-y-4"><div class="flex items-center gap-3"><div class="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center"><i class="pi pi-map-marker text-blue-600"></i></div><div><h2 class="font-bold text-gray-900 text-base">${ssrInterpolate(_ctx.$t("pol.delivery.tbilisiSectionTitle"))}</h2><p class="text-xs text-gray-400">${ssrInterpolate(_ctx.$t("pol.delivery.tbilisiPriceByZone"))}</p></div></div><div class="bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3 flex items-center gap-2 text-sm text-emerald-700"><i class="pi pi-check-circle shrink-0"></i>`);
      _push(ssrRenderComponent(_component_i18n_t, {
        keypath: "pol.delivery.freeThreshold",
        tag: "span"
      }, {
        amount: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<strong${_scopeId}>${ssrInterpolate(TBILISI_FREE_THRESHOLD)} ₾</strong>`);
          } else {
            return [
              createVNode("strong", null, toDisplayString(TBILISI_FREE_THRESHOLD) + " ₾")
            ];
          }
        }),
        free: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<strong${_scopeId}>${ssrInterpolate(_ctx.$t("pol.delivery.freeThresholdWord"))}</strong>`);
          } else {
            return [
              createVNode("strong", null, toDisplayString(_ctx.$t("pol.delivery.freeThresholdWord")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="grid grid-cols-1 sm:grid-cols-3 gap-4"><!--[-->`);
      ssrRenderList(tbilisiZones.value, (zone) => {
        _push(`<div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"><div class="${ssrRenderClass([{
          "bg-blue-50": zone.color === "blue",
          "bg-indigo-50": zone.color === "indigo",
          "bg-violet-50": zone.color === "violet"
        }, "px-4 py-3 flex items-center justify-between border-b border-gray-100"])}"><span class="font-bold text-gray-800 text-sm">${ssrInterpolate(zone.label)}</span><span class="${ssrRenderClass([{
          "text-blue-600": zone.color === "blue",
          "text-indigo-600": zone.color === "indigo",
          "text-violet-600": zone.color === "violet"
        }, "font-bold text-lg"])}">${ssrInterpolate(zone.price)} ₾</span></div><ul class="px-4 py-3 space-y-1"><!--[-->`);
        ssrRenderList(zone.neighborhoods, (n) => {
          _push(`<li class="flex items-center gap-1.5 text-sm text-gray-500"><span class="w-1 h-1 rounded-full bg-gray-300 shrink-0"></span> ${ssrInterpolate(n)}</li>`);
        });
        _push(`<!--]--></ul></div>`);
      });
      _push(`<!--]--></div></section><section class="space-y-4"><div class="flex items-center gap-3"><div class="w-8 h-8 rounded-xl bg-violet-50 flex items-center justify-center"><i class="fa-solid fa-truck-fast text-violet-600"></i></div><div><h2 class="font-bold text-gray-900 text-base">${ssrInterpolate(_ctx.$t("pol.delivery.regionsSectionTitle"))}</h2><p class="text-xs text-gray-400">${ssrInterpolate(_ctx.$t("pol.delivery.regionsPriceByWeightType"))}</p></div></div><div class="grid grid-cols-3 gap-3"><div class="bg-white rounded-xl border border-gray-100 shadow-sm px-4 py-3 text-center"><div class="w-7 h-7 rounded-lg bg-sky-50 flex items-center justify-center mx-auto mb-1.5"><i class="fa-solid fa-warehouse text-sky-500 text-sm"></i></div><p class="text-sm font-semibold text-gray-700">${ssrInterpolate(_ctx.$t("pol.delivery.legendOnwayTitle"))}</p><p class="text-xs text-gray-400 mt-0.5">${ssrInterpolate(_ctx.$t("pol.delivery.legendOnwaySub"))}</p></div><div class="bg-white rounded-xl border border-gray-100 shadow-sm px-4 py-3 text-center"><div class="w-7 h-7 rounded-lg bg-violet-50 flex items-center justify-center mx-auto mb-1.5"><i class="fa-solid fa-city text-violet-500 text-sm"></i></div><p class="text-sm font-semibold text-gray-700">${ssrInterpolate(_ctx.$t("pol.delivery.legendCityTitle"))}</p><p class="text-xs text-gray-400 mt-0.5">${ssrInterpolate(_ctx.$t("pol.delivery.legendCitySub"))}</p></div><div class="bg-white rounded-xl border border-gray-100 shadow-sm px-4 py-3 text-center"><div class="w-7 h-7 rounded-lg bg-amber-50 flex items-center justify-center mx-auto mb-1.5"><i class="fa-solid fa-house-crack text-amber-500 text-sm"></i></div><p class="text-sm font-semibold text-gray-700">${ssrInterpolate(_ctx.$t("pol.delivery.legendVillageTitle"))}</p><p class="text-xs text-gray-400 mt-0.5">${ssrInterpolate(_ctx.$t("pol.delivery.legendVillageSub"))}</p></div></div><div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"><table class="w-full text-sm"><thead><tr class="bg-gray-50 border-b border-gray-100"><th class="text-left px-4 py-3 font-semibold text-gray-600 text-sm">${ssrInterpolate(_ctx.$t("pol.delivery.thWeight"))}</th><th class="text-center px-4 py-3 font-semibold text-sky-600 text-sm">${ssrInterpolate(_ctx.$t("pol.delivery.legendOnwayTitle"))}</th><th class="text-center px-4 py-3 font-semibold text-violet-600 text-sm">${ssrInterpolate(_ctx.$t("pol.delivery.legendCityTitle"))}</th><th class="text-center px-4 py-3 font-semibold text-amber-600 text-sm">${ssrInterpolate(_ctx.$t("pol.delivery.legendVillageTitle"))}</th></tr></thead><tbody class="divide-y divide-gray-50"><!--[-->`);
      ssrRenderList(DELIVERY_RATES, (rate, index) => {
        _push(`<tr class="hover:bg-gray-50/60 transition-colors"><td class="px-4 py-2.5 text-gray-500 text-sm font-medium">${ssrInterpolate(weightLabel(rate, index))}</td><td class="px-4 py-2.5 text-center"><span class="font-semibold text-sky-700">${ssrInterpolate(rate.office)} ₾</span></td><td class="px-4 py-2.5 text-center"><span class="font-semibold text-violet-700">${ssrInterpolate(rate.region)} ₾</span></td><td class="px-4 py-2.5 text-center"><span class="font-semibold text-amber-700">${ssrInterpolate(rate.village)} ₾</span></td></tr>`);
      });
      _push(`<!--]--></tbody></table></div></section></div></div><!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Policies/DeliveryRates.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=DeliveryRates-Dp8p1t0M.js.map
