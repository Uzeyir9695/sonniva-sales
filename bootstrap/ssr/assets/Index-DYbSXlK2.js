import { T as Tooltip } from "./index-C3Ts-4IM.js";
import { s as script$3 } from "./index-YvTnrAwi.js";
import { s as script$2 } from "./index-C0PiRRRi.js";
import { s as script, a as script$1 } from "./index-C62S2GzY.js";
import { ref, unref, withCtx, createTextVNode, toDisplayString, createVNode, openBlock, createBlock, mergeProps, withDirectives, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrGetDirectiveProps } from "vue/server-renderer";
import { Head, Deferred } from "@inertiajs/vue3";
import { _ as _sfc_main$2 } from "./TableSkeleton-jtC7qFHK.js";
import _sfc_main$1 from "./OrderDetailDialog-BAMi87SM.js";
import "@primeuix/utils/dom";
import "@primeuix/utils/object";
import "@primeuix/utils/uuid";
import "@primeuix/utils/zindex";
import "@primevue/core/utils";
import "@primevue/core/basedirective";
import "@primeuix/styles/tooltip";
import "@primevue/core/base/style";
import "@primeuix/utils";
import "@primevue/icons/spinner";
import "@primevue/core/basecomponent";
import "@primeuix/styles/badge";
import "@primeuix/styles/ripple";
import "@primeuix/styles/button";
import "@primeuix/styles/tag";
import "@primevue/core/api";
import "@primevue/icons/arrowdown";
import "@primevue/icons/arrowup";
import "./index-BUhsrrXV.js";
import "@primeuix/styles/paginator";
import "@primevue/icons/angledoubleleft";
import "./index--B3DAMqV.js";
import "@primevue/icons/blank";
import "@primevue/icons/check";
import "@primevue/icons/chevrondown";
import "@primevue/icons/search";
import "@primevue/icons/times";
import "@primeuix/styles/iconfield";
import "./index-BAgOeBfa.js";
import "@primevue/core/baseinput";
import "@primeuix/styles/inputtext";
import "./index-rAVNvoJo.js";
import "@primeuix/utils/eventbus";
import "./index-zZrFrjQS.js";
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
import "@primevue/icons/chevronright";
import "@primevue/icons/bars";
import "@primevue/icons/pencil";
import "./index-BzRznsIW.js";
import "@primevue/icons/minus";
import "@primeuix/styles/checkbox";
import "@primeuix/styles/radiobutton";
import "@primevue/icons/filter";
import "@primevue/icons/filterfill";
import "@primevue/icons/filterslash";
import "@primevue/icons/plus";
import "@primevue/icons/trash";
import "./index-D46B4f3g.js";
import "@primevue/icons/windowmaximize";
import "@primevue/icons/windowminimize";
import "@primeuix/styled";
import "@primeuix/styles/dialog";
import "@primevue/icons/sortalt";
import "@primevue/icons/sortamountdown";
import "@primevue/icons/sortamountupalt";
import "./index-CvFud99G.js";
import "@primeuix/styles/skeleton";
import "./index-Qb24q4w2.js";
import "./numberFormat-BgUHwZc2.js";
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    orders: Object
  },
  setup(__props) {
    const detailDialog = ref(null);
    const statusSeverity = {
      pending: "warn",
      paid: "info",
      ready: "success",
      cancelled: "danger"
    };
    const statusLabel = {
      pending: "დაუდასტურებელი",
      paid: "გადახდილი",
      ready: "მზადაა",
      cancelled: "უარყოფილი",
      limit: "ლიმიტი"
    };
    const deliveryLabel = {
      office: "ოფისიდან გატანა",
      tbilisi: "თბილისი",
      regions: "რეგიონები"
    };
    const providerLabel = {
      bog: "BOG",
      tbc: "TBC",
      pcb: "ProCredit",
      invoice: "ინვოისი"
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_DataTable = script;
      const _component_Column = script$1;
      const _component_Tag = script$2;
      const _component_Button = script$3;
      const _directive_tooltip = Tooltip;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "ჩემი შეკვეთები" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, {
        ref_key: "detailDialog",
        ref: detailDialog
      }, null, _parent));
      _push(`<div class="max-w-5xl mx-auto py-8 px-4"><h1 class="text-xl font-semibold text-gray-800 mb-6">ჩემი შეკვეთები</h1>`);
      _push(ssrRenderComponent(unref(Deferred), { data: "orders" }, {
        fallback: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$2, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$2)
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_DataTable, {
              value: __props.orders?.data ?? [],
              dataKey: "id",
              rows: 10,
              paginator: "",
              rowsPerPageOptions: [10, 20, 50],
              class: "text-sm"
            }, {
              header: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex items-center gap-2"${_scopeId2}><span class="font-semibold text-gray-700"${_scopeId2}>${ssrInterpolate(__props.orders.data.length)} შეკვეთა </span></div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex items-center gap-2" }, [
                      createVNode("span", { class: "font-semibold text-gray-700" }, toDisplayString(__props.orders.data.length) + " შეკვეთა ", 1)
                    ])
                  ];
                }
              }),
              empty: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex flex-col items-center justify-center h-40"${_scopeId2}><i class="pi pi-inbox text-5xl text-gray-300 mb-3"${_scopeId2}></i><p class="text-gray-500"${_scopeId2}>შეკვეთები არ მოიძებნა.</p></div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex flex-col items-center justify-center h-40" }, [
                      createVNode("i", { class: "pi pi-inbox text-5xl text-gray-300 mb-3" }),
                      createVNode("p", { class: "text-gray-500" }, "შეკვეთები არ მოიძებნა.")
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
                    header: "ინვოისი"
                  }, {
                    body: withCtx(({ data }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<span class="font-mono text-xs"${_scopeId3}>${ssrInterpolate(data.invoice_no ?? "—")}</span>`);
                      } else {
                        return [
                          createVNode("span", { class: "font-mono text-xs" }, toDisplayString(data.invoice_no ?? "—"), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Column, { header: "სულ" }, {
                    body: withCtx(({ data }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<span class="font-semibold"${_scopeId3}>${ssrInterpolate(data.total)} ₾</span>`);
                      } else {
                        return [
                          createVNode("span", { class: "font-semibold" }, toDisplayString(data.total) + " ₾", 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Column, { header: "მიწოდება" }, {
                    body: withCtx(({ data }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(deliveryLabel[data.delivery_type] ?? data.delivery_type)}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(deliveryLabel[data.delivery_type] ?? data.delivery_type), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Column, { header: "გადახდა" }, {
                    body: withCtx(({ data }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        if (data.payment) {
                          _push4(`<span class="uppercase text-xs font-semibold text-gray-500"${_scopeId3}>${ssrInterpolate(providerLabel[data.payment.provider] ?? data.payment.provider)}</span>`);
                        } else {
                          _push4(`<span class="text-gray-300"${_scopeId3}>—</span>`);
                        }
                      } else {
                        return [
                          data.payment ? (openBlock(), createBlock("span", {
                            key: 0,
                            class: "uppercase text-xs font-semibold text-gray-500"
                          }, toDisplayString(providerLabel[data.payment.provider] ?? data.payment.provider), 1)) : (openBlock(), createBlock("span", {
                            key: 1,
                            class: "text-gray-300"
                          }, "—"))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Column, { header: "სტატუსი" }, {
                    body: withCtx(({ data }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_Tag, {
                          value: statusLabel[data.status] ?? data.status,
                          severity: statusSeverity[data.status]
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_Tag, {
                            value: statusLabel[data.status] ?? data.status,
                            severity: statusSeverity[data.status]
                          }, null, 8, ["value", "severity"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Column, {
                    field: "created_at",
                    header: "თარიღი"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Column, { header: "" }, {
                    body: withCtx(({ data }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_Button, mergeProps({
                          icon: "pi pi-eye",
                          size: "small",
                          variant: "text",
                          raised: "",
                          rounded: "",
                          severity: "secondary",
                          onClick: ($event) => detailDialog.value.open(data.id)
                        }, ssrGetDirectiveProps(_ctx, _directive_tooltip, "დეტალები", void 0, { top: true })), null, _parent4, _scopeId3));
                      } else {
                        return [
                          withDirectives(createVNode(_component_Button, {
                            icon: "pi pi-eye",
                            size: "small",
                            variant: "text",
                            raised: "",
                            rounded: "",
                            severity: "secondary",
                            onClick: ($event) => detailDialog.value.open(data.id)
                          }, null, 8, ["onClick"]), [
                            [
                              _directive_tooltip,
                              "დეტალები",
                              void 0,
                              { top: true }
                            ]
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
                      header: "ინვოისი"
                    }, {
                      body: withCtx(({ data }) => [
                        createVNode("span", { class: "font-mono text-xs" }, toDisplayString(data.invoice_no ?? "—"), 1)
                      ]),
                      _: 1
                    }),
                    createVNode(_component_Column, { header: "სულ" }, {
                      body: withCtx(({ data }) => [
                        createVNode("span", { class: "font-semibold" }, toDisplayString(data.total) + " ₾", 1)
                      ]),
                      _: 1
                    }),
                    createVNode(_component_Column, { header: "მიწოდება" }, {
                      body: withCtx(({ data }) => [
                        createTextVNode(toDisplayString(deliveryLabel[data.delivery_type] ?? data.delivery_type), 1)
                      ]),
                      _: 1
                    }),
                    createVNode(_component_Column, { header: "გადახდა" }, {
                      body: withCtx(({ data }) => [
                        data.payment ? (openBlock(), createBlock("span", {
                          key: 0,
                          class: "uppercase text-xs font-semibold text-gray-500"
                        }, toDisplayString(providerLabel[data.payment.provider] ?? data.payment.provider), 1)) : (openBlock(), createBlock("span", {
                          key: 1,
                          class: "text-gray-300"
                        }, "—"))
                      ]),
                      _: 1
                    }),
                    createVNode(_component_Column, { header: "სტატუსი" }, {
                      body: withCtx(({ data }) => [
                        createVNode(_component_Tag, {
                          value: statusLabel[data.status] ?? data.status,
                          severity: statusSeverity[data.status]
                        }, null, 8, ["value", "severity"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_Column, {
                      field: "created_at",
                      header: "თარიღი"
                    }),
                    createVNode(_component_Column, { header: "" }, {
                      body: withCtx(({ data }) => [
                        withDirectives(createVNode(_component_Button, {
                          icon: "pi pi-eye",
                          size: "small",
                          variant: "text",
                          raised: "",
                          rounded: "",
                          severity: "secondary",
                          onClick: ($event) => detailDialog.value.open(data.id)
                        }, null, 8, ["onClick"]), [
                          [
                            _directive_tooltip,
                            "დეტალები",
                            void 0,
                            { top: true }
                          ]
                        ])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden" }, [
                createVNode(_component_DataTable, {
                  value: __props.orders?.data ?? [],
                  dataKey: "id",
                  rows: 10,
                  paginator: "",
                  rowsPerPageOptions: [10, 20, 50],
                  class: "text-sm"
                }, {
                  header: withCtx(() => [
                    createVNode("div", { class: "flex items-center gap-2" }, [
                      createVNode("span", { class: "font-semibold text-gray-700" }, toDisplayString(__props.orders.data.length) + " შეკვეთა ", 1)
                    ])
                  ]),
                  empty: withCtx(() => [
                    createVNode("div", { class: "flex flex-col items-center justify-center h-40" }, [
                      createVNode("i", { class: "pi pi-inbox text-5xl text-gray-300 mb-3" }),
                      createVNode("p", { class: "text-gray-500" }, "შეკვეთები არ მოიძებნა.")
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
                      header: "ინვოისი"
                    }, {
                      body: withCtx(({ data }) => [
                        createVNode("span", { class: "font-mono text-xs" }, toDisplayString(data.invoice_no ?? "—"), 1)
                      ]),
                      _: 1
                    }),
                    createVNode(_component_Column, { header: "სულ" }, {
                      body: withCtx(({ data }) => [
                        createVNode("span", { class: "font-semibold" }, toDisplayString(data.total) + " ₾", 1)
                      ]),
                      _: 1
                    }),
                    createVNode(_component_Column, { header: "მიწოდება" }, {
                      body: withCtx(({ data }) => [
                        createTextVNode(toDisplayString(deliveryLabel[data.delivery_type] ?? data.delivery_type), 1)
                      ]),
                      _: 1
                    }),
                    createVNode(_component_Column, { header: "გადახდა" }, {
                      body: withCtx(({ data }) => [
                        data.payment ? (openBlock(), createBlock("span", {
                          key: 0,
                          class: "uppercase text-xs font-semibold text-gray-500"
                        }, toDisplayString(providerLabel[data.payment.provider] ?? data.payment.provider), 1)) : (openBlock(), createBlock("span", {
                          key: 1,
                          class: "text-gray-300"
                        }, "—"))
                      ]),
                      _: 1
                    }),
                    createVNode(_component_Column, { header: "სტატუსი" }, {
                      body: withCtx(({ data }) => [
                        createVNode(_component_Tag, {
                          value: statusLabel[data.status] ?? data.status,
                          severity: statusSeverity[data.status]
                        }, null, 8, ["value", "severity"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_Column, {
                      field: "created_at",
                      header: "თარიღი"
                    }),
                    createVNode(_component_Column, { header: "" }, {
                      body: withCtx(({ data }) => [
                        withDirectives(createVNode(_component_Button, {
                          icon: "pi pi-eye",
                          size: "small",
                          variant: "text",
                          raised: "",
                          rounded: "",
                          severity: "secondary",
                          onClick: ($event) => detailDialog.value.open(data.id)
                        }, null, 8, ["onClick"]), [
                          [
                            _directive_tooltip,
                            "დეტალები",
                            void 0,
                            { top: true }
                          ]
                        ])
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["value"])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/UserOrders/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=Index-DYbSXlK2.js.map
