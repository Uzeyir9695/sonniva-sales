import { s as script } from "./index-BUhsrrXV.js";
import { mergeProps, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { router } from "@inertiajs/vue3";
const _sfc_main = {
  __name: "Paginate",
  __ssrInlineRender: true,
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  setup(__props) {
    const onPageChange = (event) => {
      const newPage = event.page + 1;
      const perPage = event.rows;
      router.get(
        route(route().current(), { ...route().params, page: newPage, per_page: perPage }),
        {},
        { preserveState: true }
      );
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Paginator = script;
      if (__props.data.total > __props.data.per_page) {
        _push(ssrRenderComponent(_component_Paginator, mergeProps({
          template: {
            "640px": "FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink",
            "641px": "FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink JumpToPageDropdown"
          },
          rows: __props.data.per_page,
          totalRecords: __props.data.total,
          first: (__props.data.current_page - 1) * __props.data.per_page,
          rowsPerPageOptions: [10, 15, 24, 30],
          onPage: onPageChange
        }, _attrs), null, _parent));
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Shared/components/Paginate.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
//# sourceMappingURL=Paginate-DBEcn-DS.js.map
