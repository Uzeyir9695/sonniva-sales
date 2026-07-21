import { ref, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderClass, ssrInterpolate, ssrRenderComponent, ssrRenderList, ssrRenderAttr } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./AdminLayout-C42t3Z0P.js";
import "@inertiajs/vue3";
import { u as useToast } from "./index-Qb24q4w2.js";
import axios from "axios";
import _sfc_main$2 from "./PrimeInputText-BlIRrCdA.js";
import "./index-YvTnrAwi.js";
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
import "./index-C-o2I19c.js";
import "@primeuix/utils/zindex";
import "./index-zZrFrjQS.js";
import "@primeuix/utils/eventbus";
import "@primeuix/styles/toast";
import "@primevue/icons/check";
import "@primevue/icons/exclamationtriangle";
import "@primevue/icons/infocircle";
import "@primevue/icons/times";
import "@primevue/icons/timescircle";
import "@vueuse/core";
import "./categoryIcons-dDFpexsr.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./index-C3Ts-4IM.js";
import "@primeuix/utils/uuid";
import "@primevue/core/utils";
import "@primeuix/styles/tooltip";
import "./QuickViewDialog-7zTQs1NP.js";
import "./index-D46B4f3g.js";
import "@primevue/icons/windowmaximize";
import "@primevue/icons/windowminimize";
import "@primeuix/styled";
import "@primeuix/styles/dialog";
import "./useCart-CIcsIaQl.js";
import "./usePricing-ssZPWxiP.js";
import "@primeuix/styles/confirmdialog";
import "./index-BAgOeBfa.js";
import "@primevue/core/baseinput";
import "@primeuix/styles/inputtext";
const _sfc_main = /* @__PURE__ */ Object.assign({ layout: _sfc_main$1 }, {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    banners: { type: Object, default: () => ({}) }
  },
  setup(__props) {
    const props = __props;
    useToast();
    const otherSlots = [
      { key: "doors", label: "Doors Carousel (top right)" },
      { key: "frames", label: "Frames Carousel (bottom right)" }
    ];
    const uploading = ref({});
    function imagesFor(slot) {
      return props.banners[slot] ?? [];
    }
    function mainBannerCountFor(itemId) {
      return imagesFor("main").filter((img) => img.item?.id === itemId).length;
    }
    function imageUrl(img) {
      return `/storage/items/${img}`;
    }
    const query = ref("");
    const results = ref([]);
    const searching = ref(false);
    let debounceTimer = null;
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
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "p-6 max-w-5xl mx-auto space-y-6" }, _attrs))}><h1 class="text-xl font-bold text-gray-800">Manage Home Page</h1><div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4"><div class="flex items-center justify-between"><div><p class="font-semibold text-gray-800">Main Banner (large left)</p><p class="text-xs text-gray-400 mt-0.5">Link a slide to an item by searching below, or upload one with no item link.</p></div><label for="upload-main" class="${ssrRenderClass([uploading.value.main ? "opacity-60 pointer-events-none" : "", "flex items-center gap-2 cursor-pointer bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors shrink-0"])}"><i class="pi pi-upload text-xs"></i> ${ssrInterpolate(uploading.value.main ? "Uploading..." : "Upload without item")}</label><input id="upload-main" type="file" accept="image/*" multiple class="hidden"></div><span class="relative inline-block w-full sm:w-96"><i class="pi pi-search text-gray-400 text-sm absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"></i>`);
      _push(ssrRenderComponent(_sfc_main$2, {
        modelValue: query.value,
        "onUpdate:modelValue": ($event) => query.value = $event,
        onInput: onSearchInput,
        placeholder: "Search by item No. or name...",
        class: "w-full pl-9!"
      }, null, _parent));
      _push(`</span>`);
      if (searching.value) {
        _push(`<div class="flex items-center gap-2 text-sm text-gray-400"><i class="pi pi-spinner pi-spin"></i> Searching... </div>`);
      } else if (query.value.trim().length >= 2 && results.value.length === 0) {
        _push(`<div class="text-sm text-gray-400"> No items found for &quot;${ssrInterpolate(query.value)}&quot;. </div>`);
      } else if (results.value.length) {
        _push(`<ul class="divide-y divide-gray-100"><!--[-->`);
        ssrRenderList(results.value, (item) => {
          _push(`<li class="flex items-center gap-3 py-3"><div class="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 shrink-0">`);
          if (item.images?.length) {
            _push(`<img${ssrRenderAttr("src", imageUrl(item.images[0]))}${ssrRenderAttr("alt", item.name)} class="w-full h-full object-cover">`);
          } else {
            _push(`<div class="w-full h-full flex items-center justify-center"><i class="pi pi-image text-gray-300 text-sm"></i></div>`);
          }
          _push(`</div><div class="flex-1 min-w-0"><p class="text-sm font-medium text-gray-800 truncate">${ssrInterpolate(item.name)}</p><p class="text-xs text-gray-400 font-mono">${ssrInterpolate(item.no)}</p></div><span class="flex items-center gap-1.5 text-base text-gray-400 shrink-0"><i class="pi pi-image text-base"></i> ${ssrInterpolate(mainBannerCountFor(item.id))}</span><label class="${ssrRenderClass([uploading.value[`main-${item.id}`] ? "opacity-60 pointer-events-none" : "", "flex items-center gap-2 cursor-pointer bg-brand-500 hover:bg-brand-600 text-white text-xs font-semibold px-3 py-2 rounded-xl transition-colors shrink-0"])}"><i class="pi pi-upload text-xs"></i> ${ssrInterpolate(uploading.value[`main-${item.id}`] ? "Uploading..." : "Upload image")} <input type="file" accept="image/*" multiple class="hidden"></label></li>`);
        });
        _push(`<!--]--></ul>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="pt-2 border-t border-gray-100">`);
      if (imagesFor("main").length) {
        _push(`<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-3"><!--[-->`);
        ssrRenderList(imagesFor("main"), (img) => {
          _push(`<div class="relative group rounded-xl overflow-hidden aspect-video bg-gray-100 shadow-md"><img${ssrRenderAttr("src", img.image_url)} alt="banner" class="w-full h-full object-cover"><span class="absolute bottom-0 left-0 right-0 px-2 py-1 text-[11px] font-medium text-white bg-black/60 truncate">${ssrInterpolate(img.item?.name ?? "No item linked")}</span><button class="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity"><i class="pi pi-trash text-white text-lg"></i></button></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<p class="text-sm text-gray-400 italic mt-3">No main banners uploaded yet.</p>`);
      }
      _push(`</div></div><!--[-->`);
      ssrRenderList(otherSlots, (slot) => {
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
//# sourceMappingURL=Index-EcKZvyyw.js.map
