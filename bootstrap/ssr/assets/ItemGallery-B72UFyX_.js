import { ref, computed, mergeProps, unref, withCtx, openBlock, createBlock, Fragment, renderList, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderSlot, ssrRenderComponent, ssrRenderList, ssrRenderAttr } from "vue/server-renderer";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Thumbs, Navigation } from "swiper/modules";
/* empty css                    */
import "vue3-zoomer";
const _sfc_main = {
  __name: "ItemGallery",
  __ssrInlineRender: true,
  props: {
    images: Array,
    itemName: String,
    imagePath: String,
    videoUrl: { type: String, default: null }
  },
  setup(__props) {
    const props = __props;
    const modules = [Thumbs, Navigation];
    const thumbsSwiper = ref(null);
    function setThumbsSwiper(swiper) {
      thumbsSwiper.value = swiper;
    }
    function extractYoutubeId(url) {
      if (!url) return null;
      const match = url.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
      return match ? match[1] : null;
    }
    const videoId = computed(() => extractYoutubeId(props.videoUrl));
    const slides = computed(() => {
      const list = props.images.map((img) => ({ type: "image", src: img }));
      if (videoId.value) {
        list.push({ type: "video", id: videoId.value });
      }
      return list;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col gap-3" }, _attrs))}>`);
      if (!slides.value.length) {
        _push(`<div class="w-full rounded-3xl border border-gray-100 shadow-sm h-[270px] sm:h-[500px] bg-gray-50 flex flex-col items-center justify-center gap-3 text-gray-300"><i class="pi pi-image text-6xl"></i><span class="text-sm">სურათი არ არის</span></div>`);
      } else {
        _push(`<div class="relative">`);
        ssrRenderSlot(_ctx.$slots, "badge", {}, null, _push, _parent);
        _push(ssrRenderComponent(unref(Swiper), {
          modules,
          thumbs: { swiper: thumbsSwiper.value },
          navigation: true,
          loop: slides.value.length > 1,
          class: "main-gallery w-full rounded-3xl overflow-hidden border border-gray-100 shadow-sm h-[270px] sm:h-[500px]"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<!--[-->`);
              ssrRenderList(slides.value, (slide, i) => {
                _push2(ssrRenderComponent(unref(SwiperSlide), {
                  key: i,
                  class: "bg-white flex items-center justify-center"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      if (slide.type === "image") {
                        _push3(`<img${ssrRenderAttr("src", `${__props.imagePath}/${slide.src}`)}${ssrRenderAttr("alt", __props.itemName)} class="max-w-[500px] mx-auto h-full object-cover"${_scopeId2}>`);
                      } else {
                        _push3(`<iframe${ssrRenderAttr("src", `https://www.youtube.com/embed/${slide.id}`)}${ssrRenderAttr("title", __props.itemName)} class="w-full h-full border-0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen${_scopeId2}></iframe>`);
                      }
                    } else {
                      return [
                        slide.type === "image" ? (openBlock(), createBlock("img", {
                          key: 0,
                          src: `${__props.imagePath}/${slide.src}`,
                          alt: __props.itemName,
                          class: "max-w-[500px] mx-auto h-full object-cover"
                        }, null, 8, ["src", "alt"])) : (openBlock(), createBlock("iframe", {
                          key: 1,
                          src: `https://www.youtube.com/embed/${slide.id}`,
                          title: __props.itemName,
                          class: "w-full h-full border-0",
                          allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
                          allowfullscreen: ""
                        }, null, 8, ["src", "title"]))
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              });
              _push2(`<!--]-->`);
            } else {
              return [
                (openBlock(true), createBlock(Fragment, null, renderList(slides.value, (slide, i) => {
                  return openBlock(), createBlock(unref(SwiperSlide), {
                    key: i,
                    class: "bg-white flex items-center justify-center"
                  }, {
                    default: withCtx(() => [
                      slide.type === "image" ? (openBlock(), createBlock("img", {
                        key: 0,
                        src: `${__props.imagePath}/${slide.src}`,
                        alt: __props.itemName,
                        class: "max-w-[500px] mx-auto h-full object-cover"
                      }, null, 8, ["src", "alt"])) : (openBlock(), createBlock("iframe", {
                        key: 1,
                        src: `https://www.youtube.com/embed/${slide.id}`,
                        title: __props.itemName,
                        class: "w-full h-full border-0",
                        allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
                        allowfullscreen: ""
                      }, null, 8, ["src", "title"]))
                    ]),
                    _: 2
                  }, 1024);
                }), 128))
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      }
      if (slides.value.length > 1) {
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
              ssrRenderList(slides.value, (slide, i) => {
                _push2(ssrRenderComponent(unref(SwiperSlide), { key: i }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<div class="relative w-full aspect-square rounded-xl overflow-hidden border-2 border-transparent cursor-pointer transition-all"${_scopeId2}>`);
                      if (slide.type === "image") {
                        _push3(`<img${ssrRenderAttr("src", `${__props.imagePath}/${slide.src}`)}${ssrRenderAttr("alt", __props.itemName)} class="w-full h-full object-cover"${_scopeId2}>`);
                      } else {
                        _push3(`<!--[--><img${ssrRenderAttr("src", `https://img.youtube.com/vi/${slide.id}/hqdefault.jpg`)}${ssrRenderAttr("alt", __props.itemName)} class="w-full h-full object-cover"${_scopeId2}><div class="absolute inset-0 flex items-center justify-center bg-black/20"${_scopeId2}><i class="pi pi-play-circle text-white text-xl"${_scopeId2}></i></div><!--]-->`);
                      }
                      _push3(`</div>`);
                    } else {
                      return [
                        createVNode("div", { class: "relative w-full aspect-square rounded-xl overflow-hidden border-2 border-transparent cursor-pointer transition-all" }, [
                          slide.type === "image" ? (openBlock(), createBlock("img", {
                            key: 0,
                            src: `${__props.imagePath}/${slide.src}`,
                            alt: __props.itemName,
                            class: "w-full h-full object-cover"
                          }, null, 8, ["src", "alt"])) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                            createVNode("img", {
                              src: `https://img.youtube.com/vi/${slide.id}/hqdefault.jpg`,
                              alt: __props.itemName,
                              class: "w-full h-full object-cover"
                            }, null, 8, ["src", "alt"]),
                            createVNode("div", { class: "absolute inset-0 flex items-center justify-center bg-black/20" }, [
                              createVNode("i", { class: "pi pi-play-circle text-white text-xl" })
                            ])
                          ], 64))
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
                (openBlock(true), createBlock(Fragment, null, renderList(slides.value, (slide, i) => {
                  return openBlock(), createBlock(unref(SwiperSlide), { key: i }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "relative w-full aspect-square rounded-xl overflow-hidden border-2 border-transparent cursor-pointer transition-all" }, [
                        slide.type === "image" ? (openBlock(), createBlock("img", {
                          key: 0,
                          src: `${__props.imagePath}/${slide.src}`,
                          alt: __props.itemName,
                          class: "w-full h-full object-cover"
                        }, null, 8, ["src", "alt"])) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                          createVNode("img", {
                            src: `https://img.youtube.com/vi/${slide.id}/hqdefault.jpg`,
                            alt: __props.itemName,
                            class: "w-full h-full object-cover"
                          }, null, 8, ["src", "alt"]),
                          createVNode("div", { class: "absolute inset-0 flex items-center justify-center bg-black/20" }, [
                            createVNode("i", { class: "pi pi-play-circle text-white text-xl" })
                          ])
                        ], 64))
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
//# sourceMappingURL=ItemGallery-B72UFyX_.js.map
