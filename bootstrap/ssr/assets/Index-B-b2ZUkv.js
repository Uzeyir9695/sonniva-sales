import { unref, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { Head } from "@inertiajs/vue3";
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: _ctx.$t("pol.about.title")
      }, null, _parent));
      _push(`<div class="max-w-3xl mx-auto px-4 py-10 sm:py-16"><div class="mb-10 border-b border-gray-200 pb-6"><h1 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">${ssrInterpolate(_ctx.$t("pol.about.title"))}</h1></div><div class="space-y-6 text-gray-700 text-[15px] leading-8"><!--[-->`);
      ssrRenderList(6, (n) => {
        _push(`<p>${ssrInterpolate(_ctx.$t(`pol.about.p${n}`))}</p>`);
      });
      _push(`<!--]--><div class="mt-8 pt-6 border-t border-gray-200"><p class="text-base font-semibold text-brand-600">${ssrInterpolate(_ctx.$t("pol.about.tagline"))}</p></div></div></div><!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/about-us/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=Index-B-b2ZUkv.js.map
