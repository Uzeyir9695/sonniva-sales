import { s as script } from "./index-nsBhLTBN.js";
import { ref, computed, mergeProps, useSSRContext, reactive, watch, unref, withCtx, createTextVNode, createVNode, openBlock, createBlock, toDisplayString, Fragment, renderList, createCommentVNode } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrRenderAttr, ssrRenderClass, ssrRenderSlot, ssrInterpolate, ssrRenderComponent, ssrRenderStyle, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { usePage, Link } from "@inertiajs/vue3";
import axios from "axios";
import { S as STORAGE_KEYS, u as useCart } from "./useCart-CWhz1Vmq.js";
import { u as usePricing, a as getDisplayUOM } from "./usePricing-HxfzG07E.js";
const _sfc_main$3 = {
  __name: "ItemImageSwitcher",
  __ssrInlineRender: true,
  props: {
    item: Object,
    isQuickView: {
      type: Boolean,
      default: false
    }
  },
  setup(__props) {
    const props = __props;
    const activeIndex = ref(0);
    const images = computed(() => {
      if (props.item?.images?.length) return props.item.images;
      return null;
    });
    const displayImages = computed(() => {
      if (images.value?.length) return images.value;
      if (props.item?.image) return [props.item.image];
      return [];
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative select-none" }, _attrs))}><div class="relative overflow-hidden aspect-square cursor-pointer">`);
      if (displayImages.value.length) {
        _push(`<!--[-->`);
        ssrRenderList(displayImages.value, (img, i) => {
          _push(`<img${ssrRenderAttr("src", `${__props.item.storage_path}/${img}`)}${ssrRenderAttr("alt", __props.item?.name)} class="${ssrRenderClass([i === activeIndex.value ? "opacity-100" : "opacity-0", "absolute inset-0 w-full h-full object-cover transition-opacity duration-200"])}">`);
        });
        _push(`<!--]-->`);
      } else {
        _push(`<div class="w-full h-full flex items-center justify-center bg-gray-100"><i class="pi pi-image text-3xl text-gray-300"></i></div>`);
      }
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
      if (displayImages.value.length > 1) {
        _push(`<div class="${ssrRenderClass([__props.isQuickView ? "opacity-100" : "opacity-0", "flex gap-1 px-3 pt-2 pb-1 opaci ty-0 group-hover:opacity-100 transition-opacity duration-200"])}"><!--[-->`);
        ssrRenderList(displayImages.value, (_, i) => {
          _push(`<div class="${ssrRenderClass([i === activeIndex.value ? "bg-brand-300" : "bg-gray-200", "h-[3px] flex-1 rounded-full transition-all duration-150"])}"></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Shared/components/ItemImageSwitcher.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const state = reactive({
  wishlisted: {},
  // { [itemId]: true }
  loading: {},
  // { [itemId]: true } while request is in flight
  ready: false
});
let lastSetupLoginState = null;
function useWishlist() {
  const page = usePage();
  const isLoggedIn = computed(() => !!page.props?.isLoggedIn);
  function clearState() {
    state.ready = false;
    Object.keys(state.wishlisted).forEach((k) => delete state.wishlisted[k]);
    Object.keys(state.loading).forEach((k) => delete state.loading[k]);
  }
  function setup() {
    const currentLoginState = isLoggedIn.value;
    if (state.ready && lastSetupLoginState !== null && lastSetupLoginState !== currentLoginState) {
      if (lastSetupLoginState === true) {
        saveToStorage();
      }
      clearState();
    }
    if (state.ready) return;
    lastSetupLoginState = currentLoginState;
    if (isLoggedIn.value) {
      const serverIds = new Set((page.props.wishlist?.ids ?? []).map(String));
      const guestIds = loadFromStorage().map(String);
      const unsyncedIds = guestIds.filter((id) => !serverIds.has(id));
      if (unsyncedIds.length) {
        axios.post(route("api.wishlist.sync"), { item_ids: unsyncedIds }).then(({ data }) => {
          Object.keys(state.wishlisted).forEach((k) => delete state.wishlisted[k]);
          (data.wishlisted_ids ?? []).forEach((id) => {
            state.wishlisted[String(id)] = true;
          });
          localStorage.removeItem(STORAGE_KEYS.guestWishlist);
        }).catch(() => {
        });
      }
      serverIds.forEach((id) => {
        state.wishlisted[id] = true;
      });
      unsyncedIds.forEach((id) => {
        state.wishlisted[id] = true;
      });
    } else {
      loadFromStorage().forEach((id) => {
        state.wishlisted[String(id)] = true;
      });
    }
    state.ready = true;
  }
  async function toggle(itemId) {
    const id = String(itemId);
    if (state.loading[id]) return;
    state.loading[id] = true;
    const alreadySaved = !!state.wishlisted[id];
    state.wishlisted[id] = !alreadySaved;
    try {
      if (isLoggedIn.value) {
        const { data } = await axios.post(route("api.wishlist.toggle", id));
        state.wishlisted[id] = data.wishlisted;
      } else {
        saveToStorage();
      }
    } catch (error) {
      state.wishlisted[id] = alreadySaved;
      console.error("[Wishlist] toggle failed", error);
    } finally {
      delete state.loading[id];
    }
  }
  function isWishlisted(itemId) {
    return !!state.wishlisted[String(itemId)];
  }
  function isLoading(itemId) {
    return !!state.loading[String(itemId)];
  }
  const count = computed(
    () => Object.values(state.wishlisted).filter(Boolean).length
  );
  function loadFromStorage() {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.guestWishlist);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  }
  function saveToStorage() {
    try {
      const ids = Object.keys(state.wishlisted).filter((id) => state.wishlisted[id]);
      localStorage.setItem(STORAGE_KEYS.guestWishlist, JSON.stringify(ids));
    } catch {
    }
  }
  setup();
  watch(
    () => ({ ...state.wishlisted }),
    () => {
      if (!isLoggedIn.value && state.ready) saveToStorage();
    },
    { deep: true }
  );
  return { toggle, isWishlisted, isLoading, count };
}
const _sfc_main$2 = {
  __name: "WishlistButton",
  __ssrInlineRender: true,
  props: {
    itemId: { type: [Number, String], required: true },
    size: { type: String, default: "md" }
    // 'sm' | 'md' | 'lg'
  },
  setup(__props) {
    const props = __props;
    const { isWishlisted, isLoading } = useWishlist();
    const buttonClasses = computed(() => [
      "relative cursor-pointer inline-flex items-center justify-center rounded-full shadow-md",
      "transition-all duration-200",
      "focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400",
      "disabled:cursor-wait disabled:opacity-60",
      { sm: "w-7 h-7", md: "w-8 h-8", lg: "w-12 h-12" }[props.size],
      isWishlisted(props.itemId) ? "bg-red-50 border-red-300 text-red-500 hover:bg-red-100" : "bg-white/80 border-gray-200 text-gray-400 hover:bg-red-50 hover:border-red-300 hover:text-red-400"
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<button${ssrRenderAttrs(mergeProps({
        type: "button",
        "aria-label": unref(isWishlisted)(__props.itemId) ? "Remove from wishlist" : "Add to wishlist",
        disabled: unref(isLoading)(__props.itemId),
        class: buttonClasses.value
      }, _attrs))}><i class="${ssrRenderClass(["text-sm", unref(isWishlisted)(__props.itemId) ? "pi pi-heart-fill" : "pi pi-heart"])}"></i></button>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Shared/components/WishlistButton.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "CartCountBadge",
  __ssrInlineRender: true,
  props: {
    item: {
      type: Object
    }
  },
  setup(__props) {
    const { isInCart, getQuantity } = useCart();
    return (_ctx, _push, _parent, _attrs) => {
      if (unref(isInCart)(__props.item.id)) {
        _push(`<span${ssrRenderAttrs(mergeProps({ class: "absolute -top-1.5 -right-1.5 min-w-4 h-4 flex items-center justify-center rounded-full bg-white text-brand-500 text-[10px] font-bold leading-none ring-2 ring-brand-500 z-1" }, _attrs))}>${ssrInterpolate(unref(getQuantity)(__props.item.id) > 99 ? "99+" : unref(getQuantity)(__props.item.id))}</span>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Shared/components/CartCountBadge.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "QuickViewDialog",
  __ssrInlineRender: true,
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    item: Object
  },
  emits: ["update:visible", "details-clicked"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const { addToCart, buyNow, isInCart } = useCart();
    const handleDetailsClick = () => {
      emit("update:visible", false);
      emit("details-clicked");
    };
    const show = computed({
      get: () => props.visible,
      set: (val) => emit("update:visible", val)
    });
    const inStock = computed(() => props.item?.inventory && props.item.inventory > 0);
    const { displayPrice, displayUOM } = usePricing(() => props.item);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Dialog = script;
      _push(ssrRenderComponent(_component_Dialog, mergeProps({
        visible: show.value,
        "onUpdate:visible": ($event) => show.value = $event,
        modal: "",
        closable: true,
        draggable: false,
        style: { width: "990px", maxWidth: "95vw", borderRadius: "1.5rem", overflow: "hidden" },
        pt: {
          root: { class: "!rounded-3xl !overflow-hidden !border-0 !shadow-2xl !mx-4" },
          header: { class: "self-end" },
          content: { class: "!p-0" },
          mask: { class: "backdrop-blur-sm" },
          closeButton: { style: "display:none" }
        }
      }, _attrs), {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) ;
          else {
            return [];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (__props.item) {
              _push2(`<div class="grid grid-cols-1 sm:grid-cols-5 p-3"${_scopeId}><div class="col-span-2"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$3, {
                item: __props.item,
                "is-quick-view": true
              }, null, _parent2, _scopeId));
              _push2(`</div><div class="col-span-3"${_scopeId}><div class="p-6 sm:p-8 flex flex-col relative"${_scopeId}><div class="flex justify-between items-center mb-2"${_scopeId}><span class="${ssrRenderClass([inStock.value ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-600", "text-[11px] font-semibold px-2.5 py-0.5 rounded-full"])}"${_scopeId}>${ssrInterpolate(inStock.value ? "მარაგშია" : "მარაგში არაა")}</span>`);
              _push2(ssrRenderComponent(_sfc_main$2, {
                "item-id": __props.item?.id,
                size: "md"
              }, null, _parent2, _scopeId));
              _push2(`</div><h2 class="sm:text-xl font-semibold text-gray-900 mt-2 mb-2 leading-snug pr-6" style="${ssrRenderStyle({ "font-family": "'Playfair Display', serif" })}"${_scopeId}>${ssrInterpolate(__props.item.name)}</h2>`);
              if (__props.item.attributes?.length) {
                _push2(`<div class="flex flex-col gap-1.5 my-4 flex-1"${_scopeId}><!--[-->`);
                ssrRenderList(__props.item.attributes, (attr) => {
                  _push2(`<div class="flex items-center justify-between py-1.5 px-3 bg-gray-50 rounded-xl"${_scopeId}><span class="text-xs text-gray-500 font-medium"${_scopeId}>${ssrInterpolate(attr.name)}</span><span class="text-xs text-gray-700 font-semibold"${_scopeId}>${ssrInterpolate(attr.value)}</span></div>`);
                });
                _push2(`<!--]--></div>`);
              } else {
                _push2(`<div class="flex-1"${_scopeId}></div>`);
              }
              _push2(`<div class="border-t border-gray-100 pt-5 mt-2"${_scopeId}><div class="text-2xl font-bold text-gray-900 mb-4"${_scopeId}>`);
              if (unref(displayPrice)) {
                _push2(`<!--[-->${ssrInterpolate(unref(displayPrice))} ₾ `);
                if (unref(displayUOM)) {
                  _push2(`<span class="text-sm font-normal text-gray-400"${_scopeId}>/ ${ssrInterpolate(unref(displayUOM))}</span>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`<!--]-->`);
              } else {
                _push2(`<!--[-->—<!--]-->`);
              }
              _push2(`</div><div class="flex flex-col sm:flex-row items-center gap-2"${_scopeId}>`);
              if (inStock.value) {
                _push2(`<button${ssrIncludeBooleanAttr(!inStock.value) ? " disabled" : ""} class="${ssrRenderClass([inStock.value ? "bg- brand-500 text- white hover:bg-brand-400" : "bg-gray-100 text-gray-400 cursor-not-allowed", "flex-1 flex items-center justify-center gap-2 px-4 cursor-pointer text-sm font-semibold py-3 rounded-2xl border border-gray-500 text-gray-900 hover:bg-gray-800 hover:text-white active:scale-[0.98] transition-all"])}"${_scopeId}><i class="pi pi-bolt"${_scopeId}></i> შეუკვეთე ახლავე </button>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<button${ssrIncludeBooleanAttr(!inStock.value && unref(isInCart)(__props.item.id)) ? " disabled" : ""} class="${ssrRenderClass([inStock.value ? "bg-brand-500 text-white hover:bg-brand-400" : "border border-dashed border-brand-400 text-brand-500 hover:bg-brand-50", "relative flex-1 flex items-center justify-center gap-2 px-4 cursor-pointer text-sm font-semibold py-3 rounded-2xl transition-all duration-150 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"])}"${_scopeId}><i class="${ssrRenderClass(unref(isInCart)(__props.item.id) ? "pi pi-shopping-cart" : "pi pi-cart-plus")}"${_scopeId}></i> კალათაში დამატება `);
              _push2(ssrRenderComponent(_sfc_main$1, { item: __props.item }, null, _parent2, _scopeId));
              _push2(`</button></div>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("items.show", __props.item.slug),
                class: "mt-3 w-full flex items-center justify-center gap-1.5 text-sm text-gray-400 hover:text-gray-700 transition-colors py-2",
                onClick: handleDetailsClick
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` დეტალურად ნახვა <i class="pi pi-arrow-right text-xs"${_scopeId2}></i>`);
                  } else {
                    return [
                      createTextVNode(" დეტალურად ნახვა "),
                      createVNode("i", { class: "pi pi-arrow-right text-xs" })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              __props.item ? (openBlock(), createBlock("div", {
                key: 0,
                class: "grid grid-cols-1 sm:grid-cols-5 p-3"
              }, [
                createVNode("div", { class: "col-span-2" }, [
                  createVNode(_sfc_main$3, {
                    item: __props.item,
                    "is-quick-view": true
                  }, null, 8, ["item"])
                ]),
                createVNode("div", { class: "col-span-3" }, [
                  createVNode("div", { class: "p-6 sm:p-8 flex flex-col relative" }, [
                    createVNode("div", { class: "flex justify-between items-center mb-2" }, [
                      createVNode("span", {
                        class: ["text-[11px] font-semibold px-2.5 py-0.5 rounded-full", inStock.value ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-600"]
                      }, toDisplayString(inStock.value ? "მარაგშია" : "მარაგში არაა"), 3),
                      createVNode(_sfc_main$2, {
                        "item-id": __props.item?.id,
                        size: "md"
                      }, null, 8, ["item-id"])
                    ]),
                    createVNode("h2", {
                      class: "sm:text-xl font-semibold text-gray-900 mt-2 mb-2 leading-snug pr-6",
                      style: { "font-family": "'Playfair Display', serif" }
                    }, toDisplayString(__props.item.name), 1),
                    __props.item.attributes?.length ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "flex flex-col gap-1.5 my-4 flex-1"
                    }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(__props.item.attributes, (attr) => {
                        return openBlock(), createBlock("div", {
                          key: attr.id,
                          class: "flex items-center justify-between py-1.5 px-3 bg-gray-50 rounded-xl"
                        }, [
                          createVNode("span", { class: "text-xs text-gray-500 font-medium" }, toDisplayString(attr.name), 1),
                          createVNode("span", { class: "text-xs text-gray-700 font-semibold" }, toDisplayString(attr.value), 1)
                        ]);
                      }), 128))
                    ])) : (openBlock(), createBlock("div", {
                      key: 1,
                      class: "flex-1"
                    })),
                    createVNode("div", { class: "border-t border-gray-100 pt-5 mt-2" }, [
                      createVNode("div", { class: "text-2xl font-bold text-gray-900 mb-4" }, [
                        unref(displayPrice) ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                          createTextVNode(toDisplayString(unref(displayPrice)) + " ₾ ", 1),
                          unref(displayUOM) ? (openBlock(), createBlock("span", {
                            key: 0,
                            class: "text-sm font-normal text-gray-400"
                          }, "/ " + toDisplayString(unref(displayUOM)), 1)) : createCommentVNode("", true)
                        ], 64)) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                          createTextVNode("—")
                        ], 64))
                      ]),
                      createVNode("div", { class: "flex flex-col sm:flex-row items-center gap-2" }, [
                        inStock.value ? (openBlock(), createBlock("button", {
                          key: 0,
                          onClick: ($event) => unref(buyNow)(__props.item.id, 1, unref(getDisplayUOM)(__props.item)),
                          disabled: !inStock.value,
                          class: ["flex-1 flex items-center justify-center gap-2 px-4 cursor-pointer text-sm font-semibold py-3 rounded-2xl border border-gray-500 text-gray-900 hover:bg-gray-800 hover:text-white active:scale-[0.98] transition-all", inStock.value ? "bg- brand-500 text- white hover:bg-brand-400" : "bg-gray-100 text-gray-400 cursor-not-allowed"]
                        }, [
                          createVNode("i", { class: "pi pi-bolt" }),
                          createTextVNode(" შეუკვეთე ახლავე ")
                        ], 10, ["onClick", "disabled"])) : createCommentVNode("", true),
                        createVNode("button", {
                          onClick: ($event) => unref(addToCart)(__props.item.id, 1, unref(getDisplayUOM)(__props.item)),
                          disabled: !inStock.value && unref(isInCart)(__props.item.id),
                          class: ["relative flex-1 flex items-center justify-center gap-2 px-4 cursor-pointer text-sm font-semibold py-3 rounded-2xl transition-all duration-150 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed", inStock.value ? "bg-brand-500 text-white hover:bg-brand-400" : "border border-dashed border-brand-400 text-brand-500 hover:bg-brand-50"]
                        }, [
                          createVNode("i", {
                            class: unref(isInCart)(__props.item.id) ? "pi pi-shopping-cart" : "pi pi-cart-plus"
                          }, null, 2),
                          createTextVNode(" კალათაში დამატება "),
                          createVNode(_sfc_main$1, { item: __props.item }, null, 8, ["item"])
                        ], 10, ["onClick", "disabled"])
                      ]),
                      createVNode(unref(Link), {
                        href: _ctx.route("items.show", __props.item.slug),
                        class: "mt-3 w-full flex items-center justify-center gap-1.5 text-sm text-gray-400 hover:text-gray-700 transition-colors py-2",
                        onClick: handleDetailsClick
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" დეტალურად ნახვა "),
                          createVNode("i", { class: "pi pi-arrow-right text-xs" })
                        ]),
                        _: 1
                      }, 8, ["href"])
                    ])
                  ])
                ])
              ])) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Shared/components/QuickViewDialog.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main$1 as _,
  _sfc_main as a,
  _sfc_main$2 as b,
  _sfc_main$3 as c,
  useWishlist as u
};
//# sourceMappingURL=QuickViewDialog-DUZFQ2la.js.map
