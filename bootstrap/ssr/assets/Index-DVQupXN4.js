import { s as script } from "./index-hSjFFc9a.js";
import { ref, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { router } from "@inertiajs/vue3";
import { u as useToast } from "./index-Qb24q4w2.js";
import { _ as _sfc_main$1 } from "./AdminLayout-C3O66_bl.js";
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
import "./index-Bx-IICPF.js";
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
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./index-C3Ts-4IM.js";
import "@primeuix/utils/uuid";
import "@primevue/core/utils";
import "@primeuix/styles/tooltip";
import "axios";
import "./QuickViewDialog--IPmfhAf.js";
import "./index-nsBhLTBN.js";
import "@primevue/icons/windowmaximize";
import "@primevue/icons/windowminimize";
import "@primeuix/styled";
import "@primeuix/styles/dialog";
import "./useCart-CIcsIaQl.js";
import "./usePricing-HxfzG07E.js";
import "@primeuix/styles/confirmdialog";
const _sfc_main = /* @__PURE__ */ Object.assign({ layout: _sfc_main$1 }, {
  __name: "Index",
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
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Button = script;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "p-4 sm:p-6 space-y-4" }, _attrs))}><h1 class="text-xl font-bold text-gray-900">Manage Items</h1><div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6"><h2 class="text-base font-bold text-gray-900 mb-1">Sync Categories</h2><p class="text-sm text-gray-500 mb-4"> Updates the category structure and item category codes from Business Central. </p>`);
      _push(ssrRenderComponent(_component_Button, {
        loading: syncingCategories.value,
        onClick: syncCategories,
        label: syncingCategories.value ? "Syncing..." : "Sync Now",
        icon: "pi pi-refresh"
      }, null, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/items/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=Index-DVQupXN4.js.map
