import { s as script$4 } from "./index-hSjFFc9a.js";
import { s as script$2, a as script$3 } from "./index-dkMbGzYi.js";
import { s as script$1 } from "./index-C0PiRRRi.js";
import { s as script } from "./index-nsBhLTBN.js";
import { ref, mergeProps, withCtx, createTextVNode, toDisplayString, createVNode, openBlock, createBlock, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr } from "vue/server-renderer";
import { u as useToast } from "./index-Qb24q4w2.js";
import "@primeuix/utils";
import "@primeuix/utils/object";
import "@primevue/icons/spinner";
import "@primevue/core/basecomponent";
import "@primeuix/styles/badge";
import "@primevue/core/base/style";
import "./index-BWQ0UkXI.js";
import "@primeuix/utils/dom";
import "@primevue/core/basedirective";
import "@primeuix/styles/ripple";
import "@primeuix/styles/button";
import "@primevue/core/api";
import "@primevue/core/utils";
import "@primevue/icons/arrowdown";
import "@primevue/icons/arrowup";
import "./index-PXeQwkTt.js";
import "@primeuix/styles/paginator";
import "@primevue/icons/angledoubleleft";
import "./index-DOeVcSWx.js";
import "@primeuix/utils/zindex";
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
import "@primevue/icons/sortalt";
import "@primevue/icons/sortamountdown";
import "@primevue/icons/sortamountupalt";
import "@primeuix/styles/tag";
import "@primevue/icons/windowmaximize";
import "@primevue/icons/windowminimize";
import "@primeuix/styled";
import "@primeuix/styles/dialog";
const _sfc_main = {
  __name: "OrderDetailDialog",
  __ssrInlineRender: true,
  setup(__props, { expose: __expose }) {
    const toast = useToast();
    const visible = ref(false);
    const loading = ref(false);
    const order = ref(null);
    async function open(id) {
      loading.value = true;
      visible.value = true;
      order.value = null;
      try {
        const res = await axios.get(route("user-orders.show", id));
        order.value = res.data.order;
      } catch {
        toast.add({ severity: "error", summary: "შეცდომა", detail: "შეკვეთის ჩატვირთვა ვერ მოხერხდა.", life: 3e3 });
        visible.value = false;
      } finally {
        loading.value = false;
      }
    }
    __expose({ open });
    const statusSeverity = {
      awaiting_payment: "secondary",
      pending: "warn",
      paid: "info",
      ready: "success",
      cancelled: "danger"
    };
    const statusLabel = {
      awaiting_payment: "გადახდის მოლოდინში",
      pending: "დაუდასტურებელი",
      paid: "გადახდილი",
      ready: "მზადაა",
      cancelled: "გაუქმებული",
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
      const _component_Dialog = script;
      const _component_Tag = script$1;
      const _component_DataTable = script$2;
      const _component_Column = script$3;
      const _component_Button = script$4;
      _push(ssrRenderComponent(_component_Dialog, mergeProps({
        visible: visible.value,
        "onUpdate:visible": ($event) => visible.value = $event,
        modal: "",
        header: order.value ? `შეკვეთა #${order.value.invoice_no ?? order.value.id?.slice(0, 8)}` : "შეკვეთის დეტალები",
        class: "w-[95%] sm:w-[75%] lg:w-[58%]",
        "pt:header:class": "border-b border-gray-100"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (loading.value) {
              _push2(`<div class="flex flex-col items-center justify-center py-16 gap-3"${_scopeId}><i class="pi pi-spinner pi-spin text-4xl text-brand-400"${_scopeId}></i><span class="text-sm text-gray-400"${_scopeId}>იტვირთება...</span></div>`);
            } else if (order.value) {
              _push2(`<div class="text-sm"${_scopeId}><div class="flex items-center justify-between bg-brand-50 border-b border-brand-100 px-5 py-3 -mx-5 -mt-1 mb-5"${_scopeId}><div class="flex items-center gap-2 text-brand-700"${_scopeId}><i class="pi pi-calendar text-xs"${_scopeId}></i><span class="text-xs"${_scopeId}>${ssrInterpolate(order.value.created_at)}</span></div>`);
              _push2(ssrRenderComponent(_component_Tag, {
                value: statusLabel[order.value.status] ?? order.value.status,
                severity: statusSeverity[order.value.status]
              }, null, _parent2, _scopeId));
              _push2(`</div><div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4"${_scopeId}><div class="border border-gray-200 rounded-xl overflow-hidden"${_scopeId}><div class="flex items-center gap-2 bg-gray-50 border-b border-gray-200 px-3 py-2"${_scopeId}><i class="pi pi-truck text-brand-500 text-xs"${_scopeId}></i><span class="font-semibold text-gray-700 text-xs uppercase tracking-wide"${_scopeId}>მიწოდება</span></div><div class="px-3 py-3 space-y-1.5"${_scopeId}><p class="font-semibold text-gray-800"${_scopeId}>${ssrInterpolate(deliveryLabel[order.value.delivery_type] ?? order.value.delivery_type)}</p>`);
              if (order.value.address) {
                _push2(`<p class="flex items-start gap-1.5 text-gray-500"${_scopeId}><i class="pi pi-map-marker text-xs text-brand-400 mt-0.5"${_scopeId}></i> ${ssrInterpolate(order.value.address)}`);
                if (order.value.apartment_number) {
                  _push2(`<span${_scopeId}>, apt ${ssrInterpolate(order.value.apartment_number)}</span>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<p class="flex items-center gap-1.5 text-gray-500"${_scopeId}><i class="pi pi-tag text-xs text-brand-400"${_scopeId}></i> მიწოდება: <span class="font-medium text-gray-700 ml-1"${_scopeId}>${ssrInterpolate(order.value.delivery_cost)} ₾</span></p></div></div>`);
              if (order.value.payment) {
                _push2(`<div class="border border-blue-200 rounded-xl overflow-hidden"${_scopeId}><div class="flex items-center gap-2 bg-blue-50 border-b border-blue-200 px-3 py-2"${_scopeId}><i class="pi pi-credit-card text-blue-500 text-xs"${_scopeId}></i><span class="font-semibold text-blue-700 text-xs uppercase tracking-wide"${_scopeId}>გადახდა</span></div><div class="px-3 py-3 flex flex-wrap gap-5 text-gray-600"${_scopeId}><div${_scopeId}><p class="text-xs text-gray-400 mb-0.5"${_scopeId}>პროვაიდერი</p><p class="font-semibold text-gray-800"${_scopeId}>${ssrInterpolate(providerLabel[order.value.payment.provider] ?? order.value.payment.provider)}</p></div><div${_scopeId}><p class="text-xs text-gray-400 mb-0.5"${_scopeId}>სტატუსი</p>`);
                _push2(ssrRenderComponent(_component_Tag, {
                  value: order.value.payment.status === "completed" ? "დასრულებული" : order.value.payment.status,
                  severity: order.value.payment.status === "completed" ? "success" : "warn",
                  class: "text-xs"
                }, null, _parent2, _scopeId));
                _push2(`</div>`);
                if (order.value.payment.transaction_id) {
                  _push2(`<div${_scopeId}><p class="text-xs text-gray-400 mb-0.5"${_scopeId}>ტრანზაქციის ID</p><code class="text-xs bg-gray-100 px-2 py-0.5 rounded text-gray-700"${_scopeId}>${ssrInterpolate(order.value.payment.transaction_id)}</code></div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
              if (order.value.comment) {
                _push2(`<div class="border border-brand-200 rounded-xl overflow-hidden mb-4"${_scopeId}><div class="flex items-center gap-2 bg-brand-50 border-b border-brand-200 px-3 py-2"${_scopeId}><i class="pi pi-comment text-brand-500 text-xs"${_scopeId}></i><span class="font-semibold text-brand-700 text-xs uppercase tracking-wide"${_scopeId}>კომენტარი</span></div><p class="px-3 py-3 text-gray-600 italic"${_scopeId}>${ssrInterpolate(order.value.comment)}</p></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div class="border border-gray-200 rounded-xl overflow-hidden mb-4"${_scopeId}><div class="flex items-center gap-2 bg-gray-50 border-b border-gray-200 px-3 py-2"${_scopeId}><i class="pi pi-shopping-bag text-brand-500 text-xs"${_scopeId}></i><span class="font-semibold text-gray-700 text-xs uppercase tracking-wide"${_scopeId}>პროდუქცია</span></div>`);
              _push2(ssrRenderComponent(_component_DataTable, {
                value: order.value.items,
                size: "small",
                class: "text-sm"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_Column, {
                      field: "item_no",
                      header: "კოდი",
                      style: { "min-width": "10rem" }
                    }, null, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_Column, {
                      field: "item_name",
                      header: "დასახელება",
                      style: { "min-width": "16rem" }
                    }, null, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_Column, {
                      field: "quantity",
                      header: "რაოდ."
                    }, null, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_Column, {
                      field: "unit_price",
                      header: "ერთ. ფასი",
                      style: { "min-width": "7rem" }
                    }, {
                      body: withCtx(({ data }, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(data.unit_price)} ₾`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(data.unit_price) + " ₾", 1)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_Column, {
                      field: "subtotal",
                      header: "სულ",
                      style: { "min-width": "7rem" }
                    }, {
                      body: withCtx(({ data }, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<span class="font-semibold text-gray-800"${_scopeId3}>${ssrInterpolate(data.subtotal)} ₾</span>`);
                        } else {
                          return [
                            createVNode("span", { class: "font-semibold text-gray-800" }, toDisplayString(data.subtotal) + " ₾", 1)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_Column, {
                        field: "item_no",
                        header: "კოდი",
                        style: { "min-width": "10rem" }
                      }),
                      createVNode(_component_Column, {
                        field: "item_name",
                        header: "დასახელება",
                        style: { "min-width": "16rem" }
                      }),
                      createVNode(_component_Column, {
                        field: "quantity",
                        header: "რაოდ."
                      }),
                      createVNode(_component_Column, {
                        field: "unit_price",
                        header: "ერთ. ფასი",
                        style: { "min-width": "7rem" }
                      }, {
                        body: withCtx(({ data }) => [
                          createTextVNode(toDisplayString(data.unit_price) + " ₾", 1)
                        ]),
                        _: 1
                      }),
                      createVNode(_component_Column, {
                        field: "subtotal",
                        header: "სულ",
                        style: { "min-width": "7rem" }
                      }, {
                        body: withCtx(({ data }) => [
                          createVNode("span", { class: "font-semibold text-gray-800" }, toDisplayString(data.subtotal) + " ₾", 1)
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`<div class="px-4 py-3 border-t border-gray-200 bg-gray-50 space-y-1.5"${_scopeId}>`);
              if (order.value.wholesale_discount > 0) {
                _push2(`<div class="flex justify-between text-sm text-gray-500"${_scopeId}><span${_scopeId}>ჯამი</span><span${_scopeId}><span class="line-through text-gray-400 mr-1"${_scopeId}>${ssrInterpolate((Number(order.value.subtotal) + Number(order.value.wholesale_discount)).toFixed(2))} ₾</span><span class="font-medium text-emerald-600"${_scopeId}>${ssrInterpolate(order.value.subtotal)} ₾</span></span></div>`);
              } else {
                _push2(`<div class="flex justify-between text-sm text-gray-500"${_scopeId}><span${_scopeId}>ჯამი</span><span class="font-medium text-gray-700"${_scopeId}>${ssrInterpolate(order.value.subtotal)} ₾</span></div>`);
              }
              if (order.value.wholesale_discount > 0) {
                _push2(`<div class="flex justify-between text-sm text-emerald-600"${_scopeId}><span${_scopeId}>საბითუმო ფასდაკლება</span><span class="font-medium"${_scopeId}>-${ssrInterpolate(order.value.wholesale_discount)} ₾</span></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div class="flex justify-between text-sm text-gray-500"${_scopeId}><span${_scopeId}>მიწოდება</span><span class="font-medium text-gray-700"${_scopeId}>${ssrInterpolate(order.value.delivery_cost)} ₾</span></div><div class="flex justify-between text-sm font-bold text-gray-800 border-t border-gray-200 pt-1.5 mt-1"${_scopeId}><span${_scopeId}>სულ</span><span class="text-brand-600 text-base"${_scopeId}>${ssrInterpolate(order.value.total)} ₾</span></div></div></div>`);
              if (order.value.payment?.provider === "invoice" && order.value.payment?.invoice_no) {
                _push2(`<div class="flex justify-end"${_scopeId}><a${ssrRenderAttr("href", _ctx.route("download.file", order.value.payment.invoice_no))} target="_blank"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_Button, {
                  label: "ინვოისის ჩამოტვირთვა",
                  icon: "pi pi-download",
                  severity: "secondary",
                  size: "small",
                  outlined: ""
                }, null, _parent2, _scopeId));
                _push2(`</a></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              loading.value ? (openBlock(), createBlock("div", {
                key: 0,
                class: "flex flex-col items-center justify-center py-16 gap-3"
              }, [
                createVNode("i", { class: "pi pi-spinner pi-spin text-4xl text-brand-400" }),
                createVNode("span", { class: "text-sm text-gray-400" }, "იტვირთება...")
              ])) : order.value ? (openBlock(), createBlock("div", {
                key: 1,
                class: "text-sm"
              }, [
                createVNode("div", { class: "flex items-center justify-between bg-brand-50 border-b border-brand-100 px-5 py-3 -mx-5 -mt-1 mb-5" }, [
                  createVNode("div", { class: "flex items-center gap-2 text-brand-700" }, [
                    createVNode("i", { class: "pi pi-calendar text-xs" }),
                    createVNode("span", { class: "text-xs" }, toDisplayString(order.value.created_at), 1)
                  ]),
                  createVNode(_component_Tag, {
                    value: statusLabel[order.value.status] ?? order.value.status,
                    severity: statusSeverity[order.value.status]
                  }, null, 8, ["value", "severity"])
                ]),
                createVNode("div", { class: "grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4" }, [
                  createVNode("div", { class: "border border-gray-200 rounded-xl overflow-hidden" }, [
                    createVNode("div", { class: "flex items-center gap-2 bg-gray-50 border-b border-gray-200 px-3 py-2" }, [
                      createVNode("i", { class: "pi pi-truck text-brand-500 text-xs" }),
                      createVNode("span", { class: "font-semibold text-gray-700 text-xs uppercase tracking-wide" }, "მიწოდება")
                    ]),
                    createVNode("div", { class: "px-3 py-3 space-y-1.5" }, [
                      createVNode("p", { class: "font-semibold text-gray-800" }, toDisplayString(deliveryLabel[order.value.delivery_type] ?? order.value.delivery_type), 1),
                      order.value.address ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "flex items-start gap-1.5 text-gray-500"
                      }, [
                        createVNode("i", { class: "pi pi-map-marker text-xs text-brand-400 mt-0.5" }),
                        createTextVNode(" " + toDisplayString(order.value.address), 1),
                        order.value.apartment_number ? (openBlock(), createBlock("span", { key: 0 }, ", apt " + toDisplayString(order.value.apartment_number), 1)) : createCommentVNode("", true)
                      ])) : createCommentVNode("", true),
                      createVNode("p", { class: "flex items-center gap-1.5 text-gray-500" }, [
                        createVNode("i", { class: "pi pi-tag text-xs text-brand-400" }),
                        createTextVNode(" მიწოდება: "),
                        createVNode("span", { class: "font-medium text-gray-700 ml-1" }, toDisplayString(order.value.delivery_cost) + " ₾", 1)
                      ])
                    ])
                  ]),
                  order.value.payment ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "border border-blue-200 rounded-xl overflow-hidden"
                  }, [
                    createVNode("div", { class: "flex items-center gap-2 bg-blue-50 border-b border-blue-200 px-3 py-2" }, [
                      createVNode("i", { class: "pi pi-credit-card text-blue-500 text-xs" }),
                      createVNode("span", { class: "font-semibold text-blue-700 text-xs uppercase tracking-wide" }, "გადახდა")
                    ]),
                    createVNode("div", { class: "px-3 py-3 flex flex-wrap gap-5 text-gray-600" }, [
                      createVNode("div", null, [
                        createVNode("p", { class: "text-xs text-gray-400 mb-0.5" }, "პროვაიდერი"),
                        createVNode("p", { class: "font-semibold text-gray-800" }, toDisplayString(providerLabel[order.value.payment.provider] ?? order.value.payment.provider), 1)
                      ]),
                      createVNode("div", null, [
                        createVNode("p", { class: "text-xs text-gray-400 mb-0.5" }, "სტატუსი"),
                        createVNode(_component_Tag, {
                          value: order.value.payment.status === "completed" ? "დასრულებული" : order.value.payment.status,
                          severity: order.value.payment.status === "completed" ? "success" : "warn",
                          class: "text-xs"
                        }, null, 8, ["value", "severity"])
                      ]),
                      order.value.payment.transaction_id ? (openBlock(), createBlock("div", { key: 0 }, [
                        createVNode("p", { class: "text-xs text-gray-400 mb-0.5" }, "ტრანზაქციის ID"),
                        createVNode("code", { class: "text-xs bg-gray-100 px-2 py-0.5 rounded text-gray-700" }, toDisplayString(order.value.payment.transaction_id), 1)
                      ])) : createCommentVNode("", true)
                    ])
                  ])) : createCommentVNode("", true)
                ]),
                order.value.comment ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "border border-brand-200 rounded-xl overflow-hidden mb-4"
                }, [
                  createVNode("div", { class: "flex items-center gap-2 bg-brand-50 border-b border-brand-200 px-3 py-2" }, [
                    createVNode("i", { class: "pi pi-comment text-brand-500 text-xs" }),
                    createVNode("span", { class: "font-semibold text-brand-700 text-xs uppercase tracking-wide" }, "კომენტარი")
                  ]),
                  createVNode("p", { class: "px-3 py-3 text-gray-600 italic" }, toDisplayString(order.value.comment), 1)
                ])) : createCommentVNode("", true),
                createVNode("div", { class: "border border-gray-200 rounded-xl overflow-hidden mb-4" }, [
                  createVNode("div", { class: "flex items-center gap-2 bg-gray-50 border-b border-gray-200 px-3 py-2" }, [
                    createVNode("i", { class: "pi pi-shopping-bag text-brand-500 text-xs" }),
                    createVNode("span", { class: "font-semibold text-gray-700 text-xs uppercase tracking-wide" }, "პროდუქცია")
                  ]),
                  createVNode(_component_DataTable, {
                    value: order.value.items,
                    size: "small",
                    class: "text-sm"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_Column, {
                        field: "item_no",
                        header: "კოდი",
                        style: { "min-width": "10rem" }
                      }),
                      createVNode(_component_Column, {
                        field: "item_name",
                        header: "დასახელება",
                        style: { "min-width": "16rem" }
                      }),
                      createVNode(_component_Column, {
                        field: "quantity",
                        header: "რაოდ."
                      }),
                      createVNode(_component_Column, {
                        field: "unit_price",
                        header: "ერთ. ფასი",
                        style: { "min-width": "7rem" }
                      }, {
                        body: withCtx(({ data }) => [
                          createTextVNode(toDisplayString(data.unit_price) + " ₾", 1)
                        ]),
                        _: 1
                      }),
                      createVNode(_component_Column, {
                        field: "subtotal",
                        header: "სულ",
                        style: { "min-width": "7rem" }
                      }, {
                        body: withCtx(({ data }) => [
                          createVNode("span", { class: "font-semibold text-gray-800" }, toDisplayString(data.subtotal) + " ₾", 1)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }, 8, ["value"]),
                  createVNode("div", { class: "px-4 py-3 border-t border-gray-200 bg-gray-50 space-y-1.5" }, [
                    order.value.wholesale_discount > 0 ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "flex justify-between text-sm text-gray-500"
                    }, [
                      createVNode("span", null, "ჯამი"),
                      createVNode("span", null, [
                        createVNode("span", { class: "line-through text-gray-400 mr-1" }, toDisplayString((Number(order.value.subtotal) + Number(order.value.wholesale_discount)).toFixed(2)) + " ₾", 1),
                        createVNode("span", { class: "font-medium text-emerald-600" }, toDisplayString(order.value.subtotal) + " ₾", 1)
                      ])
                    ])) : (openBlock(), createBlock("div", {
                      key: 1,
                      class: "flex justify-between text-sm text-gray-500"
                    }, [
                      createVNode("span", null, "ჯამი"),
                      createVNode("span", { class: "font-medium text-gray-700" }, toDisplayString(order.value.subtotal) + " ₾", 1)
                    ])),
                    order.value.wholesale_discount > 0 ? (openBlock(), createBlock("div", {
                      key: 2,
                      class: "flex justify-between text-sm text-emerald-600"
                    }, [
                      createVNode("span", null, "საბითუმო ფასდაკლება"),
                      createVNode("span", { class: "font-medium" }, "-" + toDisplayString(order.value.wholesale_discount) + " ₾", 1)
                    ])) : createCommentVNode("", true),
                    createVNode("div", { class: "flex justify-between text-sm text-gray-500" }, [
                      createVNode("span", null, "მიწოდება"),
                      createVNode("span", { class: "font-medium text-gray-700" }, toDisplayString(order.value.delivery_cost) + " ₾", 1)
                    ]),
                    createVNode("div", { class: "flex justify-between text-sm font-bold text-gray-800 border-t border-gray-200 pt-1.5 mt-1" }, [
                      createVNode("span", null, "სულ"),
                      createVNode("span", { class: "text-brand-600 text-base" }, toDisplayString(order.value.total) + " ₾", 1)
                    ])
                  ])
                ]),
                order.value.payment?.provider === "invoice" && order.value.payment?.invoice_no ? (openBlock(), createBlock("div", {
                  key: 1,
                  class: "flex justify-end"
                }, [
                  createVNode("a", {
                    href: _ctx.route("download.file", order.value.payment.invoice_no),
                    target: "_blank"
                  }, [
                    createVNode(_component_Button, {
                      label: "ინვოისის ჩამოტვირთვა",
                      icon: "pi pi-download",
                      severity: "secondary",
                      size: "small",
                      outlined: ""
                    })
                  ], 8, ["href"])
                ])) : createCommentVNode("", true)
              ])) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/UserOrders/OrderDetailDialog.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=OrderDetailDialog-Vg0Dgncs.js.map
