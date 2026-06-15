import { computed, mergeProps, unref, withCtx, createTextVNode, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent } from "vue/server-renderer";
import { Link, Deferred } from "@inertiajs/vue3";
import { _ as _sfc_main$1, a as _sfc_main$2 } from "./ItemsGrid-DUJKA9gk.js";
import { e as useWishlist } from "./QuickViewDialog-BwjyUAul.js";
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
import "./ItemCard-YMo0znvQ.js";
import "./index-C3Ts-4IM.js";
import "@primeuix/utils/uuid";
import "@primeuix/styles/tooltip";
import "./useCart-DadzsIuG.js";
import "axios";
import "./index-Qb24q4w2.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./index-hSjFFc9a.js";
import "@primeuix/styles/badge";
import "@primeuix/styles/button";
import "./index-nsBhLTBN.js";
import "@primevue/icons/windowmaximize";
import "@primevue/icons/windowminimize";
import "@primeuix/styled";
import "@primeuix/styles/dialog";
import "./StockNotifyDialog-DtRQgNBy.js";
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    items: { type: Object, required: true }
  },
  setup(__props) {
    const props = __props;
    const { isWishlisted } = useWishlist();
    const filteredItems = computed(() => ({
      ...props.items,
      data: (props.items?.data ?? []).filter((item) => isWishlisted(item.id))
    }));
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10" }, _attrs))}>`);
      if (filteredItems.value?.data.length) {
        _push(`<div class="flex items-center justify-between mb-8"><div><h1 class="text-lg sm:text-2xl font-bold text-gray-900">სურვილების სია</h1><p class="text-gray-500 text-sm mt-1">${ssrInterpolate(filteredItems.value.data.length)} ${ssrInterpolate(filteredItems.value.data.length === 1 ? "პროდუქტია შენახული" : "შენახული")}</p></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (!filteredItems.value?.data.length) {
        _push(`<div class="flex flex-col items-center justify-center py-24 text-center"><i class="pi pi-heart text-gray-300 text-6xl mb-6"></i><h2 class="text-lg font-semibold text-gray-700 mb-2">თქვენი სურვილების სია ცარიელია</h2><p class="text-gray-500 text-sm mb-6 max-w-xs"> შეინახე ის რაც მოგწონს და დაუბრუნდი ნებისმიერ დროს. </p>`);
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("home"),
          class: "inline-flex items-center gap-2 bg-primary text-white rounded-full px-6 py-2.5 text-sm font-medium hover:bg-primary-dark transition-colors duration-200"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` დაიწყე შოპინგი `);
            } else {
              return [
                createTextVNode(" დაიწყე შოპინგი ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(ssrRenderComponent(unref(Deferred), { data: "items" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_sfc_main$2, { items: filteredItems.value }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_sfc_main$2, { items: filteredItems.value }, null, 8, ["items"])
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
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Wishlist/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=Index-CV8oGOEB.js.map
