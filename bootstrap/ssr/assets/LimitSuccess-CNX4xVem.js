import { onMounted, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent } from "vue/server-renderer";
import { Link } from "@inertiajs/vue3";
import { u as useCart } from "./useCart-DadzsIuG.js";
import "axios";
import "./index-Qb24q4w2.js";
const _sfc_main = {
  __name: "LimitSuccess",
  __ssrInlineRender: true,
  props: {
    invoiceNumber: { type: String, required: true }
  },
  setup(__props) {
    const { syncFromServer } = useCart();
    onMounted(() => syncFromServer());
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex items-center justify-center p-6" }, _attrs))}><div class="bg-white rounded-xl shadow-xl p-10 max-w-lg w-full text-center"><div class="mb-6"><div class="w-14 lg:w-18 h-14 lg:h-18 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"><svg class="w-8 lg:w-10 h-8 lg:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg></div><h1 class="text-xl lg:text-2xl font-extrabold text-gray-900">შეკვეთა განხორციელდა</h1><p class="mt-2 text-gray-600">შეკვეთა წარმატებით გაფორმდა ლიმიტით გადახდის საფუძველზე</p></div><div class="my-6"><p class="text-sm text-gray-500">შეკვეთის ნომერი</p><p class="text-lg font-semibold text-gray-900">${ssrInterpolate(__props.invoiceNumber)}</p></div><div class="flex flex-col gap-3">`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("home"),
        class: "block w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 rounded-lg transition"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` მთავარ გვერდზე დაბრუნება `);
          } else {
            return [
              createTextVNode(" მთავარ გვერდზე დაბრუნება ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Payment/LimitSuccess.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=LimitSuccess-CNX4xVem.js.map
