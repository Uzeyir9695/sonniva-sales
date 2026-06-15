import { ref, computed, watch, unref, withCtx, createVNode, toDisplayString, openBlock, createBlock, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderClass, ssrRenderList, ssrInterpolate, ssrRenderSlot } from "vue/server-renderer";
import { usePage, usePoll, Link } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./Navbar-BWR-LzLK.js";
import "./LargeDeviceMegaMenu-BMSK4_ne.js";
import "./index-BWQ0UkXI.js";
import "@primeuix/utils/dom";
import "@primevue/core/basedirective";
import "@primeuix/styles/ripple";
import "@primevue/core/base/style";
import "swiper/vue";
import "swiper/modules";
/* empty css                */
import "@vueuse/core";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./index-C3Ts-4IM.js";
import "@primeuix/utils/object";
import "@primeuix/utils/uuid";
import "@primeuix/utils/zindex";
import "@primevue/core/utils";
import "@primeuix/styles/tooltip";
import "axios";
import "./QuickViewDialog-BwjyUAul.js";
import "./index-nsBhLTBN.js";
import "@primeuix/utils";
import "@primevue/icons/times";
import "@primevue/icons/windowmaximize";
import "@primevue/icons/windowminimize";
import "./index-hSjFFc9a.js";
import "@primevue/icons/spinner";
import "@primevue/core/basecomponent";
import "@primeuix/styles/badge";
import "@primeuix/styles/button";
import "./index-zZrFrjQS.js";
import "@primeuix/styled";
import "@primeuix/styles/dialog";
import "./useCart-DadzsIuG.js";
import "./index-Qb24q4w2.js";
const _sfc_main = {
  __name: "AdminLayout",
  __ssrInlineRender: true,
  setup(__props) {
    const sidebarOpen = ref(false);
    const page = usePage();
    usePoll(1e4, {
      only: ["unseenOrdersCount", "unseenStockCount"],
      preserveScroll: true,
      preserveState: true
    });
    const unseenOrdersCount = computed(() => page.props.unseenOrdersCount);
    const unseenStockCount = computed(() => page.props.unseenStockCount);
    function playNotificationSound() {
      new Audio("/sounds/notification-sound.wav").play().catch(() => {
      });
    }
    watch([unseenOrdersCount, unseenStockCount], ([newOrders, newStock], [oldOrders, oldStock]) => {
      if ((newOrders ?? 0) > (oldOrders ?? 0) || (newStock ?? 0) > (oldStock ?? 0)) {
        playNotificationSound();
      }
    });
    const menuItems = computed(() => [
      {
        name: "Orders",
        route: "admin.orders.index",
        icon: "pi-shopping-cart",
        badge: unseenOrdersCount.value || null
      },
      {
        name: "Users",
        route: "admin.users.index",
        icon: "pi-users"
      },
      {
        name: "Payments",
        route: "admin.payments.index",
        icon: "pi-credit-card"
      },
      {
        name: "Stock Requests",
        route: "admin.stock-notifications.index",
        icon: "pi-bell",
        badge: unseenStockCount.value || null
      },
      {
        name: "Analytics",
        route: "admin.analytics.index",
        icon: "pi-chart-line"
      }
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_sfc_main$1, null, null, _parent));
      _push(`<div class="container mx-auto min-h-[calc(100vh-110px)] flex space-x-2 my-4">`);
      if (sidebarOpen.value) {
        _push(`<div class="fixed inset-0 bg-black/40 z-20 md:hidden"></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<aside class="${ssrRenderClass([
        "fixed md:static top-16 left-0 sm:min-h-[calc(100vh-110px)] min-h-[calc(100vh-80px)] z-40 w-64 bg-white border-r border-gray-200 sm:rounded-xl flex flex-col shadow-sm transition-transform duration-300 ease-in-out",
        sidebarOpen.value ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      ])}"><div class="h-16 flex items-center px-6 border-b border-gray-200"><div class="flex items-center gap-3"><div class="sm:w-9 w-7 sm:h-9 h-7 bg-linear-to-br from-brand-500 to-brand-600 rounded-lg flex items-center justify-center"><i class="pi pi-bolt text-white text-lg"></i></div><span class="sm:text-xl font-bold text-gray-900">Admin Panel</span></div></div><nav class="flex-1 px-3 py-6 overflow-y-auto"><ul class="space-y-1"><!--[-->`);
      ssrRenderList(menuItems.value, (item) => {
        _push(`<li>`);
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route(item.route),
          onClick: ($event) => sidebarOpen.value = false,
          class: [
            "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
            _ctx.route().current(item.route) ? "bg-green-100 text-green-700 shadow-sm" : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
          ]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="flex w-full items-center justify-between"${_scopeId}><div class="inline-flex gap-2"${_scopeId}><i class="${ssrRenderClass(["pi text-lg", item.icon, _ctx.route().current(item.route) ? "text-green-600" : "text-gray-500"])}"${_scopeId}></i><span${_scopeId}>${ssrInterpolate(item.name)}</span></div>`);
              if (item.badge) {
                _push2(`<span class="min-w-5 h-5 flex items-center justify-center text-xs font-bold rounded-full bg-red-500 text-white px-1"${_scopeId}>${ssrInterpolate(item.badge)}</span>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              return [
                createVNode("div", { class: "flex w-full items-center justify-between" }, [
                  createVNode("div", { class: "inline-flex gap-2" }, [
                    createVNode("i", {
                      class: ["pi text-lg", item.icon, _ctx.route().current(item.route) ? "text-green-600" : "text-gray-500"]
                    }, null, 2),
                    createVNode("span", null, toDisplayString(item.name), 1)
                  ]),
                  item.badge ? (openBlock(), createBlock("span", {
                    key: 0,
                    class: "min-w-5 h-5 flex items-center justify-center text-xs font-bold rounded-full bg-red-500 text-white px-1"
                  }, toDisplayString(item.badge), 1)) : createCommentVNode("", true)
                ])
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</li>`);
      });
      _push(`<!--]--></ul></nav></aside><main class="flex-1 min-w-0 flex flex-col"><div class="sticky top-18 md:hidden h-10 bg-white border-b border-gray-200 rounded-xl flex justify-between items-center px-4 mx-4 shadow-sm z-30"><span class="ml-3 text-sm font-bold text-gray-900">Admin Panel</span><button class="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"><i class="pi pi-bars text-lg"></i></button></div><div class="h-full">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, () => {
        _push(`<div class="h-full flex flex-col items-center justify-center"><h1 class="text-xl md:text-3xl text-center font-bold text-gray-800 my-4"> Welcome to Admin Dashboard </h1><p class="text-gray-600 text-center text-sm md:text-xl mb-6"> Here you can manage frames, orders, users, and settings efficiently. </p></div>`);
      }, _push, _parent);
      _push(`</div></main></div><!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/AdminLayout.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=AdminLayout-2bZqKsaZ.js.map
