import { T as Tooltip } from "./index-C3Ts-4IM.js";
import { s as script$6 } from "./index-D46B4f3g.js";
import { s as script$5 } from "./index-YvTnrAwi.js";
import { s as script$3, a as script$4 } from "./index-CYNLBuLC.js";
import { s as script, a as script$1, b as script$2 } from "./index-fvkEaty1.js";
import { ref, mergeProps, withCtx, createTextVNode, createVNode, unref, openBlock, createBlock, toDisplayString, Fragment, renderList, createCommentVNode, withDirectives, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrRenderClass, ssrGetDirectiveProps } from "vue/server-renderer";
import { useForm, router } from "@inertiajs/vue3";
import { u as useToast } from "./index-Qb24q4w2.js";
import axios from "axios";
import { _ as _sfc_main$1 } from "./AdminLayout-CBZmpaGw.js";
import _sfc_main$2 from "./PrimeInputText-BlIRrCdA.js";
import { s as script$7 } from "./index-BgiqKOW-.js";
import { h as hasDiscount } from "./usePricing-oDne5BPU.js";
import { f as formatDiscount } from "./numberFormat-BgUHwZc2.js";
import "@primeuix/utils/dom";
import "@primeuix/utils/object";
import "@primeuix/utils/uuid";
import "@primeuix/utils/zindex";
import "@primevue/core/utils";
import "@primevue/core/basedirective";
import "@primeuix/styles/tooltip";
import "@primevue/core/base/style";
import "@primeuix/utils";
import "@primevue/icons/times";
import "@primevue/icons/windowmaximize";
import "@primevue/icons/windowminimize";
import "./index-zZrFrjQS.js";
import "@primeuix/styled";
import "@primevue/core/basecomponent";
import "@primeuix/styles/dialog";
import "@primevue/icons/spinner";
import "@primeuix/styles/badge";
import "@primeuix/styles/ripple";
import "@primeuix/styles/button";
import "@primevue/icons/chevronleft";
import "@primevue/icons/chevronright";
import "@primeuix/styles/tabs";
import "./index-MMttD88d.js";
import "@primeuix/utils/eventbus";
import "@primeuix/styles/toast";
import "@primevue/icons/check";
import "@primevue/icons/exclamationtriangle";
import "@primevue/icons/infocircle";
import "@primevue/icons/timescircle";
import "@vueuse/core";
import "./categoryIcons-dDFpexsr.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./QuickViewDialog-NNHt1a_n.js";
import "./useCart-CIcsIaQl.js";
import "@primeuix/styles/confirmdialog";
import "./index-BAgOeBfa.js";
import "@primevue/core/baseinput";
import "@primeuix/styles/inputtext";
import "@primevue/icons/angledown";
import "@primevue/icons/angleup";
import "@primeuix/styles/inputnumber";
const _sfc_main = /* @__PURE__ */ Object.assign({ layout: _sfc_main$1 }, {
  __name: "Index",
  __ssrInlineRender: true,
  setup(__props) {
    const toast = useToast();
    const activeTab = ref("0");
    const syncingCategories = ref(false);
    function syncCategories() {
      syncingCategories.value = true;
      router.post(route("admin.items.sync-category"), {}, {
        preserveScroll: true,
        onSuccess: (res) => {
          toast.add({ severity: "success", summary: "Started", detail: res.props.flash.message, life: 4e3 });
        },
        onError: () => {
          toast.add({ severity: "error", summary: "Error", detail: "Could not start the sync, please try again.", life: 4e3 });
        },
        onFinish: () => {
          syncingCategories.value = false;
        }
      });
    }
    const syncingAttributes = ref(false);
    function syncAttributes() {
      syncingAttributes.value = true;
      router.post(route("admin.items.sync-attributes"), {}, {
        preserveScroll: true,
        onSuccess: (res) => {
          toast.add({ severity: "success", summary: "Started", detail: res.props.flash.message, life: 4e3 });
        },
        onError: () => {
          toast.add({ severity: "error", summary: "Error", detail: "Could not start the sync, please try again.", life: 4e3 });
        },
        onFinish: () => {
          syncingAttributes.value = false;
        }
      });
    }
    const query = ref("");
    const results = ref([]);
    const searching = ref(false);
    let debounceTimer = null;
    function imageUrl(img) {
      return `/storage/items/${img}`;
    }
    async function runSearch(q) {
      searching.value = true;
      try {
        const res = await axios.get(route("admin.items.search"), { params: { q } });
        results.value = res.data;
      } catch {
        results.value = [];
      } finally {
        searching.value = false;
      }
    }
    function onSearchInput() {
      clearTimeout(debounceTimer);
      const q = query.value.trim();
      if (q.length < 2) {
        results.value = [];
        searching.value = false;
        return;
      }
      debounceTimer = setTimeout(() => runSearch(q), 400);
    }
    const manageDialogVisible = ref(false);
    const editingItem = ref(null);
    const manageForm = useForm({
      video_url: "",
      discount: null,
      discount_amount: null
    });
    function openManageDialog(item) {
      editingItem.value = item;
      manageForm.clearErrors();
      manageForm.video_url = item.video_url ?? "";
      manageForm.discount = item.discount ?? null;
      manageForm.discount_amount = null;
      manageDialogVisible.value = true;
    }
    function saveItem() {
      manageForm.transform((data) => ({
        video_url: data.video_url.trim() || null,
        discount: data.discount || null,
        discount_amount: data.discount_amount || null
      })).put(route("admin.items.update", editingItem.value.id), {
        preserveScroll: true,
        onSuccess: (res) => {
          editingItem.value.video_url = manageForm.video_url.trim() || null;
          manageDialogVisible.value = false;
          toast.add({ severity: "success", summary: "Saved", detail: res.props.flash.message, life: 3e3 });
          if (query.value.trim().length >= 2) runSearch(query.value.trim());
        }
      });
    }
    const categoryQuery = ref("");
    const categoryResults = ref([]);
    const searchingCategories = ref(false);
    const fetchingCategoryImageId = ref(null);
    let categoryDebounceTimer = null;
    function categoryImageUrl(category) {
      return `/storage/categories/${category.image}`;
    }
    async function runCategorySearch(q) {
      searchingCategories.value = true;
      try {
        const res = await axios.get(route("admin.categories.search"), { params: { q } });
        categoryResults.value = res.data;
      } catch {
        categoryResults.value = [];
      } finally {
        searchingCategories.value = false;
      }
    }
    function onCategorySearchInput() {
      clearTimeout(categoryDebounceTimer);
      const q = categoryQuery.value.trim();
      if (q.length < 2) {
        categoryResults.value = [];
        searchingCategories.value = false;
        return;
      }
      categoryDebounceTimer = setTimeout(() => runCategorySearch(q), 400);
    }
    function fetchCategoryImage(category) {
      fetchingCategoryImageId.value = category.id;
      router.post(route("admin.categories.fetch-image", category.id), {}, {
        preserveScroll: true,
        onSuccess: (res) => {
          toast.add({ severity: "success", summary: "Updated", detail: res.props.flash.message, life: 3e3 });
          if (categoryQuery.value.trim().length >= 2) runCategorySearch(categoryQuery.value.trim());
        },
        onError: (errors) => {
          toast.add({ severity: "error", summary: "Error", detail: errors?.message ?? "Could not fetch the image, please try again.", life: 4e3 });
        },
        onFinish: () => {
          fetchingCategoryImageId.value = null;
        }
      });
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Tabs = script;
      const _component_TabList = script$1;
      const _component_Tab = script$2;
      const _component_TabPanels = script$3;
      const _component_TabPanel = script$4;
      const _component_Button = script$5;
      const _component_Dialog = script$6;
      const _directive_tooltip = Tooltip;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "p-4 sm:p-6 space-y-4" }, _attrs))}><h1 class="text-xl font-bold text-gray-900">Manage Items</h1>`);
      _push(ssrRenderComponent(_component_Tabs, {
        value: activeTab.value,
        "onUpdate:value": ($event) => activeTab.value = $event,
        class: "bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_TabList, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Tab, { value: "0" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Manage Items`);
                      } else {
                        return [
                          createTextVNode("Manage Items")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Tab, { value: "1" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Sync Categories`);
                      } else {
                        return [
                          createTextVNode("Sync Categories")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Tab, { value: "0" }, {
                      default: withCtx(() => [
                        createTextVNode("Manage Items")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_Tab, { value: "1" }, {
                      default: withCtx(() => [
                        createTextVNode("Sync Categories")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_TabPanels, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_TabPanel, { value: "0" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<h2 class="text-base font-bold text-gray-900 mb-1"${_scopeId3}>Item Video Links</h2><p class="text-sm text-gray-500 mb-4"${_scopeId3}> Search for an item by No. or name and attach a YouTube link. It will show up as the last slide in the item&#39;s image gallery. </p><span class="relative inline-block w-full sm:w-96"${_scopeId3}><i class="pi pi-search text-gray-400 text-sm absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"${_scopeId3}></i>`);
                        _push4(ssrRenderComponent(_sfc_main$2, {
                          modelValue: query.value,
                          "onUpdate:modelValue": ($event) => query.value = $event,
                          onInput: onSearchInput,
                          placeholder: "Search by item No. or name...",
                          class: "w-full pl-9!"
                        }, null, _parent4, _scopeId3));
                        _push4(`</span>`);
                        if (searching.value) {
                          _push4(`<div class="flex items-center gap-2 text-sm text-gray-400 mt-4"${_scopeId3}><i class="pi pi-spinner pi-spin"${_scopeId3}></i> Searching... </div>`);
                        } else if (query.value.trim().length >= 2 && results.value.length === 0) {
                          _push4(`<div class="text-sm text-gray-400 mt-4"${_scopeId3}> No items found for &quot;${ssrInterpolate(query.value)}&quot;. </div>`);
                        } else if (results.value.length) {
                          _push4(`<ul class="divide-y divide-gray-100 mt-4"${_scopeId3}><!--[-->`);
                          ssrRenderList(results.value, (item) => {
                            _push4(`<li class="flex items-center gap-3 py-3"${_scopeId3}><div class="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 shrink-0"${_scopeId3}>`);
                            if (item.images?.length) {
                              _push4(`<img${ssrRenderAttr("src", imageUrl(item.images[0]))}${ssrRenderAttr("alt", item.name)} class="w-full h-full object-cover"${_scopeId3}>`);
                            } else {
                              _push4(`<div class="w-full h-full flex items-center justify-center"${_scopeId3}><i class="pi pi-image text-gray-300 text-sm"${_scopeId3}></i></div>`);
                            }
                            _push4(`</div><div class="flex-1 min-w-0"${_scopeId3}><p class="text-sm font-medium text-gray-800 truncate"${_scopeId3}>${ssrInterpolate(item.name)}</p><p class="text-xs text-gray-400 font-mono"${_scopeId3}>${ssrInterpolate(item.no)}</p><p class="text-sm mt-0.5"${_scopeId3}>`);
                            if (unref(hasDiscount)(item)) {
                              _push4(`<span class="text-red-500 line-through mr-1.5"${_scopeId3}>${ssrInterpolate(Number(item.unit_price).toFixed(2))} ₾</span>`);
                            } else {
                              _push4(`<!---->`);
                            }
                            _push4(`<span class="font-semibold text-gray-700"${_scopeId3}>${ssrInterpolate(Number(unref(hasDiscount)(item) ? item.discounted_price : item.unit_price).toFixed(2))} ₾</span></p></div>`);
                            if (item.discount > 0) {
                              _push4(`<span class="text-xs px-2 py-0.5 rounded-full font-semibold shrink-0 bg-red-100 text-red-600"${_scopeId3}> -${ssrInterpolate(unref(formatDiscount)(item.discount))}% </span>`);
                            } else {
                              _push4(`<!---->`);
                            }
                            _push4(`<span class="${ssrRenderClass([item.video_url ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-400", "text-xs px-2 py-0.5 rounded-full font-medium shrink-0"])}"${_scopeId3}>${ssrInterpolate(item.video_url ? "Video set" : "No video")}</span><a${ssrRenderAttrs(mergeProps({
                              href: _ctx.route("items.show", item.slug),
                              target: "_blank",
                              class: "w-8 h-8 flex items-center justify-center rounded-lg shrink-0 text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                            }, ssrGetDirectiveProps(_ctx, _directive_tooltip, "View item page", void 0, { top: true })))}${_scopeId3}><i class="pi pi-external-link text-sm"${_scopeId3}></i></a>`);
                            _push4(ssrRenderComponent(_component_Button, {
                              label: "Manage",
                              icon: "pi pi-cog",
                              size: "small",
                              severity: "secondary",
                              outlined: "",
                              onClick: ($event) => openManageDialog(item)
                            }, null, _parent4, _scopeId3));
                            _push4(`</li>`);
                          });
                          _push4(`<!--]--></ul>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`<hr class="my-6 border-gray-100"${_scopeId3}><h2 class="text-base font-bold text-gray-900 mb-1"${_scopeId3}>Item Attributes</h2><p class="text-sm text-gray-500 mb-4"${_scopeId3}> Updates item attribute values (e.g. size, color) from Business Central. </p>`);
                        _push4(ssrRenderComponent(_component_Button, {
                          loading: syncingAttributes.value,
                          onClick: syncAttributes,
                          label: syncingAttributes.value ? "Updating..." : "Update Attributes",
                          icon: "pi pi-refresh"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode("h2", { class: "text-base font-bold text-gray-900 mb-1" }, "Item Video Links"),
                          createVNode("p", { class: "text-sm text-gray-500 mb-4" }, " Search for an item by No. or name and attach a YouTube link. It will show up as the last slide in the item's image gallery. "),
                          createVNode("span", { class: "relative inline-block w-full sm:w-96" }, [
                            createVNode("i", { class: "pi pi-search text-gray-400 text-sm absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" }),
                            createVNode(_sfc_main$2, {
                              modelValue: query.value,
                              "onUpdate:modelValue": ($event) => query.value = $event,
                              onInput: onSearchInput,
                              placeholder: "Search by item No. or name...",
                              class: "w-full pl-9!"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          searching.value ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "flex items-center gap-2 text-sm text-gray-400 mt-4"
                          }, [
                            createVNode("i", { class: "pi pi-spinner pi-spin" }),
                            createTextVNode(" Searching... ")
                          ])) : query.value.trim().length >= 2 && results.value.length === 0 ? (openBlock(), createBlock("div", {
                            key: 1,
                            class: "text-sm text-gray-400 mt-4"
                          }, ' No items found for "' + toDisplayString(query.value) + '". ', 1)) : results.value.length ? (openBlock(), createBlock("ul", {
                            key: 2,
                            class: "divide-y divide-gray-100 mt-4"
                          }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(results.value, (item) => {
                              return openBlock(), createBlock("li", {
                                key: item.id,
                                class: "flex items-center gap-3 py-3"
                              }, [
                                createVNode("div", { class: "w-12 h-12 rounded-lg overflow-hidden bg-gray-100 shrink-0" }, [
                                  item.images?.length ? (openBlock(), createBlock("img", {
                                    key: 0,
                                    src: imageUrl(item.images[0]),
                                    alt: item.name,
                                    class: "w-full h-full object-cover"
                                  }, null, 8, ["src", "alt"])) : (openBlock(), createBlock("div", {
                                    key: 1,
                                    class: "w-full h-full flex items-center justify-center"
                                  }, [
                                    createVNode("i", { class: "pi pi-image text-gray-300 text-sm" })
                                  ]))
                                ]),
                                createVNode("div", { class: "flex-1 min-w-0" }, [
                                  createVNode("p", { class: "text-sm font-medium text-gray-800 truncate" }, toDisplayString(item.name), 1),
                                  createVNode("p", { class: "text-xs text-gray-400 font-mono" }, toDisplayString(item.no), 1),
                                  createVNode("p", { class: "text-sm mt-0.5" }, [
                                    unref(hasDiscount)(item) ? (openBlock(), createBlock("span", {
                                      key: 0,
                                      class: "text-red-500 line-through mr-1.5"
                                    }, toDisplayString(Number(item.unit_price).toFixed(2)) + " ₾", 1)) : createCommentVNode("", true),
                                    createVNode("span", { class: "font-semibold text-gray-700" }, toDisplayString(Number(unref(hasDiscount)(item) ? item.discounted_price : item.unit_price).toFixed(2)) + " ₾", 1)
                                  ])
                                ]),
                                item.discount > 0 ? (openBlock(), createBlock("span", {
                                  key: 0,
                                  class: "text-xs px-2 py-0.5 rounded-full font-semibold shrink-0 bg-red-100 text-red-600"
                                }, " -" + toDisplayString(unref(formatDiscount)(item.discount)) + "% ", 1)) : createCommentVNode("", true),
                                createVNode("span", {
                                  class: ["text-xs px-2 py-0.5 rounded-full font-medium shrink-0", item.video_url ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-400"]
                                }, toDisplayString(item.video_url ? "Video set" : "No video"), 3),
                                withDirectives((openBlock(), createBlock("a", {
                                  href: _ctx.route("items.show", item.slug),
                                  target: "_blank",
                                  class: "w-8 h-8 flex items-center justify-center rounded-lg shrink-0 text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                                }, [
                                  createVNode("i", { class: "pi pi-external-link text-sm" })
                                ], 8, ["href"])), [
                                  [
                                    _directive_tooltip,
                                    "View item page",
                                    void 0,
                                    { top: true }
                                  ]
                                ]),
                                createVNode(_component_Button, {
                                  label: "Manage",
                                  icon: "pi pi-cog",
                                  size: "small",
                                  severity: "secondary",
                                  outlined: "",
                                  onClick: ($event) => openManageDialog(item)
                                }, null, 8, ["onClick"])
                              ]);
                            }), 128))
                          ])) : createCommentVNode("", true),
                          createVNode("hr", { class: "my-6 border-gray-100" }),
                          createVNode("h2", { class: "text-base font-bold text-gray-900 mb-1" }, "Item Attributes"),
                          createVNode("p", { class: "text-sm text-gray-500 mb-4" }, " Updates item attribute values (e.g. size, color) from Business Central. "),
                          createVNode(_component_Button, {
                            loading: syncingAttributes.value,
                            onClick: syncAttributes,
                            label: syncingAttributes.value ? "Updating..." : "Update Attributes",
                            icon: "pi pi-refresh"
                          }, null, 8, ["loading", "label"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_TabPanel, { value: "1" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<h2 class="text-base font-bold text-gray-900 mb-1"${_scopeId3}>Sync Categories</h2><p class="text-sm text-gray-500 mb-4"${_scopeId3}> Updates the category structure and item category codes from Business Central. </p>`);
                        _push4(ssrRenderComponent(_component_Button, {
                          loading: syncingCategories.value,
                          onClick: syncCategories,
                          label: syncingCategories.value ? "Updating..." : "Update Now",
                          icon: "pi pi-refresh"
                        }, null, _parent4, _scopeId3));
                        _push4(`<hr class="my-6 border-gray-100"${_scopeId3}><h2 class="text-base font-bold text-gray-900 mb-1"${_scopeId3}>Category Photo</h2><p class="text-sm text-gray-500 mb-4"${_scopeId3}> Search for a category by name or code and pull its latest photo from Business Central. The previous photo is deleted once the new one is saved. </p><span class="relative inline-block w-full sm:w-96"${_scopeId3}><i class="pi pi-search text-gray-400 text-sm absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"${_scopeId3}></i>`);
                        _push4(ssrRenderComponent(_sfc_main$2, {
                          modelValue: categoryQuery.value,
                          "onUpdate:modelValue": ($event) => categoryQuery.value = $event,
                          onInput: onCategorySearchInput,
                          placeholder: "Search by category name or code...",
                          class: "w-full pl-9!"
                        }, null, _parent4, _scopeId3));
                        _push4(`</span>`);
                        if (searchingCategories.value) {
                          _push4(`<div class="flex items-center gap-2 text-sm text-gray-400 mt-4"${_scopeId3}><i class="pi pi-spinner pi-spin"${_scopeId3}></i> Searching... </div>`);
                        } else if (categoryQuery.value.trim().length >= 2 && categoryResults.value.length === 0) {
                          _push4(`<div class="text-sm text-gray-400 mt-4"${_scopeId3}> No categories found for &quot;${ssrInterpolate(categoryQuery.value)}&quot;. </div>`);
                        } else if (categoryResults.value.length) {
                          _push4(`<ul class="divide-y divide-gray-100 mt-4"${_scopeId3}><!--[-->`);
                          ssrRenderList(categoryResults.value, (category) => {
                            _push4(`<li class="flex items-center gap-3 py-3"${_scopeId3}><div class="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 shrink-0"${_scopeId3}>`);
                            if (category.image) {
                              _push4(`<img${ssrRenderAttr("src", categoryImageUrl(category))}${ssrRenderAttr("alt", category.name)} class="w-full h-full object-cover"${_scopeId3}>`);
                            } else {
                              _push4(`<div class="w-full h-full flex items-center justify-center"${_scopeId3}><i class="pi pi-image text-gray-300 text-sm"${_scopeId3}></i></div>`);
                            }
                            _push4(`</div><div class="flex-1 min-w-0"${_scopeId3}><p class="text-sm font-medium text-gray-800 truncate"${_scopeId3}>${ssrInterpolate(category.name)}</p><p class="text-xs text-gray-400 font-mono"${_scopeId3}>${ssrInterpolate(category.code)}</p></div>`);
                            _push4(ssrRenderComponent(_component_Button, {
                              label: "Update Image",
                              icon: "pi pi-refresh",
                              size: "small",
                              severity: "secondary",
                              outlined: "",
                              loading: fetchingCategoryImageId.value === category.id,
                              onClick: ($event) => fetchCategoryImage(category)
                            }, null, _parent4, _scopeId3));
                            _push4(`</li>`);
                          });
                          _push4(`<!--]--></ul>`);
                        } else {
                          _push4(`<!---->`);
                        }
                      } else {
                        return [
                          createVNode("h2", { class: "text-base font-bold text-gray-900 mb-1" }, "Sync Categories"),
                          createVNode("p", { class: "text-sm text-gray-500 mb-4" }, " Updates the category structure and item category codes from Business Central. "),
                          createVNode(_component_Button, {
                            loading: syncingCategories.value,
                            onClick: syncCategories,
                            label: syncingCategories.value ? "Updating..." : "Update Now",
                            icon: "pi pi-refresh"
                          }, null, 8, ["loading", "label"]),
                          createVNode("hr", { class: "my-6 border-gray-100" }),
                          createVNode("h2", { class: "text-base font-bold text-gray-900 mb-1" }, "Category Photo"),
                          createVNode("p", { class: "text-sm text-gray-500 mb-4" }, " Search for a category by name or code and pull its latest photo from Business Central. The previous photo is deleted once the new one is saved. "),
                          createVNode("span", { class: "relative inline-block w-full sm:w-96" }, [
                            createVNode("i", { class: "pi pi-search text-gray-400 text-sm absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" }),
                            createVNode(_sfc_main$2, {
                              modelValue: categoryQuery.value,
                              "onUpdate:modelValue": ($event) => categoryQuery.value = $event,
                              onInput: onCategorySearchInput,
                              placeholder: "Search by category name or code...",
                              class: "w-full pl-9!"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          searchingCategories.value ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "flex items-center gap-2 text-sm text-gray-400 mt-4"
                          }, [
                            createVNode("i", { class: "pi pi-spinner pi-spin" }),
                            createTextVNode(" Searching... ")
                          ])) : categoryQuery.value.trim().length >= 2 && categoryResults.value.length === 0 ? (openBlock(), createBlock("div", {
                            key: 1,
                            class: "text-sm text-gray-400 mt-4"
                          }, ' No categories found for "' + toDisplayString(categoryQuery.value) + '". ', 1)) : categoryResults.value.length ? (openBlock(), createBlock("ul", {
                            key: 2,
                            class: "divide-y divide-gray-100 mt-4"
                          }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(categoryResults.value, (category) => {
                              return openBlock(), createBlock("li", {
                                key: category.id,
                                class: "flex items-center gap-3 py-3"
                              }, [
                                createVNode("div", { class: "w-12 h-12 rounded-lg overflow-hidden bg-gray-100 shrink-0" }, [
                                  category.image ? (openBlock(), createBlock("img", {
                                    key: 0,
                                    src: categoryImageUrl(category),
                                    alt: category.name,
                                    class: "w-full h-full object-cover"
                                  }, null, 8, ["src", "alt"])) : (openBlock(), createBlock("div", {
                                    key: 1,
                                    class: "w-full h-full flex items-center justify-center"
                                  }, [
                                    createVNode("i", { class: "pi pi-image text-gray-300 text-sm" })
                                  ]))
                                ]),
                                createVNode("div", { class: "flex-1 min-w-0" }, [
                                  createVNode("p", { class: "text-sm font-medium text-gray-800 truncate" }, toDisplayString(category.name), 1),
                                  createVNode("p", { class: "text-xs text-gray-400 font-mono" }, toDisplayString(category.code), 1)
                                ]),
                                createVNode(_component_Button, {
                                  label: "Update Image",
                                  icon: "pi pi-refresh",
                                  size: "small",
                                  severity: "secondary",
                                  outlined: "",
                                  loading: fetchingCategoryImageId.value === category.id,
                                  onClick: ($event) => fetchCategoryImage(category)
                                }, null, 8, ["loading", "onClick"])
                              ]);
                            }), 128))
                          ])) : createCommentVNode("", true)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_TabPanel, { value: "0" }, {
                      default: withCtx(() => [
                        createVNode("h2", { class: "text-base font-bold text-gray-900 mb-1" }, "Item Video Links"),
                        createVNode("p", { class: "text-sm text-gray-500 mb-4" }, " Search for an item by No. or name and attach a YouTube link. It will show up as the last slide in the item's image gallery. "),
                        createVNode("span", { class: "relative inline-block w-full sm:w-96" }, [
                          createVNode("i", { class: "pi pi-search text-gray-400 text-sm absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" }),
                          createVNode(_sfc_main$2, {
                            modelValue: query.value,
                            "onUpdate:modelValue": ($event) => query.value = $event,
                            onInput: onSearchInput,
                            placeholder: "Search by item No. or name...",
                            class: "w-full pl-9!"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        searching.value ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "flex items-center gap-2 text-sm text-gray-400 mt-4"
                        }, [
                          createVNode("i", { class: "pi pi-spinner pi-spin" }),
                          createTextVNode(" Searching... ")
                        ])) : query.value.trim().length >= 2 && results.value.length === 0 ? (openBlock(), createBlock("div", {
                          key: 1,
                          class: "text-sm text-gray-400 mt-4"
                        }, ' No items found for "' + toDisplayString(query.value) + '". ', 1)) : results.value.length ? (openBlock(), createBlock("ul", {
                          key: 2,
                          class: "divide-y divide-gray-100 mt-4"
                        }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(results.value, (item) => {
                            return openBlock(), createBlock("li", {
                              key: item.id,
                              class: "flex items-center gap-3 py-3"
                            }, [
                              createVNode("div", { class: "w-12 h-12 rounded-lg overflow-hidden bg-gray-100 shrink-0" }, [
                                item.images?.length ? (openBlock(), createBlock("img", {
                                  key: 0,
                                  src: imageUrl(item.images[0]),
                                  alt: item.name,
                                  class: "w-full h-full object-cover"
                                }, null, 8, ["src", "alt"])) : (openBlock(), createBlock("div", {
                                  key: 1,
                                  class: "w-full h-full flex items-center justify-center"
                                }, [
                                  createVNode("i", { class: "pi pi-image text-gray-300 text-sm" })
                                ]))
                              ]),
                              createVNode("div", { class: "flex-1 min-w-0" }, [
                                createVNode("p", { class: "text-sm font-medium text-gray-800 truncate" }, toDisplayString(item.name), 1),
                                createVNode("p", { class: "text-xs text-gray-400 font-mono" }, toDisplayString(item.no), 1),
                                createVNode("p", { class: "text-sm mt-0.5" }, [
                                  unref(hasDiscount)(item) ? (openBlock(), createBlock("span", {
                                    key: 0,
                                    class: "text-red-500 line-through mr-1.5"
                                  }, toDisplayString(Number(item.unit_price).toFixed(2)) + " ₾", 1)) : createCommentVNode("", true),
                                  createVNode("span", { class: "font-semibold text-gray-700" }, toDisplayString(Number(unref(hasDiscount)(item) ? item.discounted_price : item.unit_price).toFixed(2)) + " ₾", 1)
                                ])
                              ]),
                              item.discount > 0 ? (openBlock(), createBlock("span", {
                                key: 0,
                                class: "text-xs px-2 py-0.5 rounded-full font-semibold shrink-0 bg-red-100 text-red-600"
                              }, " -" + toDisplayString(unref(formatDiscount)(item.discount)) + "% ", 1)) : createCommentVNode("", true),
                              createVNode("span", {
                                class: ["text-xs px-2 py-0.5 rounded-full font-medium shrink-0", item.video_url ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-400"]
                              }, toDisplayString(item.video_url ? "Video set" : "No video"), 3),
                              withDirectives((openBlock(), createBlock("a", {
                                href: _ctx.route("items.show", item.slug),
                                target: "_blank",
                                class: "w-8 h-8 flex items-center justify-center rounded-lg shrink-0 text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                              }, [
                                createVNode("i", { class: "pi pi-external-link text-sm" })
                              ], 8, ["href"])), [
                                [
                                  _directive_tooltip,
                                  "View item page",
                                  void 0,
                                  { top: true }
                                ]
                              ]),
                              createVNode(_component_Button, {
                                label: "Manage",
                                icon: "pi pi-cog",
                                size: "small",
                                severity: "secondary",
                                outlined: "",
                                onClick: ($event) => openManageDialog(item)
                              }, null, 8, ["onClick"])
                            ]);
                          }), 128))
                        ])) : createCommentVNode("", true),
                        createVNode("hr", { class: "my-6 border-gray-100" }),
                        createVNode("h2", { class: "text-base font-bold text-gray-900 mb-1" }, "Item Attributes"),
                        createVNode("p", { class: "text-sm text-gray-500 mb-4" }, " Updates item attribute values (e.g. size, color) from Business Central. "),
                        createVNode(_component_Button, {
                          loading: syncingAttributes.value,
                          onClick: syncAttributes,
                          label: syncingAttributes.value ? "Updating..." : "Update Attributes",
                          icon: "pi pi-refresh"
                        }, null, 8, ["loading", "label"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_TabPanel, { value: "1" }, {
                      default: withCtx(() => [
                        createVNode("h2", { class: "text-base font-bold text-gray-900 mb-1" }, "Sync Categories"),
                        createVNode("p", { class: "text-sm text-gray-500 mb-4" }, " Updates the category structure and item category codes from Business Central. "),
                        createVNode(_component_Button, {
                          loading: syncingCategories.value,
                          onClick: syncCategories,
                          label: syncingCategories.value ? "Updating..." : "Update Now",
                          icon: "pi pi-refresh"
                        }, null, 8, ["loading", "label"]),
                        createVNode("hr", { class: "my-6 border-gray-100" }),
                        createVNode("h2", { class: "text-base font-bold text-gray-900 mb-1" }, "Category Photo"),
                        createVNode("p", { class: "text-sm text-gray-500 mb-4" }, " Search for a category by name or code and pull its latest photo from Business Central. The previous photo is deleted once the new one is saved. "),
                        createVNode("span", { class: "relative inline-block w-full sm:w-96" }, [
                          createVNode("i", { class: "pi pi-search text-gray-400 text-sm absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" }),
                          createVNode(_sfc_main$2, {
                            modelValue: categoryQuery.value,
                            "onUpdate:modelValue": ($event) => categoryQuery.value = $event,
                            onInput: onCategorySearchInput,
                            placeholder: "Search by category name or code...",
                            class: "w-full pl-9!"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        searchingCategories.value ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "flex items-center gap-2 text-sm text-gray-400 mt-4"
                        }, [
                          createVNode("i", { class: "pi pi-spinner pi-spin" }),
                          createTextVNode(" Searching... ")
                        ])) : categoryQuery.value.trim().length >= 2 && categoryResults.value.length === 0 ? (openBlock(), createBlock("div", {
                          key: 1,
                          class: "text-sm text-gray-400 mt-4"
                        }, ' No categories found for "' + toDisplayString(categoryQuery.value) + '". ', 1)) : categoryResults.value.length ? (openBlock(), createBlock("ul", {
                          key: 2,
                          class: "divide-y divide-gray-100 mt-4"
                        }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(categoryResults.value, (category) => {
                            return openBlock(), createBlock("li", {
                              key: category.id,
                              class: "flex items-center gap-3 py-3"
                            }, [
                              createVNode("div", { class: "w-12 h-12 rounded-lg overflow-hidden bg-gray-100 shrink-0" }, [
                                category.image ? (openBlock(), createBlock("img", {
                                  key: 0,
                                  src: categoryImageUrl(category),
                                  alt: category.name,
                                  class: "w-full h-full object-cover"
                                }, null, 8, ["src", "alt"])) : (openBlock(), createBlock("div", {
                                  key: 1,
                                  class: "w-full h-full flex items-center justify-center"
                                }, [
                                  createVNode("i", { class: "pi pi-image text-gray-300 text-sm" })
                                ]))
                              ]),
                              createVNode("div", { class: "flex-1 min-w-0" }, [
                                createVNode("p", { class: "text-sm font-medium text-gray-800 truncate" }, toDisplayString(category.name), 1),
                                createVNode("p", { class: "text-xs text-gray-400 font-mono" }, toDisplayString(category.code), 1)
                              ]),
                              createVNode(_component_Button, {
                                label: "Update Image",
                                icon: "pi pi-refresh",
                                size: "small",
                                severity: "secondary",
                                outlined: "",
                                loading: fetchingCategoryImageId.value === category.id,
                                onClick: ($event) => fetchCategoryImage(category)
                              }, null, 8, ["loading", "onClick"])
                            ]);
                          }), 128))
                        ])) : createCommentVNode("", true)
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
              createVNode(_component_TabList, null, {
                default: withCtx(() => [
                  createVNode(_component_Tab, { value: "0" }, {
                    default: withCtx(() => [
                      createTextVNode("Manage Items")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_Tab, { value: "1" }, {
                    default: withCtx(() => [
                      createTextVNode("Sync Categories")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_TabPanels, null, {
                default: withCtx(() => [
                  createVNode(_component_TabPanel, { value: "0" }, {
                    default: withCtx(() => [
                      createVNode("h2", { class: "text-base font-bold text-gray-900 mb-1" }, "Item Video Links"),
                      createVNode("p", { class: "text-sm text-gray-500 mb-4" }, " Search for an item by No. or name and attach a YouTube link. It will show up as the last slide in the item's image gallery. "),
                      createVNode("span", { class: "relative inline-block w-full sm:w-96" }, [
                        createVNode("i", { class: "pi pi-search text-gray-400 text-sm absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" }),
                        createVNode(_sfc_main$2, {
                          modelValue: query.value,
                          "onUpdate:modelValue": ($event) => query.value = $event,
                          onInput: onSearchInput,
                          placeholder: "Search by item No. or name...",
                          class: "w-full pl-9!"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      searching.value ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "flex items-center gap-2 text-sm text-gray-400 mt-4"
                      }, [
                        createVNode("i", { class: "pi pi-spinner pi-spin" }),
                        createTextVNode(" Searching... ")
                      ])) : query.value.trim().length >= 2 && results.value.length === 0 ? (openBlock(), createBlock("div", {
                        key: 1,
                        class: "text-sm text-gray-400 mt-4"
                      }, ' No items found for "' + toDisplayString(query.value) + '". ', 1)) : results.value.length ? (openBlock(), createBlock("ul", {
                        key: 2,
                        class: "divide-y divide-gray-100 mt-4"
                      }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(results.value, (item) => {
                          return openBlock(), createBlock("li", {
                            key: item.id,
                            class: "flex items-center gap-3 py-3"
                          }, [
                            createVNode("div", { class: "w-12 h-12 rounded-lg overflow-hidden bg-gray-100 shrink-0" }, [
                              item.images?.length ? (openBlock(), createBlock("img", {
                                key: 0,
                                src: imageUrl(item.images[0]),
                                alt: item.name,
                                class: "w-full h-full object-cover"
                              }, null, 8, ["src", "alt"])) : (openBlock(), createBlock("div", {
                                key: 1,
                                class: "w-full h-full flex items-center justify-center"
                              }, [
                                createVNode("i", { class: "pi pi-image text-gray-300 text-sm" })
                              ]))
                            ]),
                            createVNode("div", { class: "flex-1 min-w-0" }, [
                              createVNode("p", { class: "text-sm font-medium text-gray-800 truncate" }, toDisplayString(item.name), 1),
                              createVNode("p", { class: "text-xs text-gray-400 font-mono" }, toDisplayString(item.no), 1),
                              createVNode("p", { class: "text-sm mt-0.5" }, [
                                unref(hasDiscount)(item) ? (openBlock(), createBlock("span", {
                                  key: 0,
                                  class: "text-red-500 line-through mr-1.5"
                                }, toDisplayString(Number(item.unit_price).toFixed(2)) + " ₾", 1)) : createCommentVNode("", true),
                                createVNode("span", { class: "font-semibold text-gray-700" }, toDisplayString(Number(unref(hasDiscount)(item) ? item.discounted_price : item.unit_price).toFixed(2)) + " ₾", 1)
                              ])
                            ]),
                            item.discount > 0 ? (openBlock(), createBlock("span", {
                              key: 0,
                              class: "text-xs px-2 py-0.5 rounded-full font-semibold shrink-0 bg-red-100 text-red-600"
                            }, " -" + toDisplayString(unref(formatDiscount)(item.discount)) + "% ", 1)) : createCommentVNode("", true),
                            createVNode("span", {
                              class: ["text-xs px-2 py-0.5 rounded-full font-medium shrink-0", item.video_url ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-400"]
                            }, toDisplayString(item.video_url ? "Video set" : "No video"), 3),
                            withDirectives((openBlock(), createBlock("a", {
                              href: _ctx.route("items.show", item.slug),
                              target: "_blank",
                              class: "w-8 h-8 flex items-center justify-center rounded-lg shrink-0 text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                            }, [
                              createVNode("i", { class: "pi pi-external-link text-sm" })
                            ], 8, ["href"])), [
                              [
                                _directive_tooltip,
                                "View item page",
                                void 0,
                                { top: true }
                              ]
                            ]),
                            createVNode(_component_Button, {
                              label: "Manage",
                              icon: "pi pi-cog",
                              size: "small",
                              severity: "secondary",
                              outlined: "",
                              onClick: ($event) => openManageDialog(item)
                            }, null, 8, ["onClick"])
                          ]);
                        }), 128))
                      ])) : createCommentVNode("", true),
                      createVNode("hr", { class: "my-6 border-gray-100" }),
                      createVNode("h2", { class: "text-base font-bold text-gray-900 mb-1" }, "Item Attributes"),
                      createVNode("p", { class: "text-sm text-gray-500 mb-4" }, " Updates item attribute values (e.g. size, color) from Business Central. "),
                      createVNode(_component_Button, {
                        loading: syncingAttributes.value,
                        onClick: syncAttributes,
                        label: syncingAttributes.value ? "Updating..." : "Update Attributes",
                        icon: "pi pi-refresh"
                      }, null, 8, ["loading", "label"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_TabPanel, { value: "1" }, {
                    default: withCtx(() => [
                      createVNode("h2", { class: "text-base font-bold text-gray-900 mb-1" }, "Sync Categories"),
                      createVNode("p", { class: "text-sm text-gray-500 mb-4" }, " Updates the category structure and item category codes from Business Central. "),
                      createVNode(_component_Button, {
                        loading: syncingCategories.value,
                        onClick: syncCategories,
                        label: syncingCategories.value ? "Updating..." : "Update Now",
                        icon: "pi pi-refresh"
                      }, null, 8, ["loading", "label"]),
                      createVNode("hr", { class: "my-6 border-gray-100" }),
                      createVNode("h2", { class: "text-base font-bold text-gray-900 mb-1" }, "Category Photo"),
                      createVNode("p", { class: "text-sm text-gray-500 mb-4" }, " Search for a category by name or code and pull its latest photo from Business Central. The previous photo is deleted once the new one is saved. "),
                      createVNode("span", { class: "relative inline-block w-full sm:w-96" }, [
                        createVNode("i", { class: "pi pi-search text-gray-400 text-sm absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" }),
                        createVNode(_sfc_main$2, {
                          modelValue: categoryQuery.value,
                          "onUpdate:modelValue": ($event) => categoryQuery.value = $event,
                          onInput: onCategorySearchInput,
                          placeholder: "Search by category name or code...",
                          class: "w-full pl-9!"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      searchingCategories.value ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "flex items-center gap-2 text-sm text-gray-400 mt-4"
                      }, [
                        createVNode("i", { class: "pi pi-spinner pi-spin" }),
                        createTextVNode(" Searching... ")
                      ])) : categoryQuery.value.trim().length >= 2 && categoryResults.value.length === 0 ? (openBlock(), createBlock("div", {
                        key: 1,
                        class: "text-sm text-gray-400 mt-4"
                      }, ' No categories found for "' + toDisplayString(categoryQuery.value) + '". ', 1)) : categoryResults.value.length ? (openBlock(), createBlock("ul", {
                        key: 2,
                        class: "divide-y divide-gray-100 mt-4"
                      }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(categoryResults.value, (category) => {
                          return openBlock(), createBlock("li", {
                            key: category.id,
                            class: "flex items-center gap-3 py-3"
                          }, [
                            createVNode("div", { class: "w-12 h-12 rounded-lg overflow-hidden bg-gray-100 shrink-0" }, [
                              category.image ? (openBlock(), createBlock("img", {
                                key: 0,
                                src: categoryImageUrl(category),
                                alt: category.name,
                                class: "w-full h-full object-cover"
                              }, null, 8, ["src", "alt"])) : (openBlock(), createBlock("div", {
                                key: 1,
                                class: "w-full h-full flex items-center justify-center"
                              }, [
                                createVNode("i", { class: "pi pi-image text-gray-300 text-sm" })
                              ]))
                            ]),
                            createVNode("div", { class: "flex-1 min-w-0" }, [
                              createVNode("p", { class: "text-sm font-medium text-gray-800 truncate" }, toDisplayString(category.name), 1),
                              createVNode("p", { class: "text-xs text-gray-400 font-mono" }, toDisplayString(category.code), 1)
                            ]),
                            createVNode(_component_Button, {
                              label: "Update Image",
                              icon: "pi pi-refresh",
                              size: "small",
                              severity: "secondary",
                              outlined: "",
                              loading: fetchingCategoryImageId.value === category.id,
                              onClick: ($event) => fetchCategoryImage(category)
                            }, null, 8, ["loading", "onClick"])
                          ]);
                        }), 128))
                      ])) : createCommentVNode("", true)
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
      _push(ssrRenderComponent(_component_Dialog, {
        visible: manageDialogVisible.value,
        "onUpdate:visible": ($event) => manageDialogVisible.value = $event,
        modal: "",
        header: "Manage Item",
        style: { width: "28rem" }
      }, {
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Button, {
              label: "Cancel",
              size: "small",
              severity: "secondary",
              variant: "text",
              onClick: ($event) => manageDialogVisible.value = false
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
                onClick: ($event) => manageDialogVisible.value = false
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
              _push2(`<div class="space-y-4"${_scopeId}><div${_scopeId}><p class="text-sm font-medium text-gray-800"${_scopeId}>${ssrInterpolate(editingItem.value.name)}</p><p class="text-xs text-gray-400 font-mono"${_scopeId}>${ssrInterpolate(editingItem.value.no)}</p></div><div${_scopeId}><label class="text-xs font-medium text-gray-500 mb-1 block"${_scopeId}>Video Link</label>`);
              _push2(ssrRenderComponent(_sfc_main$2, {
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
              _push2(`</div><div${_scopeId}><label class="text-xs font-medium text-gray-500 mb-1 block"${_scopeId}>Discount (in %)</label>`);
              _push2(ssrRenderComponent(unref(script$7), {
                modelValue: unref(manageForm).discount,
                "onUpdate:modelValue": ($event) => unref(manageForm).discount = $event,
                min: 0,
                max: 100,
                "min-fraction-digits": 0,
                "max-fraction-digits": 2,
                suffix: "%",
                placeholder: "0",
                invalid: !!unref(manageForm).errors.discount,
                fluid: ""
              }, null, _parent2, _scopeId));
              if (unref(manageForm).errors.discount) {
                _push2(`<p class="text-xs text-red-500 mt-1"${_scopeId}>${ssrInterpolate(unref(manageForm).errors.discount)}</p>`);
              } else {
                _push2(`<p class="text-xs text-gray-400 mt-1"${_scopeId}>Percentage off unit price. Leave empty for no discount.</p>`);
              }
              _push2(`</div><div${_scopeId}><label class="text-xs font-medium text-gray-500 mb-1 block"${_scopeId}>Amount Off (₾)</label>`);
              _push2(ssrRenderComponent(unref(script$7), {
                modelValue: unref(manageForm).discount_amount,
                "onUpdate:modelValue": ($event) => unref(manageForm).discount_amount = $event,
                min: 0,
                max: editingItem.value.unit_price,
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
                _push2(`<p class="text-xs text-gray-400 mt-1"${_scopeId}>e.g. price is ${ssrInterpolate(Number(editingItem.value.unit_price).toFixed(2))} ₾, enter 1 to make it ${ssrInterpolate((editingItem.value.unit_price - 1).toFixed(2))} ₾. Overrides the percentage above if filled.</p>`);
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
                  createVNode("label", { class: "text-xs font-medium text-gray-500 mb-1 block" }, "Video Link"),
                  createVNode(_sfc_main$2, {
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
                  createVNode("label", { class: "text-xs font-medium text-gray-500 mb-1 block" }, "Discount (in %)"),
                  createVNode(unref(script$7), {
                    modelValue: unref(manageForm).discount,
                    "onUpdate:modelValue": ($event) => unref(manageForm).discount = $event,
                    min: 0,
                    max: 100,
                    "min-fraction-digits": 0,
                    "max-fraction-digits": 2,
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
                  }, "Percentage off unit price. Leave empty for no discount."))
                ]),
                createVNode("div", null, [
                  createVNode("label", { class: "text-xs font-medium text-gray-500 mb-1 block" }, "Amount Off (₾)"),
                  createVNode(unref(script$7), {
                    modelValue: unref(manageForm).discount_amount,
                    "onUpdate:modelValue": ($event) => unref(manageForm).discount_amount = $event,
                    min: 0,
                    max: editingItem.value.unit_price,
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
                  }, "e.g. price is " + toDisplayString(Number(editingItem.value.unit_price).toFixed(2)) + " ₾, enter 1 to make it " + toDisplayString((editingItem.value.unit_price - 1).toFixed(2)) + " ₾. Overrides the percentage above if filled.", 1))
                ])
              ])) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/items/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=Index-CttnD1zV.js.map
