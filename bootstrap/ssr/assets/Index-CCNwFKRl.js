import { s as script$1 } from "./index-DOeVcSWx.js";
import { s as script } from "./index-BgiqKOW-.js";
import { ref, computed, watch, unref, withCtx, createVNode, openBlock, createBlock, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass } from "vue/server-renderer";
import { router, Head, Deferred } from "@inertiajs/vue3";
import debounce from "lodash/debounce.js";
import { _ as _sfc_main$1, a as _sfc_main$2 } from "./ItemsGrid-CwyOwZ5d.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "@primeuix/utils";
import "@primeuix/utils/dom";
import "@primeuix/utils/object";
import "@primeuix/utils/zindex";
import "@primevue/core/api";
import "@primevue/core/utils";
import "@primevue/icons/blank";
import "@primevue/icons/check";
import "@primevue/icons/chevrondown";
import "@primevue/icons/search";
import "@primevue/icons/spinner";
import "@primevue/icons/times";
import "@primevue/core/basecomponent";
import "@primeuix/styles/iconfield";
import "@primevue/core/base/style";
import "./index-BAgOeBfa.js";
import "@primevue/core/baseinput";
import "@primeuix/styles/inputtext";
import "./index-rAVNvoJo.js";
import "@primeuix/utils/eventbus";
import "./index-zZrFrjQS.js";
import "./index-BWQ0UkXI.js";
import "@primevue/core/basedirective";
import "@primeuix/styles/ripple";
import "@primeuix/styles/virtualscroller";
import "@primeuix/styles/select";
import "@primevue/icons/angledown";
import "@primevue/icons/angleup";
import "@primeuix/styles/inputnumber";
import "./index-CvFud99G.js";
import "@primeuix/styles/skeleton";
import "./index-PXeQwkTt.js";
import "@primeuix/styles/paginator";
import "@primevue/icons/angledoubleleft";
import "@primevue/icons/angledoubleright";
import "@primevue/icons/angleright";
import "@primevue/icons/angleleft";
import "./QuickViewDialog-8Z0R3wjt.js";
import "./index-nsBhLTBN.js";
import "@primevue/icons/windowmaximize";
import "@primevue/icons/windowminimize";
import "./index-hSjFFc9a.js";
import "@primeuix/styles/badge";
import "@primeuix/styles/button";
import "@primeuix/styled";
import "@primeuix/styles/dialog";
import "axios";
import "./useCart-CIcsIaQl.js";
import "./index-Qb24q4w2.js";
import "./usePricing-oDne5BPU.js";
import "./ItemCard-BfY1qubs.js";
import "./index-C3Ts-4IM.js";
import "@primeuix/utils/uuid";
import "@primeuix/styles/tooltip";
import "./StockNotifyDialog-DtRQgNBy.js";
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    query: String,
    items: Object
  },
  setup(__props) {
    const props = __props;
    const loading = ref(false);
    const stockOptions = [
      { label: "ყველა", value: "" },
      { label: "მარაგშია", value: "in" },
      { label: "მარაგში არ არის", value: "out" }
    ];
    const params = route().params;
    const priceMin = ref(params.price_min ? Number(params.price_min) : null);
    const priceMax = ref(params.price_max ? Number(params.price_max) : null);
    const stockFilter = ref(stockOptions.find((o) => o.value === (params.stock ?? "")) ?? stockOptions[0]);
    const sidebarOpen = ref(false);
    const activeChips = computed(() => {
      const chips = [];
      if (priceMin.value || priceMax.value) {
        chips.push({ id: "price", type: "price", label: `${priceMin.value || 0} – ${priceMax.value || "∞"} ₾` });
      }
      if (stockFilter.value?.value) {
        chips.push({ id: "stock", type: "stock", value: stockFilter.value.value, label: stockFilter.value.label });
      }
      return chips;
    });
    const applyFilters = debounce(() => {
      sidebarOpen.value = false;
      router.get(route("search.index"), {
        q: props.query,
        price_min: priceMin.value || void 0,
        price_max: priceMax.value || void 0,
        stock: stockFilter.value?.value || void 0
      }, {
        preserveState: true,
        replace: true,
        onFinish: () => loading.value = false
      });
    }, 1300);
    watch([priceMin, priceMax, stockFilter], () => {
      loading.value = true;
      applyFilters();
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_InputNumber = script;
      const _component_Select = script$1;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: `ძიება: ${__props.query}`
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<meta name="robots" content="noindex, nofollow" data-v-4a1b9947${_scopeId}>`);
          } else {
            return [
              createVNode("meta", {
                name: "robots",
                content: "noindex, nofollow"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="min-h-[calc(100vh-80px)]" data-v-4a1b9947><div class="bg-white flex items-center justify-between sticky top-20 z-20 sm:mt-4 sm:rounded-xl shadow-xs px-4 sm:px-5 py-3" data-v-4a1b9947><div class="flex items-center gap-2 min-w-0" data-v-4a1b9947><i class="pi pi-search text-brand-400 shrink-0 text-sm" data-v-4a1b9947></i>`);
      if (__props.items?.total !== void 0) {
        _push(`<span class="text-xs text-gray-400 shrink-0 ml-1" data-v-4a1b9947> მოიძებნა ${ssrInterpolate(__props.items.total)} პროდუქტი </span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><button class="cursor-pointer lg:hidden flex items-center gap-2 font-medium text-gray-700 self-stretch pl-3 hover:text-brand-500 transition-colors shrink-0" data-v-4a1b9947><i class="pi pi-sliders-h text-md" data-v-4a1b9947></i></button></div>`);
      if (activeChips.value.length > 0) {
        _push(`<div class="sm:hidden sticky top-28 z-20 bg-white border-b border-gray-100 px-3 py-1.5 flex items-center gap-2 shadow-sm" data-v-4a1b9947><button class="text-gray-400 hover:text-red-400 transition-colors shrink-0" data-v-4a1b9947><i class="pi pi-trash text-xs" data-v-4a1b9947></i></button><div class="flex gap-1.5 overflow-x-auto" data-v-4a1b9947><!--[-->`);
        ssrRenderList(activeChips.value, (chip) => {
          _push(`<span class="flex items-center gap-1 bg-brand-50 text-brand-600 text-xs font-medium px-2.5 py-1 rounded-full shrink-0" data-v-4a1b9947>${ssrInterpolate(chip.label)} <i class="pi pi-times text-[9px] cursor-pointer hover:text-brand-800" data-v-4a1b9947></i></span>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (sidebarOpen.value) {
        _push(`<div class="fixed inset-0 bg-black/40 z-30 lg:hidden" data-v-4a1b9947></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="max-w-screen-2xl max-sm:mx-3 py-6 flex gap-6 relative" data-v-4a1b9947><div class="${ssrRenderClass([sidebarOpen.value ? "translate-x-0" : "-translate-x-full lg:translate-x-0", "max-lg:bg-white shrink-0 w-72 max-lg:pt-2 lg:block lg:sticky top-20 fixed left-0 h-full max-h-[calc(100vh-80px)] lg:max-h-[690px] overflow-x-hidden overflow-y-auto transition-all duration-300 z-40 lg:z-auto"])}" data-v-4a1b9947><button class="flex items-center ml-auto mr-2 mb-2 text-gray-400 hover:text-gray-700 lg:hidden" data-v-4a1b9947><i class="pi pi-times" data-v-4a1b9947></i></button><aside class="bg-white min-w-[288px] border lg:rounded-2xl border-gray-100" data-v-4a1b9947><div class="px-5 py-6" data-v-4a1b9947><div class="flex items-center justify-between mb-5" data-v-4a1b9947><div class="flex items-center gap-x-1.5" data-v-4a1b9947><i class="pi pi-sliders-h" data-v-4a1b9947></i><p class="text-xs font-semibold uppercase tracking-widest text-gray-400" data-v-4a1b9947>ფილტრი</p></div>`);
      if (activeChips.value.length > 0) {
        _push(`<div class="flex items-center gap-x-1 rounded-xl bg-slate-100 cursor-pointer px-2 py-1" data-v-4a1b9947><i class="text-sm pi pi-refresh text-gray-500" data-v-4a1b9947></i><button class="text-xs text-gray-400 cursor-pointer hover:text-gray-900 transition-colors" data-v-4a1b9947> გასუფთავება </button></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="mb-4 border-b border-gray-100 pb-4" data-v-4a1b9947><p class="text-sm font-semibold text-gray-500 mb-3" data-v-4a1b9947>ფასი</p><div class="flex items-center gap-2" data-v-4a1b9947>`);
      _push(ssrRenderComponent(_component_InputNumber, {
        modelValue: priceMin.value,
        "onUpdate:modelValue": ($event) => priceMin.value = $event,
        placeholder: "მინ.",
        min: 0,
        useGrouping: false,
        fluid: "",
        minFractionDigits: 0,
        maxFractionDigits: 2,
        showButtons: "",
        suffix: " ₾",
        "pt:root:class": "w-full",
        "pt:pcInputText:root:class": "text-sm rounded-lg border-gray-200 py-1.5 w-full",
        onInput: (e) => priceMin.value = e.value
      }, null, _parent));
      _push(`<span class="text-gray-300 shrink-0" data-v-4a1b9947>—</span>`);
      _push(ssrRenderComponent(_component_InputNumber, {
        modelValue: priceMax.value,
        "onUpdate:modelValue": ($event) => priceMax.value = $event,
        placeholder: "მაქს.",
        min: 0,
        useGrouping: false,
        fluid: "",
        minFractionDigits: 0,
        maxFractionDigits: 2,
        showButtons: "",
        suffix: " ₾",
        "pt:root:class": "w-full",
        "pt:pcInputText:root:class": "text-sm rounded-lg border-gray-200 py-1.5 w-full",
        onInput: (e) => priceMax.value = e.value
      }, null, _parent));
      _push(`</div></div><div data-v-4a1b9947><p class="text-sm font-semibold text-gray-500 mb-3" data-v-4a1b9947>მარაგი</p>`);
      _push(ssrRenderComponent(_component_Select, {
        modelValue: stockFilter.value,
        "onUpdate:modelValue": ($event) => stockFilter.value = $event,
        options: stockOptions,
        optionLabel: "label",
        fluid: "",
        "pt:root:class": "w-full !rounded-lg !border-gray-200",
        "pt:label:class": "!text-sm !py-1.5"
      }, null, _parent));
      _push(`</div></div></aside></div><div class="flex-1 min-w-0" data-v-4a1b9947>`);
      if (activeChips.value.length > 0) {
        _push(`<div class="max-sm:hidden flex items-center gap-2 mb-4 overflow-x-auto" data-v-4a1b9947><button class="text-gray-400 hover:text-red-400 transition-colors shrink-0" data-v-4a1b9947><i class="pi pi-trash text-sm" data-v-4a1b9947></i></button><!--[-->`);
        ssrRenderList(activeChips.value, (chip) => {
          _push(`<span class="flex items-center gap-1.5 bg-brand-50 text-brand-600 text-xs font-medium px-3 py-1.5 rounded-full shrink-0" data-v-4a1b9947>${ssrInterpolate(chip.label)} <i class="pi pi-times text-[9px] cursor-pointer hover:text-brand-800" data-v-4a1b9947></i></span>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(unref(Deferred), { data: "items" }, {
        default: withCtx(({ reloading }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (loading.value || reloading) {
              _push2(ssrRenderComponent(_sfc_main$1, null, null, _parent2, _scopeId));
            } else {
              _push2(ssrRenderComponent(_sfc_main$2, { items: __props.items }, null, _parent2, _scopeId));
            }
          } else {
            return [
              loading.value || reloading ? (openBlock(), createBlock(_sfc_main$1, { key: 0 })) : (openBlock(), createBlock(_sfc_main$2, {
                key: 1,
                items: __props.items
              }, null, 8, ["items"]))
            ];
          }
        }),
        fallback: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$1, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div><!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Search/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-4a1b9947"]]);
export {
  Index as default
};
//# sourceMappingURL=Index-CCNwFKRl.js.map
