import { cn } from "@primeuix/utils";
import { isNotEmpty, equals, resolveFieldData } from "@primeuix/utils/object";
import { R as Ripple } from "./index-YvTnrAwi.js";
import BaseEditableHolder from "@primevue/core/baseeditableholder";
import { style } from "@primeuix/styles/togglebutton";
import BaseStyle from "@primevue/core/base/style";
import { resolveDirective, withDirectives, openBlock, createElementBlock, mergeProps, createElementVNode, renderSlot, normalizeClass, createCommentVNode, toDisplayString, resolveComponent, Fragment, renderList, createBlock, createSlots, withCtx } from "vue";
import { style as style$1 } from "@primeuix/styles/selectbutton";
var classes$1 = {
  root: function root(_ref) {
    var instance = _ref.instance, props = _ref.props;
    return ["p-togglebutton p-component", {
      "p-togglebutton-checked": instance.active,
      "p-invalid": instance.$invalid,
      "p-togglebutton-fluid": props.fluid,
      "p-togglebutton-sm p-inputfield-sm": props.size === "small",
      "p-togglebutton-lg p-inputfield-lg": props.size === "large"
    }];
  },
  content: "p-togglebutton-content",
  icon: "p-togglebutton-icon",
  label: "p-togglebutton-label"
};
var ToggleButtonStyle = BaseStyle.extend({
  name: "togglebutton",
  style,
  classes: classes$1
});
var script$1$1 = {
  name: "BaseToggleButton",
  "extends": BaseEditableHolder,
  props: {
    onIcon: String,
    offIcon: String,
    onLabel: {
      type: String,
      "default": "Yes"
    },
    offLabel: {
      type: String,
      "default": "No"
    },
    readonly: {
      type: Boolean,
      "default": false
    },
    tabindex: {
      type: Number,
      "default": null
    },
    ariaLabelledby: {
      type: String,
      "default": null
    },
    ariaLabel: {
      type: String,
      "default": null
    },
    size: {
      type: String,
      "default": null
    },
    fluid: {
      type: Boolean,
      "default": null
    }
  },
  style: ToggleButtonStyle,
  provide: function provide() {
    return {
      $pcToggleButton: this,
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
var script$2 = {
  name: "ToggleButton",
  "extends": script$1$1,
  inheritAttrs: false,
  emits: ["change"],
  methods: {
    getPTOptions: function getPTOptions(key) {
      var _ptm = key === "root" ? this.ptmi : this.ptm;
      return _ptm(key, {
        context: {
          active: this.active,
          disabled: this.disabled
        }
      });
    },
    onChange: function onChange(event) {
      if (!this.disabled && !this.readonly) {
        this.writeValue(!this.d_value, event);
        this.$emit("change", event);
      }
    },
    onBlur: function onBlur(event) {
      var _this$formField$onBlu, _this$formField;
      (_this$formField$onBlu = (_this$formField = this.formField).onBlur) === null || _this$formField$onBlu === void 0 || _this$formField$onBlu.call(_this$formField, event);
    }
  },
  computed: {
    active: function active() {
      return this.d_value === true;
    },
    hasLabel: function hasLabel() {
      return isNotEmpty(this.onLabel) && isNotEmpty(this.offLabel);
    },
    label: function label() {
      return this.hasLabel ? this.d_value ? this.onLabel : this.offLabel : " ";
    },
    dataP: function dataP() {
      return cn(_defineProperty({
        checked: this.active,
        invalid: this.$invalid
      }, this.size, this.size));
    }
  },
  directives: {
    ripple: Ripple
  }
};
var _hoisted_1$1 = ["tabindex", "disabled", "aria-pressed", "aria-label", "aria-labelledby", "data-p-checked", "data-p-disabled", "data-p"];
var _hoisted_2 = ["data-p"];
function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  var _directive_ripple = resolveDirective("ripple");
  return withDirectives((openBlock(), createElementBlock("button", mergeProps({
    type: "button",
    "class": _ctx.cx("root"),
    tabindex: _ctx.tabindex,
    disabled: _ctx.disabled,
    "aria-pressed": _ctx.d_value,
    onClick: _cache[0] || (_cache[0] = function() {
      return $options.onChange && $options.onChange.apply($options, arguments);
    }),
    onBlur: _cache[1] || (_cache[1] = function() {
      return $options.onBlur && $options.onBlur.apply($options, arguments);
    })
  }, $options.getPTOptions("root"), {
    "aria-label": _ctx.ariaLabel,
    "aria-labelledby": _ctx.ariaLabelledby,
    "data-p-checked": $options.active,
    "data-p-disabled": _ctx.disabled,
    "data-p": $options.dataP
  }), [createElementVNode("span", mergeProps({
    "class": _ctx.cx("content")
  }, $options.getPTOptions("content"), {
    "data-p": $options.dataP
  }), [renderSlot(_ctx.$slots, "default", {}, function() {
    return [renderSlot(_ctx.$slots, "icon", {
      value: _ctx.d_value,
      "class": normalizeClass(_ctx.cx("icon"))
    }, function() {
      return [_ctx.onIcon || _ctx.offIcon ? (openBlock(), createElementBlock("span", mergeProps({
        key: 0,
        "class": [_ctx.cx("icon"), _ctx.d_value ? _ctx.onIcon : _ctx.offIcon]
      }, $options.getPTOptions("icon")), null, 16)) : createCommentVNode("", true)];
    }), createElementVNode("span", mergeProps({
      "class": _ctx.cx("label")
    }, $options.getPTOptions("label")), toDisplayString($options.label), 17)];
  })], 16, _hoisted_2)], 16, _hoisted_1$1)), [[_directive_ripple]]);
}
script$2.render = render$1;
var classes = {
  root: function root2(_ref) {
    var props = _ref.props, instance = _ref.instance;
    return ["p-selectbutton p-component", {
      "p-invalid": instance.$invalid,
      // @todo: check
      "p-selectbutton-fluid": props.fluid
    }];
  }
};
var SelectButtonStyle = BaseStyle.extend({
  name: "selectbutton",
  style: style$1,
  classes
});
var script$1 = {
  name: "BaseSelectButton",
  "extends": BaseEditableHolder,
  props: {
    options: Array,
    optionLabel: null,
    optionValue: null,
    optionDisabled: null,
    multiple: Boolean,
    allowEmpty: {
      type: Boolean,
      "default": true
    },
    dataKey: null,
    ariaLabelledby: {
      type: String,
      "default": null
    },
    size: {
      type: String,
      "default": null
    },
    fluid: {
      type: Boolean,
      "default": null
    }
  },
  style: SelectButtonStyle,
  provide: function provide2() {
    return {
      $pcSelectButton: this,
      $parentInstance: this
    };
  }
};
function _createForOfIteratorHelper(r, e) {
  var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (!t) {
    if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e) {
      t && (r = t);
      var _n = 0, F = function F2() {
      };
      return { s: F, n: function n() {
        return _n >= r.length ? { done: true } : { done: false, value: r[_n++] };
      }, e: function e2(r2) {
        throw r2;
      }, f: F };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var o, a = true, u = false;
  return { s: function s() {
    t = t.call(r);
  }, n: function n() {
    var r2 = t.next();
    return a = r2.done, r2;
  }, e: function e2(r2) {
    u = true, o = r2;
  }, f: function f() {
    try {
      a || null == t["return"] || t["return"]();
    } finally {
      if (u) throw o;
    }
  } };
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
var script = {
  name: "SelectButton",
  "extends": script$1,
  inheritAttrs: false,
  emits: ["change"],
  methods: {
    getOptionLabel: function getOptionLabel(option) {
      return this.optionLabel ? resolveFieldData(option, this.optionLabel) : option;
    },
    getOptionValue: function getOptionValue(option) {
      return this.optionValue ? resolveFieldData(option, this.optionValue) : option;
    },
    getOptionRenderKey: function getOptionRenderKey(option) {
      return this.dataKey ? resolveFieldData(option, this.dataKey) : this.getOptionLabel(option);
    },
    isOptionDisabled: function isOptionDisabled(option) {
      return this.optionDisabled ? resolveFieldData(option, this.optionDisabled) : false;
    },
    isOptionReadonly: function isOptionReadonly(option) {
      if (this.allowEmpty) return false;
      var selected = this.isSelected(option);
      if (this.multiple) {
        return selected && this.d_value.length === 1;
      } else {
        return selected;
      }
    },
    onOptionSelect: function onOptionSelect(event, option, index) {
      var _this = this;
      if (this.disabled || this.isOptionDisabled(option) || this.isOptionReadonly(option)) {
        return;
      }
      var selected = this.isSelected(option);
      var optionValue = this.getOptionValue(option);
      var newValue;
      if (this.multiple) {
        if (selected) {
          newValue = this.d_value.filter(function(val) {
            return !equals(val, optionValue, _this.equalityKey);
          });
          if (!this.allowEmpty && newValue.length === 0) return;
        } else {
          newValue = this.d_value ? [].concat(_toConsumableArray(this.d_value), [optionValue]) : [optionValue];
        }
      } else {
        if (selected && !this.allowEmpty) return;
        newValue = selected ? null : optionValue;
      }
      this.writeValue(newValue, event);
      this.$emit("change", {
        event,
        value: newValue
      });
    },
    isSelected: function isSelected(option) {
      var selected = false;
      var optionValue = this.getOptionValue(option);
      if (this.multiple) {
        if (this.d_value) {
          var _iterator = _createForOfIteratorHelper(this.d_value), _step;
          try {
            for (_iterator.s(); !(_step = _iterator.n()).done; ) {
              var val = _step.value;
              if (equals(val, optionValue, this.equalityKey)) {
                selected = true;
                break;
              }
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
        }
      } else {
        selected = equals(this.d_value, optionValue, this.equalityKey);
      }
      return selected;
    }
  },
  computed: {
    equalityKey: function equalityKey() {
      return this.optionValue ? null : this.dataKey;
    },
    dataP: function dataP2() {
      return cn({
        invalid: this.$invalid
      });
    }
  },
  directives: {
    ripple: Ripple
  },
  components: {
    ToggleButton: script$2
  }
};
var _hoisted_1 = ["aria-labelledby", "data-p"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_ToggleButton = resolveComponent("ToggleButton");
  return openBlock(), createElementBlock("div", mergeProps({
    "class": _ctx.cx("root"),
    role: "group",
    "aria-labelledby": _ctx.ariaLabelledby
  }, _ctx.ptmi("root"), {
    "data-p": $options.dataP
  }), [(openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.options, function(option, index) {
    return openBlock(), createBlock(_component_ToggleButton, {
      key: $options.getOptionRenderKey(option),
      modelValue: $options.isSelected(option),
      onLabel: $options.getOptionLabel(option),
      offLabel: $options.getOptionLabel(option),
      disabled: _ctx.disabled || $options.isOptionDisabled(option),
      unstyled: _ctx.unstyled,
      size: _ctx.size,
      readonly: $options.isOptionReadonly(option),
      onChange: function onChange2($event) {
        return $options.onOptionSelect($event, option, index);
      },
      pt: _ctx.ptm("pcToggleButton")
    }, createSlots({
      _: 2
    }, [_ctx.$slots.option ? {
      name: "default",
      fn: withCtx(function() {
        return [renderSlot(_ctx.$slots, "option", {
          option,
          index
        }, function() {
          return [createElementVNode("span", mergeProps({
            ref_for: true
          }, _ctx.ptm("pcToggleButton")["label"]), toDisplayString($options.getOptionLabel(option)), 17)];
        })];
      }),
      key: "0"
    } : void 0]), 1032, ["modelValue", "onLabel", "offLabel", "disabled", "unstyled", "size", "readonly", "onChange", "pt"]);
  }), 128))], 16, _hoisted_1);
}
script.render = render;
export {
  script as s
};
//# sourceMappingURL=index-UirhM5w0.js.map
