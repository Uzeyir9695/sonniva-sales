import { T as Tooltip } from "./index-C3Ts-4IM.js";
import { s as script$1 } from "./index-D46B4f3g.js";
import { s as script } from "./index-YvTnrAwi.js";
import { ref, mergeProps, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrGetDirectiveProps, ssrRenderList, ssrRenderAttr } from "vue/server-renderer";
import { router } from "@inertiajs/vue3";
import { u as useToast } from "./index-Qb24q4w2.js";
import { u as useConfirm } from "./index-DPwr32It.js";
import { useDebounceFn } from "@vueuse/core";
import axios from "axios";
import _sfc_main$1 from "./PrimeInputText-BlIRrCdA.js";
import "@primeuix/utils/dom";
import "@primeuix/utils/object";
import "@primeuix/utils/uuid";
import "@primeuix/utils/zindex";
import "@primevue/core/utils";
import "@primevue/core/basedirective";
import "@primeuix/styles/tooltip";
import "@primevue/core/base/style";
import "@primeuix/utils";
import "@primevue/icons/times";
import "@primevue/icons/windowmaximize";
import "@primevue/icons/windowminimize";
import "./index-zZrFrjQS.js";
import "@primeuix/styled";
import "@primevue/core/basecomponent";
import "@primeuix/styles/dialog";
import "@primevue/icons/spinner";
import "@primeuix/styles/badge";
import "@primeuix/styles/ripple";
import "@primeuix/styles/button";
import "./index-BAgOeBfa.js";
import "@primevue/core/baseinput";
import "@primeuix/styles/inputtext";
const _sfc_main = {
  __name: "HomeSectionCard",
  __ssrInlineRender: true,
  props: {
    section: { type: Object, required: true },
    index: { type: Number, required: true }
  },
  setup(__props) {
    const props = __props;
    const toast = useToast();
    const confirm = useConfirm();
    function imageUrl(item) {
      return `${item.storage_path}/${item.images[0]}`;
    }
    const carouselTitle = ref(props.section.carousel_title ?? "");
    const galleryTitle = ref(props.section.gallery_title ?? "");
    function saveTitles() {
      router.put(route("admin.home-page.sections.update", props.section.id), {
        carousel_title: carouselTitle.value.trim() || null,
        gallery_title: galleryTitle.value.trim() || null
      }, { preserveScroll: true });
    }
    function toggleHidden() {
      router.patch(route("admin.home-page.sections.toggle-hidden", props.section.id), {}, { preserveScroll: true });
    }
    function deleteSection() {
      confirm.require({
        message: "Delete this section and all its items/images? This cannot be undone.",
        header: "Confirmation",
        icon: "pi pi-info-circle",
        rejectProps: { label: "Cancel", severity: "secondary", outlined: true },
        acceptProps: { label: "Delete", severity: "danger" },
        accept: () => {
          router.delete(route("admin.home-page.sections.destroy", props.section.id), {
            preserveScroll: true,
            onSuccess: (res) => toast.add({ severity: "success", summary: "Deleted", detail: res.props.flash.message, life: 3e3 })
          });
        }
      });
    }
    const query = ref("");
    const results = ref([]);
    const searching = ref(false);
    async function runSearch(q) {
      searching.value = true;
      try {
        const res = await axios.get(route("admin.items.search"), { params: { q } });
        results.value = res.data;
      } catch {
        results.value = [];
      } finally {
        searching.value = false;
      }
    }
    const debouncedSearch = useDebounceFn((q) => runSearch(q), 400);
    function onSearchInput() {
      const q = query.value.trim();
      if (q.length < 2) {
        results.value = [];
        searching.value = false;
        return;
      }
      debouncedSearch(q);
    }
    function addItem(item) {
      router.post(route("admin.home-page.sections.items.store", props.section.id), { item_id: item.id }, {
        preserveScroll: true,
        onSuccess: () => {
          results.value = results.value.filter((r) => r.id !== item.id);
        }
      });
    }
    const imageTitle = ref("");
    const imageLink = ref("");
    const imageFile = ref(null);
    const imageFileName = ref("");
    const uploadingImage = ref(false);
    function uploadImage() {
      if (!imageFile.value) return;
      uploadingImage.value = true;
      router.post(route("admin.home-page.sections.images.store", props.section.id), {
        image: imageFile.value,
        title: imageTitle.value.trim() || null,
        link_url: imageLink.value.trim() || null
      }, {
        preserveScroll: true,
        onSuccess: () => toast.add({ severity: "success", summary: "Uploaded", life: 3e3 }),
        onError: () => toast.add({ severity: "error", summary: "Upload failed", life: 3e3 }),
        onFinish: () => {
          uploadingImage.value = false;
          imageTitle.value = "";
          imageLink.value = "";
          imageFile.value = null;
          imageFileName.value = "";
        }
      });
    }
    const editDialogVisible = ref(false);
    const editingImage = ref(null);
    const editTitle = ref("");
    const editLink = ref("");
    function saveImageEdit() {
      router.put(route("admin.home-page.sections.images.update", [props.section.id, editingImage.value.id]), {
        title: editTitle.value.trim() || null,
        link_url: editLink.value.trim() || null
      }, {
        preserveScroll: true,
        onSuccess: () => {
          editDialogVisible.value = false;
        }
      });
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Button = script;
      const _component_Dialog = script$1;
      const _directive_tooltip = Tooltip;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-5" }, _attrs))}><div class="flex items-center justify-between gap-3"><div class="flex items-center gap-2"><span class="w-7 h-7 flex items-center justify-center rounded-full bg-brand-500 text-white text-xs font-bold shrink-0">${ssrInterpolate(__props.index)}</span>`);
      if (__props.section.is_hidden) {
        _push(`<span class="flex items-center gap-1.5 text-sm px-2.5 py-1 rounded-full font-medium bg-red-500 text-white"><i class="pi pi-eye-slash text-xs"></i> Hidden Section </span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="flex items-center gap-2">`);
      _push(ssrRenderComponent(_component_Button, {
        label: __props.section.is_hidden ? "Show" : "Hide",
        icon: __props.section.is_hidden ? "pi pi-eye-slash" : "pi pi-eye",
        size: "small",
        severity: "secondary",
        outlined: "",
        onClick: toggleHidden
      }, null, _parent));
      _push(ssrRenderComponent(_component_Button, {
        label: "Delete",
        icon: "pi pi-trash",
        size: "small",
        severity: "danger",
        outlined: "",
        onClick: deleteSection
      }, null, _parent));
      _push(`</div></div><div class="space-y-3 pt-2 border-t border-gray-100"><div><label class="text-sm font-semibold text-gray-500 mb-1 block">Carousel Header</label>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        modelValue: carouselTitle.value,
        "onUpdate:modelValue": ($event) => carouselTitle.value = $event,
        onBlur: saveTitles,
        placeholder: "e.g. Featured Products",
        class: "w-full sm:w-96 rounded-lg!"
      }, null, _parent));
      _push(`</div><span class="relative inline-block w-full sm:w-96"><i class="pi pi-search text-gray-400 text-sm absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"></i>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        modelValue: query.value,
        "onUpdate:modelValue": ($event) => query.value = $event,
        onInput: onSearchInput,
        placeholder: "Search by item No. or name...",
        class: "w-full pl-9! rounded-lg!"
      }, null, _parent));
      _push(`</span>`);
      if (searching.value) {
        _push(`<div class="flex items-center gap-2 text-sm text-gray-400"><i class="pi pi-spinner pi-spin"></i> Searching... </div>`);
      } else if (query.value.trim().length >= 2 && results.value.length === 0) {
        _push(`<div class="text-sm text-gray-400"> No items found for &quot;${ssrInterpolate(query.value)}&quot;. </div>`);
      } else if (results.value.length) {
        _push(`<div class="border border-gray-100 rounded-xl overflow-hidden"><div class="flex items-center justify-between px-3 py-2 bg-gray-50 border-b border-gray-100"><span class="text-xs font-medium text-gray-400">${ssrInterpolate(results.value.length)} result(s)</span><button${ssrRenderAttrs(mergeProps({ class: "text-gray-400 hover:text-gray-700" }, ssrGetDirectiveProps(_ctx, _directive_tooltip, "Close", void 0, { top: true })))}><i class="pi pi-times text-xs"></i></button></div><ul class="divide-y divide-gray-100"><!--[-->`);
        ssrRenderList(results.value, (item) => {
          _push(`<li class="flex items-center gap-3 py-2 px-3"><div class="w-10 h-10 rounded-lg overflow-hidden bg-gray-100 shrink-0">`);
          if (item.images?.length) {
            _push(`<img${ssrRenderAttr("src", imageUrl(item))}${ssrRenderAttr("alt", item.name)} class="w-full h-full object-cover">`);
          } else {
            _push(`<div class="w-full h-full flex items-center justify-center"><i class="pi pi-image text-gray-300 text-sm"></i></div>`);
          }
          _push(`</div><div class="flex-1 min-w-0"><p class="text-sm font-medium text-gray-800 truncate">${ssrInterpolate(item.name)}</p><p class="text-xs text-gray-400 font-mono">${ssrInterpolate(item.no)}</p></div>`);
          _push(ssrRenderComponent(_component_Button, {
            label: "Add",
            icon: "pi pi-plus",
            size: "small",
            severity: "secondary",
            outlined: "",
            onClick: ($event) => addItem(item)
          }, null, _parent));
          _push(`</li>`);
        });
        _push(`<!--]--></ul></div>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.section.items?.length) {
        _push(`<div class="flex flex-wrap gap-2"><!--[-->`);
        ssrRenderList(__props.section.items, (item) => {
          _push(`<span class="flex items-center gap-2 pl-1.5 pr-2 py-1 rounded-full bg-gray-100 text-sm text-gray-700"><span class="w-6 h-6 rounded-full overflow-hidden bg-gray-200 shrink-0">`);
          if (item.images?.length) {
            _push(`<img${ssrRenderAttr("src", imageUrl(item))}${ssrRenderAttr("alt", item.name)} class="w-full h-full object-cover">`);
          } else {
            _push(`<!---->`);
          }
          _push(`</span><span class="truncate max-w-40">${ssrInterpolate(item.name)}</span><button class="text-gray-400 hover:text-red-500"><i class="pi pi-times text-xs"></i></button></span>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<p class="text-sm text-gray-400 italic">No items in this carousel yet.</p>`);
      }
      _push(`</div><div class="space-y-3 pt-4 border-t border-gray-100"><div><label class="text-sm font-semibold text-gray-500 mb-1 block">Gallery Header</label>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        modelValue: galleryTitle.value,
        "onUpdate:modelValue": ($event) => galleryTitle.value = $event,
        onBlur: saveTitles,
        placeholder: "e.g. Shop by Room",
        class: "w-full sm:w-96 rounded-lg!"
      }, null, _parent));
      _push(`</div><div class="flex flex-wrap items-end gap-2"><div class="flex-1 min-w-40"><label class="text-xs font-medium text-gray-500 mb-1 block">Title (optional)</label>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        modelValue: imageTitle.value,
        "onUpdate:modelValue": ($event) => imageTitle.value = $event,
        placeholder: "e.g ანჯამები",
        class: "w-full rounded-lg!"
      }, null, _parent));
      _push(`</div><div class="flex-1 min-w-40"><label class="text-xs font-medium text-gray-500 mb-1 block">Link (optional)</label>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        modelValue: imageLink.value,
        "onUpdate:modelValue": ($event) => imageLink.value = $event,
        placeholder: "https://...",
        class: "w-full rounded-lg!"
      }, null, _parent));
      _push(`</div><label class="flex items-center gap-2 cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold px-4 py-2 rounded-xl transition-colors shrink-0"><i class="pi pi-image text-xs"></i> ${ssrInterpolate(imageFileName.value || "Choose Image")} <input type="file" accept="image/*" class="hidden"></label>`);
      _push(ssrRenderComponent(_component_Button, {
        label: "Add",
        icon: "pi pi-plus",
        loading: uploadingImage.value,
        disabled: !imageFile.value,
        onClick: uploadImage
      }, null, _parent));
      _push(`</div>`);
      if (__props.section.images?.length) {
        _push(`<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3"><!--[-->`);
        ssrRenderList(__props.section.images, (image) => {
          _push(`<div class="relative group rounded-xl overflow-hidden aspect-video bg-gray-100 shadow-md"><img${ssrRenderAttr("src", image.image_url)}${ssrRenderAttr("alt", image.title || "")} class="w-full h-full object-cover">`);
          if (image.title) {
            _push(`<span class="absolute bottom-0 left-0 right-0 px-2 py-1 text-[11px] font-medium text-white bg-black/60 truncate">${ssrInterpolate(image.title)}</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<div class="absolute inset-0 flex items-center justify-center gap-3 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity"><button class="text-white"><i class="pi pi-pencil text-lg"></i></button><button class="text-white"><i class="pi pi-trash text-lg"></i></button></div></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<p class="text-sm text-gray-400 italic">No images uploaded yet.</p>`);
      }
      _push(`</div>`);
      _push(ssrRenderComponent(_component_Dialog, {
        visible: editDialogVisible.value,
        "onUpdate:visible": ($event) => editDialogVisible.value = $event,
        modal: "",
        header: "Edit Image",
        style: { width: "24rem" }
      }, {
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Button, {
              label: "Cancel",
              size: "small",
              severity: "secondary",
              variant: "text",
              onClick: ($event) => editDialogVisible.value = false
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Button, {
              label: "Save",
              size: "small",
              icon: "pi pi-check",
              onClick: saveImageEdit
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Button, {
                label: "Cancel",
                size: "small",
                severity: "secondary",
                variant: "text",
                onClick: ($event) => editDialogVisible.value = false
              }, null, 8, ["onClick"]),
              createVNode(_component_Button, {
                label: "Save",
                size: "small",
                icon: "pi pi-check",
                onClick: saveImageEdit
              })
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="space-y-4"${_scopeId}><div${_scopeId}><label class="text-sm font-semibold text-gray-500 mb-1 block"${_scopeId}>Title</label>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              modelValue: editTitle.value,
              "onUpdate:modelValue": ($event) => editTitle.value = $event,
              class: "w-full rounded-lg!",
              fluid: ""
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}><label class="text-sm font-semibold text-gray-500 mb-1 block"${_scopeId}>Link</label>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              modelValue: editLink.value,
              "onUpdate:modelValue": ($event) => editLink.value = $event,
              class: "w-full rounded-lg!",
              fluid: ""
            }, null, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "space-y-4" }, [
                createVNode("div", null, [
                  createVNode("label", { class: "text-sm font-semibold text-gray-500 mb-1 block" }, "Title"),
                  createVNode(_sfc_main$1, {
                    modelValue: editTitle.value,
                    "onUpdate:modelValue": ($event) => editTitle.value = $event,
                    class: "w-full rounded-lg!",
                    fluid: ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                createVNode("div", null, [
                  createVNode("label", { class: "text-sm font-semibold text-gray-500 mb-1 block" }, "Link"),
                  createVNode(_sfc_main$1, {
                    modelValue: editLink.value,
                    "onUpdate:modelValue": ($event) => editLink.value = $event,
                    class: "w-full rounded-lg!",
                    fluid: ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/HomePage/HomeSectionCard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=HomeSectionCard-BRVwoASg.js.map
