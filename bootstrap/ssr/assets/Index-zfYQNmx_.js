import { s as script$3 } from "./index-BzRznsIW.js";
import { s as script$2 } from "./index-DOeVcSWx.js";
import { s as script$1 } from "./index-BgiqKOW-.js";
import { _ as _sfc_main$1, s as script } from "./Breadcrumbs-r-JAysNq.js";
import { ref, watch, computed, unref, withCtx, createVNode, createTextVNode, toDisplayString, openBlock, createBlock, createCommentVNode, Fragment, renderList, withDirectives, vModelText, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrRenderClass, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { router, Head, Link, Deferred } from "@inertiajs/vue3";
import { _ as _sfc_main$4, a as _sfc_main$5 } from "./ItemsGrid-CrL2QgMU.js";
import debounce from "lodash/debounce.js";
import _sfc_main$2 from "./ActiveFilterChips-XpR4B2fs.js";
import _sfc_main$3 from "./SubcategoryStrip-D0niMR5J.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "@primeuix/utils";
import "@primeuix/utils/object";
import "@primevue/icons/check";
import "@primevue/icons/minus";
import "@primevue/core/baseinput";
import "@primeuix/styles/checkbox";
import "@primevue/core/base/style";
import "@primeuix/utils/dom";
import "@primeuix/utils/zindex";
import "@primevue/core/api";
import "@primevue/core/utils";
import "@primevue/icons/blank";
import "@primevue/icons/chevrondown";
import "@primevue/icons/search";
import "@primevue/icons/spinner";
import "@primevue/icons/times";
import "@primevue/core/basecomponent";
import "@primeuix/styles/iconfield";
import "./index-BAgOeBfa.js";
import "@primeuix/styles/inputtext";
import "./index-rAVNvoJo.js";
import "@primeuix/utils/eventbus";
import "./index-zZrFrjQS.js";
import "./index-BWQ0UkXI.js";
import "@primevue/core/basedirective";
import "@primeuix/styles/ripple";
import "@primeuix/styles/virtualscroller";
import "@primeuix/styles/select";
import "@primevue/icons/angledown";
import "@primevue/icons/angleup";
import "@primeuix/styles/inputnumber";
import "@primevue/icons/plus";
import "./index-hSjFFc9a.js";
import "@primeuix/styles/badge";
import "@primeuix/styles/button";
import "@primeuix/styles/panel";
import "./index-CvFud99G.js";
import "@primeuix/styles/skeleton";
import "./index-PXeQwkTt.js";
import "@primeuix/styles/paginator";
import "@primevue/icons/angledoubleleft";
import "@primevue/icons/angledoubleright";
import "@primevue/icons/angleright";
import "@primevue/icons/angleleft";
import "./QuickViewDialog-N44Rl6Bc.js";
import "./index-nsBhLTBN.js";
import "@primevue/icons/windowmaximize";
import "@primevue/icons/windowminimize";
import "@primeuix/styled";
import "@primeuix/styles/dialog";
import "axios";
import "./useCart-DadzsIuG.js";
import "./index-Qb24q4w2.js";
import "./usePricing-C1clN7W5.js";
import "./ItemCard-t8oEYL78.js";
import "./index-C3Ts-4IM.js";
import "@primeuix/utils/uuid";
import "@primeuix/styles/tooltip";
import "./StockNotifyDialog-DtRQgNBy.js";
import "./index-aSrJYIQQ.js";
import "@primevue/icons/timescircle";
import "@primeuix/styles/chip";
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    items: Object,
    attributes: Array,
    breadcrumbs: Array,
    relatedCategories: Array,
    relatedCategoriesParent: Object,
    currentCategorySlug: String,
    isOrderOnly: Boolean
  },
  setup(__props) {
    const props = __props;
    const loading = ref(false);
    const attrSearch = ref({});
    const sidebarOpen = ref(false);
    const stockOptions = [
      { label: "ყველა", value: "" },
      { label: "მარაგშია", value: "in" },
      { label: "მარაგში არაა", value: "out" }
    ];
    const params = route().params;
    const parsedFilters = (() => {
      try {
        return params.filters ? JSON.parse(params.filters) : {};
      } catch {
        return {};
      }
    })();
    const priceMin = ref(params.price_min ? Number(params.price_min) : null);
    const priceMax = ref(params.price_max ? Number(params.price_max) : null);
    const stockFilter = ref(stockOptions.find((o) => o.value === (params.stock ?? "")) ?? stockOptions[0]);
    const selected = ref(
      Object.fromEntries((props.attributes ?? []).map((attr) => [attr.id, parsedFilters[attr.id] ?? []]))
    );
    const buildQuery = (attrVal) => {
      const filters = Object.fromEntries(
        Object.entries(attrVal).filter(([, values]) => values.length > 0)
      );
      const { page, per_page, ...restParams } = route().params;
      return {
        ...restParams,
        filters: Object.keys(filters).length ? JSON.stringify(filters) : void 0,
        price_min: priceMin.value || void 0,
        price_max: priceMax.value || void 0,
        stock: stockFilter.value?.value || void 0
      };
    };
    const applyFilters = debounce((val) => {
      sidebarOpen.value = false;
      router.get(route(route().current(), buildQuery(val)), {}, {
        preserveState: true,
        replace: true,
        onFinish: () => loading.value = false
      });
    }, 1300);
    watch(selected, (val) => {
      loading.value = true;
      applyFilters(val);
    }, { deep: true });
    watch([priceMin, priceMax, stockFilter], () => {
      loading.value = true;
      applyFilters(selected.value);
    });
    const resetFilters = () => {
      loading.value = true;
      selected.value = Object.fromEntries(
        (props.attributes ?? []).map((attr) => [attr.id, []])
      );
      priceMin.value = null;
      priceMax.value = null;
      stockFilter.value = { label: "ყველა", value: "" };
      attrSearch.value = {};
      applyFilters({});
    };
    const activeChips = computed(() => {
      const chips = [];
      if (priceMin.value || priceMax.value) {
        chips.push({
          id: "price",
          // unique id
          type: "price",
          label: `${priceMin.value || 0} - ${priceMax.value || "∞"} ₾`
        });
      }
      if (stockFilter.value?.value) {
        chips.push({
          id: "stock",
          // unique id
          type: "stock",
          value: stockFilter.value.value,
          label: stockFilter.value.label
        });
      }
      Object.entries(selected.value).forEach(([attrId, values]) => {
        values.forEach((val) => {
          chips.push({
            id: `attr-${attrId}-${val}`,
            // unique id
            type: "attribute",
            attrId,
            value: val,
            label: val
          });
        });
      });
      return chips;
    });
    function removeChip(chip) {
      loading.value = true;
      switch (chip.type) {
        case "attribute":
          selected.value[chip.attrId] = selected.value[chip.attrId].filter((v) => v !== chip.value);
          break;
        case "price":
          priceMin.value = null;
          priceMax.value = null;
          break;
        case "stock":
          stockFilter.value = { label: "ყველა", value: "" };
          break;
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Panel = script;
      const _component_InputNumber = script$1;
      const _component_Select = script$2;
      const _component_Checkbox = script$3;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: __props.breadcrumbs?.at(-1)?.label
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<meta name="description"${ssrRenderAttr("content", `${__props.breadcrumbs?.at(-1)?.label} - იხილეთ Sonniva-ს სრული კატალოგი`)} data-v-ea7e0c9a${_scopeId}><meta property="og:type" content="website" data-v-ea7e0c9a${_scopeId}><meta property="og:site_name" content="Sonniva" data-v-ea7e0c9a${_scopeId}><meta property="og:title"${ssrRenderAttr("content", __props.breadcrumbs?.at(-1)?.label)} data-v-ea7e0c9a${_scopeId}><meta property="og:description"${ssrRenderAttr("content", `${__props.breadcrumbs?.at(-1)?.label} - იხილეთ Sonniva-ს სრული კატალოგი`)} data-v-ea7e0c9a${_scopeId}><meta property="og:url"${ssrRenderAttr("content", _ctx.$page.props.ziggy.location)} data-v-ea7e0c9a${_scopeId}><meta property="og:image"${ssrRenderAttr("content", `${_ctx.$page.props.ziggy.url}/logo/logo.png`)} data-v-ea7e0c9a${_scopeId}>`);
          } else {
            return [
              createVNode("meta", {
                name: "description",
                content: `${__props.breadcrumbs?.at(-1)?.label} - იხილეთ Sonniva-ს სრული კატალოგი`
              }, null, 8, ["content"]),
              createVNode("meta", {
                property: "og:type",
                content: "website"
              }),
              createVNode("meta", {
                property: "og:site_name",
                content: "Sonniva"
              }),
              createVNode("meta", {
                property: "og:title",
                content: __props.breadcrumbs?.at(-1)?.label
              }, null, 8, ["content"]),
              createVNode("meta", {
                property: "og:description",
                content: `${__props.breadcrumbs?.at(-1)?.label} - იხილეთ Sonniva-ს სრული კატალოგი`
              }, null, 8, ["content"]),
              createVNode("meta", {
                property: "og:url",
                content: _ctx.$page.props.ziggy.location
              }, null, 8, ["content"]),
              createVNode("meta", {
                property: "og:image",
                content: `${_ctx.$page.props.ziggy.url}/logo/logo.png`
              }, null, 8, ["content"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="min-h-[calc(100vh-80px)] bg-[#f7f6f 3]" data-v-ea7e0c9a><div class="bg-white flex items-center justify-between sticky top-16 sm:top-20 z-20 sm:mt-4 sm:roun ded-t-xl shadow-xs" data-v-ea7e0c9a>`);
      _push(ssrRenderComponent(_sfc_main$1, { breadcrumbs: __props.breadcrumbs }, null, _parent));
      _push(`<button class="lg:hidden z-20 flex items-center gap-2 font-medium text-gray-700 border-l border-gray-200 sm:rounded-r-xl self-stretch px-3 hover:bg-gray-100 transition-colors" data-v-ea7e0c9a><i class="pi pi-sliders-h text-md" data-v-ea7e0c9a></i></button></div>`);
      if (activeChips.value?.length > 0) {
        _push(`<div class="${ssrRenderClass([activeChips.value?.length > 0 ? " justify-between" : "justify-end", "sm:hidden sticky top-28 z-20 bg-white border-b border-gray-100 px-2 py-1 flex items-center gap-2 shadow-sm"])}" data-v-ea7e0c9a>`);
        _push(ssrRenderComponent(_sfc_main$2, {
          chips: activeChips.value,
          onRemove: removeChip,
          onReset: resetFilters,
          class: "sm:hidden"
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (sidebarOpen.value) {
        _push(`<div class="fixed inset-0 bg-black/40 z-30 lg:hidden" data-v-ea7e0c9a></div>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.relatedCategories?.length && __props.relatedCategories[0]?.image) {
        _push(ssrRenderComponent(_sfc_main$3, { categories: __props.relatedCategories }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="max-w-screen-2xl max-sm:mx-3 py-6 flex gap-6 relative" data-v-ea7e0c9a><div class="${ssrRenderClass([sidebarOpen.value ? "translate-x-0" : "-translate-x-full lg:translate-x-0", "max-lg:bg-white shrink-0 w-72 max-lg:pt-3 lg:block lg:sticky top-16 sm:top-20 lg:top-32 fixed left-0 h-full space-y-5 max-h-[calc(100vh-80px)] lg:max-h-[690px] overflow-x-hidden overflow-y-auto transition-all duration-300 z-40 lg:z-auto"])}" data-v-ea7e0c9a><button class="flex items-center ml-auto mr-2 text-gray-400 hover:text-gray-700 lg:hidden" data-v-ea7e0c9a><i class="pi pi-times" data-v-ea7e0c9a></i></button>`);
      if (__props.relatedCategories?.length) {
        _push(`<div class="bg-white max-sm:mx-2 border rounded-xl shadow-xs border-gray-100 px-5 py-3" data-v-ea7e0c9a>`);
        _push(ssrRenderComponent(_component_Panel, {
          toggleable: "",
          collapsed: true
        }, {
          header: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="text-sm font-bold text-gray-500" data-v-ea7e0c9a${_scopeId}>კატეგორიები</span>`);
            } else {
              return [
                createVNode("span", { class: "text-sm font-bold text-gray-500" }, "კატეგორიები")
              ];
            }
          }),
          toggleicon: withCtx(({ collapsed }, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<i class="${ssrRenderClass(["pi text-xs text-gray-400", collapsed ? "pi-chevron-down" : "pi-chevron-up"])}" data-v-ea7e0c9a${_scopeId}></i>`);
            } else {
              return [
                createVNode("i", {
                  class: ["pi text-xs text-gray-400", collapsed ? "pi-chevron-down" : "pi-chevron-up"]
                }, null, 2)
              ];
            }
          }),
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              if (__props.relatedCategoriesParent) {
                _push2(ssrRenderComponent(unref(Link), {
                  href: _ctx.route("items.index", [__props.relatedCategoriesParent.slug]),
                  class: "flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold text-brand-500 hover:bg-brand-50 transition-colors mb-1"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<i class="pi pi-th-large text-xs" data-v-ea7e0c9a${_scopeId2}></i> ${ssrInterpolate(__props.relatedCategoriesParent.name)}`);
                    } else {
                      return [
                        createVNode("i", { class: "pi pi-th-large text-xs" }),
                        createTextVNode(" " + toDisplayString(__props.relatedCategoriesParent.name), 1)
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(`<!--[-->`);
              ssrRenderList(__props.relatedCategories, (cat) => {
                _push2(ssrRenderComponent(unref(Link), {
                  key: cat.slug,
                  href: _ctx.route("items.index", [cat.slug]),
                  class: ["flex items-center justify-between px-3 py-2 rounded-xl text-sm transition-colors", cat.slug === __props.currentCategorySlug ? "bg-brand-50 text-brand-500 font-semibold" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"]
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<span data-v-ea7e0c9a${_scopeId2}>${ssrInterpolate(cat.name)}</span>`);
                      if (cat.slug === __props.currentCategorySlug) {
                        _push3(`<i class="pi pi-check text-xs text-brand-400" data-v-ea7e0c9a${_scopeId2}></i>`);
                      } else {
                        _push3(`<!---->`);
                      }
                    } else {
                      return [
                        createVNode("span", null, toDisplayString(cat.name), 1),
                        cat.slug === __props.currentCategorySlug ? (openBlock(), createBlock("i", {
                          key: 0,
                          class: "pi pi-check text-xs text-brand-400"
                        })) : createCommentVNode("", true)
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              });
              _push2(`<!--]-->`);
            } else {
              return [
                __props.relatedCategoriesParent ? (openBlock(), createBlock(unref(Link), {
                  key: 0,
                  href: _ctx.route("items.index", [__props.relatedCategoriesParent.slug]),
                  class: "flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold text-brand-500 hover:bg-brand-50 transition-colors mb-1"
                }, {
                  default: withCtx(() => [
                    createVNode("i", { class: "pi pi-th-large text-xs" }),
                    createTextVNode(" " + toDisplayString(__props.relatedCategoriesParent.name), 1)
                  ]),
                  _: 1
                }, 8, ["href"])) : createCommentVNode("", true),
                (openBlock(true), createBlock(Fragment, null, renderList(__props.relatedCategories, (cat) => {
                  return openBlock(), createBlock(unref(Link), {
                    key: cat.slug,
                    href: _ctx.route("items.index", [cat.slug]),
                    class: ["flex items-center justify-between px-3 py-2 rounded-xl text-sm transition-colors", cat.slug === __props.currentCategorySlug ? "bg-brand-50 text-brand-500 font-semibold" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"]
                  }, {
                    default: withCtx(() => [
                      createVNode("span", null, toDisplayString(cat.name), 1),
                      cat.slug === __props.currentCategorySlug ? (openBlock(), createBlock("i", {
                        key: 0,
                        class: "pi pi-check text-xs text-brand-400"
                      })) : createCommentVNode("", true)
                    ]),
                    _: 2
                  }, 1032, ["href", "class"]);
                }), 128))
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<aside class="bg-white min-w-[288px] border max-lg:border-b-0 lg:rounded-2xl border-gray-100" data-v-ea7e0c9a><div class="px-5 py-6" data-v-ea7e0c9a><div class="items-center mt-2 justify-between mb-5 flex" data-v-ea7e0c9a><div class="items-center gap-x-1.5 flex" data-v-ea7e0c9a><i class="pi pi-sliders-h" data-v-ea7e0c9a></i><p class="text-xs font-semibold uppercase tracking-widest text-gray-400" data-v-ea7e0c9a>ფილტრი</p></div><div class="items-center gap-x-1 rounded-xl bg-slate-100 cursor-pointer px-2 py-1 flex" data-v-ea7e0c9a><i class="text-sm pi pi-refresh text-gray-500" data-v-ea7e0c9a></i><button class="text-xs text-gray-400 hover:text-gray-900 transition-colors" data-v-ea7e0c9a> გასუფთავება </button></div></div><div class="mb-4 border-b border-gray-100 pb-4" data-v-ea7e0c9a><p class="text-sm font-semibold text-gray-500 mb-3" data-v-ea7e0c9a>ფასი</p><div class="flex items-center gap-2" data-v-ea7e0c9a>`);
      _push(ssrRenderComponent(_component_InputNumber, {
        modelValue: priceMin.value,
        "onUpdate:modelValue": ($event) => priceMin.value = $event,
        onInput: (e) => priceMin.value = e.value,
        placeholder: "მინ.",
        min: 0,
        useGrouping: false,
        fluid: "",
        minFractionDigits: 0,
        maxFractionDigits: 2,
        showButtons: "",
        suffix: " ₾",
        "pt:root:class": "w-full",
        "pt:pcInputText:root:class": "text-sm rounded-lg border-gray-200 py-1.5 w-full"
      }, null, _parent));
      _push(`<span class="text-gray-300 shrink-0" data-v-ea7e0c9a>—</span>`);
      _push(ssrRenderComponent(_component_InputNumber, {
        modelValue: priceMax.value,
        "onUpdate:modelValue": ($event) => priceMax.value = $event,
        onInput: (e) => priceMax.value = e.value,
        placeholder: "მაქს.",
        min: 0,
        useGrouping: false,
        fluid: "",
        minFractionDigits: 0,
        maxFractionDigits: 2,
        showButtons: "",
        suffix: " ₾",
        "pt:root:class": "w-full",
        "pt:pcInputText:root:class": "text-sm rounded-lg border-gray-200 py-1.5 w-full"
      }, null, _parent));
      _push(`</div></div><div class="mb-4 border-b border-gray-100 pb-4" data-v-ea7e0c9a><p class="text-sm font-semibold text-gray-500 mb-3" data-v-ea7e0c9a>მარაგი</p>`);
      _push(ssrRenderComponent(_component_Select, {
        modelValue: stockFilter.value,
        "onUpdate:modelValue": ($event) => stockFilter.value = $event,
        options: stockOptions,
        optionLabel: "label",
        fluid: "",
        "pt:root:class": "w-full !rounded-lg !border-gray-200",
        "pt:label:class": "!text-sm !py-1.5"
      }, null, _parent));
      _push(`</div><!--[-->`);
      ssrRenderList(__props.attributes, (attr) => {
        _push(`<div class="mb-4 border-b border-gray-100 pb-4" data-v-ea7e0c9a>`);
        _push(ssrRenderComponent(_component_Panel, {
          header: attr.name,
          toggleable: "",
          collapsed: true
        }, {
          toggleicon: withCtx(({ collapsed }, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<i class="${ssrRenderClass(["pi text-xs text-gray-400", collapsed ? "pi-chevron-down" : "pi-chevron-up"])}" data-v-ea7e0c9a${_scopeId}></i>`);
            } else {
              return [
                createVNode("i", {
                  class: ["pi text-xs text-gray-400", collapsed ? "pi-chevron-down" : "pi-chevron-up"]
                }, null, 2)
              ];
            }
          }),
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              if (attr.values.length > 5) {
                _push2(`<div class="relative mb-3" data-v-ea7e0c9a${_scopeId}><input${ssrRenderAttr("value", attrSearch.value[attr.id])} type="text" placeholder="ძებნა..." class="w-full border border-gray-200 rounded-lg text-sm px-3 py-1.5 pr-7 outline-none focus:border-gray-400 bg-gray-50" data-v-ea7e0c9a${_scopeId}>`);
                if (attrSearch.value[attr.id]) {
                  _push2(`<i class="pi pi-times-circle absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer text-xs" data-v-ea7e0c9a${_scopeId}></i>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<!--[-->`);
              ssrRenderList(attr.values.filter(
                (v) => !attrSearch.value[attr.id] || v.toLowerCase().includes(attrSearch.value[attr.id].toLowerCase())
              ), (val) => {
                _push2(`<div class="flex items-center gap-2.5 mb-2" data-v-ea7e0c9a${_scopeId}>`);
                _push2(ssrRenderComponent(_component_Checkbox, {
                  inputId: `attr-${attr.id}-${val}`,
                  value: val,
                  modelValue: selected.value[attr.id],
                  "onUpdate:modelValue": ($event) => selected.value[attr.id] = $event
                }, null, _parent2, _scopeId));
                _push2(`<label${ssrRenderAttr("for", `attr-${attr.id}-${val}`)} class="text-sm text-gray-600 cursor-pointer hover:text-gray-900 transition-colors" data-v-ea7e0c9a${_scopeId}>${ssrInterpolate(val)}</label></div>`);
              });
              _push2(`<!--]-->`);
            } else {
              return [
                attr.values.length > 5 ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "relative mb-3"
                }, [
                  withDirectives(createVNode("input", {
                    "onUpdate:modelValue": ($event) => attrSearch.value[attr.id] = $event,
                    type: "text",
                    placeholder: "ძებნა...",
                    class: "w-full border border-gray-200 rounded-lg text-sm px-3 py-1.5 pr-7 outline-none focus:border-gray-400 bg-gray-50"
                  }, null, 8, ["onUpdate:modelValue"]), [
                    [vModelText, attrSearch.value[attr.id]]
                  ]),
                  attrSearch.value[attr.id] ? (openBlock(), createBlock("i", {
                    key: 0,
                    class: "pi pi-times-circle absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer text-xs",
                    onClick: ($event) => attrSearch.value[attr.id] = ""
                  }, null, 8, ["onClick"])) : createCommentVNode("", true)
                ])) : createCommentVNode("", true),
                (openBlock(true), createBlock(Fragment, null, renderList(attr.values.filter(
                  (v) => !attrSearch.value[attr.id] || v.toLowerCase().includes(attrSearch.value[attr.id].toLowerCase())
                ), (val) => {
                  return openBlock(), createBlock("div", {
                    key: val,
                    class: "flex items-center gap-2.5 mb-2"
                  }, [
                    createVNode(_component_Checkbox, {
                      inputId: `attr-${attr.id}-${val}`,
                      value: val,
                      modelValue: selected.value[attr.id],
                      "onUpdate:modelValue": ($event) => selected.value[attr.id] = $event
                    }, null, 8, ["inputId", "value", "modelValue", "onUpdate:modelValue"]),
                    createVNode("label", {
                      for: `attr-${attr.id}-${val}`,
                      class: "text-sm text-gray-600 cursor-pointer hover:text-gray-900 transition-colors"
                    }, toDisplayString(val), 9, ["for"])
                  ]);
                }), 128))
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</div>`);
      });
      _push(`<!--]--></div></aside></div><div class="flex-1 min-w-0" data-v-ea7e0c9a>`);
      _push(ssrRenderComponent(_sfc_main$2, {
        chips: activeChips.value,
        onRemove: removeChip,
        onReset: resetFilters,
        class: "max-sm:hidden"
      }, null, _parent));
      _push(ssrRenderComponent(unref(Deferred), { data: "items" }, {
        default: withCtx(({ reloading }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (loading.value || reloading) {
              _push2(ssrRenderComponent(_sfc_main$4, null, null, _parent2, _scopeId));
            } else {
              _push2(ssrRenderComponent(_sfc_main$5, {
                items: __props.items,
                "is-order-only": __props.isOrderOnly
              }, null, _parent2, _scopeId));
            }
          } else {
            return [
              loading.value || reloading ? (openBlock(), createBlock(_sfc_main$4, { key: 0 })) : (openBlock(), createBlock(_sfc_main$5, {
                key: 1,
                items: __props.items,
                "is-order-only": __props.isOrderOnly
              }, null, 8, ["items", "is-order-only"]))
            ];
          }
        }),
        fallback: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$4, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$4)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div><!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Items/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-ea7e0c9a"]]);
export {
  Index as default
};
//# sourceMappingURL=Index-zfYQNmx_.js.map
