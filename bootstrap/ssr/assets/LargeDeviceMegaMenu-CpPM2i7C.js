import { R as Ripple } from "./index-YvTnrAwi.js";
import { mergeProps, unref, withCtx, createVNode, openBlock, createBlock, Fragment, renderList, useSSRContext, ref, toDisplayString, createCommentVNode, createTextVNode } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrRenderTeleport, ssrRenderClass, ssrGetDirectiveProps, ssrInterpolate } from "vue/server-renderer";
import { usePage, Link } from "@inertiajs/vue3";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay } from "swiper/modules";
/* empty css                */
const _sfc_main$1 = {
  __name: "MegaMenuRightPanel",
  __ssrInlineRender: true,
  setup(__props) {
    const modules = [Autoplay];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "grid grid-cols-5 gap-3 px-4 h-[calc(100vh-100px)]" }, _attrs))}><div class="col-span-5 xl:col-span-3 xl:row-span-2 h-full relative rounded-xl overflow-hidden"><img src="/frame-examples/fur1.jpeg" alt="frame" class="w-full h-full object-cover"></div><div class="col-span-5 xl:col-span-2 h-full relative rounded-xl overflow-hidden">`);
      _push(ssrRenderComponent(unref(Swiper), {
        modules,
        "slides-per-view": 1,
        loop: true,
        autoplay: { delay: 3e3, disableOnInteraction: false },
        class: "h-full w-full"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList([1, 2, 3], (n) => {
              _push2(ssrRenderComponent(unref(SwiperSlide), {
                key: n,
                class: "h-full!"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<img${ssrRenderAttr("src", `/door-examples/picture${n}.png`)}${ssrRenderAttr("alt", `door ${n}`)} class="w-full h-full object-cover"${_scopeId2}>`);
                  } else {
                    return [
                      createVNode("img", {
                        src: `/door-examples/picture${n}.png`,
                        alt: `door ${n}`,
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
              (openBlock(), createBlock(Fragment, null, renderList([1, 2, 3], (n) => {
                return createVNode(unref(SwiperSlide), {
                  key: n,
                  class: "h-full!"
                }, {
                  default: withCtx(() => [
                    createVNode("img", {
                      src: `/door-examples/picture${n}.png`,
                      alt: `door ${n}`,
                      class: "w-full h-full object-cover"
                    }, null, 8, ["src", "alt"])
                  ]),
                  _: 2
                }, 1024);
              }), 64))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="absolute bottom-0 left-0 right-0 p-4 z-10 flex items-center justify-between bg-black/50"><div><p class="text-white font-semibold text-sm">მემბრანული კარები</p><p class="text-white/90 text-xs">შეუკვეთეთ მემბრანული კარები თქვენთვის სასურველ ზომებში და ფერებში</p></div><a href="https://frame.sonniva.ge/ka/doors" target="_blank" rel="noopener noreferrer" class="flex items-center gap-x-1.5 shrink-0 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full hover:bg-white/30 transition-colors"><span>იხილეთ</span><i class="pi pi-external-link text-xs"></i></a></div></div><div class="col-span-5 xl:col-span-2 h-full relative rounded-xl overflow-hidden">`);
      _push(ssrRenderComponent(unref(Swiper), {
        modules,
        "slides-per-view": 1,
        loop: true,
        autoplay: { delay: 3e3, disableOnInteraction: false },
        class: "h-full w-full"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList([1, 2, 3], (n) => {
              _push2(ssrRenderComponent(unref(SwiperSlide), {
                key: n,
                class: "h-full!"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<img${ssrRenderAttr("src", `/frame-examples/fur${n}.jpeg`)}${ssrRenderAttr("alt", `door ${n}`)} class="w-full h-full object-cover"${_scopeId2}>`);
                  } else {
                    return [
                      createVNode("img", {
                        src: `/frame-examples/fur${n}.jpeg`,
                        alt: `door ${n}`,
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
              (openBlock(), createBlock(Fragment, null, renderList([1, 2, 3], (n) => {
                return createVNode(unref(SwiperSlide), {
                  key: n,
                  class: "h-full!"
                }, {
                  default: withCtx(() => [
                    createVNode("img", {
                      src: `/frame-examples/fur${n}.jpeg`,
                      alt: `door ${n}`,
                      class: "w-full h-full object-cover"
                    }, null, 8, ["src", "alt"])
                  ]),
                  _: 2
                }, 1024);
              }), 64))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="absolute bottom-0 left-0 right-0 p-4 z-10 flex items-center justify-between bg-black/50"><div><p class="text-white font-semibold text-sm">ალუმინის ჩარჩოები</p><p class="text-white/90 text-xs">ჩვენ ვამზადებთ ალუმინის ჩარჩოებს თქვენთვის სასურველ ზომებში</p></div><a href="https://frame.sonniva.ge/ka/frames/create" target="_blank" rel="noopener noreferrer" class="flex items-center gap-x-1.5 shrink-0 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full hover:bg-white/30 transition-colors"><span>იხილეთ</span><i class="pi pi-external-link text-xs"></i></a></div></div><div class="col-span-5 grid grid-cols-1 xl:grid-cols-3 gap-3"><div class="flex items-center gap-3 bg-blue-50 rounded-2xl px-4 py-3"><span class="text-2xl shrink-0">🚚</span><div><p class="text-xs font-semibold text-gray-800">უფასო მიწოდება</p><p class="text-xs text-gray-400">100₾+</p></div></div><div class="flex items-center gap-3 bg-pink-50 rounded-2xl px-4 py-3"><span class="text-2xl shrink-0">💎</span><div><p class="text-xs font-semibold text-gray-800">ტოპ ბრენდები</p><p class="text-xs text-gray-400">პრემიუმ ხარისხი</p></div></div><div class="flex items-center gap-3 bg-amber-50 rounded-2xl px-4 py-3"><span class="text-2xl shrink-0">⭐</span><div><p class="text-xs font-semibold text-gray-800">ტოპ სელერი</p><p class="text-xs text-gray-400">პოპულარული</p></div></div></div></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Shared/components/MegaMenuRightPanel.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
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
              _push2(`<p class="flex items-center gap-3"${_scopeId}><img${ssrRenderAttr("src", `categories-icons/${category.code}.png?v=2`)}${ssrRenderAttr("alt", category.name)} class="w-12 h-12 object-cover rounded-lg"${_scopeId}><span class="${ssrRenderClass([[category.name === "Sale" ? "text-brand-500" : activeCategory.value?.name === category.name ? "text-brand-400" : "text-gray-700"], "text-sm font-medium"])}"${_scopeId}>${ssrInterpolate(category.name)}</span></p><i class="${ssrRenderClass([activeCategory.value?.name === category.name ? "text-brand-400" : "text-gray-400", "pi pi-chevron-right text-xs"])}"${_scopeId}></i>`);
            } else {
              return [
                createVNode("p", { class: "flex items-center gap-3" }, [
                  createVNode("img", {
                    src: `categories-icons/${category.code}.png?v=2`,
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
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Shared/menu/LargeDeviceMegaMenu.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _,
  _sfc_main$1 as a
};
//# sourceMappingURL=LargeDeviceMegaMenu-CpPM2i7C.js.map
