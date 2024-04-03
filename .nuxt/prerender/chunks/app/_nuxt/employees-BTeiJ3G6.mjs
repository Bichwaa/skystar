import { _ as __nuxt_component_0$1, a as __nuxt_component_4$1, b as __nuxt_component_0, c as __nuxt_component_1$1 } from './DeleteDialog-BsSMWScP.mjs';
import { ref, mergeProps, unref, useSSRContext, withCtx, createVNode, withDirectives, vModelText, createTextVNode, withModifiers, openBlock, createBlock, toDisplayString, Fragment, renderList } from 'file:///home/bichwaa/Desktop/work/skystar/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrInterpolate } from 'file:///home/bichwaa/Desktop/work/skystar/node_modules/vue/server-renderer/index.mjs';
import axios from 'file:///home/bichwaa/Desktop/work/skystar/node_modules/axios/index.js';
import { _ as _imports_4 } from './2-OGQ2Ar8F.mjs';
import '../server.mjs';
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
import 'file:///home/bichwaa/Desktop/work/skystar/node_modules/ipx/dist/index.mjs';
import '../../renderer.mjs';
import 'file:///home/bichwaa/Desktop/work/skystar/node_modules/vue-bundle-renderer/dist/runtime.mjs';
import 'file:///home/bichwaa/Desktop/work/skystar/node_modules/devalue/index.js';
import 'file:///home/bichwaa/Desktop/work/skystar/node_modules/@unhead/ssr/dist/index.mjs';

