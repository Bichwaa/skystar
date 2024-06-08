<template>
    <div class="flex flex-wrap sm:flex-row gap-4">
      <div class="w-full lg:w-[60%]">
        <div class="mb-4">
          <div class="w-full rounded-2xl bg-white p-4 shadow-lg">
            <div class="flex flex-col py-5 px-3 lg:mx-2 lg:mb-24">
                <div class="w-full flex justify-between group">
                <h1 class="font-semibold text-lg Lg:text-xl ">Customer Details</h1>
                
                </div>

                <div class="role flex flex-col items-start mb-4">
                    <h2 class="font-medium capitalize text-lg lg:text-xl">Name: {{customer.fullName}}</h2>

                    <div class="flex gap-4">
                        <span class="font-medium">Email: </span>
                        <span class="font-medium capitalize"> {{customer.email}} </span>
                    </div>

                    <div class="flex gap-4">
                        <span class="font-medium">Phone: </span>
                        <span class="font-medium capitalize"> {{customer.phone}} </span>
                    </div>

                    <div class="flex gap-4">
                        <span class="font-medium">Filed by: </span>
                        <span class="font-medium capitalize" v-if="customer.AccountManager"> {{ customer.AccountManager.firstName + " " + customer.AccountManager.lastName }} </span>
                    </div>

                    
                </div>
                
                <div class="role flex flex-col items-start my-6">
                    <span class="text-[#292a5e] text-sm mt-3 my-2 uppercase font-semibold"> Customer's Consignment History  </span>

                    <div class="perms flex flex-col items-start">
                      <table class="w-full divide-y divide-gray-200">
                        <thead class="bg-gray-100">
                          <tr class="">
                            <th class="px-4 py-2 text-left">Customer</th>
                            <th class="px-4 py-2 text-left">Booking No</th>
                            <th class="px-4 py-2 text-left">Mode of transport</th>
                            <th class="px-4 py-2 text-left">Port of Loading</th>
                            <th class="px-4 py-2 text-left">Port of Discharge</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="item in consignments" @click="openConsignment(item.ID)" :key="item.id" class="cursor-pointer hover:bg-yellow-100 duration-300">
                            <td class="px-4 py-2">{{ item.customer.fullName }}</td>
                            <td class="px-4 py-2">{{ item.bookingNumber }}</td>
                            <td class="px-4 py-2">{{ item.modeOfTransport }}</td>
                            <td class="px-4 py-2">{{ item.portOfLoading }}</td>
                            <td class="px-4 py-2">{{ item.destination }}</td>
                            
                          </tr>
                        </tbody>
                      </table>
                    </div>

                </div>
            </div>
          </div>
        </div>
      </div>
      <div class="w-full lg:w-[38%]">
        <div class="mb-4">
          <div class="w-full rounded-2xl bg-white p-4 shadow-lg">
            
            <div class="role flex flex-col items-start my-3">
              <div class="w-full flex justify-between group mb-4">
                <span class="text-[#292a5e] text-sm mt-3 my-2 uppercase font-semibold"> Customer's Consignees:  </span>
                <button 
                  class="p-2 rounded-lg flex gap-4 items-center border border-gray-200 group-hover:bg-[#292a5e] duration-300"
                  @click="()=>showCreateConsigneeForm=true"
                  >
                    <IconsAddIcon class="h-5 w-5 cursor-pointer"  />
                    <span class="text-sm text-[#292a5e] group-hover:text-white duration-700">
                    Add Consignee
                    </span>
                </button>
              </div>

                <div class="perms flex flex-col items-start">
                    <table class="w-full divide-y divide-gray-200">
                        <thead class="bg-gray-100">
                        <tr class="">
                            <th class="px-4 py-2 text-left">Name</th>
                            <th class="px-4 py-2 text-left">Email</th>
                            <th class="px-4 py-2 text-left">Phone</th>
                            <th class="px-4 py-2 text-left">Actions</th>
                        </tr>
                        </thead>
                        <tbody v-if="true">
                        <tr v-for="item in consignees" :key="item.ID" class=" duration-300">
                            <td class="px-4 py-2">{{ item.fullName }}</td>
                            <td class="px-4 py-2">{{ item.email }}</td>
                            <td class="px-4 py-2">{{ item.phone }}</td>
                            <td class="flex items-center gap-6 px-4 py-2">

                            <span class="text-[#d4af37] text-sm font-medium hover:text-black duration-300 cursor-pointer"
                                @click="()=>loadEditConsigneeForm(item)">
                                Edit
                            </span>

                            <span class="text-red-600 text-sm font-medium hover:text-black duration-300 cursor-pointer" 
                                @click="()=>loadDeleteconsigneeDialog(item)"
                                >Delete</span>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>

            </div>
            
          </div>
        </div>
        <div class="mb-4">
          <div class="w-full rounded-2xl bg-white p-4 shadow-lg">
           
            <div class="role flex flex-col items-start my-3">
              <div class="w-full flex justify-between group mb-4">
                <span class="text-[#292a5e] text-sm mt-3 my-2 uppercase font-semibold"> Customer's Shippers:  </span>
                <button 
                  class="p-2 rounded-lg flex gap-4 items-center border border-gray-200 group-hover:bg-[#292a5e] duration-300"
                  @click="()=>showCreateTransporterForm=true"
                >
                    <IconsAddIcon class="h-5 w-5 cursor-pointer"  />
                    <span class="text-sm text-[#292a5e] group-hover:text-white duration-700">
                    Add Shipper
                    </span>
                </button>
              </div>

                <div class="perms flex flex-col items-start">
                    <table class="w-full divide-y divide-gray-200">
                        <thead class="bg-gray-100">
                        <tr class="">
                            <th class="px-4 py-2 text-left">Name</th>
                            <th class="px-4 py-2 text-left">Email</th>
                            <th class="px-4 py-2 text-left">Phone</th>
                            <th class="px-4 py-2 text-left">Actions</th>
                        </tr>
                        </thead>
                        <tbody v-if="true">
                        <tr v-for="item in customer.Transporters" :key="item.ID" class="">
                            <td class="px-4 py-2">{{ item.name }}</td>
                            <td class="px-4 py-2">{{ item.email }}</td>
                            <td class="px-4 py-2">{{ item.phone }}</td>
                            <td class="flex items-center gap-6 px-4 py-2">

                            <span class="text-[#d4af37] text-sm font-medium hover:text-black duration-300 cursor-pointer"
                                @click="()=>loadEditTransorterForm(item)">
                                Edit
                            </span>

                            <span class="text-red-600 text-sm font-medium hover:text-black duration-300 cursor-pointer" 
                                @click="()=>loadDeleteTransporterDialog(item)"
                                >Delete</span>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>

            </div>

          </div>
        </div>
      </div>
      
      <FormsCreateTransporterForm v-if="showCreateTransporterForm" :customerID="customer.ID"   @close="handleCreateTransporterformClosed"/>
      <FormsEditTransporterForm v-if="showEditTransporterForm" :data="transporterToEdit"   @close="handleEditTransporterformClosed"/>
      <FormsCreateConsigneeForm v-if="showCreateConsigneeForm" :customerID="customer.ID" @close="handleCreateConsigneeformClosed"/>
      <FormsEditConsigneeForm v-if="showEditConsigneeForm" :data="consigneeToEdit" @close="handleEditConsigneeFormClosed"/>
      <DeleteDialog v-if="showDeleteconsigneeDialog" entity="consignee" :loading="deleteInProgress" @proceed="deleteConsignee" @close="showDeleteconsigneeDialog=false"/>
      <DeleteDialog v-if="showDeleteTransporterDialog" entity="transporter" :loading="deleteInProgress" @proceed="deleteTransporter" @close="showDeleteTransporterDialog=false"/>
    </div>
  </template>
  h
  
  <script setup>
