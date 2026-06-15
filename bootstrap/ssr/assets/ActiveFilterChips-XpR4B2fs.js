import { T as Tooltip } from "./index-C3Ts-4IM.js";
import { s as script } from "./index-aSrJYIQQ.js";
import { mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrGetDirectiveProps, ssrRenderList, ssrRenderComponent } from "vue/server-renderer";
import "@primeuix/utils/dom";
import "@primeuix/utils/object";
import "@primeuix/utils/uuid";
import "@primeuix/utils/zindex";
import "@primevue/core/utils";
import "@primevue/core/basedirective";
import "@primeuix/styles/tooltip";
import "@primevue/core/base/style";
import "@primeuix/utils";
import "@primevue/icons/timescircle";
import "@primevue/core/basecomponent";
import "@primeuix/styles/chip";
const _sfc_main = {
  __name: "ActiveFilterChips",
  __ssrInlineRender: true,
  props: {
    chips: {
      type: Array,
      required: true
    }
  },
  emits: ["remove", "reset"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Chip = script;
      const _directive_tooltip = Tooltip;
      if (__props.chips.length) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex items-center gap-2 sm:mb-4 overflow-x-auto no-scrollbar scroll-smooth" }, _attrs))}><div${ssrRenderAttrs(mergeProps({ class: "flex items-center justify-center group p-2 rounded-lg bg-slate-100 cursor-pointer shrink-0" }, ssrGetDirectiveProps(_ctx, _directive_tooltip, "გასუფთავება", void 0, { top: true })))}><i class="pi pi-trash text-sm text-gray-500 group-hover:text-red-500"></i></div><div class="flex flex-row-reverse gap-x-2"><!--[-->`);
        ssrRenderList(__props.chips, (chip) => {
          _push(ssrRenderComponent(_component_Chip, {
            key: chip.id,
            label: chip.label,
            removable: "",
            onRemove: ($event) => emit("remove", chip),
            class: "text-xs whitespace-nowrap bg-green-600/10 font-bold text-green-700 shrink-0",
            "pt:removeIcon:class": "text-green-700"
          }, null, _parent));
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Items/ActiveFilterChips.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=ActiveFilterChips-XpR4B2fs.js.map
