import { s as script } from "./index-YvTnrAwi.js";
import { mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
import { router } from "@inertiajs/vue3";
import { u as useToast } from "./index-Qb24q4w2.js";
import _sfc_main$1 from "./HomeSectionCard-BRVwoASg.js";
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
import "./index-C3Ts-4IM.js";
import "@primeuix/utils/uuid";
import "@primeuix/utils/zindex";
import "@primevue/core/utils";
import "@primeuix/styles/tooltip";
import "./index-D46B4f3g.js";
import "@primevue/icons/times";
import "@primevue/icons/windowmaximize";
import "@primevue/icons/windowminimize";
import "./index-zZrFrjQS.js";
import "@primeuix/styled";
import "@primeuix/styles/dialog";
import "./index-DPwr32It.js";
import "@vueuse/core";
import "axios";
import "./PrimeInputText-BlIRrCdA.js";
import "./index-BAgOeBfa.js";
import "@primevue/core/baseinput";
import "@primeuix/styles/inputtext";
const _sfc_main = {
  __name: "HomeSectionsTab",
  __ssrInlineRender: true,
  props: {
    sections: { type: Array, default: () => [] }
  },
  setup(__props) {
    const toast = useToast();
    function createSection() {
      router.post(route("admin.home-page.sections.store"), {}, {
        preserveScroll: true,
        onSuccess: (res) => toast.add({ severity: "success", summary: "Section created", detail: res.props.flash.message, life: 3e3 })
      });
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Button = script;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-4" }, _attrs))}><div class="flex items-center justify-between"><p class="text-sm text-gray-500">Sections appear on the homepage after the hero banner, in the order they were created.</p>`);
      _push(ssrRenderComponent(_component_Button, {
        label: "New Section",
        icon: "pi pi-plus",
        onClick: createSection
      }, null, _parent));
      _push(`</div>`);
      if (!__props.sections.length) {
        _push(`<p class="text-sm text-gray-400 italic">No sections yet.</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="flex flex-col-reverse gap-4"><!--[-->`);
      ssrRenderList(__props.sections, (section, index) => {
        _push(ssrRenderComponent(_sfc_main$1, {
          key: section.id,
          section,
          index: index + 1
        }, null, _parent));
      });
      _push(`<!--]--></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/HomePage/HomeSectionsTab.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=HomeSectionsTab-DiOJLKFJ.js.map
