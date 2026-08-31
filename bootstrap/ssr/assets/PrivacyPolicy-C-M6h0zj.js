import { computed, unref, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass } from "vue/server-renderer";
import { Head } from "@inertiajs/vue3";
import { useI18n } from "vue-i18n";
const _sfc_main = {
  __name: "PrivacyPolicy",
  __ssrInlineRender: true,
  setup(__props) {
    const { tm, rt, locale } = useI18n();
    const sections = computed(() => {
      void locale.value;
      return tm("pol.privacy.sections").map((s) => ({
        h: rt(s.h),
        body: (s.body ?? []).map(rt),
        intro: s.intro ? rt(s.intro) : null,
        items: (s.items ?? []).map(rt),
        outro: s.outro ? rt(s.outro) : null
      }));
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: _ctx.$t("pol.privacy.title")
      }, null, _parent));
      _push(`<div class="max-w-3xl mx-auto px-4 py-10 sm:py-16"><div class="mb-10 border-b border-gray-200 pb-6"><h1 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">${ssrInterpolate(_ctx.$t("pol.privacy.title"))}</h1></div><div class="space-y-8 text-gray-700 text-[15px] leading-8"><!--[-->`);
      ssrRenderList(sections.value, (s, i) => {
        _push(`<section><h2 class="text-lg font-semibold text-gray-900 mb-3">${ssrInterpolate(s.h)}</h2><!--[-->`);
        ssrRenderList(s.body, (p, j) => {
          _push(`<p class="${ssrRenderClass({ "mt-3": j > 0 })}">${ssrInterpolate(p)}</p>`);
        });
        _push(`<!--]-->`);
        if (s.intro) {
          _push(`<p class="${ssrRenderClass([{ "mb-4": i === sections.value.length - 1 }, "mb-3"])}">${ssrInterpolate(s.intro)}</p>`);
        } else {
          _push(`<!---->`);
        }
        if (i === sections.value.length - 1) {
          _push(`<div class="rounded-xl border border-gray-200 p-4 space-y-1.5 text-sm"><p class="font-semibold text-gray-800">${ssrInterpolate(_ctx.$t("pol.privacy.contactCompany"))}</p><p>${ssrInterpolate(_ctx.$t("pol.privacy.contactEmailLabel"))} <a href="mailto:eshop@sonniva.ge" class="text-brand-600 hover:underline">eshop@sonniva.ge</a></p><p>${ssrInterpolate(_ctx.$t("pol.privacy.contactWebLabel"))} <a href="https://www.sonniva.ge" class="text-brand-600 hover:underline">www.sonniva.ge</a></p></div>`);
        } else {
          _push(`<!---->`);
        }
        if (s.items.length) {
          _push(`<ul class="${ssrRenderClass([{ "mb-3": s.outro }, "space-y-1.5"])}"><!--[-->`);
          ssrRenderList(s.items, (li, k) => {
            _push(`<li class="flex items-start gap-2"><span class="mt-2 w-1.5 h-1.5 rounded-full bg-brand-500 shrink-0"></span>${ssrInterpolate(li)}</li>`);
          });
          _push(`<!--]--></ul>`);
        } else {
          _push(`<!---->`);
        }
        if (s.outro) {
          _push(`<p class="${ssrRenderClass({ "mt-4": i === sections.value.length - 1 })}">${ssrInterpolate(s.outro)}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</section>`);
      });
      _push(`<!--]--></div></div><!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Policies/PrivacyPolicy.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=PrivacyPolicy-C-M6h0zj.js.map
