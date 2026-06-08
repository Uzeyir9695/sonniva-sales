import { ref, mergeProps, unref, withCtx, createVNode, openBlock, createBlock, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderAttr } from "vue/server-renderer";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Thumbs, Navigation } from "swiper/modules";
/* empty css                */
/* empty css                    */
import "vue3-zoomer";
const _sfc_main = {
  __name: "ItemGallery",
  __ssrInlineRender: true,
  props: {
    images: Array,
    itemName: String,
    imagePath: String
  },
  setup(__props) {
    const modules = [Thumbs, Navigation];
    const thumbsSwiper = ref(null);
    function setThumbsSwiper(swiper) {
      thumbsSwiper.value = swiper;
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col gap-3" }, _attrs))}>`);
      if (!__props.images.length) {
        _push(`<div class="w-full rounded-3xl border border-gray-100 shadow-sm h-[270px] sm:h-[500px] bg-gray-50 flex flex-col items-center justify-center gap-3 text-gray-300"><i class="pi pi-image text-6xl"></i><span class="text-sm">სურათი არ არის</span></div>`);
      } else {
        _push(ssrRenderComponent(unref(Swiper), {
          modules,
          thumbs: { swiper: thumbsSwiper.value },
          navigation: true,
          loop: __props.images.length > 1,
          class: "main-gallery w-full rounded-3xl overflow-hidden border border-gray-100 shadow-sm h-[270px] sm:h-[500px]"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<!--[-->`);
              ssrRenderList(__props.images, (img, i) => {
                _push2(ssrRenderComponent(unref(SwiperSlide), {
                  key: i,
                  class: "bg-white flex items-center justify-center"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<img${ssrRenderAttr("src", `${__props.imagePath}/${img}`)}${ssrRenderAttr("alt", __props.itemName)} class="max-w-[500px] mx-auto h-full object-cover"${_scopeId2}>`);
                    } else {
                      return [
                        createVNode("img", {
                          src: `${__props.imagePath}/${img}`,
                          alt: __props.itemName,
                          class: "max-w-[500px] mx-auto h-full object-cover"
                        }, null, 8, ["src", "alt"])
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              });
              _push2(`<!--]-->`);
            } else {
              return [
                (openBlock(true), createBlock(Fragment, null, renderList(__props.images, (img, i) => {
                  return openBlock(), createBlock(unref(SwiperSlide), {
                    key: i,
                    class: "bg-white flex items-center justify-center"
                  }, {
                    default: withCtx(() => [
                      createVNode("img", {
                        src: `${__props.imagePath}/${img}`,
                        alt: __props.itemName,
                        class: "max-w-[500px] mx-auto h-full object-cover"
                      }, null, 8, ["src", "alt"])
                    ]),
                    _: 2
                  }, 1024);
                }), 128))
              ];
            }
          }),
          _: 1
        }, _parent));
      }
      if (__props.images.length > 1) {
        _push(ssrRenderComponent(unref(Swiper), {
          modules,
          "watch-slides-progress": "",
          onSwiper: setThumbsSwiper,
          "slides-per-view": 6,
          "space-between": 8,
          "free-mode": true,
          class: "thumbs-gallery w-full mt-2"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<!--[-->`);
              ssrRenderList(__props.images, (img, i) => {
                _push2(ssrRenderComponent(unref(SwiperSlide), { key: i }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<div class="w-full aspect-square rounded-xl overflow-hidden border-2 border-transparent cursor-pointer transition-all"${_scopeId2}><img${ssrRenderAttr("src", `${__props.imagePath}/${img}`)}${ssrRenderAttr("alt", __props.itemName)} class="w-full h-full object-cover"${_scopeId2}></div>`);
                    } else {
                      return [
                        createVNode("div", { class: "w-full aspect-square rounded-xl overflow-hidden border-2 border-transparent cursor-pointer transition-all" }, [
                          createVNode("img", {
                            src: `${__props.imagePath}/${img}`,
                            alt: __props.itemName,
                            class: "w-full h-full object-cover"
                          }, null, 8, ["src", "alt"])
                        ])
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              });
              _push2(`<!--]-->`);
            } else {
              return [
                (openBlock(true), createBlock(Fragment, null, renderList(__props.images, (img, i) => {
                  return openBlock(), createBlock(unref(SwiperSlide), { key: i }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "w-full aspect-square rounded-xl overflow-hidden border-2 border-transparent cursor-pointer transition-all" }, [
                        createVNode("img", {
                          src: `${__props.imagePath}/${img}`,
                          alt: __props.itemName,
                          class: "w-full h-full object-cover"
                        }, null, 8, ["src", "alt"])
                      ])
                    ]),
                    _: 2
                  }, 1024);
                }), 128))
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Items/ItemGallery.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=ItemGallery-Dn36N-Eg.js.map
