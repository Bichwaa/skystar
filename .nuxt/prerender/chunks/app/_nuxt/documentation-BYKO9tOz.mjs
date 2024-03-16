import { useSSRContext, defineComponent, mergeProps } from 'file:///home/bichwaa/Desktop/work/skystar/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent } from 'file:///home/bichwaa/Desktop/work/skystar/node_modules/vue/server-renderer/index.mjs';
import { _ as _export_sfc } from '../server.mjs';
import 'file:///home/bichwaa/Desktop/work/skystar/node_modules/ofetch/dist/node.mjs';
import 'file:///home/bichwaa/Desktop/work/skystar/node_modules/hookable/dist/index.mjs';
import 'file:///home/bichwaa/Desktop/work/skystar/node_modules/unctx/dist/index.mjs';
import 'file:///home/bichwaa/Desktop/work/skystar/node_modules/h3/dist/index.mjs';
import 'file:///home/bichwaa/Desktop/work/skystar/node_modules/unhead/dist/index.mjs';
import 'file:///home/bichwaa/Desktop/work/skystar/node_modules/@unhead/shared/dist/index.mjs';
import 'file:///home/bichwaa/Desktop/work/skystar/node_modules/vue-router/dist/vue-router.node.mjs';
import 'file:///home/bichwaa/Desktop/work/skystar/node_modules/ufo/dist/index.mjs';
import 'file:///home/bichwaa/Desktop/work/skystar/node_modules/defu/dist/defu.mjs';
import '../../nitro/nitro-prerenderer.mjs';
import 'file:///home/bichwaa/Desktop/work/skystar/node_modules/destr/dist/index.mjs';
import 'file:///home/bichwaa/Desktop/work/skystar/node_modules/unenv/runtime/fetch/index.mjs';
import 'file:///home/bichwaa/Desktop/work/skystar/node_modules/scule/dist/index.mjs';
import 'file:///home/bichwaa/Desktop/work/skystar/node_modules/klona/dist/index.mjs';
import 'file:///home/bichwaa/Desktop/work/skystar/node_modules/ohash/dist/index.mjs';
import 'file:///home/bichwaa/Desktop/work/skystar/node_modules/unstorage/dist/index.mjs';
import 'file:///home/bichwaa/Desktop/work/skystar/node_modules/unstorage/drivers/fs.mjs';
import 'file:///home/bichwaa/Desktop/work/skystar/node_modules/unstorage/drivers/memory.mjs';
import 'file:///home/bichwaa/Desktop/work/skystar/node_modules/unstorage/drivers/lru-cache.mjs';
import 'file:///home/bichwaa/Desktop/work/skystar/node_modules/unstorage/drivers/fs-lite.mjs';
import 'file:///home/bichwaa/Desktop/work/skystar/node_modules/radix3/dist/index.mjs';
import 'node:fs';
import 'node:url';
import 'file:///home/bichwaa/Desktop/work/skystar/node_modules/pathe/dist/index.mjs';

