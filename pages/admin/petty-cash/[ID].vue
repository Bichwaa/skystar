<template>
  <div class="flex flex-wrap sm:flex-row gap-8">
    <div class="w-full">
      <div class="mb-4">
        <div class="w-full rounded-2xl bg-white p-4 shadow-lg">
          <div class="mb-6 flex items-center justify-between">
            <div class="flex items-center justify-between w-full group">
              <div class="flex flex-col">
                <span class="ml-2 font-bold text-black">Petty Cashbook</span>
                <span class="ml-2 text-xs text-gray-500">
                  Starting the month of
                </span>
              </div>

              <button class="p-2 rounded-lg flex gap-4 items-center border border-gray-200 group-hover:bg-[#292a5e] duration-300" @click="showCreateExpenseForm=true">
                <IconsAddIcon class="h-7 w-7 cursor-pointer"  />
                <span class="text-sm text-[#292a5e] group-hover:text-white duration-700">
                  Add New Expense
                </span>
              </button>
            </div>
            
          </div>
         
          <div class="mb-4 flex flex-col items-start justify-start gap-3">
            <span
              class="flex items-center rounded-md bg-green-50 px-2 py-1 text-xl font-semibold text-green-600 capitalize"
            >
              {{ cashbook.period }}
            </span>
            <span
              class="flex items-center rounded-md bg-green-50 px-2 py-1 text-sm font-semibold text-green-700 capitalize"
            >
              Consignment: {{ cashbook.consignment.bookingNumber }}
            </span>
          </div>

          <div class="summary flex flex-col gap-3 my-4">
            <div class="flex items-center justify-start gap-5">
              <span class="font-medium text-sm">Spent:</span>
              <span class="font-semibold text-sm">Tsh {{ spent }}</span>
            </div>
            <!-- <div class="flex items-center justify-start gap-5">
              <span class="font-medium text-sm">limit:</span>
              <span class="font-semibold text-sm">Tsh {{ cashbook.limit}}</span>
            </div>
            <div class="flex items-center justify-start gap-5">
              <span class="font-medium text-sm">Overspent:</span>
              <span class="font-semibold text-sm">Tsh {{ overspent }}</span>
            </div> -->
          </div>

          <div class="m-auto block">
            <table class="w-full divide-y divide-gray-200">
              <thead class="bg-gray-100">
                <tr class="">
                  <th class="px-4 py-2 text-left">Requested By</th>
                  <th class="px-4 py-2 text-left">Amount</th>
                  <th class="px-4 py-2 text-left">Purpose</th>
                  <th class="px-4 py-2 text-left">Approved By</th>
                  <th class="px-4 py-2 text-left">Date requested</th>
                  <th class="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in cashbook.consignment.revenues" :key="item.id">
                  <td class="px-4 py-2"> <span v-if="item.Requested">{{ item.Requested.firstName + " " + item.Requested.lastName }}</span> </td>
                  <td class="px-4 py-2">{{ item.amount}}</td>
                  <td class="px-4 py-2">{{ item.purpose }}</td>
                  <th class="px-4 py-2 text-left">{{ item.Approved.firstName + " " + item.Approved.lastName }}</th>
                  <td class="px-4 py-2">{{ convertDateFormat(item.CreatedAt)}}</td>
                  <td class="flex items-center gap-6 px-4 py-2">
                    <!-- <span 
                      class="text-[#292a5e] text-sm font-medium hover:text-black duration-300 cursor-pointer"
                      @click="viewExpenseClicked(item)"
                      >View</span> -->

                    <span class="text-[#d4af37] text-sm font-medium hover:text-black duration-300 cursor-pointer"
                      @click="loadEditExpenseForm(item)">
                      Edit
                    </span>

                    <span class="text-red-600 text-sm font-medium hover:text-black duration-300 cursor-pointer" 
                      @click="loadDeleteExpenseDialog(item)"
                      >Delete</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <!-- <ExpenseDetailsModal v-if="showExpenseDetails" :expense="currentExpense" @close="showExpenseDetails=false"/> -->
    <FormsCreateExpenseForm v-if="showCreateExpenseForm" :consignmentId="cashbook.consignment.ID" :cashbook-id="route.params.ID"  @close="handleCreateExpenseformClosed"/>
    <FormsEditExpenseForm v-if="showEditExpenseForm" :expensedata="expenseToEdit" @close="handleEditExpenseformClosed"/>
    <DeleteDialog v-if="showDeleteExpenseDialog" entity="expense" :loading="deleteInProgress" @proceed="deleteExpense" @close="showDeleteExpenseDialog=false"/>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';

const { $axios } = useNuxtApp()

const route = useRoute()

const cashbook = ref({consignment:{bookingNumber:0}});


const currentDate = new Date();
const OPTIONS = {month: 'long'};
const formattedDate = currentDate.toLocaleDateString('en-US',OPTIONS);

//CRUD SHIT
const showExpenseDetails = ref(false)
const showCreateExpenseForm = ref(false)
const showEditExpenseForm = ref(false)
const showDeleteExpenseDialog = ref(false)
const currentExpense = ref({});
const expenseToEdit = ref({});
const expenseToDelete = ref({});
const deleteInProgress = ref(false)


const spent = computed(function(){
  if(cashbook.value.expenses && cashbook.value.expenses.length>0){
    console.log(cashbook.value.expenses)
    let amount = cashbook.value.expenses.reduce((a,b)=>{
      return a+b.amount
    },0)
    return amount
  }else{
    return 0
  }
})

const overspent = computed(function(){
  if( spent.value > cashbook.value.limit && cashbook.value.limit ){
    return spent.value - cashbook.value.limit
  }else{
    return 0
  }
})

function convertDateFormat(dateString) {
  // Create a new Date object from the input string
  const inputDate = new Date(dateString);

  // Format the date as "DDD/MM/YY"
  const year = inputDate.getFullYear();
  const month = String(inputDate.getMonth() + 1).padStart(2, '0');
  const day = String(inputDate.getDate()).padStart(2, '0');
  const formattedDate = `${day}/${month}/${year}`;

  return formattedDate;
}

async function getCashbook(){
  try {
    const response = await $axios.get(`/api/petty-cashbooks/${route.params.ID}`);
    if(response.status === 200|201){
      cashbook.value = response.data;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    cashbook.value.expenses = null; // Set items to an empty array or handle error as needed
  }
}

function viewExpenseClicked(expense){
  currentExpense.value = expense;
  showExpenseDetails.value = true;
}

function loadEditExpenseForm(expense){
  expenseToEdit.value = expense;
  showEditExpenseForm.value = true
}

async function handleCreateExpenseformClosed(payload){
  showCreateExpenseForm.value=false;
  if(payload!=undefined){
    await getCashbook()
  }
}

async function handleEditExpenseformClosed(payload){
  showEditExpenseForm.value=false;
  if(payload!=undefined){
    await getCashbook()
  }
}

function loadDeleteExpenseDialog(expense){
  expenseToDelete.value = expense;
  showDeleteExpenseDialog.value = true
}

async function deleteExpense(){
  deleteInProgress.value = true
  const res = await $axios.delete(`/api/expenses/delete/${expenseToDelete.value.ID}`);
  console.log(res)
  if(res.status==200 || 201){
      deleteInProgress.value = false
      //remove employee from client state
      await getCashbook()
      showDeleteExpenseDialog.value = false;
  }else{
      console.log(res.statusText)
  }
}


onMounted(async () => {
  await getCashbook()
});

</script>