import { mergeProps, unref, useSSRContext, ref } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent, ssrRenderClass } from "vue/server-renderer";
import { s as script } from "./index-CvFud99G.js";
import { _ as _sfc_main$3 } from "./Paginate-DBEcn-DS.js";
import { a as _sfc_main$4 } from "./QuickViewDialog-CIKmxF1N.js";
import { _ as _sfc_main$2 } from "./ItemCard-C4_20oFF.js";
const _sfc_main$1 = {
  __name: "GridSkeletonLoader",
  __ssrInlineRender: true,
  props: {
    isSalePage: { type: Boolean, default: false }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-4", __props.isSalePage ? "xl:grid-cols-5 3xl:grid-cols-6" : "xl:grid-cols-4 3xl:grid-cols-5"]
      }, _attrs))}><!--[-->`);
      ssrRenderList(24, (item) => {
        _push(`<div class="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm flex flex-col"><div class="relative w-full aspect-square">`);
        _push(ssrRenderComponent(unref(script), {
          class: "absolute! inset-0! w-full! h-full!",
          borderRadius: "0"
        }, null, _parent));
        _push(`</div><div class="flex gap-1 px-3 py-2 bg-gray-100 border-t border-gray-200"><!--[-->`);
        ssrRenderList(3, (n) => {
          _push(`<div class="h-[3px] flex-1 rounded-full bg-gray-200"></div>`);
        });
        _push(`<!--]--></div><div class="p-3 sm:p-4 flex flex-col flex-1 gap-2">`);
        _push(ssrRenderComponent(unref(script), {
          height: "0.75rem",
          width: "90%",
          borderRadius: "4px"
        }, null, _parent));
        _push(ssrRenderComponent(unref(script), {
          height: "0.75rem",
          width: "55%",
          borderRadius: "4px"
        }, null, _parent));
        _push(`<div class="mt-auto pt-2 flex items-center justify-between gap-2">`);
        _push(ssrRenderComponent(unref(script), {
          height: "1.25rem",
          width: "4rem",
          borderRadius: "4px"
        }, null, _parent));
        _push(ssrRenderComponent(unref(script), {
          height: "1.75rem",
          width: "3.5rem",
          borderRadius: "10px"
        }, null, _parent));
        _push(`</div></div></div>`);
      });
      _push(`<!--]--></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Shared/skeletonLoaders/GridSkeletonLoader.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "ItemsGrid",
  __ssrInlineRender: true,
  props: {
    items: { type: Object, required: true },
    isOrderOnly: { type: Boolean, default: false },
    isSalePage: { type: Boolean, default: false }
  },
  emits: ["quick-view"],
  setup(__props) {
    const quickViewItem = ref(null);
    const quickViewOpen = ref(false);
    function openQuickView(item) {
      quickViewItem.value = item;
      quickViewOpen.value = true;
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      if (__props.items.data?.length > 0) {
        _push(`<div><div class="${ssrRenderClass([__props.isSalePage ? "xl:grid-cols-5 3xl:grid-cols-6" : "xl:grid-cols-4 3xl:grid-cols-5", "grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-4"])}"><!--[-->`);
        ssrRenderList(__props.items.data, (item, index) => {
          _push(ssrRenderComponent(_sfc_main$2, {
            key: index,
            item,
            "is-order-only": __props.isOrderOnly,
            onQuickView: openQuickView
          }, null, _parent));
        });
        _push(`<!--]--></div>`);
        _push(ssrRenderComponent(_sfc_main$3, {
          data: __props.items,
          class: "mt-8"
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<div class="flex flex-col items-center justify-center h-72 text-center"><div class="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4"><i class="pi pi-th-large text-3xl text-gray-300"></i></div><h3 class="text-lg font-medium text-gray-500">პროდუქტი არ მოიძებნა</h3></div>`);
      }
      _push(ssrRenderComponent(_sfc_main$4, {
        visible: quickViewOpen.value,
        "onUpdate:visible": ($event) => quickViewOpen.value = $event,
        item: quickViewItem.value
      }, null, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Shared/components/ItemsGrid.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main$1 as _,
  _sfc_main as a
};
//# sourceMappingURL=ItemsGrid-DOb_VOli.js.map
