<template>
    <div class="grid grid-cols-12 gap-2 rounded-2xl bg-white p-4 shadow-lg overflow-y-scroll">
            <div class="col-span-1 h-[88vh]">
                <div class="w-full flex flex-col overflow-y-scroll" @click="()=>activeSub='details'">
                    <p 
                    class="px-6 text-sm py-1 my-1 cursor-pointer"
                    :class="activeSub=='details'?'bg-gradient-to-r border-r-4 border-blue-500 from-white to-blue-100 text-blue-500':''"
                    >DETAILS</p>
                </div>
                <div class="w-full flex flex-col overflow-y-scroll" @click="()=>activeSub='cost'">
                    <p 
                    class="px-6 text-sm py-1 my-1 cursor-pointer"
                    :class="activeSub=='cost'?'bg-gradient-to-r border-r-4 border-blue-500 from-white to-blue-100 text-blue-500':''"
                    > COST</p>
                </div>
                <div class="w-full flex flex-col overflow-y-scroll" @click="()=>activeSub='revenue'">
                    <p 
                    class="px-6 text-sm py-1 my-1 cursor-pointer"
                    :class="activeSub=='revenue'?'bg-gradient-to-r border-r-4 border-blue-500 from-white to-blue-100 text-blue-500':''"
                    > REVENUE</p>
                </div>
            </div>
            <div class="col-span-11">
                <div class="flex flex-col gap-2  items-start" v-if="activeSub=='cost'">
                            <span class="text-lg font-semibold text-[#292a5e]">
                                TOTAL REVENUE: {{ revenue}} Tsh
                            </span>

                            <span class="text-lg font-semibold text-[#292a5e]">
                                TOTAL COST: {{ cost }} Tsh
                            </span>

                            <span v-if="revenue-cost>=0" class="text-lg font-semibold text-[#292a5e]">
                                PROFIT: {{ revenue-cost }} Tsh
                            </span>

                            <span v-else class="text-lg font-semibold text-red-400">
                                LOSS: {{ revenue-cost }} Tsh
                            </span>
                        </div>
                <div class="w-full rounded-2xl bg-white p-4 shadow-lg overflow-y-scroll">
                    <div class="flex flex-col" v-if="activeSub=='details'">
                        <!-- <h1 class="font-semibold text-lg Lg:text-xl my-5">Consignment Details</h1> -->

                            <div class="grid grid-cols-4">

                                <div class="col-span-1 flex flex-col items-start mb-4 w-full">
                                    <span class="text-[#292a5e]  mt-3 my-2 uppercase font-semibold"> Customer Details  </span>
                                    
                                    <div class="flex gap-3  w-full items-center my-2">
                                        <div class="flex gap-4 items-center">
                                            <IconsUserIcon class="w-5 h-5"/>
                                            <span class=" font-medium">Name:</span>
                                        </div>
                                        <p>{{ consignment.customer.fullName }}</p>
                                    </div>

                                    <div class="flex gap-3  w-full items-center my-2">
                                        <div class="flex gap-4 items-center">
                                            <IconsEmailIcon  class="w-5 h-5"/>
                                            <span class=" font-medium">Email:</span>
                                        </div>
                                        <p> {{consignment.customer.email}} </p>
                                    </div>

                                    <div class="flex gap-3  w-full items-center my-2">
                                        <div class="flex gap-4 items-center">
                                            <IconsPersonIcon  class="w-5 h-5"/>
                                            <span class=" font-medium">Filed By:</span>
                                        </div>
                                        <p> {{ consignment?.Overseer?.firstName + " " + consignment?.Overseer?.lastName }} </p>
                                    </div>

                                    <span class="text-[#292a5e]  mt-3 my-2 uppercase font-semibold"> Consignment Description  </span>
                                    <div class="flex flex-col gap-3  w-full my-2 justify-start">
                                        <div class="flex gap-2 items-center">
                                            <IconsLuggageIcon class="w-5 h-5" />
                                            <span class=" font-medium">Consignment:</span>
                                        </div>
                                        <p>{{ consignment.luggage }}</p>
                                    </div>

                                    
                                </div>

                                <div class="col-span-3 flex flex-col items-start jus">
                                    <span class="text-[#292a5e]  mt-3 my-2 uppercase font-semibold"> Consignment Details  </span>

                                    <div class="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8 w-full">
                                        <div class="col-span-1 flex flex-col items-start  px-4">

                                            <div class="flex gap-3  w-full items-center my-2">
                                                <div class="flex gap-4 items-center">
                                                    <IconsBookingIcon class="w-5 h-5" />
                                                    <span class=" font-medium">Booking No:</span>
                                                </div>
                                                <p>{{  consignment.bookingNumber }}</p>
                                            </div>

                                            <div class="flex gap-3  w-full items-center my-2">
                                                <div class="flex gap-4 items-center">
                                                    <IconsBookingIcon class="w-5 h-5" />
                                                    <span class=" font-medium">BL No:</span>
                                                </div>
                                                <p>{{  consignment.blNumber }}</p>
                                            </div>


                                            <div class="flex gap-3  w-full items-center my-2">
                                                <div class="flex gap-4 items-center">
                                                    <IconsShipIcon class="w-5 h-5" />
                                                    <span class=" font-medium">Type:</span>
                                                </div>
                                                <p>{{ consignment.looseCargo == 0 ? "Containers" : "Loose Cargo" }}</p>
                                            </div>

                                            <div class="flex gap-3  w-full items-center my-2" v-if="consignment.looseCargo==0">
                                                <div class="flex gap-4 items-center">
                                                    <IconsContainerIcon class="w-5 h-5" />
                                                    <span class=" font-medium">Containers:</span>
                                                </div>
                                                <p>{{  consignment.cont20 + consignment.cont40 }}</p>
                                            </div>

                                            <!-- <div class="flex gap-3  w-full items-center my-2" v-else>
                                                <div class="flex gap-4 items-center">
                                                    <IconsContainerIcon class="w-5 h-5" />
                                                    <span class=" font-medium">No. Packages:</span>
                                                </div>
                                                <p>{{  consignment.looseCargo }}</p>
                                            </div> -->

                                            <div class="flex gap-3  w-full items-center my-2">
                                                <div class="flex gap-4 items-center">
                                                    <IconsDestinationIcon class="w-5 h-5" />
                                                    <span class=" font-medium">Loading Port:</span>
                                                </div>
                                                <p>{{ consignment.portOfLoading }}</p>
                                            </div>

                                            <div class="flex gap-3  w-full items-center my-2">
                                                <div class="flex gap-4 items-center">
                                                    <IconsDestinationIcon class="w-5 h-5" />
                                                    <span class=" font-medium">Discharge Port:</span>
                                                </div>
                                                <p>{{ consignment.destination }}</p>
                                            </div>

                                        </div>

                                        <div class="col-span-1 flex flex-col items-start  px-4">
                                            
                                            <!-- <div class="flex gap-3  w-full items-center my-2">
                                                <div class="flex gap-4 items-center">
                                                    <IconsBookingIcon class="w-5 h-5" />
                                                    <span class=" font-medium">BL No:</span>
                                                </div>
                                                <p>{{  consignment.blNumber }}</p>
                                            </div> -->
                                            
                                            <div class="flex gap-3  w-full items-center my-2">
                                                <div class="flex gap-4 items-center">
                                                    <IconsLuggageIcon class="w-5 h-5" />
                                                    <span class=" font-medium">Total Weight:</span>
                                                </div>
                                                <p>{{ consignment.totalWeight }} T</p>
                                            </div>

                                            <div class="flex gap-3  w-full items-center my-2">
                                                <div class="flex gap-4 items-center">
                                                    <IconsLuggageIcon class="w-5 h-5" />
                                                    <span class=" font-medium">Mode of Transport:</span>
                                                </div>
                                                <p>By {{ consignment.modeOfTransport }}</p>
                                            </div>
                                        <!-- sea -->
                                            <div class="sea" v-if="consignment.modeOfTransport=='Sea'">


                                                <div class="flex gap-3  w-full items-center my-2" >
                                                    <div class="flex gap-4 items-center">
                                                        <IconsContainerIcon class="w-5 h-5" />
                                                        <span class=" font-medium">Vessel Numner:</span>
                                                    </div>
                                                    <p>{{  consignment.vesselNumber }}</p>
                                                </div>

                                                <div class="flex gap-3  w-full items-center my-2" >
                                                    <div class="flex gap-4 items-center">
                                                        <IconsContainerIcon class="w-5 h-5" />
                                                        <span class=" font-medium">Voyage Number:</span>
                                                    </div>
                                                    <p>{{  consignment.voyageNumber }}</p>
                                                </div>

                                            </div>

                                            <div class="flex gap-3  w-full items-center my-2">
                                                <div class="flex gap-4 items-center">
                                                    <IconsShipIcon class="w-5 h-5" />
                                                    <span class=" font-medium">Shipper:</span>
                                                </div>
                                                <div class="flex flex-col">
                                                    <p>{{ consignment.transporter != null ? consignment.transporter.name: "" }}</p>
                                                    <!-- <p class=" pl-6">{{ consignment.transporter != null ? consignment.transporter.phone: "" }}</p> -->
                                                </div>
                                            </div>

                                            <div class="flex gap-3  w-full items-center my-2">
                                                <div class="flex gap-4 items-center">
                                                    <IconsShipIcon class="w-5 h-5" />
                                                    <span class=" font-medium">Consignee:</span>
                                                </div>
                                                <p>{{ consignment.consignee != null ? consignment.consignee.fullName.split(" ")[0]: "" }}</p>
                                            </div>

                                        </div>

                                        <div class="col-span-1 flex flex-col items-start  px-4">

                                            <div class="flex gap-3  w-full items-center my-2">
                                                <div class="flex gap-4 items-center">
                                                    <IconsContainerIcon class="w-5 h-5" />
                                                    <span class=" font-medium">Revenue:</span>
                                                </div>
                                                <p>{{  consignment.revenue }}</p>
                                            </div>

                                            </div>
                                    </div>

                                </div>
                        </div>
                    </div>
                    <div class="flex items-center justify-between pr-12 my-5" v-if="activeSub=='cost'">
                        <h3 class="text-[#292a5e]  mt-3 my-6 uppercase text-xl font-semibold">Cost</h3>
                        <button class="p-2 rounded-lg flex gap-4 items-center border border-gray-200 group-hover:bg-[#292a5e] duration-300" @click="showExpenseForm=true">
                            <IconsAddIcon class="h-7 w-7 cursor-pointer" />
                            <span class="text-sm text-[#292a5e] group-hover:text-white duration-700">
                            Add Cost
                        </span>
                        </button>
                    </div>

                    <div class="m-auto block" v-if="activeSub=='cost'">
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
                            <tr v-for="item in expenses" :key="item.ID">
                                <td class="px-4 py-2"> <span v-if="item.Requested">{{ item?.Requested.firstName + " " + item?.Requested.lastName }}</span> </td>
                                <td class="px-4 py-2">{{ item.amount}}</td>
                                <td class="px-4 py-2">{{ item.purpose }}</td>
                                <th class="px-4 py-2 text-left">{{ item?.Approved?.firstName + " " + item?.Approved?.lastName }}</th>
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

                    <div v-if="activeSub=='revenue'">
                        <div class="flex flex-col gap-2  items-start">
                            <span class="text-lg font-semibold text-[#292a5e]">
                                TOTAL REVENUE: {{ revenue}} Tsh
                            </span>

                            <span class="text-lg font-semibold text-[#292a5e]">
                                TOTAL COST: {{ cost }} Tsh
                            </span>

                            <span v-if="revenue-cost>=0" class="text-lg font-semibold text-[#292a5e]">
                                PROFIT: {{ revenue-cost }} Tsh
                            </span>

                            <span v-else class="text-lg font-semibold text-red-400">
                                LOSS: {{ revenue-cost }} Tsh
                            </span>
                        </div>

                        <div class="flex items-center justify-between pr-12 my-5" >
                        <h3 class="text-[#292a5e]  mt-3 my-6 uppercase text-xl font-semibold">Revenue</h3>
                        <DropDowner>
                            <button class="p-2 rounded-lg flex gap-4 items-center border border-gray-200 group-hover:bg-[#292a5e] duration-300" @click="showRevenueForm=true">
                                <IconsAddIcon class="h-7 w-7 cursor-pointer" />
                                <span class="text-sm text-[#292a5e] group-hover:text-white duration-700">
                                Add Item
                            </span>
                            </button>

                            <button class="p-2 my-3 rounded-lg flex gap-4 items-center border border-gray-200 group-hover:bg-[#292a5e] duration-300" @click="()=>true">
                                <!-- <IconsAddIcon class="h-7 w-7 cursor-pointer" /> -->
                                <span class="text-sm text-[#292a5e] group-hover:text-white duration-700">
                                Generate Invoive
                            </span>
                            </button>
                        </DropDowner>
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
                            <tr v-for="item in revenues" :key="item.ID">
                                <td class="px-4 py-2"> <span v-if="item.Requested">{{ item?.Requested?.firstName + " " + item?.Requested?.lastName }}</span> </td>
                                <td class="px-4 py-2">{{ item.amount}}</td>
                                <td class="px-4 py-2">{{ item.purpose }}</td>
                                <th class="px-4 py-2 text-left">{{ item?.Approved?.firstName + " " + item?.Approved?.lastName }}</th>
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
                                @click="loadDeleteRevenueDialog(item)"
                                >Delete</span>
                            </td>
                            </tr>
                        </tbody>
                        </table>
                    </div>
                    </div>

                    <FormsCreateConsignmentCostForm v-if="showExpenseForm" :consignmentId="consignment.ID" @close="handleExpenseClosed"/>
                    <FormsCreateConsignmentRevenueItemForm v-if="showRevenueForm" :consignmentId="consignment.ID" @close="handleRevenueClosed"/>
                    <FormsEditConsignmentCostForm v-if="showEditExpenseForm" :expensedata="expenseToEdit" @close="handleEditExpenseClosed"/>
                    <DeleteDialog 
                        v-if="showDeleteExpenseDialog" 
                        entity="Consignment expense" 
                        :loading="deleteInProgress" 
                        @proceed="deleteExpense" 
                        @close="showDeleteExpenseDialog=false"/>
                    <DeleteDialog 
                    v-if="showDeleteRevenueDialog" 
                    entity="Consignment revenue" 
                    :loading="deleteInProgress" 
                    @proceed="deleteRevenue" 
                    @close="showDeleteRevenueDialog=false"/>

                </div>
            </div>
        </div>
    
