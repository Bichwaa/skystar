import { _ as __nuxt_component_0$1, a as __nuxt_component_4 } from './DeleteDialog-BsSMWScP.mjs';
import { _ as __nuxt_component_1, a as __nuxt_component_2, b as __nuxt_component_3 } from './EditCustomerForm-Dn83ny2h.mjs';
import { ref, mergeProps, unref, useSSRContext } from 'file:///home/bichwaa/Desktop/work/skystar/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList } from 'file:///home/bichwaa/Desktop/work/skystar/node_modules/vue/server-renderer/index.mjs';
import axios from 'file:///home/bichwaa/Desktop/work/skystar/node_modules/axios/index.js';
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

const _sfc_main = {
  __name: "customers",
  __ssrInlineRender: true,
  props: {
    title: {
      type: String,
      default: ""
    }
  },
  setup(__props) {
    const items = [
      {
        id: 1,
        fullName: "John Doe",
        email: "john.doe@example.com",
        consignments: 10,
        fileManager: "Manager Name 1"
      },
      {
        id: 2,
        fullName: "Jane Doe",
        email: "jane.doe@example.com",
        consignments: 5,
        fileManager: "Manager Name 2"
      }
    ];
    const customers = ref([]);
    const currentDate = /* @__PURE__ */ new Date();
    const OPTIONS = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
    const formattedDate = currentDate.toLocaleDateString("en-US", OPTIONS);
    const showCustomerDetails = ref(false);
    const showCreateCustomerForm = ref(false);
    const showEditCustomerForm = ref(false);
    const showDeleteCustomerDialog = ref(false);
    const currentCustomer = ref({});
    const customerToEdit = ref({});
    const customerToDelete = ref({});
    const deleteInProgress = ref(false);
    function handleCreateCustomerformClosed() {
      showCreateCustomerForm.value = false;
      if (payload != void 0) {
        console.log("the payload", payload);
        customers.value.push(payload);
      }
    }
    function handleEditCustomerformClosed() {
      showEditCustomerForm.value = false;
      if (payload != void 0) {
        console.log("the payload", payload);
        customers.value = customers.value.map((x) => {
          if (x.ID == payload.ID) {
            return payload;
          } else {
            return x;
          }
        });
      }
    }
    async function deleteCustomer() {
      deleteInProgress.value = true;
      const res = await axios.delete(`http://localhost:3006/api/customer/delete/${customerToDelete.value.ID}`);
      console.log(res);
      if (res.status == 200 || 201) {
        deleteInProgress.value = false;
        customers.value = customers.value.filter((x) => {
          return x.ID !== employeeToDelete.value;
        });
        showEmployeeDeleteDialog.value = false;
      } else {
        console.log(res.statusText);
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_IconsAddIcon = __nuxt_component_0$1;
      const _component_CustomerDetailsModal = __nuxt_component_1;
      const _component_FormsCreateCustomerForm = __nuxt_component_2;
      const _component_FormsEditCustomerForm = __nuxt_component_3;
      const _component_DeleteDialog = __nuxt_component_4;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-wrap sm:flex-row gap-8" }, _attrs))}><div class="w-full"><div class="mb-4"><div class="w-full rounded-2xl bg-white p-4 shadow-lg"><div class="mb-6 flex items-center justify-between"><div class="flex items-center justify-between w-full"><div class="flex flex-col"><span class="ml-2 font-bold text-black">Customer List</span><span class="ml-2 text-xs text-gray-500"> as of </span></div><button class="rounded-full border border-gray-200 p-1">`);
      _push(ssrRenderComponent(_component_IconsAddIcon, {
        class: "h-7 w-7 cursor-pointer",
        onClick: ($event) => showCreateCustomerForm.value = true
      }, null, _parent));
      _push(`</button></div></div><div class="mb-4 flex items-center justify-between space-x-12"><span class="flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-semibold text-green-700">${ssrInterpolate(unref(formattedDate))}</span></div><div class="m-auto block"><table class="w-full divide-y divide-gray-200"><thead class="bg-gray-100"><tr class=""><th class="px-4 py-2 text-left">Full Name</th><th class="px-4 py-2 text-left">Email</th><th class="px-4 py-2 text-left">Consignments</th><th class="px-4 py-2 text-left">File Manager</th><th class="px-4 py-2 text-left">Actions</th></tr></thead><tbody><!--[-->`);
      ssrRenderList(items, (item) => {
        _push(`<tr><td class="px-4 py-2">${ssrInterpolate(item.fullName)}</td><td class="px-4 py-2">${ssrInterpolate(item.email)}</td><td class="px-4 py-2">${ssrInterpolate(item.consignments)}</td><td class="px-4 py-2">${ssrInterpolate(item.fileManager)}</td><td class="flex items-center gap-6 px-4 py-2"><span class="text-[#292a5e] text-sm font-medium hover:text-black duration-300 cursor-pointer">View</span><span class="text-[#d4af37] text-sm font-medium hover:text-black duration-300 cursor-pointer"> Edit </span><span class="text-red-600 text-sm font-medium hover:text-black duration-300 cursor-pointer">Delete</span></td></tr>`);
      });
      _push(`<!--]--></tbody></table></div></div></div></div>`);
      if (showCustomerDetails.value) {
        _push(ssrRenderComponent(_component_CustomerDetailsModal, {
          customer: currentCustomer.value,
          onClose: ($event) => showCustomerDetails.value = false
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (showCreateCustomerForm.value) {
        _push(ssrRenderComponent(_component_FormsCreateCustomerForm, { onClose: handleCreateCustomerformClosed }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (showEditCustomerForm.value) {
        _push(ssrRenderComponent(_component_FormsEditCustomerForm, {
          customerdata: customerToEdit.value,
          onClose: handleEditCustomerformClosed
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (showDeleteCustomerDialog.value) {
        _push(ssrRenderComponent(_component_DeleteDialog, {
          entity: "customer",
          loading: deleteInProgress.value,
          onProceed: deleteCustomer,
          onClose: ($event) => showDeleteCustomerDialog.value = false
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/customers.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=customers-D5DIRR2_.mjs.map
