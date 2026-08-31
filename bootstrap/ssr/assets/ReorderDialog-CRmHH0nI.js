import { s as script$2 } from "./index-YvTnrAwi.js";
import { s as script$1 } from "./index-BzRznsIW.js";
import { s as script } from "./index-D46B4f3g.js";
import { ref, computed, mergeProps, withCtx, unref, openBlock, createBlock, createVNode, toDisplayString, Fragment, renderList, withModifiers, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass } from "vue/server-renderer";
import { useHttp, router } from "@inertiajs/vue3";
import { u as useToast } from "./index-Qb24q4w2.js";
import { useI18n } from "vue-i18n";
import { f as formatDiscount } from "./numberFormat-BgUHwZc2.js";
import { u as useCart } from "./useCart-CLT7fb2x.js";
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
import "@primevue/icons/check";
import "@primevue/icons/minus";
import "@primevue/core/baseinput";
import "@primeuix/styles/checkbox";
import "@primeuix/utils/zindex";
import "@primevue/icons/times";
import "@primevue/icons/windowmaximize";
import "@primevue/icons/windowminimize";
import "./index-zZrFrjQS.js";
import "@primeuix/styled";
import "@primeuix/styles/dialog";
import "axios";
function useReorder() {
  const toast = useToast();
  const http = useHttp({ order_item_ids: [] });
  const { syncFromServer } = useCart();
  function reorder(orderId, orderItemIds = []) {
    http.order_item_ids = orderItemIds;
    http.post(route("user-orders.reorder", orderId), {
      onSuccess: ({ added, skipped_count: skippedCount, skipped_names: skippedNames }) => {
        if (added > 0) {
          toast.add({
            severity: "success",
            summary: "დამატებულია კალათაში",
            detail: `${added} პროდუქტი დაემატა კალათაში.`,
            life: 3e3
          });
        }
        if (skippedCount > 0) {
          toast.add({
            severity: "warn",
            summary: "ზოგიერთი პროდუქტი არ დაემატა",
            detail: skippedNames.length ? `არ არის ხელმისაწვდომი: ${skippedNames.join(", ")}` : `${skippedCount} პროდუქტი აღარ არის ხელმისაწვდომი.`,
            life: 5e3
          });
        }
        if (added > 0) {
          router.visit(route("cart.index"), {
            onSuccess: () => syncFromServer()
          });
        }
      },
      onError: () => {
        toast.add({
          severity: "error",
          summary: "შეცდომა",
          detail: "ხელახლა შეკვეთა ვერ მოხერხდა.",
          life: 3e3
        });
      }
    });
  }
  return { reorder, processing: http.processing };
}
const _sfc_main = {
  __name: "ReorderDialog",
  __ssrInlineRender: true,
  setup(__props, { expose: __expose }) {
    const { t } = useI18n();
    const toast = useToast();
    const http = useHttp();
    const { reorder, processing: reorderProcessing } = useReorder();
    const visible = ref(false);
    const loading = ref(false);
    const order = ref(null);
    const selectedItems = ref([]);
    async function open(id) {
      loading.value = true;
      visible.value = true;
      order.value = null;
      selectedItems.value = [];
      try {
        const res = await http.get(route("user-orders.show", id));
        order.value = res.order;
        selectedItems.value = [...order.value.items];
      } catch {
        toast.add({ severity: "error", summary: t("orders.errorSummary"), detail: t("orders.loadError"), life: 3e3 });
        visible.value = false;
      } finally {
        loading.value = false;
      }
    }
    __expose({ open });
    function submitReorder() {
      reorder(order.value.id, selectedItems.value.map((i) => i.id));
    }
    function isSelected(item) {
      return selectedItems.value.some((i) => i.id === item.id);
    }
    function toggleItem(item) {
      const idx = selectedItems.value.findIndex((i) => i.id === item.id);
      if (idx === -1) {
        selectedItems.value.push(item);
      } else {
        selectedItems.value.splice(idx, 1);
      }
    }
    const selectedTotal = computed(
      () => selectedItems.value.reduce((sum, i) => sum + Number(i.subtotal), 0)
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Dialog = script;
      const _component_Checkbox = script$1;
      const _component_Button = script$2;
      _push(ssrRenderComponent(_component_Dialog, mergeProps({
        visible: visible.value,
        "onUpdate:visible": ($event) => visible.value = $event,
        modal: "",
        header: order.value ? _ctx.$t("orders.reorderTitle", { no: order.value.invoice_no ?? order.value.id?.slice(0, 8) }) : _ctx.$t("orders.reorder"),
        class: "w-[95%] sm:w-[75%] lg:w-[68%]",
        "pt:header:class": "border-b border-gray-100"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (loading.value) {
              _push2(`<div class="flex flex-col items-center justify-center py-16 gap-3"${_scopeId}><i class="pi pi-spinner pi-spin text-4xl text-brand-400"${_scopeId}></i><span class="text-sm text-gray-400"${_scopeId}>${ssrInterpolate(_ctx.$t("common.loading"))}</span></div>`);
            } else if (order.value) {
              _push2(`<div class="text-sm"${_scopeId}><div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4"${_scopeId}><!--[-->`);
              ssrRenderList(order.value.items, (data) => {
                _push2(`<div class="${ssrRenderClass([isSelected(data) ? "border-brand-300 bg-brand-50/40" : "border-gray-200 hover:border-gray-300", "border rounded-xl p-3 flex flex-col gap-2 cursor-pointer transition-colors"])}"${_scopeId}><div class="flex items-start justify-between gap-2"${_scopeId}><div class="flex items-start gap-2 min-w-0"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_Checkbox, {
                  modelValue: selectedItems.value,
                  "onUpdate:modelValue": ($event) => selectedItems.value = $event,
                  value: data,
                  onClick: () => {
                  }
                }, null, _parent2, _scopeId));
                _push2(`<div class="flex flex-col gap-0.5 min-w-0"${_scopeId}><span class="font-semibold text-gray-800"${_scopeId}>${ssrInterpolate(data.item_name)}</span><span class="text-xs text-gray-400 font-mono"${_scopeId}>${ssrInterpolate(data.item_no)}</span></div></div><span class="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full shrink-0"${_scopeId}>x${ssrInterpolate(data.quantity)}</span></div><div class="flex items-end justify-between border-t border-gray-100 pt-2 mt-auto"${_scopeId}><div${_scopeId}><p class="text-xs text-gray-400 mb-0.5"${_scopeId}>${ssrInterpolate(_ctx.$t("orders.unitPriceShort"))}</p>`);
                if (data.wholesale_discount > 0) {
                  _push2(`<div class="flex flex-col gap-0.5"${_scopeId}><div class="flex items-center gap-1.5"${_scopeId}><span class="line-through text-gray-400 text-xs"${_scopeId}>${ssrInterpolate((Number(data.unit_price) + Number(data.wholesale_discount) / data.quantity).toFixed(2))} ₾</span><span class="font-medium text-emerald-600"${_scopeId}>${ssrInterpolate(data.unit_price)} ₾</span></div><span class="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-semibold w-fit"${_scopeId}>${ssrInterpolate(_ctx.$t("orders.wholesale"))}</span></div>`);
                } else if (data.discount > 0) {
                  _push2(`<div class="flex flex-col gap-0.5"${_scopeId}><div class="flex items-center gap-1.5"${_scopeId}><span class="line-through text-gray-400 text-xs"${_scopeId}>${ssrInterpolate((Number(data.unit_price) / (1 - Number(data.discount) / 100)).toFixed(2))} ₾</span><span class="font-medium text-red-600"${_scopeId}>${ssrInterpolate(data.unit_price)} ₾</span></div><span class="text-[10px] px-1.5 py-0.5 rounded-full bg-red-100 text-red-600 font-semibold w-fit"${_scopeId}>-${ssrInterpolate(unref(formatDiscount)(data.discount))}%</span></div>`);
                } else if (data.fake_price > 0) {
                  _push2(`<div class="flex items-center gap-1.5"${_scopeId}><span class="line-through text-gray-400 text-xs"${_scopeId}>${ssrInterpolate(Number(data.fake_price).toFixed(2))} ₾</span><span class="font-medium text-red-600"${_scopeId}>${ssrInterpolate(data.unit_price)} ₾</span></div>`);
                } else {
                  _push2(`<span class="text-gray-700"${_scopeId}>${ssrInterpolate(data.unit_price)} ₾</span>`);
                }
                _push2(`</div><div class="text-right"${_scopeId}><p class="text-xs text-gray-400 mb-0.5"${_scopeId}>${ssrInterpolate(_ctx.$t("common.total"))}</p><span class="font-semibold text-gray-800"${_scopeId}>${ssrInterpolate(data.subtotal)} ₾</span></div></div></div>`);
              });
              _push2(`<!--]--></div><div class="flex items-center justify-between gap-3"${_scopeId}>`);
              if (selectedItems.value.length) {
                _push2(`<div${_scopeId}><p class="text-sm text-gray-500 mb-0.5"${_scopeId}>${ssrInterpolate(_ctx.$t("orders.subtotal"))}</p><span class="font-semibold text-gray-800"${_scopeId}>${ssrInterpolate(selectedTotal.value.toFixed(2))} ₾</span></div>`);
              } else {
                _push2(`<div${_scopeId}></div>`);
              }
              _push2(ssrRenderComponent(_component_Button, {
                label: `${_ctx.$t("orders.reorder")} (${selectedItems.value.length})`,
                icon: "pi pi-refresh",
                size: "small",
                disabled: selectedItems.value.length === 0,
                loading: unref(reorderProcessing),
                onClick: submitReorder
              }, null, _parent2, _scopeId));
              _push2(`</div></div>`);
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
                createVNode("span", { class: "text-sm text-gray-400" }, toDisplayString(_ctx.$t("common.loading")), 1)
              ])) : order.value ? (openBlock(), createBlock("div", {
                key: 1,
                class: "text-sm"
              }, [
                createVNode("div", { class: "grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4" }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(order.value.items, (data) => {
                    return openBlock(), createBlock("div", {
                      key: data.id,
                      class: ["border rounded-xl p-3 flex flex-col gap-2 cursor-pointer transition-colors", isSelected(data) ? "border-brand-300 bg-brand-50/40" : "border-gray-200 hover:border-gray-300"],
                      onClick: ($event) => toggleItem(data)
                    }, [
                      createVNode("div", { class: "flex items-start justify-between gap-2" }, [
                        createVNode("div", { class: "flex items-start gap-2 min-w-0" }, [
                          createVNode(_component_Checkbox, {
                            modelValue: selectedItems.value,
                            "onUpdate:modelValue": ($event) => selectedItems.value = $event,
                            value: data,
                            onClick: withModifiers(() => {
                            }, ["stop"])
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "value", "onClick"]),
                          createVNode("div", { class: "flex flex-col gap-0.5 min-w-0" }, [
                            createVNode("span", { class: "font-semibold text-gray-800" }, toDisplayString(data.item_name), 1),
                            createVNode("span", { class: "text-xs text-gray-400 font-mono" }, toDisplayString(data.item_no), 1)
                          ])
                        ]),
                        createVNode("span", { class: "text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full shrink-0" }, "x" + toDisplayString(data.quantity), 1)
                      ]),
                      createVNode("div", { class: "flex items-end justify-between border-t border-gray-100 pt-2 mt-auto" }, [
                        createVNode("div", null, [
                          createVNode("p", { class: "text-xs text-gray-400 mb-0.5" }, toDisplayString(_ctx.$t("orders.unitPriceShort")), 1),
                          data.wholesale_discount > 0 ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "flex flex-col gap-0.5"
                          }, [
                            createVNode("div", { class: "flex items-center gap-1.5" }, [
                              createVNode("span", { class: "line-through text-gray-400 text-xs" }, toDisplayString((Number(data.unit_price) + Number(data.wholesale_discount) / data.quantity).toFixed(2)) + " ₾", 1),
                              createVNode("span", { class: "font-medium text-emerald-600" }, toDisplayString(data.unit_price) + " ₾", 1)
                            ]),
                            createVNode("span", { class: "text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-semibold w-fit" }, toDisplayString(_ctx.$t("orders.wholesale")), 1)
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
                          createVNode("p", { class: "text-xs text-gray-400 mb-0.5" }, toDisplayString(_ctx.$t("common.total")), 1),
                          createVNode("span", { class: "font-semibold text-gray-800" }, toDisplayString(data.subtotal) + " ₾", 1)
                        ])
                      ])
                    ], 10, ["onClick"]);
                  }), 128))
                ]),
                createVNode("div", { class: "flex items-center justify-between gap-3" }, [
                  selectedItems.value.length ? (openBlock(), createBlock("div", { key: 0 }, [
                    createVNode("p", { class: "text-sm text-gray-500 mb-0.5" }, toDisplayString(_ctx.$t("orders.subtotal")), 1),
                    createVNode("span", { class: "font-semibold text-gray-800" }, toDisplayString(selectedTotal.value.toFixed(2)) + " ₾", 1)
                  ])) : (openBlock(), createBlock("div", { key: 1 })),
                  createVNode(_component_Button, {
                    label: `${_ctx.$t("orders.reorder")} (${selectedItems.value.length})`,
                    icon: "pi pi-refresh",
                    size: "small",
                    disabled: selectedItems.value.length === 0,
                    loading: unref(reorderProcessing),
                    onClick: submitReorder
                  }, null, 8, ["label", "disabled", "loading"])
                ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/UserOrders/ReorderDialog.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=ReorderDialog-CRmHH0nI.js.map
