import { s as script$7 } from "./index-hSjFFc9a.js";
import { s as script$6 } from "./index-BzRznsIW.js";
import { s as script$5 } from "./index-o6MKZAXO.js";
import { s as script$4 } from "./index-BAgOeBfa.js";
import { s as script$3 } from "./index-1kO8dZCM.js";
import { s as script$1, a as script$2, b as script$8 } from "./index-CFQqRDLI.js";
import { s as script } from "./index-D2Co7MqO.js";
import { unref, withCtx, createVNode, createTextVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderClass } from "vue/server-renderer";
import { useForm, Head, Link } from "@inertiajs/vue3";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
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
import "@primevue/icons/check";
import "@primevue/icons/minus";
import "@primevue/core/baseinput";
import "@primeuix/styles/checkbox";
import "@primeuix/utils/zindex";
import "@primevue/core/utils";
import "@primevue/icons/eye";
import "@primevue/icons/eyeslash";
import "@primevue/icons/times";
import "./index-rAVNvoJo.js";
import "@primeuix/utils/eventbus";
import "./index-zZrFrjQS.js";
import "@primeuix/styles/password";
import "@primeuix/styles/inputtext";
import "@primeuix/styles/floatlabel";
import "@primeuix/styles/inputgroup";
import "@primeuix/styles/divider";
import "@primeuix/styles/message";
const _sfc_main = {
  __name: "Login",
  __ssrInlineRender: true,
  props: ["errors"],
  setup(__props) {
    const form = useForm({
      login: null,
      // <-- single field for email or mobile
      password: null,
      remember: false
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Message = script;
      const _component_InputGroup = script$1;
      const _component_InputGroupAddon = script$2;
      const _component_FloatLabel = script$3;
      const _component_InputText = script$4;
      const _component_Password = script$5;
      const _component_Checkbox = script$6;
      const _component_Button = script$7;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<title data-v-a0c41768${_scopeId}>აუტორიზაცია</title>`);
          } else {
            return [
              createVNode("title", null, "აუტორიზაცია")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="w-full max-w-md mx-auto mt-6" data-v-a0c41768><div class="bg-white mx-3 rounded-xl shadow-lg transition-shadow duration-500 ease-in-out border border-slate-200 p-8" data-v-a0c41768><h1 class="text-2xl font-bold mb-6 text-center" data-v-a0c41768>აუტორიზაცია</h1>`);
      if (_ctx.$page.props.errors.message) {
        _push(ssrRenderComponent(_component_Message, {
          class: "mb-8",
          severity: "error",
          icon: "pi pi-exclamation-circle",
          closable: true
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(_ctx.$page.props.errors.message)}`);
            } else {
              return [
                createTextVNode(toDisplayString(_ctx.$page.props.errors.message), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      if (_ctx.$page.props.flash.message) {
        _push(ssrRenderComponent(_component_Message, {
          class: "mb-8",
          severity: "success",
          icon: "pi pi-check-circle",
          closable: true
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(_ctx.$page.props.flash.message)}`);
            } else {
              return [
                createTextVNode(toDisplayString(_ctx.$page.props.flash.message), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<form data-v-a0c41768><div class="space-y-5" data-v-a0c41768>`);
      _push(ssrRenderComponent(_component_InputGroup, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_InputGroupAddon, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<i class="pi pi-envelope" data-v-a0c41768${_scopeId2}></i>`);
                } else {
                  return [
                    createVNode("i", { class: "pi pi-envelope" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_FloatLabel, { variant: "on" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_InputText, {
                    id: "email_or_phone",
                    modelValue: unref(form).login,
                    "onUpdate:modelValue": ($event) => unref(form).login = $event,
                    invalid: !!unref(form).errors.login
                  }, null, _parent3, _scopeId2));
                  _push3(`<label for="email_or_phone" data-v-a0c41768${_scopeId2}>ელ.ფოსტა ან ტელეფონი</label>`);
                } else {
                  return [
                    createVNode(_component_InputText, {
                      id: "email_or_phone",
                      modelValue: unref(form).login,
                      "onUpdate:modelValue": ($event) => unref(form).login = $event,
                      invalid: !!unref(form).errors.login
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "invalid"]),
                    createVNode("label", { for: "email_or_phone" }, "ელ.ფოსტა ან ტელეფონი")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_InputGroupAddon, null, {
                default: withCtx(() => [
                  createVNode("i", { class: "pi pi-envelope" })
                ]),
                _: 1
              }),
              createVNode(_component_FloatLabel, { variant: "on" }, {
                default: withCtx(() => [
                  createVNode(_component_InputText, {
                    id: "email_or_phone",
                    modelValue: unref(form).login,
                    "onUpdate:modelValue": ($event) => unref(form).login = $event,
                    invalid: !!unref(form).errors.login
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "invalid"]),
                  createVNode("label", { for: "email_or_phone" }, "ელ.ფოსტა ან ტელეფონი")
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
                  _push3(`<i class="pi pi-lock" data-v-a0c41768${_scopeId2}></i>`);
                } else {
                  return [
                    createVNode("i", { class: "pi pi-lock" })
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
                    toggleMask: "",
                    "pt:maskIcon:class": "z-10",
                    "pt:unmaskIcon:class": "z-10",
                    feedback: false,
                    invalid: !!unref(form).errors.password,
                    class: "w-full",
                    inputId: "password"
                  }, null, _parent3, _scopeId2));
                  _push3(`<label for="password" class="${ssrRenderClass({ "text-danger": unref(form).errors.password })}" data-v-a0c41768${_scopeId2}> პაროლი </label>`);
                } else {
                  return [
                    createVNode(_component_Password, {
                      modelValue: unref(form).password,
                      "onUpdate:modelValue": ($event) => unref(form).password = $event,
                      toggleMask: "",
                      "pt:maskIcon:class": "z-10",
                      "pt:unmaskIcon:class": "z-10",
                      feedback: false,
                      invalid: !!unref(form).errors.password,
                      class: "w-full",
                      inputId: "password"
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "invalid"]),
                    createVNode("label", {
                      for: "password",
                      class: { "text-danger": unref(form).errors.password }
                    }, " პაროლი ", 2)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_InputGroupAddon, null, {
                default: withCtx(() => [
                  createVNode("i", { class: "pi pi-lock" })
                ]),
                _: 1
              }),
              createVNode(_component_FloatLabel, { variant: "on" }, {
                default: withCtx(() => [
                  createVNode(_component_Password, {
                    modelValue: unref(form).password,
                    "onUpdate:modelValue": ($event) => unref(form).password = $event,
                    toggleMask: "",
                    "pt:maskIcon:class": "z-10",
                    "pt:unmaskIcon:class": "z-10",
                    feedback: false,
                    invalid: !!unref(form).errors.password,
                    class: "w-full",
                    inputId: "password"
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "invalid"]),
                  createVNode("label", {
                    for: "password",
                    class: { "text-danger": unref(form).errors.password }
                  }, " პაროლი ", 2)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="flex items-center justify-between" data-v-a0c41768><div class="flex items-center gap-2" data-v-a0c41768>`);
      _push(ssrRenderComponent(_component_Checkbox, {
        modelValue: unref(form).remember,
        "onUpdate:modelValue": ($event) => unref(form).remember = $event,
        size: "small",
        inputId: "remember",
        binary: ""
      }, null, _parent));
      _push(`<label for="remember" class="text-sm max-sm:text-xs!" data-v-a0c41768> დამახსოვრება </label></div>`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("show.forgot.password"),
        class: "text-xs sm:text-sm text-slate-800"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` დაგავიწყდა პაროლი? `);
          } else {
            return [
              createTextVNode(" დაგავიწყდა პაროლი? ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div data-v-a0c41768>`);
      _push(ssrRenderComponent(_component_Button, {
        type: "submit",
        icon: "pi pi-user",
        label: "შესვლა",
        class: "w-full flex justify-center items-center py-2.5 px-4 rounded-lg border-none shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-500/90"
      }, null, _parent));
      _push(`</div></div></form><div class="mt-6" data-v-a0c41768>`);
      _push(ssrRenderComponent(unref(script$8), null, null, _parent));
      _push(`<p class="text-center text-sm" data-v-a0c41768> არ ხარ რეგისტრირებული? `);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("register.show"),
        class: "font-medium text-blue-500 hover:text-brand-500/80 transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` დარეგისტრირდი `);
          } else {
            return [
              createTextVNode(" დარეგისტრირდი ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</p></div></div></div><!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/Login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Login = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-a0c41768"]]);
export {
  Login as default
};
//# sourceMappingURL=Login-hBtKrulm.js.map
