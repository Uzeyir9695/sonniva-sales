import BaseComponent from "@primevue/core/basecomponent";
import BaseStyle from "@primevue/core/base/style";
import { openBlock, createElementBlock, mergeProps, renderSlot } from "vue";
import { style } from "@primeuix/styles/inputgroup";
var classes$1 = {
  root: "p-inputgroupaddon"
};
var InputGroupAddonStyle = BaseStyle.extend({
  name: "inputgroupaddon",
  classes: classes$1
});
var script$1$1 = {
  name: "BaseInputGroupAddon",
  "extends": BaseComponent,
  style: InputGroupAddonStyle,
  provide: function provide() {
    return {
      $pcInputGroupAddon: this,
      $parentInstance: this
    };
  }
};
var script$2 = {
  name: "InputGroupAddon",
  "extends": script$1$1,
  inheritAttrs: false
};
function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", mergeProps({
    "class": _ctx.cx("root")
  }, _ctx.ptmi("root")), [renderSlot(_ctx.$slots, "default")], 16);
}
script$2.render = render$1;
var classes = {
  root: "p-inputgroup"
};
var InputGroupStyle = BaseStyle.extend({
  name: "inputgroup",
  style,
  classes
});
var script$1 = {
  name: "BaseInputGroup",
  "extends": BaseComponent,
  style: InputGroupStyle,
  provide: function provide2() {
    return {
      $pcInputGroup: this,
      $parentInstance: this
    };
  }
};
var script = {
  name: "InputGroup",
  "extends": script$1,
  inheritAttrs: false
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", mergeProps({
    "class": _ctx.cx("root")
  }, _ctx.ptmi("root")), [renderSlot(_ctx.$slots, "default")], 16);
}
script.render = render;
export {
  script$2 as a,
  script as s
};
//# sourceMappingURL=index-Dc7gNevf.js.map
