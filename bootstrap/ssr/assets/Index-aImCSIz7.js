import { s as script$3, a as script$4 } from "./index-CYNLBuLC.js";
import { s as script, a as script$1, b as script$2 } from "./index-fvkEaty1.js";
import { ref, mergeProps, withCtx, createTextVNode, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./AdminLayout-Boya0M7J.js";
import _sfc_main$2 from "./HeroBannersTab-C-1mqKeR.js";
import _sfc_main$3 from "./HomeSectionsTab-DiOJLKFJ.js";
import "@primeuix/utils/object";
import "@primevue/core/basecomponent";
import "@primevue/core/base/style";
import "@primeuix/utils";
import "@primeuix/utils/dom";
import "./index-YvTnrAwi.js";
import "@primevue/icons/spinner";
import "@primeuix/styles/badge";
import "@primevue/core/basedirective";
import "@primeuix/styles/ripple";
import "@primeuix/styles/button";
import "@primevue/icons/chevronleft";
import "@primevue/icons/chevronright";
import "@primeuix/styles/tabs";
import "./index-xMqRgxlF.js";
import "@primeuix/utils/zindex";
import "./index-zZrFrjQS.js";
import "@primeuix/utils/eventbus";
import "@primeuix/styles/toast";
import "@primevue/icons/check";
import "@primevue/icons/exclamationtriangle";
import "@primevue/icons/infocircle";
import "@primevue/icons/times";
import "@primevue/icons/timescircle";
import "@inertiajs/vue3";
import "@vueuse/core";
import "./categoryIcons-dDFpexsr.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./index-C3Ts-4IM.js";
import "@primeuix/utils/uuid";
import "@primevue/core/utils";
import "@primeuix/styles/tooltip";
import "axios";
import "./QuickViewDialog-CIKmxF1N.js";
import "./index-D46B4f3g.js";
import "@primevue/icons/windowmaximize";
import "@primevue/icons/windowminimize";
import "@primeuix/styled";
import "@primeuix/styles/dialog";
import "./useCart-CLT7fb2x.js";
import "./index-Qb24q4w2.js";
import "./usePricing-BqOIsB71.js";
import "@primeuix/styles/confirmdialog";
import "./PrimeInputText-BlIRrCdA.js";
import "./index-BAgOeBfa.js";
import "@primevue/core/baseinput";
import "@primeuix/styles/inputtext";
import "./HomeSectionCard-BRVwoASg.js";
import "./index-DPwr32It.js";
const _sfc_main = /* @__PURE__ */ Object.assign({ layout: _sfc_main$1 }, {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    banners: { type: Object, default: () => ({}) },
    sections: { type: Array, default: () => [] }
  },
  setup(__props) {
    const activeTab = ref("0");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Tabs = script;
      const _component_TabList = script$1;
      const _component_Tab = script$2;
      const _component_TabPanels = script$3;
      const _component_TabPanel = script$4;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "p-6 max-w-5xl mx-auto space-y-6" }, _attrs))}><h1 class="text-xl font-bold text-gray-800">Manage Home Page</h1>`);
      _push(ssrRenderComponent(_component_Tabs, {
        value: activeTab.value,
        "onUpdate:value": ($event) => activeTab.value = $event,
        class: "bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_TabList, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Tab, { value: "0" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Hero Banners`);
                      } else {
                        return [
                          createTextVNode("Hero Banners")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Tab, { value: "1" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Home Sections`);
                      } else {
                        return [
                          createTextVNode("Home Sections")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Tab, { value: "0" }, {
                      default: withCtx(() => [
                        createTextVNode("Hero Banners")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_Tab, { value: "1" }, {
                      default: withCtx(() => [
                        createTextVNode("Home Sections")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_TabPanels, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_TabPanel, { value: "0" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_sfc_main$2, { banners: __props.banners }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_sfc_main$2, { banners: __props.banners }, null, 8, ["banners"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_TabPanel, { value: "1" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_sfc_main$3, { sections: __props.sections }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_sfc_main$3, { sections: __props.sections }, null, 8, ["sections"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_TabPanel, { value: "0" }, {
                      default: withCtx(() => [
                        createVNode(_sfc_main$2, { banners: __props.banners }, null, 8, ["banners"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_TabPanel, { value: "1" }, {
                      default: withCtx(() => [
                        createVNode(_sfc_main$3, { sections: __props.sections }, null, 8, ["sections"])
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
              createVNode(_component_TabList, null, {
                default: withCtx(() => [
                  createVNode(_component_Tab, { value: "0" }, {
                    default: withCtx(() => [
                      createTextVNode("Hero Banners")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_Tab, { value: "1" }, {
                    default: withCtx(() => [
                      createTextVNode("Home Sections")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_TabPanels, null, {
                default: withCtx(() => [
                  createVNode(_component_TabPanel, { value: "0" }, {
                    default: withCtx(() => [
                      createVNode(_sfc_main$2, { banners: __props.banners }, null, 8, ["banners"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_TabPanel, { value: "1" }, {
                    default: withCtx(() => [
                      createVNode(_sfc_main$3, { sections: __props.sections }, null, 8, ["sections"])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/HomePage/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=Index-aImCSIz7.js.map