</template>

<script setup>
import {ref, onMounted, computed} from 'vue';

const { $axios } = useNuxtApp()

const route = useRoute()

const expenses = ref([])
const revenues = ref([])
const expenseToEdit = ref({})
const expenseToDelete = ref({})
const revenueToDelete = ref({})

const showExpenseForm = ref(false)
const showRevenueForm = ref(false)
const showEditExpenseForm = ref(false)
const showDeleteExpenseDialog = ref(false)
const showDeleteRevenueDialog = ref(false)
const deleteInProgress = ref(false)

const activeSub = ref("details")

const consignment = ref({
    ID:0,
    luggage: "",
    customer: {},
    transporter: "",
    destination: "",
    cont10: 0,
    cont20: 0,
    cont40: 0,
    Overseer: {}
  })

const revenue = computed(()=>{
    if (revenues.value.length > 0){
        return revenues.value.reduce((a,x)=>a+x.amount, 0)
    }else{
        return 0
    }
} )  

const cost = computed(()=>{
    if(expenses.value.length > 0){
        return expenses.value.reduce((a,x)=>a+x.amount, 0) 
    }else{
        return 0
    }
}) 


const emit = defineEmits(["close"])

function close(){
    emit("close")
}

async function handleExpenseClosed(payload){
    showExpenseForm.value=false;
    if(payload!=undefined){
      await getconsignmentExpenses()
    }
}

