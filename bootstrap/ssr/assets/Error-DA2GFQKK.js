import { computed, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent } from "vue/server-renderer";
import { Link } from "@inertiajs/vue3";
const _sfc_main = {
  __name: "Error",
  __ssrInlineRender: true,
  props: {
    status: { type: Number, required: true }
  },
  setup(__props) {
    const props = __props;
    const page = computed(() => ({
      404: { title: "404", message: "Sorry, the page you are looking for could not be found." },
      403: { title: "403", message: "Sorry, you are not authorized to access this page." },
      500: { title: "500", message: "Something went wrong on our end. Please try again later." },
      503: { title: "503", message: "We are down for maintenance. Please check back soon." }
    })[props.status] ?? { title: props.status, message: "An unexpected error occurred." });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col items-center justify-center min-h-[calc(100vh-96px)] gap-6" }, _attrs))}><h1 class="text-6xl font-bold text-gray-800">${ssrInterpolate(page.value.title)}</h1><p class="text-lg text-gray-600">${ssrInterpolate(page.value.message)}</p>`);
      _push(ssrRenderComponent(unref(Link), {
        href: "/",
        class: "px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Go to Home`);
          } else {
            return [
              createTextVNode("Go to Home")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Error.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=Error-DA2GFQKK.js.map
