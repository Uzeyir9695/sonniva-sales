import { s as script$2 } from "./index-hSjFFc9a.js";
import { C as ConfirmationEventBus, s as script$4, _ as _sfc_main$1 } from "./index-BKd1j8jG.js";
import { s as script$3 } from "./index-nsBhLTBN.js";
import BaseComponent from "@primevue/core/basecomponent";
import { style } from "@primeuix/styles/confirmdialog";
import BaseStyle from "@primevue/core/base/style";
import { resolveComponent, openBlock, createBlock, normalizeClass, createSlots, withCtx, createElementBlock, Fragment, renderSlot, resolveDynamicComponent, mergeProps, createCommentVNode, createElementVNode, toDisplayString, createVNode, inject, ref, computed, watch, unref, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderClass, ssrRenderList, ssrInterpolate, ssrRenderSlot } from "vue/server-renderer";
import { usePage, usePoll, Link } from "@inertiajs/vue3";
var classes = {
  root: "p-confirmdialog",
  icon: "p-confirmdialog-icon",
  message: "p-confirmdialog-message",
  pcRejectButton: "p-confirmdialog-reject-button",
  pcAcceptButton: "p-confirmdialog-accept-button"
};
var ConfirmDialogStyle = BaseStyle.extend({
  name: "confirmdialog",
  style,
  classes
});
var script$1 = {
  name: "BaseConfirmDialog",
  "extends": BaseComponent,
  props: {
    group: String,
    breakpoints: {
      type: Object,
      "default": null
    },
    draggable: {
      type: Boolean,
      "default": true
    }
  },
  style: ConfirmDialogStyle,
  provide: function provide() {
    return {
      $pcConfirmDialog: this,
      $parentInstance: this
    };
  }
};
var script = {
  name: "ConfirmDialog",
  "extends": script$1,
  confirmListener: null,
  closeListener: null,
  data: function data() {
    return {
      visible: false,
      confirmation: null
    };
  },
  mounted: function mounted() {
    var _this = this;
    this.confirmListener = function(options) {
      if (!options) {
        return;
      }
      if (options.group === _this.group) {
        _this.confirmation = options;
        if (_this.confirmation.onShow) {
          _this.confirmation.onShow();
        }
        _this.visible = true;
      }
    };
    this.closeListener = function() {
      _this.visible = false;
      _this.confirmation = null;
    };
    ConfirmationEventBus.on("confirm", this.confirmListener);
    ConfirmationEventBus.on("close", this.closeListener);
  },
  beforeUnmount: function beforeUnmount() {
    ConfirmationEventBus.off("confirm", this.confirmListener);
    ConfirmationEventBus.off("close", this.closeListener);
  },
  methods: {
    accept: function accept() {
      if (this.confirmation.accept) {
        this.confirmation.accept();
      }
      this.visible = false;
    },
    reject: function reject() {
      if (this.confirmation.reject) {
        this.confirmation.reject();
      }
      this.visible = false;
    },
    onHide: function onHide() {
      if (this.confirmation.onHide) {
        this.confirmation.onHide();
      }
      this.visible = false;
    }
  },
  computed: {
    appendTo: function appendTo() {
      return this.confirmation ? this.confirmation.appendTo : "body";
    },
    target: function target() {
      return this.confirmation ? this.confirmation.target : null;
    },
    modal: function modal() {
      return this.confirmation ? this.confirmation.modal == null ? true : this.confirmation.modal : true;
    },
    header: function header() {
      return this.confirmation ? this.confirmation.header : null;
    },
    message: function message() {
      return this.confirmation ? this.confirmation.message : null;
    },
    blockScroll: function blockScroll() {
      return this.confirmation ? this.confirmation.blockScroll : true;
    },
    position: function position() {
      return this.confirmation ? this.confirmation.position : null;
    },
    acceptLabel: function acceptLabel() {
      if (this.confirmation) {
        var _confirmation$acceptP;
        var confirmation = this.confirmation;
        return confirmation.acceptLabel || ((_confirmation$acceptP = confirmation.acceptProps) === null || _confirmation$acceptP === void 0 ? void 0 : _confirmation$acceptP.label) || this.$primevue.config.locale.accept;
      }
      return this.$primevue.config.locale.accept;
    },
    rejectLabel: function rejectLabel() {
      if (this.confirmation) {
        var _confirmation$rejectP;
        var confirmation = this.confirmation;
        return confirmation.rejectLabel || ((_confirmation$rejectP = confirmation.rejectProps) === null || _confirmation$rejectP === void 0 ? void 0 : _confirmation$rejectP.label) || this.$primevue.config.locale.reject;
      }
      return this.$primevue.config.locale.reject;
    },
    acceptIcon: function acceptIcon() {
      var _this$confirmation;
      return this.confirmation ? this.confirmation.acceptIcon : (_this$confirmation = this.confirmation) !== null && _this$confirmation !== void 0 && _this$confirmation.acceptProps ? this.confirmation.acceptProps.icon : null;
    },
    rejectIcon: function rejectIcon() {
      var _this$confirmation2;
      return this.confirmation ? this.confirmation.rejectIcon : (_this$confirmation2 = this.confirmation) !== null && _this$confirmation2 !== void 0 && _this$confirmation2.rejectProps ? this.confirmation.rejectProps.icon : null;
    },
    autoFocusAccept: function autoFocusAccept() {
      return this.confirmation.defaultFocus === void 0 || this.confirmation.defaultFocus === "accept" ? true : false;
    },
    autoFocusReject: function autoFocusReject() {
      return this.confirmation.defaultFocus === "reject" ? true : false;
    },
    closeOnEscape: function closeOnEscape() {
      return this.confirmation ? this.confirmation.closeOnEscape : true;
    }
  },
  components: {
    Dialog: script$3,
    Button: script$2
  }
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_Button = resolveComponent("Button");
  var _component_Dialog = resolveComponent("Dialog");
  return openBlock(), createBlock(_component_Dialog, {
    visible: $data.visible,
    "onUpdate:visible": [_cache[2] || (_cache[2] = function($event) {
      return $data.visible = $event;
    }), $options.onHide],
    role: "alertdialog",
    "class": normalizeClass(_ctx.cx("root")),
    modal: $options.modal,
    header: $options.header,
    blockScroll: $options.blockScroll,
    appendTo: $options.appendTo,
    position: $options.position,
    breakpoints: _ctx.breakpoints,
    closeOnEscape: $options.closeOnEscape,
    draggable: _ctx.draggable,
    pt: _ctx.pt,
    unstyled: _ctx.unstyled
  }, createSlots({
    "default": withCtx(function() {
      return [!_ctx.$slots.container ? (openBlock(), createElementBlock(Fragment, {
        key: 0
      }, [!_ctx.$slots.message ? (openBlock(), createElementBlock(Fragment, {
        key: 0
      }, [renderSlot(_ctx.$slots, "icon", {}, function() {
        return [_ctx.$slots.icon ? (openBlock(), createBlock(resolveDynamicComponent(_ctx.$slots.icon), {
          key: 0,
          "class": normalizeClass(_ctx.cx("icon"))
        }, null, 8, ["class"])) : $data.confirmation.icon ? (openBlock(), createElementBlock("span", mergeProps({
          key: 1,
          "class": [$data.confirmation.icon, _ctx.cx("icon")]
        }, _ctx.ptm("icon")), null, 16)) : createCommentVNode("", true)];
      }), createElementVNode("span", mergeProps({
        "class": _ctx.cx("message")
      }, _ctx.ptm("message")), toDisplayString($options.message), 17)], 64)) : (openBlock(), createBlock(resolveDynamicComponent(_ctx.$slots.message), {
        key: 1,
        message: $data.confirmation
      }, null, 8, ["message"]))], 64)) : createCommentVNode("", true)];
    }),
    _: 2
  }, [_ctx.$slots.container ? {
    name: "container",
    fn: withCtx(function(slotProps) {
      return [renderSlot(_ctx.$slots, "container", {
        message: $data.confirmation,
        closeCallback: slotProps.closeCallback,
        acceptCallback: $options.accept,
        rejectCallback: $options.reject,
        initDragCallback: slotProps.initDragCallback
      })];
    }),
    key: "0"
  } : void 0, !_ctx.$slots.container ? {
    name: "footer",
    fn: withCtx(function() {
      var _$data$confirmation$r;
      return [createVNode(_component_Button, mergeProps({
        "class": [_ctx.cx("pcRejectButton"), $data.confirmation.rejectClass],
        autofocus: $options.autoFocusReject,
        unstyled: _ctx.unstyled,
        text: ((_$data$confirmation$r = $data.confirmation.rejectProps) === null || _$data$confirmation$r === void 0 ? void 0 : _$data$confirmation$r.text) || false,
        onClick: _cache[0] || (_cache[0] = function($event) {
          return $options.reject();
        })
      }, $data.confirmation.rejectProps, {
        label: $options.rejectLabel,
        pt: _ctx.ptm("pcRejectButton")
      }), createSlots({
        _: 2
      }, [$options.rejectIcon || _ctx.$slots.rejecticon ? {
        name: "icon",
        fn: withCtx(function(iconProps) {
          return [renderSlot(_ctx.$slots, "rejecticon", {}, function() {
            return [createElementVNode("span", mergeProps({
              "class": [$options.rejectIcon, iconProps["class"]]
            }, _ctx.ptm("pcRejectButton")["icon"], {
              "data-pc-section": "rejectbuttonicon"
            }), null, 16)];
          })];
        }),
        key: "0"
      } : void 0]), 1040, ["class", "autofocus", "unstyled", "text", "label", "pt"]), createVNode(_component_Button, mergeProps({
        label: $options.acceptLabel,
        "class": [_ctx.cx("pcAcceptButton"), $data.confirmation.acceptClass],
        autofocus: $options.autoFocusAccept,
        unstyled: _ctx.unstyled,
        onClick: _cache[1] || (_cache[1] = function($event) {
          return $options.accept();
        })
      }, $data.confirmation.acceptProps, {
        pt: _ctx.ptm("pcAcceptButton")
      }), createSlots({
        _: 2
      }, [$options.acceptIcon || _ctx.$slots.accepticon ? {
        name: "icon",
        fn: withCtx(function(iconProps) {
          return [renderSlot(_ctx.$slots, "accepticon", {}, function() {
            return [createElementVNode("span", mergeProps({
              "class": [$options.acceptIcon, iconProps["class"]]
            }, _ctx.ptm("pcAcceptButton")["icon"], {
              "data-pc-section": "acceptbuttonicon"
            }), null, 16)];
          })];
        }),
        key: "0"
      } : void 0]), 1040, ["label", "class", "autofocus", "unstyled", "pt"])];
    }),
    key: "1"
  } : void 0]), 1032, ["visible", "class", "modal", "header", "blockScroll", "appendTo", "position", "breakpoints", "closeOnEscape", "draggable", "onUpdate:visible", "pt", "unstyled"]);
}
script.render = render;
const _sfc_main = {
  __name: "AdminLayout",
  __ssrInlineRender: true,
  setup(__props) {
    const route = inject("route");
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
      const _component_Toast = script$4;
      const _component_ConfirmDialog = script;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_Toast, { position: "top-right" }, null, _parent));
      _push(ssrRenderComponent(_component_ConfirmDialog, null, null, _parent));
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
          href: unref(route)(item.route),
          onClick: ($event) => sidebarOpen.value = false,
          class: [
            "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
            unref(route)().current(item.route) ? "bg-green-100 text-green-700 shadow-sm" : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
          ]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="flex w-full items-center justify-between"${_scopeId}><div class="inline-flex gap-2"${_scopeId}><i class="${ssrRenderClass(["pi text-lg", item.icon, unref(route)().current(item.route) ? "text-green-600" : "text-gray-500"])}"${_scopeId}></i><span${_scopeId}>${ssrInterpolate(item.name)}</span></div>`);
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
                      class: ["pi text-lg", item.icon, unref(route)().current(item.route) ? "text-green-600" : "text-gray-500"]
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
const AdminLayout = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main
}, Symbol.toStringTag, { value: "Module" }));
export {
  AdminLayout as A,
  _sfc_main as _,
  script as s
};
//# sourceMappingURL=AdminLayout-CmvatkRP.js.map
