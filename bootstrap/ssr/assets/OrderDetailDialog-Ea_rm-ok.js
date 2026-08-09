import { s as script$2 } from "./index-YvTnrAwi.js";
import { s as script$1 } from "./index-C0PiRRRi.js";
import { s as script } from "./index-D46B4f3g.js";
import { ref, mergeProps, withCtx, unref, createTextVNode, toDisplayString, openBlock, createBlock, createVNode, createCommentVNode, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderAttr } from "vue/server-renderer";
import { useHttp, Link } from "@inertiajs/vue3";
import { u as useToast } from "./index-Qb24q4w2.js";
import { f as formatDiscount } from "./numberFormat-BgUHwZc2.js";
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
import "@primeuix/utils/zindex";
import "@primevue/icons/times";
import "@primevue/icons/windowmaximize";
import "@primevue/icons/windowminimize";
import "./index-zZrFrjQS.js";
import "@primeuix/styled";
import "@primeuix/styles/dialog";
const _sfc_main = {
  __name: "OrderDetailDialog",
  __ssrInlineRender: true,
  setup(__props, { expose: __expose }) {
    const toast = useToast();
    const http = useHttp();
    function imageUrl(orderItem) {
      return `${orderItem.storage_path}/${orderItem.image}`;
    }
    const visible = ref(false);
    const loading = ref(false);
    const order = ref(null);
    async function open(id) {
      loading.value = true;
      visible.value = true;
      order.value = null;
      try {
        const res = await http.get(route("user-orders.show", id));
        order.value = res.order;
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
      dispatched: "info",
      delivered: "success",
      cancelled: "danger"
    };
    const orderStatusLabel = {
      awaiting_payment: "გადახდის მოლოდინში",
      pending: "დაუდასტურებელი",
      paid: "გადახდილი",
      ready: "მზადაა",
      dispatched: "გაგზავნილია",
      delivered: "ჩაბარებულია",
      cancelled: "გაუქმებული",
      limit: "ლიმიტი"
    };
    const paymentStatusLabel = {
      pending: "მოლოდინში",
      processing: "მუშავდება",
      completed: "დასრულებული",
      failed: "ვერ შესრულდა",
      cancelled: "გაუქმებული"
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
      const _component_Button = script$2;
      _push(ssrRenderComponent(_component_Dialog, mergeProps({
        visible: visible.value,
        "onUpdate:visible": ($event) => visible.value = $event,
        modal: "",
        header: order.value ? `შეკვეთა #${order.value.invoice_no ?? order.value.id?.slice(0, 8)}` : "შეკვეთის დეტალები",
        class: "w-[95%] sm:w-[75%] lg:w-[68%]",
        "pt:header:class": "border-b border-gray-100"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (loading.value) {
              _push2(`<div class="flex flex-col items-center justify-center py-16 gap-3"${_scopeId}><i class="pi pi-spinner pi-spin text-4xl text-brand-400"${_scopeId}></i><span class="text-sm text-gray-400"${_scopeId}>იტვირთება...</span></div>`);
            } else if (order.value) {
              _push2(`<div class="text-sm"${_scopeId}><div class="flex items-center justify-between bg-brand-50 border-b border-brand-100 px-5 py-3 -mx-5 -mt-1 mb-5"${_scopeId}><div class="flex items-center gap-2 text-brand-700"${_scopeId}><i class="pi pi-calendar text-xs"${_scopeId}></i><span class="text-xs"${_scopeId}>${ssrInterpolate(order.value.created_at)}</span></div>`);
              _push2(ssrRenderComponent(_component_Tag, {
                value: orderStatusLabel[order.value.status] ?? order.value.status,
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
              _push2(`<p class="flex items-center gap-1.5 text-gray-500"${_scopeId}><i class="pi pi-tag text-xs text-brand-400"${_scopeId}></i> მიწოდება: <span class="font-medium text-gray-700 ml-1"${_scopeId}>${ssrInterpolate(order.value.delivery_cost)} ₾</span></p>`);
              if (order.value.tracking_number) {
                _push2(`<p class="flex items-center gap-1.5 text-gray-500"${_scopeId}><i class="pi pi-hashtag text-xs text-brand-400"${_scopeId}></i> თრექინგის ნომერი: <span class="font-medium text-gray-700 ml-1"${_scopeId}>${ssrInterpolate(order.value.tracking_number)}</span></p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div>`);
              if (order.value.payment) {
                _push2(`<div class="border border-blue-200 rounded-xl overflow-hidden"${_scopeId}><div class="flex items-center gap-2 bg-blue-50 border-b border-blue-200 px-3 py-2"${_scopeId}><i class="pi pi-credit-card text-blue-500 text-xs"${_scopeId}></i><span class="font-semibold text-blue-700 text-xs uppercase tracking-wide"${_scopeId}>გადახდა</span></div><div class="px-3 py-3 flex flex-wrap gap-5 text-gray-600"${_scopeId}><div${_scopeId}><p class="text-xs text-gray-400 mb-0.5"${_scopeId}>გადახდის მეთოდი</p><p class="font-semibold text-gray-800"${_scopeId}>${ssrInterpolate(providerLabel[order.value.payment.provider] ?? order.value.payment.provider)}</p></div><div${_scopeId}><p class="text-xs text-gray-400 mb-0.5"${_scopeId}>გადახდის სტატუსი</p>`);
                _push2(ssrRenderComponent(_component_Tag, {
                  value: paymentStatusLabel[order.value.payment.status] ?? order.value.payment.status,
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
              _push2(`<div class="border border-gray-200 rounded-xl overflow-hidden mb-4"${_scopeId}><div class="flex items-center gap-2 bg-gray-50 border-b border-gray-200 px-3 py-2"${_scopeId}><i class="pi pi-shopping-cart text-brand-500 text-xs"${_scopeId}></i><span class="font-semibold text-gray-700 text-xs uppercase tracking-wide"${_scopeId}>პროდუქცია</span></div><div class="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3"${_scopeId}><!--[-->`);
              ssrRenderList(order.value.items, (data) => {
                _push2(`<div class="border border-gray-200 rounded-xl p-3 flex flex-col gap-2"${_scopeId}><div class="flex items-start justify-between gap-3"${_scopeId}><div class="flex flex-col gap-0.5 min-w-0"${_scopeId}>`);
                _push2(ssrRenderComponent(unref(Link), {
                  href: _ctx.route("items.show", data.item_slug),
                  class: "font-semibold text-gray-800 hover:text-brand-600"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`${ssrInterpolate(data.item_name)}`);
                    } else {
                      return [
                        createTextVNode(toDisplayString(data.item_name), 1)
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(`<span class="text-xs text-gray-400 font-mono"${_scopeId}>${ssrInterpolate(data.item_no)}</span></div><div class="relative w-14 h-14 rounded-lg border border-gray-100 bg-gray-50 shrink-0"${_scopeId}>`);
                if (data.image) {
                  _push2(`<img${ssrRenderAttr("src", imageUrl(data))}${ssrRenderAttr("alt", data.item_name)} class="w-full h-full object-cover rounded-lg"${_scopeId}>`);
                } else {
                  _push2(`<div class="w-full h-full flex items-center justify-center text-gray-300"${_scopeId}><i class="pi pi-image text-sm"${_scopeId}></i></div>`);
                }
                _push2(`<span class="absolute -top-1.5 -right-1.5 min-w-[1.1rem] h-[1.1rem] px-1 rounded-full bg-red-500 text-white text-[10px] leading-[1.1rem] font-semibold text-center shadow"${_scopeId}>x${ssrInterpolate(data.quantity)}</span></div></div>`);
                if (data.with_service) {
                  _push2(`<span class="inline-flex items-center gap-1 text-xs font-medium text-brand-600 bg-brand-50 px-1.5 py-0.5 rounded-full w-fit"${_scopeId}><i class="pi pi-wrench text-xs"${_scopeId}></i> მონტაჟის სერვისი — ${ssrInterpolate(data.service_price)} ₾ </span>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`<div class="flex items-end justify-between border-t border-gray-100 pt-2 mt-auto"${_scopeId}><div${_scopeId}><p class="text-xs text-gray-400 mb-0.5"${_scopeId}>ერთეულის ფასი</p>`);
                if (data.wholesale_discount > 0) {
                  _push2(`<div class="flex flex-col gap-0.5"${_scopeId}><div class="flex items-center gap-1.5"${_scopeId}><span class="line-through text-gray-400 text-xs"${_scopeId}>${ssrInterpolate((Number(data.unit_price) + Number(data.wholesale_discount) / data.quantity).toFixed(2))} ₾</span><span class="font-medium text-emerald-600"${_scopeId}>${ssrInterpolate(data.unit_price)} ₾</span></div><span class="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-semibold w-fit"${_scopeId}>საბითუმო</span></div>`);
                } else if (data.discount > 0) {
                  _push2(`<div class="flex flex-col gap-0.5"${_scopeId}><div class="flex items-center gap-1.5"${_scopeId}><span class="line-through text-gray-400 text-xs"${_scopeId}>${ssrInterpolate((Number(data.unit_price) / (1 - Number(data.discount) / 100)).toFixed(2))} ₾</span><span class="font-medium text-red-600"${_scopeId}>${ssrInterpolate(data.unit_price)} ₾</span></div><span class="text-[10px] px-1.5 py-0.5 rounded-full bg-red-100 text-red-600 font-semibold w-fit"${_scopeId}>-${ssrInterpolate(unref(formatDiscount)(data.discount))}%</span></div>`);
                } else if (data.fake_price > 0) {
                  _push2(`<div class="flex items-center gap-1.5"${_scopeId}><span class="line-through text-gray-400 text-xs"${_scopeId}>${ssrInterpolate(Number(data.fake_price).toFixed(2))} ₾</span><span class="font-medium text-red-600"${_scopeId}>${ssrInterpolate(data.unit_price)} ₾</span></div>`);
                } else {
                  _push2(`<span class="text-gray-700"${_scopeId}>${ssrInterpolate(data.unit_price)} ₾</span>`);
                }
                _push2(`</div><div class="text-right"${_scopeId}><p class="text-xs text-gray-400 mb-0.5"${_scopeId}>სულ</p><span class="font-semibold text-gray-800"${_scopeId}>${ssrInterpolate(data.subtotal)} ₾</span></div></div></div>`);
              });
              _push2(`<!--]--></div><div class="px-4 py-3 border-t border-gray-200 bg-gray-50 space-y-1.5"${_scopeId}>`);
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
                _push2(`<div class="flex justify-end gap-2"${_scopeId}><a${ssrRenderAttr("href", _ctx.route("download.file", order.value.payment.invoice_no))} target="_blank"${_scopeId}>`);
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
                    value: orderStatusLabel[order.value.status] ?? order.value.status,
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
                      ]),
                      order.value.tracking_number ? (openBlock(), createBlock("p", {
                        key: 1,
                        class: "flex items-center gap-1.5 text-gray-500"
                      }, [
                        createVNode("i", { class: "pi pi-hashtag text-xs text-brand-400" }),
                        createTextVNode(" თრექინგის ნომერი: "),
                        createVNode("span", { class: "font-medium text-gray-700 ml-1" }, toDisplayString(order.value.tracking_number), 1)
                      ])) : createCommentVNode("", true)
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
                        createVNode("p", { class: "text-xs text-gray-400 mb-0.5" }, "გადახდის მეთოდი"),
                        createVNode("p", { class: "font-semibold text-gray-800" }, toDisplayString(providerLabel[order.value.payment.provider] ?? order.value.payment.provider), 1)
                      ]),
                      createVNode("div", null, [
                        createVNode("p", { class: "text-xs text-gray-400 mb-0.5" }, "გადახდის სტატუსი"),
                        createVNode(_component_Tag, {
                          value: paymentStatusLabel[order.value.payment.status] ?? order.value.payment.status,
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
                    createVNode("i", { class: "pi pi-shopping-cart text-brand-500 text-xs" }),
                    createVNode("span", { class: "font-semibold text-gray-700 text-xs uppercase tracking-wide" }, "პროდუქცია")
                  ]),
                  createVNode("div", { class: "grid grid-cols-1 sm:grid-cols-2 gap-3 p-3" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(order.value.items, (data) => {
                      return openBlock(), createBlock("div", {
                        key: data.id,
                        class: "border border-gray-200 rounded-xl p-3 flex flex-col gap-2"
                      }, [
                        createVNode("div", { class: "flex items-start justify-between gap-3" }, [
                          createVNode("div", { class: "flex flex-col gap-0.5 min-w-0" }, [
                            createVNode(unref(Link), {
                              href: _ctx.route("items.show", data.item_slug),
                              class: "font-semibold text-gray-800 hover:text-brand-600"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(data.item_name), 1)
                              ]),
                              _: 2
                            }, 1032, ["href"]),
                            createVNode("span", { class: "text-xs text-gray-400 font-mono" }, toDisplayString(data.item_no), 1)
                          ]),
                          createVNode("div", { class: "relative w-14 h-14 rounded-lg border border-gray-100 bg-gray-50 shrink-0" }, [
                            data.image ? (openBlock(), createBlock("img", {
                              key: 0,
                              src: imageUrl(data),
                              alt: data.item_name,
                              class: "w-full h-full object-cover rounded-lg"
                            }, null, 8, ["src", "alt"])) : (openBlock(), createBlock("div", {
                              key: 1,
                              class: "w-full h-full flex items-center justify-center text-gray-300"
                            }, [
                              createVNode("i", { class: "pi pi-image text-sm" })
                            ])),
                            createVNode("span", { class: "absolute -top-1.5 -right-1.5 min-w-[1.1rem] h-[1.1rem] px-1 rounded-full bg-red-500 text-white text-[10px] leading-[1.1rem] font-semibold text-center shadow" }, "x" + toDisplayString(data.quantity), 1)
                          ])
                        ]),
                        data.with_service ? (openBlock(), createBlock("span", {
                          key: 0,
                          class: "inline-flex items-center gap-1 text-xs font-medium text-brand-600 bg-brand-50 px-1.5 py-0.5 rounded-full w-fit"
                        }, [
                          createVNode("i", { class: "pi pi-wrench text-xs" }),
                          createTextVNode(" მონტაჟის სერვისი — " + toDisplayString(data.service_price) + " ₾ ", 1)
                        ])) : createCommentVNode("", true),
                        createVNode("div", { class: "flex items-end justify-between border-t border-gray-100 pt-2 mt-auto" }, [
                          createVNode("div", null, [
                            createVNode("p", { class: "text-xs text-gray-400 mb-0.5" }, "ერთეულის ფასი"),
                            data.wholesale_discount > 0 ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "flex flex-col gap-0.5"
                            }, [
                              createVNode("div", { class: "flex items-center gap-1.5" }, [
                                createVNode("span", { class: "line-through text-gray-400 text-xs" }, toDisplayString((Number(data.unit_price) + Number(data.wholesale_discount) / data.quantity).toFixed(2)) + " ₾", 1),
                                createVNode("span", { class: "font-medium text-emerald-600" }, toDisplayString(data.unit_price) + " ₾", 1)
                              ]),
                              createVNode("span", { class: "text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-semibold w-fit" }, "საბითუმო")
                            ])) : data.discount > 0 ? (openBlock(), createBlock("div", {
                              key: 1,
                              class: "flex flex-col gap-0.5"
                            }, [
                              createVNode("div", { class: "flex items-center gap-1.5" }, [
                                createVNode("span", { class: "line-through text-gray-400 text-xs" }, toDisplayString((Number(data.unit_price) / (1 - Number(data.discount) / 100)).toFixed(2)) + " ₾", 1),
                                createVNode("span", { class: "font-medium text-red-600" }, toDisplayString(data.unit_price) + " ₾", 1)
                              ]),
                              createVNode("span", { class: "text-[10px] px-1.5 py-0.5 rounded-full bg-red-100 text-red-600 font-semibold w-fit" }, "-" + toDisplayString(unref(formatDiscount)(data.discount)) + "%", 1)
                            ])) : data.fake_price > 0 ? (openBlock(), createBlock("div", {
                              key: 2,
                              class: "flex items-center gap-1.5"
                            }, [
                              createVNode("span", { class: "line-through text-gray-400 text-xs" }, toDisplayString(Number(data.fake_price).toFixed(2)) + " ₾", 1),
                              createVNode("span", { class: "font-medium text-red-600" }, toDisplayString(data.unit_price) + " ₾", 1)
                            ])) : (openBlock(), createBlock("span", {
                              key: 3,
                              class: "text-gray-700"
                            }, toDisplayString(data.unit_price) + " ₾", 1))
                          ]),
                          createVNode("div", { class: "text-right" }, [
                            createVNode("p", { class: "text-xs text-gray-400 mb-0.5" }, "სულ"),
                            createVNode("span", { class: "font-semibold text-gray-800" }, toDisplayString(data.subtotal) + " ₾", 1)
                          ])
                        ])
                      ]);
                    }), 128))
                  ]),
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
                  class: "flex justify-end gap-2"
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
//# sourceMappingURL=OrderDetailDialog-Ea_rm-ok.js.map
