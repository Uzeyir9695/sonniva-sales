import { resolveComponent, unref, withCtx, createVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr } from "vue/server-renderer";
import { Head } from "@inertiajs/vue3";
const GOOGLE_PRIVACY_URL = "https://policies.google.com/privacy";
const GA_OPT_OUT_URL = "https://tools.google.com/dlpage/gaoptout";
const _sfc_main = {
  __name: "CookiePolicy",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_i18n_t = resolveComponent("i18n-t");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: _ctx.$t("pol.cookie.title")
      }, null, _parent));
      _push(`<div class="max-w-3xl mx-auto py-12 px-6 text-gray-800"><h1 class="text-3xl font-bold mb-6">${ssrInterpolate(_ctx.$t("pol.cookie.title"))}</h1><p class="text-sm text-gray-500 mb-6">${ssrInterpolate(_ctx.$t("pol.cookie.lastUpdated"))}</p><p class="mb-4">${ssrInterpolate(_ctx.$t("pol.cookie.intro"))}</p><h2 class="text-xl font-semibold mt-8 mb-3">${ssrInterpolate(_ctx.$t("pol.cookie.whatH"))}</h2><p class="mb-4">${ssrInterpolate(_ctx.$t("pol.cookie.whatP"))}</p><h2 class="text-xl font-semibold mt-8 mb-3">${ssrInterpolate(_ctx.$t("pol.cookie.useH"))}</h2><div class="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-4"><div><h3 class="font-semibold">${ssrInterpolate(_ctx.$t("pol.cookie.c1h"))}</h3><p class="text-gray-700">${ssrInterpolate(_ctx.$t("pol.cookie.c1p"))}</p><ul class="list-disc ml-6 mt-2 text-gray-700"><li>${ssrInterpolate(_ctx.$t("pol.cookie.c1i1"))}</li><li>${ssrInterpolate(_ctx.$t("pol.cookie.c1i2"))}</li></ul></div><div><h3 class="font-semibold">${ssrInterpolate(_ctx.$t("pol.cookie.c2h"))}</h3><p class="text-gray-700">${ssrInterpolate(_ctx.$t("pol.cookie.c2p1"))}</p>`);
      _push(ssrRenderComponent(_component_i18n_t, {
        keypath: "pol.cookie.c2p2",
        tag: "p",
        class: "mt-2 text-gray-700"
      }, {
        strong: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<strong${_scopeId}>${ssrInterpolate(_ctx.$t("pol.cookie.c2p2strong"))}</strong>`);
          } else {
            return [
              createVNode("strong", null, toDisplayString(_ctx.$t("pol.cookie.c2p2strong")), 1)
            ];
          }
        }),
        link: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<a${ssrRenderAttr("href", GOOGLE_PRIVACY_URL)} class="text-blue-600 underline" target="_blank" rel="noopener"${_scopeId}>${ssrInterpolate(_ctx.$t("pol.cookie.googlePrivacyDat"))}</a>`);
          } else {
            return [
              createVNode("a", {
                href: GOOGLE_PRIVACY_URL,
                class: "text-blue-600 underline",
                target: "_blank",
                rel: "noopener"
              }, toDisplayString(_ctx.$t("pol.cookie.googlePrivacyDat")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div><h3 class="font-semibold">${ssrInterpolate(_ctx.$t("pol.cookie.c3h"))}</h3><p class="text-gray-700">${ssrInterpolate(_ctx.$t("pol.cookie.c3p1"))}</p><table class="w-full mt-2 text-sm text-gray-700 border border-gray-200 rounded"><thead class="bg-gray-100"><tr><th class="text-left px-3 py-2">${ssrInterpolate(_ctx.$t("pol.cookie.thCookie"))}</th><th class="text-left px-3 py-2">${ssrInterpolate(_ctx.$t("pol.cookie.thPurpose"))}</th><th class="text-left px-3 py-2">${ssrInterpolate(_ctx.$t("pol.cookie.thExpiry"))}</th></tr></thead><tbody><tr class="border-t border-gray-200"><td class="px-3 py-2 font-mono">_GRECAPTCHA</td><td class="px-3 py-2">${ssrInterpolate(_ctx.$t("pol.cookie.grecaptchaPurpose"))}</td><td class="px-3 py-2">${ssrInterpolate(_ctx.$t("pol.cookie.sixMonths"))}</td></tr></tbody></table>`);
      _push(ssrRenderComponent(_component_i18n_t, {
        keypath: "pol.cookie.c3p2",
        tag: "p",
        class: "mt-3 text-gray-700"
      }, {
        link: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<a${ssrRenderAttr("href", GOOGLE_PRIVACY_URL)} class="text-blue-600 underline" target="_blank" rel="noopener"${_scopeId}>${ssrInterpolate(_ctx.$t("pol.cookie.googlePrivacyDat"))}</a>`);
          } else {
            return [
              createVNode("a", {
                href: GOOGLE_PRIVACY_URL,
                class: "text-blue-600 underline",
                target: "_blank",
                rel: "noopener"
              }, toDisplayString(_ctx.$t("pol.cookie.googlePrivacyDat")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div><h3 class="font-semibold">${ssrInterpolate(_ctx.$t("pol.cookie.c4h"))}</h3><p class="text-gray-700">${ssrInterpolate(_ctx.$t("pol.cookie.c4p1"))}</p><p class="mt-2 text-gray-700">${ssrInterpolate(_ctx.$t("pol.cookie.c4p2"))}</p><table class="w-full mt-2 text-sm text-gray-700 border border-gray-200 rounded"><thead class="bg-gray-100"><tr><th class="text-left px-3 py-2">${ssrInterpolate(_ctx.$t("pol.cookie.thCookie"))}</th><th class="text-left px-3 py-2">${ssrInterpolate(_ctx.$t("pol.cookie.thPurpose"))}</th><th class="text-left px-3 py-2">${ssrInterpolate(_ctx.$t("pol.cookie.thExpiry"))}</th></tr></thead><tbody><tr class="border-t border-gray-200"><td class="px-3 py-2 font-mono">_ga</td><td class="px-3 py-2">${ssrInterpolate(_ctx.$t("pol.cookie.gaPurpose"))}</td><td class="px-3 py-2">${ssrInterpolate(_ctx.$t("pol.cookie.twoYears"))}</td></tr><tr class="border-t border-gray-200"><td class="px-3 py-2 font-mono">_gid</td><td class="px-3 py-2">${ssrInterpolate(_ctx.$t("pol.cookie.gaPurpose"))}</td><td class="px-3 py-2">${ssrInterpolate(_ctx.$t("pol.cookie.twentyFourHours"))}</td></tr><tr class="border-t border-gray-200"><td class="px-3 py-2 font-mono">_ga_*</td><td class="px-3 py-2">${ssrInterpolate(_ctx.$t("pol.cookie.gaSessionPurpose"))}</td><td class="px-3 py-2">${ssrInterpolate(_ctx.$t("pol.cookie.twoYears"))}</td></tr></tbody></table>`);
      _push(ssrRenderComponent(_component_i18n_t, {
        keypath: "pol.cookie.c4p3",
        tag: "p",
        class: "mt-3 text-gray-700"
      }, {
        link: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<a${ssrRenderAttr("href", GOOGLE_PRIVACY_URL)} class="text-blue-600 underline" target="_blank" rel="noopener"${_scopeId}>${ssrInterpolate(_ctx.$t("pol.cookie.googlePrivacyNom"))}</a>`);
          } else {
            return [
              createVNode("a", {
                href: GOOGLE_PRIVACY_URL,
                class: "text-blue-600 underline",
                target: "_blank",
                rel: "noopener"
              }, toDisplayString(_ctx.$t("pol.cookie.googlePrivacyNom")), 1)
            ];
          }
        }),
        link2: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<a${ssrRenderAttr("href", GA_OPT_OUT_URL)} class="text-blue-600 underline" target="_blank" rel="noopener"${_scopeId}>${ssrInterpolate(_ctx.$t("pol.cookie.gaOptOut"))}</a>`);
          } else {
            return [
              createVNode("a", {
                href: GA_OPT_OUT_URL,
                class: "text-blue-600 underline",
                target: "_blank",
                rel: "noopener"
              }, toDisplayString(_ctx.$t("pol.cookie.gaOptOut")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><h2 class="text-xl font-semibold mt-8 mb-3">${ssrInterpolate(_ctx.$t("pol.cookie.manageH"))}</h2><p class="mb-4">${ssrInterpolate(_ctx.$t("pol.cookie.manageP1"))}</p><p class="text-gray-700">${ssrInterpolate(_ctx.$t("pol.cookie.manageP2"))}</p></div><!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Policies/CookiePolicy.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=CookiePolicy-BkpF6_RT.js.map
