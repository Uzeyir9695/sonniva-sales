import { s as script$1 } from "./index-YvTnrAwi.js";
import { s as script } from "./index-C0PiRRRi.js";
import { s as script$2 } from "./index-CvFud99G.js";
import { ref, unref, withCtx, openBlock, createBlock, createVNode, toDisplayString, createCommentVNode, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderAttr } from "vue/server-renderer";
import { Head, Deferred } from "@inertiajs/vue3";
import { _ as _sfc_main$3 } from "./Paginate-DBEcn-DS.js";
import _sfc_main$1 from "./OrderDetailDialog-BxuLNtQU.js";
import _sfc_main$2 from "./ReorderDialog-CRmHH0nI.js";
import "@primeuix/utils";
import "@primeuix/utils/object";
import "@primevue/icons/spinner";
import "@primevue/core/basecomponent";
import "@primeuix/styles/badge";
import "@primevue/core/base/style";
import "@primeuix/utils/dom";
import "@primevue/core/basedirective";
import "@primeuix/styles/ripple";
import "@primeuix/styles/button";
import "@primeuix/styles/tag";
import "@primeuix/styles/skeleton";
import "./index-BUhsrrXV.js";
import "@primeuix/styles/paginator";
import "@primevue/icons/angledoubleleft";
import "./index--B3DAMqV.js";
import "@primeuix/utils/zindex";
import "@primevue/core/api";
import "@primevue/core/utils";
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
import "./index-D46B4f3g.js";
import "@primevue/icons/windowmaximize";
import "@primevue/icons/windowminimize";
import "@primeuix/styled";
import "@primeuix/styles/dialog";
import "./index-Qb24q4w2.js";
import "vue-i18n";
import "./numberFormat-BgUHwZc2.js";
import "./index-BzRznsIW.js";
import "@primevue/icons/minus";
import "@primeuix/styles/checkbox";
import "./useCart-CLT7fb2x.js";
import "axios";
const MAX_ITEM_IMAGES = 5;
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    orders: Object,
    ordersSummary: Object
  },
  setup(__props) {
    const detailDialog = ref(null);
    const reorderDialog = ref(null);
    const statusSeverity = {
      pending: "warn",
      paid: "info",
      ready: "success",
      dispatched: "info",
      delivered: "success",
      cancelled: "danger"
    };
    const statusLabelKey = {
      pending: "orders.status.pending",
      paid: "orders.status.paid",
      ready: "orders.status.ready",
      dispatched: "orders.status.dispatched",
      delivered: "orders.status.delivered",
      cancelled: "orders.status.cancelled",
      limit: "orders.status.limit"
    };
    function visibleImages(order) {
      return order.items?.slice(0, MAX_ITEM_IMAGES) ?? [];
    }
    function remainingItemCount(order) {
      return Math.max((order.items?.length ?? 0) - MAX_ITEM_IMAGES, 0);
    }
    function imageUrl(orderItem) {
      return `${orderItem.storage_path}/${orderItem.image}`;
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Skeleton = script$2;
      const _component_Tag = script;
      const _component_Button = script$1;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: _ctx.$t("orders.title")
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, {
        ref_key: "detailDialog",
        ref: detailDialog
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$2, {
        ref_key: "reorderDialog",
        ref: reorderDialog
      }, null, _parent));
      _push(`<div class="py-8 px-4"><h1 class="text-xl font-semibold text-gray-800 mb-6">${ssrInterpolate(_ctx.$t("orders.title"))}</h1>`);
      _push(ssrRenderComponent(unref(Deferred), { data: ["orders", "ordersSummary"] }, {
        fallback: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"${_scopeId}><!--[-->`);
            ssrRenderList(6, (n) => {
              _push2(`<div class="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex flex-col gap-4"${_scopeId}><div class="flex items-start justify-between gap-2"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_Skeleton, {
                height: "0.8rem",
                width: "40%",
                class: "bg-slate-200!",
                borderRadius: "4px"
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_Skeleton, {
                height: "1.4rem",
                width: "5rem",
                class: "bg-slate-200!",
                borderRadius: "999px"
              }, null, _parent2, _scopeId));
              _push2(`</div><div class="flex items-center gap-2"${_scopeId}><!--[-->`);
              ssrRenderList(4, (i) => {
                _push2(ssrRenderComponent(_component_Skeleton, {
                  key: i,
                  height: "3rem",
                  width: "3rem",
                  class: "bg-slate-100!",
                  borderRadius: "8px"
                }, null, _parent2, _scopeId));
              });
              _push2(`<!--]--></div><div class="grid grid-cols-2 gap-3 border-t border-slate-100 pt-3"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_Skeleton, {
                height: "0.7rem",
                width: "70%",
                class: "bg-slate-100!",
                borderRadius: "4px"
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_Skeleton, {
                height: "0.7rem",
                width: "60%",
                class: "bg-slate-100!",
                borderRadius: "4px"
              }, null, _parent2, _scopeId));
              _push2(`</div><div class="flex gap-2 pt-1"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_Skeleton, {
                height: "2.2rem",
                class: "flex-1 bg-slate-100!",
                borderRadius: "8px"
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_Skeleton, {
                height: "2.2rem",
                class: "flex-1 bg-slate-100!",
                borderRadius: "8px"
              }, null, _parent2, _scopeId));
              _push2(`</div></div>`);
            });
            _push2(`<!--]--></div>`);
          } else {
            return [
              createVNode("div", { class: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" }, [
                (openBlock(), createBlock(Fragment, null, renderList(6, (n) => {
                  return createVNode("div", {
                    key: n,
                    class: "bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex flex-col gap-4"
                  }, [
                    createVNode("div", { class: "flex items-start justify-between gap-2" }, [
                      createVNode(_component_Skeleton, {
                        height: "0.8rem",
                        width: "40%",
                        class: "bg-slate-200!",
                        borderRadius: "4px"
                      }),
                      createVNode(_component_Skeleton, {
                        height: "1.4rem",
                        width: "5rem",
                        class: "bg-slate-200!",
                        borderRadius: "999px"
                      })
                    ]),
                    createVNode("div", { class: "flex items-center gap-2" }, [
                      (openBlock(), createBlock(Fragment, null, renderList(4, (i) => {
                        return createVNode(_component_Skeleton, {
                          key: i,
                          height: "3rem",
                          width: "3rem",
                          class: "bg-slate-100!",
                          borderRadius: "8px"
                        });
                      }), 64))
                    ]),
                    createVNode("div", { class: "grid grid-cols-2 gap-3 border-t border-slate-100 pt-3" }, [
                      createVNode(_component_Skeleton, {
                        height: "0.7rem",
                        width: "70%",
                        class: "bg-slate-100!",
                        borderRadius: "4px"
                      }),
                      createVNode(_component_Skeleton, {
                        height: "0.7rem",
                        width: "60%",
                        class: "bg-slate-100!",
                        borderRadius: "4px"
                      })
                    ]),
                    createVNode("div", { class: "flex gap-2 pt-1" }, [
                      createVNode(_component_Skeleton, {
                        height: "2.2rem",
                        class: "flex-1 bg-slate-100!",
                        borderRadius: "8px"
                      }),
                      createVNode(_component_Skeleton, {
                        height: "2.2rem",
                        class: "flex-1 bg-slate-100!",
                        borderRadius: "8px"
                      })
                    ])
                  ]);
                }), 64))
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (__props.orders.data?.some((o) => o.tracking_number)) {
              _push2(`<div class="flex flex-col sm:flex-row sm:items-center gap-2 bg-blue-50 text-blue-700 text-sm px-4 py-3 mb-4 rounded-xl"${_scopeId}><div class="flex items-start gap-2"${_scopeId}><i class="pi pi-info-circle mt-0.5 shrink-0"${_scopeId}></i><span${_scopeId}>${ssrInterpolate(_ctx.$t("orders.trackingBanner"))}</span></div><a href="https://onway.ge/" target="_blank" rel="noopener noreferrer" class="flex items-center gap-1.5 font-semibold underline underline-offset-5 shrink-0"${_scopeId}><i class="pi pi-external-link text-xs"${_scopeId}></i><span${_scopeId}>${ssrInterpolate(_ctx.$t("orders.checkStatus"))}</span></a></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="flex items-center justify-between gap-2 mb-4 flex-wrap"${_scopeId}><span class="font-semibold text-gray-700 text-sm"${_scopeId}>${ssrInterpolate(_ctx.$t("orders.orderCount", { count: __props.orders.total ?? __props.orders.data.length }))}</span>`);
            if (__props.ordersSummary) {
              _push2(`<div class="flex flex-col items-end gap-1.5 text-sm"${_scopeId}><h5 class="font-semibold"${_scopeId}>${ssrInterpolate(_ctx.$t("orders.totalAmount"))}</h5><div class="flex items-center gap-1.5"${_scopeId}>`);
              if (__props.ordersSummary.discount > 0) {
                _push2(`<span class="line-through text-gray-400 text-xs"${_scopeId}>${ssrInterpolate((__props.ordersSummary.total + __props.ordersSummary.discount).toFixed(2))} ₾ </span>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<span class="font-semibold text-gray-800"${_scopeId}>${ssrInterpolate(__props.ordersSummary.total.toFixed(2))} ₾</span>`);
              if (__props.ordersSummary.discount > 0) {
                _push2(`<span class="text-red-600 text-xs font-medium"${_scopeId}> -${ssrInterpolate(__props.ordersSummary.discount.toFixed(2))} ₾ </span>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            if (__props.orders.data?.length) {
              _push2(`<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"${_scopeId}><!--[-->`);
              ssrRenderList(__props.orders.data, (order) => {
                _push2(`<div class="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 p-4 flex flex-col gap-4"${_scopeId}><div class="flex items-start justify-between gap-2"${_scopeId}><div${_scopeId}><p class="text-xs text-gray-400"${_scopeId}>${ssrInterpolate(_ctx.$t("orders.orderNo"))}</p><p class="font-mono text-sm font-semibold text-gray-800"${_scopeId}>${ssrInterpolate(order.invoice_no ?? "—")}</p></div>`);
                _push2(ssrRenderComponent(_component_Tag, {
                  value: statusLabelKey[order.status] ? _ctx.$t(statusLabelKey[order.status]) : order.status,
                  severity: statusSeverity[order.status]
                }, null, _parent2, _scopeId));
                _push2(`</div><div class="flex items-center gap-2"${_scopeId}>`);
                if (order.items?.length) {
                  _push2(`<!--[--><!--[-->`);
                  ssrRenderList(visibleImages(order), (orderItem) => {
                    _push2(`<div class="relative w-16 h-16 rounded-lg border border-gray-100 bg-gray-50 shrink-0"${_scopeId}>`);
                    if (orderItem.image) {
                      _push2(`<img${ssrRenderAttr("src", imageUrl(orderItem))}${ssrRenderAttr("alt", orderItem.name)} class="w-full h-full object-cover rounded-lg"${_scopeId}>`);
                    } else {
                      _push2(`<div class="w-full h-full flex items-center justify-center text-gray-300"${_scopeId}><i class="pi pi-image text-sm"${_scopeId}></i></div>`);
                    }
                    if (orderItem.quantity > 1) {
                      _push2(`<span class="absolute -top-1.5 -right-1.5 min-w-[1.1rem] h-[1.1rem] px-1 rounded-full bg-red-500 text-white text-[10px] leading-[1.1rem] font-semibold text-center shadow"${_scopeId}>x${ssrInterpolate(orderItem.quantity)}</span>`);
                    } else {
                      _push2(`<!---->`);
                    }
                    _push2(`</div>`);
                  });
                  _push2(`<!--]-->`);
                  if (remainingItemCount(order) > 0) {
                    _push2(`<div class="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center text-xs font-semibold text-gray-500 shrink-0"${_scopeId}> +${ssrInterpolate(remainingItemCount(order))}</div>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`<!--]-->`);
                } else {
                  _push2(`<span class="text-xs text-gray-300"${_scopeId}>${ssrInterpolate(_ctx.$t("orders.noProducts"))}</span>`);
                }
                _push2(`</div><div class="grid grid-cols-2 gap-y-2 gap-x-3 text-sm border-t border-gray-100 pt-3"${_scopeId}><div${_scopeId}><p class="text-xs text-gray-400"${_scopeId}>${ssrInterpolate(_ctx.$t("orders.date"))}</p><p class="text-gray-700"${_scopeId}>${ssrInterpolate(order.created_at)}</p></div><div${_scopeId}><p class="text-xs text-gray-400"${_scopeId}>${ssrInterpolate(_ctx.$t("common.total"))}</p>`);
                if (order.discount_total > 0) {
                  _push2(`<div class="flex flex-col gap-0.5"${_scopeId}><span class="line-through text-gray-400 text-xs"${_scopeId}>${ssrInterpolate((Number(order.total) + Number(order.discount_total)).toFixed(2))} ₾</span><span class="font-semibold text-gray-900"${_scopeId}>${ssrInterpolate(order.total)} ₾</span><span class="text-red-600 text-xs font-medium"${_scopeId}>-${ssrInterpolate(Number(order.discount_total).toFixed(2))} ₾</span></div>`);
                } else {
                  _push2(`<p class="font-semibold text-gray-900"${_scopeId}>${ssrInterpolate(order.total)} ₾</p>`);
                }
                _push2(`</div>`);
                if (order.tracking_number) {
                  _push2(`<div class="col-span-2"${_scopeId}><p class="text-xs text-gray-400"${_scopeId}>${ssrInterpolate(_ctx.$t("orders.trackingNumber"))}</p><p class="font-mono text-gray-700"${_scopeId}>${ssrInterpolate(order.tracking_number)}</p></div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div><div class="flex flex-col sm:flex-row items-center justify-between flex-wrap gap-2 mt-auto pt-1"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_Button, {
                  label: _ctx.$t("orders.details"),
                  icon: "pi pi-eye",
                  size: "small",
                  severity: "secondary",
                  class: "2xl:flex-1 w-full hover:bg-blue-500! hover:border-blue-500! hover:text-white!",
                  onClick: ($event) => detailDialog.value.open(order.id)
                }, null, _parent2, _scopeId));
                _push2(ssrRenderComponent(_component_Button, {
                  label: _ctx.$t("orders.reorder"),
                  icon: "pi pi-refresh",
                  size: "small",
                  severity: "secondary",
                  class: "2xl:flex-1 w-full hover:bg-emerald-500! hover:border-emerald-500! hover:text-white!",
                  onClick: ($event) => reorderDialog.value.open(order.id)
                }, null, _parent2, _scopeId));
                _push2(`</div></div>`);
              });
              _push2(`<!--]--></div>`);
            } else {
              _push2(`<div class="flex flex-col items-center justify-center h-60 bg-white rounded-2xl border border-gray-100 shadow-sm"${_scopeId}><i class="pi pi-inbox text-5xl text-gray-300 mb-3"${_scopeId}></i><p class="text-gray-500"${_scopeId}>${ssrInterpolate(_ctx.$t("orders.noOrders"))}</p></div>`);
            }
            _push2(ssrRenderComponent(_sfc_main$3, {
              data: __props.orders,
              class: "mt-4"
            }, null, _parent2, _scopeId));
          } else {
            return [
              __props.orders.data?.some((o) => o.tracking_number) ? (openBlock(), createBlock("div", {
                key: 0,
                class: "flex flex-col sm:flex-row sm:items-center gap-2 bg-blue-50 text-blue-700 text-sm px-4 py-3 mb-4 rounded-xl"
              }, [
                createVNode("div", { class: "flex items-start gap-2" }, [
                  createVNode("i", { class: "pi pi-info-circle mt-0.5 shrink-0" }),
                  createVNode("span", null, toDisplayString(_ctx.$t("orders.trackingBanner")), 1)
                ]),
                createVNode("a", {
                  href: "https://onway.ge/",
                  target: "_blank",
                  rel: "noopener noreferrer",
                  class: "flex items-center gap-1.5 font-semibold underline underline-offset-5 shrink-0"
                }, [
                  createVNode("i", { class: "pi pi-external-link text-xs" }),
                  createVNode("span", null, toDisplayString(_ctx.$t("orders.checkStatus")), 1)
                ])
              ])) : createCommentVNode("", true),
              createVNode("div", { class: "flex items-center justify-between gap-2 mb-4 flex-wrap" }, [
                createVNode("span", { class: "font-semibold text-gray-700 text-sm" }, toDisplayString(_ctx.$t("orders.orderCount", { count: __props.orders.total ?? __props.orders.data.length })), 1),
                __props.ordersSummary ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "flex flex-col items-end gap-1.5 text-sm"
                }, [
                  createVNode("h5", { class: "font-semibold" }, toDisplayString(_ctx.$t("orders.totalAmount")), 1),
                  createVNode("div", { class: "flex items-center gap-1.5" }, [
                    __props.ordersSummary.discount > 0 ? (openBlock(), createBlock("span", {
                      key: 0,
                      class: "line-through text-gray-400 text-xs"
                    }, toDisplayString((__props.ordersSummary.total + __props.ordersSummary.discount).toFixed(2)) + " ₾ ", 1)) : createCommentVNode("", true),
                    createVNode("span", { class: "font-semibold text-gray-800" }, toDisplayString(__props.ordersSummary.total.toFixed(2)) + " ₾", 1),
                    __props.ordersSummary.discount > 0 ? (openBlock(), createBlock("span", {
                      key: 1,
                      class: "text-red-600 text-xs font-medium"
                    }, " -" + toDisplayString(__props.ordersSummary.discount.toFixed(2)) + " ₾ ", 1)) : createCommentVNode("", true)
                  ])
                ])) : createCommentVNode("", true)
              ]),
              __props.orders.data?.length ? (openBlock(), createBlock("div", {
                key: 1,
                class: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
              }, [
                (openBlock(true), createBlock(Fragment, null, renderList(__props.orders.data, (order) => {
                  return openBlock(), createBlock("div", {
                    key: order.id,
                    class: "bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 p-4 flex flex-col gap-4"
                  }, [
                    createVNode("div", { class: "flex items-start justify-between gap-2" }, [
                      createVNode("div", null, [
                        createVNode("p", { class: "text-xs text-gray-400" }, toDisplayString(_ctx.$t("orders.orderNo")), 1),
                        createVNode("p", { class: "font-mono text-sm font-semibold text-gray-800" }, toDisplayString(order.invoice_no ?? "—"), 1)
                      ]),
                      createVNode(_component_Tag, {
                        value: statusLabelKey[order.status] ? _ctx.$t(statusLabelKey[order.status]) : order.status,
                        severity: statusSeverity[order.status]
                      }, null, 8, ["value", "severity"])
                    ]),
                    createVNode("div", { class: "flex items-center gap-2" }, [
                      order.items?.length ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(visibleImages(order), (orderItem) => {
                          return openBlock(), createBlock("div", {
                            key: orderItem.id,
                            class: "relative w-16 h-16 rounded-lg border border-gray-100 bg-gray-50 shrink-0"
                          }, [
                            orderItem.image ? (openBlock(), createBlock("img", {
                              key: 0,
                              src: imageUrl(orderItem),
                              alt: orderItem.name,
                              class: "w-full h-full object-cover rounded-lg"
                            }, null, 8, ["src", "alt"])) : (openBlock(), createBlock("div", {
                              key: 1,
                              class: "w-full h-full flex items-center justify-center text-gray-300"
                            }, [
                              createVNode("i", { class: "pi pi-image text-sm" })
                            ])),
                            orderItem.quantity > 1 ? (openBlock(), createBlock("span", {
                              key: 2,
                              class: "absolute -top-1.5 -right-1.5 min-w-[1.1rem] h-[1.1rem] px-1 rounded-full bg-red-500 text-white text-[10px] leading-[1.1rem] font-semibold text-center shadow"
                            }, "x" + toDisplayString(orderItem.quantity), 1)) : createCommentVNode("", true)
                          ]);
                        }), 128)),
                        remainingItemCount(order) > 0 ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center text-xs font-semibold text-gray-500 shrink-0"
                        }, " +" + toDisplayString(remainingItemCount(order)), 1)) : createCommentVNode("", true)
                      ], 64)) : (openBlock(), createBlock("span", {
                        key: 1,
                        class: "text-xs text-gray-300"
                      }, toDisplayString(_ctx.$t("orders.noProducts")), 1))
                    ]),
                    createVNode("div", { class: "grid grid-cols-2 gap-y-2 gap-x-3 text-sm border-t border-gray-100 pt-3" }, [
                      createVNode("div", null, [
                        createVNode("p", { class: "text-xs text-gray-400" }, toDisplayString(_ctx.$t("orders.date")), 1),
                        createVNode("p", { class: "text-gray-700" }, toDisplayString(order.created_at), 1)
                      ]),
                      createVNode("div", null, [
                        createVNode("p", { class: "text-xs text-gray-400" }, toDisplayString(_ctx.$t("common.total")), 1),
                        order.discount_total > 0 ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "flex flex-col gap-0.5"
                        }, [
                          createVNode("span", { class: "line-through text-gray-400 text-xs" }, toDisplayString((Number(order.total) + Number(order.discount_total)).toFixed(2)) + " ₾", 1),
                          createVNode("span", { class: "font-semibold text-gray-900" }, toDisplayString(order.total) + " ₾", 1),
                          createVNode("span", { class: "text-red-600 text-xs font-medium" }, "-" + toDisplayString(Number(order.discount_total).toFixed(2)) + " ₾", 1)
                        ])) : (openBlock(), createBlock("p", {
                          key: 1,
                          class: "font-semibold text-gray-900"
                        }, toDisplayString(order.total) + " ₾", 1))
                      ]),
                      order.tracking_number ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "col-span-2"
                      }, [
                        createVNode("p", { class: "text-xs text-gray-400" }, toDisplayString(_ctx.$t("orders.trackingNumber")), 1),
                        createVNode("p", { class: "font-mono text-gray-700" }, toDisplayString(order.tracking_number), 1)
                      ])) : createCommentVNode("", true)
                    ]),
                    createVNode("div", { class: "flex flex-col sm:flex-row items-center justify-between flex-wrap gap-2 mt-auto pt-1" }, [
                      createVNode(_component_Button, {
                        label: _ctx.$t("orders.details"),
                        icon: "pi pi-eye",
                        size: "small",
                        severity: "secondary",
                        class: "2xl:flex-1 w-full hover:bg-blue-500! hover:border-blue-500! hover:text-white!",
                        onClick: ($event) => detailDialog.value.open(order.id)
                      }, null, 8, ["label", "onClick"]),
                      createVNode(_component_Button, {
                        label: _ctx.$t("orders.reorder"),
                        icon: "pi pi-refresh",
                        size: "small",
                        severity: "secondary",
                        class: "2xl:flex-1 w-full hover:bg-emerald-500! hover:border-emerald-500! hover:text-white!",
                        onClick: ($event) => reorderDialog.value.open(order.id)
                      }, null, 8, ["label", "onClick"])
                    ])
                  ]);
                }), 128))
              ])) : (openBlock(), createBlock("div", {
                key: 2,
                class: "flex flex-col items-center justify-center h-60 bg-white rounded-2xl border border-gray-100 shadow-sm"
              }, [
                createVNode("i", { class: "pi pi-inbox text-5xl text-gray-300 mb-3" }),
                createVNode("p", { class: "text-gray-500" }, toDisplayString(_ctx.$t("orders.noOrders")), 1)
              ])),
              createVNode(_sfc_main$3, {
                data: __props.orders,
                class: "mt-4"
              }, null, 8, ["data"])
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
//# sourceMappingURL=Index-CVf0ihCe.js.map
