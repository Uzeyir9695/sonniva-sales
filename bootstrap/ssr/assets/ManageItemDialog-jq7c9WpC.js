import { s as script$2 } from "./index-YvTnrAwi.js";
import { s as script } from "./index-D46B4f3g.js";
import { ref, mergeProps, withCtx, unref, openBlock, createBlock, createVNode, toDisplayString, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { useForm } from "@inertiajs/vue3";
import { u as useToast } from "./index-Qb24q4w2.js";
import _sfc_main$1 from "./PrimeInputText-BlIRrCdA.js";
import { s as script$1 } from "./index-BgiqKOW-.js";
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
import "@primeuix/utils/zindex";
import "@primevue/icons/times";
import "@primevue/icons/windowmaximize";
import "@primevue/icons/windowminimize";
import "./index-zZrFrjQS.js";
import "@primeuix/styled";
import "@primeuix/styles/dialog";
import "./index-BAgOeBfa.js";
import "@primevue/core/baseinput";
import "@primeuix/styles/inputtext";
import "@primevue/icons/angledown";
import "@primevue/icons/angleup";
import "@primeuix/styles/inputnumber";
const _sfc_main = {
  __name: "ManageItemDialog",
  __ssrInlineRender: true,
  emits: ["saved"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const emit = __emit;
    const toast = useToast();
    const visible = ref(false);
    const editingItem = ref(null);
    const manageForm = useForm({
      video_url: "",
      discount: null,
      discount_amount: null,
      wholesale_discount_percent: null,
      vip_discount_percent: null,
      bc_discount_percent: null,
      fake_price: null
    });
    function open(item) {
      editingItem.value = item;
      manageForm.clearErrors();
      manageForm.video_url = item.video_url ?? "";
      manageForm.discount = item.discount ?? null;
      manageForm.wholesale_discount_percent = item.wholesale_discount_percent ?? null;
      manageForm.vip_discount_percent = item.vip_discount_percent ?? null;
      manageForm.bc_discount_percent = item.bc_discount_percent ?? null;
      manageForm.fake_price = item.fake_price ?? null;
      visible.value = true;
    }
    __expose({ open });
    function calcDiscountFromFakePrice() {
      const fakePrice = Number(manageForm.fake_price);
      const unitPrice = Number(editingItem.value?.unit_price);
      if (!fakePrice || !unitPrice) return;
      const bcDiscountPercent = Number(manageForm.bc_discount_percent) || 0;
      const targetPrice = bcDiscountPercent > 0 ? unitPrice * (1 - bcDiscountPercent / 100) : unitPrice;
      manageForm.discount = Math.round((fakePrice - targetPrice) / fakePrice * 100 * 1e4) / 1e4;
    }
    function saveItem() {
      manageForm.transform((data) => ({
        video_url: data.video_url.trim() || null,
        discount: data.discount || null,
        discount_amount: data.discount_amount || null,
        wholesale_discount_percent: data.wholesale_discount_percent || null,
        vip_discount_percent: data.vip_discount_percent || null,
        bc_discount_percent: data.bc_discount_percent || null,
        fake_price: data.fake_price || null
      })).put(route("admin.items.update", editingItem.value.id), {
        preserveScroll: true,
        onSuccess: (res) => {
          editingItem.value.video_url = manageForm.video_url.trim() || null;
          editingItem.value.fake_price = manageForm.fake_price || null;
          visible.value = false;
          toast.add({ severity: "success", summary: "Saved", detail: res.props.flash.message, life: 3e3 });
          emit("saved");
        }
      });
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Dialog = script;
      const _component_Button = script$2;
      _push(ssrRenderComponent(_component_Dialog, mergeProps({
        visible: visible.value,
        "onUpdate:visible": ($event) => visible.value = $event,
        modal: "",
        header: "Manage Item",
        style: { width: "28rem" }
      }, _attrs), {
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Button, {
              label: "Cancel",
              size: "small",
              severity: "secondary",
              variant: "text",
              onClick: ($event) => visible.value = false
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Button, {
              label: "Save",
              size: "small",
              icon: "pi pi-check",
              loading: unref(manageForm).processing,
              onClick: saveItem
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Button, {
                label: "Cancel",
                size: "small",
                severity: "secondary",
                variant: "text",
                onClick: ($event) => visible.value = false
              }, null, 8, ["onClick"]),
              createVNode(_component_Button, {
                label: "Save",
                size: "small",
                icon: "pi pi-check",
                loading: unref(manageForm).processing,
                onClick: saveItem
              }, null, 8, ["loading"])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (editingItem.value) {
              _push2(`<div class="space-y-4"${_scopeId}><div${_scopeId}><p class="text-sm font-medium text-gray-800"${_scopeId}>${ssrInterpolate(editingItem.value.name)}</p><p class="text-xs text-gray-400 font-mono"${_scopeId}>${ssrInterpolate(editingItem.value.no)}</p></div><div${_scopeId}><label class="text-sm font-semibold text-gray-500 mb-1 block"${_scopeId}>Video Link</label>`);
              _push2(ssrRenderComponent(_sfc_main$1, {
                modelValue: unref(manageForm).video_url,
                "onUpdate:modelValue": ($event) => unref(manageForm).video_url = $event,
                placeholder: "https://youtu.be/...",
                invalid: !!unref(manageForm).errors.video_url,
                class: "w-full",
                fluid: ""
              }, null, _parent2, _scopeId));
              if (unref(manageForm).errors.video_url) {
                _push2(`<p class="text-xs text-red-500 mt-1"${_scopeId}>${ssrInterpolate(unref(manageForm).errors.video_url)}</p>`);
              } else {
                _push2(`<p class="text-xs text-gray-400 mt-1"${_scopeId}>Paste the link from YouTube&#39;s Share button. Leave empty to remove the video.</p>`);
              }
              _push2(`</div><div${_scopeId}><label class="text-sm font-semibold text-gray-500 mb-1 block"${_scopeId}>Fake &quot;Was&quot; Price (₾)</label>`);
              _push2(ssrRenderComponent(unref(script$1), {
                modelValue: unref(manageForm).fake_price,
                "onUpdate:modelValue": ($event) => unref(manageForm).fake_price = $event,
                min: 0,
                "min-fraction-digits": 0,
                "max-fraction-digits": 2,
                suffix: " ₾",
                placeholder: "0",
                invalid: !!unref(manageForm).errors.fake_price,
                fluid: ""
              }, null, _parent2, _scopeId));
              if (unref(manageForm).errors.fake_price) {
                _push2(`<p class="text-xs text-red-500 mt-1"${_scopeId}>${ssrInterpolate(unref(manageForm).errors.fake_price)}</p>`);
              } else {
                _push2(`<p class="text-xs text-gray-400 mt-1"${_scopeId}>Must be higher than the unit price (${ssrInterpolate(Number(editingItem.value.unit_price).toFixed(2))} ₾). Shown struck-through as the &quot;was&quot; price; the unit price stays the real charge. Leave empty to disable.</p>`);
              }
              _push2(`</div><div${_scopeId}><div class="flex items-center justify-between mb-1"${_scopeId}><label class="text-sm font-semibold text-gray-500"${_scopeId}>Web Discount (in %)</label><button type="button" class="text-xs font-medium text-blue-600 bg-blue-100 hover:bg-blue-100 px-2.5 py-1 rounded-full transition-colors disabled:text-gray-300 disabled:bg-gray-50 disabled:cursor-not-allowed"${ssrIncludeBooleanAttr(!unref(manageForm).fake_price) ? " disabled" : ""}${_scopeId}> Calc from fake price </button></div>`);
              _push2(ssrRenderComponent(unref(script$1), {
                modelValue: unref(manageForm).discount,
                "onUpdate:modelValue": ($event) => unref(manageForm).discount = $event,
                min: 0,
                max: 100,
                "min-fraction-digits": 0,
                "max-fraction-digits": 4,
                suffix: "%",
                placeholder: "0",
                invalid: !!unref(manageForm).errors.discount,
                fluid: ""
              }, null, _parent2, _scopeId));
              if (unref(manageForm).errors.discount) {
                _push2(`<p class="text-xs text-red-500 mt-1"${_scopeId}>${ssrInterpolate(unref(manageForm).errors.discount)}</p>`);
              } else {
                _push2(`<p class="text-xs text-gray-400 mt-1"${_scopeId}>Percentage off unit price (off the fake price instead, if one is set). Leave empty for no discount.</p>`);
              }
              _push2(`</div><div${_scopeId}><label class="text-sm font-semibold text-gray-500 mb-1 block"${_scopeId}>BC Discount (in %)</label>`);
              _push2(ssrRenderComponent(unref(script$1), {
                modelValue: unref(manageForm).bc_discount_percent,
                "onUpdate:modelValue": ($event) => unref(manageForm).bc_discount_percent = $event,
                min: 0,
                max: 100,
                "min-fraction-digits": 0,
                "max-fraction-digits": 4,
                suffix: "%",
                placeholder: "0",
                invalid: !!unref(manageForm).errors.bc_discount_percent,
                fluid: ""
              }, null, _parent2, _scopeId));
              if (unref(manageForm).errors.bc_discount_percent) {
                _push2(`<p class="text-xs text-red-500 mt-1"${_scopeId}>${ssrInterpolate(unref(manageForm).errors.bc_discount_percent)}</p>`);
              } else {
                _push2(`<p class="text-xs text-gray-400 mt-1"${_scopeId}>Percentage sent to Business Central on regular (non-wholesale/VIP) orders. Independent of the Web Discount above unless an Amount Off is set below; leave empty to send no discount to BC.</p>`);
              }
              _push2(`</div><div${_scopeId}><label class="text-sm font-semibold text-gray-500 mb-1 block"${_scopeId}>Amount Off (₾)</label>`);
              _push2(ssrRenderComponent(unref(script$1), {
                modelValue: unref(manageForm).discount_amount,
                "onUpdate:modelValue": ($event) => unref(manageForm).discount_amount = $event,
                min: 0,
                max: Number(editingItem.value.unit_price),
                "min-fraction-digits": 0,
                "max-fraction-digits": 2,
                suffix: " ₾",
                placeholder: "0",
                invalid: !!unref(manageForm).errors.discount_amount,
                fluid: ""
              }, null, _parent2, _scopeId));
              if (unref(manageForm).errors.discount_amount) {
                _push2(`<p class="text-xs text-red-500 mt-1"${_scopeId}>${ssrInterpolate(unref(manageForm).errors.discount_amount)}</p>`);
              } else {
                _push2(`<p class="text-xs text-gray-400 mt-1"${_scopeId}>e.g. price is ${ssrInterpolate(Number(editingItem.value.unit_price).toFixed(2))} ₾, enter 1 to make it ${ssrInterpolate((editingItem.value.unit_price - 1).toFixed(2))} ₾. Overrides both the Web Discount and BC Discount percentages above if filled.</p>`);
              }
              _push2(`</div><div${_scopeId}><label class="text-sm font-semibold text-gray-500 mb-1 block"${_scopeId}>Wholesale Discount (in %)</label>`);
              _push2(ssrRenderComponent(unref(script$1), {
                modelValue: unref(manageForm).wholesale_discount_percent,
                "onUpdate:modelValue": ($event) => unref(manageForm).wholesale_discount_percent = $event,
                min: 0,
                max: 100,
                "min-fraction-digits": 0,
                "max-fraction-digits": 2,
                suffix: "%",
                placeholder: "0",
                invalid: !!unref(manageForm).errors.wholesale_discount_percent,
                fluid: ""
              }, null, _parent2, _scopeId));
              if (unref(manageForm).errors.wholesale_discount_percent) {
                _push2(`<p class="text-xs text-red-500 mt-1"${_scopeId}>${ssrInterpolate(unref(manageForm).errors.wholesale_discount_percent)}</p>`);
              } else {
                _push2(`<p class="text-xs text-gray-400 mt-1"${_scopeId}>Percentage off the Wholesale tier price. Leave empty for no extra discount.</p>`);
              }
              _push2(`</div><div${_scopeId}><label class="text-sm font-semibold text-gray-500 mb-1 block"${_scopeId}>VIP Discount (in %)</label>`);
              _push2(ssrRenderComponent(unref(script$1), {
                modelValue: unref(manageForm).vip_discount_percent,
                "onUpdate:modelValue": ($event) => unref(manageForm).vip_discount_percent = $event,
                min: 0,
                max: 100,
                "min-fraction-digits": 0,
                "max-fraction-digits": 2,
                suffix: "%",
                placeholder: "0",
                invalid: !!unref(manageForm).errors.vip_discount_percent,
                fluid: ""
              }, null, _parent2, _scopeId));
              if (unref(manageForm).errors.vip_discount_percent) {
                _push2(`<p class="text-xs text-red-500 mt-1"${_scopeId}>${ssrInterpolate(unref(manageForm).errors.vip_discount_percent)}</p>`);
              } else {
                _push2(`<p class="text-xs text-gray-400 mt-1"${_scopeId}>Percentage off the VIP tier price. Leave empty for no extra discount.</p>`);
              }
              _push2(`</div></div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              editingItem.value ? (openBlock(), createBlock("div", {
                key: 0,
                class: "space-y-4"
              }, [
                createVNode("div", null, [
                  createVNode("p", { class: "text-sm font-medium text-gray-800" }, toDisplayString(editingItem.value.name), 1),
                  createVNode("p", { class: "text-xs text-gray-400 font-mono" }, toDisplayString(editingItem.value.no), 1)
                ]),
                createVNode("div", null, [
                  createVNode("label", { class: "text-sm font-semibold text-gray-500 mb-1 block" }, "Video Link"),
                  createVNode(_sfc_main$1, {
                    modelValue: unref(manageForm).video_url,
                    "onUpdate:modelValue": ($event) => unref(manageForm).video_url = $event,
                    placeholder: "https://youtu.be/...",
                    invalid: !!unref(manageForm).errors.video_url,
                    class: "w-full",
                    fluid: ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "invalid"]),
                  unref(manageForm).errors.video_url ? (openBlock(), createBlock("p", {
                    key: 0,
                    class: "text-xs text-red-500 mt-1"
                  }, toDisplayString(unref(manageForm).errors.video_url), 1)) : (openBlock(), createBlock("p", {
                    key: 1,
                    class: "text-xs text-gray-400 mt-1"
                  }, "Paste the link from YouTube's Share button. Leave empty to remove the video."))
                ]),
                createVNode("div", null, [
                  createVNode("label", { class: "text-sm font-semibold text-gray-500 mb-1 block" }, 'Fake "Was" Price (₾)'),
                  createVNode(unref(script$1), {
                    modelValue: unref(manageForm).fake_price,
                    "onUpdate:modelValue": ($event) => unref(manageForm).fake_price = $event,
                    min: 0,
                    "min-fraction-digits": 0,
                    "max-fraction-digits": 2,
                    suffix: " ₾",
                    placeholder: "0",
                    invalid: !!unref(manageForm).errors.fake_price,
                    fluid: ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "invalid"]),
                  unref(manageForm).errors.fake_price ? (openBlock(), createBlock("p", {
                    key: 0,
                    class: "text-xs text-red-500 mt-1"
                  }, toDisplayString(unref(manageForm).errors.fake_price), 1)) : (openBlock(), createBlock("p", {
                    key: 1,
                    class: "text-xs text-gray-400 mt-1"
                  }, "Must be higher than the unit price (" + toDisplayString(Number(editingItem.value.unit_price).toFixed(2)) + ' ₾). Shown struck-through as the "was" price; the unit price stays the real charge. Leave empty to disable.', 1))
                ]),
                createVNode("div", null, [
                  createVNode("div", { class: "flex items-center justify-between mb-1" }, [
                    createVNode("label", { class: "text-sm font-semibold text-gray-500" }, "Web Discount (in %)"),
                    createVNode("button", {
                      type: "button",
                      class: "text-xs font-medium text-blue-600 bg-blue-100 hover:bg-blue-100 px-2.5 py-1 rounded-full transition-colors disabled:text-gray-300 disabled:bg-gray-50 disabled:cursor-not-allowed",
                      disabled: !unref(manageForm).fake_price,
                      onClick: calcDiscountFromFakePrice
                    }, " Calc from fake price ", 8, ["disabled"])
                  ]),
                  createVNode(unref(script$1), {
                    modelValue: unref(manageForm).discount,
                    "onUpdate:modelValue": ($event) => unref(manageForm).discount = $event,
                    min: 0,
                    max: 100,
                    "min-fraction-digits": 0,
                    "max-fraction-digits": 4,
                    suffix: "%",
                    placeholder: "0",
                    invalid: !!unref(manageForm).errors.discount,
                    fluid: ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "invalid"]),
                  unref(manageForm).errors.discount ? (openBlock(), createBlock("p", {
                    key: 0,
                    class: "text-xs text-red-500 mt-1"
                  }, toDisplayString(unref(manageForm).errors.discount), 1)) : (openBlock(), createBlock("p", {
                    key: 1,
                    class: "text-xs text-gray-400 mt-1"
                  }, "Percentage off unit price (off the fake price instead, if one is set). Leave empty for no discount."))
                ]),
                createVNode("div", null, [
                  createVNode("label", { class: "text-sm font-semibold text-gray-500 mb-1 block" }, "BC Discount (in %)"),
                  createVNode(unref(script$1), {
                    modelValue: unref(manageForm).bc_discount_percent,
                    "onUpdate:modelValue": ($event) => unref(manageForm).bc_discount_percent = $event,
                    min: 0,
                    max: 100,
                    "min-fraction-digits": 0,
                    "max-fraction-digits": 4,
                    suffix: "%",
                    placeholder: "0",
                    invalid: !!unref(manageForm).errors.bc_discount_percent,
                    fluid: ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "invalid"]),
                  unref(manageForm).errors.bc_discount_percent ? (openBlock(), createBlock("p", {
                    key: 0,
                    class: "text-xs text-red-500 mt-1"
                  }, toDisplayString(unref(manageForm).errors.bc_discount_percent), 1)) : (openBlock(), createBlock("p", {
                    key: 1,
                    class: "text-xs text-gray-400 mt-1"
                  }, "Percentage sent to Business Central on regular (non-wholesale/VIP) orders. Independent of the Web Discount above unless an Amount Off is set below; leave empty to send no discount to BC."))
                ]),
                createVNode("div", null, [
                  createVNode("label", { class: "text-sm font-semibold text-gray-500 mb-1 block" }, "Amount Off (₾)"),
                  createVNode(unref(script$1), {
                    modelValue: unref(manageForm).discount_amount,
                    "onUpdate:modelValue": ($event) => unref(manageForm).discount_amount = $event,
                    min: 0,
                    max: Number(editingItem.value.unit_price),
                    "min-fraction-digits": 0,
                    "max-fraction-digits": 2,
                    suffix: " ₾",
                    placeholder: "0",
                    invalid: !!unref(manageForm).errors.discount_amount,
                    fluid: ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "max", "invalid"]),
                  unref(manageForm).errors.discount_amount ? (openBlock(), createBlock("p", {
                    key: 0,
                    class: "text-xs text-red-500 mt-1"
                  }, toDisplayString(unref(manageForm).errors.discount_amount), 1)) : (openBlock(), createBlock("p", {
                    key: 1,
                    class: "text-xs text-gray-400 mt-1"
                  }, "e.g. price is " + toDisplayString(Number(editingItem.value.unit_price).toFixed(2)) + " ₾, enter 1 to make it " + toDisplayString((editingItem.value.unit_price - 1).toFixed(2)) + " ₾. Overrides both the Web Discount and BC Discount percentages above if filled.", 1))
                ]),
                createVNode("div", null, [
                  createVNode("label", { class: "text-sm font-semibold text-gray-500 mb-1 block" }, "Wholesale Discount (in %)"),
                  createVNode(unref(script$1), {
                    modelValue: unref(manageForm).wholesale_discount_percent,
                    "onUpdate:modelValue": ($event) => unref(manageForm).wholesale_discount_percent = $event,
                    min: 0,
                    max: 100,
                    "min-fraction-digits": 0,
                    "max-fraction-digits": 2,
                    suffix: "%",
                    placeholder: "0",
                    invalid: !!unref(manageForm).errors.wholesale_discount_percent,
                    fluid: ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "invalid"]),
                  unref(manageForm).errors.wholesale_discount_percent ? (openBlock(), createBlock("p", {
                    key: 0,
                    class: "text-xs text-red-500 mt-1"
                  }, toDisplayString(unref(manageForm).errors.wholesale_discount_percent), 1)) : (openBlock(), createBlock("p", {
                    key: 1,
                    class: "text-xs text-gray-400 mt-1"
                  }, "Percentage off the Wholesale tier price. Leave empty for no extra discount."))
                ]),
                createVNode("div", null, [
                  createVNode("label", { class: "text-sm font-semibold text-gray-500 mb-1 block" }, "VIP Discount (in %)"),
                  createVNode(unref(script$1), {
                    modelValue: unref(manageForm).vip_discount_percent,
                    "onUpdate:modelValue": ($event) => unref(manageForm).vip_discount_percent = $event,
                    min: 0,
                    max: 100,
                    "min-fraction-digits": 0,
                    "max-fraction-digits": 2,
                    suffix: "%",
                    placeholder: "0",
                    invalid: !!unref(manageForm).errors.vip_discount_percent,
                    fluid: ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "invalid"]),
                  unref(manageForm).errors.vip_discount_percent ? (openBlock(), createBlock("p", {
                    key: 0,
                    class: "text-xs text-red-500 mt-1"
                  }, toDisplayString(unref(manageForm).errors.vip_discount_percent), 1)) : (openBlock(), createBlock("p", {
                    key: 1,
                    class: "text-xs text-gray-400 mt-1"
                  }, "Percentage off the VIP tier price. Leave empty for no extra discount."))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/items/ManageItemDialog.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=ManageItemDialog-jq7c9WpC.js.map
