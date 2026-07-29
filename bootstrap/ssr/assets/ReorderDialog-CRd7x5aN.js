import { s as script$3 } from "./index-YvTnrAwi.js";
import { s as script$1, a as script$2 } from "./index-C62S2GzY.js";
import { s as script } from "./index-D46B4f3g.js";
import { ref, mergeProps, withCtx, unref, openBlock, createBlock, createVNode, toDisplayString, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { u as useToast } from "./index-Qb24q4w2.js";
import { f as formatDiscount } from "./numberFormat-BgUHwZc2.js";
import { useHttp, router } from "@inertiajs/vue3";
import { u as useCart } from "./useCart-CIcsIaQl.js";
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
import "@primevue/core/api";
import "@primevue/core/utils";
import "@primevue/icons/arrowdown";
import "@primevue/icons/arrowup";
import "./index-BUhsrrXV.js";
import "@primeuix/styles/paginator";
import "@primevue/icons/angledoubleleft";
import "./index--B3DAMqV.js";
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
import "@primevue/icons/windowmaximize";
import "@primevue/icons/windowminimize";
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
    const toast = useToast();
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
        const res = await axios.get(route("user-orders.show", id));
        order.value = res.data.order;
        selectedItems.value = [...order.value.items];
      } catch {
        toast.add({ severity: "error", summary: "შეცდომა", detail: "შეკვეთის ჩატვირთვა ვერ მოხერხდა.", life: 3e3 });
        visible.value = false;
      } finally {
        loading.value = false;
      }
    }
    __expose({ open });
    function submitReorder() {
      reorder(order.value.id, selectedItems.value.map((i) => i.id));
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Dialog = script;
      const _component_DataTable = script$1;
      const _component_Column = script$2;
      const _component_Button = script$3;
      _push(ssrRenderComponent(_component_Dialog, mergeProps({
        visible: visible.value,
        "onUpdate:visible": ($event) => visible.value = $event,
        modal: "",
        header: order.value ? `თავიდან შეკვეთა #${order.value.invoice_no ?? order.value.id?.slice(0, 8)}` : "თავიდან შეკვეთა",
        class: "w-[95%] sm:w-[75%] lg:w-[68%]",
        "pt:header:class": "border-b border-gray-100"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (loading.value) {
              _push2(`<div class="flex flex-col items-center justify-center py-16 gap-3"${_scopeId}><i class="pi pi-spinner pi-spin text-4xl text-brand-400"${_scopeId}></i><span class="text-sm text-gray-400"${_scopeId}>იტვირთება...</span></div>`);
            } else if (order.value) {
              _push2(`<div class="text-sm"${_scopeId}><div class="border border-gray-200 rounded-xl overflow-hidden mb-4"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_DataTable, {
                selection: selectedItems.value,
                "onUpdate:selection": ($event) => selectedItems.value = $event,
                value: order.value.items,
                dataKey: "id",
                size: "small",
                class: "text-sm"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_Column, {
                      selectionMode: "multiple",
                      headerStyle: "width: 3rem"
                    }, null, _parent3, _scopeId2));
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
                          if (data.wholesale_discount > 0) {
                            _push4(`<div class="flex flex-col gap-0.5"${_scopeId3}><div class="flex items-center gap-1.5"${_scopeId3}><span class="line-through text-gray-400 text-xs"${_scopeId3}>${ssrInterpolate((Number(data.unit_price) + Number(data.wholesale_discount) / data.quantity).toFixed(2))} ₾</span><span class="font-medium text-emerald-600"${_scopeId3}>${ssrInterpolate(data.unit_price)} ₾</span></div><span class="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-semibold w-fit"${_scopeId3}>საბითუმო</span></div>`);
                          } else if (data.discount > 0) {
                            _push4(`<div class="flex flex-col gap-0.5"${_scopeId3}><div class="flex items-center gap-1.5"${_scopeId3}><span class="line-through text-gray-400 text-xs"${_scopeId3}>${ssrInterpolate((Number(data.unit_price) / (1 - Number(data.discount) / 100)).toFixed(2))} ₾</span><span class="font-medium text-red-600"${_scopeId3}>${ssrInterpolate(data.unit_price)} ₾</span></div><span class="text-[10px] px-1.5 py-0.5 rounded-full bg-red-100 text-red-600 font-semibold w-fit"${_scopeId3}>-${ssrInterpolate(unref(formatDiscount)(data.discount))}%</span></div>`);
                          } else if (data.fake_price > 0) {
                            _push4(`<div class="flex items-center gap-1.5"${_scopeId3}><span class="line-through text-gray-400 text-xs"${_scopeId3}>${ssrInterpolate(Number(data.fake_price).toFixed(2))} ₾</span><span class="font-medium text-red-600"${_scopeId3}>${ssrInterpolate(data.unit_price)} ₾</span></div>`);
                          } else {
                            _push4(`<span${_scopeId3}>${ssrInterpolate(data.unit_price)} ₾</span>`);
                          }
                        } else {
                          return [
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
                            ])) : (openBlock(), createBlock("span", { key: 3 }, toDisplayString(data.unit_price) + " ₾", 1))
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
                        selectionMode: "multiple",
                        headerStyle: "width: 3rem"
                      }),
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
                          ])) : (openBlock(), createBlock("span", { key: 3 }, toDisplayString(data.unit_price) + " ₾", 1))
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
              _push2(`</div><div class="flex justify-end gap-2"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_Button, {
                label: `თავიდან შეკვეთა (${selectedItems.value.length})`,
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
                createVNode("span", { class: "text-sm text-gray-400" }, "იტვირთება...")
              ])) : order.value ? (openBlock(), createBlock("div", {
                key: 1,
                class: "text-sm"
              }, [
                createVNode("div", { class: "border border-gray-200 rounded-xl overflow-hidden mb-4" }, [
                  createVNode(_component_DataTable, {
                    selection: selectedItems.value,
                    "onUpdate:selection": ($event) => selectedItems.value = $event,
                    value: order.value.items,
                    dataKey: "id",
                    size: "small",
                    class: "text-sm"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_Column, {
                        selectionMode: "multiple",
                        headerStyle: "width: 3rem"
                      }),
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
                          ])) : (openBlock(), createBlock("span", { key: 3 }, toDisplayString(data.unit_price) + " ₾", 1))
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
                  }, 8, ["selection", "onUpdate:selection", "value"])
                ]),
                createVNode("div", { class: "flex justify-end gap-2" }, [
                  createVNode(_component_Button, {
                    label: `თავიდან შეკვეთა (${selectedItems.value.length})`,
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
//# sourceMappingURL=ReorderDialog-CRd7x5aN.js.map
