import { cn } from "@primeuix/utils";
import BaseEditableHolder from "@primevue/core/baseeditableholder";
import { style } from "@primeuix/styles/toggleswitch";
import BaseStyle from "@primevue/core/base/style";
import { openBlock, createElementBlock, mergeProps, createElementVNode, renderSlot, ref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./StockNotifyDialog-BIX42gC9.js";
var inlineStyles = {
  root: {
    position: "relative"
  }
};
var classes = {
  root: function root(_ref) {
    var instance = _ref.instance, props = _ref.props;
    return ["p-toggleswitch p-component", {
      "p-toggleswitch-checked": instance.checked,
      "p-disabled": props.disabled,
      "p-invalid": instance.$invalid
    }];
  },
  input: "p-toggleswitch-input",
  slider: "p-toggleswitch-slider",
  handle: "p-toggleswitch-handle"
};
var ToggleSwitchStyle = BaseStyle.extend({
  name: "toggleswitch",
  style,
  classes,
  inlineStyles
});
var script$1 = {
  name: "BaseToggleSwitch",
  "extends": BaseEditableHolder,
  props: {
    trueValue: {
      type: null,
      "default": true
    },
    falseValue: {
      type: null,
      "default": false
    },
    readonly: {
      type: Boolean,
      "default": false
    },
    tabindex: {
      type: Number,
      "default": null
    },
    inputId: {
      type: String,
      "default": null
    },
    inputClass: {
      type: [String, Object],
      "default": null
    },
    inputStyle: {
      type: Object,
      "default": null
    },
    ariaLabelledby: {
      type: String,
      "default": null
    },
    ariaLabel: {
      type: String,
      "default": null
    }
  },
  style: ToggleSwitchStyle,
  provide: function provide() {
    return {
      $pcToggleSwitch: this,
      $parentInstance: this
    };
  }
};
var script = {
  name: "ToggleSwitch",
  "extends": script$1,
  inheritAttrs: false,
  emits: ["change", "focus", "blur"],
  methods: {
    getPTOptions: function getPTOptions(key) {
      var _ptm = key === "root" ? this.ptmi : this.ptm;
      return _ptm(key, {
        context: {
          checked: this.checked,
          disabled: this.disabled
        }
      });
    },
    onChange: function onChange(event) {
      if (!this.disabled && !this.readonly) {
        var newValue = this.checked ? this.falseValue : this.trueValue;
        this.writeValue(newValue, event);
        this.$emit("change", event);
      }
    },
    onFocus: function onFocus(event) {
      this.$emit("focus", event);
    },
    onBlur: function onBlur(event) {
      var _this$formField$onBlu, _this$formField;
      this.$emit("blur", event);
      (_this$formField$onBlu = (_this$formField = this.formField).onBlur) === null || _this$formField$onBlu === void 0 || _this$formField$onBlu.call(_this$formField, event);
    }
  },
  computed: {
    checked: function checked() {
      return this.d_value === this.trueValue;
    },
    dataP: function dataP() {
      return cn({
        checked: this.checked,
        disabled: this.disabled,
        invalid: this.$invalid
      });
    }
  }
};
var _hoisted_1 = ["data-p-checked", "data-p-disabled", "data-p"];
var _hoisted_2 = ["id", "checked", "tabindex", "disabled", "readonly", "aria-checked", "aria-labelledby", "aria-label", "aria-invalid"];
var _hoisted_3 = ["data-p"];
var _hoisted_4 = ["data-p"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", mergeProps({
    "class": _ctx.cx("root"),
    style: _ctx.sx("root")
  }, $options.getPTOptions("root"), {
    "data-p-checked": $options.checked,
    "data-p-disabled": _ctx.disabled,
    "data-p": $options.dataP
  }), [createElementVNode("input", mergeProps({
    id: _ctx.inputId,
    type: "checkbox",
    role: "switch",
    "class": [_ctx.cx("input"), _ctx.inputClass],
    style: _ctx.inputStyle,
    checked: $options.checked,
    tabindex: _ctx.tabindex,
    disabled: _ctx.disabled,
    readonly: _ctx.readonly,
    "aria-checked": $options.checked,
    "aria-labelledby": _ctx.ariaLabelledby,
    "aria-label": _ctx.ariaLabel,
    "aria-invalid": _ctx.invalid || void 0,
    onFocus: _cache[0] || (_cache[0] = function() {
      return $options.onFocus && $options.onFocus.apply($options, arguments);
    }),
    onBlur: _cache[1] || (_cache[1] = function() {
      return $options.onBlur && $options.onBlur.apply($options, arguments);
    }),
    onChange: _cache[2] || (_cache[2] = function() {
      return $options.onChange && $options.onChange.apply($options, arguments);
    })
  }, $options.getPTOptions("input")), null, 16, _hoisted_2), createElementVNode("div", mergeProps({
    "class": _ctx.cx("slider")
  }, $options.getPTOptions("slider"), {
    "data-p": $options.dataP
  }), [createElementVNode("div", mergeProps({
    "class": _ctx.cx("handle")
  }, $options.getPTOptions("handle"), {
    "data-p": $options.dataP
  }), [renderSlot(_ctx.$slots, "handle", {
    checked: $options.checked
  })], 16, _hoisted_4)], 16, _hoisted_3)], 16, _hoisted_1);
}
script.render = render;
const _sfc_main = {
  __name: "StockNotifyButton",
  __ssrInlineRender: true,
  props: {
    item: { type: Object, required: true },
    isSubscribed: { type: Boolean, default: false }
  },
  setup(__props) {
    const showDialog = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      if (!__props.isSubscribed) {
        _push(`<button class="w-full py-1.5 sm:py-2 rounded-2xl border-2 border-dashed border-slate-400 text-slate-700 text-sm font-bold hover:bg-slate-50 transition-colors cursor-pointer flex items-center justify-center gap-2"><i class="pi pi-bell font-bold"></i> შემატყობინეთ როცა შეივსება </button>`);
      } else {
        _push(`<div class="rounded-2xl bg-brand-100 border border-brand-300 px-4 py-3"><div class="flex items-center justify-between gap-3"><div class="flex items-center gap-2 text-brand-800 text-sm font-medium"><i class="pi pi-bell text-brand-600"></i> შეტყობინება ჩართულია </div><button class="text-xs text-brand-600 hover:text-red-500 transition-colors cursor-pointer shrink-0"> გაუქმება </button></div><p class="text-xs text-brand-700 mt-1.5"> მარაგი როგორც კი შეივსება, მიიღებთ შეტყობინებას SMS-ის სახით. </p></div>`);
      }
      _push(ssrRenderComponent(_sfc_main$1, {
        visible: showDialog.value,
        "onUpdate:visible": ($event) => showDialog.value = $event,
        item: __props.item
      }, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Shared/components/StockNotifyButton.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _,
  script as s
};
//# sourceMappingURL=StockNotifyButton-MzlfVtNR.js.map
