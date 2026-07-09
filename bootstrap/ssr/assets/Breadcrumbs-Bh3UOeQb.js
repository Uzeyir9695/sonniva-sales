import { cn } from "@primeuix/utils";
import MinusIcon from "@primevue/icons/minus";
import PlusIcon from "@primevue/icons/plus";
import { s as script$2 } from "./index-hSjFFc9a.js";
import { R as Ripple } from "./index-BWQ0UkXI.js";
import BaseComponent from "@primevue/core/basecomponent";
import { style } from "@primeuix/styles/panel";
import BaseStyle from "@primevue/core/base/style";
import { resolveComponent, openBlock, createElementBlock, mergeProps, createElementVNode, renderSlot, normalizeClass, toDisplayString, createCommentVNode, createVNode, withCtx, createBlock, resolveDynamicComponent, Transition, withDirectives, vShow, unref, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { Link } from "@inertiajs/vue3";
var classes = {
  root: function root(_ref) {
    var props = _ref.props;
    return ["p-panel p-component", {
      "p-panel-toggleable": props.toggleable
    }];
  },
  header: "p-panel-header",
  title: "p-panel-title",
  headerActions: "p-panel-header-actions",
  pcToggleButton: "p-panel-toggle-button",
  contentContainer: "p-panel-content-container",
  content: "p-panel-content",
  footer: "p-panel-footer"
};
var PanelStyle = BaseStyle.extend({
  name: "panel",
  style,
  classes
});
var script$1 = {
  name: "BasePanel",
  "extends": BaseComponent,
  props: {
    header: String,
    toggleable: Boolean,
    collapsed: Boolean,
    toggleButtonProps: {
      type: Object,
      "default": function _default() {
        return {
          severity: "secondary",
          text: true,
          rounded: true
        };
      }
    }
  },
  style: PanelStyle,
  provide: function provide() {
    return {
      $pcPanel: this,
      $parentInstance: this
    };
  }
};
var script = {
  name: "Panel",
  "extends": script$1,
  inheritAttrs: false,
  emits: ["update:collapsed", "toggle"],
  data: function data() {
    return {
      d_collapsed: this.collapsed
    };
  },
  watch: {
    collapsed: function collapsed(newValue) {
      this.d_collapsed = newValue;
    }
  },
  methods: {
    toggle: function toggle(event) {
      this.d_collapsed = !this.d_collapsed;
      this.$emit("update:collapsed", this.d_collapsed);
      this.$emit("toggle", {
        originalEvent: event,
        value: this.d_collapsed
      });
    },
    onKeyDown: function onKeyDown(event) {
      if (event.code === "Enter" || event.code === "NumpadEnter" || event.code === "Space") {
        this.toggle(event);
        event.preventDefault();
      }
    }
  },
  computed: {
    buttonAriaLabel: function buttonAriaLabel() {
      return this.toggleButtonProps && this.toggleButtonProps.ariaLabel ? this.toggleButtonProps.ariaLabel : this.header;
    },
    dataP: function dataP() {
      return cn({
        toggleable: this.toggleable
      });
    }
  },
  components: {
    PlusIcon,
    MinusIcon,
    Button: script$2
  },
  directives: {
    ripple: Ripple
  }
};
var _hoisted_1 = ["data-p"];
var _hoisted_2 = ["data-p"];
var _hoisted_3 = ["id"];
var _hoisted_4 = ["id", "aria-labelledby"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_Button = resolveComponent("Button");
  return openBlock(), createElementBlock("div", mergeProps({
    "class": _ctx.cx("root"),
    "data-p": $options.dataP
  }, _ctx.ptmi("root")), [createElementVNode("div", mergeProps({
    "class": _ctx.cx("header"),
    "data-p": $options.dataP
  }, _ctx.ptm("header")), [renderSlot(_ctx.$slots, "header", {
    id: _ctx.$id + "_header",
    "class": normalizeClass(_ctx.cx("title")),
    collapsed: $data.d_collapsed
  }, function() {
    return [_ctx.header ? (openBlock(), createElementBlock("span", mergeProps({
      key: 0,
      id: _ctx.$id + "_header",
      "class": _ctx.cx("title")
    }, _ctx.ptm("title")), toDisplayString(_ctx.header), 17, _hoisted_3)) : createCommentVNode("", true)];
  }), createElementVNode("div", mergeProps({
    "class": _ctx.cx("headerActions")
  }, _ctx.ptm("headerActions")), [renderSlot(_ctx.$slots, "icons"), _ctx.toggleable ? renderSlot(_ctx.$slots, "togglebutton", {
    key: 0,
    collapsed: $data.d_collapsed,
    toggleCallback: function toggleCallback(event) {
      return $options.toggle(event);
    },
    keydownCallback: function keydownCallback(event) {
      return $options.onKeyDown(event);
    }
  }, function() {
    return [createVNode(_component_Button, mergeProps({
      id: _ctx.$id + "_header",
      "class": _ctx.cx("pcToggleButton"),
      "aria-label": $options.buttonAriaLabel,
      "aria-controls": _ctx.$id + "_content",
      "aria-expanded": !$data.d_collapsed,
      unstyled: _ctx.unstyled,
      onClick: _cache[0] || (_cache[0] = function($event) {
        return $options.toggle($event);
      }),
      onKeydown: _cache[1] || (_cache[1] = function($event) {
        return $options.onKeyDown($event);
      })
    }, _ctx.toggleButtonProps, {
      pt: _ctx.ptm("pcToggleButton")
    }), {
      icon: withCtx(function(slotProps) {
        return [renderSlot(_ctx.$slots, _ctx.$slots.toggleicon ? "toggleicon" : "togglericon", {
          collapsed: $data.d_collapsed
        }, function() {
          return [(openBlock(), createBlock(resolveDynamicComponent($data.d_collapsed ? "PlusIcon" : "MinusIcon"), mergeProps({
            "class": slotProps["class"]
          }, _ctx.ptm("pcToggleButton")["icon"]), null, 16, ["class"]))];
        })];
      }),
      _: 3
    }, 16, ["id", "class", "aria-label", "aria-controls", "aria-expanded", "unstyled", "pt"])];
  }) : createCommentVNode("", true)], 16)], 16, _hoisted_2), createVNode(Transition, mergeProps({
    name: "p-toggleable-content"
  }, _ctx.ptm("transition")), {
    "default": withCtx(function() {
      return [withDirectives(createElementVNode("div", mergeProps({
        id: _ctx.$id + "_content",
        "class": _ctx.cx("contentContainer"),
        role: "region",
        "aria-labelledby": _ctx.$id + "_header"
      }, _ctx.ptm("contentContainer")), [createElementVNode("div", mergeProps({
        "class": _ctx.cx("content")
      }, _ctx.ptm("content")), [renderSlot(_ctx.$slots, "default")], 16), _ctx.$slots.footer ? (openBlock(), createElementBlock("div", mergeProps({
        key: 0,
        "class": _ctx.cx("footer")
      }, _ctx.ptm("footer")), [renderSlot(_ctx.$slots, "footer")], 16)) : createCommentVNode("", true)], 16, _hoisted_4), [[vShow, !$data.d_collapsed]])];
    }),
    _: 3
  }, 16)], 16, _hoisted_1);
}
script.render = render;
const _sfc_main = {
  __name: "Breadcrumbs",
  __ssrInlineRender: true,
  props: [
    "breadcrumbs"
  ],
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "text-sm text-gray-500 sticky top-16 sm:top-20 flex items-center text-nowrap overflow-x-auto px-3 sm:px-4 py-3 no-scrollbar scroll-smooth z-20" }, _attrs))}>`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("home"),
        class: "shrink-0 font-semibold"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` საწყისი გვერდი `);
          } else {
            return [
              createTextVNode(" საწყისი გვერდი ")
            ];
          }
        }),
        _: 1
      }, _parent));
      if (__props.breadcrumbs?.length) {
        _push(`<i class="pi pi-chevron-right text-xs mx-1 shrink-0"></i>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--[-->`);
      ssrRenderList(__props.breadcrumbs, (crumb, i) => {
        _push(`<!--[-->`);
        if (i < __props.breadcrumbs.length - 1) {
          _push(ssrRenderComponent(unref(Link), {
            href: _ctx.route("items.index", __props.breadcrumbs.slice(0, i + 1).map((c) => c.slug)),
            class: ""
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(crumb.label)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(crumb.label), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
        } else {
          _push(`<span class="text-gray-400 cursor-not-allowed">${ssrInterpolate(crumb.label)}</span>`);
        }
        if (i < __props.breadcrumbs.length - 1) {
          _push(`<i class="pi pi-chevron-right text-xs mx-1"></i>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      });
      _push(`<!--]--></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Shared/components/Breadcrumbs.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _,
  script as s
};
//# sourceMappingURL=Breadcrumbs-Bh3UOeQb.js.map
