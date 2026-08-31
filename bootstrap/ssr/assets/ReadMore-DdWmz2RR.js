import { unref, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr } from "vue/server-renderer";
import { Head } from "@inertiajs/vue3";
const _sfc_main = {
  __name: "ReadMore",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: _ctx.$t("seo.aboutTitle")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<meta name="description"${ssrRenderAttr("content", _ctx.$t("seo.aboutDescription"))}${_scopeId}><meta property="og:type" content="website"${_scopeId}><meta property="og:site_name" content="Sonniva"${_scopeId}><meta property="og:title"${ssrRenderAttr("content", `${_ctx.$t("seo.aboutTitle")} - Sonniva`)}${_scopeId}><meta property="og:description"${ssrRenderAttr("content", _ctx.$t("seo.aboutDescription"))}${_scopeId}><meta property="og:url"${ssrRenderAttr("content", _ctx.$page.props.ziggy.location)}${_scopeId}><meta property="og:image"${ssrRenderAttr("content", `${_ctx.$page.props.ziggy.url}/logo/logo.png`)}${_scopeId}>`);
          } else {
            return [
              createVNode("meta", {
                name: "description",
                content: _ctx.$t("seo.aboutDescription")
              }, null, 8, ["content"]),
              createVNode("meta", {
                property: "og:type",
                content: "website"
              }),
              createVNode("meta", {
                property: "og:site_name",
                content: "Sonniva"
              }),
              createVNode("meta", {
                property: "og:title",
                content: `${_ctx.$t("seo.aboutTitle")} - Sonniva`
              }, null, 8, ["content"]),
              createVNode("meta", {
                property: "og:description",
                content: _ctx.$t("seo.aboutDescription")
              }, null, 8, ["content"]),
              createVNode("meta", {
                property: "og:url",
                content: _ctx.$page.props.ziggy.location
              }, null, 8, ["content"]),
              createVNode("meta", {
                property: "og:image",
                content: `${_ctx.$page.props.ziggy.url}/logo/logo.png`
              }, null, 8, ["content"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="min-h-screen bg-white"> Read More Page </div><!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Home/ReadMore.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=ReadMore-DdWmz2RR.js.map
