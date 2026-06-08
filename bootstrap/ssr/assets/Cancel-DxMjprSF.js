import { mergeProps, unref, withCtx, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { Link } from "@inertiajs/vue3";
const _sfc_main = {
  __name: "Cancel",
  __ssrInlineRender: true,
  props: {
    provider: { type: String, default: null }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-[calc(100vh-96px)] bg-gray-50 flex items-center justify-center p-6" }, _attrs))}><div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 max-w-md w-full text-center"><div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6"><i class="pi pi-times text-red-500 text-2xl"></i></div><h1 class="text-xl font-bold text-gray-900 mb-2">გადახდა უარყოფილია</h1><p class="text-sm text-gray-400 mb-8"> გადახდა ვერ განხორციელდა. სცადეთ თავიდან ან აირჩიეთ სხვა მეთოდი. </p><div class="space-y-3">`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("checkout.index"),
        class: "block w-full bg-brand-500 hover:bg-brand-400 text-white font-semibold py-3 rounded-xl transition-colors text-sm"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` თავიდან ცდა `);
          } else {
            return [
              createTextVNode(" თავიდან ცდა ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("home"),
        class: "block w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-xl transition-colors text-sm"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` მთავარზე დაბრუნება `);
          } else {
            return [
              createTextVNode(" მთავარზე დაბრუნება ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Payment/Cancel.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=Cancel-DxMjprSF.js.map
