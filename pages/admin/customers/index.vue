<template>
    <div class="flex flex-wrap sm:flex-row gap-8">
      <div class="w-full">
        <div class="mb-4">
          <div class="w-full rounded-2xl bg-white p-4 shadow-lg">
            <div class="mb-6 flex items-center justify-between">
              <div class="flex items-center justify-between w-full relative">
                <div class="flex flex-col">
                  <span class="ml-2 font-bold text-black">Customer List</span>
                  <span class="ml-2 text-xs text-gray-500">
                    as of
                  </span>
                </div>
                <DropDowner class="inline-flex flex-col gap-3">
                  <div class="group">
                    <button class="p-2 flex gap-4 items-center group-hover:bg-[#292a5e] duration-300 w-full" @click="showCreateCustomerForm=true">
                      <IconsAddIcon class="h-5 w-5 cursor-pointer"  />
                      <span class="text-sm text-[#292a5e] group-hover:text-white duration-700">
                        New Customer
                      </span>
                    </button>
                  </div>
  
                  <div class="group">
                    <button class="p-2 flex gap-4 items-center group-hover:bg-[#292a5e] duration-300" @click="showCreateTransporterForm=true">
                      <IconsAddIcon class="h-5 w-5 cursor-pointer"  />
                      <span class="text-sm text-[#292a5e] group-hover:text-white duration-700">
                        Add Shipper
                      </span>
                    </button>
                  </div>
                </DropDowner>
              </div>
              
            </div>
            <div class="mb-4 flex items-center justify-between space-x-12">
              <span
                class="flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-semibold text-green-700"
              >
                {{ formattedDate }}
              </span>
            </div>
            
            <div class="m-auto block">
              <table class="w-full divide-y divide-gray-200">
                <thead class="bg-gray-100">
                  <tr class="">
                    <th class="px-4 py-2 text-left">Full Name</th>
                    <th class="px-4 py-2 text-left">Email</th>
                    <th class="px-4 py-2 text-left">Phone</th>
                    <th class="px-4 py-2 text-left">File Manager</th>
                    <th class="px-4 py-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in customers
                   " :key="item.id">
                    <td class="px-4 py-2">{{ item.fullName }}</td>
                    <td class="px-4 py-2">{{ item.email }}</td>
                    <td class="px-4 py-2">{{ item.phone }}</td>
                    <td class="px-4 py-2"><span v-if="item.AccountManager">{{ item.AccountManager.firstName + " " + item.AccountManager.lastName }}</span></td>
                    <td class="flex items-center gap-6 px-4 py-2">
                      <span 
                        class="text-[#292a5e] text-sm font-medium hover:text-black duration-300 cursor-pointer"
                        @click="viewCustomerClicked(item.ID)"
                        >View</span>
  
                      <span class="text-[#d4af37] text-sm font-medium hover:text-black duration-300 cursor-pointer"
                        @click="loadEditCustomerForm(item)">
                        Edit
                      </span>
  
                      <span class="text-red-600 text-sm font-medium hover:text-black duration-300 cursor-pointer" 
                        @click="loadDeleteCustomerDialog(item)"
                        >Delete</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <CustomerDetailsModal v-if="showCustomerDetails" :customer="currentCustomer" @close="showCustomerDetails=false"/>
      <FormsCreateCustomerForm v-if="showCreateCustomerForm"  @close="handleCreateCustomerformClosed"/>
      <FormsEditCustomerForm v-if="showEditCustomerForm" :customerdata="customerToEdit" @close="handleEditCustomerformClosed"/>
      <FormsCreateTransporterForm v-if="showCreateTransporterForm"  @close="handleCreateTransporterformClosed"/>
      <DeleteDialog v-if="showDeleteCustomerDialog" entity="customer" :loading="deleteInProgress" @proceed="deleteCustomer" @close="showDeleteCustomerDialog=false"/>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';

  definePageMeta({
    middleware: 'permissions',
    permissions: ['can-read-customers']
  });
  
  const { $axios } = useNuxtApp()

  
  const items = [
          {
            id: 1,
            fullName: 'John Doe',
            email: 'john.doe@example.com',
            consignments: 10,
            fileManager: 'Manager Name 1',
          },
          {
            id: 2,
            fullName: 'Jane Doe',
            email: 'jane.doe@example.com',
            consignments: 5,
            fileManager: 'Manager Name 2',
          },
        ]
  
  
  defineProps({
    title: {
      type: String,
      default: "",
    },
  });
  const customers = ref([]);
  // const roles = ref([]);
  
  const currentDate = new Date();
  const OPTIONS = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = currentDate.toLocaleDateString('en-US',OPTIONS);
  
  //CRUD SHIT
  const showCustomerDetails = ref(false)
  const showCreateCustomerForm = ref(false)
  const showEditCustomerForm = ref(false)
  const showDeleteCustomerDialog = ref(false)
  const showCreateTransporterForm = ref(false)
  const showEditTransporterForm = ref(false)
  const currentCustomer = ref({});
  const customerToEdit = ref({});
  const customerToDelete = ref({});
  const deleteInProgress = ref(false)
  
  function viewCustomerClicked(customer){
    navigateTo(`/admin/customers/${customer}`)
  }
  
  function loadEditCustomerForm(customer){
    customerToEdit.value = customer;
    showEditCustomerForm.value = true
  }
  
  function handleCreateCustomerformClosed(payload){
    showCreateCustomerForm.value=false;
    if(payload!=undefined){
    console.log("the payload",payload)
    customers.value.push(payload)
    }
  }
  
  function handleEditCustomerformClosed(payload){
    showEditCustomerForm.value=false;
    if(payload!=undefined){
    console.log("the payload",payload)
    customers.value = customers.value.map(x=>{
      if(x.ID==payload.ID){
        return payload
      }else{
        return x
      }
    })
    }
  }

  function handleCreateTransporterformClosed(payload){
    showCreateTransporterForm.value = false;

  }
  
  function loadDeleteCustomerDialog(customer){
    customerToDelete.value = customer;
    showDeleteCustomerDialog.value = true
  }
  
  async function deleteCustomer(){
    deleteInProgress.value = true
    const res = await $axios.delete(`/api/customers/delete/${customerToDelete.value.ID}`);
    console.log(res)
    if(res.status==200 || 201){
        deleteInProgress.value = false
        //remove employee from client state
        customers.value  = customers.value.filter((x)=>{
          return x.ID!=customerToDelete.value.ID
        })
        showDeleteCustomerDialog.value = false;
    }else{
        console.log(res.statusText)
    }
  }
  
  
  onMounted(async () => {
    try {
      const response = await $axios.get('/api/customers');
      if(response.status==200 || 201){
      customers.value = response.data;
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      customers.value = null; // Set items to an empty array or handle error as needed
    }
  });
  
  </script>