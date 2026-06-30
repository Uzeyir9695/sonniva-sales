import { ref, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrInterpolate, ssrRenderAttr, ssrRenderClass } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./AdminLayout-D1TicwrL.js";
import "@inertiajs/vue3";
import { u as useToast } from "./index-Qb24q4w2.js";
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
import "./usePricing-HxfzG07E.js";
import "@primeuix/styles/confirmdialog";
const _sfc_main = /* @__PURE__ */ Object.assign({ layout: _sfc_main$1 }, {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    banners: { type: Object, default: () => ({}) }
  },
  setup(__props) {
    const props = __props;
    useToast();
    const slots = [
      { key: "main", label: "Main Banner (large left)" },
      { key: "doors", label: "Doors Carousel (top right)" },
      { key: "frames", label: "Frames Carousel (bottom right)" }
    ];
    const uploading = ref({});
    function imagesFor(slot) {
      return props.banners[slot] ?? [];
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "p-6 max-w-5xl mx-auto space-y-6" }, _attrs))}><h1 class="text-xl font-bold text-gray-800">Manage Home Page</h1><!--[-->`);
      ssrRenderList(slots, (slot) => {
        _push(`<div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4"><div class="flex items-center justify-between"><div><p class="font-semibold text-gray-800">${ssrInterpolate(slot.label)}</p><p class="text-xs text-gray-400 mt-0.5">Multiple images — carousel when more than 1</p></div><label${ssrRenderAttr("for", `upload-${slot.key}`)} class="${ssrRenderClass([uploading.value[slot.key] ? "opacity-60 pointer-events-none" : "", "flex items-center gap-2 cursor-pointer bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors"])}"><i class="pi pi-upload text-xs"></i> ${ssrInterpolate(uploading.value[slot.key] ? "Uploading..." : "Upload")}</label><input${ssrRenderAttr("id", `upload-${slot.key}`)} type="file" accept="image/*" multiple class="hidden"></div><div class="relative">`);
        if (uploading.value[slot.key]) {
          _push(`<div class="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 bg-white/70 backdrop-blur-sm rounded-xl"><i class="pi pi-spinner pi-spin text-2xl text-brand-500"></i><span class="text-sm text-gray-500 font-medium">Uploading...</span></div>`);
        } else {
          _push(`<!---->`);
        }
        if (imagesFor(slot.key).length) {
          _push(`<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3"><!--[-->`);
          ssrRenderList(imagesFor(slot.key), (img) => {
            _push(`<div class="relative group rounded-xl overflow-hidden aspect-video bg-gray-100 shadow-md"><img${ssrRenderAttr("src", img.image_url)} alt="banner" class="w-full h-full object-cover"><button class="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity"><i class="pi pi-trash text-white text-lg"></i></button></div>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<p class="text-sm text-gray-400 italic">No images uploaded yet.</p>`);
        }
        _push(`</div></div>`);
      });
      _push(`<!--]--></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/HomePage/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=Index-DpClziIw.js.map
