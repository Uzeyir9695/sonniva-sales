import { computed, unref, mergeProps, withCtx, createVNode, useSSRContext, ref, onMounted, onUnmounted, createTextVNode, openBlock, createBlock, createCommentVNode, toDisplayString, watch, Transition } from "vue";
import { ssrRenderComponent, ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderTeleport, ssrGetDirectiveProps, ssrRenderAttr } from "vue/server-renderer";
import { usePage, Link } from "@inertiajs/vue3";
import "./LargeDeviceMegaMenu-BTuhYPM0.js";
import { R as Ripple } from "./index-YvTnrAwi.js";
import { onClickOutside } from "@vueuse/core";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import { T as Tooltip } from "./index-C3Ts-4IM.js";
import axios from "axios";
import { g as getDisplayPrice, d as getDisplayUOM, _ as _sfc_main$8, a as _sfc_main$9, e as useWishlist } from "./QuickViewDialog-DxRTEkkJ.js";
import { u as useCart } from "./useCart-CDiIlQ6W.js";
const _sfc_main$7 = {
  __name: "LogoutButton",
  __ssrInlineRender: true,
  setup(__props) {
    const page = usePage();
    const isAuthenticated = computed(() => page.props.isLoggedIn);
    return (_ctx, _push, _parent, _attrs) => {
      if (isAuthenticated.value) {
        _push(ssrRenderComponent(unref(Link), mergeProps({
          href: _ctx.route("logout"),
          method: "post",
          as: "button",
          type: "button",
          replace: true,
          class: "flex items-center gap-x-2 text-sm cursor-pointer"
        }, _attrs), {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<i class="pi pi-sign-out text-sm ml-1 text-gray-400"${_scopeId}></i><span class="max-sm:hid"${_scopeId}>გასვლა</span>`);
            } else {
              return [
                createVNode("i", { class: "pi pi-sign-out text-sm ml-1 text-gray-400" }),
                createVNode("span", { class: "max-sm:hid" }, "გასვლა")
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Shared/components/LogoutButton.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const _sfc_main$6 = {
  __name: "WeglotSwitcher",
  __ssrInlineRender: true,
  setup(__props) {
    const currentLang = ref("ka");
    const languages = ref([]);
    const open = ref(false);
    const flagMap = {
      ka: "🇬🇪",
      ru: "🇷🇺",
      en: "🇬🇧",
      tr: "🇹🇷"
    };
    const nameMap = {
      ka: "GEO",
      ru: "RUS",
      en: "ENG",
      tr: "TUR"
    };
    const fullNameMap = {
      ka: "ქართული",
      ru: "Русский",
      en: "English",
      tr: "Türkçe"
    };
    const langOrder = ["ka", "en", "ru", "tr"];
    onMounted(() => {
      const init = () => {
        if (typeof Weglot === "undefined") return;
        const available = Weglot.options.languages.map((l) => l.language_to).concat(Weglot.options.language_from);
        languages.value = available.sort(
          (a, b) => langOrder.indexOf(a) - langOrder.indexOf(b)
        );
        currentLang.value = Weglot.getCurrentLang();
        Weglot.on("languageChanged", (lang) => {
          currentLang.value = lang;
          open.value = false;
        });
      };
      if (typeof Weglot !== "undefined" && Weglot.getCurrentLang) {
        init();
      } else {
        document.addEventListener("weglot:initialized", init);
        const interval = setInterval(() => {
          if (typeof Weglot !== "undefined" && Weglot.getCurrentLang) {
            init();
            clearInterval(interval);
          }
        }, 200);
      }
    });
    function onClickOutside2(e) {
      if (!e.target.closest(".weglot-switcher")) {
        open.value = false;
      }
    }
    onMounted(() => document.addEventListener("mousedown", onClickOutside2));
    onUnmounted(() => document.removeEventListener("mousedown", onClickOutside2));
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "weglot-switcher relative" }, _attrs))}><button class="flex items-center justify-center md:w-8 md:h-8 lg:w-10 lg:h-10 gap-1.5 rounded-full text-gray-600 hover:bg-gray-100 transition-all cursor-pointer"><span class="text-2xl leading-none">${ssrInterpolate(flagMap[currentLang.value] ?? "🌐")}</span><span data-wg-notranslate class="sm:hidden text-sm font-medium text-gray-600"><span>${ssrInterpolate(fullNameMap[currentLang.value] ?? currentLang.value.toUpperCase())}</span></span></button>`);
      if (open.value) {
        _push(`<div class="absolute sm:left-1/2 sm:-translate-x-1/2 top-full mt-2 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden z-50 min-w-[110px]"><!--[-->`);
        ssrRenderList(languages.value, (lang) => {
          _push(`<button class="${ssrRenderClass([currentLang.value === lang ? "text-brand-500 font-semibold bg-brand-50/50" : "text-gray-700", "w-full flex items-center gap-2.5 px-4 py-2.5 text-sm cursor-pointer hover:bg-gray-50 transition-colors"])}"><span class="text-base">${ssrInterpolate(flagMap[lang] ?? "🌐")}</span><span data-wg-notranslate><span class="hidden sm:inline">${ssrInterpolate(nameMap[lang] ?? lang.toUpperCase())}</span><span class="sm:hidden">${ssrInterpolate(fullNameMap[lang] ?? lang.toUpperCase())}</span></span>`);
          if (currentLang.value === lang) {
            _push(`<i class="pi pi-check text-xs ml-auto text-brand-500"></i>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</button>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Shared/components/WeglotSwitcher.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const _sfc_main$5 = {
  __name: "SmallDeviceMegaMenu",
  __ssrInlineRender: true,
  props: {
    categories: Array
  },
  setup(__props, { expose: __expose }) {
    const props = __props;
    const drawerOpen = ref(false);
    const drawerRef = ref(null);
    const drawerButtonRef = ref(null);
    onClickOutside(drawerRef, () => closeDrawer(), { ignore: [drawerButtonRef] });
    const openDrawer = () => {
      drawerOpen.value = !drawerOpen.value;
      document.body.classList.toggle("overflow-hidden", drawerOpen.value);
    };
    const closeDrawer = () => {
      drawerOpen.value = false;
      document.body.classList.remove("overflow-hidden");
      setTimeout(() => resetStack(), 300);
    };
    const stack = ref([]);
    const fadeVisible = ref(true);
    const resetStack = () => stack.value = [];
    const currentItems = computed(() => {
      if (stack.value.length === 0) return props.categories;
      if (stack.value.length === 1) return stack.value[0].subs;
      if (stack.value.length === 2) return stack.value[1].items;
      return [];
    });
    const currentTitle = computed(() => {
      if (stack.value.length === 0) return "აირჩიე კატეგორია";
      return stack.value[stack.value.length - 1].name;
    });
    const getItemRoute = (item) => {
      if (stack.value.length === 0) {
        return route("items.index", [item.slug]);
      } else if (stack.value.length === 1) {
        return route("items.index", [stack.value[0].slug, item.slug]);
      } else {
        return route("items.index", [stack.value[0].slug, stack.value[1].slug, item.slug]);
      }
    };
    const getViewAllRoute = () => {
      if (stack.value.length === 1) {
        return route("items.index", [stack.value[0].slug]);
      } else if (stack.value.length === 2) {
        return route("items.index", [stack.value[0].slug, stack.value[1].slug]);
      }
      return "#";
    };
    const hasChildren = (item) => {
      if (stack.value.length === 0) return item.subs?.length > 0;
      if (stack.value.length === 1) return item.items?.length > 0;
      return false;
    };
    __expose({ openDrawer });
    return (_ctx, _push, _parent, _attrs) => {
      const _directive_ripple = Ripple;
      _push(`<!--[--><button class="flex items-center cursor-pointer bg-brand-400 hover:bg-brand-500 text-gray-900 font-semibold p-2.5 h-fit rounded-full transition-colors" data-v-6d7023ff><i class="pi pi-th-large text-sm text-white" data-v-6d7023ff></i></button>`);
      ssrRenderTeleport(_push, (_push2) => {
        if (drawerOpen.value) {
          _push2(`<div class="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm" data-v-6d7023ff></div>`);
        } else {
          _push2(`<!---->`);
        }
        if (drawerOpen.value) {
          _push2(`<div class="fixed top-16 sm:top-20 left-0 z-50 h-[calc(100dvh-60px)] w-full sm:w-80 bg-white shadow-2xl flex flex-col" data-v-6d7023ff><div class="bg-gray-50 shado w-full sm:w-xs flex items-center justify-between px-4 py-4 border-y border-gray-100 sm:hidden" data-v-6d7023ff>`);
          _push2(ssrRenderComponent(_sfc_main$6, null, null, _parent));
          _push2(ssrRenderComponent(_sfc_main$7, null, null, _parent));
          _push2(`</div><div class="flex items-center gap-3 px-4 py-4 border-b border-gray-100" data-v-6d7023ff><div class="w-8 h-8 flex items-center justify-center rounded-full cursor-pointer hover:bg-gray-100 transition-colors shrink-0" data-v-6d7023ff><i class="pi pi-arrow-left text-gray-600 text-sm" data-v-6d7023ff></i></div><span class="font-semibold text-gray-900 text-sm" data-v-6d7023ff>${ssrInterpolate(currentTitle.value)}</span><button class="ml-auto w-8 h-8 flex items-center justify-center cursor-pointer rounded-full hover:bg-gray-100 shrink-0" data-v-6d7023ff><i class="pi pi-times text-gray-400 text-sm" data-v-6d7023ff></i></button></div><div class="small-device-menu flex-1 overflow-y-auto" data-v-6d7023ff>`);
          if (fadeVisible.value) {
            _push2(`<div class="p-2" data-v-6d7023ff>`);
            if (stack.value.length > 0) {
              _push2(ssrRenderComponent(unref(Link), {
                href: getViewAllRoute(),
                onClick: closeDrawer,
                class: "w-full flex items-center gap-2 px-5 py-3.5 rounded-xl hover:bg-gray-50 text-brand-500 font-semibold text-sm mb-1"
              }, {
                default: withCtx((_, _push3, _parent2, _scopeId) => {
                  if (_push3) {
                    _push3(`<i class="pi pi-th-large text-xs" data-v-6d7023ff${_scopeId}></i> ყველას ნახვა `);
                  } else {
                    return [
                      createVNode("i", { class: "pi pi-th-large text-xs" }),
                      createTextVNode(" ყველას ნახვა ")
                    ];
                  }
                }),
                _: 1
              }, _parent));
            } else {
              _push2(`<!---->`);
            }
            if (stack.value.length === 0) {
              _push2(`<!--[-->`);
              ssrRenderList(currentItems.value, (item) => {
                _push2(`<div class="w-full px-5 py-2 cursor-pointer rounded-xl text-gray-800 hover:bg-gray-50 hover:text-brand-400 transition-colors" data-v-6d7023ff><button${ssrRenderAttrs(mergeProps({
                  style: { "--p-ripple-background": "rgba(251, 191, 36, 0.3)" },
                  class: "w-full flex items-center justify-between cursor-pointer text-left"
                }, ssrGetDirectiveProps(_ctx, _directive_ripple)))} data-v-6d7023ff><div class="flex items-center gap-x-3" data-v-6d7023ff><img${ssrRenderAttr("src", `/categories-icons/${item.code}.png?v=1`)}${ssrRenderAttr("alt", item.name)} class="w-10 h-10 object-cover rounded-lg" data-v-6d7023ff><span class="text-sm font-medium text-inherit" data-v-6d7023ff>${ssrInterpolate(item.name)}</span></div><i class="pi pi-chevron-right text-xs text-inherit" data-v-6d7023ff></i></button></div>`);
              });
              _push2(`<!--]-->`);
            } else if (stack.value.length === 1) {
              _push2(`<div class="grid grid-cols-2 gap-3" data-v-6d7023ff><!--[-->`);
              ssrRenderList(currentItems.value, (item) => {
                _push2(`<!--[-->`);
                if (hasChildren(item)) {
                  _push2(`<div class="flex flex-col items-center text-center w-full px-2.5 py-2.5 space-y-1 cursor-pointer rounded-xl text-gray-800 shadow-sm hover:bg-gray-50 hover:text-brand-400 transition-colors" data-v-6d7023ff>`);
                  if (item.image) {
                    _push2(`<img${ssrRenderAttr("src", `${item.storage_path}/${item.image}`)}${ssrRenderAttr("alt", item.name)} class="w-32 h-20 object-cover rounded-lg mx-auto mb-2" data-v-6d7023ff>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`<button${ssrRenderAttrs(mergeProps({
                    style: { "--p-ripple-background": "rgba(251, 191, 36, 0.3)" },
                    class: "w-full flex items-center justify-center cursor-pointer gap-1"
                  }, ssrGetDirectiveProps(_ctx, _directive_ripple)))} data-v-6d7023ff><span class="text-sm font-medium text-inherit" data-v-6d7023ff>${ssrInterpolate(item.name)} ${ssrInterpolate(item.items_count ? `(${item.items_count})` : item.items?.length < 1 ? "(0)" : "")}</span><i class="pi pi-chevron-right text-xs text-amber-400" data-v-6d7023ff></i></button></div>`);
                } else {
                  _push2(ssrRenderComponent(unref(Link), mergeProps({
                    href: getItemRoute(item),
                    style: { "--p-ripple-background": "rgba(251, 191, 36, 0.3)" },
                    onClick: closeDrawer,
                    class: "flex flex-col items-center justify-center text-center w-full px-3 py-3 space-y-1 rounded-xl text-gray-800 shadow-sm hover:bg-gray-50 hover:text-brand-400 transition-colors"
                  }, ssrGetDirectiveProps(_ctx, _directive_ripple)), {
                    default: withCtx((_, _push3, _parent2, _scopeId) => {
                      if (_push3) {
                        if (item.image) {
                          _push3(`<img${ssrRenderAttr("src", `${item.storage_path}/${item.image}`)}${ssrRenderAttr("alt", item.name)} class="w-32 h-20 object-cover rounded-lg mx-auto mb-2" data-v-6d7023ff${_scopeId}>`);
                        } else {
                          _push3(`<!---->`);
                        }
                        _push3(`<span class="text-sm font-medium" data-v-6d7023ff${_scopeId}>${ssrInterpolate(item.name)} ${ssrInterpolate(item.items_count ? `(${item.items_count})` : "(0)")}</span>`);
                      } else {
                        return [
                          item.image ? (openBlock(), createBlock("img", {
                            key: 0,
                            src: `${item.storage_path}/${item.image}`,
                            alt: item.name,
                            class: "w-32 h-20 object-cover rounded-lg mx-auto mb-2"
                          }, null, 8, ["src", "alt"])) : createCommentVNode("", true),
                          createVNode("span", { class: "text-sm font-medium" }, toDisplayString(item.name) + " " + toDisplayString(item.items_count ? `(${item.items_count})` : "(0)"), 1)
                        ];
                      }
                    }),
                    _: 2
                  }, _parent));
                }
                _push2(`<!--]-->`);
              });
              _push2(`<!--]--></div>`);
            } else {
              _push2(`<!--[-->`);
              ssrRenderList(currentItems.value, (item) => {
                _push2(ssrRenderComponent(unref(Link), mergeProps({
                  key: item.name,
                  href: getItemRoute(item),
                  style: { "--p-ripple-background": "rgba(251, 191, 36, 0.3)" },
                  onClick: closeDrawer,
                  class: "w-full flex items-center justify-between px-5 py-3.5 rounded-xl cursor-pointer text-gray-800 hover:bg-gray-50 hover:text-brand-400 transition-colors"
                }, ssrGetDirectiveProps(_ctx, _directive_ripple)), {
                  default: withCtx((_, _push3, _parent2, _scopeId) => {
                    if (_push3) {
                      _push3(`<span class="text-sm font-medium text-inherit" data-v-6d7023ff${_scopeId}>${ssrInterpolate(item.name)} ${ssrInterpolate(item.items_count ? `(${item.items_count})` : "(0)")}</span>`);
                    } else {
                      return [
                        createVNode("span", { class: "text-sm font-medium text-inherit" }, toDisplayString(item.name) + " " + toDisplayString(item.items_count ? `(${item.items_count})` : "(0)"), 1)
                      ];
                    }
                  }),
                  _: 2
                }, _parent));
              });
              _push2(`<!--]-->`);
            }
            _push2(`</div>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`</div></div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Shared/menu/SmallDeviceMegaMenu.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const SmallDeviceMegaMenu = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-6d7023ff"]]);
const _sfc_main$4 = {
  __name: "SearchBar",
  __ssrInlineRender: true,
  props: {
    placeholder: { type: String, default: "მოძებნე ის რაც გჭირდება..." },
    inputClass: { type: String, default: "" }
  },
  emits: ["close"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const { isInCart, getQuantity } = useCart();
    const query = ref("");
    const results = ref([]);
    const visibleCount = ref(20);
    const loading = ref(false);
    const showDropdown = ref(false);
    const inputRef = ref(null);
    const wrapperRef = ref(null);
    const quickViewOpen = ref(false);
    const quickViewItem = ref(null);
    let debounceTimer = null;
    watch(query, (val) => {
      clearTimeout(debounceTimer);
      if (val.trim().length < 2) {
        results.value = [];
        showDropdown.value = false;
        loading.value = false;
        return;
      }
      loading.value = true;
      debounceTimer = setTimeout(async () => {
        try {
          const res = await axios.get("/api/v1/search", { params: { q: val } });
          results.value = res.data;
          visibleCount.value = 20;
          showDropdown.value = true;
        } catch {
          results.value = [];
        } finally {
          loading.value = false;
        }
      }, 450);
    });
    function imageUrl(img) {
      return `/storage/items/${img}`;
    }
    function onClickOutside2(e) {
      if (wrapperRef.value && !wrapperRef.value.contains(e.target)) {
        if (quickViewOpen.value) return;
        showDropdown.value = false;
      }
    }
    function onDetailsClick() {
      showDropdown.value = false;
      query.value = "";
    }
    onMounted(() => document.addEventListener("mousedown", onClickOutside2));
    onUnmounted(() => document.removeEventListener("mousedown", onClickOutside2));
    __expose({ inputRef });
    return (_ctx, _push, _parent, _attrs) => {
      const _directive_tooltip = Tooltip;
      _push(`<!--[-->`);
      ssrRenderTeleport(_push, (_push2) => {
        if (showDropdown.value && results.value?.length > 0) {
          _push2(`<div class="fixed inset-0 z-30 backdrop-blur-sm bg-black/20"></div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
      _push(`<div class="relative w-full"><div class="${ssrRenderClass([showDropdown.value ? "rounded-b-none border-2 border-brand-400" : "", "flex items-center bg-gray-100/60 rounded-xl px-4 h-11 gap-3 transition-all focus-within:border-2 focus-within:border-brand-400 focus-within:bg-white"])}">`);
      if (!loading.value) {
        _push(`<i class="pi pi-search text-gray-400 text-sm shrink-0"></i>`);
      } else {
        _push(`<i class="pi pi-spinner pi-spin text-brand-400 text-sm shrink-0"></i>`);
      }
      _push(`<input${ssrRenderAttr("value", query.value)}${ssrRenderAttr("placeholder", __props.placeholder)} class="w-full bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400">`);
      if (query.value) {
        _push(`<button class="text-gray-400 hover:text-gray-600 shrink-0 cursor-pointer"><i class="pi pi-times text-xs"></i></button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (showDropdown.value) {
        _push(`<div class="absolute left-0 right-0 top-full bg-white border-2 border-t-0 border-brand-400 rounded-b-xl shadow-xl z-50 sm:max-h-[700px] max-h-[560px] overflow-y-auto">`);
        if (results.value.length > 0) {
          _push(`<div class="flex flex-col sm:flex-row items-center justify-between gap-2 px-4 py-2.5 bg-gray-50 border-b border-gray-100"><div class="flex items-center justify-center gap-2 sticky top-0 text-xs font-medium text-gray-500"><i class="pi pi-search text-xs"></i> სულ მოიძებნა ${ssrInterpolate(results.value.length)} პროდუქტი </div><button class="flex items-center justify-center rounded-lg gap-x-2 sticky top-0 px-4 py-1.5 sm:py-2.5 sm:bg-gray-50 bg-slate-100 hover:bg-gray-100 cursor-pointer transition-colors text-xs font-medium text-gray-500"><i class="pi pi-eye text-xs"></i><span>ყველას ნახვა</span></button></div>`);
        } else {
          _push(`<!---->`);
        }
        if (results.value.length === 0) {
          _push(`<div class="flex flex-col items-center justify-center gap-2 py-10 text-gray-400"><i class="pi pi-search text-2xl"></i><p class="text-sm font-medium">პროდუქტი დასახელებით &quot;${ssrInterpolate(query.value)}&quot; — არ მოიძებნა</p><p class="text-xs">სცადეთ სხვა საძიებო სიტყვა</p></div>`);
        } else {
          _push(`<ul><!--[-->`);
          ssrRenderList(results.value.slice(0, visibleCount.value), (item) => {
            _push(`<li class="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 hover:bg-gray-50 cursor-pointer transition-colors border-b border-gray-100 last:border-0 group"><div class="w-18 h-18 rounded-xl overflow-hidden bg-gray-100 shrink-0">`);
            if (item.images?.length) {
              _push(`<img${ssrRenderAttr("src", imageUrl(item.images[0]))}${ssrRenderAttr("alt", item.name)} class="w-full h-full object-cover">`);
            } else {
              _push(`<div class="w-full h-full flex items-center justify-center"><i class="pi pi-image text-gray-300 text-sm"></i></div>`);
            }
            _push(`</div><div class="flex flex-col flex-1 gap-3"><div class="flex-1"><p class="text-sm text-gray-800 font-medium line-clamp-2 sm:line-clamp-2">${ssrInterpolate(item.name)}</p></div><div class="flex items-center justify-between"><div class="flex items-center gap-2"><p class="text-xs sm:text-sm text-brand-500 font-bold mt-0.5">${ssrInterpolate(unref(getDisplayPrice)(item))} ₾ `);
            if (unref(getDisplayUOM)(item)) {
              _push(`<span class="text-xs font-normal text-gray-400">/ ${ssrInterpolate(unref(getDisplayUOM)(item))}</span>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</p><span class="${ssrRenderClass([item.inventory > 0 ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-500", "text-xs px-2 py-0.5 rounded-full font-medium shrink-0"])}">${ssrInterpolate(item.inventory > 0 ? "მარაგშია" : "მარაგში არაა")}</span></div><div class="flex items-center gap-1 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity shrink-0"><button${ssrRenderAttrs(mergeProps({ class: "w-5 sm:w-7 h-5 sm:h-7 rounded-lg cursor-pointer flex items-center justify-center text-gray-400 hover:text-rose-500 hover:bg-rose-50 transition-colors" }, ssrGetDirectiveProps(_ctx, _directive_tooltip, "სურვილების სია", void 0, { top: true })))}><i class="pi pi-heart"></i></button><button${ssrRenderAttrs(mergeProps({
              disabled: item.inventory > 0 && unref(getQuantity)(item.id) >= item.inventory || item.inventory <= 0 && unref(isInCart)(item.id),
              class: "relative w-5 sm:w-7 h-5 sm:h-7 rounded-lg cursor-pointer flex items-center justify-center text-gray-400 hover:text-brand-500 hover:bg-brand-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:text-gray-400 disabled:hover:bg-transparent"
            }, ssrGetDirectiveProps(_ctx, _directive_tooltip, "დაამატე კალათაში", void 0, { top: true })))}><i class="pi pi-cart-plus"></i>`);
            _push(ssrRenderComponent(_sfc_main$8, {
              class: "-top-1.5! -right-1.5! !min-w-3 !h-3 !p-0.5",
              item
            }, null, _parent));
            _push(`</button><button${ssrRenderAttrs(mergeProps({ class: "w-5 sm:w-7 h-5 sm:h-7 rounded-lg cursor-pointer flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors" }, ssrGetDirectiveProps(_ctx, _directive_tooltip, "სწრაფი დათვალიერება", void 0, { top: true })))}><i class="pi pi-eye"></i></button></div></div></div></li>`);
          });
          _push(`<!--]--></ul>`);
        }
        if (visibleCount.value < results.value.length) {
          _push(`<button class="cursor-pointer w-full py-3 text-xs font-medium text-brand-500 hover:bg-brand-50 transition-colors"> მაჩვენე უფრო მეტი </button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      _push(ssrRenderComponent(_sfc_main$9, {
        visible: quickViewOpen.value,
        "onUpdate:visible": ($event) => quickViewOpen.value = $event,
        item: quickViewItem.value,
        onDetailsClicked: onDetailsClick
      }, null, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Shared/components/SearchBar.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = {
  __name: "WishlistNavIcon",
  __ssrInlineRender: true,
  setup(__props) {
    const { count } = useWishlist();
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Link), mergeProps({
        href: _ctx.route("wishlist.index"),
        class: "relative inline-flex items-center justify-center w-10 h-10 rounded-full text-gray-600 hover:text-red-500 hover:bg-red-50 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400",
        "aria-label": "Wishlist"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="${ssrRenderClass([unref(count) > 0 ? "pi pi-heart-fill text-red-500" : "pi pi-heart", "text-xl"])}"${_scopeId}></i>`);
            if (unref(count) > 0) {
              _push2(`<span class="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] flex items-center justify-center rounded-full bg-red-500 text-white text-[10px] font-bold leading-none"${_scopeId}>${ssrInterpolate(unref(count) > 99 ? "99+" : unref(count))}</span>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("i", {
                class: [unref(count) > 0 ? "pi pi-heart-fill text-red-500" : "pi pi-heart", "text-xl"]
              }, null, 2),
              createVNode(Transition, {
                "enter-active-class": "transition-all duration-200 origin-center",
                "enter-from-class": "scale-0 opacity-0",
                "enter-to-class": "scale-100 opacity-100",
                "leave-active-class": "transition-all duration-150",
                "leave-from-class": "scale-100 opacity-100",
                "leave-to-class": "scale-0 opacity-0"
              }, {
                default: withCtx(() => [
                  unref(count) > 0 ? (openBlock(), createBlock("span", {
                    key: 0,
                    class: "absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] flex items-center justify-center rounded-full bg-red-500 text-white text-[10px] font-bold leading-none"
                  }, toDisplayString(unref(count) > 99 ? "99+" : unref(count)), 1)) : createCommentVNode("", true)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Shared/components/WishlistNavIcon.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = {
  __name: "CartNavIcon",
  __ssrInlineRender: true,
  setup(__props) {
    const { uniqueCount } = useCart();
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Link), mergeProps({
        href: _ctx.route("cart.index"),
        class: "relative flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 rounded-full text-gray-600 hover:bg-gray-100 transition-all",
        "aria-label": "Cart"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="pi pi-shopping-cart text-xl"${_scopeId}></i>`);
            if (unref(uniqueCount) > 0) {
              _push2(`<span class="absolute sm:top-1 -top-0.5 sm:right-1 -right-0.5 min-w-4.5 h-4.5 flex items-center justify-center rounded-full bg-brand-500 text-white text-[10px] font-bold leading-none"${_scopeId}>${ssrInterpolate(unref(uniqueCount) > 99 ? "99+" : unref(uniqueCount))}</span>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("i", { class: "pi pi-shopping-cart text-xl" }),
              createVNode(Transition, {
                "enter-active-class": "transition-all duration-200 origin-center",
                "enter-from-class": "scale-0 opacity-0",
                "enter-to-class": "scale-100 opacity-100",
                "leave-active-class": "transition-all duration-150 origin-center",
                "leave-from-class": "scale-100 opacity-100",
                "leave-to-class": "scale-0 opacity-0"
              }, {
                default: withCtx(() => [
                  unref(uniqueCount) > 0 ? (openBlock(), createBlock("span", {
                    key: 0,
                    class: "absolute sm:top-1 -top-0.5 sm:right-1 -right-0.5 min-w-4.5 h-4.5 flex items-center justify-center rounded-full bg-brand-500 text-white text-[10px] font-bold leading-none"
                  }, toDisplayString(unref(uniqueCount) > 99 ? "99+" : unref(uniqueCount)), 1)) : createCommentVNode("", true)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Shared/components/CartNavIcon.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "UserMenu",
  __ssrInlineRender: true,
  setup(__props) {
    const page = usePage();
    const open = ref(false);
    const dropdownRef = ref(null);
    const isAuthenticated = computed(() => !!page.props.user);
    const displayName = computed(() => {
      const name = page.props.user?.name ?? "";
      return name.slice(0, 6);
    });
    const menuItems = computed(() => [
      ...page.props.user?.role === "admin" ? [{ label: "ადმინ პანელი", icon: "pi-shield", route: "admin.index" }] : [],
      { label: "ჩემი კაბინეტი", icon: "pi-user", route: "account.index" },
      { label: "ჩემი შეკვეთები", icon: "pi-tags", route: "user-orders.index" }
    ]);
    function handleClickOutside(e) {
      if (dropdownRef.value && !dropdownRef.value.contains(e.target)) {
        open.value = false;
      }
    }
    onMounted(() => document.addEventListener("mousedown", handleClickOutside));
    onUnmounted(() => document.removeEventListener("mousedown", handleClickOutside));
    return (_ctx, _push, _parent, _attrs) => {
      if (!isAuthenticated.value) {
        _push(ssrRenderComponent(unref(Link), mergeProps({
          href: _ctx.route("login"),
          class: "flex items-center justify-center w-10 h-10 rounded-full text-gray-600 hover:bg-gray-100 transition-all"
        }, _attrs), {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<i class="pi pi-user text-xl!"${_scopeId}></i>`);
            } else {
              return [
                createVNode("i", { class: "pi pi-user text-xl!" })
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<div${ssrRenderAttrs(mergeProps({
          class: "relative",
          ref_key: "dropdownRef",
          ref: dropdownRef
        }, _attrs))}><button class="flex items-center gap-2 px-3 sm:py-1.5 rounded-full hover:bg-gray-100 transition-all cursor-pointer select-none"><div class="w-8 h-8 rounded-full bg-brand-500 flex items-center justify-center text-white text-xs font-bold shrink-0"><i class="pi pi-user text-sm"></i></div><span class="text-sm font-medium text-gray-700 max-w-20 truncate">${ssrInterpolate(displayName.value)}</span><i class="${ssrRenderClass([{ "rotate-180": open.value }, "pi pi-chevron-down text-xs text-gray-400 transition-transform duration-200"])}"></i></button>`);
        if (open.value) {
          _push(`<div class="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg ring-1 ring-black/5 z-50 overflow-hidden origin-top-right"><div class="px-4 py-3 border-b border-gray-100"><p class="text-sm font-semibold text-gray-800 truncate">${ssrInterpolate(_ctx.$page.props.user.name)}</p><p class="text-xs text-gray-400 truncate">${ssrInterpolate(_ctx.$page.props.user.email)}</p></div><div class="py-1"><!--[-->`);
          ssrRenderList(menuItems.value, (item) => {
            _push(ssrRenderComponent(unref(Link), {
              key: item.label,
              href: _ctx.route(item.route),
              onClick: ($event) => open.value = false,
              class: "flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`<i class="${ssrRenderClass(["pi", item.icon, "text-gray-400 text-sm w-4"])}"${_scopeId}></i> ${ssrInterpolate(item.label)}`);
                } else {
                  return [
                    createVNode("i", {
                      class: ["pi", item.icon, "text-gray-400 text-sm w-4"]
                    }, null, 2),
                    createTextVNode(" " + toDisplayString(item.label), 1)
                  ];
                }
              }),
              _: 2
            }, _parent));
          });
          _push(`<!--]--><div class="border-t border-gray-100 px-4 py-2.5">`);
          _push(ssrRenderComponent(_sfc_main$7, null, null, _parent));
          _push(`</div></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      }
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Shared/components/UserMenu.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "Navbar",
  __ssrInlineRender: true,
  setup(__props) {
    const page = usePage();
    computed(() => page.props.user);
    computed(() => page.props.isLoggedIn);
    const categories = page.props.categories ?? [];
    const searchOpen = ref(false);
    ref(null);
    ref(null);
    const linguiseMountPoint = ref(null);
    onMounted(() => {
      const slot = document.getElementById("linguise-slot");
      if (slot && linguiseMountPoint.value) {
        slot.style.display = "";
        linguiseMountPoint.value.appendChild(slot);
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex-col sticky top-0 z-50" }, _attrs))}><nav class="bg-white shadow-sm"><div class="w-full lg:max-w-11/12 2xl:max-w-9/12 mx-auto max-sm:pl-4 h-16 sm:h-20 px-3 flex items-center gap-4">`);
      if (searchOpen.value) {
        _push(`<div class="flex lg:hidden items-center w-full gap-1"><div class="flex-1">`);
        _push(ssrRenderComponent(_sfc_main$4, {
          onClose: ($event) => searchOpen.value = false,
          placeholder: "რას ეძებთ?"
        }, null, _parent));
        _push(`</div><button class="p-2 text-gray-500 hover:text-gray-900"><i class="pi pi-times text-"></i></button></div>`);
      } else {
        _push(`<div class="flex lg:hidden items-center justify-between w-full"><div class="flex items-center gap-x-4">`);
        _push(ssrRenderComponent(SmallDeviceMegaMenu, { categories: unref(categories) }, null, _parent));
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("home")
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<img src="/logo/logo3.png" alt="logo" class="w-16 object-cover"${_scopeId}>`);
            } else {
              return [
                createVNode("img", {
                  src: "/logo/logo3.png",
                  alt: "logo",
                  class: "w-16 object-cover"
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div><div class="flex items-center"><button class="flex items-center justify-center w-10 h-10 rounded-full text-gray-600 hover:bg-gray-100"><i class="pi pi-search text-xl"></i></button>`);
        _push(ssrRenderComponent(_sfc_main$3, null, null, _parent));
        _push(ssrRenderComponent(_sfc_main$2, null, null, _parent));
        _push(ssrRenderComponent(_sfc_main$1, null, null, _parent));
        _push(`</div></div>`);
      }
      _push(`<template class="hidden lg:contents">`);
      _push(ssrRenderComponent(SmallDeviceMegaMenu, { categories: unref(categories) }, null, _parent));
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("home"),
        class: "hidden lg:flex items-center"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img src="/logo/logo3.png" alt="logo" class="w-20 h-full object-cover"${_scopeId}>`);
          } else {
            return [
              createVNode("img", {
                src: "/logo/logo3.png",
                alt: "logo",
                class: "w-20 h-full object-cover"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="hidden lg:flex flex-4">`);
      _push(ssrRenderComponent(_sfc_main$4, { placeholder: "მოძებნე ის რაც გჭირდება..." }, null, _parent));
      _push(`</div><a href="tel:+995591047372" class="hidden lg:flex items-center gap-2 text-gray-600 hover:text-gray-900 shrink-0"><i class="pi pi-phone text-brand-500"></i><span class="text-sm font-medium whitespace-nowrap">+995 591 04-73-72</span></a><div class="hidden lg:flex items-center gap-1 shrink-0"><div></div>`);
      _push(ssrRenderComponent(_sfc_main$3, null, null, _parent));
      _push(ssrRenderComponent(_sfc_main$2, null, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, null, _parent));
      _push(`</div></template></div></nav></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Shared/menu/Navbar.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
//# sourceMappingURL=Navbar-BvG3Ogzm.js.map
