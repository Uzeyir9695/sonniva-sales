import { s as script } from "./index-BAgOeBfa.js";
import { useAttrs, useModel, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import "@primeuix/utils";
import "@primevue/core/baseinput";
import "@primeuix/styles/inputtext";
import "@primevue/core/base/style";
const _sfc_main = {
  __name: "PrimeInputText",
  __ssrInlineRender: true,
  props: {
    "modelValue": {},
    "modelModifiers": {}
  },
  emits: ["update:modelValue"],
  setup(__props) {
    const attrs = useAttrs();
    const modelValue = useModel(__props, "modelValue");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_InputText = script;
      _push(ssrRenderComponent(_component_InputText, mergeProps({
        modelValue: modelValue.value,
        "onUpdate:modelValue": ($event) => modelValue.value = $event
      }, unref(attrs), { class: "w-full rounded-xl text-sm py-1.5!" }, _attrs), null, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/PrimevueComponents/PrimeInputText.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=PrimeInputText-BlIRrCdA.js.map
