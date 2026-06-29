import { onMounted, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent } from "vue/server-renderer";
import { router, Link } from "@inertiajs/vue3";
import { u as useCart } from "./useCart-CWhz1Vmq.js";
import "axios";
import "./index-Qb24q4w2.js";
const _sfc_main = {
  __name: "Success",
  __ssrInlineRender: true,
  props: {
    invoiceNumber: { type: String, default: null }
  },
  setup(__props) {
    const { syncFromServer } = useCart();
    onMounted(() => {
      router.reload({ only: ["cart"], onSuccess: () => syncFromServer() });
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-[calc(100vh-96px)] bg-gray-50 flex items-center justify-center p-6" }, _attrs))}><div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 max-w-md w-full text-center"><div class="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"><i class="pi pi-check text-white text-2xl"></i></div><h1 class="text-xl font-bold text-gray-900 mb-2">გადახდა წარმატებით შესრულდა</h1>`);
      if (__props.invoiceNumber) {
        _push(`<p class="text-sm text-gray-500 mb-1"> შეკვეთის ნომერი </p>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.invoiceNumber) {
        _push(`<p class="text-lg font-bold mb-6"> #${ssrInterpolate(__props.invoiceNumber)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<p class="text-sm text-gray-400 mb-8"> დადასტურების წერილი გამოგზავნილია თქვენს ელ-ფოსტაზე. </p><div class="space-y-3">`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("home"),
        class: "block w-full bg-green-500 hover:bg-green-400 text-white font-semibold py-3 rounded-xl transition-colors text-sm"
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Payment/Success.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=Success-DPV4_HV6.js.map
