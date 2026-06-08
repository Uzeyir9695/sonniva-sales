import { equals } from "@primeuix/utils/object";
import { mergeProps, renderSlot, openBlock, createElementBlock, Fragment, withDirectives, createBlock, resolveDynamicComponent, withCtx, vShow, createCommentVNode, normalizeClass } from "vue";
import BaseComponent from "@primevue/core/basecomponent";
import BaseStyle from "@primevue/core/base/style";
var classes$1 = {
  root: function root(_ref) {
    var instance = _ref.instance;
    return ["p-tabpanel", {
      "p-tabpanel-active": instance.active
    }];
  }
};
var TabPanelStyle = BaseStyle.extend({
  name: "tabpanel",
  classes: classes$1
});
var script$1$1 = {
  name: "BaseTabPanel",
  "extends": BaseComponent,
  props: {
    // in Tabs
    value: {
      type: [String, Number],
      "default": void 0
    },
    as: {
      type: [String, Object],
      "default": "DIV"
    },
    asChild: {
      type: Boolean,
      "default": false
    },
    // in TabView
    header: null,
    headerStyle: null,
    headerClass: null,
    headerProps: null,
    headerActionProps: null,
    contentStyle: null,
    contentClass: null,
    contentProps: null,
    disabled: Boolean
  },
  style: TabPanelStyle,
  provide: function provide() {
    return {
      $pcTabPanel: this,
      $parentInstance: this
    };
  }
};
var script$2 = {
  name: "TabPanel",
  "extends": script$1$1,
  inheritAttrs: false,
  inject: ["$pcTabs"],
  computed: {
    active: function active() {
      var _this$$pcTabs;
      return equals((_this$$pcTabs = this.$pcTabs) === null || _this$$pcTabs === void 0 ? void 0 : _this$$pcTabs.d_value, this.value);
    },
    id: function id() {
      var _this$$pcTabs2;
      return "".concat((_this$$pcTabs2 = this.$pcTabs) === null || _this$$pcTabs2 === void 0 ? void 0 : _this$$pcTabs2.$id, "_tabpanel_").concat(this.value);
    },
    ariaLabelledby: function ariaLabelledby() {
      var _this$$pcTabs3;
      return "".concat((_this$$pcTabs3 = this.$pcTabs) === null || _this$$pcTabs3 === void 0 ? void 0 : _this$$pcTabs3.$id, "_tab_").concat(this.value);
    },
    attrs: function attrs() {
      return mergeProps(this.a11yAttrs, this.ptmi("root", this.ptParams));
    },
    a11yAttrs: function a11yAttrs() {
      var _this$$pcTabs4;
      return {
        id: this.id,
        tabindex: (_this$$pcTabs4 = this.$pcTabs) === null || _this$$pcTabs4 === void 0 ? void 0 : _this$$pcTabs4.tabindex,
        role: "tabpanel",
        "aria-labelledby": this.ariaLabelledby,
        "data-pc-name": "tabpanel",
        "data-p-active": this.active
      };
    },
    ptParams: function ptParams() {
      return {
        context: {
          active: this.active
        }
      };
    }
  }
};
function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  var _$options$$pcTabs, _$options$$pcTabs2;
  return !$options.$pcTabs ? renderSlot(_ctx.$slots, "default", {
    key: 0
  }) : (openBlock(), createElementBlock(Fragment, {
    key: 1
  }, [!_ctx.asChild ? (openBlock(), createElementBlock(Fragment, {
    key: 0
  }, [((_$options$$pcTabs = $options.$pcTabs) !== null && _$options$$pcTabs !== void 0 && _$options$$pcTabs.lazy ? $options.active : true) ? withDirectives((openBlock(), createBlock(resolveDynamicComponent(_ctx.as), mergeProps({
    key: 0,
    "class": _ctx.cx("root")
  }, $options.attrs), {
    "default": withCtx(function() {
      return [renderSlot(_ctx.$slots, "default")];
    }),
    _: 3
  }, 16, ["class"])), [[vShow, (_$options$$pcTabs2 = $options.$pcTabs) !== null && _$options$$pcTabs2 !== void 0 && _$options$$pcTabs2.lazy ? true : $options.active]]) : createCommentVNode("", true)], 64)) : renderSlot(_ctx.$slots, "default", {
    key: 1,
    "class": normalizeClass(_ctx.cx("root")),
    active: $options.active,
    a11yAttrs: $options.a11yAttrs
  })], 64));
}
script$2.render = render$1;
var classes = {
  root: "p-tabpanels"
};
var TabPanelsStyle = BaseStyle.extend({
  name: "tabpanels",
  classes
});
var script$1 = {
  name: "BaseTabPanels",
  "extends": BaseComponent,
  props: {},
  style: TabPanelsStyle,
  provide: function provide2() {
    return {
      $pcTabPanels: this,
      $parentInstance: this
    };
  }
};
var script = {
  name: "TabPanels",
  "extends": script$1,
  inheritAttrs: false
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", mergeProps({
    "class": _ctx.cx("root"),
    role: "presentation"
  }, _ctx.ptmi("root")), [renderSlot(_ctx.$slots, "default")], 16);
}
script.render = render;
export {
  script$2 as a,
  script as s
};
//# sourceMappingURL=index-CYNLBuLC.js.map
