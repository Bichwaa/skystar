<template>
  <div class="flex flex-col flex-wrap sm:flex-row">
    <div class="w-full xl:w-1/2">
      <div class="mx-0 mb-4 sm:ml-4 xl:mr-4">
        <div class="w-full rounded-2xl bg-white shadow-lg">
          <p class="p-4 font-bold text-black text-xl">
            Latest Consignments
            <!-- <span class="ml-2 text-sm text-gray-500">(10)</span> -->
          </p>
          <div class="m-auto block">
              <table class="w-full divide-y divide-gray-200 overflow-x-scroll">
                <thead class="bg-gray-100">
                  <tr class="">
                    <th class="px-4 py-2 text-left">Booking No</th>
                    <th class="px-4 py-2 text-left">Customer</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in consignments" :key="item.id" class="hover:bg-yellow-100 hover:cursor-pointer" @click="viewconsignmentClicked(item.ID)">
                    <td class="px-4 py-2 ">{{ item?.bookingNumber }}</td>
                    <td class="px-4 py-2">{{ item?.customer?.fullName }}</td>
                    <!-- <td class="flex items-center gap-6 px-4 py-2">
                      <span 
                        class="text-[#292a5e] text-sm font-medium hover:text-black duration-300 cursor-pointer"
                        @click="viewconsignmentClicked(item.ID)"
                        >View</span>
                    </td> -->
                  </tr>
                </tbody>
              </table>
            </div>

        </div>
      </div>
    </div>
    <div class="w-full xl:w-1/2">
      <div class="mb-4">
        <div class="w-full rounded-2xl bg-white p-4 shadow-lg">
          <p class="font-bold text-black text-xl">Waiting Approval</p>

          <p class="font-bold text-black mt-6 mb-2">Cost Entries</p>
          <table class="w-full divide-y divide-gray-200">
            <thead class="bg-gray-100">
                <tr class="">
                <th class="px-4 py-2 text-left">Requested By</th>
                <th class="px-4 py-2 text-left">Amount</th>
                <th class="px-4 py-2 text-left">Purpose</th>
                <th class="px-4 py-2 text-left">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in expenses" :key="item.ID">
                    <td class="px-4 py-2"> <span v-if="item.Requested">{{ item?.Requested?.firstName + " " + item?.Requested?.lastName }}</span> </td>
                    <td class="px-4 py-2">{{ item.amount}} ({{ item.currency }})</td>
                    <td class="px-4 py-2">{{ item.purpose }}</td>
                    <td class="flex items-center gap-6 px-4 py-2">
                    <span class="text-[#d4af37] text-sm font-medium hover:text-black duration-300 cursor-pointer"
                    @click="loadApproveCostForm(item)">
                    Approve
                    </span>
                </td>
                </tr>
            </tbody>
          </table>


          <p class="font-bold text-black mt-6 mb-2">Revenue Entries</p>
          <table class="w-full divide-y divide-gray-200">
            <thead class="bg-gray-100">
                <tr class="">
                <th class="px-4 py-2 text-left">Requested By</th>
                <th class="px-4 py-2 text-left">Amount</th>
                <th class="px-4 py-2 text-left">Purpose</th>
                <th class="px-4 py-2 text-left">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in revenues" :key="item.ID">
                    <td class="px-4 py-2"> <span v-if="item.Requested">{{ item?.Requested?.firstName + " " + item?.Requested?.lastName }}</span> </td>
                    <td class="px-4 py-2">{{ item.amount}} ({{ item.currency }})</td>
                    <td class="px-4 py-2">{{ item.purpose }}</td>
                    <td class="flex items-center gap-6 px-4 py-2">
                    <span class="text-[#d4af37] text-sm font-medium hover:text-black duration-300 cursor-pointer"
                    @click="loadApproveRevenueForm(item)">
                    Approve
                    </span>
                </td>
                </tr>
            </tbody>
            </table>
        </div>
      </div>
    </div>
  </div>
  <FormsApproveCostForm v-if="showApproveCostForm" @close="closeApproveCostForm" :cost="costToApprove" :consignments="consignments" />
  <FormsApproveRevenueForm v-if="showApproveRevenueForm" @close="closeApproveRevenueForm" :revenue="revenueToApprove" :consignments="consignments" />
</template>


<script setup>
import {ref} from 'vue';


const { $axios } = useNuxtApp();

const showApproveCostForm = ref(false);
const costToApprove = ref({});
const showApproveRevenueForm = ref(false);
const revenueToApprove = ref({});


defineProps({
  title: {
    type: String,
    default: "",
  },
});

const consignments = ref([]);
const expenses = ref([])
const revenues = ref([])

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

function loadApproveCostForm(item){
  showApproveCostForm.value = true;
  costToApprove.value = item;
}

function loadApproveRevenueForm(item){
  showApproveRevenueForm.value = true;
  revenueToApprove.value = item;
}

async function closeApproveCostForm(item){
  showApproveCostForm.value = false;
  if(item){
    await getUnapprovedExpenses()
  }
  
}

async function closeApproveRevenueForm(item){
  showApproveRevenueForm.value = false;
  if(item){
    await getUnapprovedRevenues()
  }
  
}

async function getUnapprovedRevenues(){
    try {
    const response = await $axios.get(`/api/revenue/unapproved`);
    if(response.status === 200|201){
      revenues.value = response.data;
    }
  } catch (error) {
    console.error('Error fetching cost data:', error);
  }
}

async function getUnapprovedExpenses(){
    try {
    const response = await $axios.get(`/api/expenses/unapproved`);
    if(response.status === 200|201){
      expenses.value = response.data;
    }
  } catch (error) {
    console.error('Error fetching cost data:', error);
  }
}


function viewconsignmentClicked(consignmentId){
    navigateTo(`/admin/consignments/${consignmentId}`)
  }

onMounted(async () => {
  await getConsignments()
  await getUnapprovedExpenses()
  await getUnapprovedRevenues()
});
</script>