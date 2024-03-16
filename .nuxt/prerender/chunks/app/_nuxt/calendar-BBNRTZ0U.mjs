import { _ as __nuxt_component_0, a as _sfc_main$1, b as __nuxt_component_2 } from './DeleteIcon-CPFMqNEg.mjs';
import { defineComponent, ref, mergeProps, unref, useSSRContext } from 'file:///home/bichwaa/Desktop/work/skystar/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderList, ssrRenderAttr } from 'file:///home/bichwaa/Desktop/work/skystar/node_modules/vue/server-renderer/index.mjs';
import { _ as _imports_4 } from './2-OGQ2Ar8F.mjs';
import '../../renderer.mjs';
import 'file:///home/bichwaa/Desktop/work/skystar/node_modules/vue-bundle-renderer/dist/runtime.mjs';
import 'file:///home/bichwaa/Desktop/work/skystar/node_modules/h3/dist/index.mjs';
import 'file:///home/bichwaa/Desktop/work/skystar/node_modules/devalue/index.js';
import 'file:///home/bichwaa/Desktop/work/skystar/node_modules/ufo/dist/index.mjs';
import 'file:///home/bichwaa/Desktop/work/skystar/node_modules/@unhead/ssr/dist/index.mjs';
import '../../nitro/nitro-prerenderer.mjs';
import 'file:///home/bichwaa/Desktop/work/skystar/node_modules/ofetch/dist/node.mjs';
import 'file:///home/bichwaa/Desktop/work/skystar/node_modules/destr/dist/index.mjs';
import 'file:///home/bichwaa/Desktop/work/skystar/node_modules/unenv/runtime/fetch/index.mjs';
import 'file:///home/bichwaa/Desktop/work/skystar/node_modules/hookable/dist/index.mjs';
import 'file:///home/bichwaa/Desktop/work/skystar/node_modules/scule/dist/index.mjs';
import 'file:///home/bichwaa/Desktop/work/skystar/node_modules/klona/dist/index.mjs';
import 'file:///home/bichwaa/Desktop/work/skystar/node_modules/defu/dist/defu.mjs';
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
import 'file:///home/bichwaa/Desktop/work/skystar/node_modules/unhead/dist/index.mjs';
import 'file:///home/bichwaa/Desktop/work/skystar/node_modules/@unhead/shared/dist/index.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "calendar",
  __ssrInlineRender: true,
  props: {
    title: {
      type: String,
      default: ""
    }
  },
  setup(__props) {
    const staff = ref([]);
    const roles = ref([]);
    const currentDate = /* @__PURE__ */ new Date();
    const OPTIONS = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
    const formattedDate = currentDate.toLocaleDateString("en-US", OPTIONS);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_IconsAddIcon = __nuxt_component_0;
      const _component_IconsPencilIcon = _sfc_main$1;
      const _component_IconsDeleteIcon = __nuxt_component_2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-wrap sm:flex-row gap-8" }, _attrs))}><div class="w-full sm:w-1/2 xl:w-1/3"><div class="mb-4"><div class="w-full rounded-2xl bg-white p-4 shadow-lg"><div class="mb-6 flex items-center justify-between"><div class="flex items-center"><span class="relative rounded-xl bg-blue-100 p-2"></span><div class="flex flex-col"><span class="ml-2 font-bold text-black">${ssrInterpolate(__props.title || "Employee roles")}</span><span class="ml-2 text-sm text-gray-500">Available roles</span></div></div><div class="flex items-center"><button class="rounded-full border border-gray-200 p-1">`);
      _push(ssrRenderComponent(_component_IconsAddIcon, { class: "h-7 w-7" }, null, _parent));
      _push(`</button></div></div><div class="m-auto block"><div class="flex flex-col gap-2"><!--[-->`);
      ssrRenderList(roles.value, (role, i) => {
        _push(`<div class="flex justify-between py-3 h-14 bg-gray-100"><p class="p-3 text-md capitalize flex items-center">${ssrInterpolate(role.name)}</p><div class="flex gap-4 p-3 items-center">`);
        _push(ssrRenderComponent(_component_IconsPencilIcon, {
          class: "w-6 h-6 cursor-pointer",
          "current-color": "#fbbf24"
        }, null, _parent));
        _push(ssrRenderComponent(_component_IconsDeleteIcon, { class: "w-6 h-6 cursor-pointer" }, null, _parent));
        _push(`</div></div>`);
      });
      _push(`<!--]--></div></div></div></div><div class="mb-4"><div class="w-full rounded-2xl bg-white p-4 shadow-lg"><div class="mb-6 flex items-center justify-between"><div class="flex items-center"><span class="relative rounded-xl bg-blue-100 p-2"></span><div class="flex flex-col"><span class="ml-2 font-bold text-black">Leaderboard</span><span class="ml-2 text-sm text-gray-500"> Top Performers </span></div></div></div><div class="mb-4 flex items-center justify-between space-x-12"><span class="flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-semibold text-green-700">${ssrInterpolate(unref(formattedDate))}</span></div><div class="m-auto block"><ul><!--[-->`);
      ssrRenderList(staff.value.slice(0, 2), (st, i) => {
        _push(`<li class="my-6 flex items-center space-x-2"><a href="#" class="relative block"><img alt="Maurice Lokumba"${ssrRenderAttr("src", _imports_4)} class="mx-auto h-10 w-10 rounded-full object-cover"></a><div class="flex flex-col"><span class="ml-2 text-sm font-semibold text-gray-900">${ssrInterpolate(st.firstName)}</span><span class="ml-2 text-sm text-gray-400">${ssrInterpolate(st.email)}</span></div></li>`);
      });
      _push(`<!--]--></ul></div></div></div></div><div class="w-full sm:w-1/2 xl:w-1/3"><div class="mb-4"><div class="w-full rounded-2xl bg-white p-4 shadow-lg"><p class="font-bold text-black">Staff</p><ul><!--[-->`);
      ssrRenderList(staff.value, (st, i) => {
        _push(`<li class="my-6 flex items-center space-x-2"><a href="#" class="relative block"><img alt="Maurice Lokumba"${ssrRenderAttr("src", _imports_4)} class="mx-auto h-10 w-10 rounded-full object-cover"></a><div class="flex flex-col"><span class="ml-2 text-sm font-semibold text-gray-900">${ssrInterpolate(st.firstName)}</span><span class="ml-2 text-sm text-gray-400">${ssrInterpolate(st.email)}</span></div></li>`);
      });
      _push(`<!--]--></ul></div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/calendar.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=calendar-BBNRTZ0U.mjs.map
