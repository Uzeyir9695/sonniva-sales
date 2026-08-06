import { T as Tooltip } from "./index-C3Ts-4IM.js";
import { s as script } from "./index-YvTnrAwi.js";
import { ref, unref, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrRenderClass, ssrGetDirectiveProps } from "vue/server-renderer";
import { router } from "@inertiajs/vue3";
import { u as useToast } from "./index-Qb24q4w2.js";
import axios from "axios";
import _sfc_main$1 from "./PrimeInputText-BlIRrCdA.js";
import _sfc_main$2 from "./ManageItemDialog-dxGay2Ti.js";
import { e as getOriginalPrice, g as getDisplayPrice } from "./usePricing-BqOIsB71.js";
import { f as formatDiscount } from "./numberFormat-BgUHwZc2.js";
import "@primeuix/utils/dom";
import "@primeuix/utils/object";
import "@primeuix/utils/uuid";
import "@primeuix/utils/zindex";
import "@primevue/core/utils";
import "@primevue/core/basedirective";
import "@primeuix/styles/tooltip";
import "@primevue/core/base/style";
import "@primeuix/utils";
import "@primevue/icons/spinner";
import "@primevue/core/basecomponent";
import "@primeuix/styles/badge";
import "@primeuix/styles/ripple";
import "@primeuix/styles/button";
import "./index-BAgOeBfa.js";
import "@primevue/core/baseinput";
import "@primeuix/styles/inputtext";
import "./index-D46B4f3g.js";
import "@primevue/icons/times";
import "@primevue/icons/windowmaximize";
import "@primevue/icons/windowminimize";
import "./index-zZrFrjQS.js";
import "@primeuix/styled";
import "@primeuix/styles/dialog";
import "./index-BgiqKOW-.js";
import "@primevue/icons/angledown";
import "@primevue/icons/angleup";
import "@primeuix/styles/inputnumber";
const _sfc_main = {
  __name: "ManageItemsTab",
  __ssrInlineRender: true,
  setup(__props) {
    const toast = useToast();
    const query = ref("");
    const results = ref([]);
    const searching = ref(false);
    let debounceTimer = null;
    function imageUrl(img) {
      return `/storage/items/${img}`;
    }
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
    const dialogRef = ref(null);
    function openManageDialog(item) {
      dialogRef.value.open(item);
    }
    function onSaved() {
      if (query.value.trim().length >= 2) runSearch(query.value.trim());
    }
    const syncingItems = ref(false);
    const itemNoToSync = ref("");
    function syncItems() {
      syncingItems.value = true;
      router.post(route("admin.items.sync"), { no: itemNoToSync.value || null }, {
        preserveScroll: true,
        onSuccess: (res) => {
          toast.add({ severity: "success", summary: "Started", detail: res.props.flash.message, life: 4e3 });
          itemNoToSync.value = "";
        },
        onError: () => {
          toast.add({ severity: "error", summary: "Error", detail: "Could not start the sync, please try again.", life: 4e3 });
        },
        onFinish: () => {
          syncingItems.value = false;
        }
      });
    }
    const syncingAttributes = ref(false);
    function syncAttributes() {
      syncingAttributes.value = true;
      router.post(route("admin.items.sync-attributes"), {}, {
        preserveScroll: true,
        onSuccess: (res) => {
          toast.add({ severity: "success", summary: "Started", detail: res.props.flash.message, life: 4e3 });
        },
        onError: () => {
          toast.add({ severity: "error", summary: "Error", detail: "Could not start the sync, please try again.", life: 4e3 });
        },
        onFinish: () => {
          syncingAttributes.value = false;
        }
      });
    }
    const syncingInventory = ref(false);
    function syncInventory() {
      syncingInventory.value = true;
      router.post(route("admin.items.sync-inventory"), {}, {
        preserveScroll: true,
        onSuccess: (res) => {
          toast.add({ severity: "success", summary: "Started", detail: res.props.flash.message, life: 4e3 });
        },
        onError: () => {
          toast.add({ severity: "error", summary: "Error", detail: "Could not start the sync, please try again.", life: 4e3 });
        },
        onFinish: () => {
          syncingInventory.value = false;
        }
      });
    }
    const fetchingMissingImages = ref(false);
    function fetchMissingImages() {
      fetchingMissingImages.value = true;
      router.post(route("admin.items.fetch-missing-images"), {}, {
        preserveScroll: true,
        onSuccess: (res) => {
          toast.add({ severity: "success", summary: "Started", detail: res.props.flash.message, life: 4e3 });
        },
        onError: () => {
          toast.add({ severity: "error", summary: "Error", detail: "Could not start the job, please try again.", life: 4e3 });
        },
        onFinish: () => {
          fetchingMissingImages.value = false;
        }
      });
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Button = script;
      const _directive_tooltip = Tooltip;
      _push(`<div${ssrRenderAttrs(_attrs)}><h2 class="text-base font-bold text-gray-900 mb-1">Manage Item</h2><p class="text-sm text-gray-500 mb-4"> Search for an item by No. or name to manage its video link, pricing and discounts. The video link shows up as the last slide in the item&#39;s image gallery. </p><span class="relative inline-block w-full sm:w-96"><i class="pi pi-search text-gray-400 text-sm absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"></i>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        modelValue: query.value,
        "onUpdate:modelValue": ($event) => query.value = $event,
        onInput: onSearchInput,
        placeholder: "Search by item No. or name...",
        class: "w-full pl-9!"
      }, null, _parent));
      _push(`</span>`);
      if (searching.value) {
        _push(`<div class="flex items-center gap-2 text-sm text-gray-400 mt-4"><i class="pi pi-spinner pi-spin"></i> Searching... </div>`);
      } else if (query.value.trim().length >= 2 && results.value.length === 0) {
        _push(`<div class="text-sm text-gray-400 mt-4"> No items found for &quot;${ssrInterpolate(query.value)}&quot;. </div>`);
      } else if (results.value.length) {
        _push(`<ul class="divide-y divide-gray-100 mt-4"><!--[-->`);
        ssrRenderList(results.value, (item) => {
          _push(`<li class="flex items-center gap-3 py-3"><div class="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 shrink-0">`);
          if (item.images?.length) {
            _push(`<img${ssrRenderAttr("src", imageUrl(item.images[0]))}${ssrRenderAttr("alt", item.name)} class="w-full h-full object-cover">`);
          } else {
            _push(`<div class="w-full h-full flex items-center justify-center"><i class="pi pi-image text-gray-300 text-sm"></i></div>`);
          }
          _push(`</div><div class="flex-1 min-w-0"><p class="text-sm font-medium text-gray-800 truncate">${ssrInterpolate(item.name)}</p><p class="text-xs text-gray-400 font-mono">${ssrInterpolate(item.no)}</p><p class="text-sm mt-0.5">`);
          if (unref(getOriginalPrice)(item)) {
            _push(`<span class="text-red-500 line-through mr-1.5">${ssrInterpolate(Number(unref(getOriginalPrice)(item)).toFixed(2))} ₾</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<span class="font-semibold text-gray-700">${ssrInterpolate(Number(unref(getDisplayPrice)(item)).toFixed(2))} ₾</span></p></div>`);
          if (item.discount > 0) {
            _push(`<span class="text-xs px-2 py-0.5 rounded-full font-semibold shrink-0 bg-red-100 text-red-600"> -${ssrInterpolate(unref(formatDiscount)(item.discount))}% </span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<span class="${ssrRenderClass([item.video_url ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-400", "text-xs px-2 py-0.5 rounded-full font-medium shrink-0"])}">${ssrInterpolate(item.video_url ? "Video set" : "No video")}</span><a${ssrRenderAttrs(mergeProps({
            href: _ctx.route("items.show", item.slug),
            target: "_blank",
            class: "w-8 h-8 flex items-center justify-center rounded-lg shrink-0 text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          }, ssrGetDirectiveProps(_ctx, _directive_tooltip, "View item page", void 0, { top: true })))}><i class="pi pi-external-link text-sm"></i></a>`);
          _push(ssrRenderComponent(_component_Button, {
            label: "Manage",
            icon: "pi pi-cog",
            size: "small",
            severity: "secondary",
            outlined: "",
            onClick: ($event) => openManageDialog(item)
          }, null, _parent));
          _push(`</li>`);
        });
        _push(`<!--]--></ul>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<hr class="my-6 border-gray-100"><div class="grid grid-cols-1 sm:grid-cols-2 gap-4"><div class="flex flex-col rounded-2xl border-2 border-emerald-200 bg-emerald-50/50 p-5"><div class="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-3"><i class="pi pi-cloud-download"></i></div><h2 class="text-base font-bold text-gray-900 mb-1">Fetch New Items</h2><p class="text-sm text-gray-500 mb-4"> Fetches new items added in Business Central and adds them to the shop, with their category, images, prices and attributes. Existing items are left untouched. Leave the item number empty to check the full catalog, or enter one to fetch just that item. </p>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        modelValue: itemNoToSync.value,
        "onUpdate:modelValue": ($event) => itemNoToSync.value = $event,
        size: "small",
        class: "text-xs mb-3",
        placeholder: "Item No. (optional)"
      }, null, _parent));
      _push(ssrRenderComponent(_component_Button, {
        loading: syncingItems.value,
        onClick: syncItems,
        label: syncingItems.value ? "Fetching..." : itemNoToSync.value ? "Fetch Item" : "Fetch New Items",
        icon: "pi pi-cloud-download",
        severity: "success",
        class: "mt-auto self-start"
      }, null, _parent));
      _push(`<p class="text-sm text-gray-400 mt-3 flex items-center gap-1"><i class="pi pi-clock"></i>Seconds for a single item, about 4 minutes for the full catalog. </p></div><div class="flex flex-col rounded-2xl border-2 border-amber-200 bg-amber-50/50 p-5"><div class="w-10 h-10 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mb-3"><i class="pi pi-tags"></i></div><h2 class="text-base font-bold text-gray-900 mb-1">Item Attributes</h2><p class="text-sm text-gray-500 mb-4"> Updates item attribute values (e.g. size, color) from Business Central. </p>`);
      _push(ssrRenderComponent(_component_Button, {
        loading: syncingAttributes.value,
        onClick: syncAttributes,
        label: syncingAttributes.value ? "Updating..." : "Update Attributes",
        icon: "pi pi-refresh",
        severity: "warn",
        class: "mt-auto self-start"
      }, null, _parent));
      _push(`<p class="text-sm text-gray-400 mt-3 flex items-center gap-1"><i class="pi pi-clock"></i>Takes about 1-2 minutes to finish. </p></div><div class="flex flex-col rounded-2xl border-2 border-blue-200 bg-blue-50/50 p-5"><div class="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-3"><i class="pi pi-box"></i></div><h2 class="text-base font-bold text-gray-900 mb-1">Inventory</h2><p class="text-sm text-gray-500 mb-4"> Updates item stock levels from Business Central and notifies users waiting on restocked items. </p>`);
      _push(ssrRenderComponent(_component_Button, {
        loading: syncingInventory.value,
        onClick: syncInventory,
        label: syncingInventory.value ? "Updating..." : "Sync Inventory",
        icon: "pi pi-box",
        severity: "info",
        class: "mt-auto self-start"
      }, null, _parent));
      _push(`<p class="text-sm text-gray-400 mt-3 flex items-center gap-1"><i class="pi pi-clock"></i>Takes about 1-2 minutes to finish. </p></div><div class="flex flex-col rounded-2xl border-2 border-purple-200 bg-purple-50/50 p-5"><div class="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mb-3"><i class="pi pi-images"></i></div><h2 class="text-base font-bold text-gray-900 mb-1">Missing Item Images</h2><p class="text-sm text-gray-500 mb-4"> Fetches images from Business Central for in-stock items (inventory &gt; 0) that don&#39;t have any yet. Runs in the background. </p>`);
      _push(ssrRenderComponent(_component_Button, {
        loading: fetchingMissingImages.value,
        onClick: fetchMissingImages,
        label: fetchingMissingImages.value ? "Starting..." : "Fetch Missing Images",
        icon: "pi pi-images",
        severity: "help",
        class: "mt-auto self-start"
      }, null, _parent));
      _push(`<p class="text-sm text-gray-400 mt-3 flex items-center gap-1"><i class="pi pi-clock"></i>Takes about 1-2 minutes to finish. </p></div></div>`);
      _push(ssrRenderComponent(_sfc_main$2, {
        ref_key: "dialogRef",
        ref: dialogRef,
        onSaved
      }, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/items/ManageItemsTab.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=ManageItemsTab-BAz9zwdY.js.map
