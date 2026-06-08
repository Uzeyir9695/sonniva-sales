import BaseComponent from "@primevue/core/basecomponent";
import { style } from "@primeuix/styles/floatlabel";
import BaseStyle from "@primevue/core/base/style";
import { openBlock, createElementBlock, mergeProps, renderSlot } from "vue";
var classes = {
  root: function root(_ref) {
    var props = _ref.props;
    return ["p-floatlabel", {
      "p-floatlabel-over": props.variant === "over",
      "p-floatlabel-on": props.variant === "on",
      "p-floatlabel-in": props.variant === "in"
    }];
  }
};
var FloatLabelStyle = BaseStyle.extend({
  name: "floatlabel",
  style,
  classes
});
var script$1 = {
  name: "BaseFloatLabel",
  "extends": BaseComponent,
  props: {
    variant: {
      type: String,
      "default": "over"
    }
  },
  style: FloatLabelStyle,
  provide: function provide() {
    return {
      $pcFloatLabel: this,
      $parentInstance: this
    };
  }
};
var script = {
  name: "FloatLabel",
  "extends": script$1,
  inheritAttrs: false
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("span", mergeProps({
    "class": _ctx.cx("root")
  }, _ctx.ptmi("root")), [renderSlot(_ctx.$slots, "default")], 16);
}
script.render = render;
export {
  script as s
};
//# sourceMappingURL=index-1kO8dZCM.js.map
