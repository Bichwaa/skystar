<template>
    <div class="flex flex-wrap sm:flex-row gap-8">
      <div class="w-full">
        <div class="mb-4">
          <div class="w-full rounded-2xl bg-white p-4 shadow-lg">
            <div class="mb-6 flex items-center justify-between group">
              <div class="flex items-center justify-between w-full">
                <div class="flex flex-col">
                  <span class="ml-2 font-bold text-black">Consignment List</span>
                  <span class="ml-2 text-xs text-gray-500">
                    as of
                  </span>
                </div>
  
                <button class="p-2 rounded-lg flex gap-4 items-center border border-gray-200 group-hover:bg-[#292a5e] duration-300" @click="showCreateconsignmentForm=true">
                  <IconsAddIcon class="h-7 w-7 cursor-pointer" />
                  <span class="text-sm text-[#292a5e] group-hover:text-white duration-700">
                  New Consignment
                </span>
                </button>
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
                    <th class="px-4 py-2 text-left">Consignee</th>
                    <th class="px-4 py-2 text-left">No. Containers</th>
                    <th class="px-4 py-2 text-left">Loose Cargo (Ton)</th>
                    <th class="px-4 py-2 text-left">Cargo Description</th>
                    <th class="px-4 py-2 text-left">Shipper</th>
                    <th class="px-4 py-2 text-left">Mode of transport</th>
                    <th class="px-4 py-2 text-left">Port of Loading</th>
                    <th class="px-4 py-2 text-left">Port of Discharge</th>
                    <th class="px-4 py-2 text-left">Overseer</th>
                    <th class="px-4 py-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in consignments" :key="item.id">
                    <td class="px-4 py-2">{{ item.customer.fullName }}</td>
                    <td class="px-4 py-2">{{ item.cont20 + item.cont40 }}</td>
                    <td class="px-4 py-2">{{ item.looseCargo }}</td>
                    <td class="px-4 py-2">{{ item.luggage }}</td>
                    <td class="px-4 py-2">{{ item.transporter.name}}</td>
                    <td class="px-4 py-2">{{ item.modeOfTransport }}</td>
                    <td class="px-4 py-2">{{ item.portOfLoading }}</td>
                    <td class="px-4 py-2">{{ item.destination }}</td>
                    <td class="px-4 py-2">
                      <span v-if="item.Overseer">{{ item.Overseer.firstName + " " + item.Overseer.lastName }}</span>
                    </td>
                    <td class="flex items-center gap-6 px-4 py-2">
                      <span 
                        class="text-[#292a5e] text-sm font-medium hover:text-black duration-300 cursor-pointer"
                        @click="viewconsignmentClicked(item.ID)"
                        >View</span>
  
                      <span class="text-[#d4af37] text-sm font-medium hover:text-black duration-300 cursor-pointer"
                        @click="loadEditconsignmentForm(item)">
                        Edit
                      </span>
  
                      <span class="text-red-600 text-sm font-medium hover:text-black duration-300 cursor-pointer" 
                        @click="loadDeleteconsignmentDialog(item)"
                        >Delete</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <ConsignmentDetailsModal v-if="showconsignmentDetails" :consignment="currentconsignment" @close="showconsignmentDetails=false"/>
      <FormsCreateConsignmentForm v-if="showCreateconsignmentForm"  @close="handleCreateconsignmentformClosed"/>
      <FormsEditConsignmentForm v-if="showEditconsignmentForm" :consignmentdata="consignmentToEdit" @close="handleEditconsignmentformClosed"/>
      <DeleteDialog v-if="showDeleteconsignmentDialog" entity="consignment" :loading="deleteInProgress" @proceed="deleteconsignment" @close="showDeleteconsignmentDialog=false"/>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  
  const { $axios } = useNuxtApp()
  
  const items = [
          {
            id: 1,
            consignee: 'John Doe',
            containers:7,
            containerSize: 'Farm implements',
            destination: 'Dar-es-salaam',
            transport: "Maersk",
            overseer: 'Chambi Chachambe',
          },
          {
            id: 2,
            consignee: 'Jane Deer',
            containers:3,
            containerSize: 'Electronics',
            destination: 'Dar-es-salaam',
            transport: "Maersk",
            overseer: 'John Kisomo',
          },
        ]
  
  
  defineProps({
    title: {
      type: String,
      default: "",
    },
  });
  const consignments = ref([]);
  
  const currentDate = new Date();
  const OPTIONS = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = currentDate.toLocaleDateString('en-US',OPTIONS);
  
  //CRUD SHIT
  const showconsignmentDetails = ref(false)
  const showCreateconsignmentForm = ref(false)
  const showEditconsignmentForm = ref(false)
  const showDeleteconsignmentDialog = ref(false)
  const currentconsignment = ref({});
  const consignmentToEdit = ref({});
  const consignmentToDelete = ref({});
  const deleteInProgress = ref(false)
  
  function viewconsignmentClicked(consignmentId){
    navigateTo(`/admin/consignments/${consignmentId}`)
  }
  
  function loadEditconsignmentForm(consignment){
    consignmentToEdit.value = consignment;
    showEditconsignmentForm.value = true
  }
  
  async function handleCreateconsignmentformClosed(payload){
    showCreateconsignmentForm.value=false;
    if(payload!=undefined){
    console.log("the payload",payload)
    await getConsignments()
    }
  }
  
  async function handleEditconsignmentformClosed(payload){
    showEditconsignmentForm.value=false;
    if(payload!=undefined){
    console.log("the payload",payload)
    await getConsignments()
    }
  }
  
  function loadDeleteconsignmentDialog(consignment){
    consignmentToDelete.value = consignment;
    showDeleteconsignmentDialog.value = true
  }


  async function getConsignments(){
    try {
      const response = await $axios.get('/api/consignments');
      if(response.status==200 || 201){
      consignments.value = response.data;
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      consignments.value = null; // Set items to an empty array or handle error as needed
    }
  }
  

  async function deleteconsignment(){
    deleteInProgress.value = true
    const res = await $axios.delete(`/api/consignments/delete/${consignmentToDelete.value.ID}`);
    console.log(res)
    if(res.status==200 || 201){
        deleteInProgress.value = false
        //remove employee from client state
        await getConsignments()
        showDeleteconsignmentDialog.value = false;
    }else{
        console.log(res.statusText)
    }
  }
  
  
  onMounted(async () => {
    await getConsignments()
  });
  
  </script>