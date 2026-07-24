import { computed, mergeProps, unref, withCtx, createVNode, openBlock, createBlock, Fragment, renderList, useSSRContext, ref, toDisplayString, createCommentVNode, createTextVNode } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrRenderTeleport, ssrRenderClass, ssrGetDirectiveProps, ssrInterpolate } from "vue/server-renderer";
import { usePage, Link, Head } from "@inertiajs/vue3";
import { R as Ripple } from "./index-YvTnrAwi.js";
import { h as getDocument, S as Swiper, a as SwiperSlide } from "./navigation-CfyUjEFs.js";
import { C as CATEGORY_ICON_VERSION } from "./categoryIcons-dDFpexsr.js";
import { _ as _sfc_main$3 } from "./SwiperCarousel-CZezlq3t.js";
import "@primeuix/utils";
import "@primeuix/utils/object";
import "@primevue/icons/spinner";
import "@primevue/core/basecomponent";
import "@primeuix/styles/badge";
import "@primevue/core/base/style";
import "@primeuix/utils/dom";
import "@primevue/core/basedirective";
import "@primeuix/styles/ripple";
import "@primeuix/styles/button";
import "./ItemCard-sQ2o_7aA.js";
import "./index-C3Ts-4IM.js";
import "@primeuix/utils/uuid";
import "@primeuix/utils/zindex";
import "@primevue/core/utils";
import "@primeuix/styles/tooltip";
import "./QuickViewDialog-7zTQs1NP.js";
import "./index-D46B4f3g.js";
import "@primevue/icons/times";
import "@primevue/icons/windowmaximize";
import "@primevue/icons/windowminimize";
import "./index-zZrFrjQS.js";
import "@primeuix/styled";
import "@primeuix/styles/dialog";
import "axios";
import "./useCart-CIcsIaQl.js";
import "./index-Qb24q4w2.js";
import "./usePricing-ssZPWxiP.js";
import "./index-BgiqKOW-.js";
import "@primevue/icons/angledown";
import "@primevue/icons/angleup";
import "./index-BAgOeBfa.js";
import "@primevue/core/baseinput";
import "@primeuix/styles/inputtext";
import "@primeuix/styles/inputnumber";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./StockNotifyDialog-BIX42gC9.js";
import "./numberFormat-BgUHwZc2.js";
function Autoplay({
  swiper,
  extendParams,
  on,
  emit,
  params
}) {
  swiper.autoplay = {
    running: false,
    paused: false,
    timeLeft: 0
  };
  extendParams({
    autoplay: {
      enabled: false,
      delay: 3e3,
      waitForTransition: true,
      disableOnInteraction: false,
      stopOnLastSlide: false,
      reverseDirection: false,
      pauseOnMouseEnter: false
    }
  });
  let timeout;
  let raf;
  let autoplayDelayTotal = params && params.autoplay ? params.autoplay.delay : 3e3;
  let autoplayDelayCurrent = params && params.autoplay ? params.autoplay.delay : 3e3;
  let autoplayTimeLeft;
  let autoplayStartTime = (/* @__PURE__ */ new Date()).getTime();
  let wasPaused;
  let isTouched;
  let pausedByTouch;
  let touchStartTimeout;
  let pausedByInteraction;
  let pausedByPointerEnter;
  function onTransitionEnd(e) {
    if (!swiper || swiper.destroyed || !swiper.wrapperEl) return;
    if (e.target !== swiper.wrapperEl) return;
    swiper.wrapperEl.removeEventListener("transitionend", onTransitionEnd);
    if (pausedByPointerEnter || e.detail && e.detail.bySwiperTouchMove) {
      return;
    }
    resume();
  }
  const calcTimeLeft = () => {
    if (swiper.destroyed || !swiper.autoplay.running) return;
    if (swiper.autoplay.paused) {
      wasPaused = true;
    } else if (wasPaused) {
      autoplayDelayCurrent = autoplayTimeLeft;
      wasPaused = false;
    }
    const timeLeft = swiper.autoplay.paused ? autoplayTimeLeft : autoplayStartTime + autoplayDelayCurrent - (/* @__PURE__ */ new Date()).getTime();
    swiper.autoplay.timeLeft = timeLeft;
    emit("autoplayTimeLeft", timeLeft, timeLeft / autoplayDelayTotal);
    raf = requestAnimationFrame(() => {
      calcTimeLeft();
    });
  };
  const getSlideDelay = () => {
    let activeSlideEl;
    if (swiper.virtual && swiper.params.virtual.enabled) {
      activeSlideEl = swiper.slides.find((slideEl) => slideEl.classList.contains("swiper-slide-active"));
    } else {
      activeSlideEl = swiper.slides[swiper.activeIndex];
    }
    if (!activeSlideEl) return void 0;
    const currentSlideDelay = parseInt(activeSlideEl.getAttribute("data-swiper-autoplay"), 10);
    return currentSlideDelay;
  };
  const getTotalDelay = () => {
    let totalDelay = swiper.params.autoplay.delay;
    const currentSlideDelay = getSlideDelay();
    if (!Number.isNaN(currentSlideDelay) && currentSlideDelay > 0) {
      totalDelay = currentSlideDelay;
    }
    return totalDelay;
  };
  const run = (delayForce) => {
    if (swiper.destroyed || !swiper.autoplay.running) return;
    cancelAnimationFrame(raf);
    calcTimeLeft();
    let delay = delayForce;
    if (typeof delay === "undefined") {
      delay = getTotalDelay();
      autoplayDelayTotal = delay;
      autoplayDelayCurrent = delay;
    }
    autoplayTimeLeft = delay;
    const speed = swiper.params.speed;
    const proceed = () => {
      if (!swiper || swiper.destroyed) return;
      if (swiper.params.autoplay.reverseDirection) {
        if (!swiper.isBeginning || swiper.params.loop || swiper.params.rewind) {
          swiper.slidePrev(speed, true, true);
          emit("autoplay");
        } else if (!swiper.params.autoplay.stopOnLastSlide) {
          swiper.slideTo(swiper.slides.length - 1, speed, true, true);
          emit("autoplay");
        }
      } else {
        if (!swiper.isEnd || swiper.params.loop || swiper.params.rewind) {
          swiper.slideNext(speed, true, true);
          emit("autoplay");
        } else if (!swiper.params.autoplay.stopOnLastSlide) {
          swiper.slideTo(0, speed, true, true);
          emit("autoplay");
        }
      }
      if (swiper.params.cssMode) {
        autoplayStartTime = (/* @__PURE__ */ new Date()).getTime();
        requestAnimationFrame(() => {
          run();
        });
      }
    };
    if (delay > 0) {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        proceed();
      }, delay);
    } else {
      requestAnimationFrame(() => {
        proceed();
      });
    }
    return delay;
  };
  const start = () => {
    autoplayStartTime = (/* @__PURE__ */ new Date()).getTime();
    swiper.autoplay.running = true;
    run();
    emit("autoplayStart");
  };
  const stop = () => {
    swiper.autoplay.running = false;
    clearTimeout(timeout);
    cancelAnimationFrame(raf);
    emit("autoplayStop");
  };
  const pause = (internal, reset) => {
    if (swiper.destroyed || !swiper.autoplay.running) return;
    clearTimeout(timeout);
    if (!internal) {
      pausedByInteraction = true;
    }
    const proceed = () => {
      emit("autoplayPause");
      if (swiper.params.autoplay.waitForTransition) {
        swiper.wrapperEl.addEventListener("transitionend", onTransitionEnd);
      } else {
        resume();
      }
    };
    swiper.autoplay.paused = true;
    if (reset) {
      proceed();
      return;
    }
    const delay = autoplayTimeLeft || swiper.params.autoplay.delay;
    autoplayTimeLeft = delay - ((/* @__PURE__ */ new Date()).getTime() - autoplayStartTime);
    if (swiper.isEnd && autoplayTimeLeft < 0 && !swiper.params.loop) return;
    if (autoplayTimeLeft < 0) autoplayTimeLeft = 0;
    proceed();
  };
  const resume = () => {
    if (swiper.isEnd && autoplayTimeLeft < 0 && !swiper.params.loop || swiper.destroyed || !swiper.autoplay.running) return;
    autoplayStartTime = (/* @__PURE__ */ new Date()).getTime();
    if (pausedByInteraction) {
      pausedByInteraction = false;
      run(autoplayTimeLeft);
    } else {
      run();
    }
    swiper.autoplay.paused = false;
    emit("autoplayResume");
  };
  const onVisibilityChange = () => {
    if (swiper.destroyed || !swiper.autoplay.running) return;
    const document = getDocument();
    if (document.visibilityState === "hidden") {
      pausedByInteraction = true;
      pause(true);
    }
    if (document.visibilityState === "visible") {
      resume();
    }
  };
  const onPointerEnter = (e) => {
    if (e.pointerType !== "mouse") return;
    pausedByInteraction = true;
    pausedByPointerEnter = true;
    if (swiper.animating || swiper.autoplay.paused) return;
    pause(true);
  };
  const onPointerLeave = (e) => {
    if (e.pointerType !== "mouse") return;
    pausedByPointerEnter = false;
    if (swiper.autoplay.paused) {
      resume();
    }
  };
  const attachMouseEvents = () => {
    if (swiper.params.autoplay.pauseOnMouseEnter) {
      swiper.el.addEventListener("pointerenter", onPointerEnter);
      swiper.el.addEventListener("pointerleave", onPointerLeave);
    }
  };
  const detachMouseEvents = () => {
    if (swiper.el && typeof swiper.el !== "string") {
      swiper.el.removeEventListener("pointerenter", onPointerEnter);
      swiper.el.removeEventListener("pointerleave", onPointerLeave);
    }
  };
  const attachDocumentEvents = () => {
    const document = getDocument();
    document.addEventListener("visibilitychange", onVisibilityChange);
  };
  const detachDocumentEvents = () => {
    const document = getDocument();
    document.removeEventListener("visibilitychange", onVisibilityChange);
  };
  on("init", () => {
    if (swiper.params.autoplay.enabled) {
      attachMouseEvents();
      attachDocumentEvents();
      start();
    }
  });
  on("destroy", () => {
    detachMouseEvents();
    detachDocumentEvents();
    if (swiper.autoplay.running) {
      stop();
    }
  });
  on("_freeModeStaticRelease", () => {
    if (pausedByTouch || pausedByInteraction) {
      resume();
    }
  });
  on("_freeModeNoMomentumRelease", () => {
    if (!swiper.params.autoplay.disableOnInteraction) {
      pause(true, true);
    } else {
      stop();
    }
  });
  on("beforeTransitionStart", (_s, speed, internal) => {
    if (swiper.destroyed || !swiper.autoplay.running) return;
    if (internal || !swiper.params.autoplay.disableOnInteraction) {
      pause(true, true);
    } else {
      stop();
    }
  });
  on("sliderFirstMove", () => {
    if (swiper.destroyed || !swiper.autoplay.running) return;
    if (swiper.params.autoplay.disableOnInteraction) {
      stop();
      return;
    }
    isTouched = true;
    pausedByTouch = false;
    pausedByInteraction = false;
    touchStartTimeout = setTimeout(() => {
      pausedByInteraction = true;
      pausedByTouch = true;
      pause(true);
    }, 200);
  });
  on("touchEnd", () => {
    if (swiper.destroyed || !swiper.autoplay.running || !isTouched) return;
    clearTimeout(touchStartTimeout);
    clearTimeout(timeout);
    if (swiper.params.autoplay.disableOnInteraction) {
      pausedByTouch = false;
      isTouched = false;
      return;
    }
    if (pausedByTouch && swiper.params.cssMode) resume();
    pausedByTouch = false;
    isTouched = false;
  });
  on("slideChange", () => {
    if (swiper.destroyed || !swiper.autoplay.running) return;
    if (swiper.autoplay.paused) {
      autoplayTimeLeft = getTotalDelay();
      autoplayDelayTotal = getTotalDelay();
    }
  });
  Object.assign(swiper.autoplay, {
    start,
    stop,
    pause,
    resume
  });
}
const _sfc_main$2 = {
  __name: "MegaMenuRightPanel",
  __ssrInlineRender: true,
  setup(__props) {
    const modules = [Autoplay];
    const page = usePage();
    const banners = computed(() => page.props.banners ?? {});
    const mainImages = computed(() => banners.value.main ?? []);
    const doorImages = computed(() => banners.value.doors ?? []);
    const frameImages = computed(() => banners.value.frames ?? []);
    const FALLBACK_MAIN = [{ image_url: "/frame-examples/fur1.jpeg", item_slug: null }];
    const FALLBACK_DOORS = ["/door-examples/picture1.png", "/door-examples/picture2.png", "/door-examples/picture3.png"];
    const FALLBACK_FRAMES = ["/frame-examples/fur1.jpeg", "/frame-examples/fur2.jpeg", "/frame-examples/fur3.jpeg"];
    const mainSrc = computed(() => mainImages.value.length ? mainImages.value : FALLBACK_MAIN);
    const doorSrc = computed(() => doorImages.value.length ? doorImages.value : FALLBACK_DOORS);
    const frameSrc = computed(() => frameImages.value.length ? frameImages.value : FALLBACK_FRAMES);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "grid grid-cols-5 gap-3 px-4 h-[calc(100vh-100px)]" }, _attrs))}><div class="col-span-5 xl:col-span-3 xl:row-span-2 h-full relative rounded-xl overflow-hidden">`);
      _push(ssrRenderComponent(unref(Swiper), {
        modules,
        "slides-per-view": 1,
        loop: mainSrc.value.length > 1,
        autoplay: mainSrc.value.length > 1 ? { delay: 5e3, disableOnInteraction: false, pauseOnMouseEnter: true } : false,
        class: "h-full w-full"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(mainSrc.value, (slide, i) => {
              _push2(ssrRenderComponent(unref(SwiperSlide), {
                key: i,
                class: "h-full!"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    if (slide.item_slug) {
                      _push3(ssrRenderComponent(unref(Link), {
                        href: _ctx.route("items.show", slide.item_slug),
                        class: "block h-full w-full"
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`<img${ssrRenderAttr("src", slide.image_url)}${ssrRenderAttr("alt", `main ${i + 1}`)} class="w-full h-full object-cover sm:object-contain"${_scopeId3}>`);
                          } else {
                            return [
                              createVNode("img", {
                                src: slide.image_url,
                                alt: `main ${i + 1}`,
                                class: "w-full h-full object-cover sm:object-contain"
                              }, null, 8, ["src", "alt"])
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    } else {
                      _push3(`<img${ssrRenderAttr("src", slide.image_url)}${ssrRenderAttr("alt", `main ${i + 1}`)} class="w-full h-full object-cover sm:object-contain"${_scopeId2}>`);
                    }
                  } else {
                    return [
                      slide.item_slug ? (openBlock(), createBlock(unref(Link), {
                        key: 0,
                        href: _ctx.route("items.show", slide.item_slug),
                        class: "block h-full w-full"
                      }, {
                        default: withCtx(() => [
                          createVNode("img", {
                            src: slide.image_url,
                            alt: `main ${i + 1}`,
                            class: "w-full h-full object-cover sm:object-contain"
                          }, null, 8, ["src", "alt"])
                        ]),
                        _: 2
                      }, 1032, ["href"])) : (openBlock(), createBlock("img", {
                        key: 1,
                        src: slide.image_url,
                        alt: `main ${i + 1}`,
                        class: "w-full h-full object-cover sm:object-contain"
                      }, null, 8, ["src", "alt"]))
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (openBlock(true), createBlock(Fragment, null, renderList(mainSrc.value, (slide, i) => {
                return openBlock(), createBlock(unref(SwiperSlide), {
                  key: i,
                  class: "h-full!"
                }, {
                  default: withCtx(() => [
                    slide.item_slug ? (openBlock(), createBlock(unref(Link), {
                      key: 0,
                      href: _ctx.route("items.show", slide.item_slug),
                      class: "block h-full w-full"
                    }, {
                      default: withCtx(() => [
                        createVNode("img", {
                          src: slide.image_url,
                          alt: `main ${i + 1}`,
                          class: "w-full h-full object-cover sm:object-contain"
                        }, null, 8, ["src", "alt"])
                      ]),
                      _: 2
                    }, 1032, ["href"])) : (openBlock(), createBlock("img", {
                      key: 1,
                      src: slide.image_url,
                      alt: `main ${i + 1}`,
                      class: "w-full h-full object-cover sm:object-contain"
                    }, null, 8, ["src", "alt"]))
                  ]),
                  _: 2
                }, 1024);
              }), 128))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="col-span-5 xl:col-span-2 h-full relative rounded-xl overflow-hidden">`);
      _push(ssrRenderComponent(unref(Swiper), {
        modules,
        "slides-per-view": 1,
        loop: doorSrc.value.length > 1,
        autoplay: doorSrc.value.length > 1 ? { delay: 5e3, disableOnInteraction: false } : false,
        class: "h-full w-full"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(doorSrc.value, (src, i) => {
              _push2(ssrRenderComponent(unref(SwiperSlide), {
                key: i,
                class: "h-full!"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<img${ssrRenderAttr("src", src)}${ssrRenderAttr("alt", `door ${i + 1}`)} class="w-full h-full object-cover"${_scopeId2}>`);
                  } else {
                    return [
                      createVNode("img", {
                        src,
                        alt: `door ${i + 1}`,
                        class: "w-full h-full object-cover"
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
              (openBlock(true), createBlock(Fragment, null, renderList(doorSrc.value, (src, i) => {
                return openBlock(), createBlock(unref(SwiperSlide), {
                  key: i,
                  class: "h-full!"
                }, {
                  default: withCtx(() => [
                    createVNode("img", {
                      src,
                      alt: `door ${i + 1}`,
                      class: "w-full h-full object-cover"
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
      _push(`<div class="absolute bottom-0 left-0 right-0 p-4 z-10 flex items-center justify-between bg-black/50"><div><p class="text-white font-semibold text-sm">მემბრანული კარები</p><p class="text-white/90 text-xs">შეუკვეთეთ მემბრანული კარები თქვენთვის სასურველ ზომებში და ფერებში</p></div><a href="https://frame.sonniva.ge/ka/doors" target="_blank" rel="noopener noreferrer" class="flex items-center gap-x-1.5 shrink-0 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full hover:bg-white/30 transition-colors"><span>იხილეთ</span><i class="pi pi-external-link text-xs"></i></a></div></div><div class="col-span-5 xl:col-span-2 h-full relative rounded-xl overflow-hidden">`);
      _push(ssrRenderComponent(unref(Swiper), {
        modules,
        "slides-per-view": 1,
        loop: frameSrc.value.length > 1,
        autoplay: frameSrc.value.length > 1 ? { delay: 5e3, disableOnInteraction: false } : false,
        class: "h-full w-full"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(frameSrc.value, (src, i) => {
              _push2(ssrRenderComponent(unref(SwiperSlide), {
                key: i,
                class: "h-full!"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<img${ssrRenderAttr("src", src)}${ssrRenderAttr("alt", `frame ${i + 1}`)} class="w-full h-full object-cover"${_scopeId2}>`);
                  } else {
                    return [
                      createVNode("img", {
                        src,
                        alt: `frame ${i + 1}`,
                        class: "w-full h-full object-cover"
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
              (openBlock(true), createBlock(Fragment, null, renderList(frameSrc.value, (src, i) => {
                return openBlock(), createBlock(unref(SwiperSlide), {
                  key: i,
                  class: "h-full!"
                }, {
                  default: withCtx(() => [
                    createVNode("img", {
                      src,
                      alt: `frame ${i + 1}`,
                      class: "w-full h-full object-cover"
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
      _push(`<div class="absolute bottom-0 left-0 right-0 p-4 z-10 flex items-center justify-between bg-black/50"><div><p class="text-white font-semibold text-sm">ალუმინის ჩარჩოები</p><p class="text-white/90 text-xs">ჩვენ ვამზადებთ ალუმინის ჩარჩოებს თქვენთვის სასურველ ზომებში</p></div><a href="https://frame.sonniva.ge/ka/frames/create" target="_blank" rel="noopener noreferrer" class="flex items-center gap-x-1.5 shrink-0 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full hover:bg-white/30 transition-colors"><span>იხილეთ</span><i class="pi pi-external-link text-xs"></i></a></div></div></div>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Shared/components/MegaMenuRightPanel.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "LargeDeviceMegaMenu",
  __ssrInlineRender: true,
  setup(__props) {
    const page = usePage();
    const categories = page.props.categories ?? [];
    const activeCategory = ref(null);
    ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      const _directive_ripple = Ripple;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative" }, _attrs))}>`);
      ssrRenderTeleport(_push, (_push2) => {
        if (activeCategory.value && activeCategory.value.subs?.length) {
          _push2(`<div class="fixed inset-0 z-30 backdrop-blur-sm bg-black/20"></div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
      _push(`<div class="${ssrRenderClass([activeCategory.value ? "rounded-r-none" : "", "large-device-menu w-80 bg-white p-2 rounded-xl shadow-sm shrink-0 z-40"])}"><!--[-->`);
      ssrRenderList(unref(categories), (category) => {
        _push(ssrRenderComponent(unref(Link), mergeProps({
          key: category.name,
          id: category.code,
          style: { "--p-ripple-background": "rgba(251, 191, 36, 0.3)" },
          onMouseenter: ($event) => activeCategory.value = category,
          href: _ctx.route("items.index", category.slug),
          class: ["flex items-center justify-between rounded-xl px-5 py-2 cursor-pointer transition-colors", activeCategory.value?.name === category.name ? "bg-gray-50" : "hover:bg-gray-300"]
        }, ssrGetDirectiveProps(_ctx, _directive_ripple)), {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<p class="flex items-center gap-3"${_scopeId}><img${ssrRenderAttr("src", `categories-icons/${category.code}-${unref(CATEGORY_ICON_VERSION)}.png`)}${ssrRenderAttr("alt", category.name)} class="w-12 h-12 object-cover rounded-lg"${_scopeId}><span class="${ssrRenderClass([[category.name === "Sale" ? "text-brand-500" : activeCategory.value?.name === category.name ? "text-brand-400" : "text-gray-700"], "text-sm font-medium"])}"${_scopeId}>${ssrInterpolate(category.name)}</span></p><i class="${ssrRenderClass([activeCategory.value?.name === category.name ? "text-brand-400" : "text-gray-400", "pi pi-chevron-right text-xs"])}"${_scopeId}></i>`);
            } else {
              return [
                createVNode("p", { class: "flex items-center gap-3" }, [
                  createVNode("img", {
                    src: `categories-icons/${category.code}-${unref(CATEGORY_ICON_VERSION)}.png`,
                    alt: category.name,
                    class: "w-12 h-12 object-cover rounded-lg"
                  }, null, 8, ["src", "alt"]),
                  createVNode("span", {
                    class: ["text-sm font-medium", [category.name === "Sale" ? "text-brand-500" : activeCategory.value?.name === category.name ? "text-brand-400" : "text-gray-700"]]
                  }, toDisplayString(category.name), 3)
                ]),
                createVNode("i", {
                  class: ["pi pi-chevron-right text-xs", activeCategory.value?.name === category.name ? "text-brand-400" : "text-gray-400"]
                }, null, 2)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div>`);
      if (activeCategory.value && activeCategory.value.subs?.length) {
        _push(`<div class="mega-menu-panel absolute left-80 top-0 h-full z-40 bg-white rounded-r-xl border border-gray-200 shadow-2xl min-w-[680px] xl:min-w-[990px] p-8 overflow-y-auto"><div class="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">`);
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("items.index", activeCategory.value.slug),
          class: "text-lg font-bold text-gray-900 flex items-center gap-2"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              if (activeCategory.value.image) {
                _push2(`<img${ssrRenderAttr("src", `${activeCategory.value.storage_path}/${activeCategory.value.image}`)}${ssrRenderAttr("alt", activeCategory.value.name)} class="w-32 h-20 object-cover rounded-lg"${_scopeId}>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(` ${ssrInterpolate(activeCategory.value.name)}`);
            } else {
              return [
                activeCategory.value.image ? (openBlock(), createBlock("img", {
                  key: 0,
                  src: `${activeCategory.value.storage_path}/${activeCategory.value.image}`,
                  alt: activeCategory.value.name,
                  class: "w-32 h-20 object-cover rounded-lg"
                }, null, 8, ["src", "alt"])) : createCommentVNode("", true),
                createTextVNode(" " + toDisplayString(activeCategory.value.name), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("items.index", activeCategory.value.slug),
          class: "text-brand-500 text-sm font-semibold hover:text-brand-600 flex items-center gap-1"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` ყველას ნახვა <i class="pi pi-arrow-right text-xs!"${_scopeId}></i>`);
            } else {
              return [
                createTextVNode(" ყველას ნახვა "),
                createVNode("i", { class: "pi pi-arrow-right text-xs!" })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div><div class="grid grid-cols-2 xl:grid-cols-3 gap-x-12 gap-y-6"><!--[-->`);
        ssrRenderList(activeCategory.value.subs, (sub) => {
          _push(`<div>`);
          _push(ssrRenderComponent(unref(Link), {
            href: _ctx.route("items.index", [activeCategory.value.slug, sub.slug]),
            class: "text-sm font-semibold text-gray-900 hover:text-brand-400 mb- 2 pb- 1.5 borde r-b border-gray-100 inline-block"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                if (sub.image) {
                  _push2(`<img${ssrRenderAttr("src", `${sub.storage_path}/${sub.image}`)}${ssrRenderAttr("alt", sub.name)} class="w-32 h-20 mb-2 object-cover rounded-lg shadow-sm"${_scopeId}>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(` ${ssrInterpolate(sub.name)} ${ssrInterpolate(sub.items_count ? `(${sub.items_count})` : sub.items.length < 1 ? "(0)" : "")}`);
              } else {
                return [
                  sub.image ? (openBlock(), createBlock("img", {
                    key: 0,
                    src: `${sub.storage_path}/${sub.image}`,
                    alt: sub.name,
                    class: "w-32 h-20 mb-2 object-cover rounded-lg shadow-sm"
                  }, null, 8, ["src", "alt"])) : createCommentVNode("", true),
                  createTextVNode(" " + toDisplayString(sub.name) + " " + toDisplayString(sub.items_count ? `(${sub.items_count})` : sub.items.length < 1 ? "(0)" : ""), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`<ul class="space-y-1.5 mt-2"><!--[-->`);
          ssrRenderList(sub.items, (item) => {
            _push(`<li>`);
            _push(ssrRenderComponent(unref(Link), {
              href: _ctx.route("items.index", [activeCategory.value.slug, sub.slug, item.slug]),
              class: "text-sm text-gray-500 hover:text-brand-400 transition-colors"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`${ssrInterpolate(item.name)} ${ssrInterpolate(item.items_count ? `(${item.items_count})` : "(0)")}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(item.name) + " " + toDisplayString(item.items_count ? `(${item.items_count})` : "(0)"), 1)
                  ];
                }
              }),
              _: 2
            }, _parent));
            _push(`</li>`);
          });
          _push(`<!--]--></ul></div>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Shared/menu/LargeDeviceMegaMenu.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    carouselItems: {
      type: Array,
      default: []
    }
  },
  setup(__props) {
    const page = usePage();
    const categories = page.props.categories ?? [];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<meta name="description" content="Sonniva - ავეჯის ფიტინგები, სახელურები, სასრიალოები და სამშენებლო მასალები. საუკეთესო ხარისხი და ფასები საქართველოში."${_scopeId}><meta property="og:type" content="website"${_scopeId}><meta property="og:site_name" content="Sonniva"${_scopeId}><meta property="og:title" content="Sonniva"${_scopeId}><meta property="og:description" content="Sonniva - ავეჯის ფიტინგები, სახელურები, სასრიალოები და სამშენებლო მასალები. საუკეთესო ხარისხი და ფასები საქართველოში."${_scopeId}><meta property="og:url"${ssrRenderAttr("content", _ctx.$page.props.ziggy.location)}${_scopeId}><meta property="og:image"${ssrRenderAttr("content", `${_ctx.$page.props.ziggy.url}/logo/logo.png`)}${_scopeId}>`);
          } else {
            return [
              createVNode("meta", {
                name: "description",
                content: "Sonniva - ავეჯის ფიტინგები, სახელურები, სასრიალოები და სამშენებლო მასალები. საუკეთესო ხარისხი და ფასები საქართველოში."
              }),
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
                content: "Sonniva"
              }),
              createVNode("meta", {
                property: "og:description",
                content: "Sonniva - ავეჯის ფიტინგები, სახელურები, სასრიალოები და სამშენებლო მასალები. საუკეთესო ხარისხი და ფასები საქართველოში."
              }),
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
      _push(`<div class="flex gap-x-4 mt-4">`);
      _push(ssrRenderComponent(_sfc_main$1, {
        class: "hidden lg:flex",
        categories: unref(categories)
      }, null, _parent));
      _push(`<div class="flex-1 rounded-lg">`);
      _push(ssrRenderComponent(_sfc_main$2, null, null, _parent));
      _push(`</div></div><div class="flex flex-col"><!--[-->`);
      ssrRenderList(__props.carouselItems, (carousel) => {
        _push(ssrRenderComponent(_sfc_main$3, {
          key: carousel.title,
          title: carousel.title,
          items: carousel.items,
          mousewheel: false
        }, null, _parent));
      });
      _push(`<!--]--></div><!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Home/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=Index-BnTFaePB.js.map