async function handleRevenueClosed(payload){
    showRevenueForm.value=false;
    if(payload!=undefined){
      await getconsignmentRevenues()
    }
}

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

function loadEditExpenseForm(expense){
  expenseToEdit.value = expense;
  showEditExpenseForm.value = true
}

async function handleEditExpenseClosed(payload){
    showEditExpenseForm.value=false;
  if(payload!=undefined){
    await getconsignmentExpenses()
  }
}


function loadDeleteExpenseDialog(expense){
  expenseToDelete.value = expense;
  showDeleteExpenseDialog.value = true
}

function loadDeleteRevenueDialog(revenue){
    revenueToDelete.value = revenue;
    showDeleteRevenueDialog.value = true
}

async function getConsignment(){
  try {
    const response = await $axios.get(`/api/consignments/${route.params.ID}`);
    if(response.status === 200|201){
      consignment.value = response.data;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

async function getconsignmentExpenses(){
    try {
    const response = await $axios.get(`/api/filter-expenses?consignment=${route.params.ID}`);
    if(response.status === 200|201){
      expenses.value = response.data;
    }
  } catch (error) {
    console.error('Error fetching cost data:', error);
  }
}

async function getconsignmentRevenues(){
    try {
    const response = await $axios.get(`/api/filter-revenue?consignment=${route.params.ID}`);
    if(response.status === 200|201){
      revenues.value = response.data;
    }
  } catch (error) {
    console.error('Error fetching cost data:', error);
  }
}

async function deleteExpense(){
  deleteInProgress.value = true
  const res = await $axios.delete(`/api/expenses/delete/${expenseToDelete.value.ID}`);
  console.log(res)
  if(res.status==200 || 201){
      deleteInProgress.value = false
      //remove employee from client state
      await getconsignmentExpenses()
      showDeleteExpenseDialog.value = false;
  }else{
      console.log(res.statusText)
  }
}

async function deleteRevenue(){
  deleteInProgress.value = true
  const res = await $axios.delete(`/api/revenue/delete/${revenueToDelete.value.ID}`);
  console.log(res)
  if(res.status==200 || 201){
      deleteInProgress.value = false
      await getconsignmentRevenues()
      showDeleteRevenueDialog.value = false;
  }else{
      console.log(res.statusText)
  }
}

onMounted(async ()=>{
    await getConsignment()
    await getconsignmentExpenses()
    await getconsignmentRevenues()
})
</script>