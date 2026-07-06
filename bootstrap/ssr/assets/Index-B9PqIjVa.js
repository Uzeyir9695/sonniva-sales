import { s as script$2, a as script$3 } from "./index-dkMbGzYi.js";
import { s as script$4 } from "./index-hSjFFc9a.js";
import { s as script$1 } from "./index-nsBhLTBN.js";
import { _ as _sfc_main$1, s as script } from "./AdminLayout-QoOVhvy2.js";
import { computed, ref, withCtx, createVNode, unref, createTextVNode, toDisplayString, openBlock, createBlock, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { u as useConfirm } from "./index-DPwr32It.js";
import { u as useToast } from "./index-Qb24q4w2.js";
import { usePage, Deferred, router } from "@inertiajs/vue3";
import { _ as _sfc_main$4 } from "./TableSkeleton-jtC7qFHK.js";
import { FilterMatchMode } from "@primevue/core/api";
import _sfc_main$2 from "./Index-DwVltn9W.js";
import _sfc_main$3 from "./PrimeInputText-BlIRrCdA.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "@primevue/core/basecomponent";
import "@primevue/core/base/style";
import "@primeuix/utils";
import "@primeuix/utils/dom";
import "@primeuix/utils/object";
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
import "@primeuix/styles/badge";
import "@primeuix/styles/button";
import "@primevue/icons/windowmaximize";
import "@primevue/icons/windowminimize";
import "@primeuix/styled";
import "@primeuix/styles/dialog";
import "./index-4zsKlwzs.js";
import "@primeuix/styles/toast";
import "@primevue/icons/exclamationtriangle";
import "@primevue/icons/infocircle";
import "@primevue/icons/timescircle";
import "@vueuse/core";
import "./index-C3Ts-4IM.js";
import "@primeuix/utils/uuid";
import "@primeuix/styles/tooltip";
import "axios";
import "./QuickViewDialog--IPmfhAf.js";
import "./useCart-CIcsIaQl.js";
import "./usePricing-HxfzG07E.js";
import "@primeuix/styles/confirmdialog";
import "./index-CvFud99G.js";
import "@primeuix/styles/skeleton";
import "./index-1kO8dZCM.js";
import "@primeuix/styles/floatlabel";
import "./index-D2Co7MqO.js";
import "@primeuix/styles/message";
import "./index-CYNLBuLC.js";
import "./index-CwYp4h2j.js";
import "@primevue/icons/chevronleft";
import "@primeuix/styles/tabs";
import "./UpdatePassword-DcDu14nr.js";
import "./index-o6MKZAXO.js";
import "@primevue/icons/eye";
import "@primevue/icons/eyeslash";
import "@primeuix/styles/password";
const _sfc_main = /* @__PURE__ */ Object.assign({ layout: _sfc_main$1 }, {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    users: Array,
    usersCount: Number,
    onlineUsers: Number
  },
  setup(__props) {
    const confirm = useConfirm();
    const toast = useToast();
    const isAdmin = computed(() => usePage().props.isAdmin);
    const user = ref(null);
    const visible = ref(false);
    ref(true);
    ref(null);
    const dt = ref();
    const exportCSV = () => {
      dt.value.exportCSV();
    };
    function deleteUser(id) {
      confirm.require({
        message: "Do you want to delete this user?",
        header: "Confirmation",
        icon: "pi pi-info-circle",
        rejectLabel: "Cancel",
        rejectProps: {
          label: "Cancel",
          severity: "secondary",
          outlined: true
        },
        acceptProps: {
          label: "Delete",
          severity: "danger"
        },
        accept: () => {
          router.delete(route("admin.users.delete", id), {
            onSuccess: (res) => toast.add({ severity: "success", summary: "Confirmed", detail: res.props.flash.message, life: 3e3 }),
            onError: () => toast.add({ severity: "danger", summary: "Error", detail: "Something went wrong, please try again.", life: 3e3 })
          });
        },
        reject: () => {
        }
      });
    }
    async function editUser(id) {
      await axios(route("admin.users.get-user", id)).then((res) => {
        user.value = res.data.user;
        visible.value = true;
      }).catch((error) => {
        console.log(error.response.data);
      });
    }
    function userProfileUpdated(status) {
      visible.value = false;
      if (status === 200) {
        toast.add({ severity: "success", summary: "Confirmed", detail: "User profile updated successfully", life: 3e3 });
      }
      if (status === 422) {
        toast.add({ severity: "danger", summary: "Error", detail: "Something went wrong", life: 3e3 });
      }
    }
    const filters = ref({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      tax_id: { value: null, matchMode: FilterMatchMode.EQUALS },
      name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      phone: { value: null, matchMode: FilterMatchMode.CONTAINS },
      created_at: { value: null, matchMode: FilterMatchMode.EQUALS }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ConfirmDialog = script;
      const _component_Dialog = script$1;
      const _component_DataTable = script$2;
      const _component_Button = script$4;
      const _component_Column = script$3;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_ConfirmDialog, null, null, _parent));
      _push(ssrRenderComponent(_component_Dialog, {
        visible: visible.value,
        "onUpdate:visible": ($event) => visible.value = $event,
        modal: "",
        header: "Edit user",
        class: "w-[90%] sm:w-[60%]",
        "pt:mask:class": "backdrop-blur-sm"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$2, {
              user: user.value,
              errors: [],
              "editing-by-admin": true,
              onCloseEditor: userProfileUpdated
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$2, {
                user: user.value,
                errors: [],
                "editing-by-admin": true,
                onCloseEditor: userProfileUpdated
              }, null, 8, ["user"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(Deferred), { data: "users" }, {
        fallback: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="p-4" data-v-265135f6${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$4, null, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "p-4" }, [
                createVNode(_sfc_main$4)
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (__props.users.length > 0) {
              _push2(`<div class="rounded-xl overflow-hidden" data-v-265135f6${_scopeId}>`);
              _push2(ssrRenderComponent(_component_DataTable, {
                filters: filters.value,
                "onUpdate:filters": ($event) => filters.value = $event,
                filterDisplay: "row",
                globalFilterFields: ["tax_id", "name", "phone"],
                value: __props.users,
                paginator: "",
                rows: 15,
                rowsPerPageOptions: [5, 10, 15, 20, 50],
                dataKey: "id",
                tableStyle: "min-width: 50rem",
                ref_key: "dt",
                ref: dt,
                class: "text-sm"
              }, {
                header: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="flex justify-between" data-v-265135f6${_scopeId2}><div class="flex flex-wrap items-center justify-between gap-2" data-v-265135f6${_scopeId2}><div data-v-265135f6${_scopeId2}><h2 class="text-lg font-semibold text-gray-900" data-v-265135f6${_scopeId2}>${ssrInterpolate(__props.usersCount)} Users</h2></div><h1 class="text-lg text-green-500" data-v-265135f6${_scopeId2}>- ${ssrInterpolate(__props.onlineUsers)} Online</h1></div><div class="flex items-center gap-3" data-v-265135f6${_scopeId2}><div class="text-end" data-v-265135f6${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_Button, {
                      icon: "pi pi-file-export",
                      size: "small",
                      label: "Export",
                      onClick: ($event) => exportCSV()
                    }, null, _parent3, _scopeId2));
                    _push3(`</div></div></div>`);
                  } else {
                    return [
                      createVNode("div", { class: "flex justify-between" }, [
                        createVNode("div", { class: "flex flex-wrap items-center justify-between gap-2" }, [
                          createVNode("div", null, [
                            createVNode("h2", { class: "text-lg font-semibold text-gray-900" }, toDisplayString(__props.usersCount) + " Users", 1)
                          ]),
                          createVNode("h1", { class: "text-lg text-green-500" }, "- " + toDisplayString(__props.onlineUsers) + " Online", 1)
                        ]),
                        createVNode("div", { class: "flex items-center gap-3" }, [
                          createVNode("div", { class: "text-end" }, [
                            createVNode(_component_Button, {
                              icon: "pi pi-file-export",
                              size: "small",
                              label: "Export",
                              onClick: ($event) => exportCSV()
                            }, null, 8, ["onClick"])
                          ])
                        ])
                      ])
                    ];
                  }
                }),
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_Column, {
                      header: "#",
                      headerStyle: "width:3rem"
                    }, {
                      body: withCtx((slotProps, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(slotProps.index + 1)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(slotProps.index + 1), 1)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_Column, {
                      field: "name",
                      header: "Full Name",
                      style: { "min-width": "11rem" }
                    }, {
                      body: withCtx(({ data }, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(data.name)} ${ssrInterpolate(data.lastname ?? "")}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(data.name) + " " + toDisplayString(data.lastname ?? ""), 1)
                          ];
                        }
                      }),
                      filter: withCtx(({ filterModel, filterCallback }, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_sfc_main$3, {
                            modelValue: filterModel.value,
                            "onUpdate:modelValue": ($event) => filterModel.value = $event,
                            type: "text",
                            size: "small",
                            class: "text-sm",
                            fluid: "",
                            onInput: ($event) => filterCallback(),
                            placeholder: "Search name"
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_sfc_main$3, {
                              modelValue: filterModel.value,
                              "onUpdate:modelValue": ($event) => filterModel.value = $event,
                              type: "text",
                              size: "small",
                              class: "text-sm",
                              fluid: "",
                              onInput: ($event) => filterCallback(),
                              placeholder: "Search name"
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "onInput"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_Column, {
                      field: "tax_id",
                      header: "User ID",
                      style: { "min-width": "10rem" }
                    }, {
                      body: withCtx(({ data }, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(data.tax_id)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(data.tax_id), 1)
                          ];
                        }
                      }),
                      filter: withCtx(({ filterModel, filterCallback }, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_sfc_main$3, {
                            modelValue: filterModel.value,
                            "onUpdate:modelValue": ($event) => filterModel.value = $event,
                            type: "text",
                            size: "small",
                            class: "text-sm",
                            fluid: "",
                            onInput: ($event) => filterCallback(),
                            placeholder: "Search ID"
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_sfc_main$3, {
                              modelValue: filterModel.value,
                              "onUpdate:modelValue": ($event) => filterModel.value = $event,
                              type: "text",
                              size: "small",
                              class: "text-sm",
                              fluid: "",
                              onInput: ($event) => filterCallback(),
                              placeholder: "Search ID"
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "onInput"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_Column, {
                      field: "phone",
                      header: "Phone",
                      style: { "min-width": "11rem" }
                    }, {
                      body: withCtx(({ data }, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(data.phone)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(data.phone), 1)
                          ];
                        }
                      }),
                      filter: withCtx(({ filterModel, filterCallback }, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_sfc_main$3, {
                            modelValue: filterModel.value,
                            "onUpdate:modelValue": ($event) => filterModel.value = $event,
                            type: "text",
                            size: "small",
                            class: "text-sm",
                            fluid: "",
                            onInput: ($event) => filterCallback(),
                            placeholder: "Search phone"
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_sfc_main$3, {
                              modelValue: filterModel.value,
                              "onUpdate:modelValue": ($event) => filterModel.value = $event,
                              type: "text",
                              size: "small",
                              class: "text-sm",
                              fluid: "",
                              onInput: ($event) => filterCallback(),
                              placeholder: "Search phone"
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "onInput"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_Column, {
                      field: "paid_orders_count",
                      header: "Paid Orders"
                    }, {
                      footer: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<div class="space-x-1 inline-block mb-6" data-v-265135f6${_scopeId3}><i class="pi pi-calculator text-sm" data-v-265135f6${_scopeId3}></i><span class="font-semibold text-gray-500" data-v-265135f6${_scopeId3}>Totals</span><div class="font-semibold text-blue-500" data-v-265135f6${_scopeId3}>${ssrInterpolate(_ctx.$formatNumber(
                            __props.users.reduce((acc, user2) => acc + user2.paid_orders_count, 0)
                          ))}</div></div>`);
                        } else {
                          return [
                            createVNode("div", { class: "space-x-1 inline-block mb-6" }, [
                              createVNode("i", { class: "pi pi-calculator text-sm" }),
                              createVNode("span", { class: "font-semibold text-gray-500" }, "Totals"),
                              createVNode("div", { class: "font-semibold text-blue-500" }, toDisplayString(_ctx.$formatNumber(
                                __props.users.reduce((acc, user2) => acc + user2.paid_orders_count, 0)
                              )), 1)
                            ])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_Column, {
                      field: "is_handyman",
                      header: "Handyman"
                    }, {
                      body: withCtx(({ data }, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<span data-v-265135f6${_scopeId3}>${ssrInterpolate(data.is_handyman ? "Yes" : "No")}</span>`);
                        } else {
                          return [
                            createVNode("span", null, toDisplayString(data.is_handyman ? "Yes" : "No"), 1)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_Column, {
                      field: "created_at",
                      header: "Joined",
                      style: { "min-width": "7rem" }
                    }, null, _parent3, _scopeId2));
                    if (isAdmin.value) {
                      _push3(ssrRenderComponent(_component_Column, { header: "Actions" }, {
                        body: withCtx((slotProps, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`<div class="flex gap-2" data-v-265135f6${_scopeId3}>`);
                            _push4(ssrRenderComponent(_component_Button, {
                              onClick: ($event) => editUser(slotProps.data.id),
                              icon: "pi pi-user-edit",
                              severity: "info",
                              size: "small",
                              variant: "text",
                              raised: "",
                              rounded: "",
                              "aria-label": "Edit"
                            }, null, _parent4, _scopeId3));
                            _push4(ssrRenderComponent(_component_Button, {
                              onClick: ($event) => deleteUser(slotProps.data.id),
                              icon: "pi pi-trash",
                              severity: "danger",
                              size: "small",
                              variant: "text",
                              raised: "",
                              rounded: "",
                              "aria-label": "Delete"
                            }, null, _parent4, _scopeId3));
                            _push4(`</div>`);
                          } else {
                            return [
                              createVNode("div", { class: "flex gap-2" }, [
                                createVNode(_component_Button, {
                                  onClick: ($event) => editUser(slotProps.data.id),
                                  icon: "pi pi-user-edit",
                                  severity: "info",
                                  size: "small",
                                  variant: "text",
                                  raised: "",
                                  rounded: "",
                                  "aria-label": "Edit"
                                }, null, 8, ["onClick"]),
                                createVNode(_component_Button, {
                                  onClick: ($event) => deleteUser(slotProps.data.id),
                                  icon: "pi pi-trash",
                                  severity: "danger",
                                  size: "small",
                                  variant: "text",
                                  raised: "",
                                  rounded: "",
                                  "aria-label": "Delete"
                                }, null, 8, ["onClick"])
                              ])
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                    } else {
                      _push3(`<!---->`);
                    }
                  } else {
                    return [
                      createVNode(_component_Column, {
                        header: "#",
                        headerStyle: "width:3rem"
                      }, {
                        body: withCtx((slotProps) => [
                          createTextVNode(toDisplayString(slotProps.index + 1), 1)
                        ]),
                        _: 1
                      }),
                      createVNode(_component_Column, {
                        field: "name",
                        header: "Full Name",
                        style: { "min-width": "11rem" }
                      }, {
                        body: withCtx(({ data }) => [
                          createTextVNode(toDisplayString(data.name) + " " + toDisplayString(data.lastname ?? ""), 1)
                        ]),
                        filter: withCtx(({ filterModel, filterCallback }) => [
                          createVNode(_sfc_main$3, {
                            modelValue: filterModel.value,
                            "onUpdate:modelValue": ($event) => filterModel.value = $event,
                            type: "text",
                            size: "small",
                            class: "text-sm",
                            fluid: "",
                            onInput: ($event) => filterCallback(),
                            placeholder: "Search name"
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "onInput"])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_Column, {
                        field: "tax_id",
                        header: "User ID",
                        style: { "min-width": "10rem" }
                      }, {
                        body: withCtx(({ data }) => [
                          createTextVNode(toDisplayString(data.tax_id), 1)
                        ]),
                        filter: withCtx(({ filterModel, filterCallback }) => [
                          createVNode(_sfc_main$3, {
                            modelValue: filterModel.value,
                            "onUpdate:modelValue": ($event) => filterModel.value = $event,
                            type: "text",
                            size: "small",
                            class: "text-sm",
                            fluid: "",
                            onInput: ($event) => filterCallback(),
                            placeholder: "Search ID"
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "onInput"])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_Column, {
                        field: "phone",
                        header: "Phone",
                        style: { "min-width": "11rem" }
                      }, {
                        body: withCtx(({ data }) => [
                          createTextVNode(toDisplayString(data.phone), 1)
                        ]),
                        filter: withCtx(({ filterModel, filterCallback }) => [
                          createVNode(_sfc_main$3, {
                            modelValue: filterModel.value,
                            "onUpdate:modelValue": ($event) => filterModel.value = $event,
                            type: "text",
                            size: "small",
                            class: "text-sm",
                            fluid: "",
                            onInput: ($event) => filterCallback(),
                            placeholder: "Search phone"
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "onInput"])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_Column, {
                        field: "paid_orders_count",
                        header: "Paid Orders"
                      }, {
                        footer: withCtx(() => [
                          createVNode("div", { class: "space-x-1 inline-block mb-6" }, [
                            createVNode("i", { class: "pi pi-calculator text-sm" }),
                            createVNode("span", { class: "font-semibold text-gray-500" }, "Totals"),
                            createVNode("div", { class: "font-semibold text-blue-500" }, toDisplayString(_ctx.$formatNumber(
                              __props.users.reduce((acc, user2) => acc + user2.paid_orders_count, 0)
                            )), 1)
                          ])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_Column, {
                        field: "is_handyman",
                        header: "Handyman"
                      }, {
                        body: withCtx(({ data }) => [
                          createVNode("span", null, toDisplayString(data.is_handyman ? "Yes" : "No"), 1)
                        ]),
                        _: 1
                      }),
                      createVNode(_component_Column, {
                        field: "created_at",
                        header: "Joined",
                        style: { "min-width": "7rem" }
                      }),
                      isAdmin.value ? (openBlock(), createBlock(_component_Column, {
                        key: 0,
                        header: "Actions"
                      }, {
                        body: withCtx((slotProps) => [
                          createVNode("div", { class: "flex gap-2" }, [
                            createVNode(_component_Button, {
                              onClick: ($event) => editUser(slotProps.data.id),
                              icon: "pi pi-user-edit",
                              severity: "info",
                              size: "small",
                              variant: "text",
                              raised: "",
                              rounded: "",
                              "aria-label": "Edit"
                            }, null, 8, ["onClick"]),
                            createVNode(_component_Button, {
                              onClick: ($event) => deleteUser(slotProps.data.id),
                              icon: "pi pi-trash",
                              severity: "danger",
                              size: "small",
                              variant: "text",
                              raised: "",
                              rounded: "",
                              "aria-label": "Delete"
                            }, null, 8, ["onClick"])
                          ])
                        ]),
                        _: 1
                      })) : createCommentVNode("", true)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<div class="flex flex-col items-center justify-center h-64" data-v-265135f6${_scopeId}><i class="pi pi-users text-6xl text-gray-400 mb-4" data-v-265135f6${_scopeId}></i><h3 class="text-xl text-gray-600" data-v-265135f6${_scopeId}>No users found.</h3></div>`);
            }
          } else {
            return [
              __props.users.length > 0 ? (openBlock(), createBlock("div", {
                key: 0,
                class: "rounded-xl overflow-hidden"
              }, [
                createVNode(_component_DataTable, {
                  filters: filters.value,
                  "onUpdate:filters": ($event) => filters.value = $event,
                  filterDisplay: "row",
                  globalFilterFields: ["tax_id", "name", "phone"],
                  value: __props.users,
                  paginator: "",
                  rows: 15,
                  rowsPerPageOptions: [5, 10, 15, 20, 50],
                  dataKey: "id",
                  tableStyle: "min-width: 50rem",
                  ref_key: "dt",
                  ref: dt,
                  class: "text-sm"
                }, {
                  header: withCtx(() => [
                    createVNode("div", { class: "flex justify-between" }, [
                      createVNode("div", { class: "flex flex-wrap items-center justify-between gap-2" }, [
                        createVNode("div", null, [
                          createVNode("h2", { class: "text-lg font-semibold text-gray-900" }, toDisplayString(__props.usersCount) + " Users", 1)
                        ]),
                        createVNode("h1", { class: "text-lg text-green-500" }, "- " + toDisplayString(__props.onlineUsers) + " Online", 1)
                      ]),
                      createVNode("div", { class: "flex items-center gap-3" }, [
                        createVNode("div", { class: "text-end" }, [
                          createVNode(_component_Button, {
                            icon: "pi pi-file-export",
                            size: "small",
                            label: "Export",
                            onClick: ($event) => exportCSV()
                          }, null, 8, ["onClick"])
                        ])
                      ])
                    ])
                  ]),
                  default: withCtx(() => [
                    createVNode(_component_Column, {
                      header: "#",
                      headerStyle: "width:3rem"
                    }, {
                      body: withCtx((slotProps) => [
                        createTextVNode(toDisplayString(slotProps.index + 1), 1)
                      ]),
                      _: 1
                    }),
                    createVNode(_component_Column, {
                      field: "name",
                      header: "Full Name",
                      style: { "min-width": "11rem" }
                    }, {
                      body: withCtx(({ data }) => [
                        createTextVNode(toDisplayString(data.name) + " " + toDisplayString(data.lastname ?? ""), 1)
                      ]),
                      filter: withCtx(({ filterModel, filterCallback }) => [
                        createVNode(_sfc_main$3, {
                          modelValue: filterModel.value,
                          "onUpdate:modelValue": ($event) => filterModel.value = $event,
                          type: "text",
                          size: "small",
                          class: "text-sm",
                          fluid: "",
                          onInput: ($event) => filterCallback(),
                          placeholder: "Search name"
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "onInput"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_Column, {
                      field: "tax_id",
                      header: "User ID",
                      style: { "min-width": "10rem" }
                    }, {
                      body: withCtx(({ data }) => [
                        createTextVNode(toDisplayString(data.tax_id), 1)
                      ]),
                      filter: withCtx(({ filterModel, filterCallback }) => [
                        createVNode(_sfc_main$3, {
                          modelValue: filterModel.value,
                          "onUpdate:modelValue": ($event) => filterModel.value = $event,
                          type: "text",
                          size: "small",
                          class: "text-sm",
                          fluid: "",
                          onInput: ($event) => filterCallback(),
                          placeholder: "Search ID"
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "onInput"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_Column, {
                      field: "phone",
                      header: "Phone",
                      style: { "min-width": "11rem" }
                    }, {
                      body: withCtx(({ data }) => [
                        createTextVNode(toDisplayString(data.phone), 1)
                      ]),
                      filter: withCtx(({ filterModel, filterCallback }) => [
                        createVNode(_sfc_main$3, {
                          modelValue: filterModel.value,
                          "onUpdate:modelValue": ($event) => filterModel.value = $event,
                          type: "text",
                          size: "small",
                          class: "text-sm",
                          fluid: "",
                          onInput: ($event) => filterCallback(),
                          placeholder: "Search phone"
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "onInput"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_Column, {
                      field: "paid_orders_count",
                      header: "Paid Orders"
                    }, {
                      footer: withCtx(() => [
                        createVNode("div", { class: "space-x-1 inline-block mb-6" }, [
                          createVNode("i", { class: "pi pi-calculator text-sm" }),
                          createVNode("span", { class: "font-semibold text-gray-500" }, "Totals"),
                          createVNode("div", { class: "font-semibold text-blue-500" }, toDisplayString(_ctx.$formatNumber(
                            __props.users.reduce((acc, user2) => acc + user2.paid_orders_count, 0)
                          )), 1)
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_Column, {
                      field: "is_handyman",
                      header: "Handyman"
                    }, {
                      body: withCtx(({ data }) => [
                        createVNode("span", null, toDisplayString(data.is_handyman ? "Yes" : "No"), 1)
                      ]),
                      _: 1
                    }),
                    createVNode(_component_Column, {
                      field: "created_at",
                      header: "Joined",
                      style: { "min-width": "7rem" }
                    }),
                    isAdmin.value ? (openBlock(), createBlock(_component_Column, {
                      key: 0,
                      header: "Actions"
                    }, {
                      body: withCtx((slotProps) => [
                        createVNode("div", { class: "flex gap-2" }, [
                          createVNode(_component_Button, {
                            onClick: ($event) => editUser(slotProps.data.id),
                            icon: "pi pi-user-edit",
                            severity: "info",
                            size: "small",
                            variant: "text",
                            raised: "",
                            rounded: "",
                            "aria-label": "Edit"
                          }, null, 8, ["onClick"]),
                          createVNode(_component_Button, {
                            onClick: ($event) => deleteUser(slotProps.data.id),
                            icon: "pi pi-trash",
                            severity: "danger",
                            size: "small",
                            variant: "text",
                            raised: "",
                            rounded: "",
                            "aria-label": "Delete"
                          }, null, 8, ["onClick"])
                        ])
                      ]),
                      _: 1
                    })) : createCommentVNode("", true)
                  ]),
                  _: 1
                }, 8, ["filters", "onUpdate:filters", "value"])
              ])) : (openBlock(), createBlock("div", {
                key: 1,
                class: "flex flex-col items-center justify-center h-64"
              }, [
                createVNode("i", { class: "pi pi-users text-6xl text-gray-400 mb-4" }),
                createVNode("h3", { class: "text-xl text-gray-600" }, "No users found.")
              ]))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/users/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-265135f6"]]);
export {
  Index as default
};
//# sourceMappingURL=Index-B9PqIjVa.js.map
