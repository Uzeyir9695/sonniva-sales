import { T as Tooltip } from "./index-C3Ts-4IM.js";
import { cn } from "@primeuix/utils";
import { isTouchDevice, absolutePosition, getOuterWidth, addStyle, focus, find, findSingle } from "@primeuix/utils/dom";
import { ZIndex } from "@primeuix/utils/zindex";
import { ConnectedOverlayScrollHandler } from "@primevue/core/utils";
import { O as OverlayEventBus } from "./index-rAVNvoJo.js";
import { s as script$3 } from "./index-zZrFrjQS.js";
import BaseComponent from "@primevue/core/basecomponent";
import { style } from "@primeuix/styles/menu";
import BaseStyle from "@primevue/core/base/style";
import { resolve } from "@primeuix/utils/object";
import { R as Ripple } from "./index-BWQ0UkXI.js";
import { mergeProps, resolveDirective, openBlock, createElementBlock, createElementVNode, withDirectives, createBlock, resolveDynamicComponent, normalizeClass, createCommentVNode, toDisplayString, resolveComponent, withCtx, createVNode, Transition, renderSlot, Fragment, renderList, createTextVNode, ref, unref, useSSRContext } from "vue";
import { s as script$d } from "./index-BOVEwDIL.js";
import { s as script$b, a as script$c } from "./index-dkMbGzYi.js";
import { s as script$6, a as script$a } from "./index-hSjFFc9a.js";
import { s as script$7, a as script$8, b as script$9 } from "./index-CwYp4h2j.js";
import { s as script$5 } from "./index-BzRznsIW.js";
import { s as script$4 } from "./index-nsBhLTBN.js";
import { ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrGetDirectiveProps } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./AdminLayout-BOYPeqxI.js";
import { _ as _sfc_main$4 } from "./TableSkeleton-jtC7qFHK.js";
import _sfc_main$2 from "./OrderDetailDialog-OzL3Z8eK.js";
import { usePoll, Deferred, router } from "@inertiajs/vue3";
import { u as useToast } from "./index-Qb24q4w2.js";
import { u as useConfirm } from "./index-DPwr32It.js";
import { FilterMatchMode } from "@primevue/core/api";
import _sfc_main$3 from "./PrimeInputText-BlIRrCdA.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "@primeuix/utils/uuid";
import "@primevue/core/basedirective";
import "@primeuix/styles/tooltip";
import "@primeuix/utils/eventbus";
import "@primeuix/styles/ripple";
import "@primevue/icons/calendar";
import "@primevue/icons/chevrondown";
import "@primevue/icons/chevronleft";
import "@primevue/icons/chevronright";
import "@primevue/icons/chevronup";
import "@primevue/icons/times";
import "./index-BAgOeBfa.js";
import "@primevue/core/baseinput";
import "@primeuix/styles/inputtext";
import "@primeuix/styles/datepicker";
import "@primevue/icons/arrowdown";
import "@primevue/icons/arrowup";
import "@primevue/icons/spinner";
import "./index-PXeQwkTt.js";
import "@primeuix/styles/paginator";
import "@primevue/icons/angledoubleleft";
import "./index-DOeVcSWx.js";
import "@primevue/icons/blank";
import "@primevue/icons/check";
import "@primevue/icons/search";
import "@primeuix/styles/iconfield";
import "@primeuix/styles/virtualscroller";
import "@primeuix/styles/select";
import "./index-BgiqKOW-.js";
import "@primevue/icons/angledown";
import "@primevue/icons/angleup";
import "@primeuix/styles/inputnumber";
import "@primevue/icons/angledoubleright";
import "@primevue/icons/angleright";
import "@primevue/icons/angleleft";
import "@primeuix/styles/datatable";
import "@primevue/icons/bars";
import "@primevue/icons/pencil";
import "@primeuix/styles/radiobutton";
import "@primevue/icons/filter";
import "@primevue/icons/filterfill";
import "@primevue/icons/filterslash";
import "@primevue/icons/plus";
import "@primevue/icons/trash";
import "@primevue/icons/sortalt";
import "@primevue/icons/sortamountdown";
import "@primevue/icons/sortamountupalt";
import "@primeuix/styles/badge";
import "@primeuix/styles/button";
import "@primeuix/styles/tabs";
import "@primevue/icons/minus";
import "@primeuix/styles/checkbox";
import "@primevue/icons/windowmaximize";
import "@primevue/icons/windowminimize";
import "@primeuix/styled";
import "@primeuix/styles/dialog";
import "./index-UNAMtl9A.js";
import "@primeuix/styles/toast";
import "@primevue/icons/exclamationtriangle";
import "@primevue/icons/infocircle";
import "@primevue/icons/timescircle";
import "@vueuse/core";
import "axios";
import "./QuickViewDialog--IPmfhAf.js";
import "./useCart-CIcsIaQl.js";
import "./usePricing-HxfzG07E.js";
import "@primeuix/styles/confirmdialog";
import "./index-CvFud99G.js";
import "@primeuix/styles/skeleton";
import "./index-C0PiRRRi.js";
import "@primeuix/styles/tag";
var classes = {
  root: function root(_ref) {
    var props = _ref.props;
    return ["p-menu p-component", {
      "p-menu-overlay": props.popup
    }];
  },
  start: "p-menu-start",
  list: "p-menu-list",
  submenuLabel: "p-menu-submenu-label",
  separator: "p-menu-separator",
  end: "p-menu-end",
  item: function item(_ref2) {
    var instance = _ref2.instance;
    return ["p-menu-item", {
      "p-focus": instance.id === instance.focusedOptionId,
      "p-disabled": instance.disabled()
    }];
  },
  itemContent: "p-menu-item-content",
  itemLink: "p-menu-item-link",
  itemIcon: "p-menu-item-icon",
  itemLabel: "p-menu-item-label"
};
var MenuStyle = BaseStyle.extend({
  name: "menu",
  style,
  classes
});
var script$2 = {
  name: "BaseMenu",
  "extends": BaseComponent,
  props: {
    popup: {
      type: Boolean,
      "default": false
    },
    model: {
      type: Array,
      "default": null
    },
    appendTo: {
      type: [String, Object],
      "default": "body"
    },
    autoZIndex: {
      type: Boolean,
      "default": true
    },
    baseZIndex: {
      type: Number,
      "default": 0
    },
    tabindex: {
      type: Number,
      "default": 0
    },
    ariaLabel: {
      type: String,
      "default": null
    },
    ariaLabelledby: {
      type: String,
      "default": null
    }
  },
  style: MenuStyle,
  provide: function provide() {
    return {
      $pcMenu: this,
      $parentInstance: this
    };
  }
};
var script$1 = {
  name: "Menuitem",
  hostName: "Menu",
  "extends": BaseComponent,
  inheritAttrs: false,
  emits: ["item-click", "item-mousemove"],
  props: {
    item: null,
    templates: null,
    id: null,
    focusedOptionId: null,
    index: null
  },
  methods: {
    getItemProp: function getItemProp(processedItem, name) {
      return processedItem && processedItem.item ? resolve(processedItem.item[name]) : void 0;
    },
    getPTOptions: function getPTOptions(key) {
      return this.ptm(key, {
        context: {
          item: this.item,
          index: this.index,
          focused: this.isItemFocused(),
          disabled: this.disabled()
        }
      });
    },
    isItemFocused: function isItemFocused() {
      return this.focusedOptionId === this.id;
    },
    onItemClick: function onItemClick(event) {
      var command = this.getItemProp(this.item, "command");
      command && command({
        originalEvent: event,
        item: this.item.item
      });
      this.$emit("item-click", {
        originalEvent: event,
        item: this.item,
        id: this.id
      });
    },
    onItemMouseMove: function onItemMouseMove(event) {
      this.$emit("item-mousemove", {
        originalEvent: event,
        item: this.item,
        id: this.id
      });
    },
    visible: function visible() {
      return typeof this.item.visible === "function" ? this.item.visible() : this.item.visible !== false;
    },
    disabled: function disabled() {
      return typeof this.item.disabled === "function" ? this.item.disabled() : this.item.disabled;
    },
    label: function label() {
      return typeof this.item.label === "function" ? this.item.label() : this.item.label;
    },
    getMenuItemProps: function getMenuItemProps(item2) {
      return {
        action: mergeProps({
          "class": this.cx("itemLink"),
          tabindex: "-1"
        }, this.getPTOptions("itemLink")),
        icon: mergeProps({
          "class": [this.cx("itemIcon"), item2.icon]
        }, this.getPTOptions("itemIcon")),
        label: mergeProps({
          "class": this.cx("itemLabel")
        }, this.getPTOptions("itemLabel"))
      };
    }
  },
  computed: {
    dataP: function dataP() {
      return cn({
        focus: this.isItemFocused(),
        disabled: this.disabled()
      });
    }
  },
  directives: {
    ripple: Ripple
  }
};
var _hoisted_1$1 = ["id", "aria-label", "aria-disabled", "data-p-focused", "data-p-disabled", "data-p"];
var _hoisted_2$1 = ["data-p"];
var _hoisted_3$1 = ["href", "target"];
var _hoisted_4 = ["data-p"];
var _hoisted_5 = ["data-p"];
function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  var _directive_ripple = resolveDirective("ripple");
  return $options.visible() ? (openBlock(), createElementBlock("li", mergeProps({
    key: 0,
    id: $props.id,
    "class": [_ctx.cx("item"), $props.item["class"]],
    role: "menuitem",
    style: $props.item.style,
    "aria-label": $options.label(),
    "aria-disabled": $options.disabled(),
    "data-p-focused": $options.isItemFocused(),
    "data-p-disabled": $options.disabled() || false,
    "data-p": $options.dataP
  }, $options.getPTOptions("item")), [createElementVNode("div", mergeProps({
    "class": _ctx.cx("itemContent"),
    onClick: _cache[0] || (_cache[0] = function($event) {
      return $options.onItemClick($event);
    }),
    onMousemove: _cache[1] || (_cache[1] = function($event) {
      return $options.onItemMouseMove($event);
    }),
    "data-p": $options.dataP
  }, $options.getPTOptions("itemContent")), [!$props.templates.item ? withDirectives((openBlock(), createElementBlock("a", mergeProps({
    key: 0,
    href: $props.item.url,
    "class": _ctx.cx("itemLink"),
    target: $props.item.target,
    tabindex: "-1"
  }, $options.getPTOptions("itemLink")), [$props.templates.itemicon ? (openBlock(), createBlock(resolveDynamicComponent($props.templates.itemicon), {
    key: 0,
    item: $props.item,
    "class": normalizeClass(_ctx.cx("itemIcon"))
  }, null, 8, ["item", "class"])) : $props.item.icon ? (openBlock(), createElementBlock("span", mergeProps({
    key: 1,
    "class": [_ctx.cx("itemIcon"), $props.item.icon],
    "data-p": $options.dataP
  }, $options.getPTOptions("itemIcon")), null, 16, _hoisted_4)) : createCommentVNode("", true), createElementVNode("span", mergeProps({
    "class": _ctx.cx("itemLabel"),
    "data-p": $options.dataP
  }, $options.getPTOptions("itemLabel")), toDisplayString($options.label()), 17, _hoisted_5)], 16, _hoisted_3$1)), [[_directive_ripple]]) : $props.templates.item ? (openBlock(), createBlock(resolveDynamicComponent($props.templates.item), {
    key: 1,
    item: $props.item,
    label: $options.label(),
    props: $options.getMenuItemProps($props.item)
  }, null, 8, ["item", "label", "props"])) : createCommentVNode("", true)], 16, _hoisted_2$1)], 16, _hoisted_1$1)) : createCommentVNode("", true);
}
script$1.render = render$1;
function _toConsumableArray(r) {
  return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread();
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
  }
}
function _iterableToArray(r) {
  if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
}
function _arrayWithoutHoles(r) {
  if (Array.isArray(r)) return _arrayLikeToArray(r);
}
function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
var script = {
  name: "Menu",
  "extends": script$2,
  inheritAttrs: false,
  emits: ["show", "hide", "focus", "blur"],
  data: function data() {
    return {
      overlayVisible: false,
      focused: false,
      focusedOptionIndex: -1,
      selectedOptionIndex: -1
    };
  },
  target: null,
  outsideClickListener: null,
  scrollHandler: null,
  resizeListener: null,
  container: null,
  list: null,
  mounted: function mounted() {
    if (!this.popup) {
      this.bindResizeListener();
      this.bindOutsideClickListener();
    }
  },
  beforeUnmount: function beforeUnmount() {
    this.unbindResizeListener();
    this.unbindOutsideClickListener();
    if (this.scrollHandler) {
      this.scrollHandler.destroy();
      this.scrollHandler = null;
    }
    this.target = null;
    if (this.container && this.autoZIndex) {
      ZIndex.clear(this.container);
    }
    this.container = null;
  },
  methods: {
    itemClick: function itemClick(event) {
      var item2 = event.item;
      if (this.disabled(item2)) {
        return;
      }
      if (item2.command) {
        item2.command(event);
      }
      if (this.overlayVisible) this.hide();
      if (!this.popup && this.focusedOptionIndex !== event.id) {
        this.focusedOptionIndex = event.id;
      }
    },
    itemMouseMove: function itemMouseMove(event) {
      if (this.focused) {
        this.focusedOptionIndex = event.id;
      }
    },
    onListFocus: function onListFocus(event) {
      this.focused = true;
      !this.popup && this.changeFocusedOptionIndex(0);
      this.$emit("focus", event);
    },
    onListBlur: function onListBlur(event) {
      this.focused = false;
      this.focusedOptionIndex = -1;
      this.$emit("blur", event);
    },
    onListKeyDown: function onListKeyDown(event) {
      switch (event.code) {
        case "ArrowDown":
          this.onArrowDownKey(event);
          break;
        case "ArrowUp":
          this.onArrowUpKey(event);
          break;
        case "Home":
          this.onHomeKey(event);
          break;
        case "End":
          this.onEndKey(event);
          break;
        case "Enter":
        case "NumpadEnter":
          this.onEnterKey(event);
          break;
        case "Space":
          this.onSpaceKey(event);
          break;
        case "Escape":
          if (this.popup) {
            focus(this.target);
            this.hide();
          }
        case "Tab":
          this.overlayVisible && this.hide();
          break;
      }
    },
    onArrowDownKey: function onArrowDownKey(event) {
      var optionIndex = this.findNextOptionIndex(this.focusedOptionIndex);
      this.changeFocusedOptionIndex(optionIndex);
      event.preventDefault();
    },
    onArrowUpKey: function onArrowUpKey(event) {
      if (event.altKey && this.popup) {
        focus(this.target);
        this.hide();
        event.preventDefault();
      } else {
        var optionIndex = this.findPrevOptionIndex(this.focusedOptionIndex);
        this.changeFocusedOptionIndex(optionIndex);
        event.preventDefault();
      }
    },
    onHomeKey: function onHomeKey(event) {
      this.changeFocusedOptionIndex(0);
      event.preventDefault();
    },
    onEndKey: function onEndKey(event) {
      this.changeFocusedOptionIndex(find(this.container, 'li[data-pc-section="item"][data-p-disabled="false"]').length - 1);
      event.preventDefault();
    },
    onEnterKey: function onEnterKey(event) {
      var element = findSingle(this.list, 'li[id="'.concat("".concat(this.focusedOptionIndex), '"]'));
      var anchorElement = element && findSingle(element, 'a[data-pc-section="itemlink"]');
      this.popup && focus(this.target);
      anchorElement ? anchorElement.click() : element && element.click();
      event.preventDefault();
    },
    onSpaceKey: function onSpaceKey(event) {
      this.onEnterKey(event);
    },
    findNextOptionIndex: function findNextOptionIndex(index) {
      var links = find(this.container, 'li[data-pc-section="item"][data-p-disabled="false"]');
      var matchedOptionIndex = _toConsumableArray(links).findIndex(function(link) {
        return link.id === index;
      });
      return matchedOptionIndex > -1 ? matchedOptionIndex + 1 : 0;
    },
    findPrevOptionIndex: function findPrevOptionIndex(index) {
      var links = find(this.container, 'li[data-pc-section="item"][data-p-disabled="false"]');
      var matchedOptionIndex = _toConsumableArray(links).findIndex(function(link) {
        return link.id === index;
      });
      return matchedOptionIndex > -1 ? matchedOptionIndex - 1 : 0;
    },
    changeFocusedOptionIndex: function changeFocusedOptionIndex(index) {
      var links = find(this.container, 'li[data-pc-section="item"][data-p-disabled="false"]');
      var order = index >= links.length ? links.length - 1 : index < 0 ? 0 : index;
      order > -1 && (this.focusedOptionIndex = links[order].getAttribute("id"));
    },
    toggle: function toggle(event, target) {
      if (this.overlayVisible) this.hide();
      else this.show(event, target);
    },
    show: function show(event, target) {
      this.overlayVisible = true;
      this.target = target !== null && target !== void 0 ? target : event.currentTarget;
    },
    hide: function hide() {
      this.overlayVisible = false;
      this.target = null;
    },
    onEnter: function onEnter(el) {
      addStyle(el, {
        position: "absolute",
        top: "0"
      });
      this.alignOverlay();
      this.bindOutsideClickListener();
      this.bindResizeListener();
      this.bindScrollListener();
      if (this.autoZIndex) {
        ZIndex.set("menu", el, this.baseZIndex + this.$primevue.config.zIndex.menu);
      }
      if (this.popup) {
        focus(this.list);
      }
      this.$emit("show");
    },
    onLeave: function onLeave() {
      this.unbindOutsideClickListener();
      this.unbindResizeListener();
      this.unbindScrollListener();
      this.$emit("hide");
    },
    onAfterLeave: function onAfterLeave(el) {
      if (this.autoZIndex) {
        ZIndex.clear(el);
      }
    },
    alignOverlay: function alignOverlay() {
      absolutePosition(this.container, this.target);
      var targetWidth = getOuterWidth(this.target);
      if (targetWidth > getOuterWidth(this.container)) {
        this.container.style.minWidth = getOuterWidth(this.target) + "px";
      }
    },
    bindOutsideClickListener: function bindOutsideClickListener() {
      var _this = this;
      if (!this.outsideClickListener) {
        this.outsideClickListener = function(event) {
          var isOutsideContainer = _this.container && !_this.container.contains(event.target);
          var isOutsideTarget = !(_this.target && (_this.target === event.target || _this.target.contains(event.target)));
          if (_this.overlayVisible && isOutsideContainer && isOutsideTarget) {
            _this.hide();
          } else if (!_this.popup && isOutsideContainer && isOutsideTarget) {
            _this.focusedOptionIndex = -1;
          }
        };
        document.addEventListener("click", this.outsideClickListener, true);
      }
    },
    unbindOutsideClickListener: function unbindOutsideClickListener() {
      if (this.outsideClickListener) {
        document.removeEventListener("click", this.outsideClickListener, true);
        this.outsideClickListener = null;
      }
    },
    bindScrollListener: function bindScrollListener() {
      var _this2 = this;
      if (!this.scrollHandler) {
        this.scrollHandler = new ConnectedOverlayScrollHandler(this.target, function() {
          if (_this2.overlayVisible) {
            _this2.hide();
          }
        });
      }
      this.scrollHandler.bindScrollListener();
    },
    unbindScrollListener: function unbindScrollListener() {
      if (this.scrollHandler) {
        this.scrollHandler.unbindScrollListener();
      }
    },
    bindResizeListener: function bindResizeListener() {
      var _this3 = this;
      if (!this.resizeListener) {
        this.resizeListener = function() {
          if (_this3.overlayVisible && !isTouchDevice()) {
            _this3.hide();
          }
        };
        window.addEventListener("resize", this.resizeListener);
      }
    },
    unbindResizeListener: function unbindResizeListener() {
      if (this.resizeListener) {
        window.removeEventListener("resize", this.resizeListener);
        this.resizeListener = null;
      }
    },
    visible: function visible2(item2) {
      return typeof item2.visible === "function" ? item2.visible() : item2.visible !== false;
    },
    disabled: function disabled2(item2) {
      return typeof item2.disabled === "function" ? item2.disabled() : item2.disabled;
    },
    label: function label2(item2) {
      return typeof item2.label === "function" ? item2.label() : item2.label;
    },
    onOverlayClick: function onOverlayClick(event) {
      OverlayEventBus.emit("overlay-click", {
        originalEvent: event,
        target: this.target
      });
    },
    containerRef: function containerRef(el) {
      this.container = el;
    },
    listRef: function listRef(el) {
      this.list = el;
    }
  },
  computed: {
    focusedOptionId: function focusedOptionId() {
      return this.focusedOptionIndex !== -1 ? this.focusedOptionIndex : null;
    },
    dataP: function dataP2() {
      return cn({
        popup: this.popup
      });
    }
  },
  components: {
    PVMenuitem: script$1,
    Portal: script$3
  }
};
var _hoisted_1 = ["id", "data-p"];
var _hoisted_2 = ["id", "tabindex", "aria-activedescendant", "aria-label", "aria-labelledby"];
var _hoisted_3 = ["id"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_PVMenuitem = resolveComponent("PVMenuitem");
  var _component_Portal = resolveComponent("Portal");
  return openBlock(), createBlock(_component_Portal, {
    appendTo: _ctx.appendTo,
    disabled: !_ctx.popup
  }, {
    "default": withCtx(function() {
      return [createVNode(Transition, mergeProps({
        name: "p-connected-overlay",
        onEnter: $options.onEnter,
        onLeave: $options.onLeave,
        onAfterLeave: $options.onAfterLeave
      }, _ctx.ptm("transition")), {
        "default": withCtx(function() {
          return [(_ctx.popup ? $data.overlayVisible : true) ? (openBlock(), createElementBlock("div", mergeProps({
            key: 0,
            ref: $options.containerRef,
            id: _ctx.$id,
            "class": _ctx.cx("root"),
            onClick: _cache[3] || (_cache[3] = function() {
              return $options.onOverlayClick && $options.onOverlayClick.apply($options, arguments);
            }),
            "data-p": $options.dataP
          }, _ctx.ptmi("root")), [_ctx.$slots.start ? (openBlock(), createElementBlock("div", mergeProps({
            key: 0,
            "class": _ctx.cx("start")
          }, _ctx.ptm("start")), [renderSlot(_ctx.$slots, "start")], 16)) : createCommentVNode("", true), createElementVNode("ul", mergeProps({
            ref: $options.listRef,
            id: _ctx.$id + "_list",
            "class": _ctx.cx("list"),
            role: "menu",
            tabindex: _ctx.tabindex,
            "aria-activedescendant": $data.focused ? $options.focusedOptionId : void 0,
            "aria-label": _ctx.ariaLabel,
            "aria-labelledby": _ctx.ariaLabelledby,
            onFocus: _cache[0] || (_cache[0] = function() {
              return $options.onListFocus && $options.onListFocus.apply($options, arguments);
            }),
            onBlur: _cache[1] || (_cache[1] = function() {
              return $options.onListBlur && $options.onListBlur.apply($options, arguments);
            }),
            onKeydown: _cache[2] || (_cache[2] = function() {
              return $options.onListKeyDown && $options.onListKeyDown.apply($options, arguments);
            })
          }, _ctx.ptm("list")), [(openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.model, function(item2, i) {
            return openBlock(), createElementBlock(Fragment, {
              key: $options.label(item2) + i.toString()
            }, [item2.items && $options.visible(item2) && !item2.separator ? (openBlock(), createElementBlock(Fragment, {
              key: 0
            }, [item2.items ? (openBlock(), createElementBlock("li", mergeProps({
              key: 0,
              id: _ctx.$id + "_" + i,
              "class": [_ctx.cx("submenuLabel"), item2["class"]],
              role: "none"
            }, {
              ref_for: true
            }, _ctx.ptm("submenuLabel")), [renderSlot(_ctx.$slots, _ctx.$slots.submenulabel ? "submenulabel" : "submenuheader", {
              item: item2
            }, function() {
              return [createTextVNode(toDisplayString($options.label(item2)), 1)];
            })], 16, _hoisted_3)) : createCommentVNode("", true), (openBlock(true), createElementBlock(Fragment, null, renderList(item2.items, function(child, j) {
              return openBlock(), createElementBlock(Fragment, {
                key: child.label + i + "_" + j
              }, [$options.visible(child) && !child.separator ? (openBlock(), createBlock(_component_PVMenuitem, {
                key: 0,
                id: _ctx.$id + "_" + i + "_" + j,
                item: child,
                templates: _ctx.$slots,
                focusedOptionId: $options.focusedOptionId,
                unstyled: _ctx.unstyled,
                onItemClick: $options.itemClick,
                onItemMousemove: $options.itemMouseMove,
                pt: _ctx.pt
              }, null, 8, ["id", "item", "templates", "focusedOptionId", "unstyled", "onItemClick", "onItemMousemove", "pt"])) : $options.visible(child) && child.separator ? (openBlock(), createElementBlock("li", mergeProps({
                key: "separator" + i + j,
                "class": [_ctx.cx("separator"), item2["class"]],
                style: child.style,
                role: "separator"
              }, {
                ref_for: true
              }, _ctx.ptm("separator")), null, 16)) : createCommentVNode("", true)], 64);
            }), 128))], 64)) : $options.visible(item2) && item2.separator ? (openBlock(), createElementBlock("li", mergeProps({
              key: "separator" + i.toString(),
              "class": [_ctx.cx("separator"), item2["class"]],
              style: item2.style,
              role: "separator"
            }, {
              ref_for: true
            }, _ctx.ptm("separator")), null, 16)) : (openBlock(), createBlock(_component_PVMenuitem, {
              key: $options.label(item2) + i.toString(),
              id: _ctx.$id + "_" + i,
              item: item2,
              index: i,
              templates: _ctx.$slots,
              focusedOptionId: $options.focusedOptionId,
              unstyled: _ctx.unstyled,
              onItemClick: $options.itemClick,
              onItemMousemove: $options.itemMouseMove,
              pt: _ctx.pt
            }, null, 8, ["id", "item", "index", "templates", "focusedOptionId", "unstyled", "onItemClick", "onItemMousemove", "pt"]))], 64);
          }), 128))], 16, _hoisted_2), _ctx.$slots.end ? (openBlock(), createElementBlock("div", mergeProps({
            key: 1,
            "class": _ctx.cx("end")
          }, _ctx.ptm("end")), [renderSlot(_ctx.$slots, "end")], 16)) : createCommentVNode("", true)], 16, _hoisted_1)) : createCommentVNode("", true)];
        }),
        _: 3
      }, 16, ["onEnter", "onLeave", "onAfterLeave"])];
    }),
    _: 3
  }, 8, ["appendTo", "disabled"]);
}
script.render = render;
const _sfc_main = /* @__PURE__ */ Object.assign({ layout: _sfc_main$1 }, {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    orders: Object,
    unseenCounts: Object,
    status: String
  },
  setup(__props) {
    const toast = useToast();
    const confirm = useConfirm();
    const props = __props;
    usePoll(1e4, {
      only: ["unseenCounts"],
      preserveScroll: true,
      preserveState: true
    });
    const invoicedAtDates = ref(null);
    const approvedAtDates = ref(null);
    const readyAtDates = ref(null);
    const fmt = (d) => d.toLocaleDateString("en-CA");
    function filterByInvoicedAt() {
      const start = invoicedAtDates.value?.[0];
      const end = invoicedAtDates.value?.[1];
      if (start && end) {
        router.get(route("admin.orders.index"), { status: props.status, start_date: fmt(start), end_date: fmt(end) }, { preserveState: true, preserveScroll: true });
      }
    }
    function resetInvoicedAt() {
      invoicedAtDates.value = null;
      router.get(route("admin.orders.index"), { status: props.status }, { preserveState: true, preserveScroll: true });
    }
    function filterByApprovedAt() {
      const start = approvedAtDates.value?.[0];
      const end = approvedAtDates.value?.[1];
      if (start && end) {
        router.get(route("admin.orders.index"), { status: props.status, start_date: fmt(start), end_date: fmt(end) }, { preserveState: true, preserveScroll: true });
      }
    }
    function resetApprovedAt() {
      approvedAtDates.value = null;
      router.get(route("admin.orders.index"), { status: props.status }, { preserveState: true, preserveScroll: true });
    }
    function filterByReadyAt() {
      const start = readyAtDates.value?.[0];
      const end = readyAtDates.value?.[1];
      if (start && end) {
        router.get(route("admin.orders.index"), {
          status: props.status,
          ready_start: fmt(start),
          ready_end: fmt(end),
          ...approvedAtDates.value?.[0] && approvedAtDates.value?.[1] ? { approved_start: fmt(approvedAtDates.value[0]), approved_end: fmt(approvedAtDates.value[1]) } : {}
        }, { preserveState: true, preserveScroll: true });
      }
    }
    function resetReadyAt() {
      readyAtDates.value = null;
      router.get(route("admin.orders.index"), {
        status: props.status,
        ...approvedAtDates.value?.[0] && approvedAtDates.value?.[1] ? { approved_start: fmt(approvedAtDates.value[0]), approved_end: fmt(approvedAtDates.value[1]) } : {}
      }, { preserveState: true, preserveScroll: true });
    }
    function filterByApprovedAtReady() {
      const start = approvedAtDates.value?.[0];
      const end = approvedAtDates.value?.[1];
      if (start && end) {
        router.get(route("admin.orders.index"), {
          status: props.status,
          approved_start: fmt(start),
          approved_end: fmt(end),
          ...readyAtDates.value?.[0] && readyAtDates.value?.[1] ? { ready_start: fmt(readyAtDates.value[0]), ready_end: fmt(readyAtDates.value[1]) } : {}
        }, { preserveState: true, preserveScroll: true });
      }
    }
    function resetApprovedAtReady() {
      approvedAtDates.value = null;
      router.get(route("admin.orders.index"), {
        status: props.status,
        ...readyAtDates.value?.[0] && readyAtDates.value?.[1] ? { ready_start: fmt(readyAtDates.value[0]), ready_end: fmt(readyAtDates.value[1]) } : {}
      }, { preserveState: true, preserveScroll: true });
    }
    const tabs = [
      { label: "Invoiced", value: "pending", badge: true, icon: "pi-clock" },
      { label: "Limit", value: "limit", badge: true, icon: "pi-credit-card" },
      { label: "Paid", value: "paid", badge: true, icon: "pi-check-circle" },
      { label: "Ready", value: "ready", badge: false, icon: "pi-box" },
      { label: "Cancelled", value: "cancelled", badge: false, icon: "pi-times-circle" }
    ];
    function switchTab(value) {
      invoicedAtDates.value = null;
      approvedAtDates.value = null;
      readyAtDates.value = null;
      router.get(route("admin.orders.index"), { status: value }, {
        only: ["orders", "status"],
        preserveState: true,
        preserveScroll: true
      });
    }
    const deliveryLabel = {
      office: "Office Pickup",
      tbilisi: "Tbilisi",
      regions: "Regions"
    };
    const providerLabel = {
      bog: "BOG",
      tbc: "TBC",
      pcb: "ProCredit",
      invoice: "Invoice",
      limit: "Limit"
    };
    const filters = ref({
      invoice_no: { value: null, matchMode: FilterMatchMode.EQUALS },
      "user.tax_id": { value: null, matchMode: FilterMatchMode.EQUALS },
      "user.name": { value: null, matchMode: FilterMatchMode.CONTAINS }
    });
    const detailDialog = ref(null);
    const rowMenus = ref({});
    function getMenuItems(order) {
      const items = [];
      if (order.status === "paid" || order.status === "ready") {
        items.push({
          label: "Send PDF",
          icon: "pi pi-file-pdf",
          command: () => openSendPdfDialog(order)
        });
      }
      if ((order.status === "paid" || order.status === "limit") && order.delivery_type !== "office") {
        items.push({
          label: "Send to Onway",
          icon: "pi pi-truck",
          command: () => confirmSendToOnway(order)
        });
      }
      if (order.status === "paid") {
        items.push({
          label: "Mark Ready (no notify)",
          icon: "pi pi-box",
          command: () => confirmMarkReady(order, false)
        });
      }
      items.push({
        label: "Delete",
        icon: "pi pi-trash",
        command: () => confirmDelete(order)
      });
      return items;
    }
    function confirmDelete(order) {
      confirm.require({
        message: `Delete order ${order.invoice_no ?? order.id.slice(0, 8)}? This cannot be undone.`,
        header: "Delete Order",
        icon: "pi pi-exclamation-triangle",
        rejectProps: { label: "No", severity: "secondary", outlined: true },
        acceptProps: { label: "Yes, Delete", severity: "danger" },
        accept: () => {
          router.delete(route("admin.orders.destroy", order.id), {
            preserveScroll: true,
            onSuccess: () => toast.add({ severity: "success", summary: "Deleted", detail: "Order deleted.", life: 3e3 }),
            onError: () => toast.add({ severity: "error", summary: "Error", detail: "Failed to delete order.", life: 3e3 })
          });
        }
      });
    }
    const sendPdfVisible = ref(false);
    const sendToEmail = ref(true);
    const sendToBC = ref(true);
    const selectedPdfOrder = ref(null);
    function openSendPdfDialog(order) {
      selectedPdfOrder.value = order;
      sendToEmail.value = true;
      sendToBC.value = true;
      sendPdfVisible.value = true;
    }
    function submitSendPdf() {
      sendPdfVisible.value = false;
      router.post(route("admin.orders.send-pdf", selectedPdfOrder.value.id), {
        send_to_email: sendToEmail.value,
        send_to_bc: sendToBC.value
      }, {
        preserveScroll: true,
        onSuccess: () => toast.add({ severity: "success", summary: "Sent", detail: "PDF sent successfully.", life: 3e3 }),
        onError: () => toast.add({ severity: "error", summary: "Error", detail: "Failed to send PDF.", life: 3e3 })
      });
    }
    function confirmStatusChange(order, newStatus) {
      const config = {
        paid: { label: "Approve", severity: "info", route: "admin.orders.approve", params: {} },
        ready: { label: "Mark Ready", severity: "success", route: "admin.orders.ready", params: { inform_user: true } },
        cancelled: { label: "Cancel", severity: "danger", route: "admin.orders.cancel", params: {} }
      }[newStatus];
      confirm.require({
        message: `Change order ${order.invoice_no ?? order.id.slice(0, 8)} status to "${newStatus}"?`,
        header: "Confirm Status Change",
        icon: "pi pi-exclamation-triangle",
        rejectProps: { label: "No", severity: "secondary", outlined: true },
        acceptProps: { label: config.label, severity: config.severity },
        accept: () => {
          router.put(route(config.route, order.id), config.params, {
            preserveScroll: true,
            onSuccess: () => toast.add({ severity: "success", summary: "Updated", detail: "Order status changed.", life: 3e3 }),
            onError: () => toast.add({ severity: "error", summary: "Error", detail: "Failed to update status.", life: 3e3 })
          });
        }
      });
    }
    function confirmSendToOnway(order) {
      confirm.require({
        message: `Send order ${order.invoice_no ?? order.id.slice(0, 8)} to Onway courier?`,
        header: "Send to Onway",
        icon: "pi pi-truck",
        rejectProps: { label: "No", severity: "secondary", outlined: true },
        acceptProps: { label: "Send", severity: "info" },
        accept: () => {
          router.post(route("admin.orders.send-onway", order.id), {}, {
            preserveScroll: true,
            onSuccess: () => toast.add({ severity: "success", summary: "Sent", detail: "Order sent to Onway.", life: 3e3 }),
            onError: (errors) => {
              toast.add({ severity: "error", summary: "Error", detail: errors?.message, life: 3e3 });
            }
          });
        }
      });
    }
    function confirmMarkReady(order, informUser) {
      confirm.require({
        message: `Mark order ${order.invoice_no ?? order.id.slice(0, 8)} as ready${informUser ? " and notify customer" : " (no notification)"}?`,
        header: "Confirm",
        icon: "pi pi-exclamation-triangle",
        rejectProps: { label: "No", severity: "secondary", outlined: true },
        acceptProps: { label: "Mark Ready", severity: "success" },
        accept: () => {
          router.put(route("admin.orders.ready", order.id), { inform_user: informUser }, {
            preserveScroll: true,
            onSuccess: () => toast.add({ severity: "success", summary: "Updated", detail: "Order marked as ready.", life: 3e3 }),
            onError: () => toast.add({ severity: "error", summary: "Error", detail: "Failed to update status.", life: 3e3 })
          });
        }
      });
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Dialog = script$4;
      const _component_Checkbox = script$5;
      const _component_Button = script$6;
      const _component_Tabs = script$7;
      const _component_TabList = script$8;
      const _component_Tab = script$9;
      const _component_Badge = script$a;
      const _component_DataTable = script$b;
      const _component_Column = script$c;
      const _component_DatePicker = script$d;
      const _component_Menu = script;
      const _directive_tooltip = Tooltip;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_Dialog, {
        visible: sendPdfVisible.value,
        "onUpdate:visible": ($event) => sendPdfVisible.value = $event,
        header: "Send PDF",
        modal: "",
        style: { width: "22rem" }
      }, {
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Button, {
              label: "Cancel",
              size: "small",
              severity: "secondary",
              variant: "text",
              onClick: ($event) => sendPdfVisible.value = false
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Button, {
              label: "Send",
              size: "small",
              class: "bg-brand-500 border-none",
              icon: "pi pi-send",
              onClick: submitSendPdf
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Button, {
                label: "Cancel",
                size: "small",
                severity: "secondary",
                variant: "text",
                onClick: ($event) => sendPdfVisible.value = false
              }, null, 8, ["onClick"]),
              createVNode(_component_Button, {
                label: "Send",
                size: "small",
                class: "bg-brand-500 border-none",
                icon: "pi pi-send",
                onClick: submitSendPdf
              })
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex flex-col gap-3 py-2" data-v-ba72add6${_scopeId}><div class="flex items-center gap-2" data-v-ba72add6${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Checkbox, {
              modelValue: sendToEmail.value,
              "onUpdate:modelValue": ($event) => sendToEmail.value = $event,
              inputId: "sendToEmail",
              binary: ""
            }, null, _parent2, _scopeId));
            _push2(`<label for="sendToEmail" data-v-ba72add6${_scopeId}>Send to company email</label></div><div class="flex items-center gap-2" data-v-ba72add6${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Checkbox, {
              modelValue: sendToBC.value,
              "onUpdate:modelValue": ($event) => sendToBC.value = $event,
              inputId: "sendToBC",
              binary: ""
            }, null, _parent2, _scopeId));
            _push2(`<label for="sendToBC" data-v-ba72add6${_scopeId}>Send to Business Central</label></div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex flex-col gap-3 py-2" }, [
                createVNode("div", { class: "flex items-center gap-2" }, [
                  createVNode(_component_Checkbox, {
                    modelValue: sendToEmail.value,
                    "onUpdate:modelValue": ($event) => sendToEmail.value = $event,
                    inputId: "sendToEmail",
                    binary: ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode("label", { for: "sendToEmail" }, "Send to company email")
                ]),
                createVNode("div", { class: "flex items-center gap-2" }, [
                  createVNode(_component_Checkbox, {
                    modelValue: sendToBC.value,
                    "onUpdate:modelValue": ($event) => sendToBC.value = $event,
                    inputId: "sendToBC",
                    binary: ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode("label", { for: "sendToBC" }, "Send to Business Central")
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$2, {
        ref_key: "detailDialog",
        ref: detailDialog
      }, null, _parent));
      _push(`<div class="rounded-xl overflow-hidden" data-v-ba72add6>`);
      _push(ssrRenderComponent(_component_Tabs, {
        value: __props.status,
        "onUpdate:value": switchTab
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_TabList, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(tabs, (tab) => {
                    _push3(ssrRenderComponent(_component_Tab, {
                      class: "flex items-center text-sm",
                      key: tab.value,
                      value: tab.value
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<i class="${ssrRenderClass(["pi text-sm", tab.icon])}" data-v-ba72add6${_scopeId3}></i><span data-v-ba72add6${_scopeId3}>${ssrInterpolate(tab.label)}</span>`);
                          if (tab.badge && __props.unseenCounts?.[tab.value]) {
                            _push4(ssrRenderComponent(_component_Badge, {
                              value: __props.unseenCounts[tab.value],
                              size: "small",
                              severity: tab.value === "pending" ? "warn" : "success"
                            }, null, _parent4, _scopeId3));
                          } else {
                            _push4(`<!---->`);
                          }
                        } else {
                          return [
                            createVNode("i", {
                              class: ["pi text-sm", tab.icon]
                            }, null, 2),
                            createVNode("span", null, toDisplayString(tab.label), 1),
                            tab.badge && __props.unseenCounts?.[tab.value] ? (openBlock(), createBlock(_component_Badge, {
                              key: 0,
                              value: __props.unseenCounts[tab.value],
                              size: "small",
                              severity: tab.value === "pending" ? "warn" : "success"
                            }, null, 8, ["value", "severity"])) : createCommentVNode("", true)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(), createBlock(Fragment, null, renderList(tabs, (tab) => {
                      return createVNode(_component_Tab, {
                        class: "flex items-center text-sm",
                        key: tab.value,
                        value: tab.value
                      }, {
                        default: withCtx(() => [
                          createVNode("i", {
                            class: ["pi text-sm", tab.icon]
                          }, null, 2),
                          createVNode("span", null, toDisplayString(tab.label), 1),
                          tab.badge && __props.unseenCounts?.[tab.value] ? (openBlock(), createBlock(_component_Badge, {
                            key: 0,
                            value: __props.unseenCounts[tab.value],
                            size: "small",
                            severity: tab.value === "pending" ? "warn" : "success"
                          }, null, 8, ["value", "severity"])) : createCommentVNode("", true)
                        ]),
                        _: 2
                      }, 1032, ["value"]);
                    }), 64))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_TabList, null, {
                default: withCtx(() => [
                  (openBlock(), createBlock(Fragment, null, renderList(tabs, (tab) => {
                    return createVNode(_component_Tab, {
                      class: "flex items-center text-sm",
                      key: tab.value,
                      value: tab.value
                    }, {
                      default: withCtx(() => [
                        createVNode("i", {
                          class: ["pi text-sm", tab.icon]
                        }, null, 2),
                        createVNode("span", null, toDisplayString(tab.label), 1),
                        tab.badge && __props.unseenCounts?.[tab.value] ? (openBlock(), createBlock(_component_Badge, {
                          key: 0,
                          value: __props.unseenCounts[tab.value],
                          size: "small",
                          severity: tab.value === "pending" ? "warn" : "success"
                        }, null, 8, ["value", "severity"])) : createCommentVNode("", true)
                      ]),
                      _: 2
                    }, 1032, ["value"]);
                  }), 64))
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(Deferred), { data: "orders" }, {
        fallback: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$4, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$4)
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_DataTable, {
              value: __props.orders?.data ?? [],
              dataKey: "id",
              rows: 10,
              paginator: "",
              rowsPerPageOptions: [10, 20, 50],
              tableStyle: "min-width: 50rem",
              class: "text-sm",
              filters: filters.value,
              "onUpdate:filters": ($event) => filters.value = $event,
              filterDisplay: "row",
              scrollable: ""
            }, {
              header: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex items-center gap-2" data-v-ba72add6${_scopeId2}><i class="pi pi-shopping-cart text-gray-500" data-v-ba72add6${_scopeId2}></i><span class="font-semibold text-gray-700" data-v-ba72add6${_scopeId2}>${ssrInterpolate(__props.orders.data.length)} order${ssrInterpolate(__props.orders.data.length !== 1 ? "s" : "")} <span class="capitalize text-gray-400" data-v-ba72add6${_scopeId2}>(${ssrInterpolate(__props.status)})</span></span></div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex items-center gap-2" }, [
                      createVNode("i", { class: "pi pi-shopping-cart text-gray-500" }),
                      createVNode("span", { class: "font-semibold text-gray-700" }, [
                        createTextVNode(toDisplayString(__props.orders.data.length) + " order" + toDisplayString(__props.orders.data.length !== 1 ? "s" : "") + " ", 1),
                        createVNode("span", { class: "capitalize text-gray-400" }, "(" + toDisplayString(__props.status) + ")", 1)
                      ])
                    ])
                  ];
                }
              }),
              empty: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex flex-col items-center justify-center h-40" data-v-ba72add6${_scopeId2}><i class="pi pi-inbox text-5xl text-gray-300 mb-3" data-v-ba72add6${_scopeId2}></i><p class="text-gray-500" data-v-ba72add6${_scopeId2}>No orders found.</p></div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex flex-col items-center justify-center h-40" }, [
                      createVNode("i", { class: "pi pi-inbox text-5xl text-gray-300 mb-3" }),
                      createVNode("p", { class: "text-gray-500" }, "No orders found.")
                    ])
                  ];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Column, {
                    header: "#",
                    headerStyle: "width:3rem"
                  }, {
                    body: withCtx(({ index }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(index + 1)}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(index + 1), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Column, {
                    field: "invoice_no",
                    header: "Invoice",
                    frozen: "",
                    style: { "min-width": "10rem" }
                  }, {
                    body: withCtx(({ data: data2 }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<span class="font-mono text-xs" data-v-ba72add6${_scopeId3}>${ssrInterpolate(data2.invoice_no ?? "—")}</span>`);
                      } else {
                        return [
                          createVNode("span", { class: "font-mono text-xs" }, toDisplayString(data2.invoice_no ?? "—"), 1)
                        ];
                      }
                    }),
                    filter: withCtx(({ filterModel, filterCallback }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_sfc_main$3, {
                          modelValue: filterModel.value,
                          "onUpdate:modelValue": ($event) => filterModel.value = $event,
                          size: "small",
                          class: "text-xs w-36",
                          onInput: ($event) => filterCallback(),
                          placeholder: "Search invoice"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_sfc_main$3, {
                            modelValue: filterModel.value,
                            "onUpdate:modelValue": ($event) => filterModel.value = $event,
                            size: "small",
                            class: "text-xs w-36",
                            onInput: ($event) => filterCallback(),
                            placeholder: "Search invoice"
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "onInput"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Column, {
                    field: "user.tax_id",
                    header: "User ID",
                    style: { "min-width": "10rem" }
                  }, {
                    body: withCtx(({ data: data2 }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<span class="font-mono text-xs text-gray-600" data-v-ba72add6${_scopeId3}>${ssrInterpolate(data2.user?.tax_id ?? "—")}</span>`);
                      } else {
                        return [
                          createVNode("span", { class: "font-mono text-xs text-gray-600" }, toDisplayString(data2.user?.tax_id ?? "—"), 1)
                        ];
                      }
                    }),
                    filter: withCtx(({ filterModel, filterCallback }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_sfc_main$3, {
                          modelValue: filterModel.value,
                          "onUpdate:modelValue": ($event) => filterModel.value = $event,
                          size: "small",
                          class: "text-xs w-36",
                          onInput: ($event) => filterCallback(),
                          placeholder: "Search ID"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_sfc_main$3, {
                            modelValue: filterModel.value,
                            "onUpdate:modelValue": ($event) => filterModel.value = $event,
                            size: "small",
                            class: "text-xs w-36",
                            onInput: ($event) => filterCallback(),
                            placeholder: "Search ID"
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "onInput"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Column, {
                    field: "user.name",
                    header: "Customer",
                    style: { "min-width": "10rem" }
                  }, {
                    body: withCtx(({ data: data2 }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div data-v-ba72add6${_scopeId3}><p class="font-medium" data-v-ba72add6${_scopeId3}>${ssrInterpolate(data2.user?.name ?? "—")}</p><p class="text-xs text-gray-400" data-v-ba72add6${_scopeId3}>${ssrInterpolate(data2.user?.phone)}</p></div>`);
                      } else {
                        return [
                          createVNode("div", null, [
                            createVNode("p", { class: "font-medium" }, toDisplayString(data2.user?.name ?? "—"), 1),
                            createVNode("p", { class: "text-xs text-gray-400" }, toDisplayString(data2.user?.phone), 1)
                          ])
                        ];
                      }
                    }),
                    filter: withCtx(({ filterModel, filterCallback }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_sfc_main$3, {
                          modelValue: filterModel.value,
                          "onUpdate:modelValue": ($event) => filterModel.value = $event,
                          size: "small",
                          class: "text-xs w-36",
                          onInput: ($event) => filterCallback(),
                          placeholder: "Search customer"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_sfc_main$3, {
                            modelValue: filterModel.value,
                            "onUpdate:modelValue": ($event) => filterModel.value = $event,
                            size: "small",
                            class: "text-xs w-36",
                            onInput: ($event) => filterCallback(),
                            placeholder: "Search customer"
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "onInput"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Column, {
                    header: "Total",
                    style: { "min-width": "7rem" }
                  }, {
                    body: withCtx(({ data: data2 }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<span class="font-semibold" data-v-ba72add6${_scopeId3}>${ssrInterpolate(data2.total)} ₾</span>`);
                      } else {
                        return [
                          createVNode("span", { class: "font-semibold" }, toDisplayString(data2.total) + " ₾", 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Column, { header: "Delivery" }, {
                    body: withCtx(({ data: data2 }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(deliveryLabel[data2.delivery_type] ?? data2.delivery_type)}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(deliveryLabel[data2.delivery_type] ?? data2.delivery_type), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Column, { header: "Payment" }, {
                    body: withCtx(({ data: data2 }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        if (data2.payment) {
                          _push4(`<span class="uppercase text-xs font-semibold text-gray-500" data-v-ba72add6${_scopeId3}>${ssrInterpolate(providerLabel[data2.payment.provider] ?? data2.payment.provider)}</span>`);
                        } else {
                          _push4(`<span class="text-gray-300" data-v-ba72add6${_scopeId3}>—</span>`);
                        }
                      } else {
                        return [
                          data2.payment ? (openBlock(), createBlock("span", {
                            key: 0,
                            class: "uppercase text-xs font-semibold text-gray-500"
                          }, toDisplayString(providerLabel[data2.payment.provider] ?? data2.payment.provider), 1)) : (openBlock(), createBlock("span", {
                            key: 1,
                            class: "text-gray-300"
                          }, "—"))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  if (__props.status === "cancelled") {
                    _push3(ssrRenderComponent(_component_Column, {
                      field: "created_at",
                      header: "Date",
                      style: { "min-width": "7rem" }
                    }, null, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  if (__props.status === "pending") {
                    _push3(ssrRenderComponent(_component_Column, {
                      header: "Invoiced At",
                      style: { "min-width": "14rem" }
                    }, {
                      body: withCtx(({ data: data2 }, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(data2.invoiced_at ?? "—")}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(data2.invoiced_at ?? "—"), 1)
                          ];
                        }
                      }),
                      filter: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_DatePicker, {
                            modelValue: invoicedAtDates.value,
                            "onUpdate:modelValue": [($event) => invoicedAtDates.value = $event, filterByInvoicedAt],
                            showIcon: "",
                            showButtonBar: "",
                            onClearClick: resetInvoicedAt,
                            placeholder: "DD/MM/YY",
                            selectionMode: "range",
                            hideOnRangeSelection: "",
                            size: "small",
                            maxDate: /* @__PURE__ */ new Date(),
                            manualInput: false,
                            inputClass: "py-0.5 text-xs"
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_DatePicker, {
                              modelValue: invoicedAtDates.value,
                              "onUpdate:modelValue": [($event) => invoicedAtDates.value = $event, filterByInvoicedAt],
                              showIcon: "",
                              showButtonBar: "",
                              onClearClick: resetInvoicedAt,
                              placeholder: "DD/MM/YY",
                              selectionMode: "range",
                              hideOnRangeSelection: "",
                              size: "small",
                              maxDate: /* @__PURE__ */ new Date(),
                              manualInput: false,
                              inputClass: "py-0.5 text-xs"
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "maxDate"])
                          ];
                        }
                      }),
                      filtericon: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) ;
                        else {
                          return [];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  if (__props.status === "limit") {
                    _push3(ssrRenderComponent(_component_Column, {
                      header: "Approved At",
                      style: { "min-width": "14rem" }
                    }, {
                      body: withCtx(({ data: data2 }, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(data2.approved_at ?? "—")}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(data2.approved_at ?? "—"), 1)
                          ];
                        }
                      }),
                      filter: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_DatePicker, {
                            modelValue: approvedAtDates.value,
                            "onUpdate:modelValue": [($event) => approvedAtDates.value = $event, filterByApprovedAt],
                            showIcon: "",
                            showButtonBar: "",
                            onClearClick: resetApprovedAt,
                            placeholder: "DD/MM/YY",
                            selectionMode: "range",
                            hideOnRangeSelection: "",
                            size: "small",
                            maxDate: /* @__PURE__ */ new Date(),
                            manualInput: false,
                            inputClass: "py-0.5 text-xs"
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_DatePicker, {
                              modelValue: approvedAtDates.value,
                              "onUpdate:modelValue": [($event) => approvedAtDates.value = $event, filterByApprovedAt],
                              showIcon: "",
                              showButtonBar: "",
                              onClearClick: resetApprovedAt,
                              placeholder: "DD/MM/YY",
                              selectionMode: "range",
                              hideOnRangeSelection: "",
                              size: "small",
                              maxDate: /* @__PURE__ */ new Date(),
                              manualInput: false,
                              inputClass: "py-0.5 text-xs"
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "maxDate"])
                          ];
                        }
                      }),
                      filtericon: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) ;
                        else {
                          return [];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  if (__props.status === "paid") {
                    _push3(ssrRenderComponent(_component_Column, {
                      header: "Approved At",
                      style: { "min-width": "14rem" }
                    }, {
                      body: withCtx(({ data: data2 }, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(data2.approved_at ?? "—")}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(data2.approved_at ?? "—"), 1)
                          ];
                        }
                      }),
                      filter: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_DatePicker, {
                            modelValue: approvedAtDates.value,
                            "onUpdate:modelValue": [($event) => approvedAtDates.value = $event, filterByApprovedAt],
                            showIcon: "",
                            showButtonBar: "",
                            onClearClick: resetApprovedAt,
                            placeholder: "DD/MM/YY",
                            selectionMode: "range",
                            hideOnRangeSelection: "",
                            size: "small",
                            maxDate: /* @__PURE__ */ new Date(),
                            manualInput: false,
                            inputClass: "py-0.5 text-xs"
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_DatePicker, {
                              modelValue: approvedAtDates.value,
                              "onUpdate:modelValue": [($event) => approvedAtDates.value = $event, filterByApprovedAt],
                              showIcon: "",
                              showButtonBar: "",
                              onClearClick: resetApprovedAt,
                              placeholder: "DD/MM/YY",
                              selectionMode: "range",
                              hideOnRangeSelection: "",
                              size: "small",
                              maxDate: /* @__PURE__ */ new Date(),
                              manualInput: false,
                              inputClass: "py-0.5 text-xs"
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "maxDate"])
                          ];
                        }
                      }),
                      filtericon: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) ;
                        else {
                          return [];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  if (__props.status === "ready") {
                    _push3(ssrRenderComponent(_component_Column, {
                      header: "Approved At",
                      style: { "min-width": "14rem" }
                    }, {
                      body: withCtx(({ data: data2 }, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(data2.approved_at ?? "—")}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(data2.approved_at ?? "—"), 1)
                          ];
                        }
                      }),
                      filter: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_DatePicker, {
                            modelValue: approvedAtDates.value,
                            "onUpdate:modelValue": [($event) => approvedAtDates.value = $event, filterByApprovedAtReady],
                            showIcon: "",
                            showButtonBar: "",
                            onClearClick: resetApprovedAtReady,
                            placeholder: "DD/MM/YY",
                            selectionMode: "range",
                            hideOnRangeSelection: "",
                            size: "small",
                            maxDate: /* @__PURE__ */ new Date(),
                            manualInput: false,
                            inputClass: "py-0.5 text-xs"
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_DatePicker, {
                              modelValue: approvedAtDates.value,
                              "onUpdate:modelValue": [($event) => approvedAtDates.value = $event, filterByApprovedAtReady],
                              showIcon: "",
                              showButtonBar: "",
                              onClearClick: resetApprovedAtReady,
                              placeholder: "DD/MM/YY",
                              selectionMode: "range",
                              hideOnRangeSelection: "",
                              size: "small",
                              maxDate: /* @__PURE__ */ new Date(),
                              manualInput: false,
                              inputClass: "py-0.5 text-xs"
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "maxDate"])
                          ];
                        }
                      }),
                      filtericon: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) ;
                        else {
                          return [];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  if (__props.status === "ready") {
                    _push3(ssrRenderComponent(_component_Column, {
                      header: "Ready At",
                      style: { "min-width": "14rem" }
                    }, {
                      body: withCtx(({ data: data2 }, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(data2.ready_at ?? "—")}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(data2.ready_at ?? "—"), 1)
                          ];
                        }
                      }),
                      filter: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_DatePicker, {
                            modelValue: readyAtDates.value,
                            "onUpdate:modelValue": [($event) => readyAtDates.value = $event, filterByReadyAt],
                            showIcon: "",
                            showButtonBar: "",
                            onClearClick: resetReadyAt,
                            placeholder: "DD/MM/YY",
                            selectionMode: "range",
                            hideOnRangeSelection: "",
                            size: "small",
                            maxDate: /* @__PURE__ */ new Date(),
                            manualInput: false,
                            inputClass: "py-0.5 text-xs"
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_DatePicker, {
                              modelValue: readyAtDates.value,
                              "onUpdate:modelValue": [($event) => readyAtDates.value = $event, filterByReadyAt],
                              showIcon: "",
                              showButtonBar: "",
                              onClearClick: resetReadyAt,
                              placeholder: "DD/MM/YY",
                              selectionMode: "range",
                              hideOnRangeSelection: "",
                              size: "small",
                              maxDate: /* @__PURE__ */ new Date(),
                              manualInput: false,
                              inputClass: "py-0.5 text-xs"
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "maxDate"])
                          ];
                        }
                      }),
                      filtericon: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) ;
                        else {
                          return [];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(ssrRenderComponent(_component_Column, {
                    header: "Actions",
                    frozen: "",
                    alignFrozen: "right"
                  }, {
                    body: withCtx(({ data: data2 }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="flex items-center gap-1" data-v-ba72add6${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_Button, mergeProps({
                          icon: "pi pi-eye",
                          size: "small",
                          variant: "text",
                          raised: "",
                          rounded: "",
                          severity: "secondary",
                          onClick: ($event) => detailDialog.value.open(data2.id)
                        }, ssrGetDirectiveProps(_ctx, _directive_tooltip, "View", void 0, { top: true })), null, _parent4, _scopeId3));
                        if (data2.status === "pending") {
                          _push4(ssrRenderComponent(_component_Button, mergeProps({
                            icon: "pi pi-check",
                            size: "small",
                            variant: "text",
                            raised: "",
                            rounded: "",
                            severity: "info",
                            onClick: ($event) => confirmStatusChange(data2, "paid")
                          }, ssrGetDirectiveProps(_ctx, _directive_tooltip, "Mark Paid", void 0, { top: true })), null, _parent4, _scopeId3));
                        } else {
                          _push4(`<!---->`);
                        }
                        if (data2.status === "paid" || data2.status === "limit") {
                          _push4(ssrRenderComponent(_component_Button, mergeProps({
                            icon: "pi pi-box",
                            size: "small",
                            variant: "text",
                            raised: "",
                            rounded: "",
                            severity: "success",
                            onClick: ($event) => confirmMarkReady(data2, true)
                          }, ssrGetDirectiveProps(_ctx, _directive_tooltip, "Mark Ready", void 0, { top: true })), null, _parent4, _scopeId3));
                        } else {
                          _push4(`<!---->`);
                        }
                        if (data2.status === "pending") {
                          _push4(ssrRenderComponent(_component_Button, mergeProps({
                            icon: "pi pi-times",
                            size: "small",
                            variant: "text",
                            raised: "",
                            rounded: "",
                            severity: "danger",
                            onClick: ($event) => confirmStatusChange(data2, "cancelled")
                          }, ssrGetDirectiveProps(_ctx, _directive_tooltip, "Cancel", void 0, { top: true })), null, _parent4, _scopeId3));
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(ssrRenderComponent(_component_Button, {
                          icon: "pi pi-ellipsis-v",
                          size: "small",
                          variant: "text",
                          rounded: "",
                          severity: "secondary",
                          "aria-haspopup": "true",
                          onClick: (e) => rowMenus.value[data2.id].toggle(e)
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_Menu, {
                          ref: (el) => {
                            if (el) rowMenus.value[data2.id] = el;
                          },
                          model: getMenuItems(data2),
                          popup: "",
                          class: "text-sm"
                        }, null, _parent4, _scopeId3));
                        _push4(`</div>`);
                      } else {
                        return [
                          createVNode("div", { class: "flex items-center gap-1" }, [
                            withDirectives(createVNode(_component_Button, {
                              icon: "pi pi-eye",
                              size: "small",
                              variant: "text",
                              raised: "",
                              rounded: "",
                              severity: "secondary",
                              onClick: ($event) => detailDialog.value.open(data2.id)
                            }, null, 8, ["onClick"]), [
                              [
                                _directive_tooltip,
                                "View",
                                void 0,
                                { top: true }
                              ]
                            ]),
                            data2.status === "pending" ? withDirectives((openBlock(), createBlock(_component_Button, {
                              key: 0,
                              icon: "pi pi-check",
                              size: "small",
                              variant: "text",
                              raised: "",
                              rounded: "",
                              severity: "info",
                              onClick: ($event) => confirmStatusChange(data2, "paid")
                            }, null, 8, ["onClick"])), [
                              [
                                _directive_tooltip,
                                "Mark Paid",
                                void 0,
                                { top: true }
                              ]
                            ]) : createCommentVNode("", true),
                            data2.status === "paid" || data2.status === "limit" ? withDirectives((openBlock(), createBlock(_component_Button, {
                              key: 1,
                              icon: "pi pi-box",
                              size: "small",
                              variant: "text",
                              raised: "",
                              rounded: "",
                              severity: "success",
                              onClick: ($event) => confirmMarkReady(data2, true)
                            }, null, 8, ["onClick"])), [
                              [
                                _directive_tooltip,
                                "Mark Ready",
                                void 0,
                                { top: true }
                              ]
                            ]) : createCommentVNode("", true),
                            data2.status === "pending" ? withDirectives((openBlock(), createBlock(_component_Button, {
                              key: 2,
                              icon: "pi pi-times",
                              size: "small",
                              variant: "text",
                              raised: "",
                              rounded: "",
                              severity: "danger",
                              onClick: ($event) => confirmStatusChange(data2, "cancelled")
                            }, null, 8, ["onClick"])), [
                              [
                                _directive_tooltip,
                                "Cancel",
                                void 0,
                                { top: true }
                              ]
                            ]) : createCommentVNode("", true),
                            createVNode(_component_Button, {
                              icon: "pi pi-ellipsis-v",
                              size: "small",
                              variant: "text",
                              rounded: "",
                              severity: "secondary",
                              "aria-haspopup": "true",
                              onClick: (e) => rowMenus.value[data2.id].toggle(e)
                            }, null, 8, ["onClick"]),
                            createVNode(_component_Menu, {
                              ref: (el) => {
                                if (el) rowMenus.value[data2.id] = el;
                              },
                              model: getMenuItems(data2),
                              popup: "",
                              class: "text-sm"
                            }, null, 8, ["model"])
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Column, {
                      header: "#",
                      headerStyle: "width:3rem"
                    }, {
                      body: withCtx(({ index }) => [
                        createTextVNode(toDisplayString(index + 1), 1)
                      ]),
                      _: 1
                    }),
                    createVNode(_component_Column, {
                      field: "invoice_no",
                      header: "Invoice",
                      frozen: "",
                      style: { "min-width": "10rem" }
                    }, {
                      body: withCtx(({ data: data2 }) => [
                        createVNode("span", { class: "font-mono text-xs" }, toDisplayString(data2.invoice_no ?? "—"), 1)
                      ]),
                      filter: withCtx(({ filterModel, filterCallback }) => [
                        createVNode(_sfc_main$3, {
                          modelValue: filterModel.value,
                          "onUpdate:modelValue": ($event) => filterModel.value = $event,
                          size: "small",
                          class: "text-xs w-36",
                          onInput: ($event) => filterCallback(),
                          placeholder: "Search invoice"
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "onInput"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_Column, {
                      field: "user.tax_id",
                      header: "User ID",
                      style: { "min-width": "10rem" }
                    }, {
                      body: withCtx(({ data: data2 }) => [
                        createVNode("span", { class: "font-mono text-xs text-gray-600" }, toDisplayString(data2.user?.tax_id ?? "—"), 1)
                      ]),
                      filter: withCtx(({ filterModel, filterCallback }) => [
                        createVNode(_sfc_main$3, {
                          modelValue: filterModel.value,
                          "onUpdate:modelValue": ($event) => filterModel.value = $event,
                          size: "small",
                          class: "text-xs w-36",
                          onInput: ($event) => filterCallback(),
                          placeholder: "Search ID"
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "onInput"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_Column, {
                      field: "user.name",
                      header: "Customer",
                      style: { "min-width": "10rem" }
                    }, {
                      body: withCtx(({ data: data2 }) => [
                        createVNode("div", null, [
                          createVNode("p", { class: "font-medium" }, toDisplayString(data2.user?.name ?? "—"), 1),
                          createVNode("p", { class: "text-xs text-gray-400" }, toDisplayString(data2.user?.phone), 1)
                        ])
                      ]),
                      filter: withCtx(({ filterModel, filterCallback }) => [
                        createVNode(_sfc_main$3, {
                          modelValue: filterModel.value,
                          "onUpdate:modelValue": ($event) => filterModel.value = $event,
                          size: "small",
                          class: "text-xs w-36",
                          onInput: ($event) => filterCallback(),
                          placeholder: "Search customer"
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "onInput"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_Column, {
                      header: "Total",
                      style: { "min-width": "7rem" }
                    }, {
                      body: withCtx(({ data: data2 }) => [
                        createVNode("span", { class: "font-semibold" }, toDisplayString(data2.total) + " ₾", 1)
                      ]),
                      _: 1
                    }),
                    createVNode(_component_Column, { header: "Delivery" }, {
                      body: withCtx(({ data: data2 }) => [
                        createTextVNode(toDisplayString(deliveryLabel[data2.delivery_type] ?? data2.delivery_type), 1)
                      ]),
                      _: 1
                    }),
                    createVNode(_component_Column, { header: "Payment" }, {
                      body: withCtx(({ data: data2 }) => [
                        data2.payment ? (openBlock(), createBlock("span", {
                          key: 0,
                          class: "uppercase text-xs font-semibold text-gray-500"
                        }, toDisplayString(providerLabel[data2.payment.provider] ?? data2.payment.provider), 1)) : (openBlock(), createBlock("span", {
                          key: 1,
                          class: "text-gray-300"
                        }, "—"))
                      ]),
                      _: 1
                    }),
                    __props.status === "cancelled" ? (openBlock(), createBlock(_component_Column, {
                      key: 0,
                      field: "created_at",
                      header: "Date",
                      style: { "min-width": "7rem" }
                    })) : createCommentVNode("", true),
                    __props.status === "pending" ? (openBlock(), createBlock(_component_Column, {
                      key: 1,
                      header: "Invoiced At",
                      style: { "min-width": "14rem" }
                    }, {
                      body: withCtx(({ data: data2 }) => [
                        createTextVNode(toDisplayString(data2.invoiced_at ?? "—"), 1)
                      ]),
                      filter: withCtx(() => [
                        createVNode(_component_DatePicker, {
                          modelValue: invoicedAtDates.value,
                          "onUpdate:modelValue": [($event) => invoicedAtDates.value = $event, filterByInvoicedAt],
                          showIcon: "",
                          showButtonBar: "",
                          onClearClick: resetInvoicedAt,
                          placeholder: "DD/MM/YY",
                          selectionMode: "range",
                          hideOnRangeSelection: "",
                          size: "small",
                          maxDate: /* @__PURE__ */ new Date(),
                          manualInput: false,
                          inputClass: "py-0.5 text-xs"
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "maxDate"])
                      ]),
                      filtericon: withCtx(() => []),
                      _: 1
                    })) : createCommentVNode("", true),
                    __props.status === "limit" ? (openBlock(), createBlock(_component_Column, {
                      key: 2,
                      header: "Approved At",
                      style: { "min-width": "14rem" }
                    }, {
                      body: withCtx(({ data: data2 }) => [
                        createTextVNode(toDisplayString(data2.approved_at ?? "—"), 1)
                      ]),
                      filter: withCtx(() => [
                        createVNode(_component_DatePicker, {
                          modelValue: approvedAtDates.value,
                          "onUpdate:modelValue": [($event) => approvedAtDates.value = $event, filterByApprovedAt],
                          showIcon: "",
                          showButtonBar: "",
                          onClearClick: resetApprovedAt,
                          placeholder: "DD/MM/YY",
                          selectionMode: "range",
                          hideOnRangeSelection: "",
                          size: "small",
                          maxDate: /* @__PURE__ */ new Date(),
                          manualInput: false,
                          inputClass: "py-0.5 text-xs"
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "maxDate"])
                      ]),
                      filtericon: withCtx(() => []),
                      _: 1
                    })) : createCommentVNode("", true),
                    __props.status === "paid" ? (openBlock(), createBlock(_component_Column, {
                      key: 3,
                      header: "Approved At",
                      style: { "min-width": "14rem" }
                    }, {
                      body: withCtx(({ data: data2 }) => [
                        createTextVNode(toDisplayString(data2.approved_at ?? "—"), 1)
                      ]),
                      filter: withCtx(() => [
                        createVNode(_component_DatePicker, {
                          modelValue: approvedAtDates.value,
                          "onUpdate:modelValue": [($event) => approvedAtDates.value = $event, filterByApprovedAt],
                          showIcon: "",
                          showButtonBar: "",
                          onClearClick: resetApprovedAt,
                          placeholder: "DD/MM/YY",
                          selectionMode: "range",
                          hideOnRangeSelection: "",
                          size: "small",
                          maxDate: /* @__PURE__ */ new Date(),
                          manualInput: false,
                          inputClass: "py-0.5 text-xs"
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "maxDate"])
                      ]),
                      filtericon: withCtx(() => []),
                      _: 1
                    })) : createCommentVNode("", true),
                    __props.status === "ready" ? (openBlock(), createBlock(_component_Column, {
                      key: 4,
                      header: "Approved At",
                      style: { "min-width": "14rem" }
                    }, {
                      body: withCtx(({ data: data2 }) => [
                        createTextVNode(toDisplayString(data2.approved_at ?? "—"), 1)
                      ]),
                      filter: withCtx(() => [
                        createVNode(_component_DatePicker, {
                          modelValue: approvedAtDates.value,
                          "onUpdate:modelValue": [($event) => approvedAtDates.value = $event, filterByApprovedAtReady],
                          showIcon: "",
                          showButtonBar: "",
                          onClearClick: resetApprovedAtReady,
                          placeholder: "DD/MM/YY",
                          selectionMode: "range",
                          hideOnRangeSelection: "",
                          size: "small",
                          maxDate: /* @__PURE__ */ new Date(),
                          manualInput: false,
                          inputClass: "py-0.5 text-xs"
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "maxDate"])
                      ]),
                      filtericon: withCtx(() => []),
                      _: 1
                    })) : createCommentVNode("", true),
                    __props.status === "ready" ? (openBlock(), createBlock(_component_Column, {
                      key: 5,
                      header: "Ready At",
                      style: { "min-width": "14rem" }
                    }, {
                      body: withCtx(({ data: data2 }) => [
                        createTextVNode(toDisplayString(data2.ready_at ?? "—"), 1)
                      ]),
                      filter: withCtx(() => [
                        createVNode(_component_DatePicker, {
                          modelValue: readyAtDates.value,
                          "onUpdate:modelValue": [($event) => readyAtDates.value = $event, filterByReadyAt],
                          showIcon: "",
                          showButtonBar: "",
                          onClearClick: resetReadyAt,
                          placeholder: "DD/MM/YY",
                          selectionMode: "range",
                          hideOnRangeSelection: "",
                          size: "small",
                          maxDate: /* @__PURE__ */ new Date(),
                          manualInput: false,
                          inputClass: "py-0.5 text-xs"
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "maxDate"])
                      ]),
                      filtericon: withCtx(() => []),
                      _: 1
                    })) : createCommentVNode("", true),
                    createVNode(_component_Column, {
                      header: "Actions",
                      frozen: "",
                      alignFrozen: "right"
                    }, {
                      body: withCtx(({ data: data2 }) => [
                        createVNode("div", { class: "flex items-center gap-1" }, [
                          withDirectives(createVNode(_component_Button, {
                            icon: "pi pi-eye",
                            size: "small",
                            variant: "text",
                            raised: "",
                            rounded: "",
                            severity: "secondary",
                            onClick: ($event) => detailDialog.value.open(data2.id)
                          }, null, 8, ["onClick"]), [
                            [
                              _directive_tooltip,
                              "View",
                              void 0,
                              { top: true }
                            ]
                          ]),
                          data2.status === "pending" ? withDirectives((openBlock(), createBlock(_component_Button, {
                            key: 0,
                            icon: "pi pi-check",
                            size: "small",
                            variant: "text",
                            raised: "",
                            rounded: "",
                            severity: "info",
                            onClick: ($event) => confirmStatusChange(data2, "paid")
                          }, null, 8, ["onClick"])), [
                            [
                              _directive_tooltip,
                              "Mark Paid",
                              void 0,
                              { top: true }
                            ]
                          ]) : createCommentVNode("", true),
                          data2.status === "paid" || data2.status === "limit" ? withDirectives((openBlock(), createBlock(_component_Button, {
                            key: 1,
                            icon: "pi pi-box",
                            size: "small",
                            variant: "text",
                            raised: "",
                            rounded: "",
                            severity: "success",
                            onClick: ($event) => confirmMarkReady(data2, true)
                          }, null, 8, ["onClick"])), [
                            [
                              _directive_tooltip,
                              "Mark Ready",
                              void 0,
                              { top: true }
                            ]
                          ]) : createCommentVNode("", true),
                          data2.status === "pending" ? withDirectives((openBlock(), createBlock(_component_Button, {
                            key: 2,
                            icon: "pi pi-times",
                            size: "small",
                            variant: "text",
                            raised: "",
                            rounded: "",
                            severity: "danger",
                            onClick: ($event) => confirmStatusChange(data2, "cancelled")
                          }, null, 8, ["onClick"])), [
                            [
                              _directive_tooltip,
                              "Cancel",
                              void 0,
                              { top: true }
                            ]
                          ]) : createCommentVNode("", true),
                          createVNode(_component_Button, {
                            icon: "pi pi-ellipsis-v",
                            size: "small",
                            variant: "text",
                            rounded: "",
                            severity: "secondary",
                            "aria-haspopup": "true",
                            onClick: (e) => rowMenus.value[data2.id].toggle(e)
                          }, null, 8, ["onClick"]),
                          createVNode(_component_Menu, {
                            ref: (el) => {
                              if (el) rowMenus.value[data2.id] = el;
                            },
                            model: getMenuItems(data2),
                            popup: "",
                            class: "text-sm"
                          }, null, 8, ["model"])
                        ])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_DataTable, {
                value: __props.orders?.data ?? [],
                dataKey: "id",
                rows: 10,
                paginator: "",
                rowsPerPageOptions: [10, 20, 50],
                tableStyle: "min-width: 50rem",
                class: "text-sm",
                filters: filters.value,
                "onUpdate:filters": ($event) => filters.value = $event,
                filterDisplay: "row",
                scrollable: ""
              }, {
                header: withCtx(() => [
                  createVNode("div", { class: "flex items-center gap-2" }, [
                    createVNode("i", { class: "pi pi-shopping-cart text-gray-500" }),
                    createVNode("span", { class: "font-semibold text-gray-700" }, [
                      createTextVNode(toDisplayString(__props.orders.data.length) + " order" + toDisplayString(__props.orders.data.length !== 1 ? "s" : "") + " ", 1),
                      createVNode("span", { class: "capitalize text-gray-400" }, "(" + toDisplayString(__props.status) + ")", 1)
                    ])
                  ])
                ]),
                empty: withCtx(() => [
                  createVNode("div", { class: "flex flex-col items-center justify-center h-40" }, [
                    createVNode("i", { class: "pi pi-inbox text-5xl text-gray-300 mb-3" }),
                    createVNode("p", { class: "text-gray-500" }, "No orders found.")
                  ])
                ]),
                default: withCtx(() => [
                  createVNode(_component_Column, {
                    header: "#",
                    headerStyle: "width:3rem"
                  }, {
                    body: withCtx(({ index }) => [
                      createTextVNode(toDisplayString(index + 1), 1)
                    ]),
                    _: 1
                  }),
                  createVNode(_component_Column, {
                    field: "invoice_no",
                    header: "Invoice",
                    frozen: "",
                    style: { "min-width": "10rem" }
                  }, {
                    body: withCtx(({ data: data2 }) => [
                      createVNode("span", { class: "font-mono text-xs" }, toDisplayString(data2.invoice_no ?? "—"), 1)
                    ]),
                    filter: withCtx(({ filterModel, filterCallback }) => [
                      createVNode(_sfc_main$3, {
                        modelValue: filterModel.value,
                        "onUpdate:modelValue": ($event) => filterModel.value = $event,
                        size: "small",
                        class: "text-xs w-36",
                        onInput: ($event) => filterCallback(),
                        placeholder: "Search invoice"
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "onInput"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_Column, {
                    field: "user.tax_id",
                    header: "User ID",
                    style: { "min-width": "10rem" }
                  }, {
                    body: withCtx(({ data: data2 }) => [
                      createVNode("span", { class: "font-mono text-xs text-gray-600" }, toDisplayString(data2.user?.tax_id ?? "—"), 1)
                    ]),
                    filter: withCtx(({ filterModel, filterCallback }) => [
                      createVNode(_sfc_main$3, {
                        modelValue: filterModel.value,
                        "onUpdate:modelValue": ($event) => filterModel.value = $event,
                        size: "small",
                        class: "text-xs w-36",
                        onInput: ($event) => filterCallback(),
                        placeholder: "Search ID"
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "onInput"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_Column, {
                    field: "user.name",
                    header: "Customer",
                    style: { "min-width": "10rem" }
                  }, {
                    body: withCtx(({ data: data2 }) => [
                      createVNode("div", null, [
                        createVNode("p", { class: "font-medium" }, toDisplayString(data2.user?.name ?? "—"), 1),
                        createVNode("p", { class: "text-xs text-gray-400" }, toDisplayString(data2.user?.phone), 1)
                      ])
                    ]),
                    filter: withCtx(({ filterModel, filterCallback }) => [
                      createVNode(_sfc_main$3, {
                        modelValue: filterModel.value,
                        "onUpdate:modelValue": ($event) => filterModel.value = $event,
                        size: "small",
                        class: "text-xs w-36",
                        onInput: ($event) => filterCallback(),
                        placeholder: "Search customer"
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "onInput"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_Column, {
                    header: "Total",
                    style: { "min-width": "7rem" }
                  }, {
                    body: withCtx(({ data: data2 }) => [
                      createVNode("span", { class: "font-semibold" }, toDisplayString(data2.total) + " ₾", 1)
                    ]),
                    _: 1
                  }),
                  createVNode(_component_Column, { header: "Delivery" }, {
                    body: withCtx(({ data: data2 }) => [
                      createTextVNode(toDisplayString(deliveryLabel[data2.delivery_type] ?? data2.delivery_type), 1)
                    ]),
                    _: 1
                  }),
                  createVNode(_component_Column, { header: "Payment" }, {
                    body: withCtx(({ data: data2 }) => [
                      data2.payment ? (openBlock(), createBlock("span", {
                        key: 0,
                        class: "uppercase text-xs font-semibold text-gray-500"
                      }, toDisplayString(providerLabel[data2.payment.provider] ?? data2.payment.provider), 1)) : (openBlock(), createBlock("span", {
                        key: 1,
                        class: "text-gray-300"
                      }, "—"))
                    ]),
                    _: 1
                  }),
                  __props.status === "cancelled" ? (openBlock(), createBlock(_component_Column, {
                    key: 0,
                    field: "created_at",
                    header: "Date",
                    style: { "min-width": "7rem" }
                  })) : createCommentVNode("", true),
                  __props.status === "pending" ? (openBlock(), createBlock(_component_Column, {
                    key: 1,
                    header: "Invoiced At",
                    style: { "min-width": "14rem" }
                  }, {
                    body: withCtx(({ data: data2 }) => [
                      createTextVNode(toDisplayString(data2.invoiced_at ?? "—"), 1)
                    ]),
                    filter: withCtx(() => [
                      createVNode(_component_DatePicker, {
                        modelValue: invoicedAtDates.value,
                        "onUpdate:modelValue": [($event) => invoicedAtDates.value = $event, filterByInvoicedAt],
                        showIcon: "",
                        showButtonBar: "",
                        onClearClick: resetInvoicedAt,
                        placeholder: "DD/MM/YY",
                        selectionMode: "range",
                        hideOnRangeSelection: "",
                        size: "small",
                        maxDate: /* @__PURE__ */ new Date(),
                        manualInput: false,
                        inputClass: "py-0.5 text-xs"
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "maxDate"])
                    ]),
                    filtericon: withCtx(() => []),
                    _: 1
                  })) : createCommentVNode("", true),
                  __props.status === "limit" ? (openBlock(), createBlock(_component_Column, {
                    key: 2,
                    header: "Approved At",
                    style: { "min-width": "14rem" }
                  }, {
                    body: withCtx(({ data: data2 }) => [
                      createTextVNode(toDisplayString(data2.approved_at ?? "—"), 1)
                    ]),
                    filter: withCtx(() => [
                      createVNode(_component_DatePicker, {
                        modelValue: approvedAtDates.value,
                        "onUpdate:modelValue": [($event) => approvedAtDates.value = $event, filterByApprovedAt],
                        showIcon: "",
                        showButtonBar: "",
                        onClearClick: resetApprovedAt,
                        placeholder: "DD/MM/YY",
                        selectionMode: "range",
                        hideOnRangeSelection: "",
                        size: "small",
                        maxDate: /* @__PURE__ */ new Date(),
                        manualInput: false,
                        inputClass: "py-0.5 text-xs"
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "maxDate"])
                    ]),
                    filtericon: withCtx(() => []),
                    _: 1
                  })) : createCommentVNode("", true),
                  __props.status === "paid" ? (openBlock(), createBlock(_component_Column, {
                    key: 3,
                    header: "Approved At",
                    style: { "min-width": "14rem" }
                  }, {
                    body: withCtx(({ data: data2 }) => [
                      createTextVNode(toDisplayString(data2.approved_at ?? "—"), 1)
                    ]),
                    filter: withCtx(() => [
                      createVNode(_component_DatePicker, {
                        modelValue: approvedAtDates.value,
                        "onUpdate:modelValue": [($event) => approvedAtDates.value = $event, filterByApprovedAt],
                        showIcon: "",
                        showButtonBar: "",
                        onClearClick: resetApprovedAt,
                        placeholder: "DD/MM/YY",
                        selectionMode: "range",
                        hideOnRangeSelection: "",
                        size: "small",
                        maxDate: /* @__PURE__ */ new Date(),
                        manualInput: false,
                        inputClass: "py-0.5 text-xs"
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "maxDate"])
                    ]),
                    filtericon: withCtx(() => []),
                    _: 1
                  })) : createCommentVNode("", true),
                  __props.status === "ready" ? (openBlock(), createBlock(_component_Column, {
                    key: 4,
                    header: "Approved At",
                    style: { "min-width": "14rem" }
                  }, {
                    body: withCtx(({ data: data2 }) => [
                      createTextVNode(toDisplayString(data2.approved_at ?? "—"), 1)
                    ]),
                    filter: withCtx(() => [
                      createVNode(_component_DatePicker, {
                        modelValue: approvedAtDates.value,
                        "onUpdate:modelValue": [($event) => approvedAtDates.value = $event, filterByApprovedAtReady],
                        showIcon: "",
                        showButtonBar: "",
                        onClearClick: resetApprovedAtReady,
                        placeholder: "DD/MM/YY",
                        selectionMode: "range",
                        hideOnRangeSelection: "",
                        size: "small",
                        maxDate: /* @__PURE__ */ new Date(),
                        manualInput: false,
                        inputClass: "py-0.5 text-xs"
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "maxDate"])
                    ]),
                    filtericon: withCtx(() => []),
                    _: 1
                  })) : createCommentVNode("", true),
                  __props.status === "ready" ? (openBlock(), createBlock(_component_Column, {
                    key: 5,
                    header: "Ready At",
                    style: { "min-width": "14rem" }
                  }, {
                    body: withCtx(({ data: data2 }) => [
                      createTextVNode(toDisplayString(data2.ready_at ?? "—"), 1)
                    ]),
                    filter: withCtx(() => [
                      createVNode(_component_DatePicker, {
                        modelValue: readyAtDates.value,
                        "onUpdate:modelValue": [($event) => readyAtDates.value = $event, filterByReadyAt],
                        showIcon: "",
                        showButtonBar: "",
                        onClearClick: resetReadyAt,
                        placeholder: "DD/MM/YY",
                        selectionMode: "range",
                        hideOnRangeSelection: "",
                        size: "small",
                        maxDate: /* @__PURE__ */ new Date(),
                        manualInput: false,
                        inputClass: "py-0.5 text-xs"
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "maxDate"])
                    ]),
                    filtericon: withCtx(() => []),
                    _: 1
                  })) : createCommentVNode("", true),
                  createVNode(_component_Column, {
                    header: "Actions",
                    frozen: "",
                    alignFrozen: "right"
                  }, {
                    body: withCtx(({ data: data2 }) => [
                      createVNode("div", { class: "flex items-center gap-1" }, [
                        withDirectives(createVNode(_component_Button, {
                          icon: "pi pi-eye",
                          size: "small",
                          variant: "text",
                          raised: "",
                          rounded: "",
                          severity: "secondary",
                          onClick: ($event) => detailDialog.value.open(data2.id)
                        }, null, 8, ["onClick"]), [
                          [
                            _directive_tooltip,
                            "View",
                            void 0,
                            { top: true }
                          ]
                        ]),
                        data2.status === "pending" ? withDirectives((openBlock(), createBlock(_component_Button, {
                          key: 0,
                          icon: "pi pi-check",
                          size: "small",
                          variant: "text",
                          raised: "",
                          rounded: "",
                          severity: "info",
                          onClick: ($event) => confirmStatusChange(data2, "paid")
                        }, null, 8, ["onClick"])), [
                          [
                            _directive_tooltip,
                            "Mark Paid",
                            void 0,
                            { top: true }
                          ]
                        ]) : createCommentVNode("", true),
                        data2.status === "paid" || data2.status === "limit" ? withDirectives((openBlock(), createBlock(_component_Button, {
                          key: 1,
                          icon: "pi pi-box",
                          size: "small",
                          variant: "text",
                          raised: "",
                          rounded: "",
                          severity: "success",
                          onClick: ($event) => confirmMarkReady(data2, true)
                        }, null, 8, ["onClick"])), [
                          [
                            _directive_tooltip,
                            "Mark Ready",
                            void 0,
                            { top: true }
                          ]
                        ]) : createCommentVNode("", true),
                        data2.status === "pending" ? withDirectives((openBlock(), createBlock(_component_Button, {
                          key: 2,
                          icon: "pi pi-times",
                          size: "small",
                          variant: "text",
                          raised: "",
                          rounded: "",
                          severity: "danger",
                          onClick: ($event) => confirmStatusChange(data2, "cancelled")
                        }, null, 8, ["onClick"])), [
                          [
                            _directive_tooltip,
                            "Cancel",
                            void 0,
                            { top: true }
                          ]
                        ]) : createCommentVNode("", true),
                        createVNode(_component_Button, {
                          icon: "pi pi-ellipsis-v",
                          size: "small",
                          variant: "text",
                          rounded: "",
                          severity: "secondary",
                          "aria-haspopup": "true",
                          onClick: (e) => rowMenus.value[data2.id].toggle(e)
                        }, null, 8, ["onClick"]),
                        createVNode(_component_Menu, {
                          ref: (el) => {
                            if (el) rowMenus.value[data2.id] = el;
                          },
                          model: getMenuItems(data2),
                          popup: "",
                          class: "text-sm"
                        }, null, 8, ["model"])
                      ])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["value", "filters", "onUpdate:filters"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/orders/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-ba72add6"]]);
export {
  Index as default
};
//# sourceMappingURL=Index-BN8tn4e4.js.map
