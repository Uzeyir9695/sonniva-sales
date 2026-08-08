import { T as Tooltip } from "./index-C3Ts-4IM.js";
import { s as script } from "./index-YvTnrAwi.js";
import { mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderClass, ssrGetDirectiveProps, ssrRenderComponent } from "vue/server-renderer";
import { e as getOriginalPrice, g as getDisplayPrice } from "./usePricing-BqOIsB71.js";
import { f as formatDiscount } from "./numberFormat-BgUHwZc2.js";
import "@primeuix/utils/dom";
import "@primeuix/utils/object";
import "@primeuix/utils/uuid";
import "@primeuix/utils/zindex";
import "@primevue/core/utils";
import "@primevue/core/basedirective";
import "@primeuix/styles/tooltip";
import "@primevue/core/base/style";
import "@primeuix/utils";
import "@primevue/icons/spinner";
import "@primevue/core/basecomponent";
import "@primeuix/styles/badge";
import "@primeuix/styles/ripple";
import "@primeuix/styles/button";
const _sfc_main = {
  __name: "ItemsListing",
  __ssrInlineRender: true,
  props: {
    item: { type: Object, required: true }
  },
  emits: ["manage"],
  setup(__props) {
    function imageUrl(img) {
      return `/storage/items/${img}`;
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Button = script;
      const _directive_tooltip = Tooltip;
      _push(`<li${ssrRenderAttrs(mergeProps({ class: "flex items-center gap-3 py-3" }, _attrs))}><div class="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 shrink-0">`);
      if (__props.item.images?.length) {
        _push(`<img${ssrRenderAttr("src", imageUrl(__props.item.images[0]))}${ssrRenderAttr("alt", __props.item.name)} class="w-full h-full object-cover">`);
      } else {
        _push(`<div class="w-full h-full flex items-center justify-center"><i class="pi pi-image text-gray-300 text-sm"></i></div>`);
      }
      _push(`</div><div class="flex-1 min-w-0"><p class="text-sm font-medium text-gray-800 truncate">${ssrInterpolate(__props.item.name)}</p><p class="text-xs text-gray-400 font-mono">${ssrInterpolate(__props.item.no)}</p><p class="text-sm mt-0.5">`);
      if (unref(getOriginalPrice)(__props.item)) {
        _push(`<span class="text-red-500 line-through mr-1.5">${ssrInterpolate(Number(unref(getOriginalPrice)(__props.item)).toFixed(2))} ₾</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<span class="font-semibold text-gray-700">${ssrInterpolate(Number(unref(getDisplayPrice)(__props.item)).toFixed(2))} ₾</span></p></div>`);
      if (__props.item.discount > 0) {
        _push(`<span class="text-xs px-2 py-0.5 rounded-full font-semibold shrink-0 bg-red-100 text-red-600"> -${ssrInterpolate(unref(formatDiscount)(__props.item.discount))}% </span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<span class="${ssrRenderClass([__props.item.video_url ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-400", "text-xs px-2 py-0.5 rounded-full font-medium shrink-0"])}">${ssrInterpolate(__props.item.video_url ? "Video set" : "No video")}</span><a${ssrRenderAttrs(mergeProps({
        href: _ctx.route("items.show", __props.item.slug),
        target: "_blank",
        class: "w-8 h-8 flex items-center justify-center rounded-lg shrink-0 text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
      }, ssrGetDirectiveProps(_ctx, _directive_tooltip, "View item page", void 0, { top: true })))}><i class="pi pi-external-link text-sm"></i></a>`);
      _push(ssrRenderComponent(_component_Button, {
        label: "Manage",
        icon: "pi pi-pen-to-square",
        size: "small",
        severity: "secondary",
        outlined: "",
        onClick: ($event) => _ctx.$emit("manage", __props.item)
      }, null, _parent));
      _push(`</li>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/items/ItemsListing.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=ItemsListing-CQbLPEEt.js.map
