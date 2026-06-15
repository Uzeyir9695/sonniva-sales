import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { ref, useSSRContext } from "vue";
import "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./StockNotifyDialog-DtRQgNBy.js";
const _sfc_main = {
  __name: "StockNotifyButton",
  __ssrInlineRender: true,
  props: {
    item: { type: Object, required: true },
    isSubscribed: { type: Boolean, default: false }
  },
  setup(__props) {
    const showDialog = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      if (!__props.isSubscribed) {
        _push(`<button class="w-full py-1.5 sm:py-2 rounded-2xl border-2 border-dashed border-slate-400 text-slate-700 text-sm font-bold hover:bg-slate-50 transition-colors cursor-pointer flex items-center justify-center gap-2"><i class="pi pi-bell font-bold"></i> შემატყობინეთ როცა შეივსება </button>`);
      } else {
        _push(`<div class="rounded-2xl bg-brand-100 border border-brand-300 px-4 py-3"><div class="flex items-center justify-between gap-3"><div class="flex items-center gap-2 text-brand-800 text-sm font-medium"><i class="pi pi-bell text-brand-600"></i> შეტყობინება ჩართულია </div><button class="text-xs text-brand-600 hover:text-red-500 transition-colors cursor-pointer shrink-0"> გაუქმება </button></div><p class="text-xs text-brand-700 mt-1.5"> მარაგი როგორც კი შეივსება, მიიღებთ შეტყობინებას SMS-ის სახით. </p></div>`);
      }
      _push(ssrRenderComponent(_sfc_main$1, {
        visible: showDialog.value,
        "onUpdate:visible": ($event) => showDialog.value = $event,
        item: __props.item
      }, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Shared/components/StockNotifyButton.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
//# sourceMappingURL=StockNotifyButton-BihFmX1g.js.map
