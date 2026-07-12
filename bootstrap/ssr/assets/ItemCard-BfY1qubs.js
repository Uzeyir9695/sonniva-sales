import { T as Tooltip } from "./index-C3Ts-4IM.js";
import { ref, computed, mergeProps, unref, withCtx, createVNode, useSSRContext, openBlock, createBlock, toDisplayString, createCommentVNode, withModifiers, withDirectives } from "vue";
import { ssrRenderAttrs, ssrIncludeBooleanAttr, ssrRenderClass, ssrRenderComponent, ssrGetDirectiveProps, ssrInterpolate } from "vue/server-renderer";
import "@inertiajs/vue3";
import { _ as _sfc_main$3, c as _sfc_main$4, b as _sfc_main$5 } from "./QuickViewDialog-8Z0R3wjt.js";
import { s as script } from "./index-BgiqKOW-.js";
import { u as useCart } from "./useCart-CIcsIaQl.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import { s as script$2 } from "./index-hSjFFc9a.js";
import { s as script$1 } from "./index-nsBhLTBN.js";
import { _ as _sfc_main$6 } from "./StockNotifyDialog-DtRQgNBy.js";
import { u as usePricing } from "./usePricing-oDne5BPU.js";
const _sfc_main$2 = {
  __name: "AddToCartButton",
  __ssrInlineRender: true,
  props: {
    item: { type: Object, required: true }
  },
  setup(__props) {
    const props = __props;
    const { isInCart } = useCart();
    const quantity = ref(1);
    const showStepper = ref(false);
    const overLimit = computed(() => props.item.inventory > 0 && quantity.value > props.item.inventory);
    const isOutOfStock = !props.item.inventory || props.item.inventory === 0;
    return (_ctx, _push, _parent, _attrs) => {
      const _directive_tooltip = Tooltip;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative" }, _attrs))} data-v-65bfa806><button${ssrIncludeBooleanAttr(unref(isOutOfStock) && unref(isInCart)(__props.item.id)) ? " disabled" : ""} class="${ssrRenderClass([unref(isOutOfStock) ? "border border-dashed border-brand-400 text-brand-500 hover:bg-brand-50 active:scale-95 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed" : "bg-brand-500 text-white hover:bg-brand-400 active:scale-95 cursor-pointer", "relative flex items-center text-xs font-semibold p-2 rounded-xl transition-all duration-150"])}" data-v-65bfa806><i class="${ssrRenderClass(unref(isInCart)(__props.item.id) ? "pi pi-shopping-cart" : "pi pi-cart-plus")}" data-v-65bfa806></i>`);
      _push(ssrRenderComponent(_sfc_main$3, { item: __props.item }, null, _parent));
      _push(`</button>`);
      if (showStepper.value) {
        _push(`<div class="${ssrRenderClass([overLimit.value ? "border border-red-500 rounded-lg" : "", "absolute top-1/2 -translate-y-1/2 right-0 flex flex-col items-end gap-1"])}" data-v-65bfa806><div class="flex items-center gap-1 bg-white rounded-xl shadow-lg pl-2 py-1.5 border-gray-100" data-v-65bfa806>`);
        _push(ssrRenderComponent(unref(script), {
          modelValue: quantity.value,
          "onUpdate:modelValue": ($event) => quantity.value = $event,
          "show-buttons": "",
          "button-layout": "horizontal",
          min: 1,
          onInput: (e) => {
            if (e.value !== null) quantity.value = e.value;
          },
          "input-style": { width: "2rem", textAlign: "center", padding: "0", boxShadow: "none", fontSize: "0.875rem", fontWeight: "600" },
          class: "cart-stepper",
          onClick: () => {
          }
        }, {
          incrementbuttonicon: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<i class="pi pi-plus text-xs" data-v-65bfa806${_scopeId}></i>`);
            } else {
              return [
                createVNode("i", { class: "pi pi-plus text-xs" })
              ];
            }
          }),
          decrementbuttonicon: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<i class="pi pi-minus text-xs" data-v-65bfa806${_scopeId}></i>`);
            } else {
              return [
                createVNode("i", { class: "pi pi-minus text-xs" })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<button${ssrRenderAttrs(mergeProps({
          disabled: overLimit.value,
          class: "flex items-center justify-center rounded-xl p-2 bg-brand-500 cursor-pointer hover:bg-brand-400 active:scale-95 text-white transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
        }, ssrGetDirectiveProps(_ctx, _directive_tooltip, overLimit.value ? "შეკვეთის მაქსიმალური რაოდენობაა " + __props.item.inventory : "")))} data-v-65bfa806><i class="pi pi-cart-plus" data-v-65bfa806></i></button></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Shared/components/AddToCartButton.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const AddToCartButton = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-65bfa806"]]);
const _sfc_main$1 = {
  __name: "WhatsappOrderDialog",
  __ssrInlineRender: true,
  props: {
    visible: { type: Boolean, required: true }
  },
  emits: ["update:visible"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const whatsappLink = "https://wa.me/995596720001";
    const confirm = () => {
      emit("update:visible", false);
      window.open(whatsappLink, "_blank", "noopener");
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Dialog = script$1;
      const _component_Button = script$2;
      _push(ssrRenderComponent(_component_Dialog, mergeProps({
        visible: __props.visible,
        "onUpdate:visible": ($event) => emit("update:visible", $event),
        modal: "",
        style: { width: "22rem" }
      }, _attrs), {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center gap-2"${_scopeId}><i class="pi pi-file-edit text-green-600"${_scopeId}></i><span class="font-semibold text-gray-800"${_scopeId}>მოითხოვე შეკვეთა</span></div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center gap-2" }, [
                createVNode("i", { class: "pi pi-file-edit text-green-600" }),
                createVNode("span", { class: "font-semibold text-gray-800" }, "მოითხოვე შეკვეთა")
              ])
            ];
          }
        }),
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex justify-end gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Button, {
              label: "გაუქმება",
              severity: "secondary",
              text: "",
              onClick: ($event) => emit("update:visible", false)
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Button, {
              label: "გადასვლა",
              icon: "pi pi-whatsapp",
              class: "bg-green-600! border-green-600! hover:bg-green-700!",
              onClick: confirm
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "flex justify-end gap-2" }, [
                createVNode(_component_Button, {
                  label: "გაუქმება",
                  severity: "secondary",
                  text: "",
                  onClick: ($event) => emit("update:visible", false)
                }, null, 8, ["onClick"]),
                createVNode(_component_Button, {
                  label: "გადასვლა",
                  icon: "pi pi-whatsapp",
                  class: "bg-green-600! border-green-600! hover:bg-green-700!",
                  onClick: confirm
                })
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<p class="text-sm text-gray-600 leading-relaxed"${_scopeId}> გადაგამისამართებთ ჩვენს WhatsApp გვერდზე, სადაც შეგიძლიათ მოგვწეროთ ან დაგვირეკოთ შესაკვეთად. </p>`);
          } else {
            return [
              createVNode("p", { class: "text-sm text-gray-600 leading-relaxed" }, " გადაგამისამართებთ ჩვენს WhatsApp გვერდზე, სადაც შეგიძლიათ მოგვწეროთ ან დაგვირეკოთ შესაკვეთად. ")
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Shared/components/WhatsappOrderDialog.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "ItemCard",
  __ssrInlineRender: true,
  props: {
    item: { type: Object, required: true },
    isOrderOnly: { type: Boolean, default: false }
  },
  emits: ["quick-view"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const { displayPrice, displayUOM, hasDiscount, originalPrice } = usePricing(() => props.item);
    const emit = __emit;
    const showWhatsappDialog = ref(false);
    const showNotifyDialog = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _directive_tooltip = Tooltip;
      _push(`<!--[--><div class="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 flex flex-col cursor-pointer h-full">`);
      _push(ssrRenderComponent(_sfc_main$4, { item: __props.item }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="absolute top-2.5 left-2.5"${_scopeId}>`);
            if (__props.item.inventory < 1) {
              _push2(`<span class="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-red-100 text-red-600"${_scopeId}>მარაგში არ არის</span>`);
            } else {
              _push2(`<span class="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700"${_scopeId}>მარაგშია</span>`);
            }
            _push2(`</div>`);
            if (unref(hasDiscount)) {
              _push2(`<span class="absolute top-2.5 right-2.5 z-10 text-[10px] font-bold px-2 py-1 rounded-full bg-red-500 text-white shadow-md"${_scopeId}>-${ssrInterpolate(Number(__props.item.discount))}%</span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="${ssrRenderClass([unref(hasDiscount) ? "top-11" : "top-2.5", "absolute right-2.5 flex flex-col gap-1.5 sm:opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-2 group-hover:translate-x-0"])}"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$5, {
              "item-id": __props.item.id
            }, null, _parent2, _scopeId));
            _push2(`<button class="w-8 h-8 bg-white cursor-pointer rounded-full shadow-md flex items-center justify-center text-gray-500 hover:text-gray-900 hover:shadow-lg transition-all duration-150"${_scopeId}><i class="pi pi-eye text-xs"${_scopeId}></i></button>`);
            if (__props.item.inventory < 1 && !__props.isOrderOnly) {
              _push2(`<button${ssrRenderAttrs(mergeProps({ class: "w-8 h-8 bg-white cursor-pointer rounded-full shadow-md flex items-center justify-center text-blue-500 hover:text-blue-600 hover:shadow-lg transition-all duration-150" }, ssrGetDirectiveProps(_ctx, _directive_tooltip, "მიიღეთ შეტყობინება მარაგის შევსებისთანავე", void 0, { left: true })))}${_scopeId}><i class="pi pi-bell text-xs"${_scopeId}></i></button>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "absolute top-2.5 left-2.5" }, [
                __props.item.inventory < 1 ? (openBlock(), createBlock("span", {
                  key: 0,
                  class: "text-[10px] font-semibold px-2 py-0.5 rounded-full bg-red-100 text-red-600"
                }, "მარაგში არ არის")) : (openBlock(), createBlock("span", {
                  key: 1,
                  class: "text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700"
                }, "მარაგშია"))
              ]),
              unref(hasDiscount) ? (openBlock(), createBlock("span", {
                key: 0,
                class: "absolute top-2.5 right-2.5 z-10 text-[10px] font-bold px-2 py-1 rounded-full bg-red-500 text-white shadow-md"
              }, "-" + toDisplayString(Number(__props.item.discount)) + "%", 1)) : createCommentVNode("", true),
              createVNode("div", {
                class: ["absolute right-2.5 flex flex-col gap-1.5 sm:opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-2 group-hover:translate-x-0", unref(hasDiscount) ? "top-11" : "top-2.5"]
              }, [
                createVNode(_sfc_main$5, {
                  "item-id": __props.item.id
                }, null, 8, ["item-id"]),
                createVNode("button", {
                  onClick: withModifiers(($event) => emit("quick-view", __props.item), ["stop"]),
                  class: "w-8 h-8 bg-white cursor-pointer rounded-full shadow-md flex items-center justify-center text-gray-500 hover:text-gray-900 hover:shadow-lg transition-all duration-150"
                }, [
                  createVNode("i", { class: "pi pi-eye text-xs" })
                ], 8, ["onClick"]),
                __props.item.inventory < 1 && !__props.isOrderOnly ? withDirectives((openBlock(), createBlock("button", {
                  key: 0,
                  onClick: withModifiers(($event) => showNotifyDialog.value = true, ["stop"]),
                  class: "w-8 h-8 bg-white cursor-pointer rounded-full shadow-md flex items-center justify-center text-blue-500 hover:text-blue-600 hover:shadow-lg transition-all duration-150"
                }, [
                  createVNode("i", { class: "pi pi-bell text-xs" })
                ], 8, ["onClick"])), [
                  [
                    _directive_tooltip,
                    "მიიღეთ შეტყობინება მარაგის შევსებისთანავე",
                    void 0,
                    { left: true }
                  ]
                ]) : createCommentVNode("", true)
              ], 2)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="p-3 sm:p-4 flex flex-col flex-1"><span class="text-sm font-medium text-gray-900 leading-snug mb-1 line-clamp-2">${ssrInterpolate(__props.item.name)}</span><div class="mt-auto pt-3 flex text-nowrap items-center justify-between gap-2"><span>`);
      if (unref(displayPrice)) {
        _push(`<div class="flex flex-col gap-1">`);
        if (unref(displayUOM)) {
          _push(`<span class="text-xs text-blue-400">შეკვრა</span>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(hasDiscount)) {
          _push(`<span class="text-xs text-red-500 line-through">${ssrInterpolate(unref(originalPrice))} ₾</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="flex items-center gap-1 5"><span class="text-base font-semibold text-gray-900">${ssrInterpolate(unref(displayPrice))} ₾</span>`);
        if (unref(displayUOM)) {
          _push(`<span class="text-xs text-gray-400">/ ${ssrInterpolate(unref(displayUOM))}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      } else {
        _push(`<!--[-->—<!--]-->`);
      }
      _push(`</span>`);
      _push(ssrRenderComponent(AddToCartButton, { item: __props.item }, null, _parent));
      _push(`</div></div></div>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        visible: showWhatsappDialog.value,
        "onUpdate:visible": ($event) => showWhatsappDialog.value = $event,
        onClick: () => {
        }
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$6, {
        visible: showNotifyDialog.value,
        "onUpdate:visible": ($event) => showNotifyDialog.value = $event,
        item: __props.item,
        onClick: () => {
        }
      }, null, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Shared/components/ItemCard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main$1 as _,
  _sfc_main as a
};
//# sourceMappingURL=ItemCard-BfY1qubs.js.map