import {ref, onMounted} from "vue";
const { $axios } = useNuxtApp()

const route = useRoute()

const customer =ref({
    ID:0,
    fullName:"",
    consignments:0,
    email:"",
})

const showCreateTransporterForm = ref(false)
const showCreateConsigneeForm = ref(false)
const showDeleteconsigneeDialog = ref(false)
const showEditTransporterForm = ref(false)
const showEditConsigneeForm = ref(false)
const deleteInProgress = ref(false)
const consigneeToDelete = ref({})
const consigneeToEdit = ref({})
const showDeleteTransporterDialog = ref(false)
const transporterToDelete = ref({})
const transporterToEdit = ref({})

const consignees = ref([])

const consignments = ref([])

const emit = defineEmits(["close"])

// function close(){
//     emit("close")
// }

async function getConsignments(){
  try {
    const response = await $axios.get(`/api/consignments/customer/${route.params.ID}`);
    if(response.status === 200|201){
      consignments.value = response.data;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

async function getCustomer(){
  try {
    const response = await $axios.get(`/api/customers/${route.params.ID}`);
    if(response.status === 200|201){
      customer.value = response.data;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

async function getCustomerConsignees(){
  try {
    const response = await $axios.get(`/api/customer-consignees`, {params:{customerId:route.params.ID}});
    if(response.status === 200|201){
      consignees.value = response.data;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

function openConsignment(id){
    navigateTo(`/admin/consignments/${id}`)
}

async function addTransporterToCustomer(payload){
  try {
    const response = await $axios.post(`/api/transporters/assign`, payload);
    if(response.status === 200|201){
      consignees.value = response.data;
    }
  } catch (error) {
    console.error('Error adding transporter:', error);
  }
}

function loadDeleteconsigneeDialog(consignee){
    consigneeToDelete.value = consignee;
    showDeleteconsigneeDialog.value = true
}

async function deleteConsignee(){
  deleteInProgress.value = true
  try {
    const response = await $axios.delete(`/api/customers/consignee/delete/${consigneeToDelete.value.ID}`,);
    if(response.status === 200|201){
      await getCustomerConsignees()
      deleteInProgress.value = false
      showDeleteconsigneeDialog.value =false
    }
  } catch (error) {
    console.error('Error deleting consignee:', error);
  }
}

function loadEditTransorterForm(transporter){
  transporterToEdit.value = transporter;
  showEditTransporterForm.value = true
}

async function handleEditTransporterformClosed(payload){
  if(payload!=undefined){
    await getCustomer()
  showEditTransporterForm.value = false
  }else{
  showEditTransporterForm.value = false
  }
}

function loadEditConsigneeForm(consignee){
  consigneeToEdit.value = consignee;
  showEditConsigneeForm.value = true
}

async function handleEditConsigneeFormClosed(payload){
  if(payload!=undefined){
    await getCustomerConsignees()
    showEditConsigneeForm.value = false
  }else{
  showEditConsigneeForm.value = false
  }
}

function loadDeleteTransporterDialog(transporter){
    transporterToDelete.value = transporter;
    showDeleteTransporterDialog.value = true
}


async function deleteTransporter(){
  deleteInProgress.value = true
  try {
    const response = await $axios.delete(`/api/transporters/delete/${transporterToDelete.value.ID}`,);
    if(response.status === 200|201){
      await getCustomer()
      deleteInProgress.value = false
      showDeleteTransporterDialog.value =false
      
    }
  } catch (error) {
    console.error('Error deleting transporter:', error);
  }
}


async function handleCreateTransporterformClosed(transporter){
    showCreateTransporterForm.value = false;
    if(transporter!= undefined){
      await addTransporterToCustomer({customerId:customer.value.ID,transporterId:transporter.ID})
    }
    await getCustomerConsignees()
    await getCustomer()

  }

  async function handleCreateConsigneeformClosed(payload){
    showCreateConsigneeForm.value = false
    if(payload){
      await getCustomerConsignees()
    }
  }

onMounted(async ()=>{
    await getCustomer()
    await getCustomerConsignees()
    await getConsignments()
})

</script>