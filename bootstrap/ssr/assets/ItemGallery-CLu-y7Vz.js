import { ref, computed, mergeProps, unref, withCtx, openBlock, createBlock, Fragment, renderList, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderSlot, ssrRenderComponent, ssrRenderList, ssrRenderAttr } from "vue/server-renderer";
import { h as getDocument, j as isObject, e as elementChildren, S as Swiper, N as Navigation, a as SwiperSlide } from "./navigation-CfyUjEFs.js";
function Thumb({
  swiper,
  extendParams,
  on
}) {
  extendParams({
    thumbs: {
      swiper: null,
      multipleActiveThumbs: true,
      autoScrollOffset: 0,
      slideThumbActiveClass: "swiper-slide-thumb-active",
      thumbsContainerClass: "swiper-thumbs"
    }
  });
  let initialized = false;
  let swiperCreated = false;
  swiper.thumbs = {
    swiper: null
  };
  function isVirtualEnabled() {
    const thumbsSwiper = swiper.thumbs.swiper;
    if (!thumbsSwiper || thumbsSwiper.destroyed) return false;
    return thumbsSwiper.params.virtual && thumbsSwiper.params.virtual.enabled;
  }
  function onThumbClick() {
    const thumbsSwiper = swiper.thumbs.swiper;
    if (!thumbsSwiper || thumbsSwiper.destroyed) return;
    const clickedIndex = thumbsSwiper.clickedIndex;
    const clickedSlide = thumbsSwiper.clickedSlide;
    if (clickedSlide && clickedSlide.classList.contains(swiper.params.thumbs.slideThumbActiveClass)) return;
    if (typeof clickedIndex === "undefined" || clickedIndex === null) return;
    let slideToIndex;
    if (thumbsSwiper.params.loop) {
      slideToIndex = parseInt(thumbsSwiper.clickedSlide.getAttribute("data-swiper-slide-index"), 10);
    } else {
      slideToIndex = clickedIndex;
    }
    if (swiper.params.loop) {
      swiper.slideToLoop(slideToIndex);
    } else {
      swiper.slideTo(slideToIndex);
    }
  }
  function init() {
    const {
      thumbs: thumbsParams
    } = swiper.params;
    if (initialized) return false;
    initialized = true;
    const SwiperClass = swiper.constructor;
    if (thumbsParams.swiper instanceof SwiperClass) {
      if (thumbsParams.swiper.destroyed) {
        initialized = false;
        return false;
      }
      swiper.thumbs.swiper = thumbsParams.swiper;
      Object.assign(swiper.thumbs.swiper.originalParams, {
        watchSlidesProgress: true,
        slideToClickedSlide: false
      });
      Object.assign(swiper.thumbs.swiper.params, {
        watchSlidesProgress: true,
        slideToClickedSlide: false
      });
      swiper.thumbs.swiper.update();
    } else if (isObject(thumbsParams.swiper)) {
      const thumbsSwiperParams = Object.assign({}, thumbsParams.swiper);
      Object.assign(thumbsSwiperParams, {
        watchSlidesProgress: true,
        slideToClickedSlide: false
      });
      swiper.thumbs.swiper = new SwiperClass(thumbsSwiperParams);
      swiperCreated = true;
    }
    swiper.thumbs.swiper.el.classList.add(swiper.params.thumbs.thumbsContainerClass);
    swiper.thumbs.swiper.on("tap", onThumbClick);
    if (isVirtualEnabled()) {
      swiper.thumbs.swiper.on("virtualUpdate", () => {
        update(false, {
          autoScroll: false
        });
      });
    }
    return true;
  }
  function update(initial, p) {
    const thumbsSwiper = swiper.thumbs.swiper;
    if (!thumbsSwiper || thumbsSwiper.destroyed) return;
    let thumbsToActivate = 1;
    const thumbActiveClass = swiper.params.thumbs.slideThumbActiveClass;
    if (swiper.params.slidesPerView > 1 && !swiper.params.centeredSlides) {
      thumbsToActivate = swiper.params.slidesPerView;
    }
    if (!swiper.params.thumbs.multipleActiveThumbs) {
      thumbsToActivate = 1;
    }
    thumbsToActivate = Math.floor(thumbsToActivate);
    thumbsSwiper.slides.forEach((slideEl) => slideEl.classList.remove(thumbActiveClass));
    if (thumbsSwiper.params.loop || isVirtualEnabled()) {
      for (let i = 0; i < thumbsToActivate; i += 1) {
        elementChildren(thumbsSwiper.slidesEl, `[data-swiper-slide-index="${swiper.realIndex + i}"]`).forEach((slideEl) => {
          slideEl.classList.add(thumbActiveClass);
        });
      }
    } else {
      for (let i = 0; i < thumbsToActivate; i += 1) {
        if (thumbsSwiper.slides[swiper.realIndex + i]) {
          thumbsSwiper.slides[swiper.realIndex + i].classList.add(thumbActiveClass);
        }
      }
    }
    if (p?.autoScroll ?? true) {
      autoScroll(initial ? 0 : void 0);
    }
  }
  function autoScroll(slideSpeed) {
    const thumbsSwiper = swiper.thumbs.swiper;
    if (!thumbsSwiper || thumbsSwiper.destroyed) return;
    const slidesPerView = thumbsSwiper.params.slidesPerView === "auto" ? thumbsSwiper.slidesPerViewDynamic() : thumbsSwiper.params.slidesPerView;
    const autoScrollOffset = swiper.params.thumbs.autoScrollOffset;
    const useOffset = autoScrollOffset && !thumbsSwiper.params.loop;
    if (swiper.realIndex !== thumbsSwiper.realIndex || useOffset) {
      const currentThumbsIndex = thumbsSwiper.activeIndex;
      let newThumbsIndex;
      let direction;
      if (thumbsSwiper.params.loop) {
        const newThumbsSlide = thumbsSwiper.slides.find((slideEl) => slideEl.getAttribute("data-swiper-slide-index") === `${swiper.realIndex}`);
        newThumbsIndex = thumbsSwiper.slides.indexOf(newThumbsSlide);
        direction = swiper.activeIndex > swiper.previousIndex ? "next" : "prev";
      } else {
        newThumbsIndex = swiper.realIndex;
        direction = newThumbsIndex > swiper.previousIndex ? "next" : "prev";
      }
      if (useOffset) {
        newThumbsIndex += direction === "next" ? autoScrollOffset : -1 * autoScrollOffset;
      }
      if (thumbsSwiper.visibleSlidesIndexes && thumbsSwiper.visibleSlidesIndexes.indexOf(newThumbsIndex) < 0) {
        if (thumbsSwiper.params.centeredSlides) {
          if (newThumbsIndex > currentThumbsIndex) {
            newThumbsIndex = newThumbsIndex - Math.floor(slidesPerView / 2) + 1;
          } else {
            newThumbsIndex = newThumbsIndex + Math.floor(slidesPerView / 2) - 1;
          }
        } else if (newThumbsIndex > currentThumbsIndex && thumbsSwiper.params.slidesPerGroup === 1) ;
        thumbsSwiper.slideTo(newThumbsIndex, slideSpeed);
      }
    }
  }
  on("beforeInit", () => {
    const {
      thumbs
    } = swiper.params;
    if (!thumbs || !thumbs.swiper) return;
    if (typeof thumbs.swiper === "string" || thumbs.swiper instanceof HTMLElement) {
      const document = getDocument();
      const getThumbsElementAndInit = () => {
        const thumbsElement = typeof thumbs.swiper === "string" ? document.querySelector(thumbs.swiper) : thumbs.swiper;
        if (thumbsElement && thumbsElement.swiper) {
          thumbs.swiper = thumbsElement.swiper;
          init();
          update(true);
        } else if (thumbsElement) {
          const eventName = `${swiper.params.eventsPrefix}init`;
          const onThumbsSwiper = (e) => {
            thumbs.swiper = e.detail[0];
            thumbsElement.removeEventListener(eventName, onThumbsSwiper);
            init();
            update(true);
            thumbs.swiper.update();
            swiper.update();
          };
          thumbsElement.addEventListener(eventName, onThumbsSwiper);
        }
        return thumbsElement;
      };
      const watchForThumbsToAppear = () => {
        if (swiper.destroyed) return;
        const thumbsElement = getThumbsElementAndInit();
        if (!thumbsElement) {
          requestAnimationFrame(watchForThumbsToAppear);
        }
      };
      requestAnimationFrame(watchForThumbsToAppear);
    } else {
      init();
      update(true);
    }
  });
  on("slideChange update resize observerUpdate", () => {
    update();
  });
  on("setTransition", (_s, duration) => {
    const thumbsSwiper = swiper.thumbs.swiper;
    if (!thumbsSwiper || thumbsSwiper.destroyed) return;
    thumbsSwiper.setTransition(duration);
  });
  on("beforeDestroy", () => {
    const thumbsSwiper = swiper.thumbs.swiper;
    if (!thumbsSwiper || thumbsSwiper.destroyed) return;
    if (swiperCreated) {
      thumbsSwiper.destroy();
    }
  });
  Object.assign(swiper.thumbs, {
    init,
    update
  });
}
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
    const modules = [Thumb, Navigation];
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
//# sourceMappingURL=ItemGallery-CLu-y7Vz.js.map
