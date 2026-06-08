import { s as script$1 } from "./index-YvTnrAwi.js";
import { s as script } from "./index-Dq44c_oU.js";
import { unref, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { useForm, Head } from "@inertiajs/vue3";
import { u as useToast } from "./index-Qb24q4w2.js";
import "@primeuix/utils";
import "@primeuix/utils/object";
import "@primevue/icons/spinner";
import "@primevue/core/basecomponent";
import "@primeuix/styles/badge";
import "@primevue/core/base/style";
import "@primeuix/utils/dom";
import "@primevue/core/basedirective";
import "@primeuix/styles/ripple";
import "@primeuix/styles/button";
import "./index-BAgOeBfa.js";
import "@primevue/core/baseinput";
import "@primeuix/styles/inputtext";
import "@primeuix/styles/inputotp";
const _sfc_main = {
  __name: "RegisterVerifyPhone",
  __ssrInlineRender: true,
  props: ["errors"],
  setup(__props) {
    const toast = useToast();
    const form = useForm({
      otp: null
    });
    async function resendCode() {
      form.post(route("register.resend-code"), {
        onSuccess: (res) => {
          toast.add({ severity: "success", summary: "Success", detail: "Verification code sent successfully.", life: 12e3 });
        },
        onError: (error) => {
          toast.add({ severity: "error", summary: "Error", detail: error.message, life: 12e3 });
        }
      });
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_InputOtp = script;
      const _component_Button = script$1;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<title${_scopeId}>ტელეფონის იდენტიფიცირება</title>`);
          } else {
            return [
              createVNode("title", null, "ტელეფონის იდენტიფიცირება")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="bg-white flex flex-col justify-evenly mx-3 sm:mx-auto shadow-lg rounded-xl border border-slate-200 mt-8 w-full sm:w-[450px] h-[400px]"><form class="flex flex-col p-8 gap-6 self-center"><div class="flex flex-col items-center"><p class="text-surface-500 dark:text-surface-400 block mb-8">შეიყვანე 6 ნიშნა კოდი</p>`);
      _push(ssrRenderComponent(_component_InputOtp, {
        modelValue: unref(form).otp,
        "onUpdate:modelValue": ($event) => unref(form).otp = $event,
        length: 6
      }, null, _parent));
      _push(`<div class="flex justify-between mt-8 self-stretch">`);
      _push(ssrRenderComponent(_component_Button, {
        label: "ხელახლა გაგზავნა",
        onClick: resendCode,
        link: "",
        class: "p-0"
      }, null, _parent));
      _push(`</div></div><div class="flex xs:flex-col gap-2 sm:justify-between sm:items-center">`);
      _push(ssrRenderComponent(_component_Button, {
        disabled: unref(form).processing,
        type: "submit",
        class: "custom-button w-full",
        label: unref(form).processing ? "გთხოვ დაიცადო..." : "დადასტურება",
        size: "medium",
        icon: unref(form).processing ? "pi pi-spin pi-spinner" : "pi pi-check-circle"
      }, null, _parent));
      _push(`</div></form></div><!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/RegisterVerifyPhone.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=RegisterVerifyPhone-CBLOWOpw.js.map
