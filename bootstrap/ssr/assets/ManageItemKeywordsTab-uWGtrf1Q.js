import { s as script$1 } from "./index-DeojRqsd.js";
import { s as script } from "./index-YvTnrAwi.js";
import { ref, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderAttr } from "vue/server-renderer";
import { useHttp, router } from "@inertiajs/vue3";
import { u as useToast } from "./index-Qb24q4w2.js";
import { useDebounceFn } from "@vueuse/core";
import _sfc_main$1 from "./PrimeInputText-BlIRrCdA.js";
import "@primeuix/utils";
import "@primevue/core/baseinput";
import "@primeuix/styles/textarea";
import "@primevue/core/base/style";
import "@primeuix/utils/object";
import "@primevue/icons/spinner";
import "@primevue/core/basecomponent";
import "@primeuix/styles/badge";
import "@primeuix/utils/dom";
import "@primevue/core/basedirective";
import "@primeuix/styles/ripple";
import "@primeuix/styles/button";
import "./index-BAgOeBfa.js";
import "@primeuix/styles/inputtext";
const _sfc_main = {
  __name: "ManageItemKeywordsTab",
  __ssrInlineRender: true,
  setup(__props) {
    const toast = useToast();
    const flagMap = {
      en: "https://flagcdn.com/w40/gb.png",
      ru: "https://flagcdn.com/w40/ru.png",
      tr: "https://flagcdn.com/w40/tr.png"
    };
    const categorySearch = useHttp({ q: "" });
    const categoryResults = ref([]);
    const debouncedCategorySearch = useDebounceFn(() => {
      categorySearch.get(route("admin.categories.search"), {
        onSuccess: (data) => {
          categoryResults.value = data;
        },
        onError: () => {
          categoryResults.value = [];
        }
      });
    }, 400);
    function onCategorySearchInput() {
      if (categorySearch.q.trim().length < 2) {
        categoryResults.value = [];
        return;
      }
      debouncedCategorySearch();
    }
    const selectedCategory = ref(null);
    const savingKeywords = ref(false);
    const keywords = useHttp({ en_keywords: "", ru_keywords: "", tr_keywords: "" });
    function changeCategory() {
      selectedCategory.value = null;
      keywords.en_keywords = "";
      keywords.ru_keywords = "";
      keywords.tr_keywords = "";
    }
    function saveKeywords() {
      savingKeywords.value = true;
      router.post(route("admin.categories.keywords.update", selectedCategory.value.id), {
        en_keywords: keywords.en_keywords,
        ru_keywords: keywords.ru_keywords,
        tr_keywords: keywords.tr_keywords
      }, {
        preserveScroll: true,
        onSuccess: (res) => {
          toast.add({ severity: "success", summary: "Saved", detail: res.props.flash.message, life: 4e3 });
        },
        onError: () => {
          toast.add({ severity: "error", summary: "Error", detail: "Could not save the keywords, please try again.", life: 4e3 });
        },
        onFinish: () => {
          savingKeywords.value = false;
        }
      });
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Button = script;
      const _component_Textarea = script$1;
      _push(`<div${ssrRenderAttrs(_attrs)}><h2 class="text-base font-bold text-gray-900 mb-1">Manage Item Keywords</h2><p class="text-sm text-gray-500 mb-4"> Search for a category by name or code, then set search keywords for it in each language. Saving assigns those keywords to every item in that category and its sub-categories. Keywords are only used to match the navbar search - they are never shown to customers. </p>`);
      if (!selectedCategory.value) {
        _push(`<!--[--><span class="relative inline-block w-full sm:w-96"><i class="pi pi-search text-gray-400 text-sm absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"></i>`);
        _push(ssrRenderComponent(_sfc_main$1, {
          modelValue: unref(categorySearch).q,
          "onUpdate:modelValue": ($event) => unref(categorySearch).q = $event,
          onInput: onCategorySearchInput,
          placeholder: "Search by category name or code...",
          class: "w-full pl-9! rounded-lg!"
        }, null, _parent));
        _push(`</span>`);
        if (unref(categorySearch).processing) {
          _push(`<div class="flex items-center gap-2 text-sm text-gray-400 mt-4"><i class="pi pi-spinner pi-spin"></i> Searching... </div>`);
        } else if (unref(categorySearch).q.trim().length >= 2 && categoryResults.value.length === 0) {
          _push(`<div class="text-sm text-gray-400 mt-4"> No categories found for &quot;${ssrInterpolate(unref(categorySearch).q)}&quot;. </div>`);
        } else if (categoryResults.value.length) {
          _push(`<ul class="divide-y divide-gray-100 mt-4"><!--[-->`);
          ssrRenderList(categoryResults.value, (category) => {
            _push(`<li class="flex items-center gap-3 py-3 cursor-pointer hover:bg-gray-50 rounded-lg px-2 -mx-2"><div class="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 shrink-0">`);
            if (category.image) {
              _push(`<img${ssrRenderAttr("src", `/storage/categories/${category.image}`)}${ssrRenderAttr("alt", category.name)} class="w-full h-full object-cover">`);
            } else {
              _push(`<div class="w-full h-full flex items-center justify-center"><i class="pi pi-image text-gray-300 text-sm"></i></div>`);
            }
            _push(`</div><div class="flex-1 min-w-0"><p class="text-sm font-medium text-gray-800 truncate">${ssrInterpolate(category.name)}</p><p class="text-xs text-gray-400 font-mono">${ssrInterpolate(category.code)}</p></div><i class="pi pi-chevron-right text-gray-300 text-sm"></i></li>`);
          });
          _push(`<!--]--></ul>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      } else {
        _push(`<!--[--><div class="flex items-center gap-3 rounded-2xl border-2 border-indigo-200 bg-indigo-50/50 p-4 mb-4"><div class="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 shrink-0">`);
        if (selectedCategory.value.image) {
          _push(`<img${ssrRenderAttr("src", `/storage/categories/${selectedCategory.value.image}`)}${ssrRenderAttr("alt", selectedCategory.value.name)} class="w-full h-full object-cover">`);
        } else {
          _push(`<div class="w-full h-full flex items-center justify-center"><i class="pi pi-image text-gray-300 text-sm"></i></div>`);
        }
        _push(`</div><div class="flex-1 min-w-0"><p class="text-sm font-medium text-gray-800 truncate">${ssrInterpolate(selectedCategory.value.name)}</p><p class="text-xs text-gray-400 font-mono">${ssrInterpolate(selectedCategory.value.code)}</p></div>`);
        _push(ssrRenderComponent(_component_Button, {
          label: "Change Category",
          icon: "pi pi-arrow-left",
          size: "small",
          severity: "secondary",
          outlined: "",
          onClick: changeCategory
        }, null, _parent));
        _push(`</div>`);
        if (unref(keywords).processing) {
          _push(`<div class="flex items-center gap-2 text-sm text-gray-400"><i class="pi pi-spinner pi-spin"></i> Loading keywords... </div>`);
        } else {
          _push(`<div class="space-y-4"><div><label class="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-1"><img${ssrRenderAttr("src", flagMap.en)} class="w-5 h-3.5 object-cover rounded-xs shrink-0" alt=""> English keywords </label>`);
          _push(ssrRenderComponent(_component_Textarea, {
            modelValue: unref(keywords).en_keywords,
            "onUpdate:modelValue": ($event) => unref(keywords).en_keywords = $event,
            rows: "3",
            class: "w-full rounded-xl text-sm",
            placeholder: "e.g. slides, door lock, handle"
          }, null, _parent));
          _push(`</div><div><label class="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-1"><img${ssrRenderAttr("src", flagMap.ru)} class="w-5 h-3.5 object-cover rounded-xs shrink-0" alt=""> Russian keywords </label>`);
          _push(ssrRenderComponent(_component_Textarea, {
            modelValue: unref(keywords).ru_keywords,
            "onUpdate:modelValue": ($event) => unref(keywords).ru_keywords = $event,
            rows: "3",
            class: "w-full rounded-xl text-sm",
            placeholder: "e.g. слайды, дверной замок, ручка"
          }, null, _parent));
          _push(`</div><div><label class="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-1"><img${ssrRenderAttr("src", flagMap.tr)} class="w-5 h-3.5 object-cover rounded-xs shrink-0" alt=""> Turkish keywords </label>`);
          _push(ssrRenderComponent(_component_Textarea, {
            modelValue: unref(keywords).tr_keywords,
            "onUpdate:modelValue": ($event) => unref(keywords).tr_keywords = $event,
            rows: "3",
            class: "w-full rounded-xl text-sm",
            placeholder: "e.g. sürgü, kapı kilidi, kol"
          }, null, _parent));
          _push(`</div>`);
          _push(ssrRenderComponent(_component_Button, {
            loading: savingKeywords.value,
            onClick: saveKeywords,
            label: savingKeywords.value ? "Saving..." : "Save Keywords",
            icon: "pi pi-save",
            severity: "success"
          }, null, _parent));
          _push(`</div>`);
        }
        _push(`<!--]-->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/items/ManageItemKeywordsTab.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=ManageItemKeywordsTab-uWGtrf1Q.js.map
