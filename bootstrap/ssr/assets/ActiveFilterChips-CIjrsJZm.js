import { T as Tooltip } from "./index-C3Ts-4IM.js";
import { cn } from "@primeuix/utils";
import TimesCircleIcon from "@primevue/icons/timescircle";
import BaseComponent from "@primevue/core/basecomponent";
import { style } from "@primeuix/styles/chip";
import BaseStyle from "@primevue/core/base/style";
import { openBlock, createElementBlock, mergeProps, renderSlot, createBlock, resolveDynamicComponent, createCommentVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrGetDirectiveProps, ssrRenderList, ssrRenderComponent } from "vue/server-renderer";
import "@primeuix/utils/dom";
import "@primeuix/utils/object";
import "@primeuix/utils/uuid";
import "@primeuix/utils/zindex";
import "@primevue/core/utils";
import "@primevue/core/basedirective";
import "@primeuix/styles/tooltip";
var classes = {
  root: "p-chip p-component",
  image: "p-chip-image",
  icon: "p-chip-icon",
  label: "p-chip-label",
  removeIcon: "p-chip-remove-icon"
};
var ChipStyle = BaseStyle.extend({
  name: "chip",
  style,
  classes
});
var script$1 = {
  name: "BaseChip",
  "extends": BaseComponent,
  props: {
    label: {
      type: [String, Number],
      "default": null
    },
    icon: {
      type: String,
      "default": null
    },
    image: {
      type: String,
      "default": null
    },
    removable: {
      type: Boolean,
      "default": false
    },
    removeIcon: {
      type: String,
      "default": void 0
    }
  },
  style: ChipStyle,
  provide: function provide() {
    return {
      $pcChip: this,
      $parentInstance: this
    };
  }
};
var script = {
  name: "Chip",
  "extends": script$1,
  inheritAttrs: false,
  emits: ["remove"],
  data: function data() {
    return {
      visible: true
    };
  },
  methods: {
    onKeydown: function onKeydown(event) {
      if (event.key === "Enter" || event.key === "Backspace") {
        this.close(event);
      }
    },
    close: function close(event) {
      this.visible = false;
      this.$emit("remove", event);
    }
  },
  computed: {
    dataP: function dataP() {
      return cn({
        removable: this.removable
      });
    }
  },
  components: {
    TimesCircleIcon
  }
};
var _hoisted_1 = ["aria-label", "data-p"];
var _hoisted_2 = ["src"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return $data.visible ? (openBlock(), createElementBlock("div", mergeProps({
    key: 0,
    "class": _ctx.cx("root"),
    "aria-label": _ctx.label
  }, _ctx.ptmi("root"), {
    "data-p": $options.dataP
  }), [renderSlot(_ctx.$slots, "default", {}, function() {
    return [_ctx.image ? (openBlock(), createElementBlock("img", mergeProps({
      key: 0,
      src: _ctx.image
    }, _ctx.ptm("image"), {
      "class": _ctx.cx("image")
    }), null, 16, _hoisted_2)) : _ctx.$slots.icon ? (openBlock(), createBlock(resolveDynamicComponent(_ctx.$slots.icon), mergeProps({
      key: 1,
      "class": _ctx.cx("icon")
    }, _ctx.ptm("icon")), null, 16, ["class"])) : _ctx.icon ? (openBlock(), createElementBlock("span", mergeProps({
      key: 2,
      "class": [_ctx.cx("icon"), _ctx.icon]
    }, _ctx.ptm("icon")), null, 16)) : createCommentVNode("", true), _ctx.label !== null ? (openBlock(), createElementBlock("div", mergeProps({
      key: 3,
      "class": _ctx.cx("label")
    }, _ctx.ptm("label")), toDisplayString(_ctx.label), 17)) : createCommentVNode("", true)];
  }), _ctx.removable ? renderSlot(_ctx.$slots, "removeicon", {
    key: 0,
    removeCallback: $options.close,
    keydownCallback: $options.onKeydown
  }, function() {
    return [(openBlock(), createBlock(resolveDynamicComponent(_ctx.removeIcon ? "span" : "TimesCircleIcon"), mergeProps({
      "class": [_ctx.cx("removeIcon"), _ctx.removeIcon],
      onClick: $options.close,
      onKeydown: $options.onKeydown
    }, _ctx.ptm("removeIcon")), null, 16, ["class", "onClick", "onKeydown"]))];
  }) : createCommentVNode("", true)], 16, _hoisted_1)) : createCommentVNode("", true);
}
script.render = render;
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
//# sourceMappingURL=ActiveFilterChips-CIjrsJZm.js.map