const _sfc_main$6 = {
  __name: "CreateEmployeeForm",
  __ssrInlineRender: true,
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const formLoading = ref(false);
    const payload = ref({
      firstName: "",
      lastName: "",
      email: "",
      password: "Employee00"
    });
    async function submitForm() {
      console.log("calling submit");
      formLoading.value = true;
      const res = await axios.post("http://localhost:3006/api/users", { ...payload.value });
      formLoading.value = false;
      console.log(res);
      if (res.status == 200 || 201) {
        emit("close", res.data);
      } else {
        console.log(res.statusText);
      }
    }
    function close() {
      emit("close");
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Modal = __nuxt_component_0;
      const _component_Loader = __nuxt_component_1$1;
      _push(ssrRenderComponent(_component_Modal, mergeProps({ onCloseModal: close }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<form class="lg:m-24"${_scopeId}><p class="font-medium flex items-center mb-3"${_scopeId}>Create a new employee account</p><div class="flex flex-col my-2"${_scopeId}><label for="firstName" class="text-xs font-medium my-1"${_scopeId}>First Name</label><input${ssrRenderAttr("value", payload.value.firstName)} type="text" name="firstName" placeholder="Jane" class="border border-gray-300 p-2 rounded-lg text-sm"${_scopeId}></div><div class="flex flex-col my-2"${_scopeId}><label for="lastName" class="text-xs font-medium my-1"${_scopeId}>Last Name</label><input${ssrRenderAttr("value", payload.value.lastName)} type="text" name="lastName" placeholder="Doe" class="border border-gray-300 p-2 rounded-lg text-sm"${_scopeId}></div><div class="flex flex-col my-2"${_scopeId}><label for="email" class="text-xs font-medium my-1"${_scopeId}>Email</label><input${ssrRenderAttr("value", payload.value.email)} type="email" name="email" placeholder="John@doe.dot" class="border border-gray-300 p-2 rounded-lg text-sm"${_scopeId}></div><div class="flex items-center my-2"${_scopeId}><span class="font-medium text-xs text-[#d4af37]"${_scopeId}>All new employees have the password <span class="font-bold"${_scopeId}>Employee00</span></span></div><button type="submit" class="flex items-center justify-center py-2 px-3 mt-3 text-xs rounded-lg bg-[#292a5e] min-w-[150px] text-white font-medium hover:bg-gray-300 hover:text-[#292a5e] disabled:bg-gray-600 duration-300"${_scopeId}>`);
            if (!formLoading.value) {
              _push2(`<span${_scopeId}>Create Employee</span>`);
            } else {
              _push2(ssrRenderComponent(_component_Loader, {
                size: "small",
                class: "h-4 w-4"
              }, null, _parent2, _scopeId));
            }
            _push2(`</button></form>`);
          } else {
            return [
              createVNode("form", { class: "lg:m-24" }, [
                createVNode("p", { class: "font-medium flex items-center mb-3" }, "Create a new employee account"),
                createVNode("div", { class: "flex flex-col my-2" }, [
                  createVNode("label", {
                    for: "firstName",
                    class: "text-xs font-medium my-1"
                  }, "First Name"),
                  withDirectives(createVNode("input", {
                    "onUpdate:modelValue": ($event) => payload.value.firstName = $event,
                    type: "text",
                    name: "firstName",
                    placeholder: "Jane",
                    class: "border border-gray-300 p-2 rounded-lg text-sm"
                  }, null, 8, ["onUpdate:modelValue"]), [
                    [vModelText, payload.value.firstName]
                  ])
                ]),
                createVNode("div", { class: "flex flex-col my-2" }, [
                  createVNode("label", {
                    for: "lastName",
                    class: "text-xs font-medium my-1"
                  }, "Last Name"),
                  withDirectives(createVNode("input", {
                    "onUpdate:modelValue": ($event) => payload.value.lastName = $event,
                    type: "text",
                    name: "lastName",
                    placeholder: "Doe",
                    class: "border border-gray-300 p-2 rounded-lg text-sm"
                  }, null, 8, ["onUpdate:modelValue"]), [
                    [vModelText, payload.value.lastName]
                  ])
                ]),
                createVNode("div", { class: "flex flex-col my-2" }, [
                  createVNode("label", {
                    for: "email",
                    class: "text-xs font-medium my-1"
                  }, "Email"),
                  withDirectives(createVNode("input", {
                    "onUpdate:modelValue": ($event) => payload.value.email = $event,
                    type: "email",
                    name: "email",
                    placeholder: "John@doe.dot",
                    class: "border border-gray-300 p-2 rounded-lg text-sm"
                  }, null, 8, ["onUpdate:modelValue"]), [
                    [vModelText, payload.value.email]
                  ])
                ]),
                createVNode("div", { class: "flex items-center my-2" }, [
                  createVNode("span", { class: "font-medium text-xs text-[#d4af37]" }, [
                    createTextVNode("All new employees have the password "),
                    createVNode("span", { class: "font-bold" }, "Employee00")
                  ])
                ]),
                createVNode("button", {
                  type: "submit",
                  onClick: withModifiers(submitForm, ["prevent"]),
                  class: "flex items-center justify-center py-2 px-3 mt-3 text-xs rounded-lg bg-[#292a5e] min-w-[150px] text-white font-medium hover:bg-gray-300 hover:text-[#292a5e] disabled:bg-gray-600 duration-300"
                }, [
                  !formLoading.value ? (openBlock(), createBlock("span", { key: 0 }, "Create Employee")) : (openBlock(), createBlock(_component_Loader, {
                    key: 1,
                    size: "small",
                    class: "h-4 w-4"
                  }))
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
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/CreateEmployeeForm.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const __nuxt_component_1 = _sfc_main$6;
const _sfc_main$5 = {
  __name: "EditEmployeeForm",
  __ssrInlineRender: true,
  props: {
    userdata: {
      type: Object,
      default: {
        ID: "",
        firstName: "",
        lastName: "",
        email: ""
      }
    }
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const formLoading = ref(false);
    const payload = ref({
      firstName: "",
      lastName: "",
      email: ""
    });
    async function submitForm() {
      console.log("calling submit");
      formLoading.value = true;
      const res = await axios.patch(`http://localhost:3006/api/users/update/${props.userdata.ID}`, { ...payload.value });
      formLoading.value = false;
      console.log(res);
      if (res.status == 200 || 201) {
        emit("close", res.data);
      } else {
        console.log(res.statusText);
      }
    }
    function close() {
      emit("close");
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Modal = __nuxt_component_0;
      const _component_Loader = __nuxt_component_1$1;
      _push(ssrRenderComponent(_component_Modal, mergeProps({ onCloseModal: close }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<form class="lg:m-24"${_scopeId}><p class="font-medium flex items-center mb-3"${_scopeId}>Update employee data</p><div class="flex flex-col my-2"${_scopeId}><label for="firstName" class="text-xs font-medium my-1"${_scopeId}>First Name</label><input${ssrRenderAttr("value", payload.value.firstName)} type="text" name="firstName" placeholder="Jane" class="border border-gray-300 p-2 rounded-lg text-sm"${_scopeId}></div><div class="flex flex-col my-2"${_scopeId}><label for="lastName" class="text-xs font-medium my-1"${_scopeId}>Last Name</label><input${ssrRenderAttr("value", payload.value.lastName)} type="text" name="lastName" placeholder="Doe" class="border border-gray-300 p-2 rounded-lg text-sm"${_scopeId}></div><div class="flex flex-col my-2"${_scopeId}><label for="email" class="text-xs font-medium my-1"${_scopeId}>Email</label><input${ssrRenderAttr("value", payload.value.email)} type="email" name="email" placeholder="John@doe.dot" class="border border-gray-300 p-2 rounded-lg text-sm"${_scopeId}></div><div class="flex items-center my-2"${_scopeId}><span class="font-medium text-xs text-[#d4af37]"${_scopeId}>All new employees have the password <span class="font-bold"${_scopeId}>Employee00</span></span></div><button type="submit" class="flex items-center justify-center py-2 px-3 mt-3 text-xs rounded-lg bg-[#292a5e] min-w-[150px] text-white font-medium hover:bg-gray-300 hover:text-[#292a5e] disabled:bg-gray-600 duration-300"${_scopeId}>`);
            if (!formLoading.value) {
              _push2(`<span${_scopeId}>Create Employee</span>`);
            } else {
              _push2(ssrRenderComponent(_component_Loader, {
                size: "small",
                class: "h-4 w-4"
              }, null, _parent2, _scopeId));
            }
            _push2(`</button></form>`);
          } else {
            return [
              createVNode("form", { class: "lg:m-24" }, [
                createVNode("p", { class: "font-medium flex items-center mb-3" }, "Update employee data"),
                createVNode("div", { class: "flex flex-col my-2" }, [
                  createVNode("label", {
                    for: "firstName",
                    class: "text-xs font-medium my-1"
                  }, "First Name"),
                  withDirectives(createVNode("input", {
                    "onUpdate:modelValue": ($event) => payload.value.firstName = $event,
                    type: "text",
                    name: "firstName",
                    placeholder: "Jane",
                    class: "border border-gray-300 p-2 rounded-lg text-sm"
                  }, null, 8, ["onUpdate:modelValue"]), [
                    [vModelText, payload.value.firstName]
                  ])
                ]),
                createVNode("div", { class: "flex flex-col my-2" }, [
                  createVNode("label", {
                    for: "lastName",
                    class: "text-xs font-medium my-1"
                  }, "Last Name"),
                  withDirectives(createVNode("input", {
                    "onUpdate:modelValue": ($event) => payload.value.lastName = $event,
                    type: "text",
                    name: "lastName",
                    placeholder: "Doe",
                    class: "border border-gray-300 p-2 rounded-lg text-sm"
                  }, null, 8, ["onUpdate:modelValue"]), [
                    [vModelText, payload.value.lastName]
                  ])
                ]),
                createVNode("div", { class: "flex flex-col my-2" }, [
                  createVNode("label", {
                    for: "email",
                    class: "text-xs font-medium my-1"
                  }, "Email"),
                  withDirectives(createVNode("input", {
                    "onUpdate:modelValue": ($event) => payload.value.email = $event,
                    type: "email",
                    name: "email",
                    placeholder: "John@doe.dot",
                    class: "border border-gray-300 p-2 rounded-lg text-sm"
                  }, null, 8, ["onUpdate:modelValue"]), [
                    [vModelText, payload.value.email]
                  ])
                ]),
                createVNode("div", { class: "flex items-center my-2" }, [
                  createVNode("span", { class: "font-medium text-xs text-[#d4af37]" }, [
                    createTextVNode("All new employees have the password "),
                    createVNode("span", { class: "font-bold" }, "Employee00")
                  ])
                ]),
                createVNode("button", {
                  type: "submit",
                  onClick: withModifiers(submitForm, ["prevent"]),
                  class: "flex items-center justify-center py-2 px-3 mt-3 text-xs rounded-lg bg-[#292a5e] min-w-[150px] text-white font-medium hover:bg-gray-300 hover:text-[#292a5e] disabled:bg-gray-600 duration-300"
                }, [
                  !formLoading.value ? (openBlock(), createBlock("span", { key: 0 }, "Create Employee")) : (openBlock(), createBlock(_component_Loader, {
                    key: 1,
                    size: "small",
                    class: "h-4 w-4"
                  }))
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
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/forms/EditEmployeeForm.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const __nuxt_component_2 = _sfc_main$5;
const _sfc_main$4 = {
  __name: "CreateRoleForm",
  __ssrInlineRender: true,
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const formLoading = ref(false);
    const payload = ref({
      name: ""
    });
    async function submitForm() {
      console.log("calling submit");
      formLoading.value = true;
      const res = await axios.post("http://localhost:3006/api/roles", { ...payload.value });
      formLoading.value = false;
      console.log(res);
      if (res.status == 200 || 201) {
        emit("close", res.data);
      } else {
        console.log(res.statusText);
      }
    }
    function close() {
      emit("close");
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Modal = __nuxt_component_0;
      const _component_Loader = __nuxt_component_1$1;
      _push(ssrRenderComponent(_component_Modal, mergeProps({ onCloseModal: close }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<form class="lg:m-24"${_scopeId}><p class="font-medium flex items-center mb-3"${_scopeId}>Create a new user role</p><div class="flex flex-col my-2"${_scopeId}><label for="roleName" class="text-xs font-medium my-1"${_scopeId}>Role Name</label><input${ssrRenderAttr("value", payload.value.name)} type="text" name="roleName" placeholder="Minstrel" class="border border-gray-300 p-2 rounded-lg text-sm"${_scopeId}></div><button type="submit" class="flex items-center justify-center py-2 px-3 mt-3 text-xs rounded-lg bg-[#292a5e] min-w-[150px] text-white font-medium hover:bg-gray-300 hover:text-[#292a5e] disabled:bg-gray-600 duration-300"${_scopeId}>`);
            if (!formLoading.value) {
              _push2(`<span${_scopeId}>Create Role</span>`);
            } else {
              _push2(ssrRenderComponent(_component_Loader, {
                size: "small",
                class: "h-4 w-4"
              }, null, _parent2, _scopeId));
            }
            _push2(`</button></form>`);
          } else {
            return [
              createVNode("form", { class: "lg:m-24" }, [
                createVNode("p", { class: "font-medium flex items-center mb-3" }, "Create a new user role"),
                createVNode("div", { class: "flex flex-col my-2" }, [
                  createVNode("label", {
                    for: "roleName",
                    class: "text-xs font-medium my-1"
                  }, "Role Name"),
                  withDirectives(createVNode("input", {
                    "onUpdate:modelValue": ($event) => payload.value.name = $event,
                    type: "text",
                    name: "roleName",
                    placeholder: "Minstrel",
                    class: "border border-gray-300 p-2 rounded-lg text-sm"
                  }, null, 8, ["onUpdate:modelValue"]), [
                    [vModelText, payload.value.name]
                  ])
                ]),
                createVNode("button", {
                  type: "submit",
                  onClick: withModifiers(submitForm, ["prevent"]),
                  class: "flex items-center justify-center py-2 px-3 mt-3 text-xs rounded-lg bg-[#292a5e] min-w-[150px] text-white font-medium hover:bg-gray-300 hover:text-[#292a5e] disabled:bg-gray-600 duration-300"
                }, [
                  !formLoading.value ? (openBlock(), createBlock("span", { key: 0 }, "Create Role")) : (openBlock(), createBlock(_component_Loader, {
                    key: 1,
                    size: "small",
                    class: "h-4 w-4"
                  }))
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
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/forms/CreateRoleForm.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __nuxt_component_3 = _sfc_main$4;
const _sfc_main$3 = {
  __name: "EditRoleForm",
  __ssrInlineRender: true,
  props: {
    roledata: {
      type: Object,
      default: {
        ID: "",
        name: ""
      }
    }
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const formLoading = ref(false);
    const payload = ref({
      ID: "",
      name: ""
    });
    async function submitForm() {
      console.log("calling submit");
      formLoading.value = true;
      const res = await axios.patch(`http://localhost:3006/api/roles/update/${payload.value.name}`, { ...payload.value });
      formLoading.value = false;
      console.log(res);
      if (res.status == 200 || 201) {
        emit("close", res.data);
      } else {
        console.log(res.statusText);
      }
    }
    function close() {
      emit("close");
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Modal = __nuxt_component_0;
      const _component_Loader = __nuxt_component_1$1;
      _push(ssrRenderComponent(_component_Modal, mergeProps({ onCloseModal: close }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<form class="lg:m-24"${_scopeId}><p class="font-medium flex items-center mb-3"${_scopeId}>Edit a user role</p><div class="flex flex-col my-2"${_scopeId}><label for="roleName" class="text-xs font-medium my-1"${_scopeId}>Role Name</label><input${ssrRenderAttr("value", payload.value.name)} type="text" name="roleName" placeholder="Minstrel" class="border border-gray-300 p-2 rounded-lg text-sm"${_scopeId}></div><button type="submit" class="flex items-center justify-center py-2 px-3 mt-3 text-xs rounded-lg bg-[#292a5e] min-w-[150px] text-white font-medium hover:bg-gray-300 hover:text-[#292a5e] disabled:bg-gray-600 duration-300"${_scopeId}>`);
            if (!formLoading.value) {
              _push2(`<span${_scopeId}>Update Role</span>`);
            } else {
              _push2(ssrRenderComponent(_component_Loader, {
                size: "small",
                class: "h-4 w-4"
              }, null, _parent2, _scopeId));
            }
            _push2(`</button></form>`);
          } else {
            return [
              createVNode("form", { class: "lg:m-24" }, [
                createVNode("p", { class: "font-medium flex items-center mb-3" }, "Edit a user role"),
                createVNode("div", { class: "flex flex-col my-2" }, [
                  createVNode("label", {
                    for: "roleName",
                    class: "text-xs font-medium my-1"
                  }, "Role Name"),
                  withDirectives(createVNode("input", {
                    "onUpdate:modelValue": ($event) => payload.value.name = $event,
                    type: "text",
                    name: "roleName",
                    placeholder: "Minstrel",
                    class: "border border-gray-300 p-2 rounded-lg text-sm"
                  }, null, 8, ["onUpdate:modelValue"]), [
                    [vModelText, payload.value.name]
                  ])
                ]),
                createVNode("button", {
                  type: "submit",
                  onClick: withModifiers(submitForm, ["prevent"]),
                  class: "flex items-center justify-center py-2 px-3 mt-3 text-xs rounded-lg bg-[#292a5e] min-w-[150px] text-white font-medium hover:bg-gray-300 hover:text-[#292a5e] disabled:bg-gray-600 duration-300"
                }, [
                  !formLoading.value ? (openBlock(), createBlock("span", { key: 0 }, "Update Role")) : (openBlock(), createBlock(_component_Loader, {
                    key: 1,
                    size: "small",
                    class: "h-4 w-4"
                  }))
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
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/forms/EditRoleForm.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_4 = _sfc_main$3;
const _sfc_main$2 = {
  __name: "RoleDetailsModal",
  __ssrInlineRender: true,
  props: {
    role: {
      type: Object
    }
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    function close() {
      emit("close");
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Modal = __nuxt_component_0;
      _push(ssrRenderComponent(_component_Modal, mergeProps({ onCloseModal: close }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex flex-col p-5 lg:mx-24 lg:mb-24"${_scopeId}><div class="role flex flex-col items-start"${_scopeId}><h2 class="font-medium capitalize text-lg lg:text-xl"${_scopeId}>Role name: ${ssrInterpolate(__props.role.name)}</h2></div><div class="role flex flex-col items-start"${_scopeId}><span class="text-[#292a5e] text-sm mt-3 mb-1"${_scopeId}>People with this role have the permission to:</span><div class="perms flex flex-col items-start"${_scopeId}><!--[-->`);
            ssrRenderList(5, (i) => {
              _push2(`<div class="flex gap-3 items-center p-2 my-1"${_scopeId}><input class="rounded-full" type="checkbox" checked${_scopeId}><span class="font-medium text-sm"${_scopeId}> permission ${ssrInterpolate(i)}</span><span class="text-red-600 text-xs font-medium cursor-pointer"${_scopeId}> remove </span></div>`);
            });
            _push2(`<!--]--></div></div><span class="text-[#d4af37] cursor-pointer my-6 text-sm font-medium"${_scopeId}>+ Add permission(s)</span></div>`);
          } else {
            return [
              createVNode("div", { class: "flex flex-col p-5 lg:mx-24 lg:mb-24" }, [
                createVNode("div", { class: "role flex flex-col items-start" }, [
                  createVNode("h2", { class: "font-medium capitalize text-lg lg:text-xl" }, "Role name: " + toDisplayString(__props.role.name), 1)
                ]),
                createVNode("div", { class: "role flex flex-col items-start" }, [
                  createVNode("span", { class: "text-[#292a5e] text-sm mt-3 mb-1" }, "People with this role have the permission to:"),
                  createVNode("div", { class: "perms flex flex-col items-start" }, [
                    (openBlock(), createBlock(Fragment, null, renderList(5, (i) => {
                      return createVNode("div", {
                        key: i,
                        class: "flex gap-3 items-center p-2 my-1"
                      }, [
                        createVNode("input", {
                          class: "rounded-full",
                          type: "checkbox",
                          checked: ""
                        }),
                        createVNode("span", { class: "font-medium text-sm" }, " permission " + toDisplayString(i), 1),
                        createVNode("span", { class: "text-red-600 text-xs font-medium cursor-pointer" }, " remove ")
                      ]);
                    }), 64))
                  ])
                ]),
                createVNode("span", { class: "text-[#d4af37] cursor-pointer my-6 text-sm font-medium" }, "+ Add permission(s)")
              ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/RoleDetailsModal.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_6 = _sfc_main$2;
const _sfc_main$1 = {
  __name: "EmployeeDetailsModal",
  __ssrInlineRender: true,
  props: {
    staff: {
      type: Object,
      default: {
        firstName: "John",
        lastName: "Doe",
        email: "john@doe.com"
      }
    }
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    function close() {
      emit("close");
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Modal = __nuxt_component_0;
      _push(ssrRenderComponent(_component_Modal, mergeProps({ onCloseModal: close }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex flex-col p-5 lg:mx-24 lg:mb-24"${_scopeId}><div class="role flex flex-col items-start"${_scopeId}><h2 class="font-medium capitalize text-lg lg:text-xl"${_scopeId}>Name: ${ssrInterpolate(__props.staff.firstName + " " + __props.staff.lastName)}</h2><div class="flex gap-4"${_scopeId}><span class="font-medium"${_scopeId}>Roles: </span><span class="font-medium capitalize"${_scopeId}>Employee, </span></div><div class="flex gap-4"${_scopeId}><span class="font-medium"${_scopeId}>Email: </span><span class="font-medium capitalize"${_scopeId}>${ssrInterpolate(__props.staff.email)}</span></div></div><div class="role flex flex-col items-start"${_scopeId}><span class="text-[#292a5e] text-sm mt-3 mb-1"${_scopeId}>${ssrInterpolate()} is responsible for these consignments:</span><div class="perms flex flex-col items-start"${_scopeId}><!--[-->`);
            ssrRenderList(5, (i) => {
              _push2(`<div class="flex gap-3 items-center p-2 my-1"${_scopeId}><span class="font-medium text-sm"${_scopeId}> Consignment ${ssrInterpolate(i)}</span><span class="text-red-600 text-xs font-medium cursor-pointer"${_scopeId}> remove </span></div>`);
            });
            _push2(`<!--]--></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex flex-col p-5 lg:mx-24 lg:mb-24" }, [
                createVNode("div", { class: "role flex flex-col items-start" }, [
                  createVNode("h2", { class: "font-medium capitalize text-lg lg:text-xl" }, "Name: " + toDisplayString(__props.staff.firstName + " " + __props.staff.lastName), 1),
                  createVNode("div", { class: "flex gap-4" }, [
                    createVNode("span", { class: "font-medium" }, "Roles: "),
                    createVNode("span", { class: "font-medium capitalize" }, "Employee, ")
                  ]),
                  createVNode("div", { class: "flex gap-4" }, [
                    createVNode("span", { class: "font-medium" }, "Email: "),
                    createVNode("span", { class: "font-medium capitalize" }, toDisplayString(__props.staff.email), 1)
                  ])
                ]),
                createVNode("div", { class: "role flex flex-col items-start" }, [
                  createVNode("span", { class: "text-[#292a5e] text-sm mt-3 mb-1" }, toDisplayString() + " is responsible for these consignments:", 1),
                  createVNode("div", { class: "perms flex flex-col items-start" }, [
                    (openBlock(), createBlock(Fragment, null, renderList(5, (i) => {
                      return createVNode("div", {
                        key: i,
                        class: "flex gap-3 items-center p-2 my-1"
                      }, [
                        createVNode("span", { class: "font-medium text-sm" }, " Consignment " + toDisplayString(i), 1),
                        createVNode("span", { class: "text-red-600 text-xs font-medium cursor-pointer" }, " remove ")
                      ]);
                    }), 64))
                  ])
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
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/EmployeeDetailsModal.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_7 = _sfc_main$1;
const _sfc_main = {
  __name: "employees",
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
    const showCreateEmployeeForm = ref(false);
    const showEditEmployeeForm = ref(false);
    const employeeToEdit = ref({});
    const showEmployeeDeleteDialog = ref(false);
    const employeeToDelete = ref(0);
    const deleteInProgress = ref(false);
    const showCreateRoleForm = ref(false);
    const showEditRoleForm = ref(false);
    const roleToEdit = ref({});
    const showRoleDeleteDialog = ref(false);
    const roleToDelete = ref("");
    const showRoleDetails = ref(false);
    const currentRole = ref({});
    const showEmployeeDetails = ref(false);
    const currentEmployee = ref({});
    const currentDate = /* @__PURE__ */ new Date();
    const OPTIONS = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
    const formattedDate = currentDate.toLocaleDateString("en-US", OPTIONS);
    function handleformClosed(payload) {
      showCreateEmployeeForm.value = false;
      if (payload != void 0) {
        console.log("the payload", payload);
        staff.value.push(payload);
      }
    }
    function handleEditformClosed(payload) {
      showEditEmployeeForm.value = false;
      if (payload != void 0) {
        console.log("the payload", payload);
        staff.value = staff.value.map((x) => {
          if (x.ID == payload.ID) {
            return payload;
          } else {
            return x;
          }
        });
      }
    }
    async function deleteEmployee() {
      deleteInProgress.value = true;
      const res = await axios.delete(`http://localhost:3006/api/users/delete/${employeeToDelete.value}`);
      console.log(res);
      if (res.status == 200 || 201) {
        deleteInProgress.value = false;
        staff.value = staff.value.filter((x) => {
          return x.ID !== employeeToDelete.value;
        });
        showEmployeeDeleteDialog.value = false;
      } else {
        console.log(res.statusText);
      }
    }
    async function deleteRole() {
      deleteInProgress.value = true;
      const res = await axios.delete(`http://localhost:3006/api/roles/delete/${roleToDelete.value}`);
      console.log(res);
      if (res.status == 200 || 201) {
        deleteInProgress.value = false;
        roles.value = roles.value.filter((x) => {
          return x.name !== roleToDelete.value;
        });
        showRoleDeleteDialog.value = false;
      } else {
        console.log(res.statusText);
      }
    }
    function handleCreateRoleFormClosed() {
      showCreateRoleForm.value = false;
    }
    function loadDeleteRoleDialog(rolename) {
      roleToDelete.value = rolename;
      showRoleDeleteDialog.value = true;
    }
    function handleEditRoleformClosed(payload) {
      showEditRoleForm.value = false;
      if (payload != void 0) {
        console.log("the payload", payload);
        roles.value = roles.value.map((x) => {
          if (x.name == payload.name) {
            return payload;
          } else {
            return x;
          }
        });
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_IconsAddIcon = __nuxt_component_0$1;
      const _component_CreateEmployeeForm = __nuxt_component_1;
      const _component_FormsEditEmployeeForm = __nuxt_component_2;
      const _component_FormsCreateRoleForm = __nuxt_component_3;
      const _component_FormsEditRoleForm = __nuxt_component_4;
      const _component_DeleteDialog = __nuxt_component_4$1;
      const _component_RoleDetailsModal = __nuxt_component_6;
      const _component_EmployeeDetailsModal = __nuxt_component_7;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-wrap sm:flex-row gap-4" }, _attrs))}><div class="w-full lg:w-3/5"><div class="mb-4"><div class="w-full rounded-2xl bg-white p-4 shadow-lg"><div class="flex items-center justify-between"><p class="font-bold text-black">Staff</p><button class="rounded-full block border border-gray-200 p-1">`);
      _push(ssrRenderComponent(_component_IconsAddIcon, {
        class: "h-7 w-7",
        onClick: ($event) => loadDeleteRoleDialog(_ctx.st.name)
      }, null, _parent));
      _push(`</button></div><ul><!--[-->`);
      ssrRenderList(staff.value, (st, i) => {
        _push(`<li class="my-6 flex items-center justify-between space-x-2"><a href="#" class="relative flex gap-8"><img alt="Maurice Lokumba"${ssrRenderAttr("src", _imports_4)} class="mx-auto h-10 w-10 rounded-full object-cover"><div class="flex flex-col"><span class="ml-2 text-sm font-semibold text-gray-900">${ssrInterpolate(st.firstName)}</span><span class="ml-2 text-sm text-gray-400">${ssrInterpolate(st.email)}</span></div></a><div class="flex gap-4 items-center justify-self-end"><span class="text-[#292a5e] text-sm font-medium hover:font-semibold duration-300 cursor-pointer">View</span><span class="text-[#d4af37] text-sm font-medium hover:font-semibold duration-300 cursor-pointer"> Edit </span><span class="text-red-600 text-sm font-medium hover:font-semibold duration-300 cursor-pointer">Delete</span></div></li>`);
      });
      _push(`<!--]--></ul></div></div></div><div class="w-full lg:w-1/3"><div class="mb-4"><div class="w-full rounded-2xl bg-white p-4 shadow-lg"><div class="mb-6 flex items-center justify-between"><div class="flex items-center"><span class="relative rounded-xl bg-blue-100 p-2"></span><div class="flex flex-col"><span class="ml-2 font-bold text-black">${ssrInterpolate(__props.title || "Employee roles")}</span><span class="ml-2 text-sm text-gray-500">Available roles</span></div></div><div class="flex items-center"><button class="rounded-full border border-gray-200 p-1">`);
      _push(ssrRenderComponent(_component_IconsAddIcon, {
        class: "h-7 w-7 cursor-pointer",
        onClick: ($event) => showCreateRoleForm.value = true
      }, null, _parent));
      _push(`</button></div></div><div class="m-auto block"><div class="flex flex-col gap-2"><!--[-->`);
      ssrRenderList(roles.value, (role, i) => {
        _push(`<div class="flex justify-between py-3 h-14 bg-gray-100"><p class="p-3 text-md capitalize flex items-center">${ssrInterpolate(role.name)}</p><div class="flex gap-4 p-3 items-center"><span class="text-[#292a5e] text-sm font-medium hover:font-semibold duration-300 cursor-pointer">View</span><span class="text-[#d4af37] text-sm font-medium hover:font-semibold duration-300 cursor-pointer">Edit</span><span class="text-red-600 text-sm font-medium hover:font-semibold duration-300 cursor-pointer">Delete</span></div></div>`);
      });
      _push(`<!--]--></div></div></div></div><div class="mb-4"><div class="w-full rounded-2xl bg-white p-4 shadow-lg"><div class="mb-6 flex items-center justify-between"><div class="flex items-center"><span class="relative rounded-xl bg-blue-100 p-2"></span><div class="flex flex-col"><span class="ml-2 font-bold text-black">Leaderboard</span><span class="ml-2 text-sm text-gray-500"> Top Performers </span></div></div></div><div class="mb-4 flex items-center justify-between space-x-12"><span class="flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-semibold text-green-700">${ssrInterpolate(unref(formattedDate))}</span></div><div class="m-auto block"><ul><!--[-->`);
      ssrRenderList(staff.value.slice(0, 2), (st, i) => {
        _push(`<li class="my-6 flex items-center space-x-2"><a href="#" class="relative block"><img alt="Maurice Lokumba"${ssrRenderAttr("src", _imports_4)} class="mx-auto h-10 w-10 rounded-full object-cover"></a><div class="flex flex-col"><span class="ml-2 text-sm font-semibold text-gray-900">${ssrInterpolate(st.firstName)}</span><span class="ml-2 text-sm text-gray-400">${ssrInterpolate(st.email)}</span></div></li>`);
      });
      _push(`<!--]--></ul></div></div></div></div>`);
      if (showCreateEmployeeForm.value) {
        _push(ssrRenderComponent(_component_CreateEmployeeForm, { onClose: handleformClosed }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (showEditEmployeeForm.value) {
        _push(ssrRenderComponent(_component_FormsEditEmployeeForm, {
          userdata: employeeToEdit.value,
          onClose: handleEditformClosed
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (showCreateRoleForm.value) {
        _push(ssrRenderComponent(_component_FormsCreateRoleForm, { onClose: handleCreateRoleFormClosed }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (showEditRoleForm.value) {
        _push(ssrRenderComponent(_component_FormsEditRoleForm, {
          roledata: roleToEdit.value,
          onClose: handleEditRoleformClosed
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (showEmployeeDeleteDialog.value) {
        _push(ssrRenderComponent(_component_DeleteDialog, {
          entity: "employee",
          loading: deleteInProgress.value,
          onProceed: deleteEmployee,
          onClose: ($event) => showEmployeeDeleteDialog.value = false
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (showRoleDeleteDialog.value) {
        _push(ssrRenderComponent(_component_DeleteDialog, {
          entity: "role",
          loading: deleteInProgress.value,
          onProceed: deleteRole,
          onClose: ($event) => showRoleDeleteDialog.value = false
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (showRoleDetails.value) {
        _push(ssrRenderComponent(_component_RoleDetailsModal, {
          role: currentRole.value,
          onClose: ($event) => showRoleDetails.value = false
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (showEmployeeDetails.value) {
        _push(ssrRenderComponent(_component_EmployeeDetailsModal, {
          staff: currentEmployee.value,
          onClose: ($event) => showEmployeeDetails.value = false
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/employees.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=employees-BTeiJ3G6.mjs.map
