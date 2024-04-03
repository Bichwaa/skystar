import { b as __nuxt_component_0, c as __nuxt_component_1$1 } from './DeleteDialog-BsSMWScP.mjs';
import { useSSRContext, mergeProps, withCtx, createVNode, toDisplayString, openBlock, createBlock, Fragment, renderList, ref, withDirectives, vModelText, withModifiers } from 'file:///home/bichwaa/Desktop/work/skystar/node_modules/vue/index.mjs';
import { ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderAttr } from 'file:///home/bichwaa/Desktop/work/skystar/node_modules/vue/server-renderer/index.mjs';
import axios from 'file:///home/bichwaa/Desktop/work/skystar/node_modules/axios/index.js';

const _sfc_main$2 = {
  __name: "CustomerDetailsModal",
  __ssrInlineRender: true,
  props: {
    customer: {
      type: Object,
      default: {
        fullName: "John Doent",
        consignments: 10,
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
            _push2(`<div class="flex flex-col p-5 lg:mx-24 lg:mb-24"${_scopeId}><h1 class="font-semibold text-lg Lg:text-xl my-5"${_scopeId}>Customer Deails</h1><div class="role flex flex-col items-start mb-4"${_scopeId}><h2 class="font-medium capitalize text-lg lg:text-xl"${_scopeId}>Name: ${ssrInterpolate(__props.customer.fullName)}</h2><div class="flex gap-4"${_scopeId}><span class="font-medium"${_scopeId}>Email: </span><span class="font-medium capitalize"${_scopeId}>${ssrInterpolate(__props.customer.email)}</span></div><div class="flex gap-4"${_scopeId}><span class="font-medium"${_scopeId}>Filed by: </span><span class="font-medium capitalize"${_scopeId}> Jason Mraz </span></div></div><div class="role flex flex-col items-start"${_scopeId}><span class="text-[#292a5e] text-sm mt-3 my-2 uppercase"${_scopeId}> Customer history </span><div class="perms flex flex-col items-start"${_scopeId}><table class="w-full divide-y divide-gray-200"${_scopeId}><thead class="bg-gray-100"${_scopeId}><tr class=""${_scopeId}><th class="px-4 py-2 text-left"${_scopeId}>Full Name</th><th class="px-4 py-2 text-left"${_scopeId}>Email</th><th class="px-4 py-2 text-left"${_scopeId}>Consignments</th><th class="px-4 py-2 text-left"${_scopeId}>File Manager</th></tr></thead><tbody${_scopeId}><!--[-->`);
            ssrRenderList(10, (item) => {
              _push2(`<tr${_scopeId}><td class="px-4 py-2"${_scopeId}>Detail ${ssrInterpolate(item)}</td><td class="px-4 py-2"${_scopeId}>Detail ${ssrInterpolate(item)}</td><td class="px-4 py-2"${_scopeId}>Detail ${ssrInterpolate(item)}</td><td class="px-4 py-2"${_scopeId}>Detail ${ssrInterpolate(item)}</td></tr>`);
            });
            _push2(`<!--]--></tbody></table></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex flex-col p-5 lg:mx-24 lg:mb-24" }, [
                createVNode("h1", { class: "font-semibold text-lg Lg:text-xl my-5" }, "Customer Deails"),
                createVNode("div", { class: "role flex flex-col items-start mb-4" }, [
                  createVNode("h2", { class: "font-medium capitalize text-lg lg:text-xl" }, "Name: " + toDisplayString(__props.customer.fullName), 1),
                  createVNode("div", { class: "flex gap-4" }, [
                    createVNode("span", { class: "font-medium" }, "Email: "),
                    createVNode("span", { class: "font-medium capitalize" }, toDisplayString(__props.customer.email), 1)
                  ]),
                  createVNode("div", { class: "flex gap-4" }, [
                    createVNode("span", { class: "font-medium" }, "Filed by: "),
                    createVNode("span", { class: "font-medium capitalize" }, " Jason Mraz ")
                  ])
                ]),
                createVNode("div", { class: "role flex flex-col items-start" }, [
                  createVNode("span", { class: "text-[#292a5e] text-sm mt-3 my-2 uppercase" }, " Customer history "),
                  createVNode("div", { class: "perms flex flex-col items-start" }, [
                    createVNode("table", { class: "w-full divide-y divide-gray-200" }, [
                      createVNode("thead", { class: "bg-gray-100" }, [
                        createVNode("tr", { class: "" }, [
                          createVNode("th", { class: "px-4 py-2 text-left" }, "Full Name"),
                          createVNode("th", { class: "px-4 py-2 text-left" }, "Email"),
                          createVNode("th", { class: "px-4 py-2 text-left" }, "Consignments"),
                          createVNode("th", { class: "px-4 py-2 text-left" }, "File Manager")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        (openBlock(), createBlock(Fragment, null, renderList(10, (item) => {
                          return createVNode("tr", { key: item }, [
                            createVNode("td", { class: "px-4 py-2" }, "Detail " + toDisplayString(item), 1),
                            createVNode("td", { class: "px-4 py-2" }, "Detail " + toDisplayString(item), 1),
                            createVNode("td", { class: "px-4 py-2" }, "Detail " + toDisplayString(item), 1),
                            createVNode("td", { class: "px-4 py-2" }, "Detail " + toDisplayString(item), 1)
                          ]);
                        }), 64))
                      ])
                    ])
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
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/CustomerDetailsModal.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_1 = _sfc_main$2;
const _sfc_main$1 = {
  __name: "CreateCustomerForm",
  __ssrInlineRender: true,
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const formLoading = ref(false);
    const payload = ref({
      fullName: "",
      accountmanager: "",
      email: ""
    });
    async function submitForm() {
      console.log("calling submit");
      formLoading.value = true;
      const res = await axios.patch("http://localhost:3006/api/customers", { ...payload.value });
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
            _push2(`<form class="lg:m-24"${_scopeId}><p class="font-medium flex items-center mb-3"${_scopeId}>Add new customer</p><div class="flex flex-col my-2"${_scopeId}><label for="firstName" class="text-xs font-medium my-1"${_scopeId}>Full Name</label><input${ssrRenderAttr("value", payload.value.fullName)} type="text" name="fullName" placeholder="Jane Kimweli" class="border border-gray-300 p-2 rounded-lg text-sm"${_scopeId}></div><div class="flex flex-col my-2"${_scopeId}><label for="email" class="text-xs font-medium my-1"${_scopeId}>Email</label><input${ssrRenderAttr("value", payload.value.email)} type="email" name="email" placeholder="John@doe.dot" class="border border-gray-300 p-2 rounded-lg text-sm"${_scopeId}></div><div class="flex flex-col my-4"${_scopeId}><label for="email" class="text-xs font-medium my-1"${_scopeId}>Filed by</label><select${_scopeId}><option value="John"${_scopeId}>John</option><option value="Jane"${_scopeId}>Jane</option><option value="Bob"${_scopeId}>Bob</option><option value="Alice"${_scopeId}>Alice</option><option value="Mike"${_scopeId}>Mike</option><option value="Sarah"${_scopeId}>Sarah</option><option value="Tom"${_scopeId}>Tom</option><option value="Emily"${_scopeId}>Emily</option><option value="David"${_scopeId}>David</option><option value="Samantha"${_scopeId}>Samantha</option></select></div><button type="submit" class="flex items-center justify-center py-2 px-3 mt-6 text-xs rounded-lg bg-[#292a5e] min-w-[150px] text-white font-medium hover:bg-gray-300 hover:text-[#292a5e] disabled:bg-gray-600 duration-300"${_scopeId}>`);
            if (!formLoading.value) {
              _push2(`<span${_scopeId}>Create Customer</span>`);
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
                createVNode("p", { class: "font-medium flex items-center mb-3" }, "Add new customer"),
                createVNode("div", { class: "flex flex-col my-2" }, [
                  createVNode("label", {
                    for: "firstName",
                    class: "text-xs font-medium my-1"
                  }, "Full Name"),
                  withDirectives(createVNode("input", {
                    "onUpdate:modelValue": ($event) => payload.value.fullName = $event,
                    type: "text",
                    name: "fullName",
                    placeholder: "Jane Kimweli",
                    class: "border border-gray-300 p-2 rounded-lg text-sm"
                  }, null, 8, ["onUpdate:modelValue"]), [
                    [vModelText, payload.value.fullName]
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
                createVNode("div", { class: "flex flex-col my-4" }, [
                  createVNode("label", {
                    for: "email",
                    class: "text-xs font-medium my-1"
                  }, "Filed by"),
                  createVNode("select", null, [
                    createVNode("option", { value: "John" }, "John"),
                    createVNode("option", { value: "Jane" }, "Jane"),
                    createVNode("option", { value: "Bob" }, "Bob"),
                    createVNode("option", { value: "Alice" }, "Alice"),
                    createVNode("option", { value: "Mike" }, "Mike"),
                    createVNode("option", { value: "Sarah" }, "Sarah"),
                    createVNode("option", { value: "Tom" }, "Tom"),
                    createVNode("option", { value: "Emily" }, "Emily"),
                    createVNode("option", { value: "David" }, "David"),
                    createVNode("option", { value: "Samantha" }, "Samantha")
                  ])
                ]),
                createVNode("button", {
                  type: "submit",
                  onClick: withModifiers(submitForm, ["prevent"]),
                  class: "flex items-center justify-center py-2 px-3 mt-6 text-xs rounded-lg bg-[#292a5e] min-w-[150px] text-white font-medium hover:bg-gray-300 hover:text-[#292a5e] disabled:bg-gray-600 duration-300"
                }, [
                  !formLoading.value ? (openBlock(), createBlock("span", { key: 0 }, "Create Customer")) : (openBlock(), createBlock(_component_Loader, {
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
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/forms/CreateCustomerForm.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_2 = _sfc_main$1;
const _sfc_main = {
  __name: "EditCustomerForm",
  __ssrInlineRender: true,
  props: {
    customerdata: {
      type: Object,
      default: {
        ID: "",
        fullName: "",
        accountmanager: "",
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
      fullName: "",
      accountmanager: "",
      email: ""
    });
    async function submitForm() {
      console.log("calling submit");
      formLoading.value = true;
      const res = await axios.patch(`http://localhost:3006/api/users/update/${props.customerdata.ID}`, { ...payload.value });
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
            _push2(`<form class="lg:m-24"${_scopeId}><p class="font-medium flex items-center mb-3"${_scopeId}>Update customer data</p><div class="flex flex-col my-2"${_scopeId}><label for="firstName" class="text-xs font-medium my-1"${_scopeId}>Full Name</label><input${ssrRenderAttr("value", payload.value.fullName)} type="text" name="fullName" placeholder="Jane" class="border border-gray-300 p-2 rounded-lg text-sm"${_scopeId}></div><div class="flex flex-col my-2"${_scopeId}><label for="email" class="text-xs font-medium my-1"${_scopeId}>Email</label><input${ssrRenderAttr("value", payload.value.email)} type="email" name="email" placeholder="John@doe.dot" class="border border-gray-300 p-2 rounded-lg text-sm"${_scopeId}></div><div class="flex flex-col my-4"${_scopeId}><label for="email" class="text-xs font-medium my-1"${_scopeId}>Filed by</label><select${_scopeId}><option value="John"${_scopeId}>John</option><option value="Jane"${_scopeId}>Jane</option><option value="Bob"${_scopeId}>Bob</option><option value="Alice"${_scopeId}>Alice</option><option value="Mike"${_scopeId}>Mike</option><option value="Sarah"${_scopeId}>Sarah</option><option value="Tom"${_scopeId}>Tom</option><option value="Emily"${_scopeId}>Emily</option><option value="David"${_scopeId}>David</option><option value="Samantha"${_scopeId}>Samantha</option></select></div><button type="submit" class="flex items-center justify-center py-2 px-3 mt-6 text-xs rounded-lg bg-[#292a5e] min-w-[150px] text-white font-medium hover:bg-gray-300 hover:text-[#292a5e] disabled:bg-gray-600 duration-300"${_scopeId}>`);
            if (!formLoading.value) {
              _push2(`<span${_scopeId}>Update Customer</span>`);
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
                createVNode("p", { class: "font-medium flex items-center mb-3" }, "Update customer data"),
                createVNode("div", { class: "flex flex-col my-2" }, [
                  createVNode("label", {
                    for: "firstName",
                    class: "text-xs font-medium my-1"
                  }, "Full Name"),
                  withDirectives(createVNode("input", {
                    "onUpdate:modelValue": ($event) => payload.value.fullName = $event,
                    type: "text",
                    name: "fullName",
                    placeholder: "Jane",
                    class: "border border-gray-300 p-2 rounded-lg text-sm"
                  }, null, 8, ["onUpdate:modelValue"]), [
                    [vModelText, payload.value.fullName]
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
                createVNode("div", { class: "flex flex-col my-4" }, [
                  createVNode("label", {
                    for: "email",
                    class: "text-xs font-medium my-1"
                  }, "Filed by"),
                  createVNode("select", null, [
                    createVNode("option", { value: "John" }, "John"),
                    createVNode("option", { value: "Jane" }, "Jane"),
                    createVNode("option", { value: "Bob" }, "Bob"),
                    createVNode("option", { value: "Alice" }, "Alice"),
                    createVNode("option", { value: "Mike" }, "Mike"),
                    createVNode("option", { value: "Sarah" }, "Sarah"),
                    createVNode("option", { value: "Tom" }, "Tom"),
                    createVNode("option", { value: "Emily" }, "Emily"),
                    createVNode("option", { value: "David" }, "David"),
                    createVNode("option", { value: "Samantha" }, "Samantha")
                  ])
                ]),
                createVNode("button", {
                  type: "submit",
                  onClick: withModifiers(submitForm, ["prevent"]),
                  class: "flex items-center justify-center py-2 px-3 mt-6 text-xs rounded-lg bg-[#292a5e] min-w-[150px] text-white font-medium hover:bg-gray-300 hover:text-[#292a5e] disabled:bg-gray-600 duration-300"
                }, [
                  !formLoading.value ? (openBlock(), createBlock("span", { key: 0 }, "Update Customer")) : (openBlock(), createBlock(_component_Loader, {
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
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/forms/EditCustomerForm.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_3 = _sfc_main;

export { __nuxt_component_1 as _, __nuxt_component_2 as a, __nuxt_component_3 as b };
//# sourceMappingURL=EditCustomerForm-Dn83ny2h.mjs.map
