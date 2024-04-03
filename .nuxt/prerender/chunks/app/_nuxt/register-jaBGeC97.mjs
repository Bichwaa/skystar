import { _ as __nuxt_component_0 } from './nuxt-link-CgIPAz5u.mjs';
import { defineComponent, mergeProps, withCtx, createTextVNode, useSSRContext } from 'file:///home/bichwaa/Desktop/work/skystar/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderComponent } from 'file:///home/bichwaa/Desktop/work/skystar/node_modules/vue/server-renderer/index.mjs';
import 'file:///home/bichwaa/Desktop/work/skystar/node_modules/ufo/dist/index.mjs';
import '../server.mjs';
import 'file:///home/bichwaa/Desktop/work/skystar/node_modules/ofetch/dist/node.mjs';
import 'file:///home/bichwaa/Desktop/work/skystar/node_modules/hookable/dist/index.mjs';
import 'file:///home/bichwaa/Desktop/work/skystar/node_modules/unctx/dist/index.mjs';
import 'file:///home/bichwaa/Desktop/work/skystar/node_modules/h3/dist/index.mjs';
import 'file:///home/bichwaa/Desktop/work/skystar/node_modules/unhead/dist/index.mjs';
import 'file:///home/bichwaa/Desktop/work/skystar/node_modules/@unhead/shared/dist/index.mjs';
import 'file:///home/bichwaa/Desktop/work/skystar/node_modules/vue-router/dist/vue-router.node.mjs';
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
import 'file:///home/bichwaa/Desktop/work/skystar/node_modules/ipx/dist/index.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "register",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_nuxt_link = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "h-full grid place-items-center" }, _attrs))}><form class="form-card bg-[#F5F6F7] p-2 lg:p-16 rounded-lg"><div class="flex flex-col lg:flex-row gap-8 justify-center py-1"><div class="grp flex flex-col"><label for="firstname" class="text-xs font-medium">First name</label><input type="firstname" name="firstname" class="border border-1 border-slate-400 rounded-md lg:h-8 w-full"></div></div><div class="flex flex-col lg:flex-row gap-8 justify-center py-1"><div class="grp flex flex-col"><label for="lastname" class="text-xs font-medium">Last name</label><input type="lastname" name="lastname" class="border border-1 border-slate-400 rounded-md lg:h-8 w-full"></div></div><div class="flex flex-col lg:flex-row gap-8 justify-center py-1"><div class="grp flex flex-col"><label for="email" class="text-xs font-medium">Email</label><input type="email" name="email" class="border border-1 border-slate-400 rounded-md lg:h-8 w-full"></div></div><div class="flex flex-col lg:flex-row gap-8 justify-center py-1"><div class="grp flex flex-col"><label for="password" class="text-xs font-medium">Password</label><input type="password" name="password" class="border border-1 border-slate-400 rounded-md lg:h-8 w-full"></div></div><div class="flex flex-col my-3"><div class="grid place-items-center"><p>Already registered `);
      _push(ssrRenderComponent(_component_nuxt_link, {
        to: "/login",
        class: "text-blue-500 my-2"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Login`);
          } else {
            return [
              createTextVNode("Login")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</p></div></div></form></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/register.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=register-jaBGeC97.mjs.map
