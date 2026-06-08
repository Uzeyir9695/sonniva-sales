import { mergeProps, unref, withCtx, createVNode, openBlock, createBlock, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent, ssrRenderAttr, ssrInterpolate } from "vue/server-renderer";
import { Link } from "@inertiajs/vue3";
const _sfc_main = {
  __name: "SubcategoryStrip",
  __ssrInlineRender: true,
  props: {
    categories: { type: Array, required: true }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "bg-white border-b border-gray-100" }, _attrs))}><div class="max-w-screen-2xl max-sm:px-3 py-5"><div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-9 gap-2 sm:gap-3"><!--[-->`);
      ssrRenderList(__props.categories, (cat) => {
        _push(ssrRenderComponent(unref(Link), {
          key: cat.slug,
          href: _ctx.route("items.index", [cat.slug]),
          class: "group flex flex-col items-center gap-2.5 p-1 sm:p-2 rounded-2xl transition-all duration-200 hover:bg-gray-50"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="w-full aspect-square rounded-xl overflow-hidden bg-gray-50 ring-1 ring-gray-100 flex items-center justify-center p-2.5 group-hover:ring-brand-300 group-hover:bg-brand-50/30 group-hover:shadow-md transition-all duration-200"${_scopeId}>`);
              if (cat.image) {
                _push2(`<img${ssrRenderAttr("src", `/storage/categories/${cat.image}`)}${ssrRenderAttr("alt", cat.name)} loading="lazy" class="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"${_scopeId}>`);
              } else {
                _push2(`<i class="pi pi-tag text-2xl text-gray-300"${_scopeId}></i>`);
              }
              _push2(`</div><span class="w-full text-center text-[11px] sm:text-xs font-medium leading-snug text-gray-600 group-hover:text-brand-500 transition-colors duration-200 line-clamp-2"${_scopeId}>${ssrInterpolate(cat.name)}</span>`);
            } else {
              return [
                createVNode("div", { class: "w-full aspect-square rounded-xl overflow-hidden bg-gray-50 ring-1 ring-gray-100 flex items-center justify-center p-2.5 group-hover:ring-brand-300 group-hover:bg-brand-50/30 group-hover:shadow-md transition-all duration-200" }, [
                  cat.image ? (openBlock(), createBlock("img", {
                    key: 0,
                    src: `/storage/categories/${cat.image}`,
                    alt: cat.name,
                    loading: "lazy",
                    class: "w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                  }, null, 8, ["src", "alt"])) : (openBlock(), createBlock("i", {
                    key: 1,
                    class: "pi pi-tag text-2xl text-gray-300"
                  }))
                ]),
                createVNode("span", { class: "w-full text-center text-[11px] sm:text-xs font-medium leading-snug text-gray-600 group-hover:text-brand-500 transition-colors duration-200 line-clamp-2" }, toDisplayString(cat.name), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div></div></section>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Items/SubcategoryStrip.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=SubcategoryStrip-D0niMR5J.js.map
