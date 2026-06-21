import { mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs } from "vue/server-renderer";
import _sfc_main$1 from "./AdminLayout-DrUmhk59.js";
import "@inertiajs/vue3";
import "./Navbar-BWR-LzLK.js";
import "./LargeDeviceMegaMenu-BMSK4_ne.js";
import "./index-BWQ0UkXI.js";
import "@primeuix/utils/dom";
import "@primevue/core/basedirective";
import "@primeuix/styles/ripple";
import "@primevue/core/base/style";
import "swiper/vue";
import "swiper/modules";
/* empty css                */
import "@vueuse/core";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./index-C3Ts-4IM.js";
import "@primeuix/utils/object";
import "@primeuix/utils/uuid";
import "@primeuix/utils/zindex";
import "@primevue/core/utils";
import "@primeuix/styles/tooltip";
import "axios";
import "./QuickViewDialog-BwjyUAul.js";
import "./index-nsBhLTBN.js";
import "@primeuix/utils";
import "@primevue/icons/times";
import "@primevue/icons/windowmaximize";
import "@primevue/icons/windowminimize";
import "./index-hSjFFc9a.js";
import "@primevue/icons/spinner";
import "@primevue/core/basecomponent";
import "@primeuix/styles/badge";
import "@primeuix/styles/button";
import "./index-zZrFrjQS.js";
import "@primeuix/styled";
import "@primeuix/styles/dialog";
import "./useCart-DadzsIuG.js";
import "./index-Qb24q4w2.js";
const _sfc_main = /* @__PURE__ */ Object.assign({ layout: _sfc_main$1 }, {
  __name: "Index",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "h-full flex flex-col items-center justify-center" }, _attrs))}><h1 class="text-xl md:text-3xl text-center font-bold text-gray-800 my-4"> Welcome to Admin Dashboard </h1><p class="text-gray-600 text-center text-sm md:text-xl mb-6"> Here you can manage orders, users, and settings efficiently. </p></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=Index-C_JOv4CI.js.map
