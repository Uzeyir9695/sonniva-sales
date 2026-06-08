import { s as script } from "./index-CvFud99G.js";
import { mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrRenderStyle, ssrRenderComponent, ssrRenderClass } from "vue/server-renderer";
const rows = 8;
const _sfc_main = {
  __name: "TableSkeleton",
  __ssrInlineRender: true,
  setup(__props) {
    const columns = [
      { width: "3rem" },
      { width: "8rem" },
      { width: null, double: true },
      // flex, two lines (e.g. name + phone)
      { width: "6rem" },
      { width: "7rem" },
      { width: "6rem" },
      { width: "7rem" },
      { width: "7rem" },
      { width: "6rem" }
    ];
    const cellWidths = ["55%", "70%", "85%", "60%", "75%", "90%", "50%", "80%"];
    function cellWidth(colIndex, rowIndex) {
      return cellWidths[(colIndex + rowIndex * 3) % cellWidths.length];
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Skeleton = script;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "rounded-xl border border-gray-200 bg-white overflow-hidden shadow-sm mt-4" }, _attrs))}><div class="flex items-center gap-4 px-4 py-3 bg-gray-50 border-b border-gray-200"><!--[-->`);
      ssrRenderList(columns, (col, i) => {
        _push(`<div style="${ssrRenderStyle(col.width ? `width:${col.width};flex-shrink:0` : "flex:1")}">`);
        _push(ssrRenderComponent(_component_Skeleton, {
          height: "0.7rem",
          width: i === 0 ? "50%" : "70%",
          class: "bg-gray-200!",
          borderRadius: "4px"
        }, null, _parent));
        _push(`</div>`);
      });
      _push(`<!--]--></div><!--[-->`);
      ssrRenderList(rows, (row) => {
        _push(`<div class="${ssrRenderClass([
          "flex items-center gap-4 px-4 py-3 border-b border-gray-100 last:border-b-0",
          row % 2 === 0 ? "bg-white" : "bg-gray-50/40"
        ])}"><!--[-->`);
        ssrRenderList(columns, (col, i) => {
          _push(`<div style="${ssrRenderStyle(col.width ? `width:${col.width};flex-shrink:0` : "flex:1")}" class="flex flex-col gap-1.5">`);
          _push(ssrRenderComponent(_component_Skeleton, {
            height: "0.7rem",
            width: cellWidth(i, row),
            class: "bg-gray-200!",
            borderRadius: "4px"
          }, null, _parent));
          if (col.double) {
            _push(ssrRenderComponent(_component_Skeleton, {
              height: "0.6rem",
              width: "45%",
              class: "bg-gray-100!",
              borderRadius: "4px"
            }, null, _parent));
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        });
        _push(`<!--]--></div>`);
      });
      _push(`<!--]--></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Shared/components/TableSkeleton.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
//# sourceMappingURL=TableSkeleton-jtC7qFHK.js.map
