import { s as script$2 } from "./index-BzRznsIW.js";
import { s as script, a as script$1 } from "./index-dkMbGzYi.js";
import { ref, mergeProps, withCtx, createVNode, toDisplayString, openBlock, createBlock, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderClass, ssrInterpolate, ssrRenderComponent, ssrRenderAttr } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./AdminLayout-ExP25Y1Z.js";
import { usePoll, router } from "@inertiajs/vue3";
import { u as useToast } from "./index-Qb24q4w2.js";
import { u as useConfirm } from "./index-DPwr32It.js";
import { FilterMatchMode } from "@primevue/core/api";
import "@primeuix/utils";
import "@primeuix/utils/object";
import "@primevue/icons/check";
import "@primevue/icons/minus";
import "@primevue/core/baseinput";
import "@primeuix/styles/checkbox";
import "@primevue/core/base/style";
import "@primevue/core/basecomponent";
import "@primeuix/utils/dom";
import "@primevue/core/utils";
import "@primevue/icons/arrowdown";
import "@primevue/icons/arrowup";
import "@primevue/icons/spinner";
import "./index-PXeQwkTt.js";
import "@primeuix/styles/paginator";
import "@primevue/icons/angledoubleleft";
import "./index-BWQ0UkXI.js";
import "@primevue/core/basedirective";
import "@primeuix/styles/ripple";
import "./index-DOeVcSWx.js";
import "@primeuix/utils/zindex";
import "@primevue/icons/blank";
import "@primevue/icons/chevrondown";
import "@primevue/icons/search";
import "@primevue/icons/times";
import "@primeuix/styles/iconfield";
import "./index-BAgOeBfa.js";
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
import "./index-hSjFFc9a.js";
import "@primeuix/styles/badge";
import "@primeuix/styles/button";
import "@primeuix/styles/radiobutton";
import "@primevue/icons/filter";
import "@primevue/icons/filterfill";
import "@primevue/icons/filterslash";
import "@primevue/icons/plus";
import "@primevue/icons/trash";
import "./index-nsBhLTBN.js";
import "@primevue/icons/windowmaximize";
import "@primevue/icons/windowminimize";
import "@primeuix/styled";
import "@primeuix/styles/dialog";
import "@primevue/icons/sortalt";
import "@primevue/icons/sortamountdown";
import "@primevue/icons/sortamountupalt";
import "./index-CBNFSyNW.js";
import "@primeuix/styles/toast";
import "@primevue/icons/exclamationtriangle";
import "@primevue/icons/infocircle";
import "@primevue/icons/timescircle";
import "@vueuse/core";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./index-C3Ts-4IM.js";
import "@primeuix/utils/uuid";
import "@primeuix/styles/tooltip";
import "axios";
import "./QuickViewDialog-8Z0R3wjt.js";
import "./useCart-CIcsIaQl.js";
import "./usePricing-oDne5BPU.js";
import "@primeuix/styles/confirmdialog";
const _sfc_main = /* @__PURE__ */ Object.assign({ layout: _sfc_main$1 }, {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    notifications: Object,
    counts: Object,
    tab: String
  },
  setup(__props) {
    const toast = useToast();
    const confirm = useConfirm();
    usePoll(1e4, {
      only: ["counts"],
      preserveScroll: true,
      preserveState: true
    });
    const filters = ref({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS }
    });
    function toggleCalled(notification) {
      router.patch(route("admin.stock-notifications.toggle-called", notification.id), {}, {
        preserveScroll: true,
        preserveState: true,
        onSuccess: () => {
          const wasCalled = !!notification.called_at;
          toast.add({ severity: "success", summary: wasCalled ? "Unmarked" : "Marked as called", life: 2e3 });
        }
      });
    }
    function deleteNotification(id) {
      confirm.require({
        message: "Are you sure you want to delete this notification?",
        header: "Delete Confirmation",
        icon: "pi pi-trash",
        rejectProps: { label: "Cancel", severity: "secondary", outlined: true },
        acceptProps: { label: "Delete", severity: "danger" },
        accept: () => router.delete(route("admin.stock-notifications.destroy", id), {}, { preserveScroll: true })
      });
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_DataTable = script;
      const _component_Column = script$1;
      const _component_Checkbox = script$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "p-6" }, _attrs))}><div class="flex items-center justify-between mb-6"><div><h1 class="text-xl font-bold text-gray-900">Stock Notifications</h1><p class="text-sm text-gray-500 mt-0.5">Users waiting for products to be restocked</p></div></div><div class="flex gap-2 mb-5"><button class="${ssrRenderClass([__props.tab === "pending" ? "bg-amber-100 text-amber-700" : "bg-gray-100 text-gray-500 hover:bg-gray-200", "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors cursor-pointer"])}"><i class="pi pi-clock text-xs"></i> Pending <span class="${ssrRenderClass([__props.tab === "pending" ? "bg-amber-200 text-amber-800" : "bg-gray-200 text-gray-600", "text-xs font-bold px-1.5 py-0.5 rounded-full"])}">${ssrInterpolate(__props.counts.pending)}</span></button><button class="${ssrRenderClass([__props.tab === "sent" ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-500 hover:bg-gray-200", "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors cursor-pointer"])}"><i class="pi pi-check-circle text-xs"></i> Sent <span class="${ssrRenderClass([__props.tab === "sent" ? "bg-emerald-200 text-emerald-800" : "bg-gray-200 text-gray-600", "text-xs font-bold px-1.5 py-0.5 rounded-full"])}">${ssrInterpolate(__props.counts.sent)}</span></button></div>`);
      _push(ssrRenderComponent(_component_DataTable, {
        value: __props.notifications.data,
        filters: filters.value,
        "onUpdate:filters": ($event) => filters.value = $event,
        globalFilterFields: ["user.name", "user.lastname", "user.phone", "item.no", "item.name"],
        rowClass: (data) => data.called_at ? "bg-amber-50" : null,
        paginator: "",
        rows: 50,
        dataKey: "id",
        class: "text-sm"
      }, {
        empty: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex flex-col items-center justify-center py-12 text-gray-400"${_scopeId}><i class="pi pi-bell text-3xl mb-3"${_scopeId}></i><p class="text-sm"${_scopeId}>No notifications found</p></div>`);
          } else {
            return [
              createVNode("div", { class: "flex flex-col items-center justify-center py-12 text-gray-400" }, [
                createVNode("i", { class: "pi pi-bell text-3xl mb-3" }),
                createVNode("p", { class: "text-sm" }, "No notifications found")
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Column, {
              field: "item.no",
              header: "Item No"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Column, {
              field: "item.name",
              header: "Product"
            }, {
              body: withCtx(({ data }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="text-gray-800"${_scopeId2}>${ssrInterpolate(data.item?.name)}</span>`);
                } else {
                  return [
                    createVNode("span", { class: "text-gray-800" }, toDisplayString(data.item?.name), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Column, { header: "Customer" }, {
              body: withCtx(({ data }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="font-medium text-gray-800"${_scopeId2}>${ssrInterpolate(data.user?.name)} ${ssrInterpolate(data.user?.lastname)}</span>`);
                } else {
                  return [
                    createVNode("span", { class: "font-medium text-gray-800" }, toDisplayString(data.user?.name) + " " + toDisplayString(data.user?.lastname), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Column, {
              field: "user.phone",
              header: "Phone"
            }, {
              body: withCtx(({ data }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<a${ssrRenderAttr("href", `tel:${data.user?.phone}`)} class="text-brand-500 hover:underline"${_scopeId2}>${ssrInterpolate(data.user?.phone)}</a>`);
                } else {
                  return [
                    createVNode("a", {
                      href: `tel:${data.user?.phone}`,
                      class: "text-brand-500 hover:underline"
                    }, toDisplayString(data.user?.phone), 9, ["href"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Column, {
              field: "created_at",
              header: "Date",
              style: { "min-width": "7rem" }
            }, {
              body: withCtx(({ data }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="text-gray-500"${_scopeId2}>${ssrInterpolate(data.created_at)}</span>`);
                } else {
                  return [
                    createVNode("span", { class: "text-gray-500" }, toDisplayString(data.created_at), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            if (__props.tab === "sent") {
              _push2(ssrRenderComponent(_component_Column, {
                field: "notified_at",
                header: "Notified At",
                style: { "min-width": "10rem" }
              }, {
                body: withCtx(({ data }, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<span class="text-gray-500"${_scopeId2}>${ssrInterpolate(data.notified_at)}</span>`);
                  } else {
                    return [
                      createVNode("span", { class: "text-gray-500" }, toDisplayString(data.notified_at), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            if (__props.tab === "sent") {
              _push2(ssrRenderComponent(_component_Column, {
                header: "Called",
                style: { "width": "10rem" }
              }, {
                body: withCtx(({ data }, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="flex items-center gap-2"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_Checkbox, {
                      modelValue: !!data.called_at,
                      binary: "",
                      onChange: ($event) => toggleCalled(data)
                    }, null, _parent3, _scopeId2));
                    if (data.called_at) {
                      _push3(`<span class="text-gray-400"${_scopeId2}>${ssrInterpolate(data.called_at)}</span>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`</div>`);
                  } else {
                    return [
                      createVNode("div", { class: "flex items-center gap-2" }, [
                        createVNode(_component_Checkbox, {
                          modelValue: !!data.called_at,
                          binary: "",
                          onChange: ($event) => toggleCalled(data)
                        }, null, 8, ["modelValue", "onChange"]),
                        data.called_at ? (openBlock(), createBlock("span", {
                          key: 0,
                          class: "text-gray-400"
                        }, toDisplayString(data.called_at), 1)) : createCommentVNode("", true)
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            if (__props.tab === "sent") {
              _push2(ssrRenderComponent(_component_Column, { header: "" }, {
                body: withCtx(({ data }, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<button class="w-8 h-8 flex items-center justify-center rounded-lg text-gray-300 hover:text-red-500 hover:bg-red-50 transition-colors cursor-pointer"${_scopeId2}><i class="pi pi-trash text-sm"${_scopeId2}></i></button>`);
                  } else {
                    return [
                      createVNode("button", {
                        onClick: ($event) => deleteNotification(data.id),
                        class: "w-8 h-8 flex items-center justify-center rounded-lg text-gray-300 hover:text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
                      }, [
                        createVNode("i", { class: "pi pi-trash text-sm" })
                      ], 8, ["onClick"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode(_component_Column, {
                field: "item.no",
                header: "Item No"
              }),
              createVNode(_component_Column, {
                field: "item.name",
                header: "Product"
              }, {
                body: withCtx(({ data }) => [
                  createVNode("span", { class: "text-gray-800" }, toDisplayString(data.item?.name), 1)
                ]),
                _: 1
              }),
              createVNode(_component_Column, { header: "Customer" }, {
                body: withCtx(({ data }) => [
                  createVNode("span", { class: "font-medium text-gray-800" }, toDisplayString(data.user?.name) + " " + toDisplayString(data.user?.lastname), 1)
                ]),
                _: 1
              }),
              createVNode(_component_Column, {
                field: "user.phone",
                header: "Phone"
              }, {
                body: withCtx(({ data }) => [
                  createVNode("a", {
                    href: `tel:${data.user?.phone}`,
                    class: "text-brand-500 hover:underline"
                  }, toDisplayString(data.user?.phone), 9, ["href"])
                ]),
                _: 1
              }),
              createVNode(_component_Column, {
                field: "created_at",
                header: "Date",
                style: { "min-width": "7rem" }
              }, {
                body: withCtx(({ data }) => [
                  createVNode("span", { class: "text-gray-500" }, toDisplayString(data.created_at), 1)
                ]),
                _: 1
              }),
              __props.tab === "sent" ? (openBlock(), createBlock(_component_Column, {
                key: 0,
                field: "notified_at",
                header: "Notified At",
                style: { "min-width": "10rem" }
              }, {
                body: withCtx(({ data }) => [
                  createVNode("span", { class: "text-gray-500" }, toDisplayString(data.notified_at), 1)
                ]),
                _: 1
              })) : createCommentVNode("", true),
              __props.tab === "sent" ? (openBlock(), createBlock(_component_Column, {
                key: 1,
                header: "Called",
                style: { "width": "10rem" }
              }, {
                body: withCtx(({ data }) => [
                  createVNode("div", { class: "flex items-center gap-2" }, [
                    createVNode(_component_Checkbox, {
                      modelValue: !!data.called_at,
                      binary: "",
                      onChange: ($event) => toggleCalled(data)
                    }, null, 8, ["modelValue", "onChange"]),
                    data.called_at ? (openBlock(), createBlock("span", {
                      key: 0,
                      class: "text-gray-400"
                    }, toDisplayString(data.called_at), 1)) : createCommentVNode("", true)
                  ])
                ]),
                _: 1
              })) : createCommentVNode("", true),
              __props.tab === "sent" ? (openBlock(), createBlock(_component_Column, {
                key: 2,
                header: ""
              }, {
                body: withCtx(({ data }) => [
                  createVNode("button", {
                    onClick: ($event) => deleteNotification(data.id),
                    class: "w-8 h-8 flex items-center justify-center rounded-lg text-gray-300 hover:text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
                  }, [
                    createVNode("i", { class: "pi pi-trash text-sm" })
                  ], 8, ["onClick"])
                ]),
                _: 1
              })) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/StockNotifications/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=Index-Bgi2i0Vi.js.map
