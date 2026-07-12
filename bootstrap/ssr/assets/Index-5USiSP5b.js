import { s as script } from "./index-BzRznsIW.js";
import { computed, onMounted, ref, watch, mergeProps, unref, withCtx, createVNode, createTextVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrRenderAttr, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { usePage, router, Link } from "@inertiajs/vue3";
import { u as useCart, S as STORAGE_KEYS } from "./useCart-CIcsIaQl.js";
import { _ as _sfc_main$1 } from "./StockNotifyButton-BihFmX1g.js";
import { s as script$1 } from "./index-BgiqKOW-.js";
import { c as calculateTierPrice } from "./usePricing-oDne5BPU.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "@primeuix/utils";
import "@primeuix/utils/object";
import "@primevue/icons/check";
import "@primevue/icons/minus";
import "@primevue/core/baseinput";
import "@primeuix/styles/checkbox";
import "@primevue/core/base/style";
import "axios";
import "./index-Qb24q4w2.js";
import "./StockNotifyDialog-DtRQgNBy.js";
import "./index-hSjFFc9a.js";
import "@primevue/icons/spinner";
import "@primevue/core/basecomponent";
import "@primeuix/styles/badge";
import "./index-BWQ0UkXI.js";
import "@primeuix/utils/dom";
import "@primevue/core/basedirective";
import "@primeuix/styles/ripple";
import "@primeuix/styles/button";
import "./index-nsBhLTBN.js";
import "@primeuix/utils/zindex";
import "@primevue/icons/times";
import "@primevue/icons/windowmaximize";
import "@primevue/icons/windowminimize";
import "./index-zZrFrjQS.js";
import "@primeuix/styled";
import "@primeuix/styles/dialog";
import "@primevue/icons/angledown";
import "@primevue/icons/angleup";
import "./index-BAgOeBfa.js";
import "@primeuix/styles/inputtext";
import "@primeuix/styles/inputnumber";
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    cartItems: { type: Array, required: true },
    subscribedItemIds: { type: Array, default: () => [] }
  },
  setup(__props) {
    const props = __props;
    const { updateQuantity, isLoading, getQuantity, count, syncFromServer } = useCart();
    const page = usePage();
    const isVip = computed(() => page.props.user?.can_view_vip ?? false);
    const rowKey = (c) => c.id ?? (c.selected_uom ? `${c.item_id}__${c.selected_uom}` : c.item_id);
    onMounted(() => {
      if (props.cartItems.length === 0 && count.value > 0) {
        syncFromServer();
        router.reload({ only: ["cartItems"] });
      }
    });
    const overLimit = (cartItem) => getQuantity(cartItem.item_id, cartItem.selected_uom) > cartItem.item.inventory;
    const anyOverLimit = computed(() => selectedItems.value.some((c) => overLimit(c)));
    const items = computed(
      () => props.cartItems.filter((c) => !removedIds.value.includes(rowKey(c)))
    );
    const removedIds = ref([]);
    const formatted = (val) => Number(val).toFixed(2);
    function getRetailPrice(item, selectedUOM = null) {
      if (item.unit_price > 0) return item.unit_price;
      if (!selectedUOM || !item.prices?.length) return null;
      return item.prices.find((p) => p.UOM === selectedUOM && p.priceGroup === "Retail")?.price ?? null;
    }
    function isVipPriceActive(item, qty, selectedUOM = null) {
      if (!isVip.value) return false;
      return calculateTierPrice(item, qty, selectedUOM, true) < calculateTierPrice(item, qty, selectedUOM, false);
    }
    const SELECTION_KEY = STORAGE_KEYS.cartSelection;
    const selectedIds = ref([]);
    const allIds = computed(() => items.value.map((c) => rowKey(c)));
    const inStockIds = computed(() => items.value.filter((c) => c.item.inventory > 0).map((c) => rowKey(c)));
    try {
      const saved = JSON.parse(localStorage.getItem(SELECTION_KEY) ?? "[]");
      const validKeys = new Set(allIds.value);
      selectedIds.value = saved.filter((k) => validKeys.has(k));
    } catch {
      selectedIds.value = [];
    }
    watch(selectedIds, (val) => {
      localStorage.setItem(SELECTION_KEY, JSON.stringify(val));
    }, { deep: true });
    const sortedItems = computed(
      () => [...items.value].sort((a, b) => {
        const aChecked = selectedIds.value.includes(rowKey(a)) ? 0 : 1;
        const bChecked = selectedIds.value.includes(rowKey(b)) ? 0 : 1;
        return aChecked - bChecked;
      })
    );
    const allSelected = computed(
      () => inStockIds.value.length > 0 && selectedIds.value.length === inStockIds.value.length
    );
    const someSelected = computed(
      () => selectedIds.value.length > 0 && selectedIds.value.length < inStockIds.value.length
    );
    function toggleAll() {
      if (allSelected.value) {
        selectedIds.value = [];
      } else {
        selectedIds.value = [...inStockIds.value];
      }
    }
    function toggleItem(cartItem) {
      const key = rowKey(cartItem);
      if (selectedIds.value.includes(key)) {
        selectedIds.value = selectedIds.value.filter((id) => id !== key);
      } else {
        selectedIds.value = [...selectedIds.value, key];
      }
    }
    const selectedItems = computed(
      () => items.value.filter((c) => selectedIds.value.includes(rowKey(c)))
    );
    const subtotal = computed(
      () => selectedItems.value.reduce((sum, c) => {
        const qty = getQuantity(c.item_id, c.selected_uom);
        return sum + calculateTierPrice(c.item, qty, c.selected_uom, isVip.value) * qty;
      }, 0)
    );
    const totalSavings = computed(
      () => selectedItems.value.reduce((sum, c) => {
        const qty = getQuantity(c.item_id, c.selected_uom);
        const originalTotal = c.item.unit_price * qty;
        const tieredTotal = calculateTierPrice(c.item, qty, c.selected_uom, isVip.value) * qty;
        return sum + Math.max(0, originalTotal - tieredTotal);
      }, 0)
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Checkbox = script;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-50 sm:my-4 sm:rounded-2xl" }, _attrs))} data-v-b30f998c><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12" data-v-b30f998c><div class="mb-8" data-v-b30f998c><h1 class="text-2xl font-bold text-gray-900" data-v-b30f998c>კალათა</h1><p class="text-gray-500 text-sm mt-1" data-v-b30f998c>${ssrInterpolate(items.value.length)} პროდუქტი </p></div>`);
      if (!items.value.length) {
        _push(`<div class="flex flex-col items-center justify-center py-32 text-center" data-v-b30f998c><i class="pi pi-shopping-cart text-gray-200 text-7xl mb-6" data-v-b30f998c></i><h2 class="text-lg font-semibold text-gray-700 mb-2" data-v-b30f998c>კალათა ცარიელია</h2><p class="text-gray-400 text-sm mb-8 max-w-xs" data-v-b30f998c> დაამატე პროდუქტები კალათაში და შემდეგ გააგრძელე შეძენა. </p>`);
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("home"),
          class: "inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-400 text-white rounded-2xl px-6 py-3 text-sm font-semibold active:scale-[0.98] transition-all cursor-pointer"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<i class="pi pi-arrow-left text-xs" data-v-b30f998c${_scopeId}></i> შოპინგის გაგრძელება `);
            } else {
              return [
                createVNode("i", { class: "pi pi-arrow-left text-xs" }),
                createTextVNode(" შოპინგის გაგრძელება ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<div class="grid grid-cols-1 lg:grid-cols-3 gap-6" data-v-b30f998c><div class="lg:col-span-2 flex flex-col gap-3" data-v-b30f998c><div class="flex items-center gap-3 px-1 pb-1" data-v-b30f998c>`);
        _push(ssrRenderComponent(_component_Checkbox, {
          modelValue: allSelected.value,
          indeterminate: someSelected.value,
          binary: "",
          onChange: toggleAll,
          inputId: "select-all",
          class: "cursor-pointer"
        }, null, _parent));
        _push(`<label for="select-all" class="text-sm text-gray-500 cursor-pointer select-none" data-v-b30f998c> ყველას არჩევა (${ssrInterpolate(items.value.length)}) </label>`);
        if (selectedIds.value.length > 0) {
          _push(`<span class="text-xs text-gray-400 ml-auto" data-v-b30f998c>${ssrInterpolate(selectedIds.value.length)} არჩეულია </span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><!--[-->`);
        ssrRenderList(sortedItems.value, (cartItem) => {
          _push(`<div class="${ssrRenderClass([cartItem.item.inventory <= 0 ? "border-gray-100" : selectedIds.value.includes(rowKey(cartItem)) ? "border-brand-200 bg-brand-50/20" : "border-gray-100", "bg-white rounded-2xl border shadow-sm p-4 transition-all duration-150"])}" data-v-b30f998c><div class="flex items-center gap-4" data-v-b30f998c>`);
          _push(ssrRenderComponent(_component_Checkbox, {
            modelValue: selectedIds.value.includes(rowKey(cartItem)),
            binary: "",
            disabled: cartItem.item.inventory <= 0,
            onChange: ($event) => cartItem.item.inventory > 0 && toggleItem(cartItem),
            class: ["shrink-0", cartItem.item.inventory > 0 ? "cursor-pointer" : "cursor-not-allowed"]
          }, null, _parent));
          _push(`<div class="w-18 h-18 rounded-xl overflow-hidden bg-gray-100 shrink-0" data-v-b30f998c>`);
          if (cartItem.item.images?.length) {
            _push(`<img${ssrRenderAttr("src", `${cartItem.item.storage_path}/${cartItem.item.images[0]}`)}${ssrRenderAttr("alt", cartItem.item.name)} class="${ssrRenderClass([cartItem.item.inventory <= 0 ? " opacity-60" : "", "w-full h-full object-cover"])}" data-v-b30f998c>`);
          } else {
            _push(`<div class="w-full h-full flex items-center justify-center" data-v-b30f998c><i class="pi pi-image text-gray-300 text-sm" data-v-b30f998c></i></div>`);
          }
          _push(`</div><div class="flex-1 min-w-0" data-v-b30f998c>`);
          _push(ssrRenderComponent(unref(Link), {
            href: _ctx.route("items.show", cartItem.item.slug),
            class: "text-sm font-semibold text-gray-900 line-clamp-2 leading-snug hover:text-brand-500 transition-colors"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(cartItem.item.name)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(cartItem.item.name), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          if (cartItem.item.inventory <= 0) {
            _push(`<div class="flex items-center gap-1 mt-1 text-red-600 bg-red-100 px-2 py-0.5 rounded-full w-fit" data-v-b30f998c><div class="w-2 h-2 rounded-full bg-red-500" data-v-b30f998c></div>`);
            if (cartItem.item.inventory <= 0) {
              _push(`<span class="inline-flex items-center gap-1 text-xs font-medium" data-v-b30f998c> მარაგში არ არის </span>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<div class="flex items-center gap-2 mt-1" data-v-b30f998c>`);
          if (getRetailPrice(cartItem.item, cartItem.selected_uom) !== null && unref(calculateTierPrice)(cartItem.item, unref(getQuantity)(cartItem.item_id, cartItem.selected_uom), cartItem.selected_uom, isVip.value) < getRetailPrice(cartItem.item, cartItem.selected_uom)) {
            _push(`<span class="text-sm text-gray-400 line-through" data-v-b30f998c>${ssrInterpolate(formatted(getRetailPrice(cartItem.item, cartItem.selected_uom)))} ₾ </span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<p class="${ssrRenderClass([cartItem.item.inventory <= 0 ? " opacity-60" : "", "text-brand-500 font-bold text-base"])}" data-v-b30f998c>${ssrInterpolate(formatted(unref(calculateTierPrice)(cartItem.item, unref(getQuantity)(cartItem.item_id), cartItem.selected_uom, isVip.value)))} ₾ `);
          if (cartItem.selected_uom) {
            _push(`<span class="text-xs font-normal text-gray-400" data-v-b30f998c>/ ${ssrInterpolate(cartItem.selected_uom)}</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</p>`);
          if (isVipPriceActive(cartItem.item, unref(getQuantity)(cartItem.item_id, cartItem.selected_uom), cartItem.selected_uom)) {
            _push(`<span class="text-xs font-semibold text-purple-600 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded-full" data-v-b30f998c>VIP</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
          if (cartItem.item.inventory > 0) {
            _push(`<div class="flex items-center gap-3 mt-3 flex-wrap" data-v-b30f998c><div class="${ssrRenderClass([overLimit(cartItem) ? "border-red-500" : "", "flex items-center border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm w-fit"])}" data-v-b30f998c><button${ssrIncludeBooleanAttr(unref(getQuantity)(cartItem.item_id, cartItem.selected_uom) <= 1 || unref(isLoading)(cartItem.item_id, cartItem.selected_uom)) ? " disabled" : ""} class="w-8 h-8 flex items-center justify-center cursor-pointer text-gray-500 hover:bg-gray-50 transition disabled:text-gray-300 disabled:cursor-not-allowed" data-v-b30f998c><i class="pi pi-minus text-xs" data-v-b30f998c></i></button>`);
            _push(ssrRenderComponent(unref(script$1), {
              "model-value": unref(getQuantity)(cartItem.item_id, cartItem.selected_uom),
              min: 1,
              "use-grouping": false,
              onInput: (e) => {
                if (e.value !== null) unref(updateQuantity)(cartItem.item_id, e.value, cartItem.selected_uom);
              },
              "input-style": { width: "2.5rem", textAlign: "center", padding: "0", boxShadow: "none", border: "none", fontWeight: "600", fontSize: "0.875rem" }
            }, null, _parent));
            _push(`<button${ssrIncludeBooleanAttr(unref(isLoading)(cartItem.item_id, cartItem.selected_uom) || unref(getQuantity)(cartItem.item_id, cartItem.selected_uom) >= cartItem.item.inventory) ? " disabled" : ""} class="w-8 h-8 flex items-center justify-center cursor-pointer text-gray-500 hover:bg-gray-50 transition disabled:text-gray-300 disabled:cursor-not-allowed" data-v-b30f998c><i class="pi pi-plus text-xs" data-v-b30f998c></i></button></div><span class="text-sm text-gray-400" data-v-b30f998c> სულ: <span class="font-semibold text-gray-700" data-v-b30f998c>${ssrInterpolate(formatted(unref(calculateTierPrice)(cartItem.item, unref(getQuantity)(cartItem.item_id, cartItem.selected_uom), cartItem.selected_uom, isVip.value) * unref(getQuantity)(cartItem.item_id, cartItem.selected_uom)))} ₾</span></span>`);
            if (getRetailPrice(cartItem.item, cartItem.selected_uom) !== null && unref(calculateTierPrice)(cartItem.item, unref(getQuantity)(cartItem.item_id, cartItem.selected_uom), cartItem.selected_uom, isVip.value) < getRetailPrice(cartItem.item, cartItem.selected_uom)) {
              _push(`<span class="${ssrRenderClass(isVipPriceActive(cartItem.item, unref(getQuantity)(cartItem.item_id, cartItem.selected_uom), cartItem.selected_uom) ? "flex items-center text-xs text-purple-600 font-medium bg-purple-50 border border-purple-200 px-2 py-0.5 rounded-full" : "flex items-center text-xs text-emerald-600 font-medium bg-emerald-50 px-2 py-0.5 rounded-full")}" data-v-b30f998c><i class="pi pi-tag text-xs mr-1" data-v-b30f998c></i>`);
              if (isVipPriceActive(cartItem.item, unref(getQuantity)(cartItem.item_id, cartItem.selected_uom), cartItem.selected_uom)) {
                _push(`<!--[--> VIP დანაზოგი: ${ssrInterpolate(formatted((getRetailPrice(cartItem.item, cartItem.selected_uom) - unref(calculateTierPrice)(cartItem.item, unref(getQuantity)(cartItem.item_id, cartItem.selected_uom), cartItem.selected_uom, isVip.value)) * unref(getQuantity)(cartItem.item_id, cartItem.selected_uom)))} ₾ <!--]-->`);
              } else {
                _push(`<!--[--> დანაზოგი: ${ssrInterpolate(formatted((getRetailPrice(cartItem.item, cartItem.selected_uom) - unref(calculateTierPrice)(cartItem.item, unref(getQuantity)(cartItem.item_id, cartItem.selected_uom), cartItem.selected_uom, isVip.value)) * unref(getQuantity)(cartItem.item_id, cartItem.selected_uom)))} ₾ <!--]-->`);
              }
              _push(`</span>`);
            } else {
              _push(`<!---->`);
            }
            if (overLimit(cartItem)) {
              _push(`<p class="text-xs text-red-600" data-v-b30f998c> ხელმისაწვდომი რაოდენობაა ${ssrInterpolate(cartItem.item.inventory)}</p>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div><button${ssrIncludeBooleanAttr(unref(isLoading)(cartItem.item_id)) ? " disabled" : ""} class="shrink-0 self-start w-8 h-8 flex items-center justify-center cursor-pointer rounded-xl text-gray-300 hover:text-red-400 hover:bg-red-50 transition-all duration-150 disabled:opacity-50" data-v-b30f998c><i class="pi pi-trash text-sm" data-v-b30f998c></i></button></div>`);
          if (cartItem.item.inventory < 1) {
            _push(`<div class="mt-3 w-full max-w-80 max-md:mx-auto ml-auto" data-v-b30f998c>`);
            _push(ssrRenderComponent(_sfc_main$1, {
              item: cartItem.item,
              isSubscribed: __props.subscribedItemIds.includes(cartItem.item_id)
            }, null, _parent));
            _push(`</div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        });
        _push(`<!--]-->`);
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("home"),
          class: "self-start flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-700 transition-colors mt-2"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<i class="pi pi-arrow-left text-xs" data-v-b30f998c${_scopeId}></i> შოპინგის გაგრძელება `);
            } else {
              return [
                createVNode("i", { class: "pi pi-arrow-left text-xs" }),
                createTextVNode(" შოპინგის გაგრძელება ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div><div class="lg:col-span-1" data-v-b30f998c><div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sticky top-28" data-v-b30f998c><h2 class="text-base font-bold text-gray-900 mb-5" data-v-b30f998c>შეკვეთის შეჯამება</h2><div class="space-y-3 text-sm" data-v-b30f998c><div class="flex justify-between text-gray-500" data-v-b30f998c><span data-v-b30f998c>${ssrInterpolate(selectedItems.value.length)} პროდუქტი</span><span class="font-medium text-gray-700" data-v-b30f998c>`);
        if (totalSavings.value > 0) {
          _push(`<span class="line-through text-gray-400 mr-1" data-v-b30f998c>${ssrInterpolate(formatted(subtotal.value + totalSavings.value))} ₾</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<span data-v-b30f998c>${ssrInterpolate(formatted(subtotal.value))} ₾</span></span></div>`);
        if (totalSavings.value > 0) {
          _push(`<div class="flex justify-between text-emerald-600" data-v-b30f998c><span class="flex items-center gap-1" data-v-b30f998c><i class="pi pi-tag text-xs" data-v-b30f998c></i> ჯამური დანაზოგი </span><span class="font-medium" data-v-b30f998c>-${ssrInterpolate(formatted(totalSavings.value))} ₾</span></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="h-px bg-gray-100 my-5" data-v-b30f998c></div><div class="flex justify-between items-center mb-6" data-v-b30f998c><span class="font-bold text-gray-900" data-v-b30f998c>სულ</span><span class="text-xl font-bold text-brand-500" data-v-b30f998c>${ssrInterpolate(formatted(subtotal.value))} ₾</span></div><button${ssrIncludeBooleanAttr(selectedIds.value.length === 0 || anyOverLimit.value) ? " disabled" : ""} class="${ssrRenderClass([selectedIds.value.length > 0 && !anyOverLimit.value ? "bg-brand-500 hover:bg-brand-400 text-white" : "bg-gray-100 text-gray-400", "w-full py-3.5 rounded-2xl font-semibold text-sm transition-all shadow-md cursor-pointer active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"])}" data-v-b30f998c><i class="pi pi-wallet mr-2" data-v-b30f998c></i> შეკვეთის გაფორმება `);
        if (selectedIds.value.length > 0) {
          _push(`<span class="ml-1 opacity-75" data-v-b30f998c>(${ssrInterpolate(selectedIds.value.length)})</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</button><div class="mt-4 flex items-center justify-center gap-2 text-xs text-gray-400" data-v-b30f998c><i class="pi pi-lock text-xs" data-v-b30f998c></i> უსაფრთხო გადახდა </div></div></div></div>`);
      }
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Cart/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-b30f998c"]]);
export {
  Index as default
};
//# sourceMappingURL=Index-5USiSP5b.js.map
