import { unref, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrRenderList } from "vue/server-renderer";
import { usePage, Head } from "@inertiajs/vue3";
import { _ as _sfc_main$1, a as _sfc_main$2 } from "./LargeDeviceMegaMenu-BMSK4_ne.js";
import { _ as _sfc_main$3 } from "./SwiperCarousel-DXDT2oI3.js";
import "./index-BWQ0UkXI.js";
import "@primeuix/utils/dom";
import "@primevue/core/basedirective";
import "@primeuix/styles/ripple";
import "@primevue/core/base/style";
import "swiper/vue";
import "swiper/modules";
/* empty css                */
/* empty css                    */
import "./ItemCard-YMo0znvQ.js";
import "./index-C3Ts-4IM.js";
import "@primeuix/utils/object";
import "@primeuix/utils/uuid";
import "@primeuix/utils/zindex";
import "@primevue/core/utils";
import "@primeuix/styles/tooltip";
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
import "axios";
import "./useCart-DadzsIuG.js";
import "./index-Qb24q4w2.js";
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
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    carouselItems: {
      type: Array,
      default: []
    }
  },
  setup(__props) {
    const page = usePage();
    const categories = page.props.categories ?? [];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<meta name="description" content="Sonniva - ავეჯის ფიტინგები, სახელურები, სასრიალოები და სამშენებლო მასალები. საუკეთესო ხარისხი და ფასები საქართველოში."${_scopeId}><meta property="og:type" content="website"${_scopeId}><meta property="og:site_name" content="Sonniva"${_scopeId}><meta property="og:title" content="Sonniva"${_scopeId}><meta property="og:description" content="Sonniva - ავეჯის ფიტინგები, სახელურები, სასრიალოები და სამშენებლო მასალები. საუკეთესო ხარისხი და ფასები საქართველოში."${_scopeId}><meta property="og:url"${ssrRenderAttr("content", _ctx.$page.props.ziggy.location)}${_scopeId}><meta property="og:image"${ssrRenderAttr("content", `${_ctx.$page.props.ziggy.url}/logo/logo.png`)}${_scopeId}>`);
          } else {
            return [
              createVNode("meta", {
                name: "description",
                content: "Sonniva - ავეჯის ფიტინგები, სახელურები, სასრიალოები და სამშენებლო მასალები. საუკეთესო ხარისხი და ფასები საქართველოში."
              }),
              createVNode("meta", {
                property: "og:type",
                content: "website"
              }),
              createVNode("meta", {
                property: "og:site_name",
                content: "Sonniva"
              }),
              createVNode("meta", {
                property: "og:title",
                content: "Sonniva"
              }),
              createVNode("meta", {
                property: "og:description",
                content: "Sonniva - ავეჯის ფიტინგები, სახელურები, სასრიალოები და სამშენებლო მასალები. საუკეთესო ხარისხი და ფასები საქართველოში."
              }),
              createVNode("meta", {
                property: "og:url",
                content: _ctx.$page.props.ziggy.location
              }, null, 8, ["content"]),
              createVNode("meta", {
                property: "og:image",
                content: `${_ctx.$page.props.ziggy.url}/logo/logo.png`
              }, null, 8, ["content"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="flex gap-x-4 mt-4">`);
      _push(ssrRenderComponent(_sfc_main$1, {
        class: "hidden lg:flex",
        categories: unref(categories)
      }, null, _parent));
      _push(`<div class="flex-1 rounded-lg">`);
      _push(ssrRenderComponent(_sfc_main$2, null, null, _parent));
      _push(`</div></div><div class="flex flex-col"><!--[-->`);
      ssrRenderList(__props.carouselItems, (carousel) => {
        _push(ssrRenderComponent(_sfc_main$3, {
          key: carousel.title,
          title: carousel.title,
          items: carousel.items,
          mousewheel: false
        }, null, _parent));
      });
      _push(`<!--]--></div><!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Home/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=Index-kXb-0You.js.map
