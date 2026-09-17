import { K as KeyFilter } from "./index-CpR3PScz.js";
import { s as script$7 } from "./index-YvTnrAwi.js";
import { s as script$6 } from "./index-o6MKZAXO.js";
import { s as script$5 } from "./index-BAgOeBfa.js";
import { s as script$4 } from "./index-1kO8dZCM.js";
import { s as script$2, a as script$3 } from "./index-Dc7gNevf.js";
import { s as script$1 } from "./index-BzRznsIW.js";
import { s as script } from "./index-UirhM5w0.js";
import { computed, ref, unref, withCtx, createVNode, toDisplayString, mergeProps, withDirectives, createTextVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrGetDirectiveProps } from "vue/server-renderer";
import { usePage, useForm, Head, Link } from "@inertiajs/vue3";
import { u as useI18n } from "./vue-i18n-BupjJCJv.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import { s as script$8 } from "./index-DpW3Btd2.js";
import "@primeuix/utils/dom";
import "@primevue/core/basedirective";
import "@primevue/core/base/style";
import "@primeuix/utils";
import "@primeuix/utils/object";
import "@primevue/icons/spinner";
import "@primevue/core/basecomponent";
import "@primeuix/styles/badge";
import "@primeuix/styles/ripple";
import "@primeuix/styles/button";
import "@primeuix/utils/zindex";
import "@primevue/core/utils";
import "@primevue/icons/eye";
import "@primevue/icons/eyeslash";
import "@primevue/icons/times";
import "./index-rAVNvoJo.js";
import "@primeuix/utils/eventbus";
import "./index-zZrFrjQS.js";
import "@primevue/core/baseinput";
import "@primeuix/styles/password";
import "@primeuix/styles/inputtext";
import "@primeuix/styles/floatlabel";
import "@primeuix/styles/inputgroup";
import "@primevue/icons/check";
import "@primevue/icons/minus";
import "@primeuix/styles/checkbox";
import "@primevue/core/baseeditableholder";
import "@primeuix/styles/togglebutton";
import "@primeuix/styles/selectbutton";
import "@primeuix/styles/divider";
const _sfc_main = {
  __name: "Register",
  __ssrInlineRender: true,
  props: ["errors"],
  setup(__props) {
    const { t } = useI18n();
    const page = usePage();
    page.props.recaptcha_site_key;
    const userTypes = computed(() => [
      { key: "individual", value: t("auth.individual") },
      { key: "legal_entity", value: t("auth.legalEntity") }
    ]);
    const selectedUserType = ref({ key: "individual", value: t("auth.individual") });
    const selectedCountryCode = ref("GE");
    const form = useForm({
      user_type: null,
      name: null,
      lastname: null,
      phone_country: selectedCountryCode.value,
      phone: null,
      tax_id: null,
      is_foreign_resident: false,
      email: null,
      password: null,
      password_confirmation: null,
      captcha_token: null
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_SelectButton = script;
      const _component_Checkbox = script$1;
      const _component_InputGroup = script$2;
      const _component_InputGroupAddon = script$3;
      const _component_FloatLabel = script$4;
      const _component_InputText = script$5;
      const _component_Password = script$6;
      const _component_Button = script$7;
      const _directive_keyfilter = KeyFilter;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<title data-v-e6f1105e${_scopeId}>${ssrInterpolate(_ctx.$t("auth.registerTitle"))}</title>`);
          } else {
            return [
              createVNode("title", null, toDisplayString(_ctx.$t("auth.registerTitle")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="w-full max-w-md mx-auto my-6" data-v-e6f1105e><div class="bg-white mx-3 rounded-xl shadow-lg transition-shadow duration-500 ease-in-out border transiton-all border-gray-200 p-8" data-v-e6f1105e><h1 class="text-2xl font-bold text-gray-800 text-center" data-v-e6f1105e>${ssrInterpolate(_ctx.$t("auth.registerHeading"))}</h1><div class="flex justify-center my-4" data-v-e6f1105e>`);
      _push(ssrRenderComponent(_component_SelectButton, {
        modelValue: selectedUserType.value,
        "onUpdate:modelValue": ($event) => selectedUserType.value = $event,
        optionLabel: "key",
        "allow-empty": false,
        options: userTypes.value
      }, {
        option: withCtx((slotProps, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<p data-v-e6f1105e${_scopeId}>${ssrInterpolate(slotProps.option.value)}</p>`);
          } else {
            return [
              createVNode("p", null, toDisplayString(slotProps.option.value), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      if (Object.keys(__props.errors).length > 0) {
        _push(`<div class="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex" data-v-e6f1105e><i class="pi pi-exclamation-circle text-red-400 mr-3 mt-0.5" data-v-e6f1105e></i><div class="text-red-600 text-sm" data-v-e6f1105e><!--[-->`);
        ssrRenderList(__props.errors, (error, key) => {
          _push(`<p data-v-e6f1105e>${ssrInterpolate(error)}</p>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<form class="flex flex-col gap-6" data-v-e6f1105e><div class="flex flex-col gap-2" data-v-e6f1105e><div class="flex items-center gap-2" data-v-e6f1105e>`);
      _push(ssrRenderComponent(_component_Checkbox, {
        modelValue: unref(form).is_foreign_resident,
        "onUpdate:modelValue": ($event) => unref(form).is_foreign_resident = $event,
        size: "medium",
        inputId: "is_foreign_resident",
        binary: ""
      }, null, _parent));
      _push(`<label for="is_foreign_resident" class="text-sm" data-v-e6f1105e>${ssrInterpolate(_ctx.$t("auth.nonResident"))}</label></div></div>`);
      _push(ssrRenderComponent(_component_InputGroup, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_InputGroupAddon, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<i class="pi pi-user text-gray-400" data-v-e6f1105e${_scopeId2}></i>`);
                } else {
                  return [
                    createVNode("i", { class: "pi pi-user text-gray-400" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_FloatLabel, { variant: "on" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_InputText, {
                    id: "name",
                    modelValue: unref(form).name,
                    "onUpdate:modelValue": ($event) => unref(form).name = $event,
                    invalid: !!unref(form).errors.name
                  }, null, _parent3, _scopeId2));
                  _push3(`<label for="name" data-v-e6f1105e${_scopeId2}>${ssrInterpolate(selectedUserType.value?.key === "individual" ? _ctx.$t("auth.firstName") : _ctx.$t("auth.companyName"))}</label>`);
                } else {
                  return [
                    createVNode(_component_InputText, {
                      id: "name",
                      modelValue: unref(form).name,
                      "onUpdate:modelValue": ($event) => unref(form).name = $event,
                      invalid: !!unref(form).errors.name
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "invalid"]),
                    createVNode("label", { for: "name" }, toDisplayString(selectedUserType.value?.key === "individual" ? _ctx.$t("auth.firstName") : _ctx.$t("auth.companyName")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_InputGroupAddon, null, {
                default: withCtx(() => [
                  createVNode("i", { class: "pi pi-user text-gray-400" })
                ]),
                _: 1
              }),
              createVNode(_component_FloatLabel, { variant: "on" }, {
                default: withCtx(() => [
                  createVNode(_component_InputText, {
                    id: "name",
                    modelValue: unref(form).name,
                    "onUpdate:modelValue": ($event) => unref(form).name = $event,
                    invalid: !!unref(form).errors.name
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "invalid"]),
                  createVNode("label", { for: "name" }, toDisplayString(selectedUserType.value?.key === "individual" ? _ctx.$t("auth.firstName") : _ctx.$t("auth.companyName")), 1)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      if (selectedUserType.value?.key === "individual") {
        _push(ssrRenderComponent(_component_InputGroup, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_InputGroupAddon, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<i class="pi pi-users text-gray-400" data-v-e6f1105e${_scopeId2}></i>`);
                  } else {
                    return [
                      createVNode("i", { class: "pi pi-users text-gray-400" })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_FloatLabel, { variant: "on" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_InputText, {
                      id: "lastname",
                      modelValue: unref(form).lastname,
                      "onUpdate:modelValue": ($event) => unref(form).lastname = $event,
                      invalid: !!unref(form).errors.lastname
                    }, null, _parent3, _scopeId2));
                    _push3(`<label for="lastname" data-v-e6f1105e${_scopeId2}>${ssrInterpolate(_ctx.$t("auth.lastName"))}</label>`);
                  } else {
                    return [
                      createVNode(_component_InputText, {
                        id: "lastname",
                        modelValue: unref(form).lastname,
                        "onUpdate:modelValue": ($event) => unref(form).lastname = $event,
                        invalid: !!unref(form).errors.lastname
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "invalid"]),
                      createVNode("label", { for: "lastname" }, toDisplayString(_ctx.$t("auth.lastName")), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_InputGroupAddon, null, {
                  default: withCtx(() => [
                    createVNode("i", { class: "pi pi-users text-gray-400" })
                  ]),
                  _: 1
                }),
                createVNode(_component_FloatLabel, { variant: "on" }, {
                  default: withCtx(() => [
                    createVNode(_component_InputText, {
                      id: "lastname",
                      modelValue: unref(form).lastname,
                      "onUpdate:modelValue": ($event) => unref(form).lastname = $event,
                      invalid: !!unref(form).errors.lastname
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "invalid"]),
                    createVNode("label", { for: "lastname" }, toDisplayString(_ctx.$t("auth.lastName")), 1)
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_component_InputGroup, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_InputGroupAddon, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<i class="pi pi-mobile text-gray-400" data-v-e6f1105e${_scopeId2}></i>`);
                } else {
                  return [
                    createVNode("i", { class: "pi pi-mobile text-gray-400" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_FloatLabel, { variant: "on" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_InputText, mergeProps({
                    id: "phone",
                    modelValue: unref(form).phone,
                    "onUpdate:modelValue": ($event) => unref(form).phone = $event,
                    invalid: !!unref(form).errors.phone
                  }, ssrGetDirectiveProps(_ctx, _directive_keyfilter, { pattern: /[\d+]+$/, validateOnly: true })), null, _parent3, _scopeId2));
                  _push3(`<label for="phone" data-v-e6f1105e${_scopeId2}>${ssrInterpolate(_ctx.$t("auth.phone"))}</label>`);
                } else {
                  return [
                    withDirectives(createVNode(_component_InputText, {
                      id: "phone",
                      modelValue: unref(form).phone,
                      "onUpdate:modelValue": ($event) => unref(form).phone = $event,
                      invalid: !!unref(form).errors.phone
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "invalid"]), [
                      [_directive_keyfilter, { pattern: /[\d+]+$/, validateOnly: true }]
                    ]),
                    createVNode("label", { for: "phone" }, toDisplayString(_ctx.$t("auth.phone")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_InputGroupAddon, null, {
                default: withCtx(() => [
                  createVNode("i", { class: "pi pi-mobile text-gray-400" })
                ]),
                _: 1
              }),
              createVNode(_component_FloatLabel, { variant: "on" }, {
                default: withCtx(() => [
                  withDirectives(createVNode(_component_InputText, {
                    id: "phone",
                    modelValue: unref(form).phone,
                    "onUpdate:modelValue": ($event) => unref(form).phone = $event,
                    invalid: !!unref(form).errors.phone
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "invalid"]), [
                    [_directive_keyfilter, { pattern: /[\d+]+$/, validateOnly: true }]
                  ]),
                  createVNode("label", { for: "phone" }, toDisplayString(_ctx.$t("auth.phone")), 1)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_InputGroup, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_InputGroupAddon, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<i class="pi pi-id-card text-gray-400" data-v-e6f1105e${_scopeId2}></i>`);
                } else {
                  return [
                    createVNode("i", { class: "pi pi-id-card text-gray-400" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_FloatLabel, { variant: "on" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_InputText, mergeProps({
                    id: "id-number",
                    modelValue: unref(form).tax_id,
                    "onUpdate:modelValue": ($event) => unref(form).tax_id = $event,
                    maxlength: 11,
                    invalid: !!unref(form).errors.tax_id
                  }, ssrGetDirectiveProps(_ctx, _directive_keyfilter, { pattern: /[\d+]+$/, validateOnly: true })), null, _parent3, _scopeId2));
                  _push3(`<label for="id-number" data-v-e6f1105e${_scopeId2}>${ssrInterpolate(selectedUserType.value?.key === "individual" ? _ctx.$t("auth.personalId") : _ctx.$t("auth.identificationNumber"))}</label>`);
                } else {
                  return [
                    withDirectives(createVNode(_component_InputText, {
                      id: "id-number",
                      modelValue: unref(form).tax_id,
                      "onUpdate:modelValue": ($event) => unref(form).tax_id = $event,
                      maxlength: 11,
                      invalid: !!unref(form).errors.tax_id
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "invalid"]), [
                      [_directive_keyfilter, { pattern: /[\d+]+$/, validateOnly: true }]
                    ]),
                    createVNode("label", { for: "id-number" }, toDisplayString(selectedUserType.value?.key === "individual" ? _ctx.$t("auth.personalId") : _ctx.$t("auth.identificationNumber")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_InputGroupAddon, null, {
                default: withCtx(() => [
                  createVNode("i", { class: "pi pi-id-card text-gray-400" })
                ]),
                _: 1
              }),
              createVNode(_component_FloatLabel, { variant: "on" }, {
                default: withCtx(() => [
                  withDirectives(createVNode(_component_InputText, {
                    id: "id-number",
                    modelValue: unref(form).tax_id,
                    "onUpdate:modelValue": ($event) => unref(form).tax_id = $event,
                    maxlength: 11,
                    invalid: !!unref(form).errors.tax_id
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "invalid"]), [
                    [_directive_keyfilter, { pattern: /[\d+]+$/, validateOnly: true }]
                  ]),
                  createVNode("label", { for: "id-number" }, toDisplayString(selectedUserType.value?.key === "individual" ? _ctx.$t("auth.personalId") : _ctx.$t("auth.identificationNumber")), 1)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_InputGroup, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_InputGroupAddon, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<i class="pi pi-envelope text-gray-400" data-v-e6f1105e${_scopeId2}></i>`);
                } else {
                  return [
                    createVNode("i", { class: "pi pi-envelope text-gray-400" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_FloatLabel, { variant: "on" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_InputText, {
                    id: "email",
                    modelValue: unref(form).email,
                    "onUpdate:modelValue": ($event) => unref(form).email = $event,
                    invalid: !!unref(form).errors.email
                  }, null, _parent3, _scopeId2));
                  _push3(`<label for="email" data-v-e6f1105e${_scopeId2}>${ssrInterpolate(_ctx.$t("auth.email"))}</label>`);
                } else {
                  return [
                    createVNode(_component_InputText, {
                      id: "email",
                      modelValue: unref(form).email,
                      "onUpdate:modelValue": ($event) => unref(form).email = $event,
                      invalid: !!unref(form).errors.email
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "invalid"]),
                    createVNode("label", { for: "email" }, toDisplayString(_ctx.$t("auth.email")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_InputGroupAddon, null, {
                default: withCtx(() => [
                  createVNode("i", { class: "pi pi-envelope text-gray-400" })
                ]),
                _: 1
              }),
              createVNode(_component_FloatLabel, { variant: "on" }, {
                default: withCtx(() => [
                  createVNode(_component_InputText, {
                    id: "email",
                    modelValue: unref(form).email,
                    "onUpdate:modelValue": ($event) => unref(form).email = $event,
                    invalid: !!unref(form).errors.email
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "invalid"]),
                  createVNode("label", { for: "email" }, toDisplayString(_ctx.$t("auth.email")), 1)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_InputGroup, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_InputGroupAddon, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<i class="pi pi-lock text-gray-400" data-v-e6f1105e${_scopeId2}></i>`);
                } else {
                  return [
                    createVNode("i", { class: "pi pi-lock text-gray-400" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_FloatLabel, { variant: "on" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Password, {
                    modelValue: unref(form).password,
                    "onUpdate:modelValue": ($event) => unref(form).password = $event,
                    inputId: "password",
                    toggleMask: "",
                    "pt:maskIcon:class": "z-10",
                    "pt:unmaskIcon:class": "z-10",
                    feedback: false,
                    invalid: !!unref(form).errors.password
                  }, null, _parent3, _scopeId2));
                  _push3(`<label for="password" data-v-e6f1105e${_scopeId2}>${ssrInterpolate(_ctx.$t("auth.password"))}</label>`);
                } else {
                  return [
                    createVNode(_component_Password, {
                      modelValue: unref(form).password,
                      "onUpdate:modelValue": ($event) => unref(form).password = $event,
                      inputId: "password",
                      toggleMask: "",
                      "pt:maskIcon:class": "z-10",
                      "pt:unmaskIcon:class": "z-10",
                      feedback: false,
                      invalid: !!unref(form).errors.password
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "invalid"]),
                    createVNode("label", { for: "password" }, toDisplayString(_ctx.$t("auth.password")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_InputGroupAddon, null, {
                default: withCtx(() => [
                  createVNode("i", { class: "pi pi-lock text-gray-400" })
                ]),
                _: 1
              }),
              createVNode(_component_FloatLabel, { variant: "on" }, {
                default: withCtx(() => [
                  createVNode(_component_Password, {
                    modelValue: unref(form).password,
                    "onUpdate:modelValue": ($event) => unref(form).password = $event,
                    inputId: "password",
                    toggleMask: "",
                    "pt:maskIcon:class": "z-10",
                    "pt:unmaskIcon:class": "z-10",
                    feedback: false,
                    invalid: !!unref(form).errors.password
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "invalid"]),
                  createVNode("label", { for: "password" }, toDisplayString(_ctx.$t("auth.password")), 1)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_InputGroup, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_InputGroupAddon, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<i class="pi pi-lock text-gray-400" data-v-e6f1105e${_scopeId2}></i>`);
                } else {
                  return [
                    createVNode("i", { class: "pi pi-lock text-gray-400" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_FloatLabel, { variant: "on" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Password, {
                    modelValue: unref(form).password_confirmation,
                    "onUpdate:modelValue": ($event) => unref(form).password_confirmation = $event,
                    inputId: "password_confirm",
                    toggleMask: "",
                    "pt:maskIcon:class": "z-10",
                    "pt:unmaskIcon:class": "z-10",
                    feedback: false,
                    invalid: !!unref(form).errors.password_confirmation
                  }, null, _parent3, _scopeId2));
                  _push3(`<label for="password_confirm" data-v-e6f1105e${_scopeId2}>${ssrInterpolate(_ctx.$t("auth.repeatPassword"))}</label>`);
                } else {
                  return [
                    createVNode(_component_Password, {
                      modelValue: unref(form).password_confirmation,
                      "onUpdate:modelValue": ($event) => unref(form).password_confirmation = $event,
                      inputId: "password_confirm",
                      toggleMask: "",
                      "pt:maskIcon:class": "z-10",
                      "pt:unmaskIcon:class": "z-10",
                      feedback: false,
                      invalid: !!unref(form).errors.password_confirmation
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "invalid"]),
                    createVNode("label", { for: "password_confirm" }, toDisplayString(_ctx.$t("auth.repeatPassword")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_InputGroupAddon, null, {
                default: withCtx(() => [
                  createVNode("i", { class: "pi pi-lock text-gray-400" })
                ]),
                _: 1
              }),
              createVNode(_component_FloatLabel, { variant: "on" }, {
                default: withCtx(() => [
                  createVNode(_component_Password, {
                    modelValue: unref(form).password_confirmation,
                    "onUpdate:modelValue": ($event) => unref(form).password_confirmation = $event,
                    inputId: "password_confirm",
                    toggleMask: "",
                    "pt:maskIcon:class": "z-10",
                    "pt:unmaskIcon:class": "z-10",
                    feedback: false,
                    invalid: !!unref(form).errors.password_confirmation
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "invalid"]),
                  createVNode("label", { for: "password_confirm" }, toDisplayString(_ctx.$t("auth.repeatPassword")), 1)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<p data-v-e6f1105e>${ssrInterpolate(_ctx.$t("auth.entrepreneurNote"))}</p><div data-v-e6f1105e>`);
      _push(ssrRenderComponent(_component_Button, {
        type: "submit",
        icon: "pi pi-user-plus",
        label: _ctx.$t("auth.confirm"),
        class: "w-full bg-blue-500 hover:bg-blue-500/90 border-none text-white rounded-lg py-2.5"
      }, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(unref(script$8), { "pt:root:class": "m-0" }, null, _parent));
      _push(`<div data-v-e6f1105e><div class="flex justify-center gap-x-2 text-sm" data-v-e6f1105e><p class="w-fit" data-v-e6f1105e>${ssrInterpolate(_ctx.$t("auth.alreadyRegistered"))}</p><div class="flex items-center w-fit gap-x-2 text-nowrap" data-v-e6f1105e>`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("login"),
        class: "flex items-center gap-x-1 text-brand-500 text-sm no-underline"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="pi pi-user text-brand-500" data-v-e6f1105e${_scopeId}></i> ${ssrInterpolate(_ctx.$t("auth.signIn"))}`);
          } else {
            return [
              createVNode("i", { class: "pi pi-user text-brand-500" }),
              createTextVNode(" " + toDisplayString(_ctx.$t("auth.signIn")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div></form></div></div><!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/Register.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Register = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-e6f1105e"]]);
export {
  Register as default
};
//# sourceMappingURL=Register-DKDqzzMJ.js.map
