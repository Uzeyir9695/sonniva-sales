import { s as script } from "./index-YvTnrAwi.js";
import { ref, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
import { router } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./AdminLayout-BAGZgrnX.js";
import _sfc_main$3 from "./ManageItemDialog-B2zbvn2X.js";
import _sfc_main$2 from "./ItemsListing-BsD3wlP1.js";
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
import "./index-D_tUtrFw.js";
import "@primeuix/utils/zindex";
import "./index-zZrFrjQS.js";
import "@primeuix/utils/eventbus";
import "@primeuix/styles/toast";
import "@primevue/icons/check";
import "@primevue/icons/exclamationtriangle";
import "@primevue/icons/infocircle";
import "@primevue/icons/times";
import "@primevue/icons/timescircle";
import "vue-i18n";
import "@vueuse/core";
import "./categoryIcons-dDFpexsr.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./index-C3Ts-4IM.js";
import "@primeuix/utils/uuid";
import "@primevue/core/utils";
import "@primeuix/styles/tooltip";
import "axios";
import "./QuickViewDialog-N1KpTX5R.js";
import "./index-D46B4f3g.js";
import "@primevue/icons/windowmaximize";
import "@primevue/icons/windowminimize";
import "@primeuix/styled";
import "@primeuix/styles/dialog";
import "./useCart-CLT7fb2x.js";
import "./index-Qb24q4w2.js";
import "./usePricing-BqOIsB71.js";
import "@primeuix/styles/confirmdialog";
import "./PrimeInputText-BlIRrCdA.js";
import "./index-BAgOeBfa.js";
import "@primevue/core/baseinput";
import "@primeuix/styles/inputtext";
import "./index-BgiqKOW-.js";
import "@primevue/icons/angledown";
import "@primevue/icons/angleup";
import "@primeuix/styles/inputnumber";
import "./numberFormat-BgUHwZc2.js";
const _sfc_main = /* @__PURE__ */ Object.assign({ layout: _sfc_main$1 }, {
  __name: "DiscountedItems",
  __ssrInlineRender: true,
  props: {
    items: { type: Array, default: () => [] }
  },
  setup(__props) {
    const dialogRef = ref(null);
    function openManageDialog(item) {
      dialogRef.value.open(item);
    }
    function backToItems() {
      router.visit(route("admin.items.index"));
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Button = script;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "p-4 sm:p-6" }, _attrs))}><div class="flex items-center justify-between mb-1"><h1 class="text-xl font-bold text-gray-900">Managed Items</h1>`);
      _push(ssrRenderComponent(_component_Button, {
        label: "Back to Manage Items",
        icon: "pi pi-arrow-left",
        size: "small",
        severity: "secondary",
        outlined: "",
        onClick: backToItems
      }, null, _parent));
      _push(`</div><p class="text-sm text-gray-500 mb-4"> Items that currently have a discount or a video link assigned. Manage them directly here. </p><div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-6">`);
      if (!__props.items.length) {
        _push(`<div class="text-sm text-gray-400 py-4"> No items have a discount or video link assigned yet. </div>`);
      } else {
        _push(`<ul class="divide-y divide-gray-100"><!--[-->`);
        ssrRenderList(__props.items, (item) => {
          _push(ssrRenderComponent(_sfc_main$2, {
            key: item.id,
            item,
            onManage: openManageDialog
          }, null, _parent));
        });
        _push(`<!--]--></ul>`);
      }
      _push(`</div>`);
      _push(ssrRenderComponent(_sfc_main$3, {
        ref_key: "dialogRef",
        ref: dialogRef
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/items/DiscountedItems.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=DiscountedItems-t6zFCJWe.js.map
