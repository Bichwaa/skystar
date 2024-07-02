<template>
    <div class="flex flex-wrap sm:flex-row gap-8">
      <div class="w-full">
        <div class="mb-4">
          <div class="w-full rounded-2xl bg-white p-4 shadow-lg">
            <div class="mb-6 flex items-center justify-between">
              <div class="flex items-center justify-between w-full group">
                <div class="flex flex-col">
                  <span class="ml-2 font-bold text-black">Petty Cashbook List</span>
                </div>
  
                <button class="p-2 rounded-lg flex gap-4 items-center border border-gray-200 group-hover:bg-[#292a5e] duration-300" @click="showCreateCashbookForm=true">
                  <IconsAddIcon class="h-7 w-7 cursor-pointer"/>
                  <span class="text-sm text-[#292a5e] group-hover:text-white duration-700">
                  New Petty Cashbook
                </span>
                </button>
              </div>
              
            </div>
  
            <div class="m-auto block">
              <table class="w-full divide-y divide-gray-200 overflow-x-scroll">
                <thead class="bg-gray-100">
                  <tr class="">
                    <th class="px-4 py-2 text-left">Id</th>
                    <th class="px-4 py-2 text-left">Consignment</th>
                    <th class="px-4 py-2 text-left">Month</th>
                    <!-- <th class="px-4 py-2 text-left">Limit</th> -->
                    <th class="px-4 py-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in pettyCashbooks" :key="item.ID">
                    <td class="px-4 py-2">{{ item.ID }}</td>
                    <td class="px-4 py-2">{{ item.consignment.bookingNumber}}</td>
                    <td class="px-4 py-2">{{ item.period}}</td>
                    <!-- <td class="px-4 py-2">{{ item.limit }}</td> -->
                    <td class="flex items-center gap-6 px-4 py-2">
                      <span 
                        class="text-[#292a5e] text-sm font-medium hover:text-black duration-300 cursor-pointer"
                        @click="viewCashbookClicked(item.ID)"
                        >View</span>
  
                      <span class="text-[#d4af37] text-sm font-medium hover:text-black duration-300 cursor-pointer"
                        @click="loadEditCashbookForm(item)">
                        Edit
                      </span>
  
                      <span class="text-red-600 text-sm font-medium hover:text-black duration-300 cursor-pointer" 
                        @click="loadDeleteCashbookDialog(item)"
                        >Delete</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <FormsCreateCashbookForm v-if="showCreateCashbookForm"  @close="handleCreateCashbookformClosed"/>
      <FormsEditCashbookForm v-if="showEditCashbookForm" :cashbookdata="cashbookToEdit" @close="handleEditCashbookformClosed"/>
      <DeleteDialog v-if="showDeleteCashbookDialog" entity="cashbookcustomer" :loading="deleteInProgress" @proceed="deleteCashbook" @close="showDeleteCashbookDialog=false"/>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';

  definePageMeta({
    middleware: 'permissions',
    permissions: ['can-read-pettycashbooks']
  });

  const { $axios } = useNuxtApp()
  
  const pettyCashbooks = ref([]);
  
  const currentDate = new Date();
  // const OPTIONS = {month: 'long'};
  // const formattedDate = currentDate.toLocaleDateString('en-US',OPTIONS);
  
  //CRUD SHIT
  const showCreateCashbookForm = ref(false)
  const showEditCashbookForm = ref(false)
  const showDeleteCashbookDialog = ref(false)
  const cashbookToEdit = ref({});
  const cashbookToDelete = ref({});
  const deleteInProgress = ref(false)
  

  async function getCashbooks(){
    try {
      const response = await $axios.get('/api/petty-cashbooks');
      pettyCashbooks.value = response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      pettyCashbooks.value = null; // Set items to an empty array or handle error as needed
    }
  }

  function viewCashbookClicked(cashbookId){
    navigateTo(`/admin/petty-cash/${cashbookId}`)
  }
  
  function loadEditCashbookForm(cashbookcustomer){
    cashbookToEdit.value = cashbookcustomer;
    showEditCashbookForm.value = true
  }
  
  async function handleCreateCashbookformClosed(payload){
    showCreateCashbookForm.value=false;
    if(payload!=undefined){
      await getCashbooks()
    }
  }
  
  async function handleEditCashbookformClosed(payload){
    showEditCashbookForm.value=false;
    if(payload!=undefined){
      await getCashbooks()
    }
  }
  
  function loadDeleteCashbookDialog(cashbook){
    cashbookToDelete.value = cashbook;
    showDeleteCashbookDialog.value = true
  }
  
  async function deleteCashbook(){
    deleteInProgress.value = true
    const res = await $axios.delete(`/api/petty-cashbooks/delete/${cashbookToDelete.value.ID}`);
    console.log(res)
    if(res.status==200 || 201){
        await getCashbooks()
        showDeleteCashbookDialog.value = false;
    }else{
        console.log(res.statusText)
    }
  }
  
  
  onMounted(async () => {
    await getCashbooks()
  });
  
  </script>