import { T as Tooltip } from "./index-C3Ts-4IM.js";
import { s as script$5 } from "./index-C0PiRRRi.js";
import { s as script$4 } from "./index-DOeVcSWx.js";
import { s as script$2, a as script$3 } from "./index-dkMbGzYi.js";
import { s as script$1 } from "./index-hSjFFc9a.js";
import { s as script } from "./index-BOVEwDIL.js";
import { ref, watch, mergeProps, unref, withCtx, createVNode, toDisplayString, createTextVNode, openBlock, createBlock, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrGetDirectiveProps, ssrInterpolate } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./AdminLayout-DA62ykWk.js";
import { _ as _sfc_main$3 } from "./TableSkeleton-jtC7qFHK.js";
import { router, Deferred } from "@inertiajs/vue3";
import { FilterMatchMode } from "@primevue/core/api";
import _sfc_main$2 from "./PrimeInputText-BlIRrCdA.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "@primeuix/utils/dom";
import "@primeuix/utils/object";
import "@primeuix/utils/uuid";
import "@primeuix/utils/zindex";
import "@primevue/core/utils";
import "@primevue/core/basedirective";
import "@primeuix/styles/tooltip";
import "@primevue/core/base/style";
import "@primeuix/utils";
import "@primevue/core/basecomponent";
import "@primeuix/styles/tag";
import "@primevue/icons/blank";
import "@primevue/icons/check";
import "@primevue/icons/chevrondown";
import "@primevue/icons/search";
import "@primevue/icons/spinner";
import "@primevue/icons/times";
import "@primeuix/styles/iconfield";
import "./index-BAgOeBfa.js";
import "@primevue/core/baseinput";
import "@primeuix/styles/inputtext";
import "./index-rAVNvoJo.js";
import "@primeuix/utils/eventbus";
import "./index-zZrFrjQS.js";
import "./index-BWQ0UkXI.js";
import "@primeuix/styles/ripple";
import "@primeuix/styles/virtualscroller";
import "@primeuix/styles/select";
import "@primevue/icons/arrowdown";
import "@primevue/icons/arrowup";
import "./index-PXeQwkTt.js";
import "@primeuix/styles/paginator";
import "@primevue/icons/angledoubleleft";
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
import "./index-nsBhLTBN.js";
import "@primevue/icons/windowmaximize";
import "@primevue/icons/windowminimize";
import "@primeuix/styled";
import "@primeuix/styles/dialog";
import "@primevue/icons/sortalt";
import "@primevue/icons/sortamountdown";
import "@primevue/icons/sortamountupalt";
import "@primeuix/styles/badge";
import "@primeuix/styles/button";
import "@primevue/icons/calendar";
import "@primevue/icons/chevronleft";
import "@primevue/icons/chevronup";
import "@primeuix/styles/datepicker";
import "./index-DIhUgMxN.js";
import "@primeuix/styles/toast";
import "@primevue/icons/exclamationtriangle";
import "@primevue/icons/infocircle";
import "@primevue/icons/timescircle";
import "./LargeDeviceMegaMenu-v5j4FdUj.js";
import "swiper/vue";
import "swiper/modules";
/* empty css                */
import "@vueuse/core";
import "axios";
import "./QuickViewDialog-DUZFQ2la.js";
import "./useCart-CWhz1Vmq.js";
import "./index-Qb24q4w2.js";
import "./usePricing-HxfzG07E.js";
import "@primeuix/styles/confirmdialog";
import "./index-CvFud99G.js";
import "@primeuix/styles/skeleton";
const _sfc_main = /* @__PURE__ */ Object.assign({ layout: _sfc_main$1 }, {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    payments: Array,
    paymentsCount: Number,
    dateFrom: String,
    dateTo: String
  },
  setup(__props) {
    const props = __props;
    const dt = ref();
    const filters = ref({
      invoice_no: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      user_name: { value: null, matchMode: FilterMatchMode.CONTAINS },
      provider: { value: null, matchMode: FilterMatchMode.EQUALS },
      status: { value: null, matchMode: FilterMatchMode.EQUALS }
    });
    const providers = ["tbc", "bog", "pcb", "invoice"];
    const statuses = ["pending", "completed", "failed"];
    const providerLabel = { tbc: "TBC", bog: "BOG", pcb: "ProCredit", invoice: "Invoice" };
    const statusSeverity = {
      completed: "success",
      pending: "warn",
      failed: "danger"
    };
    const dateRange = ref(
      props.dateFrom && props.dateTo ? [new Date(props.dateFrom), new Date(props.dateTo)] : null
    );
    watch(dateRange, (val) => {
      if (val === null || Array.isArray(val) && val[1]) {
        const from = val?.[0];
        const to = val?.[1];
        router.get(
          route("admin.payments.index"),
          {
            date_from: from ? from.toISOString().slice(0, 10) : void 0,
            date_to: to ? to.toISOString().slice(0, 10) : void 0
          },
          { preserveState: true, preserveScroll: true }
        );
      }
    });
    const exportCSV = () => dt.value.exportCSV();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_DatePicker = script;
      const _component_Button = script$1;
      const _component_DataTable = script$2;
      const _component_Column = script$3;
      const _component_Select = script$4;
      const _component_Tag = script$5;
      const _directive_tooltip = Tooltip;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-4" }, _attrs))} data-v-d8e7c2b9><div class="flex items-center gap-3" data-v-d8e7c2b9>`);
      _push(ssrRenderComponent(_component_DatePicker, {
        modelValue: dateRange.value,
        "onUpdate:modelValue": ($event) => dateRange.value = $event,
        selectionMode: "range",
        manualInput: false,
        showIcon: "",
        iconDisplay: "input",
        placeholder: "Filter by date range",
        dateFormat: "yy-mm-dd",
        size: "small",
        class: "w-64"
      }, null, _parent));
      if (dateRange.value) {
        _push(ssrRenderComponent(_component_Button, mergeProps({
          icon: "pi pi-times",
          size: "small",
          severity: "secondary",
          variant: "text",
          onClick: ($event) => dateRange.value = null
        }, ssrGetDirectiveProps(_ctx, _directive_tooltip, "Clear dates", void 0, { top: true })), null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      _push(ssrRenderComponent(unref(Deferred), { data: "payments" }, {
        fallback: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$3, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$3)
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (__props.payments?.length > 0) {
              _push2(`<div class="rounded-xl border border-gray-200 overflow-hidden" data-v-d8e7c2b9${_scopeId}>`);
              _push2(ssrRenderComponent(_component_DataTable, {
                filters: filters.value,
                "onUpdate:filters": ($event) => filters.value = $event,
                filterDisplay: "row",
                scrollable: "",
                value: __props.payments,
                paginator: "",
                rows: 15,
                dataKey: "id",
                tableStyle: "min-width: 50rem",
                ref_key: "dt",
                ref: dt,
                class: "text-sm"
              }, {
                header: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="flex flex-wrap items-center justify-between gap-2" data-v-d8e7c2b9${_scopeId2}><h2 class="text-lg font-semibold text-gray-900" data-v-d8e7c2b9${_scopeId2}>${ssrInterpolate(__props.paymentsCount)} Payments</h2>`);
                    _push3(ssrRenderComponent(_component_Button, {
                      icon: "pi pi-file-export",
                      size: "small",
                      label: "Export",
                      onClick: exportCSV
                    }, null, _parent3, _scopeId2));
                    _push3(`</div>`);
                  } else {
                    return [
                      createVNode("div", { class: "flex flex-wrap items-center justify-between gap-2" }, [
                        createVNode("h2", { class: "text-lg font-semibold text-gray-900" }, toDisplayString(__props.paymentsCount) + " Payments", 1),
                        createVNode(_component_Button, {
                          icon: "pi pi-file-export",
                          size: "small",
                          label: "Export",
                          onClick: exportCSV
                        })
                      ])
                    ];
                  }
                }),
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_Column, {
                      field: "invoice_no",
                      header: "Invoice No",
                      filterField: "invoice_no",
                      style: { "min-width": "10rem" }
                    }, {
                      body: withCtx(({ data }, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<span class="font-mono" data-v-d8e7c2b9${_scopeId3}>${ssrInterpolate(data.invoice_no ?? "—")}</span>`);
                        } else {
                          return [
                            createVNode("span", { class: "font-mono" }, toDisplayString(data.invoice_no ?? "—"), 1)
                          ];
                        }
                      }),
                      filter: withCtx(({ filterModel, filterCallback }, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_sfc_main$2, {
                            modelValue: filterModel.value,
                            "onUpdate:modelValue": ($event) => filterModel.value = $event,
                            onInput: ($event) => filterCallback(),
                            placeholder: "Search INV"
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_sfc_main$2, {
                              modelValue: filterModel.value,
                              "onUpdate:modelValue": ($event) => filterModel.value = $event,
                              onInput: ($event) => filterCallback(),
                              placeholder: "Search INV"
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "onInput"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_Column, {
                      field: "user_name",
                      header: "Customer",
                      filterField: "user_name",
                      style: { "min-width": "12rem" }
                    }, {
                      body: withCtx(({ data }, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<div data-v-d8e7c2b9${_scopeId3}><div data-v-d8e7c2b9${_scopeId3}>${ssrInterpolate(data.user_name ?? "—")}</div><div class="text-gray-400" data-v-d8e7c2b9${_scopeId3}>${ssrInterpolate(data.user_email)}</div></div>`);
                        } else {
                          return [
                            createVNode("div", null, [
                              createVNode("div", null, toDisplayString(data.user_name ?? "—"), 1),
                              createVNode("div", { class: "text-gray-400" }, toDisplayString(data.user_email), 1)
                            ])
                          ];
                        }
                      }),
                      filter: withCtx(({ filterModel, filterCallback }, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_sfc_main$2, {
                            modelValue: filterModel.value,
                            "onUpdate:modelValue": ($event) => filterModel.value = $event,
                            onInput: ($event) => filterCallback(),
                            placeholder: "Search name"
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_sfc_main$2, {
                              modelValue: filterModel.value,
                              "onUpdate:modelValue": ($event) => filterModel.value = $event,
                              onInput: ($event) => filterCallback(),
                              placeholder: "Search name"
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "onInput"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_Column, {
                      field: "provider",
                      header: "Provider",
                      filterField: "provider",
                      style: { "min-width": "9rem" }
                    }, {
                      body: withCtx(({ data }, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<span class="font-mono font-semibold uppercase" data-v-d8e7c2b9${_scopeId3}>${ssrInterpolate(providerLabel[data.provider] ?? data.provider)}</span>`);
                        } else {
                          return [
                            createVNode("span", { class: "font-mono font-semibold uppercase" }, toDisplayString(providerLabel[data.provider] ?? data.provider), 1)
                          ];
                        }
                      }),
                      filter: withCtx(({ filterModel, filterCallback }, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_Select, {
                            modelValue: filterModel.value,
                            "onUpdate:modelValue": ($event) => filterModel.value = $event,
                            options: providers,
                            placeholder: "All",
                            showClear: "",
                            size: "small",
                            class: "w-full",
                            onChange: ($event) => filterCallback()
                          }, {
                            option: withCtx(({ option }, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`${ssrInterpolate(providerLabel[option] ?? option)}`);
                              } else {
                                return [
                                  createTextVNode(toDisplayString(providerLabel[option] ?? option), 1)
                                ];
                              }
                            }),
                            value: withCtx(({ value }, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`${ssrInterpolate(value ? providerLabel[value] ?? value : "All")}`);
                              } else {
                                return [
                                  createTextVNode(toDisplayString(value ? providerLabel[value] ?? value : "All"), 1)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_Select, {
                              modelValue: filterModel.value,
                              "onUpdate:modelValue": ($event) => filterModel.value = $event,
                              options: providers,
                              placeholder: "All",
                              showClear: "",
                              size: "small",
                              class: "w-full",
                              onChange: ($event) => filterCallback()
                            }, {
                              option: withCtx(({ option }) => [
                                createTextVNode(toDisplayString(providerLabel[option] ?? option), 1)
                              ]),
                              value: withCtx(({ value }) => [
                                createTextVNode(toDisplayString(value ? providerLabel[value] ?? value : "All"), 1)
                              ]),
                              _: 1
                            }, 8, ["modelValue", "onUpdate:modelValue", "onChange"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_Column, {
                      field: "status",
                      header: "Status",
                      filterField: "status",
                      style: { "min-width": "9rem" }
                    }, {
                      body: withCtx(({ data }, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_Tag, {
                            value: data.status,
                            severity: statusSeverity[data.status] ?? "secondary",
                            class: "capitalize"
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_Tag, {
                              value: data.status,
                              severity: statusSeverity[data.status] ?? "secondary",
                              class: "capitalize"
                            }, null, 8, ["value", "severity"])
                          ];
                        }
                      }),
                      filter: withCtx(({ filterModel, filterCallback }, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_Select, {
                            modelValue: filterModel.value,
                            "onUpdate:modelValue": ($event) => filterModel.value = $event,
                            options: statuses,
                            placeholder: "All",
                            showClear: "",
                            size: "small",
                            class: "w-full",
                            onChange: ($event) => filterCallback()
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_Select, {
                              modelValue: filterModel.value,
                              "onUpdate:modelValue": ($event) => filterModel.value = $event,
                              options: statuses,
                              placeholder: "All",
                              showClear: "",
                              size: "small",
                              class: "w-full",
                              onChange: ($event) => filterCallback()
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "onChange"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_Column, {
                      field: "amount",
                      header: "Amount",
                      style: { "min-width": "8rem" }
                    }, {
                      body: withCtx(({ data }, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<span class="font-semibold" data-v-d8e7c2b9${_scopeId3}>${ssrInterpolate(data.amount)} ${ssrInterpolate(data.currency)}</span>`);
                        } else {
                          return [
                            createVNode("span", { class: "font-semibold" }, toDisplayString(data.amount) + " " + toDisplayString(data.currency), 1)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_Column, {
                      field: "payment_method",
                      header: "Method",
                      style: { "min-width": "8rem" }
                    }, {
                      body: withCtx(({ data }, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(data.payment_method ?? "—")}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(data.payment_method ?? "—"), 1)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_Column, {
                      field: "transaction_id",
                      header: "Transaction ID",
                      style: { "min-width": "13rem" }
                    }, {
                      body: withCtx(({ data }, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<span class="font-mono text-gray-500 break-all" data-v-d8e7c2b9${_scopeId3}>${ssrInterpolate(data.transaction_id ?? "—")}</span>`);
                        } else {
                          return [
                            createVNode("span", { class: "font-mono text-gray-500 break-all" }, toDisplayString(data.transaction_id ?? "—"), 1)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_Column, {
                      field: "delivery_type",
                      header: "Delivery",
                      style: { "min-width": "9rem" }
                    }, {
                      body: withCtx(({ data }, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          if (data.delivery_type) {
                            _push4(`<span class="capitalize" data-v-d8e7c2b9${_scopeId3}>${ssrInterpolate(data.delivery_type)} (${ssrInterpolate(data.delivery_cost)} ₾)</span>`);
                          } else {
                            _push4(`<span data-v-d8e7c2b9${_scopeId3}>—</span>`);
                          }
                        } else {
                          return [
                            data.delivery_type ? (openBlock(), createBlock("span", {
                              key: 0,
                              class: "capitalize"
                            }, toDisplayString(data.delivery_type) + " (" + toDisplayString(data.delivery_cost) + " ₾)", 1)) : (openBlock(), createBlock("span", { key: 1 }, "—"))
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_Column, {
                      field: "processed_at",
                      header: "Processed",
                      style: { "min-width": "12rem" }
                    }, {
                      body: withCtx(({ data }, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<span class="text-gray-500" data-v-d8e7c2b9${_scopeId3}>${ssrInterpolate(data.processed_at ?? "—")}</span>`);
                        } else {
                          return [
                            createVNode("span", { class: "text-gray-500" }, toDisplayString(data.processed_at ?? "—"), 1)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_Column, {
                      field: "created_at",
                      header: "Date",
                      style: { "min-width": "12rem" }
                    }, {
                      body: withCtx(({ data }, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<span class="text-gray-500" data-v-d8e7c2b9${_scopeId3}>${ssrInterpolate(data.created_at)}</span>`);
                        } else {
                          return [
                            createVNode("span", { class: "text-gray-500" }, toDisplayString(data.created_at), 1)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_Column, {
                        field: "invoice_no",
                        header: "Invoice No",
                        filterField: "invoice_no",
                        style: { "min-width": "10rem" }
                      }, {
                        body: withCtx(({ data }) => [
                          createVNode("span", { class: "font-mono" }, toDisplayString(data.invoice_no ?? "—"), 1)
                        ]),
                        filter: withCtx(({ filterModel, filterCallback }) => [
                          createVNode(_sfc_main$2, {
                            modelValue: filterModel.value,
                            "onUpdate:modelValue": ($event) => filterModel.value = $event,
                            onInput: ($event) => filterCallback(),
                            placeholder: "Search INV"
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "onInput"])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_Column, {
                        field: "user_name",
                        header: "Customer",
                        filterField: "user_name",
                        style: { "min-width": "12rem" }
                      }, {
                        body: withCtx(({ data }) => [
                          createVNode("div", null, [
                            createVNode("div", null, toDisplayString(data.user_name ?? "—"), 1),
                            createVNode("div", { class: "text-gray-400" }, toDisplayString(data.user_email), 1)
                          ])
                        ]),
                        filter: withCtx(({ filterModel, filterCallback }) => [
                          createVNode(_sfc_main$2, {
                            modelValue: filterModel.value,
                            "onUpdate:modelValue": ($event) => filterModel.value = $event,
                            onInput: ($event) => filterCallback(),
                            placeholder: "Search name"
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "onInput"])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_Column, {
                        field: "provider",
                        header: "Provider",
                        filterField: "provider",
                        style: { "min-width": "9rem" }
                      }, {
                        body: withCtx(({ data }) => [
                          createVNode("span", { class: "font-mono font-semibold uppercase" }, toDisplayString(providerLabel[data.provider] ?? data.provider), 1)
                        ]),
                        filter: withCtx(({ filterModel, filterCallback }) => [
                          createVNode(_component_Select, {
                            modelValue: filterModel.value,
                            "onUpdate:modelValue": ($event) => filterModel.value = $event,
                            options: providers,
                            placeholder: "All",
                            showClear: "",
                            size: "small",
                            class: "w-full",
                            onChange: ($event) => filterCallback()
                          }, {
                            option: withCtx(({ option }) => [
                              createTextVNode(toDisplayString(providerLabel[option] ?? option), 1)
                            ]),
                            value: withCtx(({ value }) => [
                              createTextVNode(toDisplayString(value ? providerLabel[value] ?? value : "All"), 1)
                            ]),
                            _: 1
                          }, 8, ["modelValue", "onUpdate:modelValue", "onChange"])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_Column, {
                        field: "status",
                        header: "Status",
                        filterField: "status",
                        style: { "min-width": "9rem" }
                      }, {
                        body: withCtx(({ data }) => [
                          createVNode(_component_Tag, {
                            value: data.status,
                            severity: statusSeverity[data.status] ?? "secondary",
                            class: "capitalize"
                          }, null, 8, ["value", "severity"])
                        ]),
                        filter: withCtx(({ filterModel, filterCallback }) => [
                          createVNode(_component_Select, {
                            modelValue: filterModel.value,
                            "onUpdate:modelValue": ($event) => filterModel.value = $event,
                            options: statuses,
                            placeholder: "All",
                            showClear: "",
                            size: "small",
                            class: "w-full",
                            onChange: ($event) => filterCallback()
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "onChange"])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_Column, {
                        field: "amount",
                        header: "Amount",
                        style: { "min-width": "8rem" }
                      }, {
                        body: withCtx(({ data }) => [
                          createVNode("span", { class: "font-semibold" }, toDisplayString(data.amount) + " " + toDisplayString(data.currency), 1)
                        ]),
                        _: 1
                      }),
                      createVNode(_component_Column, {
                        field: "payment_method",
                        header: "Method",
                        style: { "min-width": "8rem" }
                      }, {
                        body: withCtx(({ data }) => [
                          createTextVNode(toDisplayString(data.payment_method ?? "—"), 1)
                        ]),
                        _: 1
                      }),
                      createVNode(_component_Column, {
                        field: "transaction_id",
                        header: "Transaction ID",
                        style: { "min-width": "13rem" }
                      }, {
                        body: withCtx(({ data }) => [
                          createVNode("span", { class: "font-mono text-gray-500 break-all" }, toDisplayString(data.transaction_id ?? "—"), 1)
                        ]),
                        _: 1
                      }),
                      createVNode(_component_Column, {
                        field: "delivery_type",
                        header: "Delivery",
                        style: { "min-width": "9rem" }
                      }, {
                        body: withCtx(({ data }) => [
                          data.delivery_type ? (openBlock(), createBlock("span", {
                            key: 0,
                            class: "capitalize"
                          }, toDisplayString(data.delivery_type) + " (" + toDisplayString(data.delivery_cost) + " ₾)", 1)) : (openBlock(), createBlock("span", { key: 1 }, "—"))
                        ]),
                        _: 1
                      }),
                      createVNode(_component_Column, {
                        field: "processed_at",
                        header: "Processed",
                        style: { "min-width": "12rem" }
                      }, {
                        body: withCtx(({ data }) => [
                          createVNode("span", { class: "text-gray-500" }, toDisplayString(data.processed_at ?? "—"), 1)
                        ]),
                        _: 1
                      }),
                      createVNode(_component_Column, {
                        field: "created_at",
                        header: "Date",
                        style: { "min-width": "12rem" }
                      }, {
                        body: withCtx(({ data }) => [
                          createVNode("span", { class: "text-gray-500" }, toDisplayString(data.created_at), 1)
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
              _push2(`<div class="flex flex-col items-center justify-center h-64 bg-white rounded-xl border border-gray-200" data-v-d8e7c2b9${_scopeId}><i class="pi pi-credit-card text-6xl text-gray-300 mb-4" data-v-d8e7c2b9${_scopeId}></i><h3 class="text-xl font-semibold text-gray-500" data-v-d8e7c2b9${_scopeId}>No payments found</h3></div>`);
            }
          } else {
            return [
              __props.payments?.length > 0 ? (openBlock(), createBlock("div", {
                key: 0,
                class: "rounded-xl border border-gray-200 overflow-hidden"
              }, [
                createVNode(_component_DataTable, {
                  filters: filters.value,
                  "onUpdate:filters": ($event) => filters.value = $event,
                  filterDisplay: "row",
                  scrollable: "",
                  value: __props.payments,
                  paginator: "",
                  rows: 15,
                  dataKey: "id",
                  tableStyle: "min-width: 50rem",
                  ref_key: "dt",
                  ref: dt,
                  class: "text-sm"
                }, {
                  header: withCtx(() => [
                    createVNode("div", { class: "flex flex-wrap items-center justify-between gap-2" }, [
                      createVNode("h2", { class: "text-lg font-semibold text-gray-900" }, toDisplayString(__props.paymentsCount) + " Payments", 1),
                      createVNode(_component_Button, {
                        icon: "pi pi-file-export",
                        size: "small",
                        label: "Export",
                        onClick: exportCSV
                      })
                    ])
                  ]),
                  default: withCtx(() => [
                    createVNode(_component_Column, {
                      field: "invoice_no",
                      header: "Invoice No",
                      filterField: "invoice_no",
                      style: { "min-width": "10rem" }
                    }, {
                      body: withCtx(({ data }) => [
                        createVNode("span", { class: "font-mono" }, toDisplayString(data.invoice_no ?? "—"), 1)
                      ]),
                      filter: withCtx(({ filterModel, filterCallback }) => [
                        createVNode(_sfc_main$2, {
                          modelValue: filterModel.value,
                          "onUpdate:modelValue": ($event) => filterModel.value = $event,
                          onInput: ($event) => filterCallback(),
                          placeholder: "Search INV"
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "onInput"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_Column, {
                      field: "user_name",
                      header: "Customer",
                      filterField: "user_name",
                      style: { "min-width": "12rem" }
                    }, {
                      body: withCtx(({ data }) => [
                        createVNode("div", null, [
                          createVNode("div", null, toDisplayString(data.user_name ?? "—"), 1),
                          createVNode("div", { class: "text-gray-400" }, toDisplayString(data.user_email), 1)
                        ])
                      ]),
                      filter: withCtx(({ filterModel, filterCallback }) => [
                        createVNode(_sfc_main$2, {
                          modelValue: filterModel.value,
                          "onUpdate:modelValue": ($event) => filterModel.value = $event,
                          onInput: ($event) => filterCallback(),
                          placeholder: "Search name"
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "onInput"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_Column, {
                      field: "provider",
                      header: "Provider",
                      filterField: "provider",
                      style: { "min-width": "9rem" }
                    }, {
                      body: withCtx(({ data }) => [
                        createVNode("span", { class: "font-mono font-semibold uppercase" }, toDisplayString(providerLabel[data.provider] ?? data.provider), 1)
                      ]),
                      filter: withCtx(({ filterModel, filterCallback }) => [
                        createVNode(_component_Select, {
                          modelValue: filterModel.value,
                          "onUpdate:modelValue": ($event) => filterModel.value = $event,
                          options: providers,
                          placeholder: "All",
                          showClear: "",
                          size: "small",
                          class: "w-full",
                          onChange: ($event) => filterCallback()
                        }, {
                          option: withCtx(({ option }) => [
                            createTextVNode(toDisplayString(providerLabel[option] ?? option), 1)
                          ]),
                          value: withCtx(({ value }) => [
                            createTextVNode(toDisplayString(value ? providerLabel[value] ?? value : "All"), 1)
                          ]),
                          _: 1
                        }, 8, ["modelValue", "onUpdate:modelValue", "onChange"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_Column, {
                      field: "status",
                      header: "Status",
                      filterField: "status",
                      style: { "min-width": "9rem" }
                    }, {
                      body: withCtx(({ data }) => [
                        createVNode(_component_Tag, {
                          value: data.status,
                          severity: statusSeverity[data.status] ?? "secondary",
                          class: "capitalize"
                        }, null, 8, ["value", "severity"])
                      ]),
                      filter: withCtx(({ filterModel, filterCallback }) => [
                        createVNode(_component_Select, {
                          modelValue: filterModel.value,
                          "onUpdate:modelValue": ($event) => filterModel.value = $event,
                          options: statuses,
                          placeholder: "All",
                          showClear: "",
                          size: "small",
                          class: "w-full",
                          onChange: ($event) => filterCallback()
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "onChange"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_Column, {
                      field: "amount",
                      header: "Amount",
                      style: { "min-width": "8rem" }
                    }, {
                      body: withCtx(({ data }) => [
                        createVNode("span", { class: "font-semibold" }, toDisplayString(data.amount) + " " + toDisplayString(data.currency), 1)
                      ]),
                      _: 1
                    }),
                    createVNode(_component_Column, {
                      field: "payment_method",
                      header: "Method",
                      style: { "min-width": "8rem" }
                    }, {
                      body: withCtx(({ data }) => [
                        createTextVNode(toDisplayString(data.payment_method ?? "—"), 1)
                      ]),
                      _: 1
                    }),
                    createVNode(_component_Column, {
                      field: "transaction_id",
                      header: "Transaction ID",
                      style: { "min-width": "13rem" }
                    }, {
                      body: withCtx(({ data }) => [
                        createVNode("span", { class: "font-mono text-gray-500 break-all" }, toDisplayString(data.transaction_id ?? "—"), 1)
                      ]),
                      _: 1
                    }),
                    createVNode(_component_Column, {
                      field: "delivery_type",
                      header: "Delivery",
                      style: { "min-width": "9rem" }
                    }, {
                      body: withCtx(({ data }) => [
                        data.delivery_type ? (openBlock(), createBlock("span", {
                          key: 0,
                          class: "capitalize"
                        }, toDisplayString(data.delivery_type) + " (" + toDisplayString(data.delivery_cost) + " ₾)", 1)) : (openBlock(), createBlock("span", { key: 1 }, "—"))
                      ]),
                      _: 1
                    }),
                    createVNode(_component_Column, {
                      field: "processed_at",
                      header: "Processed",
                      style: { "min-width": "12rem" }
                    }, {
                      body: withCtx(({ data }) => [
                        createVNode("span", { class: "text-gray-500" }, toDisplayString(data.processed_at ?? "—"), 1)
                      ]),
                      _: 1
                    }),
                    createVNode(_component_Column, {
                      field: "created_at",
                      header: "Date",
                      style: { "min-width": "12rem" }
                    }, {
                      body: withCtx(({ data }) => [
                        createVNode("span", { class: "text-gray-500" }, toDisplayString(data.created_at), 1)
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["filters", "onUpdate:filters", "value"])
              ])) : (openBlock(), createBlock("div", {
                key: 1,
                class: "flex flex-col items-center justify-center h-64 bg-white rounded-xl border border-gray-200"
              }, [
                createVNode("i", { class: "pi pi-credit-card text-6xl text-gray-300 mb-4" }),
                createVNode("h3", { class: "text-xl font-semibold text-gray-500" }, "No payments found")
              ]))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/payments/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-d8e7c2b9"]]);
export {
  Index as default
};
//# sourceMappingURL=Index-B2jM8GrU.js.map
