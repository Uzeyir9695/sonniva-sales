import { s as script$6 } from "./index-nsBhLTBN.js";
import { s as script$5 } from "./index-hSjFFc9a.js";
import { s as script$3, a as script$4 } from "./index-CYNLBuLC.js";
import { s as script, a as script$1, b as script$2 } from "./index-CwYp4h2j.js";
import { ref, mergeProps, withCtx, createTextVNode, createVNode, openBlock, createBlock, toDisplayString, Fragment, renderList, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrRenderClass } from "vue/server-renderer";
import { router } from "@inertiajs/vue3";
import { u as useToast } from "./index-Qb24q4w2.js";
import axios from "axios";
import { _ as _sfc_main$1 } from "./AdminLayout-CbCaTGPo.js";
import _sfc_main$2 from "./PrimeInputText-BlIRrCdA.js";
import "@primeuix/utils";
import "@primeuix/utils/dom";
import "@primeuix/utils/zindex";
import "@primevue/icons/times";
import "@primevue/icons/windowmaximize";
import "@primevue/icons/windowminimize";
import "@primeuix/utils/object";
import "@primevue/core/basedirective";
import "@primevue/core/base/style";
import "./index-zZrFrjQS.js";
import "./index-BWQ0UkXI.js";
import "@primeuix/styles/ripple";
import "@primeuix/styled";
import "@primevue/core/basecomponent";
import "@primeuix/styles/dialog";
import "@primevue/icons/spinner";
import "@primeuix/styles/badge";
import "@primeuix/styles/button";
import "@primevue/icons/chevronleft";
import "@primevue/icons/chevronright";
import "@primeuix/styles/tabs";
import "./index-Dc5vQApW.js";
import "@primeuix/utils/eventbus";
import "@primeuix/styles/toast";
import "@primevue/icons/check";
import "@primevue/icons/exclamationtriangle";
import "@primevue/icons/infocircle";
import "@primevue/icons/timescircle";
import "@vueuse/core";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./index-C3Ts-4IM.js";
import "@primeuix/utils/uuid";
import "@primevue/core/utils";
import "@primeuix/styles/tooltip";
import "./QuickViewDialog--IPmfhAf.js";
import "./useCart-CIcsIaQl.js";
import "./usePricing-HxfzG07E.js";
import "@primeuix/styles/confirmdialog";
import "./index-BAgOeBfa.js";
import "@primevue/core/baseinput";
import "@primeuix/styles/inputtext";
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
    const videoDialogVisible = ref(false);
    const editingItem = ref(null);
    const videoUrlInput = ref("");
    const savingVideo = ref(false);
    function openVideoDialog(item) {
      editingItem.value = item;
      videoUrlInput.value = item.video_url ?? "";
      videoDialogVisible.value = true;
    }
    function saveVideo() {
      savingVideo.value = true;
      router.put(route("admin.items.update-video", editingItem.value.id), {
        video_url: videoUrlInput.value.trim() || null
      }, {
        preserveScroll: true,
        onSuccess: (res) => {
          editingItem.value.video_url = videoUrlInput.value.trim() || null;
          videoDialogVisible.value = false;
          toast.add({ severity: "success", summary: "Saved", detail: res.props.flash.message, life: 3e3 });
        },
        onError: (errors) => {
          toast.add({ severity: "error", summary: "Error", detail: errors.video_url ?? "Could not save the video link.", life: 4e3 });
        },
        onFinish: () => {
          savingVideo.value = false;
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
                            _push4(`</div><div class="flex-1 min-w-0"${_scopeId3}><p class="text-sm font-medium text-gray-800 truncate"${_scopeId3}>${ssrInterpolate(item.name)}</p><p class="text-xs text-gray-400 font-mono"${_scopeId3}>${ssrInterpolate(item.no)}</p></div><span class="${ssrRenderClass([item.video_url ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-400", "text-xs px-2 py-0.5 rounded-full font-medium shrink-0"])}"${_scopeId3}>${ssrInterpolate(item.video_url ? "Video set" : "No video")}</span>`);
                            _push4(ssrRenderComponent(_component_Button, {
                              label: item.video_url ? "Edit" : "Add Video",
                              icon: item.video_url ? "pi pi-pencil" : "pi pi-plus",
                              size: "small",
                              severity: "secondary",
                              outlined: "",
                              onClick: ($event) => openVideoDialog(item)
                            }, null, _parent4, _scopeId3));
                            _push4(`</li>`);
                          });
                          _push4(`<!--]--></ul>`);
                        } else {
                          _push4(`<!---->`);
                        }
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
                                  createVNode("p", { class: "text-xs text-gray-400 font-mono" }, toDisplayString(item.no), 1)
                                ]),
                                createVNode("span", {
                                  class: ["text-xs px-2 py-0.5 rounded-full font-medium shrink-0", item.video_url ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-400"]
                                }, toDisplayString(item.video_url ? "Video set" : "No video"), 3),
                                createVNode(_component_Button, {
                                  label: item.video_url ? "Edit" : "Add Video",
                                  icon: item.video_url ? "pi pi-pencil" : "pi pi-plus",
                                  size: "small",
                                  severity: "secondary",
                                  outlined: "",
                                  onClick: ($event) => openVideoDialog(item)
                                }, null, 8, ["label", "icon", "onClick"])
                              ]);
                            }), 128))
                          ])) : createCommentVNode("", true)
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
                      } else {
                        return [
                          createVNode("h2", { class: "text-base font-bold text-gray-900 mb-1" }, "Sync Categories"),
                          createVNode("p", { class: "text-sm text-gray-500 mb-4" }, " Updates the category structure and item category codes from Business Central. "),
                          createVNode(_component_Button, {
                            loading: syncingCategories.value,
                            onClick: syncCategories,
                            label: syncingCategories.value ? "Updating..." : "Update Now",
                            icon: "pi pi-refresh"
                          }, null, 8, ["loading", "label"])
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
                                createVNode("p", { class: "text-xs text-gray-400 font-mono" }, toDisplayString(item.no), 1)
                              ]),
                              createVNode("span", {
                                class: ["text-xs px-2 py-0.5 rounded-full font-medium shrink-0", item.video_url ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-400"]
                              }, toDisplayString(item.video_url ? "Video set" : "No video"), 3),
                              createVNode(_component_Button, {
                                label: item.video_url ? "Edit" : "Add Video",
                                icon: item.video_url ? "pi pi-pencil" : "pi pi-plus",
                                size: "small",
                                severity: "secondary",
                                outlined: "",
                                onClick: ($event) => openVideoDialog(item)
                              }, null, 8, ["label", "icon", "onClick"])
                            ]);
                          }), 128))
                        ])) : createCommentVNode("", true)
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
                        }, null, 8, ["loading", "label"])
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
                              createVNode("p", { class: "text-xs text-gray-400 font-mono" }, toDisplayString(item.no), 1)
                            ]),
                            createVNode("span", {
                              class: ["text-xs px-2 py-0.5 rounded-full font-medium shrink-0", item.video_url ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-400"]
                            }, toDisplayString(item.video_url ? "Video set" : "No video"), 3),
                            createVNode(_component_Button, {
                              label: item.video_url ? "Edit" : "Add Video",
                              icon: item.video_url ? "pi pi-pencil" : "pi pi-plus",
                              size: "small",
                              severity: "secondary",
                              outlined: "",
                              onClick: ($event) => openVideoDialog(item)
                            }, null, 8, ["label", "icon", "onClick"])
                          ]);
                        }), 128))
                      ])) : createCommentVNode("", true)
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
                      }, null, 8, ["loading", "label"])
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
        visible: videoDialogVisible.value,
        "onUpdate:visible": ($event) => videoDialogVisible.value = $event,
        modal: "",
        header: "Item Video Link",
        style: { width: "28rem" }
      }, {
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Button, {
              label: "Cancel",
              size: "small",
              severity: "secondary",
              variant: "text",
              onClick: ($event) => videoDialogVisible.value = false
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Button, {
              label: "Save",
              size: "small",
              icon: "pi pi-check",
              loading: savingVideo.value,
              onClick: saveVideo
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Button, {
                label: "Cancel",
                size: "small",
                severity: "secondary",
                variant: "text",
                onClick: ($event) => videoDialogVisible.value = false
              }, null, 8, ["onClick"]),
              createVNode(_component_Button, {
                label: "Save",
                size: "small",
                icon: "pi pi-check",
                loading: savingVideo.value,
                onClick: saveVideo
              }, null, 8, ["loading"])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (editingItem.value) {
              _push2(`<div class="space-y-3"${_scopeId}><p class="text-sm font-medium text-gray-800"${_scopeId}>${ssrInterpolate(editingItem.value.name)}</p><p class="text-xs text-gray-400 font-mono"${_scopeId}>${ssrInterpolate(editingItem.value.no)}</p>`);
              _push2(ssrRenderComponent(_sfc_main$2, {
                modelValue: videoUrlInput.value,
                "onUpdate:modelValue": ($event) => videoUrlInput.value = $event,
                placeholder: "https://youtu.be/...",
                class: "w-full",
                fluid: ""
              }, null, _parent2, _scopeId));
              _push2(`<p class="text-xs text-gray-400"${_scopeId}>Paste the link from YouTube&#39;s Share button. Leave empty to remove the video.</p></div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              editingItem.value ? (openBlock(), createBlock("div", {
                key: 0,
                class: "space-y-3"
              }, [
                createVNode("p", { class: "text-sm font-medium text-gray-800" }, toDisplayString(editingItem.value.name), 1),
                createVNode("p", { class: "text-xs text-gray-400 font-mono" }, toDisplayString(editingItem.value.no), 1),
                createVNode(_sfc_main$2, {
                  modelValue: videoUrlInput.value,
                  "onUpdate:modelValue": ($event) => videoUrlInput.value = $event,
                  placeholder: "https://youtu.be/...",
                  class: "w-full",
                  fluid: ""
                }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                createVNode("p", { class: "text-xs text-gray-400" }, "Paste the link from YouTube's Share button. Leave empty to remove the video.")
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
//# sourceMappingURL=Index-0mZ5OrXo.js.map
