import { computed, mergeProps, unref, withCtx, createVNode, toDisplayString, openBlock, createBlock, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { Deferred } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./AdminLayout-D1TicwrL.js";
import "./index-hSjFFc9a.js";
import "@primeuix/utils";
import "@primeuix/utils/object";
import "@primevue/icons/spinner";
import "@primevue/core/basecomponent";
import "@primeuix/styles/badge";
import "@primevue/core/base/style";
import "./index-BWQ0UkXI.js";
import "@primeuix/utils/dom";
import "@primevue/core/basedirective";
import "@primeuix/styles/ripple";
import "@primeuix/styles/button";
import "./index-C9JjNQ4w.js";
import "@primeuix/utils/zindex";
import "./index-zZrFrjQS.js";
import "@primeuix/utils/eventbus";
import "@primeuix/styles/toast";
import "@primevue/icons/check";
import "@primevue/icons/exclamationtriangle";
import "@primevue/icons/infocircle";
import "@primevue/icons/times";
import "@primevue/icons/timescircle";
import "./LargeDeviceMegaMenu-BGiz7hWc.js";
import "swiper/vue";
import "swiper/modules";
/* empty css                */
import "@vueuse/core";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./index-C3Ts-4IM.js";
import "@primeuix/utils/uuid";
import "@primevue/core/utils";
import "@primeuix/styles/tooltip";
import "axios";
import "./QuickViewDialog-DUZFQ2la.js";
import "./index-nsBhLTBN.js";
import "@primevue/icons/windowmaximize";
import "@primevue/icons/windowminimize";
import "@primeuix/styled";
import "@primeuix/styles/dialog";
import "./useCart-CWhz1Vmq.js";
import "./index-Qb24q4w2.js";
import "./usePricing-HxfzG07E.js";
import "@primeuix/styles/confirmdialog";
const _sfc_main = /* @__PURE__ */ Object.assign({ layout: _sfc_main$1 }, {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    days: { type: Number, default: 30 },
    configured: { type: Boolean, default: false },
    summary: { type: Object, default: () => ({}) },
    topPages: { type: Array, default: () => [] },
    userTypes: { type: Array, default: () => [] },
    topSearchTerms: { type: Array, default: () => [] },
    topViewedItems: { type: Array, default: () => [] },
    topSoldItems: { type: Array, default: () => [] }
  },
  setup(__props) {
    const props = __props;
    const periods = [
      { label: "7 days", value: 7 },
      { label: "30 days", value: 30 },
      { label: "90 days", value: 90 }
    ];
    const totalUsers = computed(
      () => props.userTypes.reduce((s, r) => s + (r.users ?? 0), 0)
    );
    const fmt = (n) => Number(n ?? 0).toLocaleString();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "p-6 space-y-6" }, _attrs))}><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"><div><h1 class="text-2xl font-bold text-gray-900">Analytics</h1></div><div class="flex gap-2"><!--[-->`);
      ssrRenderList(periods, (p) => {
        _push(`<button class="${ssrRenderClass([__props.days === p.value ? "bg-brand-500 text-white" : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50", "px-4 py-1.5 rounded-lg text-sm font-medium transition-colors cursor-pointer"])}">${ssrInterpolate(p.label)}</button>`);
      });
      _push(`<!--]--></div></div>`);
      if (!__props.configured) {
        _push(`<div class="bg-white rounded-2xl border border-amber-200 p-8 text-center"><div class="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4"><i class="pi pi-cog text-amber-500 text-2xl"></i></div><h2 class="text-lg font-bold text-gray-900 mb-2">Analytics not configured</h2><p class="text-sm text-gray-500 mb-6 max-w-md mx-auto"> To display GA4 data, complete the following steps: </p><ol class="text-sm text-left text-gray-600 space-y-2 max-w-md mx-auto"><li class="flex gap-2"><span class="font-bold text-brand-500">1.</span> Create a Google Service Account and enable the <strong>Google Analytics Data API</strong></li><li class="flex gap-2"><span class="font-bold text-brand-500">2.</span> Grant the service account email <strong>Analyst</strong> access in GA4 property settings</li><li class="flex gap-2"><span class="font-bold text-brand-500">3.</span> Download the JSON key → place at <code class="bg-gray-100 px-1 rounded">storage/app/analytics/service-account-credentials.json</code></li><li class="flex gap-2"><span class="font-bold text-brand-500">4.</span> Add <code class="bg-gray-100 px-1 rounded">ANALYTICS_PROPERTY_ID=your_numeric_id</code> to <code class="bg-gray-100 px-1 rounded">.env</code></li></ol></div>`);
      } else {
        _push(`<!--[-->`);
        _push(ssrRenderComponent(unref(Deferred), { data: ["summary"] }, {
          fallback: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="grid grid-cols-2 lg:grid-cols-4 gap-4"${_scopeId}><!--[-->`);
              ssrRenderList(4, (i) => {
                _push2(`<div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 animate-pulse"${_scopeId}><div class="h-3 bg-gray-200 rounded w-24 mb-3"${_scopeId}></div><div class="h-8 bg-gray-200 rounded w-16"${_scopeId}></div></div>`);
              });
              _push2(`<!--]--></div>`);
            } else {
              return [
                createVNode("div", { class: "grid grid-cols-2 lg:grid-cols-4 gap-4" }, [
                  (openBlock(), createBlock(Fragment, null, renderList(4, (i) => {
                    return createVNode("div", {
                      key: i,
                      class: "bg-white rounded-2xl border border-gray-100 shadow-sm p-5 animate-pulse"
                    }, [
                      createVNode("div", { class: "h-3 bg-gray-200 rounded w-24 mb-3" }),
                      createVNode("div", { class: "h-8 bg-gray-200 rounded w-16" })
                    ]);
                  }), 64))
                ])
              ];
            }
          }),
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="grid grid-cols-2 lg:grid-cols-4 gap-4"${_scopeId}><div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-5"${_scopeId}><p class="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1"${_scopeId}>Active Users</p><p class="text-2xl font-bold text-gray-900"${_scopeId}>${ssrInterpolate(fmt(__props.summary?.activeUsers))}</p></div><div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-5"${_scopeId}><p class="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1"${_scopeId}>Page Views</p><p class="text-2xl font-bold text-gray-900"${_scopeId}>${ssrInterpolate(fmt(__props.summary?.screenPageViews))}</p></div><div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-5"${_scopeId}><p class="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1"${_scopeId}>Sessions</p><p class="text-2xl font-bold text-gray-900"${_scopeId}>${ssrInterpolate(fmt(__props.summary?.sessions))}</p></div><div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-5"${_scopeId}><p class="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1"${_scopeId}>New Users</p><p class="text-2xl font-bold text-gray-900"${_scopeId}>${ssrInterpolate(fmt(__props.summary?.newUsers))}</p></div></div>`);
            } else {
              return [
                createVNode("div", { class: "grid grid-cols-2 lg:grid-cols-4 gap-4" }, [
                  createVNode("div", { class: "bg-white rounded-2xl border border-gray-100 shadow-sm p-5" }, [
                    createVNode("p", { class: "text-xs font-medium text-gray-400 uppercase tracking-wide mb-1" }, "Active Users"),
                    createVNode("p", { class: "text-2xl font-bold text-gray-900" }, toDisplayString(fmt(__props.summary?.activeUsers)), 1)
                  ]),
                  createVNode("div", { class: "bg-white rounded-2xl border border-gray-100 shadow-sm p-5" }, [
                    createVNode("p", { class: "text-xs font-medium text-gray-400 uppercase tracking-wide mb-1" }, "Page Views"),
                    createVNode("p", { class: "text-2xl font-bold text-gray-900" }, toDisplayString(fmt(__props.summary?.screenPageViews)), 1)
                  ]),
                  createVNode("div", { class: "bg-white rounded-2xl border border-gray-100 shadow-sm p-5" }, [
                    createVNode("p", { class: "text-xs font-medium text-gray-400 uppercase tracking-wide mb-1" }, "Sessions"),
                    createVNode("p", { class: "text-2xl font-bold text-gray-900" }, toDisplayString(fmt(__props.summary?.sessions)), 1)
                  ]),
                  createVNode("div", { class: "bg-white rounded-2xl border border-gray-100 shadow-sm p-5" }, [
                    createVNode("p", { class: "text-xs font-medium text-gray-400 uppercase tracking-wide mb-1" }, "New Users"),
                    createVNode("p", { class: "text-2xl font-bold text-gray-900" }, toDisplayString(fmt(__props.summary?.newUsers)), 1)
                  ])
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(unref(Deferred), { data: ["topPages", "userTypes"] }, {
          fallback: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="grid grid-cols-1 lg:grid-cols-3 gap-6"${_scopeId}><div class="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 animate-pulse"${_scopeId}><div class="h-4 bg-gray-200 rounded w-24 mb-4"${_scopeId}></div><!--[-->`);
              ssrRenderList(6, (i) => {
                _push2(`<div class="flex items-center gap-3 px-3 py-2.5"${_scopeId}><div class="h-3 bg-gray-200 rounded w-4 shrink-0"${_scopeId}></div><div class="flex-1 space-y-1.5"${_scopeId}><div class="h-3 bg-gray-200 rounded w-3/4"${_scopeId}></div><div class="h-2.5 bg-gray-100 rounded w-1/2"${_scopeId}></div></div><div class="h-3 bg-gray-200 rounded w-10 shrink-0"${_scopeId}></div></div>`);
              });
              _push2(`<!--]--></div><div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 animate-pulse"${_scopeId}><div class="h-4 bg-gray-200 rounded w-32 mb-4"${_scopeId}></div><!--[-->`);
              ssrRenderList(2, (i) => {
                _push2(`<div class="mb-4"${_scopeId}><div class="flex justify-between mb-1.5"${_scopeId}><div class="h-3 bg-gray-200 rounded w-20"${_scopeId}></div><div class="h-3 bg-gray-200 rounded w-10"${_scopeId}></div></div><div class="h-2 bg-gray-100 rounded-full w-full"${_scopeId}></div></div>`);
              });
              _push2(`<!--]--></div></div>`);
            } else {
              return [
                createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-3 gap-6" }, [
                  createVNode("div", { class: "lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 animate-pulse" }, [
                    createVNode("div", { class: "h-4 bg-gray-200 rounded w-24 mb-4" }),
                    (openBlock(), createBlock(Fragment, null, renderList(6, (i) => {
                      return createVNode("div", {
                        key: i,
                        class: "flex items-center gap-3 px-3 py-2.5"
                      }, [
                        createVNode("div", { class: "h-3 bg-gray-200 rounded w-4 shrink-0" }),
                        createVNode("div", { class: "flex-1 space-y-1.5" }, [
                          createVNode("div", { class: "h-3 bg-gray-200 rounded w-3/4" }),
                          createVNode("div", { class: "h-2.5 bg-gray-100 rounded w-1/2" })
                        ]),
                        createVNode("div", { class: "h-3 bg-gray-200 rounded w-10 shrink-0" })
                      ]);
                    }), 64))
                  ]),
                  createVNode("div", { class: "bg-white rounded-2xl border border-gray-100 shadow-sm p-6 animate-pulse" }, [
                    createVNode("div", { class: "h-4 bg-gray-200 rounded w-32 mb-4" }),
                    (openBlock(), createBlock(Fragment, null, renderList(2, (i) => {
                      return createVNode("div", {
                        key: i,
                        class: "mb-4"
                      }, [
                        createVNode("div", { class: "flex justify-between mb-1.5" }, [
                          createVNode("div", { class: "h-3 bg-gray-200 rounded w-20" }),
                          createVNode("div", { class: "h-3 bg-gray-200 rounded w-10" })
                        ]),
                        createVNode("div", { class: "h-2 bg-gray-100 rounded-full w-full" })
                      ]);
                    }), 64))
                  ])
                ])
              ];
            }
          }),
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="grid grid-cols-1 lg:grid-cols-3 gap-6"${_scopeId}><div class="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6"${_scopeId}><h2 class="text-sm font-bold text-gray-700 mb-4"${_scopeId}>Top Pages</h2>`);
              if (!__props.topPages?.length) {
                _push2(`<div class="text-sm text-gray-400 py-6 text-center"${_scopeId}>No data</div>`);
              } else {
                _push2(`<div class="space-y-1"${_scopeId}><!--[-->`);
                ssrRenderList(__props.topPages, (page, i) => {
                  _push2(`<div class="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-colors"${_scopeId}><span class="text-xs font-bold text-gray-300 w-5 shrink-0"${_scopeId}>${ssrInterpolate(i + 1)}</span><div class="flex-1 min-w-0"${_scopeId}><p class="text-sm font-medium text-gray-800 truncate"${_scopeId}>${ssrInterpolate(page.title)}</p><p class="text-xs text-gray-400 truncate"${_scopeId}>${ssrInterpolate(page.url)}</p></div><div class="text-right shrink-0"${_scopeId}><p class="text-sm font-semibold text-gray-800"${_scopeId}>${ssrInterpolate(fmt(page.views))}</p><p class="text-xs text-gray-400"${_scopeId}>page views</p></div></div>`);
                });
                _push2(`<!--]--></div>`);
              }
              _push2(`</div><div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6"${_scopeId}><h2 class="text-sm font-bold text-gray-700 mb-4"${_scopeId}>New vs Returning</h2>`);
              if (!__props.userTypes?.length) {
                _push2(`<div class="text-sm text-gray-400 py-6 text-center"${_scopeId}>No data</div>`);
              } else {
                _push2(`<div class="space-y-4"${_scopeId}><!--[-->`);
                ssrRenderList(__props.userTypes, (row, i) => {
                  _push2(`<div${_scopeId}><div class="flex justify-between items-center mb-1"${_scopeId}><span class="text-sm text-gray-600 capitalize"${_scopeId}>${ssrInterpolate(row.type)}</span><span class="text-sm font-semibold text-gray-800"${_scopeId}>${ssrInterpolate(fmt(row.users))}</span></div><div class="w-full h-2 bg-gray-100 rounded-full overflow-hidden"${_scopeId}><div class="${ssrRenderClass([i === 0 ? "bg-brand-500" : "bg-brand-200", "h-full rounded-full transition-all duration-500"])}" style="${ssrRenderStyle({ width: totalUsers.value > 0 ? (row.users / totalUsers.value * 100).toFixed(1) + "%" : "0%" })}"${_scopeId}></div></div><p class="text-xs text-gray-400 mt-0.5"${_scopeId}>${ssrInterpolate(totalUsers.value > 0 ? (row.users / totalUsers.value * 100).toFixed(1) : 0)}% </p></div>`);
                });
                _push2(`<!--]--></div>`);
              }
              _push2(`</div></div>`);
            } else {
              return [
                createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-3 gap-6" }, [
                  createVNode("div", { class: "lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6" }, [
                    createVNode("h2", { class: "text-sm font-bold text-gray-700 mb-4" }, "Top Pages"),
                    !__props.topPages?.length ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "text-sm text-gray-400 py-6 text-center"
                    }, "No data")) : (openBlock(), createBlock("div", {
                      key: 1,
                      class: "space-y-1"
                    }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(__props.topPages, (page, i) => {
                        return openBlock(), createBlock("div", {
                          key: i,
                          class: "flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-colors"
                        }, [
                          createVNode("span", { class: "text-xs font-bold text-gray-300 w-5 shrink-0" }, toDisplayString(i + 1), 1),
                          createVNode("div", { class: "flex-1 min-w-0" }, [
                            createVNode("p", { class: "text-sm font-medium text-gray-800 truncate" }, toDisplayString(page.title), 1),
                            createVNode("p", { class: "text-xs text-gray-400 truncate" }, toDisplayString(page.url), 1)
                          ]),
                          createVNode("div", { class: "text-right shrink-0" }, [
                            createVNode("p", { class: "text-sm font-semibold text-gray-800" }, toDisplayString(fmt(page.views)), 1),
                            createVNode("p", { class: "text-xs text-gray-400" }, "page views")
                          ])
                        ]);
                      }), 128))
                    ]))
                  ]),
                  createVNode("div", { class: "bg-white rounded-2xl border border-gray-100 shadow-sm p-6" }, [
                    createVNode("h2", { class: "text-sm font-bold text-gray-700 mb-4" }, "New vs Returning"),
                    !__props.userTypes?.length ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "text-sm text-gray-400 py-6 text-center"
                    }, "No data")) : (openBlock(), createBlock("div", {
                      key: 1,
                      class: "space-y-4"
                    }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(__props.userTypes, (row, i) => {
                        return openBlock(), createBlock("div", { key: i }, [
                          createVNode("div", { class: "flex justify-between items-center mb-1" }, [
                            createVNode("span", { class: "text-sm text-gray-600 capitalize" }, toDisplayString(row.type), 1),
                            createVNode("span", { class: "text-sm font-semibold text-gray-800" }, toDisplayString(fmt(row.users)), 1)
                          ]),
                          createVNode("div", { class: "w-full h-2 bg-gray-100 rounded-full overflow-hidden" }, [
                            createVNode("div", {
                              class: ["h-full rounded-full transition-all duration-500", i === 0 ? "bg-brand-500" : "bg-brand-200"],
                              style: { width: totalUsers.value > 0 ? (row.users / totalUsers.value * 100).toFixed(1) + "%" : "0%" }
                            }, null, 6)
                          ]),
                          createVNode("p", { class: "text-xs text-gray-400 mt-0.5" }, toDisplayString(totalUsers.value > 0 ? (row.users / totalUsers.value * 100).toFixed(1) : 0) + "% ", 1)
                        ]);
                      }), 128))
                    ]))
                  ])
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(unref(Deferred), { data: ["topSearchTerms", "topViewedItems"] }, {
          fallback: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="grid grid-cols-1 lg:grid-cols-2 gap-6"${_scopeId}><!--[-->`);
              ssrRenderList(2, (i) => {
                _push2(`<div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 animate-pulse"${_scopeId}><div class="h-4 bg-gray-200 rounded w-32 mb-4"${_scopeId}></div><!--[-->`);
                ssrRenderList(5, (j) => {
                  _push2(`<div class="flex items-center gap-3 px-3 py-2.5"${_scopeId}><div class="h-3 bg-gray-200 rounded w-4 shrink-0"${_scopeId}></div><div class="flex-1 h-3 bg-gray-200 rounded"${_scopeId}></div><div class="h-3 bg-gray-200 rounded w-8 shrink-0"${_scopeId}></div></div>`);
                });
                _push2(`<!--]--></div>`);
              });
              _push2(`<!--]--></div>`);
            } else {
              return [
                createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-2 gap-6" }, [
                  (openBlock(), createBlock(Fragment, null, renderList(2, (i) => {
                    return createVNode("div", {
                      key: i,
                      class: "bg-white rounded-2xl border border-gray-100 shadow-sm p-6 animate-pulse"
                    }, [
                      createVNode("div", { class: "h-4 bg-gray-200 rounded w-32 mb-4" }),
                      (openBlock(), createBlock(Fragment, null, renderList(5, (j) => {
                        return createVNode("div", {
                          key: j,
                          class: "flex items-center gap-3 px-3 py-2.5"
                        }, [
                          createVNode("div", { class: "h-3 bg-gray-200 rounded w-4 shrink-0" }),
                          createVNode("div", { class: "flex-1 h-3 bg-gray-200 rounded" }),
                          createVNode("div", { class: "h-3 bg-gray-200 rounded w-8 shrink-0" })
                        ]);
                      }), 64))
                    ]);
                  }), 64))
                ])
              ];
            }
          }),
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="grid grid-cols-1 lg:grid-cols-2 gap-6"${_scopeId}><div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6"${_scopeId}><h2 class="text-sm font-bold text-gray-700 mb-4"${_scopeId}>Top Searches</h2>`);
              if (!__props.topSearchTerms?.length) {
                _push2(`<div class="text-sm text-gray-400 py-6 text-center"${_scopeId}>No data</div>`);
              } else {
                _push2(`<div class="space-y-1"${_scopeId}><!--[-->`);
                ssrRenderList(__props.topSearchTerms, (row, i) => {
                  _push2(`<div class="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-colors"${_scopeId}><span class="text-xs font-bold text-gray-300 w-5 shrink-0"${_scopeId}>${ssrInterpolate(i + 1)}</span><p class="flex-1 text-sm font-medium text-gray-800 truncate"${_scopeId}>${ssrInterpolate(row.term)}</p><span class="text-sm font-semibold text-gray-800 shrink-0"${_scopeId}>${ssrInterpolate(fmt(row.count))}</span></div>`);
                });
                _push2(`<!--]--></div>`);
              }
              _push2(`</div><div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6"${_scopeId}><h2 class="text-sm font-bold text-gray-700 mb-4"${_scopeId}>Most Viewed Items</h2>`);
              if (!__props.topViewedItems?.length) {
                _push2(`<div class="text-sm text-gray-400 py-6 text-center"${_scopeId}>No data</div>`);
              } else {
                _push2(`<div class="space-y-1"${_scopeId}><!--[-->`);
                ssrRenderList(__props.topViewedItems, (row, i) => {
                  _push2(`<div class="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-colors"${_scopeId}><span class="text-xs font-bold text-gray-300 w-5 shrink-0"${_scopeId}>${ssrInterpolate(i + 1)}</span><div class="flex-1 min-w-0"${_scopeId}><p class="text-sm font-medium text-gray-800 truncate"${_scopeId}>${ssrInterpolate(row.name)}</p><p class="text-xs text-gray-400"${_scopeId}>ID: ${ssrInterpolate(row.id)}</p></div><span class="text-sm font-semibold text-gray-800 shrink-0"${_scopeId}>${ssrInterpolate(fmt(row.views))}</span></div>`);
                });
                _push2(`<!--]--></div>`);
              }
              _push2(`</div></div>`);
            } else {
              return [
                createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-2 gap-6" }, [
                  createVNode("div", { class: "bg-white rounded-2xl border border-gray-100 shadow-sm p-6" }, [
                    createVNode("h2", { class: "text-sm font-bold text-gray-700 mb-4" }, "Top Searches"),
                    !__props.topSearchTerms?.length ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "text-sm text-gray-400 py-6 text-center"
                    }, "No data")) : (openBlock(), createBlock("div", {
                      key: 1,
                      class: "space-y-1"
                    }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(__props.topSearchTerms, (row, i) => {
                        return openBlock(), createBlock("div", {
                          key: i,
                          class: "flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-colors"
                        }, [
                          createVNode("span", { class: "text-xs font-bold text-gray-300 w-5 shrink-0" }, toDisplayString(i + 1), 1),
                          createVNode("p", { class: "flex-1 text-sm font-medium text-gray-800 truncate" }, toDisplayString(row.term), 1),
                          createVNode("span", { class: "text-sm font-semibold text-gray-800 shrink-0" }, toDisplayString(fmt(row.count)), 1)
                        ]);
                      }), 128))
                    ]))
                  ]),
                  createVNode("div", { class: "bg-white rounded-2xl border border-gray-100 shadow-sm p-6" }, [
                    createVNode("h2", { class: "text-sm font-bold text-gray-700 mb-4" }, "Most Viewed Items"),
                    !__props.topViewedItems?.length ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "text-sm text-gray-400 py-6 text-center"
                    }, "No data")) : (openBlock(), createBlock("div", {
                      key: 1,
                      class: "space-y-1"
                    }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(__props.topViewedItems, (row, i) => {
                        return openBlock(), createBlock("div", {
                          key: i,
                          class: "flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-colors"
                        }, [
                          createVNode("span", { class: "text-xs font-bold text-gray-300 w-5 shrink-0" }, toDisplayString(i + 1), 1),
                          createVNode("div", { class: "flex-1 min-w-0" }, [
                            createVNode("p", { class: "text-sm font-medium text-gray-800 truncate" }, toDisplayString(row.name), 1),
                            createVNode("p", { class: "text-xs text-gray-400" }, "ID: " + toDisplayString(row.id), 1)
                          ]),
                          createVNode("span", { class: "text-sm font-semibold text-gray-800 shrink-0" }, toDisplayString(fmt(row.views)), 1)
                        ]);
                      }), 128))
                    ]))
                  ])
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(unref(Deferred), { data: ["topSoldItems"] }, {
          fallback: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 animate-pulse"${_scopeId}><div class="h-4 bg-gray-200 rounded w-32 mb-4"${_scopeId}></div><!--[-->`);
              ssrRenderList(8, (i) => {
                _push2(`<div class="flex items-center gap-3 px-3 py-2.5"${_scopeId}><div class="h-3 bg-gray-200 rounded w-4 shrink-0"${_scopeId}></div><div class="flex-1 space-y-1.5"${_scopeId}><div class="h-3 bg-gray-200 rounded w-2/3"${_scopeId}></div><div class="h-2.5 bg-gray-100 rounded w-1/3"${_scopeId}></div></div><div class="h-3 bg-gray-200 rounded w-12 shrink-0"${_scopeId}></div><div class="h-3 bg-gray-200 rounded w-16 shrink-0"${_scopeId}></div></div>`);
              });
              _push2(`<!--]--></div>`);
            } else {
              return [
                createVNode("div", { class: "bg-white rounded-2xl border border-gray-100 shadow-sm p-6 animate-pulse" }, [
                  createVNode("div", { class: "h-4 bg-gray-200 rounded w-32 mb-4" }),
                  (openBlock(), createBlock(Fragment, null, renderList(8, (i) => {
                    return createVNode("div", {
                      key: i,
                      class: "flex items-center gap-3 px-3 py-2.5"
                    }, [
                      createVNode("div", { class: "h-3 bg-gray-200 rounded w-4 shrink-0" }),
                      createVNode("div", { class: "flex-1 space-y-1.5" }, [
                        createVNode("div", { class: "h-3 bg-gray-200 rounded w-2/3" }),
                        createVNode("div", { class: "h-2.5 bg-gray-100 rounded w-1/3" })
                      ]),
                      createVNode("div", { class: "h-3 bg-gray-200 rounded w-12 shrink-0" }),
                      createVNode("div", { class: "h-3 bg-gray-200 rounded w-16 shrink-0" })
                    ]);
                  }), 64))
                ])
              ];
            }
          }),
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6"${_scopeId}><h2 class="text-sm font-bold text-gray-700 mb-4"${_scopeId}>Top Sold Items</h2>`);
              if (!__props.topSoldItems?.length) {
                _push2(`<div class="text-sm text-gray-400 py-6 text-center"${_scopeId}>No sales data yet</div>`);
              } else {
                _push2(`<div${_scopeId}><div class="grid grid-cols-[1.5rem_1fr_6rem_7rem] text-xs font-semibold text-gray-400 uppercase tracking-wide px-3 mb-2"${_scopeId}><span${_scopeId}>#</span><span${_scopeId}>Item</span><span class="text-right"${_scopeId}>Units Sold</span><span class="text-right"${_scopeId}>Revenue</span></div><!--[-->`);
                ssrRenderList(__props.topSoldItems, (row, i) => {
                  _push2(`<div class="grid grid-cols-[1.5rem_1fr_6rem_7rem] items-center px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-colors"${_scopeId}><span class="text-xs font-bold text-gray-300"${_scopeId}>${ssrInterpolate(i + 1)}</span><div class="min-w-0"${_scopeId}><p class="text-sm font-medium text-gray-800 truncate"${_scopeId}>${ssrInterpolate(row.name)}</p><p class="text-xs text-gray-400"${_scopeId}>${ssrInterpolate(row.no)}</p></div><p class="text-sm font-semibold text-gray-800 text-right"${_scopeId}>${ssrInterpolate(fmt(row.total_sold))}</p><p class="text-sm font-semibold text-gray-800 text-right"${_scopeId}>${ssrInterpolate(fmt(row.total_revenue))} ₾</p></div>`);
                });
                _push2(`<!--]--></div>`);
              }
              _push2(`</div>`);
            } else {
              return [
                createVNode("div", { class: "bg-white rounded-2xl border border-gray-100 shadow-sm p-6" }, [
                  createVNode("h2", { class: "text-sm font-bold text-gray-700 mb-4" }, "Top Sold Items"),
                  !__props.topSoldItems?.length ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "text-sm text-gray-400 py-6 text-center"
                  }, "No sales data yet")) : (openBlock(), createBlock("div", { key: 1 }, [
                    createVNode("div", { class: "grid grid-cols-[1.5rem_1fr_6rem_7rem] text-xs font-semibold text-gray-400 uppercase tracking-wide px-3 mb-2" }, [
                      createVNode("span", null, "#"),
                      createVNode("span", null, "Item"),
                      createVNode("span", { class: "text-right" }, "Units Sold"),
                      createVNode("span", { class: "text-right" }, "Revenue")
                    ]),
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.topSoldItems, (row, i) => {
                      return openBlock(), createBlock("div", {
                        key: i,
                        class: "grid grid-cols-[1.5rem_1fr_6rem_7rem] items-center px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-colors"
                      }, [
                        createVNode("span", { class: "text-xs font-bold text-gray-300" }, toDisplayString(i + 1), 1),
                        createVNode("div", { class: "min-w-0" }, [
                          createVNode("p", { class: "text-sm font-medium text-gray-800 truncate" }, toDisplayString(row.name), 1),
                          createVNode("p", { class: "text-xs text-gray-400" }, toDisplayString(row.no), 1)
                        ]),
                        createVNode("p", { class: "text-sm font-semibold text-gray-800 text-right" }, toDisplayString(fmt(row.total_sold)), 1),
                        createVNode("p", { class: "text-sm font-semibold text-gray-800 text-right" }, toDisplayString(fmt(row.total_revenue)) + " ₾", 1)
                      ]);
                    }), 128))
                  ]))
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<!--]-->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Analytics/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=Index-DGbLXTPW.js.map
