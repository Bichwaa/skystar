import { useSSRContext, mergeProps, withCtx, createVNode, createTextVNode, toDisplayString, openBlock, createBlock, createCommentVNode } from 'file:///home/bichwaa/Desktop/work/skystar/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent, ssrInterpolate, ssrRenderSlot } from 'file:///home/bichwaa/Desktop/work/skystar/node_modules/vue/server-renderer/index.mjs';
import { _ as _export_sfc } from '../server.mjs';

const _sfc_main$3 = {
  __name: "AddIcon",
  __ssrInlineRender: true,
  props: {
    currentColor: {
      type: String,
      default: "#3b82f6"
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<svg${ssrRenderAttrs(mergeProps({
        xmlns: "http://www.w3.org/2000/svg",
        width: "32",
        height: "32",
        viewBox: "0 0 24 24"
      }, _attrs))}><path${ssrRenderAttr("fill", __props.currentColor)} d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2z"></path></svg>`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/icons/AddIcon.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_0$1 = _sfc_main$3;
const _sfc_main$2 = {
  __name: "Modal",
  __ssrInlineRender: true,
  emits: ["close-modal"],
  setup(__props, { emit: __emit }) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "fixed inset-0 flex items-center justify-center z-50" }, _attrs))} data-v-755b63c5><div class="fixed inset-0 bg-black opacity-50" data-v-755b63c5></div><div class="bg-white rounded-lg p-6 z-10" data-v-755b63c5><div class="flex w-full justify-end" data-v-755b63c5><span class="text-[#292a5e] cursor-pointer font-medium p-2" data-v-755b63c5>x</span></div>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Modal.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-755b63c5"]]);
const _sfc_main$1 = {
  name: "Loader",
  props: {
    border: {
      type: Number,
      default: 2
    },
    color: {
      type: String,
      default: "#d4af37"
    }
  },
  computed: {
    path() {
      const delta = this.border / 2;
      const radius = 12 - delta;
      const startX = 24 - delta;
      const endX = delta;
      return `M${startX} 12A${radius} ${radius} 0 1 1 12 ${endX}`;
    }
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<svg${ssrRenderAttrs(mergeProps({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24"
  }, _attrs))} data-v-7cbeb5d3><path${ssrRenderAttr("stroke", $props.color)} stroke-linecap="round"${ssrRenderAttr("stroke-width", $props.border)}${ssrRenderAttr("d", $options.path)} data-v-7cbeb5d3></path></svg>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Loader.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-7cbeb5d3"]]);
const _sfc_main = {
  __name: "DeleteDialog",
  __ssrInlineRender: true,
  props: {
    entity: {
      type: String,
      default: "item"
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    function close() {
      emit("close");
    }
    function proceed() {
      emit("proceed");
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Modal = __nuxt_component_0;
      const _component_Loader = __nuxt_component_1;
      _push(ssrRenderComponent(_component_Modal, mergeProps({ onCloseModal: close }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex flex-col gap-6 items-center"${_scopeId}><p class="text-center"${_scopeId}> Are you sure you want to delete this ${ssrInterpolate(__props.entity)} ? <br${_scopeId}> this action is not reversible </p>`);
            if (__props.loading) {
              _push2(ssrRenderComponent(_component_Loader, { class: "h-12 w-12" }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="flex gap-4 items-center"${_scopeId}><button class="flex items-center justify-center py-2 px-3 mt-3 text-xs rounded-lg bg-[#292a5e] min-w-[150px] text-white font-medium hover:bg-gray-300 hover:text-[#292a5e] disabled:bg-gray-600 duration-300"${_scopeId}> No </button><span class="text-red-600 cursor-pointer"${_scopeId}>Yes, Delete</span></div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex flex-col gap-6 items-center" }, [
                createVNode("p", { class: "text-center" }, [
                  createTextVNode(" Are you sure you want to delete this " + toDisplayString(__props.entity) + " ? ", 1),
                  createVNode("br"),
                  createTextVNode(" this action is not reversible ")
                ]),
                __props.loading ? (openBlock(), createBlock(_component_Loader, {
                  key: 0,
                  class: "h-12 w-12"
                })) : createCommentVNode("", true),
                createVNode("div", { class: "flex gap-4 items-center" }, [
                  createVNode("button", {
                    class: "flex items-center justify-center py-2 px-3 mt-3 text-xs rounded-lg bg-[#292a5e] min-w-[150px] text-white font-medium hover:bg-gray-300 hover:text-[#292a5e] disabled:bg-gray-600 duration-300",
                    onClick: close
                  }, " No "),
                  createVNode("span", {
                    class: "text-red-600 cursor-pointer",
                    onClick: proceed
                  }, "Yes, Delete")
                ])
              ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/DeleteDialog.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_4 = _sfc_main;

export { __nuxt_component_0$1 as _, __nuxt_component_4 as a, __nuxt_component_0 as b, __nuxt_component_1 as c };
//# sourceMappingURL=DeleteDialog-BsSMWScP.mjs.map
