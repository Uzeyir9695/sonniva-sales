import { computed, mergeProps, unref, withCtx, createTextVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent } from "vue/server-renderer";
import { Link } from "@inertiajs/vue3";
import { useI18n } from "vue-i18n";
const _sfc_main = {
  __name: "Error",
  __ssrInlineRender: true,
  props: {
    status: { type: Number, required: true }
  },
  setup(__props) {
    const { t } = useI18n();
    const props = __props;
    const message = computed(() => ({
      404: t("error.notFound"),
      403: t("error.forbidden"),
      500: t("error.server"),
      503: t("error.maintenance")
    })[props.status] ?? t("error.unexpected"));
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col items-center justify-center min-h-[calc(100vh-96px)] gap-6" }, _attrs))}><h1 class="text-6xl font-bold text-gray-800">${ssrInterpolate(__props.status)}</h1><p class="text-lg text-gray-600">${ssrInterpolate(message.value)}</p>`);
      _push(ssrRenderComponent(unref(Link), {
        href: "/",
        class: "px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.$t("common.goToHome"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.$t("common.goToHome")), 1)
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
//# sourceMappingURL=Error-DI8WjqNf.js.map
