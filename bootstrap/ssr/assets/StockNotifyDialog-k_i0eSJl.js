import { s as script$1 } from "./index-YvTnrAwi.js";
import { s as script } from "./index-D46B4f3g.js";
import { computed, mergeProps, withCtx, createVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { usePage, router } from "@inertiajs/vue3";
const _sfc_main = {
  __name: "StockNotifyDialog",
  __ssrInlineRender: true,
  props: {
    visible: { type: Boolean, required: true },
    item: { type: Object, required: true }
  },
  emits: ["update:visible"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const page = usePage();
    const isLoggedIn = computed(() => !!page.props.user);
    const subscribe = () => {
      emit("update:visible", false);
      router.post(route("stock-notifications.subscribe", props.item.slug));
    };
    const goToLogin = () => {
      emit("update:visible", false);
      router.get(route("login"));
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Dialog = script;
      const _component_Button = script$1;
      if (!isLoggedIn.value) {
        _push(ssrRenderComponent(_component_Dialog, mergeProps({
          visible: __props.visible,
          "onUpdate:visible": ($event) => emit("update:visible", $event),
          modal: "",
          style: { width: "22rem" }
        }, _attrs), {
          header: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="flex items-center gap-2"${_scopeId}><i class="pi pi-lock text-gray-500"${_scopeId}></i><span class="font-semibold text-gray-800"${_scopeId}>${ssrInterpolate(_ctx.$t("stockNotify.loginRequired"))}</span></div>`);
            } else {
              return [
                createVNode("div", { class: "flex items-center gap-2" }, [
                  createVNode("i", { class: "pi pi-lock text-gray-500" }),
                  createVNode("span", { class: "font-semibold text-gray-800" }, toDisplayString(_ctx.$t("stockNotify.loginRequired")), 1)
                ])
              ];
            }
          }),
          footer: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="flex justify-end gap-2"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_Button, {
                label: _ctx.$t("common.cancel"),
                severity: "secondary",
                text: "",
                onClick: ($event) => emit("update:visible", false)
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_Button, {
                label: _ctx.$t("nav.signIn"),
                icon: "pi pi-sign-in",
                onClick: goToLogin
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              return [
                createVNode("div", { class: "flex justify-end gap-2" }, [
                  createVNode(_component_Button, {
                    label: _ctx.$t("common.cancel"),
                    severity: "secondary",
                    text: "",
                    onClick: ($event) => emit("update:visible", false)
                  }, null, 8, ["label", "onClick"]),
                  createVNode(_component_Button, {
                    label: _ctx.$t("nav.signIn"),
                    icon: "pi pi-sign-in",
                    onClick: goToLogin
                  }, null, 8, ["label"])
                ])
              ];
            }
          }),
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<p class="text-sm text-gray-600 leading-relaxed"${_scopeId}>${ssrInterpolate(_ctx.$t("stockNotify.loginRequiredText"))}</p>`);
            } else {
              return [
                createVNode("p", { class: "text-sm text-gray-600 leading-relaxed" }, toDisplayString(_ctx.$t("stockNotify.loginRequiredText")), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(ssrRenderComponent(_component_Dialog, mergeProps({
          visible: __props.visible,
          "onUpdate:visible": ($event) => emit("update:visible", $event),
          modal: "",
          style: { width: "22rem" }
        }, _attrs), {
          header: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="flex items-center gap-2"${_scopeId}><i class="pi pi-bell text-blue-500"${_scopeId}></i><span class="font-semibold text-gray-800"${_scopeId}>${ssrInterpolate(_ctx.$t("stockNotify.subscribeTitle"))}</span></div>`);
            } else {
              return [
                createVNode("div", { class: "flex items-center gap-2" }, [
                  createVNode("i", { class: "pi pi-bell text-blue-500" }),
                  createVNode("span", { class: "font-semibold text-gray-800" }, toDisplayString(_ctx.$t("stockNotify.subscribeTitle")), 1)
                ])
              ];
            }
          }),
          footer: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="flex justify-end gap-2"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_Button, {
                label: _ctx.$t("common.no"),
                severity: "secondary",
                text: "",
                onClick: ($event) => emit("update:visible", false)
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_Button, {
                label: _ctx.$t("common.yes"),
                icon: "pi pi-check",
                onClick: subscribe
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              return [
                createVNode("div", { class: "flex justify-end gap-2" }, [
                  createVNode(_component_Button, {
                    label: _ctx.$t("common.no"),
                    severity: "secondary",
                    text: "",
                    onClick: ($event) => emit("update:visible", false)
                  }, null, 8, ["label", "onClick"]),
                  createVNode(_component_Button, {
                    label: _ctx.$t("common.yes"),
                    icon: "pi pi-check",
                    onClick: subscribe
                  }, null, 8, ["label"])
                ])
              ];
            }
          }),
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<p class="text-sm text-gray-600 leading-relaxed"${_scopeId}>${ssrInterpolate(_ctx.$t("stockNotify.subscribeText"))}</p>`);
            } else {
              return [
                createVNode("p", { class: "text-sm text-gray-600 leading-relaxed" }, toDisplayString(_ctx.$t("stockNotify.subscribeText")), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
      }
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Shared/components/StockNotifyDialog.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
//# sourceMappingURL=StockNotifyDialog-k_i0eSJl.js.map
