import { mergeProps, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./SwiperCarousel-Dj9nYNbp.js";
import "swiper/vue";
import "swiper/modules";
/* empty css                    */
import "./ItemCard-Y46qYTvM.js";
import "./index-C3Ts-4IM.js";
import "@primeuix/utils/dom";
import "@primeuix/utils/object";
import "@primeuix/utils/uuid";
import "@primeuix/utils/zindex";
import "@primevue/core/utils";
import "@primevue/core/basedirective";
import "@primeuix/styles/tooltip";
import "@primevue/core/base/style";
import "@inertiajs/vue3";
import "./QuickViewDialog--IPmfhAf.js";
import "./index-nsBhLTBN.js";
import "@primeuix/utils";
import "@primevue/icons/times";
import "@primevue/icons/windowmaximize";
import "@primevue/icons/windowminimize";
import "./index-hSjFFc9a.js";
import "@primevue/icons/spinner";
import "@primevue/core/basecomponent";
import "@primeuix/styles/badge";
import "./index-BWQ0UkXI.js";
import "@primeuix/styles/ripple";
import "@primeuix/styles/button";
import "./index-zZrFrjQS.js";
import "@primeuix/styled";
import "@primeuix/styles/dialog";
import "axios";
import "./useCart-CIcsIaQl.js";
import "./index-Qb24q4w2.js";
import "./usePricing-HxfzG07E.js";
import "./index-BgiqKOW-.js";
import "@primevue/icons/angledown";
import "@primevue/icons/angleup";
import "./index-BAgOeBfa.js";
import "@primevue/core/baseinput";
import "@primeuix/styles/inputtext";
import "@primeuix/styles/inputnumber";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./StockNotifyDialog-DtRQgNBy.js";
const _sfc_main = {
  __name: "SimilarItems",
  __ssrInlineRender: true,
  props: {
    items: Array
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, mergeProps({
        items: __props.items,
        title: "მსგავსი პროდუქტები"
      }, _attrs), null, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Items/SimilarItems.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=SimilarItems-ByEesLs_.js.map
