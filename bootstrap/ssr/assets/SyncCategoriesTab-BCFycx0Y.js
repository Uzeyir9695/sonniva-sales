import { s as script } from "./index-YvTnrAwi.js";
import { ref, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderAttr } from "vue/server-renderer";
import { router } from "@inertiajs/vue3";
import { u as useToast } from "./index-Qb24q4w2.js";
import axios from "axios";
import _sfc_main$1 from "./PrimeInputText-BlIRrCdA.js";
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
const _sfc_main = {
  __name: "SyncCategoriesTab",
  __ssrInlineRender: true,
  setup(__props) {
    const toast = useToast();
    const syncingCategories = ref(false);
    function syncCategories() {
      syncingCategories.value = true;
      router.post(route("admin.items.sync-category"), {}, {
        preserveScroll: true,
        onSuccess: (res) => {
          toast.add({ severity: "success", summary: "Started", detail: res.props.flash.message, life: 4e3 });
        },
        onError: () => {
          toast.add({ severity: "error", summary: "Error", detail: "Could not start the sync, please try again.", life: 4e3 });
        },
        onFinish: () => {
          syncingCategories.value = false;
        }
      });
    }
    const categoryQuery = ref("");
    const categoryResults = ref([]);
    const searchingCategories = ref(false);
    const fetchingCategoryImageId = ref(null);
    let categoryDebounceTimer = null;
    function categoryImageUrl(category) {
      return `/storage/categories/${category.image}`;
    }
    async function runCategorySearch(q) {
      searchingCategories.value = true;
      try {
        const res = await axios.get(route("admin.categories.search"), { params: { q } });
        categoryResults.value = res.data;
      } catch {
        categoryResults.value = [];
      } finally {
        searchingCategories.value = false;
      }
    }
    function onCategorySearchInput() {
      clearTimeout(categoryDebounceTimer);
      const q = categoryQuery.value.trim();
      if (q.length < 2) {
        categoryResults.value = [];
        searchingCategories.value = false;
        return;
      }
      categoryDebounceTimer = setTimeout(() => runCategorySearch(q), 400);
    }
    function fetchCategoryImage(category) {
      fetchingCategoryImageId.value = category.id;
      router.post(route("admin.categories.fetch-image", category.id), {}, {
        preserveScroll: true,
        onSuccess: (res) => {
          toast.add({ severity: "success", summary: "Updated", detail: res.props.flash.message, life: 3e3 });
          if (categoryQuery.value.trim().length >= 2) runCategorySearch(categoryQuery.value.trim());
        },
        onError: (errors) => {
          toast.add({ severity: "error", summary: "Error", detail: errors?.message ?? "Could not fetch the image, please try again.", life: 4e3 });
        },
        onFinish: () => {
          fetchingCategoryImageId.value = null;
        }
      });
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Button = script;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "grid grid-cols-1 sm:grid-cols-2 gap-4" }, _attrs))}><div class="flex flex-col rounded-2xl border-2 border-teal-200 bg-teal-50/50 p-5"><div class="w-10 h-10 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center mb-3"><i class="pi pi-sitemap"></i></div><h2 class="text-base font-bold text-gray-900 mb-1">Sync Categories</h2><p class="text-sm text-gray-500 mb-4"> Updates the category structure and item category codes from Business Central. </p>`);
      _push(ssrRenderComponent(_component_Button, {
        loading: syncingCategories.value,
        onClick: syncCategories,
        label: syncingCategories.value ? "Updating..." : "Update Now",
        icon: "pi pi-refresh",
        severity: "success",
        class: "mt-auto self-start"
      }, null, _parent));
      _push(`<p class="text-sm text-gray-400 mt-3 flex items-center gap-1"><i class="pi pi-clock"></i>Takes about 1-2 minutes to finish. </p></div><div class="flex flex-col rounded-2xl border-2 border-pink-200 bg-pink-50/50 p-5"><div class="w-10 h-10 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center mb-3"><i class="pi pi-image"></i></div><h2 class="text-base font-bold text-gray-900 mb-1">Category Photo</h2><p class="text-sm text-gray-500 mb-4"> Search for a category by name or code and pull its latest photo from Business Central. The previous photo is deleted once the new one is saved. </p><span class="relative inline-block w-full"><i class="pi pi-search text-gray-400 text-sm absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"></i>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        modelValue: categoryQuery.value,
        "onUpdate:modelValue": ($event) => categoryQuery.value = $event,
        onInput: onCategorySearchInput,
        placeholder: "Search by category name or code...",
        class: "w-full pl-9! rounded-lg!"
      }, null, _parent));
      _push(`</span>`);
      if (searchingCategories.value) {
        _push(`<div class="flex items-center gap-2 text-sm text-gray-400 mt-4"><i class="pi pi-spinner pi-spin"></i> Searching... </div>`);
      } else if (categoryQuery.value.trim().length >= 2 && categoryResults.value.length === 0) {
        _push(`<div class="text-sm text-gray-400 mt-4"> No categories found for &quot;${ssrInterpolate(categoryQuery.value)}&quot;. </div>`);
      } else if (categoryResults.value.length) {
        _push(`<ul class="divide-y divide-pink-100 mt-4"><!--[-->`);
        ssrRenderList(categoryResults.value, (category) => {
          _push(`<li class="flex items-center gap-3 py-3"><div class="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 shrink-0">`);
          if (category.image) {
            _push(`<img${ssrRenderAttr("src", categoryImageUrl(category))}${ssrRenderAttr("alt", category.name)} class="w-full h-full object-cover">`);
          } else {
            _push(`<div class="w-full h-full flex items-center justify-center"><i class="pi pi-image text-gray-300 text-sm"></i></div>`);
          }
          _push(`</div><div class="flex-1 min-w-0"><p class="text-sm font-medium text-gray-800 truncate">${ssrInterpolate(category.name)}</p><p class="text-xs text-gray-400 font-mono">${ssrInterpolate(category.code)}</p></div>`);
          _push(ssrRenderComponent(_component_Button, {
            label: "Update Image",
            icon: "pi pi-refresh",
            size: "small",
            severity: "secondary",
            outlined: "",
            loading: fetchingCategoryImageId.value === category.id,
            onClick: ($event) => fetchCategoryImage(category)
          }, null, _parent));
          _push(`</li>`);
        });
        _push(`<!--]--></ul>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/items/SyncCategoriesTab.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=SyncCategoriesTab-BCFycx0Y.js.map
