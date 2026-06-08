import { cn } from "@primeuix/utils";
import { focus, getAttribute, findSingle, getWidth, getHeight, getOuterHeight, getOffset, getOuterWidth, isRTL } from "@primeuix/utils/dom";
import { equals } from "@primeuix/utils/object";
import { R as Ripple } from "./index-YvTnrAwi.js";
import { mergeProps, resolveDirective, withDirectives, openBlock, createBlock, resolveDynamicComponent, withCtx, renderSlot, normalizeClass, createElementBlock, createCommentVNode, createElementVNode } from "vue";
import BaseComponent from "@primevue/core/basecomponent";
import BaseStyle from "@primevue/core/base/style";
import ChevronLeftIcon from "@primevue/icons/chevronleft";
import ChevronRightIcon from "@primevue/icons/chevronright";
import { style } from "@primeuix/styles/tabs";
var classes$2 = {
  root: function root(_ref) {
    var instance = _ref.instance, props = _ref.props;
    return ["p-tab", {
      "p-tab-active": instance.active,
      "p-disabled": props.disabled
    }];
  }
};
var TabStyle = BaseStyle.extend({
  name: "tab",
  classes: classes$2
});
var script$1$2 = {
  name: "BaseTab",
  "extends": BaseComponent,
  props: {
    value: {
      type: [String, Number],
      "default": void 0
    },
    disabled: {
      type: Boolean,
      "default": false
    },
    as: {
      type: [String, Object],
      "default": "BUTTON"
    },
    asChild: {
      type: Boolean,
      "default": false
    }
  },
  style: TabStyle,
  provide: function provide() {
    return {
      $pcTab: this,
      $parentInstance: this
    };
  }
};
var script$3 = {
  name: "Tab",
  "extends": script$1$2,
  inheritAttrs: false,
  inject: ["$pcTabs", "$pcTabList"],
  methods: {
    onFocus: function onFocus() {
      this.$pcTabs.selectOnFocus && this.changeActiveValue();
    },
    onClick: function onClick() {
      this.changeActiveValue();
    },
    onKeydown: function onKeydown(event) {
      switch (event.code) {
        case "ArrowRight":
          this.onArrowRightKey(event);
          break;
        case "ArrowLeft":
          this.onArrowLeftKey(event);
          break;
        case "Home":
          this.onHomeKey(event);
          break;
        case "End":
          this.onEndKey(event);
          break;
        case "PageDown":
          this.onPageDownKey(event);
          break;
        case "PageUp":
          this.onPageUpKey(event);
          break;
        case "Enter":
        case "NumpadEnter":
        case "Space":
          this.onEnterKey(event);
          break;
      }
    },
    onArrowRightKey: function onArrowRightKey(event) {
      var nextTab = this.findNextTab(event.currentTarget);
      nextTab ? this.changeFocusedTab(event, nextTab) : this.onHomeKey(event);
      event.preventDefault();
    },
    onArrowLeftKey: function onArrowLeftKey(event) {
      var prevTab = this.findPrevTab(event.currentTarget);
      prevTab ? this.changeFocusedTab(event, prevTab) : this.onEndKey(event);
      event.preventDefault();
    },
    onHomeKey: function onHomeKey(event) {
      var firstTab = this.findFirstTab();
      this.changeFocusedTab(event, firstTab);
      event.preventDefault();
    },
    onEndKey: function onEndKey(event) {
      var lastTab = this.findLastTab();
      this.changeFocusedTab(event, lastTab);
      event.preventDefault();
    },
    onPageDownKey: function onPageDownKey(event) {
      this.scrollInView(this.findLastTab());
      event.preventDefault();
    },
    onPageUpKey: function onPageUpKey(event) {
      this.scrollInView(this.findFirstTab());
      event.preventDefault();
    },
    onEnterKey: function onEnterKey(event) {
      this.changeActiveValue();
    },
    findNextTab: function findNextTab(tabElement) {
      var selfCheck = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
      var element = selfCheck ? tabElement : tabElement.nextElementSibling;
      return element ? getAttribute(element, "data-p-disabled") || getAttribute(element, "data-pc-section") === "activebar" ? this.findNextTab(element) : findSingle(element, '[data-pc-name="tab"]') : null;
    },
    findPrevTab: function findPrevTab(tabElement) {
      var selfCheck = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
      var element = selfCheck ? tabElement : tabElement.previousElementSibling;
      return element ? getAttribute(element, "data-p-disabled") || getAttribute(element, "data-pc-section") === "activebar" ? this.findPrevTab(element) : findSingle(element, '[data-pc-name="tab"]') : null;
    },
    findFirstTab: function findFirstTab() {
      return this.findNextTab(this.$pcTabList.$refs.tabs.firstElementChild, true);
    },
    findLastTab: function findLastTab() {
      return this.findPrevTab(this.$pcTabList.$refs.tabs.lastElementChild, true);
    },
    changeActiveValue: function changeActiveValue() {
      this.$pcTabs.updateValue(this.value);
    },
    changeFocusedTab: function changeFocusedTab(event, element) {
      focus(element);
      this.scrollInView(element);
    },
    scrollInView: function scrollInView(element) {
      var _element$scrollIntoVi;
      element === null || element === void 0 || (_element$scrollIntoVi = element.scrollIntoView) === null || _element$scrollIntoVi === void 0 || _element$scrollIntoVi.call(element, {
        block: "nearest"
      });
    }
  },
  computed: {
    active: function active() {
      var _this$$pcTabs;
      return equals((_this$$pcTabs = this.$pcTabs) === null || _this$$pcTabs === void 0 ? void 0 : _this$$pcTabs.d_value, this.value);
    },
    id: function id() {
      var _this$$pcTabs2;
      return "".concat((_this$$pcTabs2 = this.$pcTabs) === null || _this$$pcTabs2 === void 0 ? void 0 : _this$$pcTabs2.$id, "_tab_").concat(this.value);
    },
    ariaControls: function ariaControls() {
      var _this$$pcTabs3;
      return "".concat((_this$$pcTabs3 = this.$pcTabs) === null || _this$$pcTabs3 === void 0 ? void 0 : _this$$pcTabs3.$id, "_tabpanel_").concat(this.value);
    },
    attrs: function attrs() {
      return mergeProps(this.asAttrs, this.a11yAttrs, this.ptmi("root", this.ptParams));
    },
    asAttrs: function asAttrs() {
      return this.as === "BUTTON" ? {
        type: "button",
        disabled: this.disabled
      } : void 0;
    },
    a11yAttrs: function a11yAttrs() {
      return {
        id: this.id,
        tabindex: this.active ? this.$pcTabs.tabindex : -1,
        role: "tab",
        "aria-selected": this.active,
        "aria-controls": this.ariaControls,
        "data-pc-name": "tab",
        "data-p-disabled": this.disabled,
        "data-p-active": this.active,
        onFocus: this.onFocus,
        onKeydown: this.onKeydown
      };
    },
    ptParams: function ptParams() {
      return {
        context: {
          active: this.active
        }
      };
    },
    dataP: function dataP() {
      return cn({
        active: this.active
      });
    }
  },
  directives: {
    ripple: Ripple
  }
};
function render$2(_ctx, _cache, $props, $setup, $data, $options) {
  var _directive_ripple = resolveDirective("ripple");
  return !_ctx.asChild ? withDirectives((openBlock(), createBlock(resolveDynamicComponent(_ctx.as), mergeProps({
    key: 0,
    "class": _ctx.cx("root"),
    "data-p": $options.dataP,
    onClick: $options.onClick
  }, $options.attrs), {
    "default": withCtx(function() {
      return [renderSlot(_ctx.$slots, "default")];
    }),
    _: 3
  }, 16, ["class", "data-p", "onClick"])), [[_directive_ripple]]) : renderSlot(_ctx.$slots, "default", {
    key: 1,
    dataP: $options.dataP,
    "class": normalizeClass(_ctx.cx("root")),
    active: $options.active,
    a11yAttrs: $options.a11yAttrs,
    onClick: $options.onClick
  });
}
script$3.render = render$2;
var classes$1 = {
  root: "p-tablist",
  content: "p-tablist-content p-tablist-viewport",
  tabList: "p-tablist-tab-list",
  activeBar: "p-tablist-active-bar",
  prevButton: "p-tablist-prev-button p-tablist-nav-button",
  nextButton: "p-tablist-next-button p-tablist-nav-button"
};
var TabListStyle = BaseStyle.extend({
  name: "tablist",
  classes: classes$1
});
var script$1$1 = {
  name: "BaseTabList",
  "extends": BaseComponent,
  props: {},
  style: TabListStyle,
  provide: function provide2() {
    return {
      $pcTabList: this,
      $parentInstance: this
    };
  }
};
var script$2 = {
  name: "TabList",
  "extends": script$1$1,
  inheritAttrs: false,
  inject: ["$pcTabs"],
  data: function data() {
    return {
      isPrevButtonEnabled: false,
      isNextButtonEnabled: true
    };
  },
  resizeObserver: void 0,
  watch: {
    showNavigators: function showNavigators(newValue) {
      newValue ? this.bindResizeObserver() : this.unbindResizeObserver();
    },
    activeValue: {
      flush: "post",
      handler: function handler() {
        this.updateInkBar();
      }
    }
  },
  mounted: function mounted() {
    var _this = this;
    setTimeout(function() {
      _this.updateInkBar();
    }, 150);
    if (this.showNavigators) {
      this.updateButtonState();
      this.bindResizeObserver();
    }
  },
  updated: function updated() {
    this.showNavigators && this.updateButtonState();
  },
  beforeUnmount: function beforeUnmount() {
    this.unbindResizeObserver();
  },
  methods: {
    onScroll: function onScroll(event) {
      this.showNavigators && this.updateButtonState();
      event.preventDefault();
    },
    onPrevButtonClick: function onPrevButtonClick() {
      var content = this.$refs.content;
      var buttonWidths = this.getVisibleButtonWidths();
      var width = getWidth(content) - buttonWidths;
      var currentScrollLeft = Math.abs(content.scrollLeft);
      var scrollStep = width * 0.8;
      var targetScrollLeft = currentScrollLeft - scrollStep;
      var scrollLeft = Math.max(targetScrollLeft, 0);
      content.scrollLeft = isRTL(content) ? -1 * scrollLeft : scrollLeft;
    },
    onNextButtonClick: function onNextButtonClick() {
      var content = this.$refs.content;
      var buttonWidths = this.getVisibleButtonWidths();
      var width = getWidth(content) - buttonWidths;
      var currentScrollLeft = Math.abs(content.scrollLeft);
      var scrollStep = width * 0.8;
      var targetScrollLeft = currentScrollLeft + scrollStep;
      var maxScrollLeft = content.scrollWidth - width;
      var scrollLeft = Math.min(targetScrollLeft, maxScrollLeft);
      content.scrollLeft = isRTL(content) ? -1 * scrollLeft : scrollLeft;
    },
    bindResizeObserver: function bindResizeObserver() {
      var _this2 = this;
      this.resizeObserver = new ResizeObserver(function() {
        return _this2.updateButtonState();
      });
      this.resizeObserver.observe(this.$refs.list);
    },
    unbindResizeObserver: function unbindResizeObserver() {
      var _this$resizeObserver;
      (_this$resizeObserver = this.resizeObserver) === null || _this$resizeObserver === void 0 || _this$resizeObserver.unobserve(this.$refs.list);
      this.resizeObserver = void 0;
    },
    updateInkBar: function updateInkBar() {
      var _this$$refs = this.$refs, content = _this$$refs.content, inkbar = _this$$refs.inkbar, tabs = _this$$refs.tabs;
      if (!inkbar) return;
      var activeTab = findSingle(content, '[data-pc-name="tab"][data-p-active="true"]');
      if (this.$pcTabs.isVertical()) {
        inkbar.style.height = getOuterHeight(activeTab) + "px";
        inkbar.style.top = getOffset(activeTab).top - getOffset(tabs).top + "px";
      } else {
        inkbar.style.width = getOuterWidth(activeTab) + "px";
        inkbar.style.left = getOffset(activeTab).left - getOffset(tabs).left + "px";
      }
    },
    updateButtonState: function updateButtonState() {
      var _this$$refs2 = this.$refs, list = _this$$refs2.list, content = _this$$refs2.content;
      var scrollTop = content.scrollTop, scrollWidth = content.scrollWidth, scrollHeight = content.scrollHeight, offsetWidth = content.offsetWidth, offsetHeight = content.offsetHeight;
      var scrollLeft = Math.abs(content.scrollLeft);
      var _ref = [getWidth(content), getHeight(content)], width = _ref[0], height = _ref[1];
      if (this.$pcTabs.isVertical()) {
        this.isPrevButtonEnabled = scrollTop !== 0;
        this.isNextButtonEnabled = list.offsetHeight >= offsetHeight && parseInt(scrollTop) !== scrollHeight - height;
      } else {
        this.isPrevButtonEnabled = scrollLeft !== 0;
        this.isNextButtonEnabled = list.offsetWidth >= offsetWidth && parseInt(scrollLeft) !== scrollWidth - width;
      }
    },
    getVisibleButtonWidths: function getVisibleButtonWidths() {
      var _this$$refs3 = this.$refs, prevButton = _this$$refs3.prevButton, nextButton = _this$$refs3.nextButton;
      var width = 0;
      if (this.showNavigators) {
        width = ((prevButton === null || prevButton === void 0 ? void 0 : prevButton.offsetWidth) || 0) + ((nextButton === null || nextButton === void 0 ? void 0 : nextButton.offsetWidth) || 0);
      }
      return width;
    }
  },
  computed: {
    templates: function templates() {
      return this.$pcTabs.$slots;
    },
    activeValue: function activeValue() {
      return this.$pcTabs.d_value;
    },
    showNavigators: function showNavigators2() {
      return this.$pcTabs.showNavigators;
    },
    prevButtonAriaLabel: function prevButtonAriaLabel() {
      return this.$primevue.config.locale.aria ? this.$primevue.config.locale.aria.previous : void 0;
    },
    nextButtonAriaLabel: function nextButtonAriaLabel() {
      return this.$primevue.config.locale.aria ? this.$primevue.config.locale.aria.next : void 0;
    },
    dataP: function dataP2() {
      return cn({
        scrollable: this.$pcTabs.scrollable
      });
    }
  },
  components: {
    ChevronLeftIcon,
    ChevronRightIcon
  },
  directives: {
    ripple: Ripple
  }
};
var _hoisted_1 = ["data-p"];
var _hoisted_2 = ["aria-label", "tabindex"];
var _hoisted_3 = ["data-p"];
var _hoisted_4 = ["aria-orientation"];
var _hoisted_5 = ["aria-label", "tabindex"];
function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  var _directive_ripple = resolveDirective("ripple");
  return openBlock(), createElementBlock("div", mergeProps({
    ref: "list",
    "class": _ctx.cx("root"),
    "data-p": $options.dataP
  }, _ctx.ptmi("root")), [$options.showNavigators && $data.isPrevButtonEnabled ? withDirectives((openBlock(), createElementBlock("button", mergeProps({
    key: 0,
    ref: "prevButton",
    type: "button",
    "class": _ctx.cx("prevButton"),
    "aria-label": $options.prevButtonAriaLabel,
    tabindex: $options.$pcTabs.tabindex,
    onClick: _cache[0] || (_cache[0] = function() {
      return $options.onPrevButtonClick && $options.onPrevButtonClick.apply($options, arguments);
    })
  }, _ctx.ptm("prevButton"), {
    "data-pc-group-section": "navigator"
  }), [(openBlock(), createBlock(resolveDynamicComponent($options.templates.previcon || "ChevronLeftIcon"), mergeProps({
    "aria-hidden": "true"
  }, _ctx.ptm("prevIcon")), null, 16))], 16, _hoisted_2)), [[_directive_ripple]]) : createCommentVNode("", true), createElementVNode("div", mergeProps({
    ref: "content",
    "class": _ctx.cx("content"),
    onScroll: _cache[1] || (_cache[1] = function() {
      return $options.onScroll && $options.onScroll.apply($options, arguments);
    }),
    "data-p": $options.dataP
  }, _ctx.ptm("content")), [createElementVNode("div", mergeProps({
    ref: "tabs",
    "class": _ctx.cx("tabList"),
    role: "tablist",
    "aria-orientation": $options.$pcTabs.orientation || "horizontal"
  }, _ctx.ptm("tabList")), [renderSlot(_ctx.$slots, "default"), createElementVNode("span", mergeProps({
    ref: "inkbar",
    "class": _ctx.cx("activeBar"),
    role: "presentation",
    "aria-hidden": "true"
  }, _ctx.ptm("activeBar")), null, 16)], 16, _hoisted_4)], 16, _hoisted_3), $options.showNavigators && $data.isNextButtonEnabled ? withDirectives((openBlock(), createElementBlock("button", mergeProps({
    key: 1,
    ref: "nextButton",
    type: "button",
    "class": _ctx.cx("nextButton"),
    "aria-label": $options.nextButtonAriaLabel,
    tabindex: $options.$pcTabs.tabindex,
    onClick: _cache[2] || (_cache[2] = function() {
      return $options.onNextButtonClick && $options.onNextButtonClick.apply($options, arguments);
    })
  }, _ctx.ptm("nextButton"), {
    "data-pc-group-section": "navigator"
  }), [(openBlock(), createBlock(resolveDynamicComponent($options.templates.nexticon || "ChevronRightIcon"), mergeProps({
    "aria-hidden": "true"
  }, _ctx.ptm("nextIcon")), null, 16))], 16, _hoisted_5)), [[_directive_ripple]]) : createCommentVNode("", true)], 16, _hoisted_1);
}
script$2.render = render$1;
var classes = {
  root: function root2(_ref) {
    var props = _ref.props;
    return ["p-tabs p-component", {
      "p-tabs-scrollable": props.scrollable
    }];
  }
};
var TabsStyle = BaseStyle.extend({
  name: "tabs",
  style,
  classes
});
var script$1 = {
  name: "BaseTabs",
  "extends": BaseComponent,
  props: {
    value: {
      type: [String, Number],
      "default": void 0
    },
    lazy: {
      type: Boolean,
      "default": false
    },
    scrollable: {
      type: Boolean,
      "default": false
    },
    showNavigators: {
      type: Boolean,
      "default": true
    },
    tabindex: {
      type: Number,
      "default": 0
    },
    selectOnFocus: {
      type: Boolean,
      "default": false
    }
  },
  style: TabsStyle,
  provide: function provide3() {
    return {
      $pcTabs: this,
      $parentInstance: this
    };
  }
};
var script = {
  name: "Tabs",
  "extends": script$1,
  inheritAttrs: false,
  emits: ["update:value"],
  data: function data2() {
    return {
      d_value: this.value
    };
  },
  watch: {
    value: function value(newValue) {
      this.d_value = newValue;
    }
  },
  methods: {
    updateValue: function updateValue(newValue) {
      if (this.d_value !== newValue) {
        this.d_value = newValue;
        this.$emit("update:value", newValue);
      }
    },
    isVertical: function isVertical() {
      return this.orientation === "vertical";
    }
  }
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", mergeProps({
    "class": _ctx.cx("root")
  }, _ctx.ptmi("root")), [renderSlot(_ctx.$slots, "default")], 16);
}
script.render = render;
export {
  script$2 as a,
  script$3 as b,
  script as s
};
//# sourceMappingURL=index-fvkEaty1.js.map
