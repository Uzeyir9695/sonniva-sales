import { T as Tooltip } from "./index-C3Ts-4IM.js";
import { s as script$5, a as script$6 } from "./index-CYNLBuLC.js";
import { s as script$2, a as script$3, b as script$4 } from "./index-fvkEaty1.js";
import { _ as _sfc_main$1, s as script$1 } from "./Breadcrumbs-DHQ88nK8.js";
import { ref, onMounted, computed, watch, unref, withCtx, createVNode, openBlock, createBlock, createCommentVNode, createSlots, toDisplayString, mergeProps, createTextVNode, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderClass, ssrRenderAttrs, ssrGetDirectiveProps, ssrRenderList, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { usePage, Head, Deferred, Link } from "@inertiajs/vue3";
import { useClipboard } from "@vueuse/core";
import _sfc_main$6 from "./SimilarItems-DDpePGo2.js";
import _sfc_main$2 from "./ItemGallery-B72UFyX_.js";
import { b as _sfc_main$3, _ as _sfc_main$4 } from "./QuickViewDialog-NNHt1a_n.js";
import { _ as _sfc_main$5 } from "./StockNotifyButton-CruZHgqL.js";
import { _ as _sfc_main$7 } from "./ItemCard-Cq-TqBSy.js";
import { u as useCart } from "./useCart-CIcsIaQl.js";
import { u as usePricing } from "./usePricing-oDne5BPU.js";
import { f as formatDiscount } from "./numberFormat-BgUHwZc2.js";
import { s as script } from "./index-BgiqKOW-.js";
import "@primeuix/utils/dom";
import "@primeuix/utils/object";
import "@primeuix/utils/uuid";
import "@primeuix/utils/zindex";
import "@primevue/core/utils";
import "@primevue/core/basedirective";
import "@primeuix/styles/tooltip";
import "@primevue/core/base/style";
import "@primevue/core/basecomponent";
import "@primeuix/utils";
import "./index-YvTnrAwi.js";
import "@primevue/icons/spinner";
import "@primeuix/styles/badge";
import "@primeuix/styles/ripple";
import "@primeuix/styles/button";
import "@primevue/icons/chevronleft";
import "@primevue/icons/chevronright";
import "@primeuix/styles/tabs";
import "@primevue/icons/minus";
import "@primevue/icons/plus";
import "@primeuix/styles/panel";
import "./SwiperCarousel-CbaFFUjQ.js";
import "swiper/vue";
import "swiper/modules";
/* empty css                    */
import "vue3-zoomer";
import "./index-D46B4f3g.js";
import "@primevue/icons/times";
import "@primevue/icons/windowmaximize";
import "@primevue/icons/windowminimize";
import "./index-zZrFrjQS.js";
import "@primeuix/styled";
import "@primeuix/styles/dialog";
import "axios";
import "./StockNotifyDialog-BIX42gC9.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./index-Qb24q4w2.js";
import "@primevue/icons/angledown";
import "@primevue/icons/angleup";
import "./index-BAgOeBfa.js";
import "@primevue/core/baseinput";
import "@primeuix/styles/inputtext";
import "@primeuix/styles/inputnumber";
function useGtag() {
  const track = (event, params = {}) => {
    if (typeof window.gtag === "function") {
      window.gtag("event", event, params);
    }
  };
  return { track };
}
const _sfc_main = {
  __name: "Show",
  __ssrInlineRender: true,
  props: {
    item: Object,
    similarItems: Array,
    attributes: Array,
    breadcrumbs: Array,
    inventory: Object,
    isSubscribedToNotification: Boolean,
    isOrderOnly: Boolean
  },
  setup(__props) {
    const props = __props;
    const showWhatsappDialog = ref(false);
    const { isInCart } = useCart();
    const { track } = useGtag();
    onMounted(() => {
      track("view_item", {
        currency: "GEL",
        value: props.item?.unit_price ?? 0,
        items: [{ item_id: String(props.item?.id), item_name: props.item?.name, price: props.item?.unit_price }]
      });
    });
    const { copy: copyNo, copied: copiedNo } = useClipboard();
    const { copy: copyName, copied: copiedName } = useClipboard();
    const images = computed(() => {
      if (props.item?.images?.length) return props.item.images;
      if (props.item?.image) return [props.item.image];
      return [];
    });
    const { isPackageItem, prices, displayPrice, hasDiscount, originalPrice } = usePricing(() => props.item);
    const selectedEntry = ref(null);
    watch(prices, (val) => {
      selectedEntry.value = val[0] ?? null;
    }, { immediate: true });
    const quantity = ref(1);
    const inStock = computed(() => props.item?.inventory > 0);
    const atMax = computed(() => quantity.value >= props.item?.inventory);
    const overLimit = computed(() => props.item?.inventory > 0 && quantity.value > props.item?.inventory);
    const activeTab = ref("0");
    const metaDescription = computed(() => {
      const desc = props.item?.description;
      if (desc) return desc.length > 155 ? desc.slice(0, 152) + "..." : desc;
      return props.item?.name ?? "";
    });
    const ogImage = computed(() => {
      if (!images.value.length) return null;
      return usePage().props.ziggy.url + props.item.storage_path + "/" + images.value[0];
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Panel = script$1;
      const _component_Tabs = script$2;
      const _component_TabList = script$3;
      const _component_Tab = script$4;
      const _component_TabPanels = script$5;
      const _component_TabPanel = script$6;
      const _directive_tooltip = Tooltip;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: __props.item?.name
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<meta name="description"${ssrRenderAttr("content", metaDescription.value)}${_scopeId}><meta property="og:type" content="product"${_scopeId}><meta property="og:site_name" content="Sonniva"${_scopeId}><meta property="og:title"${ssrRenderAttr("content", __props.item?.name)}${_scopeId}><meta property="og:description"${ssrRenderAttr("content", metaDescription.value)}${_scopeId}><meta property="og:url"${ssrRenderAttr("content", _ctx.$page.props.ziggy.location)}${_scopeId}>`);
            if (ogImage.value) {
              _push2(`<meta property="og:image"${ssrRenderAttr("content", ogImage.value)}${_scopeId}>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("meta", {
                name: "description",
                content: metaDescription.value
              }, null, 8, ["content"]),
              createVNode("meta", {
                property: "og:type",
                content: "product"
              }),
              createVNode("meta", {
                property: "og:site_name",
                content: "Sonniva"
              }),
              createVNode("meta", {
                property: "og:title",
                content: __props.item?.name
              }, null, 8, ["content"]),
              createVNode("meta", {
                property: "og:description",
                content: metaDescription.value
              }, null, 8, ["content"]),
              createVNode("meta", {
                property: "og:url",
                content: _ctx.$page.props.ziggy.location
              }, null, 8, ["content"]),
              ogImage.value ? (openBlock(), createBlock("meta", {
                key: 0,
                property: "og:image",
                content: ogImage.value
              }, null, 8, ["content"])) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="min-h-screen bg-[#f8f7 f4]">`);
      _push(ssrRenderComponent(_sfc_main$1, {
        breadcrumbs: __props.breadcrumbs,
        class: "bg-white rounded-xl mt-3"
      }, null, _parent));
      _push(`<div class="mx-auto py-5 sm:pb-10 max-sm:mx-3"><div class="grid grid-cols-1 lg:grid-cols-7 gap-6"><div class="lg:col-span-4 lg:row-start-1 lg:row-end-2 order-1">`);
      _push(ssrRenderComponent(_sfc_main$2, {
        images: images.value,
        "item-name": __props.item.name,
        "image-path": __props.item.storage_path,
        "video-url": __props.item.video_url
      }, createSlots({ _: 2 }, [
        unref(hasDiscount) ? {
          name: "badge",
          fn: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="absolute top-3 right-3 z-10 text-xs sm:text-sm font-bold px-3 py-1.5 rounded-full bg-red-500 text-white shadow-md"${_scopeId}> -${ssrInterpolate(unref(formatDiscount)(__props.item.discount))}% </span>`);
            } else {
              return [
                createVNode("span", { class: "absolute top-3 right-3 z-10 text-xs sm:text-sm font-bold px-3 py-1.5 rounded-full bg-red-500 text-white shadow-md" }, " -" + toDisplayString(unref(formatDiscount)(__props.item.discount)) + "% ", 1)
              ];
            }
          }),
          key: "0"
        } : void 0
      ]), _parent));
      _push(`</div><div class="bg-white lg:col-span-3 lg:row-start-1 lg:row-end-3 order-2 lg:sticky lg:top-28 h-fit border border-gray-100 p-3 rounded-2xl shadow-xs"><div class="flex justify-between items-center mb-4"><div class="${ssrRenderClass([inStock.value ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-600", "flex items-center gap-x-1 text-xs px-4 py-1.5 rounded-full font-medium tracking-wide"])}">`);
      if (inStock.value) {
        _push(`<div class="w-2 h-2 rounded-full bg-emerald-700 animate-pulse"></div>`);
      } else {
        _push(`<!---->`);
      }
      if (!inStock.value) {
        _push(`<div class="w-2 h-2 rounded-full bg-red-500"></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<span>${ssrInterpolate(inStock.value ? "მარაგშია" : "მარაგში არ არის")}</span></div><div class="flex items-center gap-3">`);
      _push(ssrRenderComponent(_sfc_main$3, {
        "item-id": __props.item.id,
        size: "sm",
        variant: "pill",
        class: "border border-gray-100 rounded-lg! shrink-0"
      }, null, _parent));
      _push(`</div></div><div class="flex items-center gap-2 mb-2"><p class="text-xs sm:text-sm font-semibold text-gray-500 leading-snug">${ssrInterpolate(__props.item?.no)}</p><div${ssrRenderAttrs(mergeProps({ class: "flex items-center justify-center w-5 h-5 cursor-pointer" }, ssrGetDirectiveProps(_ctx, _directive_tooltip, "დააკოპირე პროდუქტის კოდი", void 0, { bottom: true })))}>`);
      if (unref(copiedNo)) {
        _push(`<i class="pi pi-check text-emerald-500 text-xs"></i>`);
      } else {
        _push(`<i class="pi pi-copy text-gray-400 text-sm"></i>`);
      }
      _push(`</div></div><div class="flex items-center gap-2 mb-2"><h1 class="sm:text-xl font-semibold text-gray-900 leading-snug">${ssrInterpolate(__props.item.name)}</h1><div${ssrRenderAttrs(mergeProps({ class: "flex items-center justify-center w-5 h-5 cursor-pointer shrink-0" }, ssrGetDirectiveProps(_ctx, _directive_tooltip, "დააკოპირე პროდუქტის სახელი", void 0, { bottom: true })))}>`);
      if (unref(copiedName)) {
        _push(`<i class="pi pi-check text-emerald-500 text-xs"></i>`);
      } else {
        _push(`<i class="pi pi-copy text-gray-400 text-sm"></i>`);
      }
      _push(`</div></div><div class="flex items-center gap-3 mb-8 flex-wrap">`);
      if (unref(hasDiscount)) {
        _push(`<span class="text-base sm:text-lg text-red-500 line-through">${ssrInterpolate(unref(originalPrice))} ₾ </span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<span class="text-lg sm:text-2xl font-bold text-brand-500 tracking-tight">${ssrInterpolate(unref(isPackageItem) ? selectedEntry.value?.price : unref(displayPrice))} ₾ </span>`);
      if (unref(isPackageItem) && selectedEntry.value?.UOM) {
        _push(`<span class="text-sm text-gray-400"> / ${ssrInterpolate(selectedEntry.value.UOM)}</span>`);
      } else if (__props.item.base_uom_desc) {
        _push(`<span class="text-sm text-gray-400"> / ${ssrInterpolate(__props.item.base_uom_desc)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      _push(ssrRenderComponent(unref(Deferred), { data: "inventory" }, {
        fallback: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center gap-3 mt-4 mb-6"${_scopeId}><div class="flex-1 h-[52px] bg-gray-100 rounded-2xl animate-pulse"${_scopeId}></div><div class="flex-1 h-[52px] bg-gray-100 rounded-2xl animate-pulse"${_scopeId}></div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center gap-3 mt-4 mb-6" }, [
                createVNode("div", { class: "flex-1 h-[52px] bg-gray-100 rounded-2xl animate-pulse" }),
                createVNode("div", { class: "flex-1 h-[52px] bg-gray-100 rounded-2xl animate-pulse" })
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex flex-wrap items-center gap-3 mt-4 mb-6"${_scopeId}><div class="flex-1 flex flex-col sm:flex-row items-center justify-between bg-gray-50 border border-gray-100 rounded-2xl px-2 sm:px-4 py-3"${_scopeId}><div class="flex items-center gap-2 text-nowrap"${_scopeId}><i class="pi pi-warehouse text-brand-500 text-sm"${_scopeId}></i><span class="text-xs sm:text-sm text-gray-500"${_scopeId}>ავჭალის ფილიალი</span></div><span class="text-sm font-semibold text-gray-800"${_scopeId}>${ssrInterpolate(__props.inventory.shop2Total)}</span></div><div class="flex-1 flex flex-col sm:flex-row items-center justify-between bg-gray-50 border border-gray-100 rounded-2xl px-2 sm:px-4 py-3"${_scopeId}><div class="flex items-center gap-2 text-nowrap"${_scopeId}><i class="pi pi-warehouse text-brand-500 text-sm"${_scopeId}></i><span class="text-xs sm:text-sm text-gray-500"${_scopeId}>დიდუბის ფილიალი</span></div><span class="text-sm font-semibold text-gray-800"${_scopeId}>${ssrInterpolate(__props.inventory.shop1Total)}</span></div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex flex-wrap items-center gap-3 mt-4 mb-6" }, [
                createVNode("div", { class: "flex-1 flex flex-col sm:flex-row items-center justify-between bg-gray-50 border border-gray-100 rounded-2xl px-2 sm:px-4 py-3" }, [
                  createVNode("div", { class: "flex items-center gap-2 text-nowrap" }, [
                    createVNode("i", { class: "pi pi-warehouse text-brand-500 text-sm" }),
                    createVNode("span", { class: "text-xs sm:text-sm text-gray-500" }, "ავჭალის ფილიალი")
                  ]),
                  createVNode("span", { class: "text-sm font-semibold text-gray-800" }, toDisplayString(__props.inventory.shop2Total), 1)
                ]),
                createVNode("div", { class: "flex-1 flex flex-col sm:flex-row items-center justify-between bg-gray-50 border border-gray-100 rounded-2xl px-2 sm:px-4 py-3" }, [
                  createVNode("div", { class: "flex items-center gap-2 text-nowrap" }, [
                    createVNode("i", { class: "pi pi-warehouse text-brand-500 text-sm" }),
                    createVNode("span", { class: "text-xs sm:text-sm text-gray-500" }, "დიდუბის ფილიალი")
                  ]),
                  createVNode("span", { class: "text-sm font-semibold text-gray-800" }, toDisplayString(__props.inventory.shop1Total), 1)
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--[-->`);
      ssrRenderList(__props.item.prices, (price) => {
        _push(`<!--[-->`);
        if (price.priceGroup === "VIP" && _ctx.$page.props.user?.can_view_vip || price.priceGroup !== "VIP" && _ctx.$page.props.user?.can_view_wholesales) {
          _push(`<div class="flex items-center justify-between bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3 mb-2 hover:border-brand-200 hover:bg-brand-50/30 transition-all duration-150"><div class="flex-1"><p class="text-sm font-semibold text-gray-800 mb-1">${ssrInterpolate(price.priceGroup === "VIP" ? "VIP" : price.priceGroup === "Wholesales" ? "საბითუმო" : __props.item?.unit_price === "0.00" ? "შეკვრა" : "საცალო")}</p>`);
          if (price.custMinQuantity > 0) {
            _push(`<div class="flex items-center gap-1.5"><p class="text-sm text-gray-500"> ფასი ვრცელდება <span class="text-sm mx-1 text-gray-600 font-semibold">${ssrInterpolate(price.custMinQuantity)}</span> ${ssrInterpolate(__props.item?.unit_price === "0.00" ? "შეკვრის შეძენის შემთხვევაში" : "ცალის შეძენის შემთხვევაში")}</p></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div><div class="text-right ml-4"><p class="text-xs text-gray-400 mb-0.5">${ssrInterpolate(__props.item.unit_price === "0.00" ? "შეკვრის ფასი" : "ცალის ფასი")}</p><div class="flex items-center gap-2"><p class="text-brand-500 font-bold text-xl">${ssrInterpolate(price.price)}<span class="text-sm ml-0.5">₾</span></p>`);
          if (price.UOM) {
            _push(`<div><i class="pi pi-box text-gray-400 text-xs"></i><p class="text-sm text-gray-400 mt-0.5">${ssrInterpolate(price.UOM)}</p></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      });
      _push(`<!--]--><div class="h-px bg-gray-200 mb-8"></div>`);
      if (unref(isPackageItem)) {
        _push(`<div class="mb-6"><p class="text-xs text-gray-400 mb-2">აირჩიეთ შეკვრა</p><div class="flex flex-wrap gap-2"><!--[-->`);
        ssrRenderList(unref(prices), (entry) => {
          _push(`<button class="${ssrRenderClass([selectedEntry.value?.UOM === entry.UOM ? "border-brand-500 bg-brand-50 text-brand-600" : "border-gray-200 bg-white text-gray-700 hover:border-gray-300", "flex flex-col items-center px-3 py-2 rounded-xl border font-medium transition-all duration-150 cursor-pointer"])}"><span class="${ssrRenderClass([selectedEntry.value?.UOM === entry.UOM ? "text-brand-500" : "text-gray-400", "max-sm:text-sm mt-0.5"])}">${ssrInterpolate(entry.price)} ₾ </span><span class="text-xs sm:text-sm font-semibold">${ssrInterpolate(entry.UOM)}</span></button>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="space-y-3"><div class="flex items-center gap-3">`);
      if (inStock.value) {
        _push(`<div class="flex flex-col justify-center gap-y-1"><div class="${ssrRenderClass([overLimit.value ? "border-red-500" : "", "flex items-center border max-sm:px-2 border-gray-100 rounded-2xl overflow-hidden w-fit shadow-sm bg-white"])}"><button class="${ssrRenderClass([quantity.value > 1 ? "cursor-pointer" : "cursor-not-allowed", "w-8 lg:w-12 sm:h-11 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition"])}"><i class="pi pi-minus text-xs"></i></button>`);
        _push(ssrRenderComponent(unref(script), {
          modelValue: quantity.value,
          "onUpdate:modelValue": ($event) => quantity.value = $event,
          min: 1,
          "use-grouping": false,
          inputClass: "h-10",
          onInput: (e) => {
            if (e.value !== null) quantity.value = e.value;
          },
          "input-style": { width: "4rem", textAlign: "center", padding: "0", boxShadow: "none", border: "none", fontWeight: "600" }
        }, null, _parent));
        _push(`<button class="${ssrRenderClass([
          "w-8 lg:w-12 sm:h-11 flex items-center justify-center transition",
          atMax.value ? "text-gray-300 cursor-not-allowed" : "text-gray-500 cursor-pointer hover:bg-gray-50"
        ])}"><i class="pi pi-plus text-xs"></i></button></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button${ssrIncludeBooleanAttr(overLimit.value || !inStock.value && unref(isInCart)(__props.item.id)) ? " disabled" : ""} class="relative w-full max-sm:px-2 max-sm:text-sm py-2.5 rounded-2xl cursor-pointer bg-brand-500 text-white font-semibold hover:bg-brand-400 disabled:cursor-not-allowed active:scale-[0.98] transition-all shadow-md"><i class="${ssrRenderClass(["lg:mr-2", unref(isInCart)(__props.item.id) ? "pi pi-shopping-cart" : "pi pi-cart-plus"])}"></i> კალათაში დამატება `);
      _push(ssrRenderComponent(_sfc_main$4, {
        class: "sm:min-w-5! sm:h-5! min-w-4! h-4!",
        item: __props.item
      }, null, _parent));
      _push(`</button></div>`);
      if (overLimit.value) {
        _push(`<p class="text-xs text-red-600"> ხელმისაწვდომი რაოდენობაა ${ssrInterpolate(__props.item.inventory)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="mt-8 space-y-3">`);
      if (inStock.value) {
        _push(`<button class="w-full py-2.5 rounded-2xl max-sm:text-sm cursor-pointer border border-gray-500 text-gray-900 font-semibold hover:bg-gray-800 hover:text-white active:scale-[0.98] transition-all"><i class="pi pi-bolt mr-2"></i> ახლავე შეძენა </button>`);
      } else {
        _push(`<!---->`);
      }
      if (!inStock.value && !__props.isOrderOnly) {
        _push(ssrRenderComponent(_sfc_main$5, {
          item: __props.item,
          "is-subscribed": __props.isSubscribedToNotification
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="mt-6 space-y-2">`);
      _push(ssrRenderComponent(_component_Panel, {
        toggleable: "",
        collapsed: false,
        "pt:root:class": "px-4 py-3 !border-gray-100 !rounded-2xl !shadow-none"
      }, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center gap-2"${_scopeId}><i class="pi pi-truck text-brand-500"${_scopeId}></i><span class="text-sm font-semibold text-gray-800"${_scopeId}>მიწოდება</span></div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center gap-2" }, [
                createVNode("i", { class: "pi pi-truck text-brand-500" }),
                createVNode("span", { class: "text-sm font-semibold text-gray-800" }, "მიწოდება")
              ])
            ];
          }
        }),
        toggleicon: withCtx(({ collapsed }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="${ssrRenderClass(["pi text-xs text-gray-400", collapsed ? "pi-plus" : "pi-minus"])}"${_scopeId}></i>`);
          } else {
            return [
              createVNode("i", {
                class: ["pi text-xs text-gray-400", collapsed ? "pi-plus" : "pi-minus"]
              }, null, 2)
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<ul class="space-y-2 text-xs text-gray-600"${_scopeId}><li class="flex gap-2"${_scopeId}><span class="text-brand-500"${_scopeId}>→</span><span${_scopeId}><strong${_scopeId}>თვითგატანა ოფისიდან:</strong> უფასო. გატანის წერტილი <a href="https://maps.app.goo.gl/3YwH55CnhUUfJoYQ9" target="_blank" class="text-blue-500 hover:underline"${_scopeId}> რუკაზე </a></span></li><li class="flex gap-2"${_scopeId}><span class="text-brand-500"${_scopeId}>→</span> <span${_scopeId}>მიწოდება თბილისში: 500+ ₾ უფასო </span></li><li class="flex gap-2"${_scopeId}><span class="text-brand-500"${_scopeId}>→</span><span${_scopeId}> მიწოდება რეგიონებში: `);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("delivery-rates"),
              class: "text-blue-500 hover:underline"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`იხილეთ მიწოდების ტარიფები`);
                } else {
                  return [
                    createTextVNode("იხილეთ მიწოდების ტარიფები")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</span></li><li class="flex gap-2"${_scopeId}><span class="text-brand-500"${_scopeId}>→</span> <span${_scopeId}>13:00-მდე გაფორმებულ შეკვეთებს თბილისში გაწვდით იმავე დღეს!</span></li><li class="flex gap-2"${_scopeId}><span class="text-brand-500"${_scopeId}>→</span> <span${_scopeId}>მიტანის სერვისის ფარგლებში პროდუქციის მანქანიდან ჩამოტვირთვა და სართულზე ატანა არ შედის მომსახურებაში.</span></li></ul>`);
          } else {
            return [
              createVNode("ul", { class: "space-y-2 text-xs text-gray-600" }, [
                createVNode("li", { class: "flex gap-2" }, [
                  createVNode("span", { class: "text-brand-500" }, "→"),
                  createVNode("span", null, [
                    createVNode("strong", null, "თვითგატანა ოფისიდან:"),
                    createTextVNode(" უფასო. გატანის წერტილი "),
                    createVNode("a", {
                      href: "https://maps.app.goo.gl/3YwH55CnhUUfJoYQ9",
                      target: "_blank",
                      class: "text-blue-500 hover:underline"
                    }, " რუკაზე ")
                  ])
                ]),
                createVNode("li", { class: "flex gap-2" }, [
                  createVNode("span", { class: "text-brand-500" }, "→"),
                  createTextVNode(),
                  createVNode("span", null, "მიწოდება თბილისში: 500+ ₾ უფასო ")
                ]),
                createVNode("li", { class: "flex gap-2" }, [
                  createVNode("span", { class: "text-brand-500" }, "→"),
                  createVNode("span", null, [
                    createTextVNode(" მიწოდება რეგიონებში: "),
                    createVNode(unref(Link), {
                      href: _ctx.route("delivery-rates"),
                      class: "text-blue-500 hover:underline"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("იხილეთ მიწოდების ტარიფები")
                      ]),
                      _: 1
                    }, 8, ["href"])
                  ])
                ]),
                createVNode("li", { class: "flex gap-2" }, [
                  createVNode("span", { class: "text-brand-500" }, "→"),
                  createTextVNode(),
                  createVNode("span", null, "13:00-მდე გაფორმებულ შეკვეთებს თბილისში გაწვდით იმავე დღეს!")
                ]),
                createVNode("li", { class: "flex gap-2" }, [
                  createVNode("span", { class: "text-brand-500" }, "→"),
                  createTextVNode(),
                  createVNode("span", null, "მიტანის სერვისის ფარგლებში პროდუქციის მანქანიდან ჩამოტვირთვა და სართულზე ატანა არ შედის მომსახურებაში.")
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_Panel, {
        toggleable: "",
        collapsed: false,
        "pt:root:class": "px-4 py-3 !border-gray-100 !rounded-2xl !shadow-none"
      }, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center gap-2"${_scopeId}><i class="pi pi-credit-card text-brand-500"${_scopeId}></i><span class="text-sm font-semibold text-gray-800"${_scopeId}>გადახდის მეთოდები</span></div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center gap-2" }, [
                createVNode("i", { class: "pi pi-credit-card text-brand-500" }),
                createVNode("span", { class: "text-sm font-semibold text-gray-800" }, "გადახდის მეთოდები")
              ])
            ];
          }
        }),
        toggleicon: withCtx(({ collapsed }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="${ssrRenderClass(["pi text-xs text-gray-400", collapsed ? "pi-plus" : "pi-minus"])}"${_scopeId}></i>`);
          } else {
            return [
              createVNode("i", {
                class: ["pi text-xs text-gray-400", collapsed ? "pi-plus" : "pi-minus"]
              }, null, 2)
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<ul class="space-y-2 text-xs text-gray-600"${_scopeId}><li class="flex gap-2"${_scopeId}><span class="text-brand-500"${_scopeId}>→</span> <span${_scopeId}>ბარათებით Visa, MasterCard, ლოიალობის ქულებით</span></li><li class="flex gap-2"${_scopeId}><span class="text-brand-500"${_scopeId}>→</span> <span${_scopeId}>საბანკო გადარიცხვით</span></li></ul>`);
          } else {
            return [
              createVNode("ul", { class: "space-y-2 text-xs text-gray-600" }, [
                createVNode("li", { class: "flex gap-2" }, [
                  createVNode("span", { class: "text-brand-500" }, "→"),
                  createTextVNode(),
                  createVNode("span", null, "ბარათებით Visa, MasterCard, ლოიალობის ქულებით")
                ]),
                createVNode("li", { class: "flex gap-2" }, [
                  createVNode("span", { class: "text-brand-500" }, "→"),
                  createTextVNode(),
                  createVNode("span", null, "საბანკო გადარიცხვით")
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="lg:col-span-4 lg:row-start-2 lg:row-end-6 order-3 sm:mt-10"><div class="col-span-2">`);
      _push(ssrRenderComponent(_component_Tabs, {
        value: activeTab.value,
        "onUpdate:value": ($event) => activeTab.value = $event,
        class: "bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_TabList, {
              "pt:root:class": "border-b border-gray-100 bg-transparent px-6",
              "pt:activeBar:class": "bg-brand-500 h-[2px]"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Tab, {
                    value: "0",
                    "pt:root:class": "px-6 py-4 text-sm font-medium text-gray-500 hover:text-gray-900 transition",
                    "pt:selected:class": "text-gray-900"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` მახასიათებლები `);
                      } else {
                        return [
                          createTextVNode(" მახასიათებლები ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Tab, {
                    value: "1",
                    "pt:root:class": "px-6 py-4 text-sm font-medium text-gray-500 hover:text-gray-900 transition",
                    "pt:selected:class": "text-gray-900"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` აღწერა `);
                      } else {
                        return [
                          createTextVNode(" აღწერა ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Tab, {
                      value: "0",
                      "pt:root:class": "px-6 py-4 text-sm font-medium text-gray-500 hover:text-gray-900 transition",
                      "pt:selected:class": "text-gray-900"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" მახასიათებლები ")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_Tab, {
                      value: "1",
                      "pt:root:class": "px-6 py-4 text-sm font-medium text-gray-500 hover:text-gray-900 transition",
                      "pt:selected:class": "text-gray-900"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" აღწერა ")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_TabPanels, { "pt:root:class": "p-8" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_TabPanel, { value: "0" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        if (__props.attributes?.length) {
                          _push4(`<div class="grid gap-3"${_scopeId3}><!--[-->`);
                          ssrRenderList(__props.attributes, (attr) => {
                            _push4(`<div class="flex justify-between bg-gray-50 px-5 py-3 gap-x-6 rounded-xl text-sm"${_scopeId3}><span class="text-gray-500"${_scopeId3}>${ssrInterpolate(attr.name)}</span><span class="font-medium text-gray-900"${_scopeId3}>${ssrInterpolate(attr.value)}</span></div>`);
                          });
                          _push4(`<!--]--></div>`);
                        } else {
                          _push4(`<div class="text-sm text-gray-400 italic"${_scopeId3}> მახასიათებლები არ არის მითითებული. </div>`);
                        }
                      } else {
                        return [
                          __props.attributes?.length ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "grid gap-3"
                          }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.attributes, (attr) => {
                              return openBlock(), createBlock("div", {
                                key: attr.id,
                                class: "flex justify-between bg-gray-50 px-5 py-3 gap-x-6 rounded-xl text-sm"
                              }, [
                                createVNode("span", { class: "text-gray-500" }, toDisplayString(attr.name), 1),
                                createVNode("span", { class: "font-medium text-gray-900" }, toDisplayString(attr.value), 1)
                              ]);
                            }), 128))
                          ])) : (openBlock(), createBlock("div", {
                            key: 1,
                            class: "text-sm text-gray-400 italic"
                          }, " მახასიათებლები არ არის მითითებული. "))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_TabPanel, { value: "1" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        if (__props.item.description) {
                          _push4(`<div class="text-sm text-gray-600 leading-relaxed"${_scopeId3}>${ssrInterpolate(__props.item.description)}</div>`);
                        } else {
                          _push4(`<div class="text-sm text-gray-400 italic"${_scopeId3}> აღწერა არ არის მითითებული. </div>`);
                        }
                      } else {
                        return [
                          __props.item.description ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "text-sm text-gray-600 leading-relaxed"
                          }, toDisplayString(__props.item.description), 1)) : (openBlock(), createBlock("div", {
                            key: 1,
                            class: "text-sm text-gray-400 italic"
                          }, " აღწერა არ არის მითითებული. "))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_TabPanel, { value: "0" }, {
                      default: withCtx(() => [
                        __props.attributes?.length ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "grid gap-3"
                        }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(__props.attributes, (attr) => {
                            return openBlock(), createBlock("div", {
                              key: attr.id,
                              class: "flex justify-between bg-gray-50 px-5 py-3 gap-x-6 rounded-xl text-sm"
                            }, [
                              createVNode("span", { class: "text-gray-500" }, toDisplayString(attr.name), 1),
                              createVNode("span", { class: "font-medium text-gray-900" }, toDisplayString(attr.value), 1)
                            ]);
                          }), 128))
                        ])) : (openBlock(), createBlock("div", {
                          key: 1,
                          class: "text-sm text-gray-400 italic"
                        }, " მახასიათებლები არ არის მითითებული. "))
                      ]),
                      _: 1
                    }),
                    createVNode(_component_TabPanel, { value: "1" }, {
                      default: withCtx(() => [
                        __props.item.description ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "text-sm text-gray-600 leading-relaxed"
                        }, toDisplayString(__props.item.description), 1)) : (openBlock(), createBlock("div", {
                          key: 1,
                          class: "text-sm text-gray-400 italic"
                        }, " აღწერა არ არის მითითებული. "))
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_TabList, {
                "pt:root:class": "border-b border-gray-100 bg-transparent px-6",
                "pt:activeBar:class": "bg-brand-500 h-[2px]"
              }, {
                default: withCtx(() => [
                  createVNode(_component_Tab, {
                    value: "0",
                    "pt:root:class": "px-6 py-4 text-sm font-medium text-gray-500 hover:text-gray-900 transition",
                    "pt:selected:class": "text-gray-900"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" მახასიათებლები ")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_Tab, {
                    value: "1",
                    "pt:root:class": "px-6 py-4 text-sm font-medium text-gray-500 hover:text-gray-900 transition",
                    "pt:selected:class": "text-gray-900"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" აღწერა ")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_TabPanels, { "pt:root:class": "p-8" }, {
                default: withCtx(() => [
                  createVNode(_component_TabPanel, { value: "0" }, {
                    default: withCtx(() => [
                      __props.attributes?.length ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "grid gap-3"
                      }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.attributes, (attr) => {
                          return openBlock(), createBlock("div", {
                            key: attr.id,
                            class: "flex justify-between bg-gray-50 px-5 py-3 gap-x-6 rounded-xl text-sm"
                          }, [
                            createVNode("span", { class: "text-gray-500" }, toDisplayString(attr.name), 1),
                            createVNode("span", { class: "font-medium text-gray-900" }, toDisplayString(attr.value), 1)
                          ]);
                        }), 128))
                      ])) : (openBlock(), createBlock("div", {
                        key: 1,
                        class: "text-sm text-gray-400 italic"
                      }, " მახასიათებლები არ არის მითითებული. "))
                    ]),
                    _: 1
                  }),
                  createVNode(_component_TabPanel, { value: "1" }, {
                    default: withCtx(() => [
                      __props.item.description ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "text-sm text-gray-600 leading-relaxed"
                      }, toDisplayString(__props.item.description), 1)) : (openBlock(), createBlock("div", {
                        key: 1,
                        class: "text-sm text-gray-400 italic"
                      }, " აღწერა არ არის მითითებული. "))
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div></div>`);
      _push(ssrRenderComponent(_sfc_main$6, { items: __props.similarItems }, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_sfc_main$7, {
        visible: showWhatsappDialog.value,
        "onUpdate:visible": ($event) => showWhatsappDialog.value = $event
      }, null, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Items/Show.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=Show-B6PaQL5o.js.map
