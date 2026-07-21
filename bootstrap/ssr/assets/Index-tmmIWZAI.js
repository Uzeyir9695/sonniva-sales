import { T as Tooltip } from "./index-C3Ts-4IM.js";
import { s as script$a } from "./index-D46B4f3g.js";
import { s as script$9 } from "./index-BzRznsIW.js";
import { cn } from "@primeuix/utils";
import { resolveComponent, resolveDirective, openBlock, createElementBlock, mergeProps, createBlock, normalizeStyle, normalizeClass, createCommentVNode, renderSlot, createVNode, Fragment, renderList, withCtx, createElementVNode, resolveDynamicComponent, toDisplayString, Transition, createSlots, createTextVNode, withDirectives, ref, useSSRContext, computed, watch, reactive, unref } from "vue";
import BaseInput from "@primevue/core/baseinput";
import { style as style$1 } from "@primeuix/styles/textarea";
import BaseStyle from "@primevue/core/base/style";
import { s as script$8 } from "./index-ByiP8O2w.js";
import { a as script$5, s as script$7 } from "./index--B3DAMqV.js";
import { ssrRenderAttrs, ssrGetDirectiveProps, ssrInterpolate, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrRenderAttr, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { usePage, router, Link } from "@inertiajs/vue3";
import { u as useToast } from "./index-Qb24q4w2.js";
import { u as useCart } from "./useCart-CIcsIaQl.js";
import { c as calculateTierPrice, e as getOriginalPrice } from "./usePricing-ssZPWxiP.js";
import _sfc_main$2 from "./PrimeInputText-BlIRrCdA.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import { findSingle, focus, isTouchDevice, relativePosition, getOuterWidth, absolutePosition, addStyle } from "@primeuix/utils/dom";
import { isNotEmpty, findLastIndex, equals, isEmpty, resolveFieldData } from "@primeuix/utils/object";
import { ZIndex } from "@primeuix/utils/zindex";
import { ConnectedOverlayScrollHandler } from "@primevue/core/utils";
import ChevronDownIcon from "@primevue/icons/chevrondown";
import SpinnerIcon from "@primevue/icons/spinner";
import TimesIcon from "@primevue/icons/times";
import { s as script$3 } from "./index-aSrJYIQQ.js";
import { s as script$6 } from "./index-BAgOeBfa.js";
import { O as OverlayEventBus } from "./index-rAVNvoJo.js";
import { s as script$4 } from "./index-zZrFrjQS.js";
import { R as Ripple } from "./index-YvTnrAwi.js";
import { style } from "@primeuix/styles/autocomplete";
import "@primeuix/utils/uuid";
import "@primevue/core/basedirective";
import "@primeuix/styles/tooltip";
import "@primevue/icons/windowmaximize";
import "@primevue/icons/windowminimize";
import "@primeuix/styled";
import "@primevue/core/basecomponent";
import "@primeuix/styles/dialog";
import "@primevue/icons/check";
import "@primevue/icons/minus";
import "@primeuix/styles/checkbox";
import "@primeuix/styles/message";
import "@primevue/core/api";
import "@primevue/icons/blank";
import "@primevue/icons/search";
import "@primeuix/styles/iconfield";
import "@primeuix/styles/virtualscroller";
import "@primeuix/styles/select";
import "axios";
import "@primevue/icons/timescircle";
import "@primeuix/styles/chip";
import "@primeuix/styles/inputtext";
import "@primeuix/utils/eventbus";
import "@primeuix/styles/badge";
import "@primeuix/styles/ripple";
import "@primeuix/styles/button";
var inlineStyles = {
  root: {
    position: "relative"
  }
};
var classes$1 = {
  root: function root(_ref) {
    var instance = _ref.instance;
    return ["p-autocomplete p-component p-inputwrapper", {
      "p-invalid": instance.$invalid,
      "p-focus": instance.focused,
      "p-inputwrapper-filled": instance.$filled || isNotEmpty(instance.inputValue),
      "p-inputwrapper-focus": instance.focused,
      "p-autocomplete-open": instance.overlayVisible,
      "p-autocomplete-fluid": instance.$fluid,
      "p-autocomplete-clearable": instance.isClearIconVisible
    }];
  },
  pcInputText: "p-autocomplete-input",
  inputMultiple: function inputMultiple(_ref2) {
    var instance = _ref2.instance, props = _ref2.props;
    return ["p-autocomplete-input-multiple", {
      "p-variant-filled": instance.$variant === "filled",
      "p-disabled": props.disabled
    }];
  },
  clearIcon: "p-autocomplete-clear-icon",
  chipItem: function chipItem(_ref3) {
    var instance = _ref3.instance, i = _ref3.i;
    return ["p-autocomplete-chip-item", {
      "p-focus": instance.focusedMultipleOptionIndex === i
    }];
  },
  pcChip: "p-autocomplete-chip",
  chipIcon: "p-autocomplete-chip-icon",
  inputChip: "p-autocomplete-input-chip",
  loader: "p-autocomplete-loader",
  dropdown: "p-autocomplete-dropdown",
  overlay: "p-autocomplete-overlay p-component",
  listContainer: "p-autocomplete-list-container",
  list: "p-autocomplete-list",
  optionGroup: "p-autocomplete-option-group",
  option: function option(_ref4) {
    var instance = _ref4.instance, _option = _ref4.option, i = _ref4.i, getItemOptions = _ref4.getItemOptions;
    return ["p-autocomplete-option", {
      "p-autocomplete-option-selected": instance.isSelected(_option),
      "p-focus": instance.focusedOptionIndex === instance.getOptionIndex(i, getItemOptions),
      "p-disabled": instance.isOptionDisabled(_option)
    }];
  },
  emptyMessage: "p-autocomplete-empty-message"
};
var AutoCompleteStyle = BaseStyle.extend({
  name: "autocomplete",
  style,
  classes: classes$1,
  inlineStyles
});
var script$1$1 = {
  name: "BaseAutoComplete",
  "extends": BaseInput,
  props: {
    suggestions: {
      type: Array,
      "default": null
    },
    optionLabel: null,
    optionDisabled: null,
    optionGroupLabel: null,
    optionGroupChildren: null,
    scrollHeight: {
      type: String,
      "default": "14rem"
    },
    dropdown: {
      type: Boolean,
      "default": false
    },
    dropdownMode: {
      type: String,
      "default": "blank"
    },
    multiple: {
      type: Boolean,
      "default": false
    },
    loading: {
      type: Boolean,
      "default": false
    },
    placeholder: {
      type: String,
      "default": null
    },
    dataKey: {
      type: String,
      "default": null
    },
    minLength: {
      type: Number,
      "default": 1
    },
    delay: {
      type: Number,
      "default": 300
    },
    appendTo: {
      type: [String, Object],
      "default": "body"
    },
    forceSelection: {
      type: Boolean,
      "default": false
    },
    completeOnFocus: {
      type: Boolean,
      "default": false
    },
    showClear: {
      type: Boolean,
      "default": false
    },
    inputId: {
      type: String,
      "default": null
    },
    inputStyle: {
      type: Object,
      "default": null
    },
    inputClass: {
      type: [String, Object],
      "default": null
    },
    panelStyle: {
      type: Object,
      "default": null
    },
    panelClass: {
      type: [String, Object],
      "default": null
    },
    overlayStyle: {
      type: Object,
      "default": null
    },
    overlayClass: {
      type: [String, Object],
      "default": null
    },
    dropdownIcon: {
      type: String,
      "default": null
    },
    dropdownClass: {
      type: [String, Object],
      "default": null
    },
    loader: {
      type: String,
      "default": null
    },
    loadingIcon: {
      type: String,
      "default": null
    },
    removeTokenIcon: {
      type: String,
      "default": null
    },
    chipIcon: {
      type: String,
      "default": null
    },
    virtualScrollerOptions: {
      type: Object,
      "default": null
    },
    autoOptionFocus: {
      type: Boolean,
      "default": false
    },
    selectOnFocus: {
      type: Boolean,
      "default": false
    },
    focusOnHover: {
      type: Boolean,
      "default": true
    },
    searchLocale: {
      type: String,
      "default": void 0
    },
    searchMessage: {
      type: String,
      "default": null
    },
    selectionMessage: {
      type: String,
      "default": null
    },
    emptySelectionMessage: {
      type: String,
      "default": null
    },
    emptySearchMessage: {
      type: String,
      "default": null
    },
    showEmptyMessage: {
      type: Boolean,
      "default": true
    },
    tabindex: {
      type: Number,
      "default": 0
    },
    typeahead: {
      type: Boolean,
      "default": true
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
  style: AutoCompleteStyle,
  provide: function provide() {
    return {
      $pcAutoComplete: this,
      $parentInstance: this
    };
  }
};
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
function _typeof$1(o) {
  "@babel/helpers - typeof";
  return _typeof$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof$1(o);
}
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
var script$2 = {
  name: "AutoComplete",
  "extends": script$1$1,
  inheritAttrs: false,
  emits: ["change", "focus", "blur", "item-select", "item-unselect", "option-select", "option-unselect", "dropdown-click", "clear", "complete", "before-show", "before-hide", "show", "hide"],
  inject: {
    $pcFluid: {
      "default": null
    }
  },
  outsideClickListener: null,
  resizeListener: null,
  scrollHandler: null,
  overlay: null,
  virtualScroller: null,
  searchTimeout: null,
  dirty: false,
  startRangeIndex: -1,
  data: function data() {
    return {
      clicked: false,
      focused: false,
      focusedOptionIndex: -1,
      focusedMultipleOptionIndex: -1,
      overlayVisible: false,
      searching: false
    };
  },
  watch: {
    suggestions: function suggestions() {
      if (this.searching) {
        this.show();
        this.focusedOptionIndex = this.overlayVisible && this.autoOptionFocus ? this.findFirstFocusedOptionIndex() : -1;
        this.searching = false;
        !this.showEmptyMessage && this.visibleOptions.length === 0 && this.hide();
      }
      this.autoUpdateModel();
    }
  },
  mounted: function mounted() {
    this.autoUpdateModel();
  },
  updated: function updated() {
    if (this.overlayVisible) {
      this.alignOverlay();
    }
  },
  beforeUnmount: function beforeUnmount() {
    this.unbindOutsideClickListener();
    this.unbindResizeListener();
    if (this.scrollHandler) {
      this.scrollHandler.destroy();
      this.scrollHandler = null;
    }
    if (this.overlay) {
      ZIndex.clear(this.overlay);
      this.overlay = null;
    }
  },
  methods: {
    getOptionIndex: function getOptionIndex(index, fn) {
      return this.virtualScrollerDisabled ? index : fn && fn(index)["index"];
    },
    getOptionLabel: function getOptionLabel(option2) {
      return this.optionLabel ? resolveFieldData(option2, this.optionLabel) : option2;
    },
    getOptionValue: function getOptionValue(option2) {
      return option2;
    },
    getOptionRenderKey: function getOptionRenderKey(option2, index) {
      return (this.dataKey ? resolveFieldData(option2, this.dataKey) : this.getOptionLabel(option2)) + "_" + index;
    },
    getPTOptions: function getPTOptions(option2, itemOptions, index, key) {
      return this.ptm(key, {
        context: {
          option: option2,
          index,
          selected: this.isSelected(option2),
          focused: this.focusedOptionIndex === this.getOptionIndex(index, itemOptions),
          disabled: this.isOptionDisabled(option2)
        }
      });
    },
    isOptionDisabled: function isOptionDisabled(option2) {
      return this.optionDisabled ? resolveFieldData(option2, this.optionDisabled) : false;
    },
    isOptionGroup: function isOptionGroup(option2) {
      return this.optionGroupLabel && option2.optionGroup && option2.group;
    },
    getOptionGroupLabel: function getOptionGroupLabel(optionGroup) {
      return resolveFieldData(optionGroup, this.optionGroupLabel);
    },
    getOptionGroupChildren: function getOptionGroupChildren(optionGroup) {
      return resolveFieldData(optionGroup, this.optionGroupChildren);
    },
    getAriaPosInset: function getAriaPosInset(index) {
      var _this = this;
      return (this.optionGroupLabel ? index - this.visibleOptions.slice(0, index).filter(function(option2) {
        return _this.isOptionGroup(option2);
      }).length : index) + 1;
    },
    show: function show(isFocus) {
      this.$emit("before-show");
      this.dirty = true;
      this.overlayVisible = true;
      this.focusedOptionIndex = this.focusedOptionIndex !== -1 ? this.focusedOptionIndex : this.autoOptionFocus ? this.findFirstFocusedOptionIndex() : -1;
      isFocus && focus(this.multiple ? this.$refs.focusInput : this.$refs.focusInput.$el);
    },
    hide: function hide(isFocus) {
      var _this2 = this;
      var _hide = function _hide2() {
        var _this2$$refs$focusInp;
        _this2.$emit("before-hide");
        _this2.dirty = isFocus;
        _this2.overlayVisible = false;
        _this2.clicked = false;
        _this2.focusedOptionIndex = -1;
        isFocus && focus(_this2.multiple ? _this2.$refs.focusInput : (_this2$$refs$focusInp = _this2.$refs.focusInput) === null || _this2$$refs$focusInp === void 0 ? void 0 : _this2$$refs$focusInp.$el);
      };
      setTimeout(function() {
        _hide();
      }, 0);
    },
    onFocus: function onFocus(event) {
      if (this.disabled) {
        return;
      }
      if (!this.dirty && this.completeOnFocus) {
        this.search(event, event.target.value, "focus");
      }
      this.dirty = true;
      this.focused = true;
      if (this.overlayVisible) {
        this.focusedOptionIndex = this.focusedOptionIndex !== -1 ? this.focusedOptionIndex : this.overlayVisible && this.autoOptionFocus ? this.findFirstFocusedOptionIndex() : -1;
        this.scrollInView(this.focusedOptionIndex);
      }
      this.$emit("focus", event);
    },
    onBlur: function onBlur(event) {
      var _this$formField$onBlu, _this$formField;
      this.dirty = false;
      this.focused = false;
      this.focusedOptionIndex = -1;
      this.$emit("blur", event);
      (_this$formField$onBlu = (_this$formField = this.formField).onBlur) === null || _this$formField$onBlu === void 0 || _this$formField$onBlu.call(_this$formField);
    },
    onKeyDown: function onKeyDown(event) {
      if (this.disabled) {
        event.preventDefault();
        return;
      }
      switch (event.code) {
        case "ArrowDown":
          this.onArrowDownKey(event);
          break;
        case "ArrowUp":
          this.onArrowUpKey(event);
          break;
        case "ArrowLeft":
          this.onArrowLeftKey(event);
          break;
        case "ArrowRight":
          this.onArrowRightKey(event);
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
          this.onEnterKey(event);
          break;
        case "Space":
          this.onSpaceKey(event);
          break;
        case "Escape":
          this.onEscapeKey(event);
          break;
        case "Tab":
          this.onTabKey(event);
          break;
        case "ShiftLeft":
        case "ShiftRight":
          this.onShiftKey(event);
          break;
        case "Backspace":
          this.onBackspaceKey(event);
          break;
      }
      this.clicked = false;
    },
    onInput: function onInput(event) {
      var _this3 = this;
      if (this.typeahead) {
        if (this.searchTimeout) {
          clearTimeout(this.searchTimeout);
        }
        var query = event.target.value;
        if (!this.multiple) {
          this.updateModel(event, query);
        }
        if (query.length === 0) {
          this.searching = false;
          this.hide();
          this.$emit("clear");
        } else {
          if (query.length >= this.minLength) {
            this.focusedOptionIndex = -1;
            this.searchTimeout = setTimeout(function() {
              _this3.search(event, query, "input");
            }, this.delay);
          } else {
            this.searching = false;
            this.hide();
          }
        }
      }
    },
    onChange: function onChange(event) {
      var _this4 = this;
      if (this.forceSelection) {
        var valid = false;
        if (this.visibleOptions && !this.multiple) {
          var _this$$refs$focusInpu;
          var value = this.multiple ? this.$refs.focusInput.value : (_this$$refs$focusInpu = this.$refs.focusInput) === null || _this$$refs$focusInpu === void 0 || (_this$$refs$focusInpu = _this$$refs$focusInpu.$el) === null || _this$$refs$focusInpu === void 0 ? void 0 : _this$$refs$focusInpu.value;
          var matchedValue = this.visibleOptions.find(function(option2) {
            return _this4.isOptionMatched(option2, value || "");
          });
          if (matchedValue !== void 0) {
            valid = true;
            !this.isSelected(matchedValue) && this.onOptionSelect(event, matchedValue);
          }
        }
        if (!valid) {
          if (this.multiple) {
            this.$refs.focusInput.value = "";
          } else {
            var _this$$refs$focusInpu2;
            var inputEl = (_this$$refs$focusInpu2 = this.$refs.focusInput) === null || _this$$refs$focusInpu2 === void 0 ? void 0 : _this$$refs$focusInpu2.$el;
            inputEl && (inputEl.value = "");
          }
          this.$emit("clear");
          !this.multiple && this.updateModel(event, null);
        }
      }
    },
    onMultipleContainerFocus: function onMultipleContainerFocus() {
      if (this.disabled) {
        return;
      }
      this.focused = true;
    },
    onMultipleContainerBlur: function onMultipleContainerBlur() {
      this.focusedMultipleOptionIndex = -1;
      this.focused = false;
    },
    onMultipleContainerKeyDown: function onMultipleContainerKeyDown(event) {
      if (this.disabled) {
        event.preventDefault();
        return;
      }
      switch (event.code) {
        case "ArrowLeft":
          this.onArrowLeftKeyOnMultiple(event);
          break;
        case "ArrowRight":
          this.onArrowRightKeyOnMultiple(event);
          break;
        case "Backspace":
          this.onBackspaceKeyOnMultiple(event);
          break;
      }
    },
    onContainerClick: function onContainerClick(event) {
      this.clicked = true;
      if (this.disabled || this.searching || this.loading || this.isDropdownClicked(event)) {
        return;
      }
      if (!this.overlay || !this.overlay.contains(event.target)) {
        focus(this.multiple ? this.$refs.focusInput : this.$refs.focusInput.$el);
      }
    },
    onDropdownClick: function onDropdownClick(event) {
      var query = void 0;
      if (this.overlayVisible) {
        this.hide(true);
      } else {
        var target = this.multiple ? this.$refs.focusInput : this.$refs.focusInput.$el;
        focus(target);
        query = target.value;
        if (this.dropdownMode === "blank") this.search(event, "", "dropdown");
        else if (this.dropdownMode === "current") this.search(event, query, "dropdown");
      }
      this.$emit("dropdown-click", {
        originalEvent: event,
        query
      });
    },
    onOptionSelect: function onOptionSelect(event, option2) {
      var isHide = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : true;
      var value = this.getOptionValue(option2);
      if (this.multiple) {
        this.$refs.focusInput.value = "";
        if (!this.isSelected(option2)) {
          this.updateModel(event, [].concat(_toConsumableArray(this.d_value || []), [value]));
        }
      } else {
        this.updateModel(event, value);
      }
      this.$emit("item-select", {
        originalEvent: event,
        value: option2
      });
      this.$emit("option-select", {
        originalEvent: event,
        value: option2
      });
      isHide && this.hide(true);
    },
    onOptionMouseMove: function onOptionMouseMove(event, index) {
      if (this.focusOnHover) {
        this.changeFocusedOptionIndex(event, index);
      }
    },
    onOptionSelectRange: function onOptionSelectRange(event) {
      var _this5 = this;
      var start = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : -1;
      var end = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : -1;
      start === -1 && (start = this.findNearestSelectedOptionIndex(end, true));
      end === -1 && (end = this.findNearestSelectedOptionIndex(start));
      if (start !== -1 && end !== -1) {
        var rangeStart = Math.min(start, end);
        var rangeEnd = Math.max(start, end);
        var value = this.visibleOptions.slice(rangeStart, rangeEnd + 1).filter(function(option2) {
          return _this5.isValidOption(option2);
        }).filter(function(option2) {
          return !_this5.isSelected(option2);
        }).map(function(option2) {
          return _this5.getOptionValue(option2);
        });
        this.updateModel(event, [].concat(_toConsumableArray(this.d_value || []), _toConsumableArray(value)));
      }
    },
    onClearClick: function onClearClick(event) {
      this.updateModel(event, null);
    },
    onOverlayClick: function onOverlayClick(event) {
      OverlayEventBus.emit("overlay-click", {
        originalEvent: event,
        target: this.$el
      });
    },
    onOverlayKeyDown: function onOverlayKeyDown(event) {
      switch (event.code) {
        case "Escape":
          this.onEscapeKey(event);
          break;
      }
    },
    onArrowDownKey: function onArrowDownKey(event) {
      if (!this.overlayVisible) {
        return;
      }
      var optionIndex = this.focusedOptionIndex !== -1 ? this.findNextOptionIndex(this.focusedOptionIndex) : this.clicked ? this.findFirstOptionIndex() : this.findFirstFocusedOptionIndex();
      if (this.multiple && event.shiftKey) {
        this.onOptionSelectRange(event, this.startRangeIndex, optionIndex);
      }
      this.changeFocusedOptionIndex(event, optionIndex);
      event.preventDefault();
    },
    onArrowUpKey: function onArrowUpKey(event) {
      if (!this.overlayVisible) {
        return;
      }
      if (event.altKey) {
        if (this.focusedOptionIndex !== -1) {
          this.onOptionSelect(event, this.visibleOptions[this.focusedOptionIndex]);
        }
        this.overlayVisible && this.hide();
        event.preventDefault();
      } else {
        var optionIndex = this.focusedOptionIndex !== -1 ? this.findPrevOptionIndex(this.focusedOptionIndex) : this.clicked ? this.findLastOptionIndex() : this.findLastFocusedOptionIndex();
        if (this.multiple && event.shiftKey) {
          this.onOptionSelectRange(event, optionIndex, this.startRangeIndex);
        }
        this.changeFocusedOptionIndex(event, optionIndex);
        event.preventDefault();
      }
    },
    onArrowLeftKey: function onArrowLeftKey(event) {
      var target = event.currentTarget;
      this.focusedOptionIndex = -1;
      if (this.multiple) {
        if (isEmpty(target.value) && this.$filled) {
          focus(this.$refs.multiContainer);
          this.focusedMultipleOptionIndex = this.d_value.length;
        } else {
          event.stopPropagation();
        }
      }
    },
    onArrowRightKey: function onArrowRightKey(event) {
      this.focusedOptionIndex = -1;
      this.multiple && event.stopPropagation();
    },
    onHomeKey: function onHomeKey(event) {
      var currentTarget = event.currentTarget;
      var len = currentTarget.value.length;
      var metaKey = event.metaKey || event.ctrlKey;
      var optionIndex = this.findFirstOptionIndex();
      if (this.multiple && event.shiftKey && metaKey) {
        this.onOptionSelectRange(event, optionIndex, this.startRangeIndex);
      }
      currentTarget.setSelectionRange(0, event.shiftKey ? len : 0);
      this.focusedOptionIndex = -1;
      event.preventDefault();
    },
    onEndKey: function onEndKey(event) {
      var currentTarget = event.currentTarget;
      var len = currentTarget.value.length;
      var metaKey = event.metaKey || event.ctrlKey;
      var optionIndex = this.findLastOptionIndex();
      if (this.multiple && event.shiftKey && metaKey) {
        this.onOptionSelectRange(event, this.startRangeIndex, optionIndex);
      }
      currentTarget.setSelectionRange(event.shiftKey ? 0 : len, len);
      this.focusedOptionIndex = -1;
      event.preventDefault();
    },
    onPageUpKey: function onPageUpKey(event) {
      this.scrollInView(0);
      event.preventDefault();
    },
    onPageDownKey: function onPageDownKey(event) {
      this.scrollInView(this.visibleOptions.length - 1);
      event.preventDefault();
    },
    onEnterKey: function onEnterKey(event) {
      if (!this.typeahead) {
        if (this.multiple) {
          if (event.target.value.trim()) {
            this.updateModel(event, [].concat(_toConsumableArray(this.d_value || []), [event.target.value.trim()]));
            this.$refs.focusInput.value = "";
          }
          event.preventDefault();
        }
      } else {
        if (!this.overlayVisible) {
          this.focusedOptionIndex = -1;
          this.onArrowDownKey(event);
        } else {
          if (this.focusedOptionIndex !== -1) {
            if (this.multiple && event.shiftKey) {
              this.onOptionSelectRange(event, this.focusedOptionIndex);
              event.preventDefault();
            } else {
              this.onOptionSelect(event, this.visibleOptions[this.focusedOptionIndex]);
            }
          }
          this.hide();
        }
      }
    },
    onSpaceKey: function onSpaceKey(event) {
      if (!this.autoOptionFocus && this.focusedOptionIndex !== -1) {
        this.onEnterKey(event);
      }
    },
    onEscapeKey: function onEscapeKey(event) {
      this.overlayVisible && this.hide(true);
      event.preventDefault();
    },
    onTabKey: function onTabKey(event) {
      if (this.focusedOptionIndex !== -1) {
        this.onOptionSelect(event, this.visibleOptions[this.focusedOptionIndex]);
      }
      this.overlayVisible && this.hide();
    },
    onShiftKey: function onShiftKey() {
      this.startRangeIndex = this.focusedOptionIndex;
    },
    onBackspaceKey: function onBackspaceKey(event) {
      if (this.multiple) {
        if (isNotEmpty(this.d_value) && !this.$refs.focusInput.value) {
          var removedValue = this.d_value[this.d_value.length - 1];
          var newValue = this.d_value.slice(0, -1);
          this.writeValue(newValue, event);
          this.$emit("item-unselect", {
            originalEvent: event,
            value: removedValue
          });
          this.$emit("option-unselect", {
            originalEvent: event,
            value: removedValue
          });
        }
        event.stopPropagation();
      }
    },
    onArrowLeftKeyOnMultiple: function onArrowLeftKeyOnMultiple() {
      this.focusedMultipleOptionIndex = this.focusedMultipleOptionIndex < 1 ? 0 : this.focusedMultipleOptionIndex - 1;
    },
    onArrowRightKeyOnMultiple: function onArrowRightKeyOnMultiple() {
      this.focusedMultipleOptionIndex++;
      if (this.focusedMultipleOptionIndex > this.d_value.length - 1) {
        this.focusedMultipleOptionIndex = -1;
        focus(this.$refs.focusInput);
      }
    },
    onBackspaceKeyOnMultiple: function onBackspaceKeyOnMultiple(event) {
      if (this.focusedMultipleOptionIndex !== -1) {
        this.removeOption(event, this.focusedMultipleOptionIndex);
      }
    },
    onOverlayEnter: function onOverlayEnter(el) {
      ZIndex.set("overlay", el, this.$primevue.config.zIndex.overlay);
      addStyle(el, {
        position: "absolute",
        top: "0"
      });
      this.alignOverlay();
      this.$attrSelector && el.setAttribute(this.$attrSelector, "");
    },
    onOverlayAfterEnter: function onOverlayAfterEnter() {
      this.bindOutsideClickListener();
      this.bindScrollListener();
      this.bindResizeListener();
      this.$emit("show");
    },
    onOverlayLeave: function onOverlayLeave() {
      this.unbindOutsideClickListener();
      this.unbindScrollListener();
      this.unbindResizeListener();
      this.$emit("hide");
      this.overlay = null;
    },
    onOverlayAfterLeave: function onOverlayAfterLeave(el) {
      ZIndex.clear(el);
    },
    alignOverlay: function alignOverlay() {
      var target = this.multiple ? this.$refs.multiContainer : this.$refs.focusInput.$el;
      if (this.appendTo === "self") {
        relativePosition(this.overlay, target);
      } else {
        this.overlay.style.minWidth = getOuterWidth(target) + "px";
        absolutePosition(this.overlay, target);
      }
    },
    bindOutsideClickListener: function bindOutsideClickListener() {
      var _this6 = this;
      if (!this.outsideClickListener) {
        this.outsideClickListener = function(event) {
          if (_this6.overlayVisible && _this6.overlay && _this6.isOutsideClicked(event)) {
            _this6.hide();
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
      var _this7 = this;
      if (!this.scrollHandler) {
        this.scrollHandler = new ConnectedOverlayScrollHandler(this.$refs.container, function() {
          if (_this7.overlayVisible) {
            _this7.hide();
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
      var _this8 = this;
      if (!this.resizeListener) {
        this.resizeListener = function() {
          if (_this8.overlayVisible && !isTouchDevice()) {
            _this8.hide();
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
    isOutsideClicked: function isOutsideClicked(event) {
      return !this.overlay.contains(event.target) && !this.isInputClicked(event) && !this.isDropdownClicked(event);
    },
    isInputClicked: function isInputClicked(event) {
      if (this.multiple) return event.target === this.$refs.multiContainer || this.$refs.multiContainer.contains(event.target);
      else return event.target === this.$refs.focusInput.$el;
    },
    isDropdownClicked: function isDropdownClicked(event) {
      return this.$refs.dropdownButton ? event.target === this.$refs.dropdownButton || this.$refs.dropdownButton.contains(event.target) : false;
    },
    isOptionMatched: function isOptionMatched(option2, value) {
      var _this$getOptionLabel;
      return this.isValidOption(option2) && ((_this$getOptionLabel = this.getOptionLabel(option2)) === null || _this$getOptionLabel === void 0 ? void 0 : _this$getOptionLabel.toLocaleLowerCase(this.searchLocale)) === value.toLocaleLowerCase(this.searchLocale);
    },
    isValidOption: function isValidOption(option2) {
      return isNotEmpty(option2) && !(this.isOptionDisabled(option2) || this.isOptionGroup(option2));
    },
    isValidSelectedOption: function isValidSelectedOption(option2) {
      return this.isValidOption(option2) && this.isSelected(option2);
    },
    isEquals: function isEquals(value1, value2) {
      return equals(value1, value2, this.equalityKey);
    },
    isSelected: function isSelected(option2) {
      var _this9 = this;
      var optionValue = this.getOptionValue(option2);
      return this.multiple ? (this.d_value || []).some(function(value) {
        return _this9.isEquals(value, optionValue);
      }) : this.isEquals(this.d_value, this.getOptionValue(option2));
    },
    findFirstOptionIndex: function findFirstOptionIndex() {
      var _this0 = this;
      return this.visibleOptions.findIndex(function(option2) {
        return _this0.isValidOption(option2);
      });
    },
    findLastOptionIndex: function findLastOptionIndex() {
      var _this1 = this;
      return findLastIndex(this.visibleOptions, function(option2) {
        return _this1.isValidOption(option2);
      });
    },
    findNextOptionIndex: function findNextOptionIndex(index) {
      var _this10 = this;
      var matchedOptionIndex = index < this.visibleOptions.length - 1 ? this.visibleOptions.slice(index + 1).findIndex(function(option2) {
        return _this10.isValidOption(option2);
      }) : -1;
      return matchedOptionIndex > -1 ? matchedOptionIndex + index + 1 : index;
    },
    findPrevOptionIndex: function findPrevOptionIndex(index) {
      var _this11 = this;
      var matchedOptionIndex = index > 0 ? findLastIndex(this.visibleOptions.slice(0, index), function(option2) {
        return _this11.isValidOption(option2);
      }) : -1;
      return matchedOptionIndex > -1 ? matchedOptionIndex : index;
    },
    findSelectedOptionIndex: function findSelectedOptionIndex() {
      var _this12 = this;
      return this.$filled ? this.visibleOptions.findIndex(function(option2) {
        return _this12.isValidSelectedOption(option2);
      }) : -1;
    },
    findFirstFocusedOptionIndex: function findFirstFocusedOptionIndex() {
      var selectedIndex = this.findSelectedOptionIndex();
      return selectedIndex < 0 ? this.findFirstOptionIndex() : selectedIndex;
    },
    findLastFocusedOptionIndex: function findLastFocusedOptionIndex() {
      var selectedIndex = this.findSelectedOptionIndex();
      return selectedIndex < 0 ? this.findLastOptionIndex() : selectedIndex;
    },
    search: function search(event, query, source) {
      if (query === void 0 || query === null) {
        return;
      }
      if (source === "input" && query.trim().length === 0) {
        return;
      }
      this.searching = true;
      this.show();
      this.$emit("complete", {
        originalEvent: event,
        query
      });
    },
    removeOption: function removeOption(event, index) {
      var _this13 = this;
      var removedOption = this.d_value[index];
      var value = this.d_value.filter(function(_, i) {
        return i !== index;
      }).map(function(option2) {
        return _this13.getOptionValue(option2);
      });
      this.updateModel(event, value);
      this.$emit("item-unselect", {
        originalEvent: event,
        value: removedOption
      });
      this.$emit("option-unselect", {
        originalEvent: event,
        value: removedOption
      });
      this.dirty = true;
      focus(this.multiple ? this.$refs.focusInput : this.$refs.focusInput.$el);
    },
    changeFocusedOptionIndex: function changeFocusedOptionIndex(event, index) {
      if (this.focusedOptionIndex !== index) {
        this.focusedOptionIndex = index;
        this.scrollInView();
        if (this.selectOnFocus) {
          this.onOptionSelect(event, this.visibleOptions[index], false);
        }
      }
    },
    scrollInView: function scrollInView() {
      var _this14 = this;
      var index = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : -1;
      this.$nextTick(function() {
        var id = index !== -1 ? "".concat(_this14.$id, "_").concat(index) : _this14.focusedOptionId;
        var element = findSingle(_this14.list, 'li[id="'.concat(id, '"]'));
        if (element) {
          element.scrollIntoView && element.scrollIntoView({
            block: "nearest",
            inline: "start"
          });
        } else if (!_this14.virtualScrollerDisabled) {
          _this14.virtualScroller && _this14.virtualScroller.scrollToIndex(index !== -1 ? index : _this14.focusedOptionIndex);
        }
      });
    },
    autoUpdateModel: function autoUpdateModel() {
      if (this.selectOnFocus && this.autoOptionFocus && !this.$filled) {
        this.focusedOptionIndex = this.findFirstFocusedOptionIndex();
        this.onOptionSelect(null, this.visibleOptions[this.focusedOptionIndex], false);
      }
    },
    updateModel: function updateModel(event, value) {
      this.writeValue(value, event);
      this.$emit("change", {
        originalEvent: event,
        value
      });
    },
    flatOptions: function flatOptions(options) {
      var _this15 = this;
      return (options || []).reduce(function(result, option2, index) {
        result.push({
          optionGroup: option2,
          group: true,
          index
        });
        var optionGroupChildren = _this15.getOptionGroupChildren(option2);
        optionGroupChildren && optionGroupChildren.forEach(function(o) {
          return result.push(o);
        });
        return result;
      }, []);
    },
    overlayRef: function overlayRef(el) {
      this.overlay = el;
    },
    listRef: function listRef(el, contentRef) {
      this.list = el;
      contentRef && contentRef(el);
    },
    virtualScrollerRef: function virtualScrollerRef(el) {
      this.virtualScroller = el;
    },
    findNextSelectedOptionIndex: function findNextSelectedOptionIndex(index) {
      var _this16 = this;
      var matchedOptionIndex = this.$filled && index < this.visibleOptions.length - 1 ? this.visibleOptions.slice(index + 1).findIndex(function(option2) {
        return _this16.isValidSelectedOption(option2);
      }) : -1;
      return matchedOptionIndex > -1 ? matchedOptionIndex + index + 1 : -1;
    },
    findPrevSelectedOptionIndex: function findPrevSelectedOptionIndex(index) {
      var _this17 = this;
      var matchedOptionIndex = this.$filled && index > 0 ? findLastIndex(this.visibleOptions.slice(0, index), function(option2) {
        return _this17.isValidSelectedOption(option2);
      }) : -1;
      return matchedOptionIndex > -1 ? matchedOptionIndex : -1;
    },
    findNearestSelectedOptionIndex: function findNearestSelectedOptionIndex(index) {
      var firstCheckUp = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
      var matchedOptionIndex = -1;
      if (this.$filled) {
        if (firstCheckUp) {
          matchedOptionIndex = this.findPrevSelectedOptionIndex(index);
          matchedOptionIndex = matchedOptionIndex === -1 ? this.findNextSelectedOptionIndex(index) : matchedOptionIndex;
        } else {
          matchedOptionIndex = this.findNextSelectedOptionIndex(index);
          matchedOptionIndex = matchedOptionIndex === -1 ? this.findPrevSelectedOptionIndex(index) : matchedOptionIndex;
        }
      }
      return matchedOptionIndex > -1 ? matchedOptionIndex : index;
    }
  },
  computed: {
    visibleOptions: function visibleOptions() {
      return this.optionGroupLabel ? this.flatOptions(this.suggestions) : this.suggestions || [];
    },
    inputValue: function inputValue() {
      if (this.$filled) {
        if (_typeof$1(this.d_value) === "object") {
          var label = this.getOptionLabel(this.d_value);
          return label != null ? label : this.d_value;
        } else {
          return this.d_value;
        }
      } else {
        return "";
      }
    },
    // @deprecated use $filled instead.
    hasSelectedOption: function hasSelectedOption() {
      return this.$filled;
    },
    equalityKey: function equalityKey() {
      return this.dataKey;
    },
    searchResultMessageText: function searchResultMessageText() {
      return isNotEmpty(this.visibleOptions) && this.overlayVisible ? this.searchMessageText.replaceAll("{0}", this.visibleOptions.length) : this.emptySearchMessageText;
    },
    searchMessageText: function searchMessageText() {
      return this.searchMessage || this.$primevue.config.locale.searchMessage || "";
    },
    emptySearchMessageText: function emptySearchMessageText() {
      return this.emptySearchMessage || this.$primevue.config.locale.emptySearchMessage || "";
    },
    selectionMessageText: function selectionMessageText() {
      return this.selectionMessage || this.$primevue.config.locale.selectionMessage || "";
    },
    emptySelectionMessageText: function emptySelectionMessageText() {
      return this.emptySelectionMessage || this.$primevue.config.locale.emptySelectionMessage || "";
    },
    selectedMessageText: function selectedMessageText() {
      return this.$filled ? this.selectionMessageText.replaceAll("{0}", this.multiple ? this.d_value.length : "1") : this.emptySelectionMessageText;
    },
    listAriaLabel: function listAriaLabel() {
      return this.$primevue.config.locale.aria ? this.$primevue.config.locale.aria.listLabel : void 0;
    },
    focusedOptionId: function focusedOptionId() {
      return this.focusedOptionIndex !== -1 ? "".concat(this.$id, "_").concat(this.focusedOptionIndex) : null;
    },
    focusedMultipleOptionId: function focusedMultipleOptionId() {
      return this.focusedMultipleOptionIndex !== -1 ? "".concat(this.$id, "_multiple_option_").concat(this.focusedMultipleOptionIndex) : null;
    },
    isClearIconVisible: function isClearIconVisible() {
      return this.showClear && this.$filled && !this.disabled && !this.loading;
    },
    ariaSetSize: function ariaSetSize() {
      var _this18 = this;
      return this.visibleOptions.filter(function(option2) {
        return !_this18.isOptionGroup(option2);
      }).length;
    },
    virtualScrollerDisabled: function virtualScrollerDisabled() {
      return !this.virtualScrollerOptions;
    },
    panelId: function panelId() {
      return this.$id + "_panel";
    },
    containerDataP: function containerDataP() {
      return cn({
        fluid: this.$fluid
      });
    },
    overlayDataP: function overlayDataP() {
      return cn(_defineProperty$1({}, "portal-" + this.appendTo, "portal-" + this.appendTo));
    },
    inputMultipleDataP: function inputMultipleDataP() {
      return cn(_defineProperty$1({
        invalid: this.$invalid,
        disabled: this.disabled,
        focus: this.focused,
        fluid: this.$fluid,
        filled: this.$variant === "filled",
        empty: !this.$filled
      }, this.size, this.size));
    }
  },
  components: {
    InputText: script$6,
    VirtualScroller: script$5,
    Portal: script$4,
    Chip: script$3,
    ChevronDownIcon,
    SpinnerIcon,
    TimesIcon
  },
  directives: {
    ripple: Ripple
  }
};
function _typeof$2(o) {
  "@babel/helpers - typeof";
  return _typeof$2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof$2(o);
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
      _defineProperty$2(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$2(e, r, t) {
  return (r = _toPropertyKey$2(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey$2(t) {
  var i = _toPrimitive$2(t, "string");
  return "symbol" == _typeof$2(i) ? i : i + "";
}
function _toPrimitive$2(t, r) {
  if ("object" != _typeof$2(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != _typeof$2(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
var _hoisted_1$1 = ["data-p"];
var _hoisted_2 = ["aria-activedescendant", "data-p-has-dropdown", "data-p"];
var _hoisted_3 = ["id", "aria-label", "aria-setsize", "aria-posinset"];
var _hoisted_4 = ["id", "placeholder", "tabindex", "disabled", "aria-label", "aria-labelledby", "aria-expanded", "aria-controls", "aria-activedescendant", "aria-invalid"];
var _hoisted_5 = ["data-p-has-dropdown"];
var _hoisted_6 = ["disabled", "aria-expanded", "aria-controls"];
var _hoisted_7 = ["id", "data-p"];
var _hoisted_8 = ["id", "aria-label"];
var _hoisted_9 = ["id"];
var _hoisted_10 = ["id", "aria-label", "aria-selected", "aria-disabled", "aria-setsize", "aria-posinset", "onClick", "onMousemove", "data-p-selected", "data-p-focused", "data-p-disabled"];
function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_InputText = resolveComponent("InputText");
  var _component_TimesIcon = resolveComponent("TimesIcon");
  var _component_Chip = resolveComponent("Chip");
  var _component_SpinnerIcon = resolveComponent("SpinnerIcon");
  var _component_VirtualScroller = resolveComponent("VirtualScroller");
  var _component_Portal = resolveComponent("Portal");
  var _directive_ripple = resolveDirective("ripple");
  return openBlock(), createElementBlock("div", mergeProps({
    ref: "container",
    "class": _ctx.cx("root"),
    style: _ctx.sx("root"),
    onClick: _cache[11] || (_cache[11] = function() {
      return $options.onContainerClick && $options.onContainerClick.apply($options, arguments);
    }),
    "data-p": $options.containerDataP
  }, _ctx.ptmi("root")), [!_ctx.multiple ? (openBlock(), createBlock(_component_InputText, {
    key: 0,
    ref: "focusInput",
    id: _ctx.inputId,
    type: "text",
    name: _ctx.$formName,
    "class": normalizeClass([_ctx.cx("pcInputText"), _ctx.inputClass]),
    style: normalizeStyle(_ctx.inputStyle),
    defaultValue: $options.inputValue,
    placeholder: _ctx.placeholder,
    tabindex: !_ctx.disabled ? _ctx.tabindex : -1,
    fluid: _ctx.$fluid,
    disabled: _ctx.disabled,
    size: _ctx.size,
    invalid: _ctx.invalid,
    variant: _ctx.variant,
    autocomplete: "off",
    role: "combobox",
    "aria-label": _ctx.ariaLabel,
    "aria-labelledby": _ctx.ariaLabelledby,
    "aria-haspopup": "listbox",
    "aria-autocomplete": "list",
    "aria-expanded": $data.overlayVisible,
    "aria-controls": $data.overlayVisible ? $options.panelId : void 0,
    "aria-activedescendant": $data.focused ? $options.focusedOptionId : void 0,
    onFocus: $options.onFocus,
    onBlur: $options.onBlur,
    onKeydown: $options.onKeyDown,
    onInput: $options.onInput,
    onChange: $options.onChange,
    unstyled: _ctx.unstyled,
    "data-p-has-dropdown": _ctx.dropdown,
    pt: _ctx.ptm("pcInputText")
  }, null, 8, ["id", "name", "class", "style", "defaultValue", "placeholder", "tabindex", "fluid", "disabled", "size", "invalid", "variant", "aria-label", "aria-labelledby", "aria-expanded", "aria-controls", "aria-activedescendant", "onFocus", "onBlur", "onKeydown", "onInput", "onChange", "unstyled", "data-p-has-dropdown", "pt"])) : createCommentVNode("", true), $options.isClearIconVisible ? renderSlot(_ctx.$slots, "clearicon", {
    key: 1,
    "class": normalizeClass(_ctx.cx("clearIcon")),
    clearCallback: $options.onClearClick
  }, function() {
    return [createVNode(_component_TimesIcon, mergeProps({
      "class": [_ctx.cx("clearIcon")],
      onClick: $options.onClearClick
    }, _ctx.ptm("clearIcon")), null, 16, ["class", "onClick"])];
  }) : createCommentVNode("", true), _ctx.multiple ? (openBlock(), createElementBlock("ul", mergeProps({
    key: 2,
    ref: "multiContainer",
    "class": _ctx.cx("inputMultiple"),
    tabindex: "-1",
    role: "listbox",
    "aria-orientation": "horizontal",
    "aria-activedescendant": $data.focused ? $options.focusedMultipleOptionId : void 0,
    onFocus: _cache[5] || (_cache[5] = function() {
      return $options.onMultipleContainerFocus && $options.onMultipleContainerFocus.apply($options, arguments);
    }),
    onBlur: _cache[6] || (_cache[6] = function() {
      return $options.onMultipleContainerBlur && $options.onMultipleContainerBlur.apply($options, arguments);
    }),
    onKeydown: _cache[7] || (_cache[7] = function() {
      return $options.onMultipleContainerKeyDown && $options.onMultipleContainerKeyDown.apply($options, arguments);
    }),
    "data-p-has-dropdown": _ctx.dropdown,
    "data-p": $options.inputMultipleDataP
  }, _ctx.ptm("inputMultiple")), [(openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.d_value, function(option2, i) {
    return openBlock(), createElementBlock("li", mergeProps({
      key: "".concat(i, "_").concat($options.getOptionLabel(option2)),
      id: _ctx.$id + "_multiple_option_" + i,
      "class": _ctx.cx("chipItem", {
        i
      }),
      role: "option",
      "aria-label": $options.getOptionLabel(option2),
      "aria-selected": true,
      "aria-setsize": _ctx.d_value.length,
      "aria-posinset": i + 1
    }, {
      ref_for: true
    }, _ctx.ptm("chipItem")), [renderSlot(_ctx.$slots, "chip", mergeProps({
      "class": _ctx.cx("pcChip"),
      value: option2,
      index: i,
      removeCallback: function removeCallback(event) {
        return $options.removeOption(event, i);
      }
    }, {
      ref_for: true
    }, _ctx.ptm("pcChip")), function() {
      return [createVNode(_component_Chip, {
        "class": normalizeClass(_ctx.cx("pcChip")),
        label: $options.getOptionLabel(option2),
        removeIcon: _ctx.chipIcon || _ctx.removeTokenIcon,
        removable: "",
        unstyled: _ctx.unstyled,
        onRemove: function onRemove($event) {
          return $options.removeOption($event, i);
        },
        "data-p-focused": $data.focusedMultipleOptionIndex === i,
        pt: _ctx.ptm("pcChip")
      }, {
        removeicon: withCtx(function() {
          return [renderSlot(_ctx.$slots, _ctx.$slots.chipicon ? "chipicon" : "removetokenicon", {
            "class": normalizeClass(_ctx.cx("chipIcon")),
            index: i,
            removeCallback: function removeCallback(event) {
              return $options.removeOption(event, i);
            }
          })];
        }),
        _: 2
      }, 1032, ["class", "label", "removeIcon", "unstyled", "onRemove", "data-p-focused", "pt"])];
    })], 16, _hoisted_3);
  }), 128)), createElementVNode("li", mergeProps({
    "class": _ctx.cx("inputChip"),
    role: "option"
  }, _ctx.ptm("inputChip")), [createElementVNode("input", mergeProps({
    ref: "focusInput",
    id: _ctx.inputId,
    type: "text",
    style: _ctx.inputStyle,
    "class": _ctx.inputClass,
    placeholder: _ctx.placeholder,
    tabindex: !_ctx.disabled ? _ctx.tabindex : -1,
    disabled: _ctx.disabled,
    autocomplete: "off",
    role: "combobox",
    "aria-label": _ctx.ariaLabel,
    "aria-labelledby": _ctx.ariaLabelledby,
    "aria-haspopup": "listbox",
    "aria-autocomplete": "list",
    "aria-expanded": $data.overlayVisible,
    "aria-controls": _ctx.$id + "_list",
    "aria-activedescendant": $data.focused ? $options.focusedOptionId : void 0,
    "aria-invalid": _ctx.invalid || void 0,
    onFocus: _cache[0] || (_cache[0] = function() {
      return $options.onFocus && $options.onFocus.apply($options, arguments);
    }),
    onBlur: _cache[1] || (_cache[1] = function() {
      return $options.onBlur && $options.onBlur.apply($options, arguments);
    }),
    onKeydown: _cache[2] || (_cache[2] = function() {
      return $options.onKeyDown && $options.onKeyDown.apply($options, arguments);
    }),
    onInput: _cache[3] || (_cache[3] = function() {
      return $options.onInput && $options.onInput.apply($options, arguments);
    }),
    onChange: _cache[4] || (_cache[4] = function() {
      return $options.onChange && $options.onChange.apply($options, arguments);
    })
  }, _ctx.ptm("input")), null, 16, _hoisted_4)], 16)], 16, _hoisted_2)) : createCommentVNode("", true), $data.searching || _ctx.loading ? renderSlot(_ctx.$slots, _ctx.$slots.loader ? "loader" : "loadingicon", {
    key: 3,
    "class": normalizeClass(_ctx.cx("loader"))
  }, function() {
    return [_ctx.loader || _ctx.loadingIcon ? (openBlock(), createElementBlock("i", mergeProps({
      key: 0,
      "class": ["pi-spin", _ctx.cx("loader"), _ctx.loader, _ctx.loadingIcon],
      "aria-hidden": "true",
      "data-p-has-dropdown": _ctx.dropdown
    }, _ctx.ptm("loader")), null, 16, _hoisted_5)) : _ctx.loading ? (openBlock(), createBlock(_component_SpinnerIcon, mergeProps({
      key: 1,
      "class": _ctx.cx("loader"),
      spin: "",
      "aria-hidden": "true",
      "data-p-has-dropdown": _ctx.dropdown
    }, _ctx.ptm("loader")), null, 16, ["class", "data-p-has-dropdown"])) : createCommentVNode("", true)];
  }) : createCommentVNode("", true), renderSlot(_ctx.$slots, _ctx.$slots.dropdown ? "dropdown" : "dropdownbutton", {
    toggleCallback: function toggleCallback(event) {
      return $options.onDropdownClick(event);
    }
  }, function() {
    return [_ctx.dropdown ? (openBlock(), createElementBlock("button", mergeProps({
      key: 0,
      ref: "dropdownButton",
      type: "button",
      "class": [_ctx.cx("dropdown"), _ctx.dropdownClass],
      disabled: _ctx.disabled,
      "aria-haspopup": "listbox",
      "aria-expanded": $data.overlayVisible,
      "aria-controls": $options.panelId,
      onClick: _cache[8] || (_cache[8] = function() {
        return $options.onDropdownClick && $options.onDropdownClick.apply($options, arguments);
      })
    }, _ctx.ptm("dropdown")), [renderSlot(_ctx.$slots, "dropdownicon", {
      "class": normalizeClass(_ctx.dropdownIcon)
    }, function() {
      return [(openBlock(), createBlock(resolveDynamicComponent(_ctx.dropdownIcon ? "span" : "ChevronDownIcon"), mergeProps({
        "class": _ctx.dropdownIcon
      }, _ctx.ptm("dropdownIcon")), null, 16, ["class"]))];
    })], 16, _hoisted_6)) : createCommentVNode("", true)];
  }), _ctx.typeahead ? (openBlock(), createElementBlock("span", mergeProps({
    key: 4,
    role: "status",
    "aria-live": "polite",
    "class": "p-hidden-accessible"
  }, _ctx.ptm("hiddenSearchResult"), {
    "data-p-hidden-accessible": true
  }), toDisplayString($options.searchResultMessageText), 17)) : createCommentVNode("", true), createVNode(_component_Portal, {
    appendTo: _ctx.appendTo
  }, {
    "default": withCtx(function() {
      return [createVNode(Transition, mergeProps({
        name: "p-connected-overlay",
        onEnter: $options.onOverlayEnter,
        onAfterEnter: $options.onOverlayAfterEnter,
        onLeave: $options.onOverlayLeave,
        onAfterLeave: $options.onOverlayAfterLeave
      }, _ctx.ptm("transition")), {
        "default": withCtx(function() {
          return [$data.overlayVisible ? (openBlock(), createElementBlock("div", mergeProps({
            key: 0,
            ref: $options.overlayRef,
            id: $options.panelId,
            "class": [_ctx.cx("overlay"), _ctx.panelClass, _ctx.overlayClass],
            style: _objectSpread(_objectSpread({}, _ctx.panelStyle), _ctx.overlayStyle),
            onClick: _cache[9] || (_cache[9] = function() {
              return $options.onOverlayClick && $options.onOverlayClick.apply($options, arguments);
            }),
            onKeydown: _cache[10] || (_cache[10] = function() {
              return $options.onOverlayKeyDown && $options.onOverlayKeyDown.apply($options, arguments);
            }),
            "data-p": $options.overlayDataP
          }, _ctx.ptm("overlay")), [renderSlot(_ctx.$slots, "header", {
            value: _ctx.d_value,
            suggestions: $options.visibleOptions
          }), createElementVNode("div", mergeProps({
            "class": _ctx.cx("listContainer"),
            style: {
              "max-height": $options.virtualScrollerDisabled ? _ctx.scrollHeight : ""
            }
          }, _ctx.ptm("listContainer")), [createVNode(_component_VirtualScroller, mergeProps({
            ref: $options.virtualScrollerRef
          }, _ctx.virtualScrollerOptions, {
            style: {
              height: _ctx.scrollHeight
            },
            items: $options.visibleOptions,
            tabindex: -1,
            disabled: $options.virtualScrollerDisabled,
            pt: _ctx.ptm("virtualScroller")
          }), createSlots({
            content: withCtx(function(_ref) {
              var styleClass = _ref.styleClass, contentRef = _ref.contentRef, items = _ref.items, getItemOptions = _ref.getItemOptions, contentStyle = _ref.contentStyle, itemSize = _ref.itemSize;
              return [createElementVNode("ul", mergeProps({
                ref: function ref2(el) {
                  return $options.listRef(el, contentRef);
                },
                id: _ctx.$id + "_list",
                "class": [_ctx.cx("list"), styleClass],
                style: contentStyle,
                role: "listbox",
                "aria-label": $options.listAriaLabel
              }, _ctx.ptm("list")), [(openBlock(true), createElementBlock(Fragment, null, renderList(items, function(option2, i) {
                return openBlock(), createElementBlock(Fragment, {
                  key: $options.getOptionRenderKey(option2, $options.getOptionIndex(i, getItemOptions))
                }, [$options.isOptionGroup(option2) ? (openBlock(), createElementBlock("li", mergeProps({
                  key: 0,
                  id: _ctx.$id + "_" + $options.getOptionIndex(i, getItemOptions),
                  style: {
                    height: itemSize ? itemSize + "px" : void 0
                  },
                  "class": _ctx.cx("optionGroup"),
                  role: "option"
                }, {
                  ref_for: true
                }, _ctx.ptm("optionGroup")), [renderSlot(_ctx.$slots, "optiongroup", {
                  option: option2.optionGroup,
                  index: $options.getOptionIndex(i, getItemOptions)
                }, function() {
                  return [createTextVNode(toDisplayString($options.getOptionGroupLabel(option2.optionGroup)), 1)];
                })], 16, _hoisted_9)) : withDirectives((openBlock(), createElementBlock("li", mergeProps({
                  key: 1,
                  id: _ctx.$id + "_" + $options.getOptionIndex(i, getItemOptions),
                  style: {
                    height: itemSize ? itemSize + "px" : void 0
                  },
                  "class": _ctx.cx("option", {
                    option: option2,
                    i,
                    getItemOptions
                  }),
                  role: "option",
                  "aria-label": $options.getOptionLabel(option2),
                  "aria-selected": $options.isSelected(option2),
                  "aria-disabled": $options.isOptionDisabled(option2),
                  "aria-setsize": $options.ariaSetSize,
                  "aria-posinset": $options.getAriaPosInset($options.getOptionIndex(i, getItemOptions)),
                  onClick: function onClick($event) {
                    return $options.onOptionSelect($event, option2);
                  },
                  onMousemove: function onMousemove($event) {
                    return $options.onOptionMouseMove($event, $options.getOptionIndex(i, getItemOptions));
                  },
                  "data-p-selected": $options.isSelected(option2),
                  "data-p-focused": $data.focusedOptionIndex === $options.getOptionIndex(i, getItemOptions),
                  "data-p-disabled": $options.isOptionDisabled(option2)
                }, {
                  ref_for: true
                }, $options.getPTOptions(option2, getItemOptions, i, "option")), [renderSlot(_ctx.$slots, "option", {
                  option: option2,
                  index: $options.getOptionIndex(i, getItemOptions)
                }, function() {
                  return [createTextVNode(toDisplayString($options.getOptionLabel(option2)), 1)];
                })], 16, _hoisted_10)), [[_directive_ripple]])], 64);
              }), 128)), _ctx.showEmptyMessage && (!items || items && items.length === 0) ? (openBlock(), createElementBlock("li", mergeProps({
                key: 0,
                "class": _ctx.cx("emptyMessage"),
                role: "option"
              }, _ctx.ptm("emptyMessage")), [renderSlot(_ctx.$slots, "empty", {}, function() {
                return [createTextVNode(toDisplayString($options.searchResultMessageText), 1)];
              })], 16)) : createCommentVNode("", true)], 16, _hoisted_8)];
            }),
            _: 2
          }, [_ctx.$slots.loader ? {
            name: "loader",
            fn: withCtx(function(_ref2) {
              var options = _ref2.options;
              return [renderSlot(_ctx.$slots, "loader", {
                options
              })];
            }),
            key: "0"
          } : void 0]), 1040, ["style", "items", "disabled", "pt"])], 16), renderSlot(_ctx.$slots, "footer", {
            value: _ctx.d_value,
            suggestions: $options.visibleOptions
          }), createElementVNode("span", mergeProps({
            role: "status",
            "aria-live": "polite",
            "class": "p-hidden-accessible"
          }, _ctx.ptm("hiddenSelectedMessage"), {
            "data-p-hidden-accessible": true
          }), toDisplayString($options.selectedMessageText), 17)], 16, _hoisted_7)) : createCommentVNode("", true)];
        }),
        _: 3
      }, 16, ["onEnter", "onAfterEnter", "onLeave", "onAfterLeave"])];
    }),
    _: 3
  }, 8, ["appendTo"])], 16, _hoisted_1$1);
}
script$2.render = render$1;
var classes = {
  root: function root2(_ref) {
    var instance = _ref.instance, props = _ref.props;
    return ["p-textarea p-component", {
      "p-filled": instance.$filled,
      "p-textarea-resizable ": props.autoResize,
      "p-textarea-sm p-inputfield-sm": props.size === "small",
      "p-textarea-lg p-inputfield-lg": props.size === "large",
      "p-invalid": instance.$invalid,
      "p-variant-filled": instance.$variant === "filled",
      "p-textarea-fluid": instance.$fluid
    }];
  }
};
var TextareaStyle = BaseStyle.extend({
  name: "textarea",
  style: style$1,
  classes
});
var script$1 = {
  name: "BaseTextarea",
  "extends": BaseInput,
  props: {
    autoResize: Boolean
  },
  style: TextareaStyle,
  provide: function provide2() {
    return {
      $pcTextarea: this,
      $parentInstance: this
    };
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
var script = {
  name: "Textarea",
  "extends": script$1,
  inheritAttrs: false,
  observer: null,
  mounted: function mounted2() {
    var _this = this;
    if (this.autoResize) {
      this.observer = new ResizeObserver(function() {
        requestAnimationFrame(function() {
          _this.resize();
        });
      });
      this.observer.observe(this.$el);
    }
  },
  updated: function updated2() {
    if (this.autoResize) {
      this.resize();
    }
  },
  beforeUnmount: function beforeUnmount2() {
    if (this.observer) {
      this.observer.disconnect();
    }
  },
  methods: {
    resize: function resize() {
      if (!this.$el.offsetParent) return;
      var currentHeight = this.$el.style.height;
      var currentHeightValue = parseInt(currentHeight) || 0;
      var initialScrollHeight = this.$el.scrollHeight;
      var needsExpanding = !currentHeightValue || initialScrollHeight > currentHeightValue;
      var needsShrinking = currentHeightValue && initialScrollHeight < currentHeightValue;
      if (needsShrinking) {
        this.$el.style.height = "auto";
        this.$el.style.height = "".concat(this.$el.scrollHeight, "px");
      } else if (needsExpanding) {
        this.$el.style.height = "".concat(initialScrollHeight, "px");
      }
    },
    onInput: function onInput2(event) {
      if (this.autoResize) {
        this.resize();
      }
      this.writeValue(event.target.value, event);
    }
  },
  computed: {
    attrs: function attrs() {
      return mergeProps(this.ptmi("root", {
        context: {
          filled: this.$filled,
          disabled: this.disabled
        }
      }), this.formField);
    },
    dataP: function dataP() {
      return cn(_defineProperty({
        invalid: this.$invalid,
        fluid: this.$fluid,
        filled: this.$variant === "filled"
      }, this.size, this.size));
    }
  }
};
var _hoisted_1 = ["value", "name", "disabled", "aria-invalid", "data-p"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("textarea", mergeProps({
    "class": _ctx.cx("root"),
    value: _ctx.d_value,
    name: _ctx.name,
    disabled: _ctx.disabled,
    "aria-invalid": _ctx.invalid || void 0,
    "data-p": $options.dataP,
    onInput: _cache[0] || (_cache[0] = function() {
      return $options.onInput && $options.onInput.apply($options, arguments);
    })
  }, $options.attrs), null, 16, _hoisted_1);
}
script.render = render;
const _sfc_main$1 = {
  __name: "PlacesAutocomplete",
  __ssrInlineRender: true,
  props: {
    modelValue: String
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const emits = __emit;
    const GOOGLE_API_KEY = "AIzaSyALNVMJFFhyIJp-fwJ-BHjEDannfArnTB4";
    const query = ref("");
    const suggestions2 = ref([]);
    const isConfirmed = ref(false);
    const showWarning = ref(false);
    let lastSeq = 0;
    const debounceTimerRef = { t: null };
    function debounce(fn, ms = 100) {
      return (...args) => {
        clearTimeout(debounceTimerRef.t);
        debounceTimerRef.t = setTimeout(() => fn(...args), ms);
      };
    }
    const doFetch = debounce(async (input, seq) => {
      if (!input) {
        suggestions2.value = [];
        return;
      }
      try {
        const body = {
          input,
          includedRegionCodes: ["GE"]
        };
        const resp = await fetch(`https://places.googleapis.com/v1/places:autocomplete?key=${GOOGLE_API_KEY}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(body)
        });
        const data2 = await resp.json();
        if (seq < lastSeq) return;
        suggestions2.value = data2.suggestions || [];
      } catch (err) {
        console.error("[svc-debug] error in fetch", err);
        suggestions2.value = [];
      }
    }, 100);
    function onInput3() {
      isConfirmed.value = false;
      showWarning.value = false;
      emits("update:modelValue", "");
      const text = query.value.trim();
      const seq = ++lastSeq;
      doFetch(text, seq);
    }
    function onBlur2() {
      if (query.value.trim() && !isConfirmed.value) {
        showWarning.value = true;
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _directive_tooltip = Tooltip;
      let _temp0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "w-full" }, _attrs))} data-v-6d27a99e><div data-v-6d27a99e><label for="city" class="text-sm font-semibold" data-v-6d27a99e> ზუსტი მისამართი <i${ssrRenderAttrs(_temp0 = mergeProps({ class: "pi pi-exclamation-circle text-sm ml-1 text-red-500" }, ssrGetDirectiveProps(_ctx, _directive_tooltip, "სავალდებულო ველი", void 0, { top: true })))} data-v-6d27a99e>${"textContent" in _temp0 ? ssrInterpolate(_temp0.textContent) : _temp0.innerHTML ?? ""}</i></label>`);
      if (showWarning.value) {
        _push(`<p class="text-sm text-red-500 mt-1 mb-1" data-v-6d27a99e><i class="pi pi-exclamation-circle text-xs" data-v-6d27a99e></i> აირჩიეთ შესაბამისი მისამართი ქვემოთ მოცემული ლისტიდან </p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="relative mt-2" data-v-6d27a99e>`);
      _push(ssrRenderComponent(_sfc_main$2, {
        id: "city",
        class: "py-2.5! w-full pr-8!",
        modelValue: query.value,
        "onUpdate:modelValue": ($event) => query.value = $event,
        placeholder: "მისამართი",
        onInput: onInput3,
        onBlur: onBlur2
      }, null, _parent));
      if (isConfirmed.value) {
        _push(`<span class="absolute right-2.5 top-1/2 -translate-y-1/2 text-green-500 pointer-events-none" data-v-6d27a99e><i class="pi pi-check-circle text-base" data-v-6d27a99e></i></span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
      if (suggestions2.value.length) {
        _push(`<ul class="border rounded-md bg-white mt-2 shadow-md" data-v-6d27a99e><!--[-->`);
        ssrRenderList(suggestions2.value, (item, i) => {
          _push(`<li class="p-2 hover:bg-gray-100 cursor-pointer" data-v-6d27a99e><strong data-v-6d27a99e>${ssrInterpolate(item.placePrediction.structuredFormat?.mainText?.text || item.placePrediction.text?.text)}</strong>`);
          if (item.placePrediction.structuredFormat?.secondaryText) {
            _push(`<br data-v-6d27a99e>`);
          } else {
            _push(`<!---->`);
          }
          if (item.placePrediction.structuredFormat?.secondaryText) {
            _push(`<small data-v-6d27a99e>${ssrInterpolate(item.placePrediction.structuredFormat.secondaryText.text)}</small>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</li>`);
        });
        _push(`<!--]--></ul>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Shared/components/PlacesAutocomplete.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const PlacesAutocomplete = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-6d27a99e"]]);
const TBILISI_FREE_THRESHOLD = 500;
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    cartItems: { type: Array, required: true }
  },
  setup(__props) {
    const props = __props;
    const page = usePage();
    const toast = useToast();
    const { getQuantity } = useCart();
    const isVip = computed(() => page.props.user?.can_view_vip ?? false);
    const removedCartIds = ref([]);
    const items = computed(
      () => props.cartItems.filter((c) => !removedCartIds.value.includes(c.id)).map((c) => ({
        ...c,
        qty: getQuantity(c.item_id, c.selected_uom) || c.quantity,
        unitPrice: calculateTierPrice(c.item, getQuantity(c.item_id, c.selected_uom) || c.quantity, c.selected_uom, isVip.value),
        rowTotal: calculateTierPrice(c.item, getQuantity(c.item_id, c.selected_uom) || c.quantity, c.selected_uom, isVip.value) * (getQuantity(c.item_id, c.selected_uom) || c.quantity)
      }))
    );
    watch(() => items.value.length, (len) => {
      if (len === 0) {
        toast.add({ severity: "info", summary: "კალათა ცარიელია", detail: "ყველა პროდუქტი ამოღებულია გადახდის გვერდიდან", life: 4e3 });
        router.visit(route("cart.index"));
      }
    });
    const subtotal = computed(
      () => items.value.reduce((sum, c) => sum + c.rowTotal, 0)
    );
    const totalSavings = computed(
      () => items.value.reduce((sum, c) => {
        const originalTotal = c.item.unit_price * c.qty;
        return sum + Math.max(0, originalTotal - c.rowTotal);
      }, 0)
    );
    function checkoutDisplayPrice(cartItem) {
      return cartItem.unitPrice;
    }
    function checkoutStrikePrice(cartItem) {
      const item = cartItem.item;
      if (item.unit_price <= 0) return null;
      return getOriginalPrice(item);
    }
    const DELIVERY_RATES = [
      { maxKg: 1, tbilisi: 6.5, region: 10.5, office: 6, village: 15.5 },
      { maxKg: 5, tbilisi: 7.5, region: 12.5, office: 6, village: 17.5 },
      { maxKg: 10, tbilisi: 11, region: 16, office: 10, village: 21 },
      { maxKg: 15, tbilisi: 16, region: 21, office: 15, village: 26 },
      { maxKg: 20, tbilisi: 19, region: 26, office: 20, village: 31 },
      { maxKg: 30, tbilisi: 30, region: 36, office: 30, village: 45 },
      { maxKg: 50, tbilisi: 45, region: 65, office: 50, village: 80 },
      { maxKg: 100, tbilisi: 65, region: 105, office: 80, village: 120 },
      { maxKg: 150, tbilisi: 80, region: 145, office: 110, village: 175 },
      { maxKg: 200, tbilisi: 100, region: 185, office: 140, village: 215 },
      { maxKg: 250, tbilisi: 120, region: 220, office: 170, village: 250 },
      { maxKg: 300, tbilisi: 140, region: 260, office: 200, village: 290 },
      { maxKg: 500, tbilisi: 220, region: 340, office: 280, village: 390 },
      { maxKg: 750, tbilisi: 300, region: 450, office: 370, village: 500 },
      { maxKg: 1e3, tbilisi: 380, region: 700, office: 510, village: 750 }
    ];
    function calcDeliveryPrice(weightKg, type) {
      const rate = DELIVERY_RATES.find((r) => weightKg <= r.maxKg);
      return (rate ?? DELIVERY_RATES[DELIVERY_RATES.length - 1])[type];
    }
    const deliveryTypes = [
      { key: "office", label: "თვითგატანა სონნივას ფილიალიდან" },
      { key: "tbilisi", label: "მიწოდება თბილისში" },
      { key: "regions", label: "მიწოდება რეგიონებში" }
    ];
    const regionOptions = [
      { key: "onway_office", label: "OnWay-ის ფილიალიდან გატანა", icon: "fa-solid fa-warehouse" },
      { key: "address", label: "ადგილზე მიტანა", icon: "fa-solid fa-truck-fast" }
    ];
    const onwayBranches = [
      "რუსთავი",
      "ბათუმი",
      "ზუგდიდი",
      "ქუთაისი",
      "ფოთი",
      "ზესტაფონი",
      "ხაშური",
      "ახალციხე",
      "თელავი",
      "სამტრედია"
    ];
    const selectedDelivery = ref(null);
    const selectedRegionOption = ref(null);
    const selectedOnwayBranch = ref(null);
    const selectedZone = ref(null);
    const selectedTbilisiZone = ref(null);
    const selectedOfficeBranch = ref(null);
    const zones = ref([]);
    const zoneSuggestions = ref([]);
    const zonesLoading = ref(false);
    const officeBranches = [
      {
        key: "avchala",
        label: "ავჭალის ფილიალი",
        address: "შუშის ქუჩა 38 — ორშაბათი-პარასკევი 09:00-18:00",
        mapUrl: "https://maps.app.goo.gl/3YwH55CnhUUfJoYQ9"
      },
      {
        key: "didube",
        label: "დიდუბის ფილიალი",
        address: "ზაირა კიკვიძის 6 — ორშაბათი-პარასკევი 09:00-18:00",
        mapUrl: "https://maps.app.goo.gl/mUedJ9Jf9j1tR9nt6"
      }
    ];
    const officeInventoryChecking = ref(false);
    const officeInventoryShortages = ref([]);
    const showOfficeInventoryDialog = ref(false);
    const hasOfficeInventoryIssue = computed(
      () => selectedDelivery.value?.key === "office" && officeInventoryShortages.value.length > 0
    );
    async function checkOfficeInventory() {
      if (selectedDelivery.value?.key !== "office" || !selectedOfficeBranch.value || !items.value.length) {
        officeInventoryShortages.value = [];
        return;
      }
      officeInventoryChecking.value = true;
      try {
        const res = await axios.post(route("checkout.office-inventory"), {
          office: selectedOfficeBranch.value,
          items: items.value.map((c) => ({ no: c.item.no, name: c.item.name, qty: c.qty }))
        });
        officeInventoryShortages.value = res.data.shortages ?? [];
        if (officeInventoryShortages.value.length) {
          showOfficeInventoryDialog.value = true;
        }
      } catch {
        toast.add({ severity: "error", summary: "შეცდომა", detail: "მარაგის შემოწმება ვერ მოხერხდა", life: 4e3 });
      } finally {
        officeInventoryChecking.value = false;
      }
    }
    watch(
      [selectedOfficeBranch, () => items.value.map((c) => `${c.item_id}:${c.qty}`).join("|")],
      checkOfficeInventory
    );
    const tbilisiZoneOptions = [
      {
        label: "I ზონა – 5-40 ₾",
        price: 40,
        items: [
          "გლდანი",
          "გლდანულა",
          "სოფელი გლდანი",
          "ზაჰესი",
          "ავჭალა",
          "თემქა",
          "მუხიანი",
          "დიღომი",
          "დიღმის მასივი",
          "დიდი დიღომი",
          "სოფელი დიღომი"
        ].map((name) => ({ name, price: 40 }))
      },
      {
        label: "II ზონა – 5-50 ₾",
        price: 50,
        items: [
          "ვაკე",
          "საბურთალო",
          "ბაგები",
          "ლისი",
          "ვაშლიჯვარი",
          "ორთაჭალა",
          "მთაწმინდა",
          "სოლოლაკი",
          "ვერა",
          "დიდუბე",
          "ჩუღურეთი",
          "ნაძალადევი"
        ].map((name) => ({ name, price: 50 }))
      },
      {
        label: "III ზონა – 5-60 ₾",
        price: 60,
        items: [
          "ისანი",
          "სამგორი",
          "ლილო",
          "ორხევი",
          "აეროპორტის დასახლება",
          "ქვემო ფონიჭალა",
          "ზემო ფონიჭალა",
          "ვარკეთილი",
          "წყნეთი",
          "კოჯორი",
          "ტაბახმელა",
          "წავკისი",
          "შინდისი",
          "ოქროყანა",
          "ნაფეტვრები"
        ].map((name) => ({ name, price: 60 }))
      }
    ];
    const GEO_TO_LATIN = {
      "ა": "a",
      "ბ": "b",
      "გ": "g",
      "დ": "d",
      "ე": "e",
      "ვ": "v",
      "ზ": "z",
      "თ": "t",
      "ი": "i",
      "კ": "k",
      "ლ": "l",
      "მ": "m",
      "ნ": "n",
      "ო": "o",
      "პ": "p",
      "ჟ": "zh",
      "რ": "r",
      "ს": "s",
      "ტ": "t",
      "უ": "u",
      "ფ": "f",
      "ქ": "k",
      "ღ": "gh",
      "ყ": "q",
      "შ": "sh",
      "ჩ": "ch",
      "ც": "ts",
      "ძ": "dz",
      "წ": "ts",
      "ჭ": "ch",
      "ხ": "kh",
      "ჯ": "j",
      "ჰ": "h"
    };
    function geoToLatin(text) {
      return text.split("").map((c) => GEO_TO_LATIN[c] ?? c).join("").toLowerCase();
    }
    function filterZones(event) {
      const query = event.query.toLowerCase();
      zoneSuggestions.value = query ? zones.value.filter(
        (z) => z.name.toLowerCase().includes(query) || geoToLatin(z.name).includes(query)
      ) : zones.value;
    }
    async function fetchZones() {
      if (zones.value.length) return;
      zonesLoading.value = true;
      try {
        const res = await axios.get(route("checkout.onway-regions"));
        zones.value = res.data.zones ?? [];
      } catch {
        toast.add({ severity: "error", summary: "შეცდომა", detail: "ზონების ჩატვირთვა ვერ მოხერხდა. გთხოვთ განაახლოთ გვერდი და სცადოთ ხელახლა.", life: 4e3 });
      } finally {
        zonesLoading.value = false;
      }
    }
    watch(selectedRegionOption, (val) => {
      if (val === "address") fetchZones();
      selectedZone.value = null;
    });
    const totalWeightKg = computed(
      () => items.value.reduce((sum, cartItem) => {
        const item = cartItem.item;
        const qty = cartItem.qty;
        if (item.unit_price == 0 && cartItem.selected_uom) {
          const entry = (item.weights ?? []).find((w) => w.uom === cartItem.selected_uom);
          return sum + (entry ? entry.weight * qty : 0);
        }
        return sum + (item.weights?.[0]?.weight ?? 0) * qty;
      }, 0)
    );
    computed(
      () => Number(totalWeightKg.value.toFixed(2)).toString()
    );
    const deliveryPriceType = computed(() => {
      const key = selectedDelivery.value?.key;
      if (!key || key === "office") return null;
      if (key === "tbilisi") return "tbilisi";
      if (key === "regions") {
        if (selectedRegionOption.value === "onway_office") return "office";
        if (selectedRegionOption.value === "address" && selectedZone.value?.name) {
          return selectedZone.value.name.includes(">") ? "village" : "region";
        }
      }
      return null;
    });
    const deliveryCost = computed(() => {
      const key = selectedDelivery.value?.key;
      if (!key) return null;
      if (key === "office") return 0;
      if (key === "tbilisi") {
        if (!selectedTbilisiZone.value) return null;
        if (subtotal.value >= TBILISI_FREE_THRESHOLD) return 0;
        return totalWeightKg.value >= 50 ? selectedTbilisiZone.value.price : calcDeliveryPrice(totalWeightKg.value, "tbilisi");
      }
      const type = deliveryPriceType.value;
      if (!type) return null;
      return calcDeliveryPrice(totalWeightKg.value, type);
    });
    const total = computed(() => subtotal.value + (deliveryCost.value ?? 0));
    const showAddressField = computed(
      () => selectedDelivery.value?.key === "tbilisi" || selectedDelivery.value?.key === "regions" && selectedRegionOption.value === "address"
    );
    const providers = [
      { name: "PCB ბანკი", icon: "/payments/pcb.jpeg", code: "pcb" },
      { name: "BOG ბანკი", icon: "/payments/bog.png", code: "bog" },
      { name: "TBC ბანკი", icon: "/payments/tbc.png", code: "tbc" },
      { name: "საბანკო გადარიცხვა", icon: "/payments/invoice-icon.png", code: "invoice" },
      { name: "ლიმიტით გადახდა", icon: "", code: "limit" }
    ];
    const selectedProvider = ref(null);
    const creditInfo = ref(null);
    const creditLoading = ref(false);
    async function fetchCreditInfo() {
      if (creditInfo.value !== null) return;
      creditLoading.value = true;
      try {
        const res = await axios.get(route("checkout.credit-info"));
        creditInfo.value = res.data;
      } catch {
        creditInfo.value = { has_credit: false, available: 0, limit: 0, used: 0 };
      } finally {
        creditLoading.value = false;
      }
    }
    watch(selectedProvider, (val) => {
      if (val?.code === "limit") fetchCreditInfo();
    });
    const canPayWithLimit = computed(() => {
      if (!creditInfo.value) return false;
      return creditInfo.value.has_credit && creditInfo.value.available >= total.value;
    });
    const payButtonDisabled = computed(
      () => loading.value || selectedProvider.value?.code === "limit" && !canPayWithLimit.value || hasOfficeInventoryIssue.value
    );
    const form = reactive({
      address: null,
      apartment_number: null,
      comment: null,
      agreement: false
    });
    const loading = ref(false);
    const formatted = (val) => Number(val).toFixed(2);
    const errors = reactive({
      deliveryType: null,
      tbilisiZone: null,
      regionOption: null,
      onwayBranch: null,
      regionZone: null,
      officeBranch: null,
      address: null,
      provider: null,
      agreement: null
    });
    watch(selectedDelivery, () => {
      errors.deliveryType = null;
    });
    watch(selectedTbilisiZone, () => {
      errors.tbilisiZone = null;
    });
    watch(selectedRegionOption, () => {
      errors.regionOption = null;
    });
    watch(selectedOnwayBranch, () => {
      errors.onwayBranch = null;
    });
    watch(selectedZone, () => {
      errors.regionZone = null;
    });
    watch(selectedOfficeBranch, () => {
      errors.officeBranch = null;
    });
    watch(() => form.address, () => {
      errors.address = null;
    });
    watch(selectedProvider, () => {
      errors.provider = null;
    });
    watch(() => form.agreement, () => {
      errors.agreement = null;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Select = script$7;
      const _component_Message = script$8;
      const _component_Textarea = script;
      const _component_Checkbox = script$9;
      const _component_Dialog = script$a;
      const _directive_tooltip = Tooltip;
      let _temp0, _temp1, _temp2, _temp3, _temp4, _temp5, _temp6;
      _push(`<!--[--><div class="min-h-screen bg-gray-50"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12"><div class="mb-8">`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("cart.index"),
        class: "inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-700 transition-colors mb-4 cursor-pointer"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="pi pi-arrow-left text-xs"${_scopeId}></i> კალათაში დაბრუნება `);
          } else {
            return [
              createVNode("i", { class: "pi pi-arrow-left text-xs" }),
              createTextVNode(" კალათაში დაბრუნება ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<h1 class="text-2xl font-bold text-gray-900">შეკვეთის გაფორმება</h1><p class="text-gray-500 text-sm mt-1">${ssrInterpolate(items.value.length)} პროდუქტი</p></div><div class="grid grid-cols-1 lg:grid-cols-3 gap-6"><div class="lg:col-span-2 space-y-4"><div class="${ssrRenderClass([errors.deliveryType ? "border-red-300" : "border-gray-100", "bg-white rounded-2xl border shadow-sm p-6"])}"><h2 class="text-base font-bold text-gray-900 mb-4 flex items-center gap-2"><i class="pi pi-truck text-brand-500"></i> მიწოდების ტიპი <i${ssrRenderAttrs(_temp0 = mergeProps({ class: "pi pi-exclamation-circle text-sm text-red-500" }, ssrGetDirectiveProps(_ctx, _directive_tooltip, "სავალდებულო ველი", void 0, { top: true })))}>${"textContent" in _temp0 ? ssrInterpolate(_temp0.textContent) : _temp0.innerHTML ?? ""}</i></h2><div class="grid grid-cols-1 sm:grid-cols-3 gap-3"><!--[-->`);
      ssrRenderList(deliveryTypes, (type) => {
        _push(`<button class="${ssrRenderClass([selectedDelivery.value?.key === type.key ? "border-brand-500 bg-brand-50/50" : "border-gray-100 hover:border-gray-200 bg-white", "relative flex flex-col items-start gap-1 p-4 rounded-2xl border-2 cursor-pointer transition-all duration-150 text-left"])}"><div class="flex items-center justify-between w-full"><div class="block space-x-2"><span class="text-sm font-semibold text-gray-800">${ssrInterpolate(type.label)}</span>`);
        if (type.key === "office") {
          _push(`<span class="text-sm font-semibold text-green-600">(უფასო)</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="${ssrRenderClass([selectedDelivery.value?.key === type.key ? "border-brand-500" : "border-gray-300", "w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0"])}">`);
        if (selectedDelivery.value?.key === type.key) {
          _push(`<div class="w-2 h-2 rounded-full bg-brand-500"></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div></button>`);
      });
      _push(`<!--]--></div>`);
      if (errors.deliveryType) {
        _push(`<p class="mt-3 text-sm text-red-500 flex items-center gap-1.5"><i class="pi pi-exclamation-circle shrink-0"></i> ${ssrInterpolate(errors.deliveryType)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (selectedDelivery.value && selectedDelivery.value?.key !== "office") {
        _push(`<div class="${ssrRenderClass([errors.tbilisiZone || errors.regionOption || errors.onwayBranch || errors.regionZone || errors.address ? "border-red-300" : "border-gray-100", "bg-white rounded-2xl border shadow-sm p-6"])}"><h2 class="text-base font-bold text-gray-900 mb-4 flex items-center gap-2"><i class="pi pi-map-marker text-brand-500"></i> მიწოდების მისამართი <i${ssrRenderAttrs(_temp1 = mergeProps({ class: "pi pi-exclamation-circle text-sm text-red-500" }, ssrGetDirectiveProps(_ctx, _directive_tooltip, "სავალდებულო ველი", void 0, { top: true })))}>${"textContent" in _temp1 ? ssrInterpolate(_temp1.textContent) : _temp1.innerHTML ?? ""}</i></h2>`);
        if (selectedDelivery.value?.key === "regions") {
          _push(`<div class="my-6 space-y-3"><div class="grid grid-cols-1 sm:grid-cols-2 gap-3"><!--[-->`);
          ssrRenderList(regionOptions, (option2) => {
            _push(`<button class="${ssrRenderClass([selectedRegionOption.value === option2.key ? "border-brand-500 bg-brand-50/50" : "border-gray-100 hover:border-gray-200 bg-white", "flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition-all duration-150 text-left"])}"><span class="flex items-center gap-2 text-sm font-semibold text-gray-800"><i class="${ssrRenderClass([option2.icon, "text-brand-500"])}"></i> ${ssrInterpolate(option2.label)}</span><div class="${ssrRenderClass([selectedRegionOption.value === option2.key ? "border-brand-500" : "border-gray-300", "w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0"])}">`);
            if (selectedRegionOption.value === option2.key) {
              _push(`<div class="w-2 h-2 rounded-full bg-brand-500"></div>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</div></button>`);
          });
          _push(`<!--]--></div>`);
          if (errors.regionOption) {
            _push(`<p class="mt-1 text-sm text-red-500 flex items-center gap-1.5"><i class="pi pi-exclamation-circle shrink-0"></i> ${ssrInterpolate(errors.regionOption)}</p>`);
          } else {
            _push(`<!---->`);
          }
          if (selectedRegionOption.value === "onway_office") {
            _push(`<div><label for="select-branch" class="flex items-center-safe font-bold text-gray-700 text-sm mb-2 mt-5"> აირჩიეთ OnWay-ის ფილიალი <i${ssrRenderAttrs(_temp2 = mergeProps({ class: "pi pi-exclamation-circle text-sm ml-1 text-red-500" }, ssrGetDirectiveProps(_ctx, _directive_tooltip, "სავალდებულო ველი", void 0, { top: true })))}>${"textContent" in _temp2 ? ssrInterpolate(_temp2.textContent) : _temp2.innerHTML ?? ""}</i></label>`);
            _push(ssrRenderComponent(_component_Select, {
              modelValue: selectedOnwayBranch.value,
              "onUpdate:modelValue": ($event) => selectedOnwayBranch.value = $event,
              inputId: "select-branch",
              options: onwayBranches,
              placeholder: "არჩევა",
              class: "w-full"
            }, null, _parent));
            if (errors.onwayBranch) {
              _push(`<p class="mt-1.5 text-sm text-red-500 flex items-center gap-1.5"><i class="pi pi-exclamation-circle shrink-0"></i> ${ssrInterpolate(errors.onwayBranch)}</p>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</div>`);
          } else {
            _push(`<!---->`);
          }
          if (selectedRegionOption.value === "address") {
            _push(`<div><label for="select-region" class="font-bold text-gray-700 text-sm mb-2 mt-5 block"> აირჩიეთ ქალაქი/რაიონიო/სოფელი <i${ssrRenderAttrs(_temp3 = mergeProps({ class: "pi pi-exclamation-circle text-sm ml-1 text-red-500" }, ssrGetDirectiveProps(_ctx, _directive_tooltip, "სავალდებულო ველი", void 0, { top: true })))}>${"textContent" in _temp3 ? ssrInterpolate(_temp3.textContent) : _temp3.innerHTML ?? ""}</i></label><div class="relative"><i class="pi pi-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10 pointer-events-none text-sm"></i>`);
            _push(ssrRenderComponent(unref(script$2), {
              modelValue: selectedZone.value,
              "onUpdate:modelValue": ($event) => selectedZone.value = $event,
              inputId: "select-region",
              suggestions: zoneSuggestions.value,
              "option-label": "name",
              dropdown: "",
              placeholder: "ძებნა...",
              loading: zonesLoading.value,
              "force-selection": "",
              class: "w-full rounded-l-xl",
              "input-class": "w-full rounded-l-xl",
              onComplete: filterZones,
              emptySearchMessage: "ვერ მოიძებნა",
              pt: { pcInputText: { root: { class: "pl-8" } }, dropdown: { class: "rounded-r-xl" } }
            }, null, _parent));
            _push(`</div>`);
            if (errors.regionZone) {
              _push(`<p class="mt-1.5 text-sm text-red-500 flex items-center gap-1.5"><i class="pi pi-exclamation-circle shrink-0"></i> ${ssrInterpolate(errors.regionZone)}</p>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        if (selectedDelivery.value?.key === "tbilisi") {
          _push(`<div class="mb-6"><label class="font-bold text-gray-700 text-sm mb-2 block"> აირჩიეთ ზონა <i${ssrRenderAttrs(_temp4 = mergeProps({ class: "pi pi-exclamation-circle text-sm ml-1 text-red-500" }, ssrGetDirectiveProps(_ctx, _directive_tooltip, "სავალდებულო ველი", void 0, { top: true })))}>${"textContent" in _temp4 ? ssrInterpolate(_temp4.textContent) : _temp4.innerHTML ?? ""}</i></label>`);
          _push(ssrRenderComponent(_component_Select, {
            modelValue: selectedTbilisiZone.value,
            "onUpdate:modelValue": ($event) => selectedTbilisiZone.value = $event,
            options: tbilisiZoneOptions,
            optionGroupLabel: "label",
            optionGroupChildren: "items",
            optionLabel: "name",
            placeholder: "აირჩიეთ ზონა",
            class: "w-full",
            filter: "",
            showClear: "",
            filterPlaceholder: "ძებნა..."
          }, {
            optiongroup: withCtx(({ option: option2 }, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<div class="flex items-center justify-between py-1"${_scopeId}><span class="font-semibold text-gray-800 text-sm"${_scopeId}>${ssrInterpolate(option2.label)}</span>`);
                if (subtotal.value >= TBILISI_FREE_THRESHOLD) {
                  _push2(`<span class="text-xs text-emerald-600 font-medium"${_scopeId}>უფასო</span>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div>`);
              } else {
                return [
                  createVNode("div", { class: "flex items-center justify-between py-1" }, [
                    createVNode("span", { class: "font-semibold text-gray-800 text-sm" }, toDisplayString(option2.label), 1),
                    subtotal.value >= TBILISI_FREE_THRESHOLD ? (openBlock(), createBlock("span", {
                      key: 0,
                      class: "text-xs text-emerald-600 font-medium"
                    }, "უფასო")) : createCommentVNode("", true)
                  ])
                ];
              }
            }),
            _: 1
          }, _parent));
          if (subtotal.value >= TBILISI_FREE_THRESHOLD) {
            _push(`<p class="mt-1.5 text-xs text-emerald-600 flex items-center gap-1"><i class="pi pi-check-circle text-sm"></i> შეკვეთა 500 ₾-ზე მეტია — თბილისში მიწოდება უფასოა </p>`);
          } else {
            _push(`<!---->`);
          }
          if (errors.tbilisiZone) {
            _push(`<p class="mt-1.5 text-sm text-red-500 flex items-center gap-1.5"><i class="pi pi-exclamation-circle shrink-0"></i> ${ssrInterpolate(errors.tbilisiZone)}</p>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        if (showAddressField.value) {
          _push(`<div class="space-y-4"><div>`);
          _push(ssrRenderComponent(PlacesAutocomplete, {
            modelValue: form.address,
            "onUpdate:modelValue": ($event) => form.address = $event
          }, null, _parent));
          if (errors.address) {
            _push(`<p class="mt-1.5 text-sm text-red-500 flex items-center gap-1.5"><i class="pi pi-exclamation-circle shrink-0"></i> ${ssrInterpolate(errors.address)}</p>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
          _push(ssrRenderComponent(_sfc_main$2, {
            modelValue: form.apartment_number,
            "onUpdate:modelValue": ($event) => form.apartment_number = $event,
            placeholder: "ქუჩის ნომერი (არასავალდებულო)",
            class: "py-2.5!"
          }, null, _parent));
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (selectedDelivery.value?.key === "office") {
        _push(`<div class="${ssrRenderClass([errors.officeBranch ? "border-red-300" : "border-gray-100", "bg-white rounded-2xl border shadow-sm p-6"])}"><h2 class="text-base font-bold text-gray-900 mb-4 flex items-center gap-2"><i class="pi pi-building text-brand-500"></i> გატანის წერტილი <i${ssrRenderAttrs(_temp5 = mergeProps({ class: "pi pi-exclamation-circle text-sm text-red-500" }, ssrGetDirectiveProps(_ctx, _directive_tooltip, "სავალდებულო ველი", void 0, { top: true })))}>${"textContent" in _temp5 ? ssrInterpolate(_temp5.textContent) : _temp5.innerHTML ?? ""}</i></h2><div class="grid grid-cols-1 sm:grid-cols-2 gap-3"><!--[-->`);
        ssrRenderList(officeBranches, (branch) => {
          _push(`<button type="button" class="${ssrRenderClass([selectedOfficeBranch.value === branch.key ? "border-brand-500 bg-brand-50/50" : "border-gray-100 hover:border-gray-200 bg-white", "flex flex-col items-start gap-1.5 p-4 rounded-2xl border-2 cursor-pointer transition-all duration-150 text-left"])}"><div class="flex items-center justify-between w-full"><span class="flex items-center gap-2 text-sm font-semibold text-gray-800"><i class="pi pi-map-marker text-brand-500"></i> ${ssrInterpolate(branch.label)}</span><div class="${ssrRenderClass([selectedOfficeBranch.value === branch.key ? "border-brand-500" : "border-gray-300", "w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0"])}">`);
          if (selectedOfficeBranch.value === branch.key) {
            _push(`<div class="w-2 h-2 rounded-full bg-brand-500"></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div>`);
          if (branch.address) {
            _push(`<p class="text-xs text-gray-500">${ssrInterpolate(branch.address)}</p>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<a${ssrRenderAttr("href", branch.mapUrl)} target="_blank" class="text-xs text-brand-500 underline"> დააჭირეთ ლინკზე მისამართის სანახავად </a></button>`);
        });
        _push(`<!--]--></div>`);
        if (errors.officeBranch) {
          _push(`<p class="mt-3 text-sm text-red-500 flex items-center gap-1.5"><i class="pi pi-exclamation-circle shrink-0"></i> ${ssrInterpolate(errors.officeBranch)}</p>`);
        } else {
          _push(`<!---->`);
        }
        if (officeInventoryChecking.value) {
          _push(`<div class="mt-4 flex items-center gap-2 text-sm text-gray-400 bg-gray-50 px-3 py-3 rounded-xl"><i class="pi pi-spinner pi-spin"></i> მიმდინარეობს მარაგის შემოწმება არჩეულ ფილიალში... </div>`);
        } else if (hasOfficeInventoryIssue.value) {
          _push(ssrRenderComponent(_component_Message, {
            severity: "error",
            icon: "pi pi-exclamation-circle",
            closable: false,
            class: "mt-4"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` პროდუქტის არასაკმარისი რაოდენობა არჩეულ ფილიალში `);
              } else {
                return [
                  createTextVNode(" პროდუქტის არასაკმარისი რაოდენობა არჩეულ ფილიალში ")
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6"><h2 class="text-base font-bold text-gray-900 mb-4 flex items-center gap-2"><i class="pi pi-comment text-brand-500"></i> კომენტარი </h2>`);
      _push(ssrRenderComponent(_component_Textarea, {
        modelValue: form.comment,
        "onUpdate:modelValue": ($event) => form.comment = $event,
        placeholder: "სპეციალური მოთხოვნები, შენიშვნები...",
        rows: "3",
        class: "w-full rounded-xl resize-none"
      }, null, _parent));
      _push(`</div><div class="${ssrRenderClass([errors.provider ? "border-red-300" : "border-gray-100", "bg-white rounded-2xl border shadow-sm p-6"])}"><h2 class="text-base font-bold text-gray-900 mb-4 flex items-center gap-2"><i class="pi pi-credit-card text-brand-500"></i> გადახდის მეთოდი <i${ssrRenderAttrs(_temp6 = mergeProps({ class: "pi pi-exclamation-circle text-sm text-red-500" }, ssrGetDirectiveProps(_ctx, _directive_tooltip, "სავალდებულო ველი", void 0, { top: true })))}>${"textContent" in _temp6 ? ssrInterpolate(_temp6.textContent) : _temp6.innerHTML ?? ""}</i></h2><div class="grid grid-cols-1 sm:grid-cols-3 gap-3"><!--[-->`);
      ssrRenderList(providers, (provider) => {
        _push(`<button class="${ssrRenderClass([selectedProvider.value?.code === provider.code ? "border-brand-500 bg-brand-50/50" : "border-gray-100 hover:border-gray-200 bg-white", "flex items-center gap-3 p-4 rounded-2xl border-2 cursor-pointer transition-all duration-150 text-left"])}">`);
        if (provider.code !== "limit") {
          _push(`<img${ssrRenderAttr("src", provider.icon)}${ssrRenderAttr("alt", provider.name)} class="w-8 h-8 object-contain rounded-lg shrink-0">`);
        } else {
          _push(`<i class="pi pi-credit-card text-2xl"></i>`);
        }
        _push(`<span class="text-sm font-semibold text-gray-800">${ssrInterpolate(provider.name)}</span><div class="ml-auto"><div class="${ssrRenderClass([selectedProvider.value?.code === provider.code ? "border-brand-500" : "border-gray-300", "w-4 h-4 rounded-full border-2 flex items-center justify-center"])}">`);
        if (selectedProvider.value?.code === provider.code) {
          _push(`<div class="w-2 h-2 rounded-full bg-brand-500"></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div></button>`);
      });
      _push(`<!--]--></div>`);
      if (errors.provider) {
        _push(`<p class="mt-3 text-sm text-red-500 flex items-center gap-1.5"><i class="pi pi-exclamation-circle shrink-0"></i> ${ssrInterpolate(errors.provider)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="mt-4 flex items-center gap-3"><img src="/payments/payment-cards.jpeg" class="h-6 object-contain rounded" alt="payment cards"><span class="text-xs text-gray-400">Visa, Mastercard</span></div>`);
      if (selectedProvider.value?.code === "limit") {
        _push(`<div class="mt-4">`);
        if (creditLoading.value) {
          _push(`<div class="flex items-center gap-2 text-sm text-gray-400 bg-gray-50 px-3 py-3 rounded-xl"><i class="pi pi-spinner pi-spin"></i> მიმდინარეობს ლიმიტის შემოწმება... </div>`);
        } else if (creditInfo.value) {
          _push(`<!--[-->`);
          if (!creditInfo.value.has_credit) {
            _push(`<div class="flex items-start gap-2 text-xs text-red-600 bg-red-50 px-3 py-3 rounded-xl"><i class="pi pi-times-circle mt-0.5 shrink-0"></i><span>თქვენ არ გაქვთ განსაზღვრული ლიმიტი. დაინტერესების შემთხვევაში დაგვიკავშირდით.</span></div>`);
          } else {
            _push(`<div class="rounded-xl border border-gray-100 divide-y divide-gray-100 overflow-hidden text-xs">`);
            if (!canPayWithLimit.value) {
              _push(`<div class="flex items-center gap-1.5 px-3 py-2 bg-red-50 text-red-500"><i class="pi pi-info-circle shrink-0"></i><span>არასაკმარისი ლიმიტი!</span></div>`);
            } else {
              _push(`<!---->`);
            }
            _push(`<div class="flex items-center justify-between px-3 py-2 bg-gray-50"><span class="flex items-center gap-1.5 text-gray-500"><i class="fa-solid fa-hourglass-start text-lg"></i> ლიმიტი </span><strong class="text-gray-700">${ssrInterpolate(formatted(creditInfo.value.limit))} ₾</strong></div><div class="flex items-center justify-between px-3 py-2 bg-white"><span class="flex items-center gap-1.5 text-orange-500"><i class="fa-solid fa-hourglass-end text-lg"></i> გამოყენებული </span><strong class="text-orange-600">${ssrInterpolate(formatted(creditInfo.value.used))} ₾</strong></div><div class="bg-emerald-50 flex items-center justify-between px-3 py-2"><span class="text-emerald-600 flex items-center gap-1.5"><i class="fa-solid fa-hourglass-half text-lg"></i> ხელმისაწვდომი </span><strong class="text-emerald-700">${ssrInterpolate(formatted(creditInfo.value.available))} ₾</strong></div>`);
            if (!canPayWithLimit.value) {
              _push(`<div class="bg-amber-50 flex items-center justify-between px-3 py-2"><span class="text-amber-600 flex items-center gap-1.5"><i class="pi pi-wallet"></i> გადასახდელი თანხა </span><strong class="text-amber-700">${ssrInterpolate(formatted(total.value))} ₾</strong></div>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</div>`);
          }
          _push(`<!--]-->`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="lg:col-span-1"><div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sticky top-28"><h2 class="text-base font-bold text-gray-900 mb-5">შეკვეთის შეჯამება</h2><div class="space-y-3 mb-5 h-36 border border-gray-100 rounded-xl p-2 overflow-y-auto"><!--[-->`);
      ssrRenderList(items.value, (cartItem) => {
        _push(`<div class="flex items-center gap-3"><div class="w-10 h-10 rounded-lg overflow-hidden bg-gray-50 shrink-0">`);
        if (cartItem.item.images?.length) {
          _push(`<img${ssrRenderAttr("src", `${cartItem.item.storage_path}/${cartItem.item.images[0]}`)}${ssrRenderAttr("alt", cartItem.item.name)} class="w-full h-full object-cover">`);
        } else {
          _push(`<div class="w-full h-full flex items-center justify-center"><i class="pi pi-image text-gray-300 text-xs"></i></div>`);
        }
        _push(`</div><div class="flex-1 min-w-0"><p${ssrRenderAttrs(mergeProps({ class: "text-xs text-gray-700 font-medium line-clamp-1" }, ssrGetDirectiveProps(_ctx, _directive_tooltip, cartItem.item.name, void 0, { top: true })))}>${ssrInterpolate(cartItem.item.name)}</p><p class="text-xs text-gray-400 mt-0.5">${ssrInterpolate(cartItem.qty)} × ${ssrInterpolate(formatted(checkoutDisplayPrice(cartItem)))} ₾ `);
        if (checkoutStrikePrice(cartItem)) {
          _push(`<span class="line-through text-red-500 mr-1">${ssrInterpolate(formatted(checkoutStrikePrice(cartItem)))} ₾</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</p></div><span class="text-sm font-semibold text-gray-800 shrink-0">${ssrInterpolate(formatted(cartItem.rowTotal))} ₾</span><button${ssrRenderAttrs(mergeProps({
          type: "button",
          class: "text-gray-300 hover:text-red-500 transition-colors shrink-0 cursor-pointer"
        }, ssrGetDirectiveProps(_ctx, _directive_tooltip, "წაშლა", void 0, { top: true })))}><i class="pi pi-times text-xs"></i></button></div>`);
      });
      _push(`<!--]--></div><div class="h-px bg-gray-100 mb-4"></div><div class="space-y-2.5 text-sm mb-5"><div class="flex justify-between text-gray-500"><span>${ssrInterpolate(items.value.length)} პროდუქტი</span><span class="font-medium text-gray-700">`);
      if (totalSavings.value > 0) {
        _push(`<span class="line-through text-red-500 mr-1">${ssrInterpolate(formatted(subtotal.value + totalSavings.value))} ₾</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<span>${ssrInterpolate(formatted(subtotal.value))} ₾</span></span></div>`);
      if (totalSavings.value > 0) {
        _push(`<div class="flex justify-between text-emerald-600"><span class="flex items-center gap-1"><i class="pi pi-tag text-xs"></i> ჯამური დანაზოგი </span><span class="font-medium">-${ssrInterpolate(formatted(totalSavings.value))} ₾</span></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="flex justify-between text-gray-500"><span>მიწოდება </span><span class="${ssrRenderClass(deliveryCost.value === 0 ? "text-emerald-600 font-medium" : "font-medium text-gray-700")}">`);
      if (deliveryCost.value === null) {
        _push(`<!--[-->—<!--]-->`);
      } else if (deliveryCost.value === 0) {
        _push(`<!--[-->უფასო<!--]-->`);
      } else {
        _push(`<!--[-->${ssrInterpolate(formatted(deliveryCost.value))} ₾<!--]-->`);
      }
      _push(`</span></div></div><div class="h-px bg-gray-100 mb-4"></div><div class="flex justify-between items-center mb-6"><span class="font-bold text-gray-900">სულ</span><span class="text-xl font-bold text-brand-500">${ssrInterpolate(formatted(total.value))} ₾</span></div><div class="${ssrRenderClass([errors.agreement ? "border-red-300 bg-red-50/40" : "border-transparent", "px-1 space-y-1.5 rounded-2xl p-3 mb-3 border transition-colors"])}"><div class="flex items-start gap-3">`);
      _push(ssrRenderComponent(_component_Checkbox, {
        modelValue: form.agreement,
        "onUpdate:modelValue": ($event) => form.agreement = $event,
        inputId: "agreement",
        binary: "",
        class: "mt-0.5 cursor-pointer"
      }, null, _parent));
      _push(`<label for="agreement" class="text-sm text-gray-600 cursor-pointer leading-relaxed"> ვეთანხმები <a${ssrRenderAttr("href", _ctx.route("terms-of-service"))} target="_blank" class="text-brand-500 hover:underline">წესებსა და პირობებს</a></label></div>`);
      if (errors.agreement) {
        _push(`<p class="text-sm text-red-500 flex items-center gap-1.5 pl-7"><i class="pi pi-exclamation-circle shrink-0"></i> ${ssrInterpolate(errors.agreement)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><button${ssrIncludeBooleanAttr(payButtonDisabled.value) ? " disabled" : ""} class="${ssrRenderClass([payButtonDisabled.value ? "bg-brand-400 text-white" : "bg-brand-500 hover:bg-brand-400 text-white", "w-full py-3.5 rounded-2xl font-semibold text-sm transition-all shadow-md cursor-pointer active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"])}"><i class="${ssrRenderClass(loading.value ? "pi pi-spinner pi-spin mr-2" : "pi pi-lock mr-2")}"></i> ${ssrInterpolate(loading.value ? "მიმდინარეობს..." : "გადახდა — " + formatted(total.value) + " ₾")}</button><div class="mt-3 flex items-center justify-center gap-2 text-xs text-gray-400"><i class="pi pi-shield text-xs"></i> უსაფრთხო გადახდა SSL დაშიფვრით </div></div></div></div></div></div>`);
      _push(ssrRenderComponent(_component_Dialog, {
        visible: showOfficeInventoryDialog.value,
        "onUpdate:visible": ($event) => showOfficeInventoryDialog.value = $event,
        modal: "",
        header: "არასაკმარისი მარაგი არჩეულ ფილიალში",
        class: "w-[95%] lg:w-[35%]"
      }, {
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<button type="button" class="w-full py-2.5 rounded-xl bg-brand-500 hover:bg-brand-400 text-white text-sm font-semibold cursor-pointer"${_scopeId}> გასაგებია </button>`);
          } else {
            return [
              createVNode("button", {
                type: "button",
                onClick: ($event) => showOfficeInventoryDialog.value = false,
                class: "w-full py-2.5 rounded-xl bg-brand-500 hover:bg-brand-400 text-white text-sm font-semibold cursor-pointer"
              }, " გასაგებია ", 8, ["onClick"])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<p class="text-sm text-gray-600 mb-4"${_scopeId}> შემდეგი პროდუცქიის მარაგი არჩეულ ფილიალში საკმარისი არ არის. გთხოვთ შეცვალოთ ფილიალი ან რაოდენობა: </p><ul class="space-y-2"${_scopeId}><!--[-->`);
            ssrRenderList(officeInventoryShortages.value, (shortage) => {
              _push2(`<li class="flex items-center justify-between gap-3 text-sm bg-red-50 rounded-xl px-3 py-2"${_scopeId}><span class="font-medium text-gray-800"${_scopeId}>${ssrInterpolate(shortage.name)}</span><span class="text-red-600 text-right shrink-0"${_scopeId}>მარაგშია: ${ssrInterpolate(shortage.available)} / სასურველი: ${ssrInterpolate(shortage.requested)}</span></li>`);
            });
            _push2(`<!--]--></ul>`);
          } else {
            return [
              createVNode("p", { class: "text-sm text-gray-600 mb-4" }, " შემდეგი პროდუცქიის მარაგი არჩეულ ფილიალში საკმარისი არ არის. გთხოვთ შეცვალოთ ფილიალი ან რაოდენობა: "),
              createVNode("ul", { class: "space-y-2" }, [
                (openBlock(true), createBlock(Fragment, null, renderList(officeInventoryShortages.value, (shortage) => {
                  return openBlock(), createBlock("li", {
                    key: shortage.no,
                    class: "flex items-center justify-between gap-3 text-sm bg-red-50 rounded-xl px-3 py-2"
                  }, [
                    createVNode("span", { class: "font-medium text-gray-800" }, toDisplayString(shortage.name), 1),
                    createVNode("span", { class: "text-red-600 text-right shrink-0" }, "მარაგშია: " + toDisplayString(shortage.available) + " / სასურველი: " + toDisplayString(shortage.requested), 1)
                  ]);
                }), 128))
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Checkout/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=Index-tmmIWZAI.js.map
