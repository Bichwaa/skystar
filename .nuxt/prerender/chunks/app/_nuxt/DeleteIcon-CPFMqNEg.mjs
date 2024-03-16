import { useSSRContext, defineComponent, mergeProps } from 'file:///home/bichwaa/Desktop/work/skystar/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderAttr } from 'file:///home/bichwaa/Desktop/work/skystar/node_modules/vue/server-renderer/index.mjs';

const _sfc_main$2 = {
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
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/icons/AddIcon.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_0 = _sfc_main$2;
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "PencilIcon",
  __ssrInlineRender: true,
  props: {
    currentColor: {
      default: "currentColor",
      type: String
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<svg${ssrRenderAttrs(mergeProps({
        xmlns: "http://www.w3.org/2000/svg",
        width: "32",
        height: "32",
        viewBox: "0 0 24 24"
      }, _attrs))}><path${ssrRenderAttr("fill", __props.currentColor)} d="M5 19h1.425L16.2 9.225L14.775 7.8L5 17.575zm-2 2v-4.25L16.2 3.575q.3-.275.663-.425t.762-.15q.4 0 .775.15t.65.45L20.425 5q.3.275.438.65T21 6.4q0 .4-.137.763t-.438.662L7.25 21zM19 6.4L17.6 5zm-3.525 2.125l-.7-.725L16.2 9.225z"></path></svg>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/icons/PencilIcon.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "DeleteIcon",
  __ssrInlineRender: true,
  props: {
    currentColor: {
      type: String,
      default: "#f87171"
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<svg${ssrRenderAttrs(mergeProps({
        xmlns: "http://www.w3.org/2000/svg",
        width: "32",
        height: "32",
        viewBox: "0 0 24 24"
      }, _attrs))}><path${ssrRenderAttr("fill", __props.currentColor)} d="m9.4 16.5l2.6-2.6l2.6 2.6l1.4-1.4l-2.6-2.6L16 9.9l-1.4-1.4l-2.6 2.6l-2.6-2.6L8 9.9l2.6 2.6L8 15.1zM7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21z"></path></svg>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/icons/DeleteIcon.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_2 = _sfc_main;

export { __nuxt_component_0 as _, _sfc_main$1 as a, __nuxt_component_2 as b };
//# sourceMappingURL=DeleteIcon-CPFMqNEg.mjs.map