const snippets = `
<SidebarItem title="Dashboard" to="/">
   <DashboardIcon />
</SidebarItem>

<SidebarItem title="Projects" to="/admin/projects">
    <ProjectsIcon />
</SidebarItem>`;
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "Snippet",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<pre${ssrRenderAttrs(mergeProps({ class: "max-w-full overflow-x-auto rounded border bg-gray-100 px-4 py-1 font-mono text-sm text-black" }, _attrs))}>    ${ssrInterpolate(snippets)}
  </pre>`);
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/docs/Snippet.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const _sfc_main$4 = {};
function _sfc_ssrRender$3(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "h-6 w-6" }, _attrs))}></div>`);
}
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/docs/icons/TsIcon.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const TsIcon = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["ssrRender", _sfc_ssrRender$3]]);
const _sfc_main$3 = {
  name: "VueIcon",
  props: {
    extendClass: {
      type: String,
      default: ""
    }
  }
};
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<svg${ssrRenderAttrs(mergeProps({
    viewBox: "0 0 261.76 226.69",
    xmlns: "http://www.w3.org/2000/svg",
    stroke: "currentColor",
    fill: "none",
    class: $props.extendClass ? $props.extendClass : "h-4 w-4 mt-1"
  }, _attrs))}><g transform="matrix(1.3333 0 0 -1.3333 -76.311 313.34)"><g transform="translate(178.06 235.01)"><path d="m0 0-22.669-39.264-22.669 39.264h-75.491l98.16-170.02 98.16 170.02z" fill="#41b883"></path></g><g transform="translate(178.06 235.01)"><path d="m0 0-22.669-39.264-22.669 39.264h-36.227l58.896-102.01 58.896 102.01z" fill="#34495e"></path></g></g></svg>`);
}
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/docs/icons/VueIcon.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const VueIcon = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["ssrRender", _sfc_ssrRender$2]]);
const _sfc_main$2 = {
  name: "FolderIcon",
  props: {
    extendClass: {
      type: String,
      default: ""
    }
  }
};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<svg${ssrRenderAttrs(mergeProps({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    class: ["text-yellow-400", $props.extendClass ? $props.extendClass : "h-5 w-5 mt-0.5"]
  }, _attrs))}><path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1H8a3 3 0 00-3 3v1.5a1.5 1.5 0 01-3 0V6z" clip-rule="evenodd"></path><path d="M6 12a2 2 0 012-2h8a2 2 0 012 2v2a2 2 0 01-2 2H2h2a2 2 0 002-2v-2z"></path></svg>`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/docs/icons/FolderIcon.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const FolderIcon = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender$1]]);
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Doc",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-full py-8 text-black" }, _attrs))}><h2 class="mb-10 text-3xl font-medium">Documentation</h2><section class="mb-16 bg-white px-3 py-8 md:px-8"><h2 class="text-2xl font-medium">Features</h2><ul class="mt-4 list-disc pl-6"><li class="mb-4">Support of the active route (styled by default).</li><li class="mb-4"> Fully customizable and without external dependencies. </li><li class="mb-4"> No vendor lock-in, you can export it and integrate it in your project. </li><li> Sidebar can be aligned left or right according to your preferences (on mobile). </li></ul></section><section class="mb-16 bg-white px-3 py-8 md:px-8"><h2 class="mb-3 text-2xl font-medium">File Structure</h2><div class="pl-2"><div class="mb-3 flex pl-5">`);
      _push(ssrRenderComponent(FolderIcon, { class: "h-6 w-6" }, null, _parent));
      _push(`<span class="pl-2">dashboard</span></div><div class="mb-3 flex pl-11">`);
      _push(ssrRenderComponent(FolderIcon, null, null, _parent));
      _push(`<span class="pl-2">sidebar</span></div><div class="mb-3 flex pl-16">`);
      _push(ssrRenderComponent(FolderIcon, null, null, _parent));
      _push(`<span class="pl-2">icons</span></div><div class="mb-3 flex pl-16">`);
      _push(ssrRenderComponent(VueIcon, null, null, _parent));
      _push(`<span class="pl-2">Sidebar.vue</span></div><div class="mb-3 flex pl-16">`);
      _push(ssrRenderComponent(VueIcon, null, null, _parent));
      _push(`<span class="pl-2">SidebarHeader.vue</span></div><div class="mb-3 flex pl-16">`);
      _push(ssrRenderComponent(VueIcon, null, null, _parent));
      _push(`<span class="pl-2">SidebarItem.vue</span></div><div class="mb-3 flex pl-16">`);
      _push(ssrRenderComponent(VueIcon, null, null, _parent));
      _push(`<span class="pl-2">SidebarItems.vue</span></div><div class="mb-3 flex pl-11">`);
      _push(ssrRenderComponent(VueIcon, null, null, _parent));
      _push(`<span class="pl-2">Layout.vue</span></div><div class="mb-3 flex pl-11">`);
      _push(ssrRenderComponent(VueIcon, null, null, _parent));
      _push(`<span class="pl-2">Overlay.vue</span></div><div class="mb-3 flex pl-11">`);
      _push(ssrRenderComponent(VueIcon, null, null, _parent));
      _push(`<span class="pl-2">TopBar.vue</span></div><div class="mb-3 flex pl-11">`);
      _push(ssrRenderComponent(TsIcon, null, null, _parent));
      _push(`<span class="pl-3">store.ts</span></div></div></section><section class="mb-16 bg-white px-3 py-8 md:px-8"><h2 class="text-2xl font-medium">File Structure explained</h2><div class="mb-8 mt-4"><div class="flex">`);
      _push(ssrRenderComponent(FolderIcon, null, null, _parent));
      _push(` <strong class="px-1">sidebar</strong></div><div class="mt-4 flex flex-wrap pl-6 md:flex-nowrap">`);
      _push(ssrRenderComponent(FolderIcon, { class: "h-7 w-7" }, null, _parent));
      _push(`<span class="px-2 font-medium">icons</span> : <p class="pl-1"> Icons used for each sidebar-item. You don&#39;t need this folder if you can provide your own icons. </p></div><div class="mt-4 flex flex-wrap pl-6 md:flex-nowrap">`);
      _push(ssrRenderComponent(VueIcon, null, null, _parent));
      _push(` <span class="px-2 font-medium">Sidebar.vue</span> : <p class="pl-1">responsable of the sidebar.</p><p class="pl-1"> compose <strong>SidebarHeader</strong> and <strong>SidebarItems</strong> components. </p></div><div class="mt-6 flex flex-wrap pl-6 md:flex-nowrap">`);
      _push(ssrRenderComponent(VueIcon, null, null, _parent));
      _push(` <span class="px-2 font-medium">SidebarHeader.vue</span>: <p class="pl-1">contains the logo displayed on top of the sidebar</p></div><div class="mt-6 flex flex-wrap pl-6 md:flex-nowrap">`);
      _push(ssrRenderComponent(VueIcon, null, null, _parent));
      _push(` <span class="px-2 font-medium">SidebarItem.vue</span> : <p class="pl-1">represents each sidebar-item of the sidebar.</p></div><div class="mt-6 flex flex-wrap pl-6 md:flex-nowrap">`);
      _push(ssrRenderComponent(VueIcon, null, null, _parent));
      _push(` <span class="px-2 font-medium">SidebarItems.vue</span> : <p class="pl-1">compose many SidebarItem components</p></div><div class="mt-8 flex flex-wrap pl-8"><div>`);
      _push(ssrRenderComponent(_sfc_main$5, null, null, _parent));
      _push(`</div></div></div><div><div class="mt-8 flex flex-wrap md:flex-nowrap">`);
      _push(ssrRenderComponent(VueIcon, null, null, _parent));
      _push(` <span class="px-1 font-medium">Layout.vue :</span> contains the <strong class="px-1">DashboardLayout</strong> component used as the layout of the application </div></div><div><div class="mt-8 flex flex-wrap md:flex-nowrap">`);
      _push(ssrRenderComponent(VueIcon, null, null, _parent));
      _push(` <span class="px-1 font-medium">Overlay.vue :</span> displays an overlay that will only be visible on small screens to emphasize the focus on sidebar when it is open. it&#39;s also used to close sidebar on click outside </div></div><div><div class="mt-8 flex flex-wrap md:flex-nowrap">`);
      _push(ssrRenderComponent(VueIcon, null, null, _parent));
      _push(` <span class="px-1 font-medium">TopBar.vue :</span> You can customize it or replace it with your own TopBar but don&#39;t forget to add a button to toggle sidebar on mobile </div></div><div class="mt-8 flex flex-wrap md:flex-nowrap">`);
      _push(ssrRenderComponent(TsIcon, { class: "h-5 w-5" }, null, _parent));
      _push(`<span class="pl-3 font-medium">store.ts</span> : <p class="pl-1"> where all states for handling opening and closing sidebar are defined </p></div></section><section class="mb-16 bg-white px-3 py-8 md:px-8"><h2 class="text-2xl font-medium">Export</h2><p class="mt-4"> As there is no vendor lock-in, if you already have a dashboard, you can copy the <strong class="px-1">dashboard</strong>folder into your project </p><div class="mt-8"><ul class="mt-4 list-disc pl-6"><li class="mb-3"> Add your routes in the <strong class="px-1">dashboard/sidebar/SidebarItems.vue</strong> file </li><li class="mb-3"> Replace your layout by the <strong class="px-1">DashboardLayout</strong>component </li></ul></div></section><section class="mb-16 bg-white px-3 py-8 md:px-8"><h2 class="text-2xl font-medium">Customization</h2><p class="mt-5"> You can customize everything according to your preferences if it doesn&#39;t suit you. What we have done is just provide a solid structure for better scalability and readability of the code. </p><p class="mt-5"> The sidebar scrollbar is hidden by default but you can still scroll with the keyboards if you have several sidebar-items. </p><p class="mt-5"> In the <strong> dashboard/Layout.vue</strong> file, <strong class="pl-1">Sidebar</strong> component has as prop <strong class="pl-1">mobile-orientation</strong>, which indicates the orientation of the sidebar on small devices (viewport ${ssrInterpolate("<")} 1024px). </p><p class="pt-5">That prop can have two possible values :</p><ul class="mt-4 list-disc pl-6"><li class="mb-3"><strong>start :</strong> sidebar will be aligned to the left </li><li><strong>end :</strong> sidebar will be aligned to the right</li></ul></section></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/docs/Doc.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_DocsDoc = _sfc_main$1;
  _push(ssrRenderComponent(_component_DocsDoc, _attrs, null, _parent));
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/documentation.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const documentation = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { documentation as default };
//# sourceMappingURL=documentation-BYKO9tOz.mjs.map
