import * as utils from "@primeuix/utils";
import { cn } from "@primeuix/utils";
import { getLastFocusableElement, focus, getFirstFocusableElement, createElement, isFocusableElement, getOuterWidth, getOuterHeight, getViewport, addStyle, setAttribute, addClass } from "@primeuix/utils/dom";
import { ZIndex } from "@primeuix/utils/zindex";
import TimesIcon from "@primevue/icons/times";
import WindowMaximizeIcon from "@primevue/icons/windowmaximize";
import WindowMinimizeIcon from "@primevue/icons/windowminimize";
import { s as script$3, R as Ripple } from "./index-YvTnrAwi.js";
import { isNotEmpty } from "@primeuix/utils/object";
import BaseDirective from "@primevue/core/basedirective";
import BaseStyle from "@primevue/core/base/style";
import { s as script$2 } from "./index-zZrFrjQS.js";
import { $dt } from "@primeuix/styled";
import { computed, resolveComponent, resolveDirective, openBlock, createBlock, withCtx, createElementBlock, mergeProps, createVNode, Transition, withDirectives, renderSlot, Fragment, normalizeClass, toDisplayString, createCommentVNode, createElementVNode, resolveDynamicComponent, createTextVNode } from "vue";
import BaseComponent from "@primevue/core/basecomponent";
import { style } from "@primeuix/styles/dialog";
var FocusTrapStyle = BaseStyle.extend({
  name: "focustrap-directive"
});
var BaseFocusTrap = BaseDirective.extend({
  style: FocusTrapStyle
});
function _typeof$1(o) {
  "@babel/helpers - typeof";
  return _typeof$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof$1(o);
}
function ownKeys$1(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$1(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$1(Object(t), true).forEach(function(r2) {
      _defineProperty$1(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$1(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$1(e, r, t) {
  return (r = _toPropertyKey$1(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey$1(t) {
  var i = _toPrimitive$1(t, "string");
  return "symbol" == _typeof$1(i) ? i : i + "";
}
function _toPrimitive$1(t, r) {
  if ("object" != _typeof$1(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != _typeof$1(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
var FocusTrap = BaseFocusTrap.extend("focustrap", {
  mounted: function mounted(el, binding) {
    var _ref = binding.value || {}, disabled = _ref.disabled;
    if (!disabled) {
      this.createHiddenFocusableElements(el, binding);
      this.bind(el, binding);
      this.autoElementFocus(el, binding);
    }
    el.setAttribute("data-pd-focustrap", true);
    this.$el = el;
  },
  updated: function updated(el, binding) {
    var _ref2 = binding.value || {}, disabled = _ref2.disabled;
    disabled && this.unbind(el);
  },
  unmounted: function unmounted(el) {
    this.unbind(el);
  },
  methods: {
    getComputedSelector: function getComputedSelector(selector) {
      return ':not(.p-hidden-focusable):not([data-p-hidden-focusable="true"])'.concat(selector !== null && selector !== void 0 ? selector : "");
    },
    bind: function bind(el, binding) {
      var _this = this;
      var _ref3 = binding.value || {}, onFocusIn = _ref3.onFocusIn, onFocusOut = _ref3.onFocusOut;
      el.$_pfocustrap_mutationobserver = new MutationObserver(function(mutationList) {
        mutationList.forEach(function(mutation) {
          if (mutation.type === "childList" && !el.contains(document.activeElement)) {
            var _findNextFocusableElement = function findNextFocusableElement(_el) {
              var focusableElement = isFocusableElement(_el) ? isFocusableElement(_el, _this.getComputedSelector(el.$_pfocustrap_focusableselector)) ? _el : getFirstFocusableElement(el, _this.getComputedSelector(el.$_pfocustrap_focusableselector)) : getFirstFocusableElement(_el);
              return isNotEmpty(focusableElement) ? focusableElement : _el.nextSibling && _findNextFocusableElement(_el.nextSibling);
            };
            focus(_findNextFocusableElement(mutation.nextSibling));
          }
        });
      });
      el.$_pfocustrap_mutationobserver.disconnect();
      el.$_pfocustrap_mutationobserver.observe(el, {
        childList: true
      });
      el.$_pfocustrap_focusinlistener = function(event) {
        return onFocusIn && onFocusIn(event);
      };
      el.$_pfocustrap_focusoutlistener = function(event) {
        return onFocusOut && onFocusOut(event);
      };
      el.addEventListener("focusin", el.$_pfocustrap_focusinlistener);
      el.addEventListener("focusout", el.$_pfocustrap_focusoutlistener);
    },
    unbind: function unbind(el) {
      el.$_pfocustrap_mutationobserver && el.$_pfocustrap_mutationobserver.disconnect();
      el.$_pfocustrap_focusinlistener && el.removeEventListener("focusin", el.$_pfocustrap_focusinlistener) && (el.$_pfocustrap_focusinlistener = null);
      el.$_pfocustrap_focusoutlistener && el.removeEventListener("focusout", el.$_pfocustrap_focusoutlistener) && (el.$_pfocustrap_focusoutlistener = null);
    },
    autoFocus: function autoFocus(options) {
      this.autoElementFocus(this.$el, {
        value: _objectSpread$1(_objectSpread$1({}, options), {}, {
          autoFocus: true
        })
      });
    },
    autoElementFocus: function autoElementFocus(el, binding) {
      var _ref4 = binding.value || {}, _ref4$autoFocusSelect = _ref4.autoFocusSelector, autoFocusSelector = _ref4$autoFocusSelect === void 0 ? "" : _ref4$autoFocusSelect, _ref4$firstFocusableS = _ref4.firstFocusableSelector, firstFocusableSelector = _ref4$firstFocusableS === void 0 ? "" : _ref4$firstFocusableS, _ref4$autoFocus = _ref4.autoFocus, autoFocus2 = _ref4$autoFocus === void 0 ? false : _ref4$autoFocus;
      var focusableElement = getFirstFocusableElement(el, "[autofocus]".concat(this.getComputedSelector(autoFocusSelector)));
      autoFocus2 && !focusableElement && (focusableElement = getFirstFocusableElement(el, this.getComputedSelector(firstFocusableSelector)));
      focus(focusableElement);
    },
    onFirstHiddenElementFocus: function onFirstHiddenElementFocus(event) {
      var _this$$el;
      var currentTarget = event.currentTarget, relatedTarget = event.relatedTarget;
      var focusableElement = relatedTarget === currentTarget.$_pfocustrap_lasthiddenfocusableelement || !((_this$$el = this.$el) !== null && _this$$el !== void 0 && _this$$el.contains(relatedTarget)) ? getFirstFocusableElement(currentTarget.parentElement, this.getComputedSelector(currentTarget.$_pfocustrap_focusableselector)) : currentTarget.$_pfocustrap_lasthiddenfocusableelement;
      focus(focusableElement);
    },
    onLastHiddenElementFocus: function onLastHiddenElementFocus(event) {
      var _this$$el2;
      var currentTarget = event.currentTarget, relatedTarget = event.relatedTarget;
      var focusableElement = relatedTarget === currentTarget.$_pfocustrap_firsthiddenfocusableelement || !((_this$$el2 = this.$el) !== null && _this$$el2 !== void 0 && _this$$el2.contains(relatedTarget)) ? getLastFocusableElement(currentTarget.parentElement, this.getComputedSelector(currentTarget.$_pfocustrap_focusableselector)) : currentTarget.$_pfocustrap_firsthiddenfocusableelement;
      focus(focusableElement);
    },
    createHiddenFocusableElements: function createHiddenFocusableElements(el, binding) {
      var _this2 = this;
      var _ref5 = binding.value || {}, _ref5$tabIndex = _ref5.tabIndex, tabIndex = _ref5$tabIndex === void 0 ? 0 : _ref5$tabIndex, _ref5$firstFocusableS = _ref5.firstFocusableSelector, firstFocusableSelector = _ref5$firstFocusableS === void 0 ? "" : _ref5$firstFocusableS, _ref5$lastFocusableSe = _ref5.lastFocusableSelector, lastFocusableSelector = _ref5$lastFocusableSe === void 0 ? "" : _ref5$lastFocusableSe;
      var createFocusableElement = function createFocusableElement2(onFocus) {
        return createElement("span", {
          "class": "p-hidden-accessible p-hidden-focusable",
          tabIndex,
          role: "presentation",
          "aria-hidden": true,
          "data-p-hidden-accessible": true,
          "data-p-hidden-focusable": true,
          onFocus: onFocus === null || onFocus === void 0 ? void 0 : onFocus.bind(_this2)
        });
      };
      var firstFocusableElement = createFocusableElement(this.onFirstHiddenElementFocus);
      var lastFocusableElement = createFocusableElement(this.onLastHiddenElementFocus);
      firstFocusableElement.$_pfocustrap_lasthiddenfocusableelement = lastFocusableElement;
      firstFocusableElement.$_pfocustrap_focusableselector = firstFocusableSelector;
      firstFocusableElement.setAttribute("data-pc-section", "firstfocusableelement");
      lastFocusableElement.$_pfocustrap_firsthiddenfocusableelement = firstFocusableElement;
      lastFocusableElement.$_pfocustrap_focusableselector = lastFocusableSelector;
      lastFocusableElement.setAttribute("data-pc-section", "lastfocusableelement");
      el.prepend(firstFocusableElement);
      el.append(lastFocusableElement);
    }
  }
});
function blockBodyScroll() {
  utils.blockBodyScroll({
    variableName: $dt("scrollbar.width").name
  });
}
function unblockBodyScroll() {
  utils.unblockBodyScroll({
    variableName: $dt("scrollbar.width").name
  });
}
var inlineStyles = {
  mask: function mask(_ref) {
    var position = _ref.position, modal = _ref.modal;
    return {
      position: "fixed",
      height: "100%",
      width: "100%",
      left: 0,
      top: 0,
      display: "flex",
      justifyContent: position === "left" || position === "topleft" || position === "bottomleft" ? "flex-start" : position === "right" || position === "topright" || position === "bottomright" ? "flex-end" : "center",
      alignItems: position === "top" || position === "topleft" || position === "topright" ? "flex-start" : position === "bottom" || position === "bottomleft" || position === "bottomright" ? "flex-end" : "center",
      pointerEvents: modal ? "auto" : "none"
    };
  },
  root: {
    display: "flex",
    flexDirection: "column",
    pointerEvents: "auto"
  }
};
var classes = {
  mask: function mask2(_ref2) {
    var props = _ref2.props;
    var positions = ["left", "right", "top", "topleft", "topright", "bottom", "bottomleft", "bottomright"];
    var pos = positions.find(function(item) {
      return item === props.position;
    });
    return ["p-dialog-mask", {
      "p-overlay-mask p-overlay-mask-enter": props.modal
    }, pos ? "p-dialog-".concat(pos) : ""];
  },
  root: function root(_ref3) {
    var props = _ref3.props, instance = _ref3.instance;
    return ["p-dialog p-component", {
      "p-dialog-maximized": props.maximizable && instance.maximized
    }];
  },
  header: "p-dialog-header",
  title: "p-dialog-title",
  headerActions: "p-dialog-header-actions",
  pcMaximizeButton: "p-dialog-maximize-button",
  pcCloseButton: "p-dialog-close-button",
  content: "p-dialog-content",
  footer: "p-dialog-footer"
};
var DialogStyle = BaseStyle.extend({
  name: "dialog",
  style,
  classes,
  inlineStyles
});
var script$1 = {
  name: "BaseDialog",
  "extends": BaseComponent,
  props: {
    header: {
      type: null,
      "default": null
    },
    footer: {
      type: null,
      "default": null
    },
    visible: {
      type: Boolean,
      "default": false
    },
    modal: {
      type: Boolean,
      "default": null
    },
    contentStyle: {
      type: null,
      "default": null
    },
    contentClass: {
      type: String,
      "default": null
    },
    contentProps: {
      type: null,
      "default": null
    },
    maximizable: {
      type: Boolean,
      "default": false
    },
    dismissableMask: {
      type: Boolean,
      "default": false
    },
    closable: {
      type: Boolean,
      "default": true
    },
    closeOnEscape: {
      type: Boolean,
      "default": true
    },
    showHeader: {
      type: Boolean,
      "default": true
    },
    blockScroll: {
      type: Boolean,
      "default": false
    },
    baseZIndex: {
      type: Number,
      "default": 0
    },
    autoZIndex: {
      type: Boolean,
      "default": true
    },
    position: {
      type: String,
      "default": "center"
    },
    breakpoints: {
      type: Object,
      "default": null
    },
    draggable: {
      type: Boolean,
      "default": true
    },
    keepInViewport: {
      type: Boolean,
      "default": true
    },
    minX: {
      type: Number,
      "default": 0
    },
    minY: {
      type: Number,
      "default": 0
    },
    appendTo: {
      type: [String, Object],
      "default": "body"
    },
    closeIcon: {
      type: String,
      "default": void 0
    },
    maximizeIcon: {
      type: String,
      "default": void 0
    },
    minimizeIcon: {
      type: String,
      "default": void 0
    },
    closeButtonProps: {
      type: Object,
      "default": function _default() {
        return {
          severity: "secondary",
          text: true,
          rounded: true
        };
      }
    },
    maximizeButtonProps: {
      type: Object,
      "default": function _default2() {
        return {
          severity: "secondary",
          text: true,
          rounded: true
        };
      }
    },
    _instance: null
  },
  style: DialogStyle,
  provide: function provide() {
    return {
      $pcDialog: this,
      $parentInstance: this
    };
  }
};
var script = {
  name: "Dialog",
  "extends": script$1,
  inheritAttrs: false,
  emits: ["update:visible", "show", "hide", "after-hide", "maximize", "unmaximize", "dragstart", "dragend"],
  provide: function provide2() {
    var _this = this;
    return {
      dialogRef: computed(function() {
        return _this._instance;
      })
    };
  },
  data: function data() {
    return {
      containerVisible: this.visible,
      maximized: false,
      focusableMax: null,
      focusableClose: null,
      target: null
    };
  },
  documentKeydownListener: null,
  container: null,
  mask: null,
  content: null,
  headerContainer: null,
  footerContainer: null,
  maximizableButton: null,
  closeButton: null,
  styleElement: null,
  dragging: null,
  documentDragListener: null,
  documentDragEndListener: null,
  lastPageX: null,
  lastPageY: null,
  maskMouseDownTarget: null,
  updated: function updated2() {
    if (this.visible) {
      this.containerVisible = this.visible;
    }
  },
  beforeUnmount: function beforeUnmount() {
    this.unbindDocumentState();
    this.unbindGlobalListeners();
    this.destroyStyle();
    if (this.mask && this.autoZIndex) {
      ZIndex.clear(this.mask);
    }
    this.container = null;
    this.mask = null;
  },
  mounted: function mounted2() {
    if (this.breakpoints) {
      this.createStyle();
    }
  },
  methods: {
    close: function close() {
      this.$emit("update:visible", false);
    },
    onEnter: function onEnter() {
      this.$emit("show");
      this.target = document.activeElement;
      this.enableDocumentSettings();
      this.bindGlobalListeners();
      if (this.autoZIndex) {
        ZIndex.set("modal", this.mask, this.baseZIndex + this.$primevue.config.zIndex.modal);
      }
    },
    onAfterEnter: function onAfterEnter() {
      this.focus();
    },
    onBeforeLeave: function onBeforeLeave() {
      if (this.modal) {
        !this.isUnstyled && addClass(this.mask, "p-overlay-mask-leave");
      }
      if (this.dragging && this.documentDragEndListener) {
        this.documentDragEndListener();
      }
    },
    onLeave: function onLeave() {
      this.$emit("hide");
      focus(this.target);
      this.target = null;
      this.focusableClose = null;
      this.focusableMax = null;
    },
    onAfterLeave: function onAfterLeave() {
      if (this.autoZIndex) {
        ZIndex.clear(this.mask);
      }
      this.containerVisible = false;
      this.unbindDocumentState();
      this.unbindGlobalListeners();
      this.$emit("after-hide");
    },
    onMaskMouseDown: function onMaskMouseDown(event) {
      this.maskMouseDownTarget = event.target;
    },
    onMaskMouseUp: function onMaskMouseUp() {
      if (this.dismissableMask && this.modal && this.mask === this.maskMouseDownTarget) {
        this.close();
      }
    },
    focus: function focus$1() {
      var findFocusableElement = function findFocusableElement2(container) {
        return container && container.querySelector("[autofocus]");
      };
      var focusTarget = this.$slots.footer && findFocusableElement(this.footerContainer);
      if (!focusTarget) {
        focusTarget = this.$slots.header && findFocusableElement(this.headerContainer);
        if (!focusTarget) {
          focusTarget = this.$slots["default"] && findFocusableElement(this.content);
          if (!focusTarget) {
            if (this.maximizable) {
              this.focusableMax = true;
              focusTarget = this.maximizableButton;
            } else {
              this.focusableClose = true;
              focusTarget = this.closeButton;
            }
          }
        }
      }
      if (focusTarget) {
        focus(focusTarget, {
          focusVisible: true
        });
      }
    },
    maximize: function maximize(event) {
      if (this.maximized) {
        this.maximized = false;
        this.$emit("unmaximize", event);
      } else {
        this.maximized = true;
        this.$emit("maximize", event);
      }
      if (!this.modal) {
        this.maximized ? blockBodyScroll() : unblockBodyScroll();
      }
    },
    enableDocumentSettings: function enableDocumentSettings() {
      if (this.modal || !this.modal && this.blockScroll || this.maximizable && this.maximized) {
        blockBodyScroll();
      }
    },
    unbindDocumentState: function unbindDocumentState() {
      if (this.modal || !this.modal && this.blockScroll || this.maximizable && this.maximized) {
        unblockBodyScroll();
      }
    },
    onKeyDown: function onKeyDown(event) {
      if (event.code === "Escape" && this.closeOnEscape) {
        this.close();
      }
    },
    bindDocumentKeyDownListener: function bindDocumentKeyDownListener() {
      if (!this.documentKeydownListener) {
        this.documentKeydownListener = this.onKeyDown.bind(this);
        window.document.addEventListener("keydown", this.documentKeydownListener);
      }
    },
    unbindDocumentKeyDownListener: function unbindDocumentKeyDownListener() {
      if (this.documentKeydownListener) {
        window.document.removeEventListener("keydown", this.documentKeydownListener);
        this.documentKeydownListener = null;
      }
    },
    containerRef: function containerRef(el) {
      this.container = el;
    },
    maskRef: function maskRef(el) {
      this.mask = el;
    },
    contentRef: function contentRef(el) {
      this.content = el;
    },
    headerContainerRef: function headerContainerRef(el) {
      this.headerContainer = el;
    },
    footerContainerRef: function footerContainerRef(el) {
      this.footerContainer = el;
    },
    maximizableRef: function maximizableRef(el) {
      this.maximizableButton = el ? el.$el : void 0;
    },
    closeButtonRef: function closeButtonRef(el) {
      this.closeButton = el ? el.$el : void 0;
    },
    createStyle: function createStyle() {
      if (!this.styleElement && !this.isUnstyled) {
        var _this$$primevue;
        this.styleElement = document.createElement("style");
        this.styleElement.type = "text/css";
        setAttribute(this.styleElement, "nonce", (_this$$primevue = this.$primevue) === null || _this$$primevue === void 0 || (_this$$primevue = _this$$primevue.config) === null || _this$$primevue === void 0 || (_this$$primevue = _this$$primevue.csp) === null || _this$$primevue === void 0 ? void 0 : _this$$primevue.nonce);
        document.head.appendChild(this.styleElement);
        var innerHTML = "";
        for (var breakpoint in this.breakpoints) {
          innerHTML += "\n                        @media screen and (max-width: ".concat(breakpoint, ") {\n                            .p-dialog[").concat(this.$attrSelector, "] {\n                                width: ").concat(this.breakpoints[breakpoint], " !important;\n                            }\n                        }\n                    ");
        }
        this.styleElement.innerHTML = innerHTML;
      }
    },
    destroyStyle: function destroyStyle() {
      if (this.styleElement) {
        document.head.removeChild(this.styleElement);
        this.styleElement = null;
      }
    },
    initDrag: function initDrag(event) {
      if (event.target.closest("div").getAttribute("data-pc-section") === "headeractions") {
        return;
      }
      if (this.draggable) {
        this.dragging = true;
        this.lastPageX = event.pageX;
        this.lastPageY = event.pageY;
        this.container.style.margin = "0";
        document.body.setAttribute("data-p-unselectable-text", "true");
        !this.isUnstyled && addStyle(document.body, {
          "user-select": "none"
        });
        this.$emit("dragstart", event);
      }
    },
    bindGlobalListeners: function bindGlobalListeners() {
      if (this.draggable) {
        this.bindDocumentDragListener();
        this.bindDocumentDragEndListener();
      }
      if (this.closeOnEscape) {
        this.bindDocumentKeyDownListener();
      }
    },
    unbindGlobalListeners: function unbindGlobalListeners() {
      this.unbindDocumentDragListener();
      this.unbindDocumentDragEndListener();
      this.unbindDocumentKeyDownListener();
    },
    bindDocumentDragListener: function bindDocumentDragListener() {
      var _this2 = this;
      this.documentDragListener = function(event) {
        if (_this2.dragging) {
          var width = getOuterWidth(_this2.container);
          var height = getOuterHeight(_this2.container);
          var deltaX = event.pageX - _this2.lastPageX;
          var deltaY = event.pageY - _this2.lastPageY;
          var offset = _this2.container.getBoundingClientRect();
          var leftPos = offset.left + deltaX;
          var topPos = offset.top + deltaY;
          var viewport = getViewport();
          var containerComputedStyle = getComputedStyle(_this2.container);
          var marginLeft = parseFloat(containerComputedStyle.marginLeft);
          var marginTop = parseFloat(containerComputedStyle.marginTop);
          _this2.container.style.position = "fixed";
          if (_this2.keepInViewport) {
            if (leftPos >= _this2.minX && leftPos + width < viewport.width) {
              _this2.lastPageX = event.pageX;
              _this2.container.style.left = leftPos - marginLeft + "px";
            }
            if (topPos >= _this2.minY && topPos + height < viewport.height) {
              _this2.lastPageY = event.pageY;
              _this2.container.style.top = topPos - marginTop + "px";
            }
          } else {
            _this2.lastPageX = event.pageX;
            _this2.container.style.left = leftPos - marginLeft + "px";
            _this2.lastPageY = event.pageY;
            _this2.container.style.top = topPos - marginTop + "px";
          }
        }
      };
      window.document.addEventListener("mousemove", this.documentDragListener);
    },
    unbindDocumentDragListener: function unbindDocumentDragListener() {
      if (this.documentDragListener) {
        window.document.removeEventListener("mousemove", this.documentDragListener);
        this.documentDragListener = null;
      }
    },
    bindDocumentDragEndListener: function bindDocumentDragEndListener() {
      var _this3 = this;
      this.documentDragEndListener = function(event) {
        if (_this3.dragging) {
          _this3.dragging = false;
          document.body.removeAttribute("data-p-unselectable-text");
          !_this3.isUnstyled && (document.body.style["user-select"] = "");
          _this3.$emit("dragend", event);
        }
      };
      window.document.addEventListener("mouseup", this.documentDragEndListener);
    },
    unbindDocumentDragEndListener: function unbindDocumentDragEndListener() {
      if (this.documentDragEndListener) {
        window.document.removeEventListener("mouseup", this.documentDragEndListener);
        this.documentDragEndListener = null;
      }
    }
  },
  computed: {
    maximizeIconComponent: function maximizeIconComponent() {
      return this.maximized ? this.minimizeIcon ? "span" : "WindowMinimizeIcon" : this.maximizeIcon ? "span" : "WindowMaximizeIcon";
    },
    ariaLabelledById: function ariaLabelledById() {
      return this.header != null || this.$attrs["aria-labelledby"] !== null ? this.$id + "_header" : null;
    },
    closeAriaLabel: function closeAriaLabel() {
      return this.$primevue.config.locale.aria ? this.$primevue.config.locale.aria.close : void 0;
    },
    dataP: function dataP() {
      return cn({
        maximized: this.maximized,
        modal: this.modal
      });
    }
  },
  directives: {
    ripple: Ripple,
    focustrap: FocusTrap
  },
  components: {
    Button: script$3,
    Portal: script$2,
    WindowMinimizeIcon,
    WindowMaximizeIcon,
    TimesIcon
  }
};
function _typeof(o) {
  "@babel/helpers - typeof";
  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof(o);
}
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), true).forEach(function(r2) {
      _defineProperty(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty(e, r, t) {
  return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == _typeof(i) ? i : i + "";
}
function _toPrimitive(t, r) {
  if ("object" != _typeof(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != _typeof(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
var _hoisted_1 = ["data-p"];
var _hoisted_2 = ["aria-labelledby", "aria-modal", "data-p"];
var _hoisted_3 = ["id"];
var _hoisted_4 = ["data-p"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_Button = resolveComponent("Button");
  var _component_Portal = resolveComponent("Portal");
  var _directive_focustrap = resolveDirective("focustrap");
  return openBlock(), createBlock(_component_Portal, {
    appendTo: _ctx.appendTo
  }, {
    "default": withCtx(function() {
      return [$data.containerVisible ? (openBlock(), createElementBlock("div", mergeProps({
        key: 0,
        ref: $options.maskRef,
        "class": _ctx.cx("mask"),
        style: _ctx.sx("mask", true, {
          position: _ctx.position,
          modal: _ctx.modal
        }),
        onMousedown: _cache[1] || (_cache[1] = function() {
          return $options.onMaskMouseDown && $options.onMaskMouseDown.apply($options, arguments);
        }),
        onMouseup: _cache[2] || (_cache[2] = function() {
          return $options.onMaskMouseUp && $options.onMaskMouseUp.apply($options, arguments);
        }),
        "data-p": $options.dataP
      }, _ctx.ptm("mask")), [createVNode(Transition, mergeProps({
        name: "p-dialog",
        onEnter: $options.onEnter,
        onAfterEnter: $options.onAfterEnter,
        onBeforeLeave: $options.onBeforeLeave,
        onLeave: $options.onLeave,
        onAfterLeave: $options.onAfterLeave,
        appear: ""
      }, _ctx.ptm("transition")), {
        "default": withCtx(function() {
          return [_ctx.visible ? withDirectives((openBlock(), createElementBlock("div", mergeProps({
            key: 0,
            ref: $options.containerRef,
            "class": _ctx.cx("root"),
            style: _ctx.sx("root"),
            role: "dialog",
            "aria-labelledby": $options.ariaLabelledById,
            "aria-modal": _ctx.modal,
            "data-p": $options.dataP
          }, _ctx.ptmi("root")), [_ctx.$slots.container ? renderSlot(_ctx.$slots, "container", {
            key: 0,
            closeCallback: $options.close,
            maximizeCallback: function maximizeCallback(event) {
              return $options.maximize(event);
            },
            initDragCallback: $options.initDrag
          }) : (openBlock(), createElementBlock(Fragment, {
            key: 1
          }, [_ctx.showHeader ? (openBlock(), createElementBlock("div", mergeProps({
            key: 0,
            ref: $options.headerContainerRef,
            "class": _ctx.cx("header"),
            onMousedown: _cache[0] || (_cache[0] = function() {
              return $options.initDrag && $options.initDrag.apply($options, arguments);
            })
          }, _ctx.ptm("header")), [renderSlot(_ctx.$slots, "header", {
            "class": normalizeClass(_ctx.cx("title"))
          }, function() {
            return [_ctx.header ? (openBlock(), createElementBlock("span", mergeProps({
              key: 0,
              id: $options.ariaLabelledById,
              "class": _ctx.cx("title")
            }, _ctx.ptm("title")), toDisplayString(_ctx.header), 17, _hoisted_3)) : createCommentVNode("", true)];
          }), createElementVNode("div", mergeProps({
            "class": _ctx.cx("headerActions")
          }, _ctx.ptm("headerActions")), [_ctx.maximizable ? renderSlot(_ctx.$slots, "maximizebutton", {
            key: 0,
            maximized: $data.maximized,
            maximizeCallback: function maximizeCallback(event) {
              return $options.maximize(event);
            }
          }, function() {
            return [createVNode(_component_Button, mergeProps({
              ref: $options.maximizableRef,
              autofocus: $data.focusableMax,
              "class": _ctx.cx("pcMaximizeButton"),
              onClick: $options.maximize,
              tabindex: _ctx.maximizable ? "0" : "-1",
              unstyled: _ctx.unstyled
            }, _ctx.maximizeButtonProps, {
              pt: _ctx.ptm("pcMaximizeButton"),
              "data-pc-group-section": "headericon"
            }), {
              icon: withCtx(function(slotProps) {
                return [renderSlot(_ctx.$slots, "maximizeicon", {
                  maximized: $data.maximized
                }, function() {
                  return [(openBlock(), createBlock(resolveDynamicComponent($options.maximizeIconComponent), mergeProps({
                    "class": [slotProps["class"], $data.maximized ? _ctx.minimizeIcon : _ctx.maximizeIcon]
                  }, _ctx.ptm("pcMaximizeButton")["icon"]), null, 16, ["class"]))];
                })];
              }),
              _: 3
            }, 16, ["autofocus", "class", "onClick", "tabindex", "unstyled", "pt"])];
          }) : createCommentVNode("", true), _ctx.closable ? renderSlot(_ctx.$slots, "closebutton", {
            key: 1,
            closeCallback: $options.close
          }, function() {
            return [createVNode(_component_Button, mergeProps({
              ref: $options.closeButtonRef,
              autofocus: $data.focusableClose,
              "class": _ctx.cx("pcCloseButton"),
              onClick: $options.close,
              "aria-label": $options.closeAriaLabel,
              unstyled: _ctx.unstyled
            }, _ctx.closeButtonProps, {
              pt: _ctx.ptm("pcCloseButton"),
              "data-pc-group-section": "headericon"
            }), {
              icon: withCtx(function(slotProps) {
                return [renderSlot(_ctx.$slots, "closeicon", {}, function() {
                  return [(openBlock(), createBlock(resolveDynamicComponent(_ctx.closeIcon ? "span" : "TimesIcon"), mergeProps({
                    "class": [_ctx.closeIcon, slotProps["class"]]
                  }, _ctx.ptm("pcCloseButton")["icon"]), null, 16, ["class"]))];
                })];
              }),
              _: 3
            }, 16, ["autofocus", "class", "onClick", "aria-label", "unstyled", "pt"])];
          }) : createCommentVNode("", true)], 16)], 16)) : createCommentVNode("", true), createElementVNode("div", mergeProps({
            ref: $options.contentRef,
            "class": [_ctx.cx("content"), _ctx.contentClass],
            style: _ctx.contentStyle,
            "data-p": $options.dataP
          }, _objectSpread(_objectSpread({}, _ctx.contentProps), _ctx.ptm("content"))), [renderSlot(_ctx.$slots, "default")], 16, _hoisted_4), _ctx.footer || _ctx.$slots.footer ? (openBlock(), createElementBlock("div", mergeProps({
            key: 1,
            ref: $options.footerContainerRef,
            "class": _ctx.cx("footer")
          }, _ctx.ptm("footer")), [renderSlot(_ctx.$slots, "footer", {}, function() {
            return [createTextVNode(toDisplayString(_ctx.footer), 1)];
          })], 16)) : createCommentVNode("", true)], 64))], 16, _hoisted_2)), [[_directive_focustrap, {
            disabled: !_ctx.modal
          }]]) : createCommentVNode("", true)];
        }),
        _: 3
      }, 16, ["onEnter", "onAfterEnter", "onBeforeLeave", "onLeave", "onAfterLeave"])], 16, _hoisted_1)) : createCommentVNode("", true)];
    }),
    _: 3
  }, 8, ["appendTo"]);
}
script.render = render;
export {
  FocusTrap as F,
  script as s
};
//# sourceMappingURL=index-D46B4f3g.js.map
