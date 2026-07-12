import { unref, withCtx, createVNode, openBlock, createBlock, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { Head, Deferred } from "@inertiajs/vue3";
import { _ as _sfc_main$1, a as _sfc_main$2 } from "./ItemsGrid-CwyOwZ5d.js";
import "./index-CvFud99G.js";
import "@primeuix/utils";
import "@primevue/core/basecomponent";
import "@primeuix/styles/skeleton";
import "@primevue/core/base/style";
import "./index-PXeQwkTt.js";
import "@primeuix/utils/dom";
import "@primeuix/styles/paginator";
import "@primevue/icons/angledoubleleft";
import "./index-BWQ0UkXI.js";
import "@primevue/core/basedirective";
import "@primeuix/styles/ripple";
import "./index-DOeVcSWx.js";
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
import "@primeuix/styles/iconfield";
import "./index-BAgOeBfa.js";
import "@primevue/core/baseinput";
import "@primeuix/styles/inputtext";
import "./index-rAVNvoJo.js";
import "@primeuix/utils/eventbus";
import "./index-zZrFrjQS.js";
import "@primeuix/styles/virtualscroller";
import "@primeuix/styles/select";
import "./index-BgiqKOW-.js";
import "@primevue/icons/angledown";
import "@primevue/icons/angleup";
import "@primeuix/styles/inputnumber";
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
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./StockNotifyDialog-DtRQgNBy.js";
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    items: Object
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "ფასდაკლებები" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<meta name="description" content="იხილეთ Sonniva-ს ფასდაკლებული პროდუქცია"${_scopeId}>`);
          } else {
            return [
              createVNode("meta", {
                name: "description",
                content: "იხილეთ Sonniva-ს ფასდაკლებული პროდუქცია"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="min-h-[calc(100vh-80px)] max-lg:mx-4"><div class="relative overflow-hidden rounded-2xl bg-linear-to-br from-brand-500 to-brand-600 mt-4 px-2 py-5 sm:py-10 text-center"><i class="pi pi-percentage absolute -right-6 -top-6 text-[9rem] text-white/10 rotate-12"></i><i class="pi pi-tag absolute -left-4 -bottom-6 text-[7rem] text-white/10 -rotate-12"></i><span class="inline-flex items-center gap-1.5 bg-white/15 text-white text-sm font-semibold px-3 py-1 rounded-full mb-3"><i class="pi pi-clock text-sm"></i> შეზღუდული დროით </span><h1 class="text-2xl sm:text-3xl font-bold text-white mb-2">ფასდაკლებები</h1><p class="text-white/90 text-sm sm:text-base max-w-xl mx-auto"> აღმოაჩინეთ პროდუქცია საუკეთესო ფასებში. </p></div><div class="py-6">`);
      _push(ssrRenderComponent(unref(Deferred), { data: "items" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (__props.items.data?.length) {
              _push2(ssrRenderComponent(_sfc_main$2, { items: __props.items }, null, _parent2, _scopeId));
            } else {
              _push2(`<div class="flex flex-col items-center justify-center h-72 text-center"${_scopeId}><div class="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4"${_scopeId}><i class="pi pi-percentage text-3xl text-gray-300"${_scopeId}></i></div><h3 class="text-lg font-medium text-gray-500"${_scopeId}>ამჟამად ფასდაკლებული პროდუქცია არ არის</h3></div>`);
            }
          } else {
            return [
              __props.items.data?.length ? (openBlock(), createBlock(_sfc_main$2, {
                key: 0,
                items: __props.items
              }, null, 8, ["items"])) : (openBlock(), createBlock("div", {
                key: 1,
                class: "flex flex-col items-center justify-center h-72 text-center"
              }, [
                createVNode("div", { class: "w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4" }, [
                  createVNode("i", { class: "pi pi-percentage text-3xl text-gray-300" })
                ]),
                createVNode("h3", { class: "text-lg font-medium text-gray-500" }, "ამჟამად ფასდაკლებული პროდუქცია არ არის")
              ]))
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
      _push(`</div></div><!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Sales/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=Index-DtT5VFSV.js.map
