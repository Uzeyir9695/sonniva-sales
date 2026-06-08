import { ref, mergeProps, unref, withCtx, createVNode, openBlock, createBlock, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";
/* empty css                */
/* empty css                    */
import { a as _sfc_main$1 } from "./ItemCard-COhUmhAM.js";
import { a as _sfc_main$2 } from "./QuickViewDialog-DxRTEkkJ.js";
const _sfc_main = {
  __name: "SwiperCarousel",
  __ssrInlineRender: true,
  props: {
    items: Array,
    title: String,
    mousewheel: {
      type: Boolean,
      default: true
    }
  },
  setup(__props) {
    const modules = [Navigation, Pagination, Mousewheel, Keyboard];
    const quickViewItem = ref(null);
    const quickViewOpen = ref(false);
    function openQuickView(item) {
      quickViewItem.value = item;
      quickViewOpen.value = true;
    }
    return (_ctx, _push, _parent, _attrs) => {
      if (__props.items?.length) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "mt-10 px-4 mb-6" }, _attrs))}><h2 class="sm:text-lg font-semibold text-gray-800 mb-4">${ssrInterpolate(__props.title)}</h2>`);
        _push(ssrRenderComponent(unref(Swiper), {
          modules,
          "space-between": 16,
          navigation: true,
          pagination: { clickable: true },
          mousewheel: __props.mousewheel,
          keyboard: true,
          breakpoints: {
            320: { slidesPerView: 2 },
            640: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
            1280: { slidesPerView: 5 }
          }
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<!--[-->`);
              ssrRenderList(__props.items, (item) => {
                _push2(ssrRenderComponent(unref(SwiperSlide), {
                  key: item.id
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_sfc_main$1, {
                        item,
                        onQuickView: openQuickView
                      }, null, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(_sfc_main$1, {
                          item,
                          onQuickView: openQuickView
                        }, null, 8, ["item"])
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              });
              _push2(`<!--]-->`);
            } else {
              return [
                (openBlock(true), createBlock(Fragment, null, renderList(__props.items, (item) => {
                  return openBlock(), createBlock(unref(SwiperSlide), {
                    key: item.id
                  }, {
                    default: withCtx(() => [
                      createVNode(_sfc_main$1, {
                        item,
                        onQuickView: openQuickView
                      }, null, 8, ["item"])
                    ]),
                    _: 2
                  }, 1024);
                }), 128))
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_sfc_main$2, {
          visible: quickViewOpen.value,
          "onUpdate:visible": ($event) => quickViewOpen.value = $event,
          item: quickViewItem.value
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Shared/components/SwiperCarousel.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
//# sourceMappingURL=SwiperCarousel-DzhgKVqR.js.map
