<template>
    <div class="w-full rounded-2xl bg-white p-4 shadow-lg overflow-y-scroll">
        
        <div class="flex flex-col">
            <!-- <h1 class="font-semibold text-lg Lg:text-xl my-5">Consignment Details</h1> -->

                <div class="grid grid-cols-3">

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
                            <p> {{ consignment.Overseer.firstName + " " + consignment.Overseer.lastName }} </p>
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

                    <div class="col-span-2 flex flex-col items-start">
                        <span class="text-[#292a5e]  mt-3 my-2 uppercase font-semibold"> Consignment Details  </span>

                        <div class="grid grid-cols-2 lg:grid-cols-3 gap-2 w-full">
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

                                <div class="flex gap-3  w-full items-center my-2" v-else>
                                    <div class="flex gap-4 items-center">
                                        <IconsContainerIcon class="w-5 h-5" />
                                        <span class=" font-medium">Number of Packages:</span>
                                    </div>
                                    <p>{{  consignment.looseCargo }}</p>
                                </div>

                                <div class="flex gap-3  w-full items-center my-2">
                                    <div class="flex gap-4 items-center">
                                        <IconsDestinationIcon class="w-5 h-5" />
                                        <span class=" font-medium">Port of Loading:</span>
                                    </div>
                                    <p>{{ consignment.portOfLoading }}</p>
                                </div>

                                <div class="flex gap-3  w-full items-center my-2">
                                    <div class="flex gap-4 items-center">
                                        <IconsDestinationIcon class="w-5 h-5" />
                                        <span class=" font-medium">Port of Discharge:</span>
                                    </div>
                                    <p>{{ consignment.destination }}</p>
                                </div>

                            </div>

                            <div class="col-span-1 flex flex-col items-start  px-4">
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
        <div class="flex items-center justify-between pr-12 my-5">
            <h3 class="text-[#292a5e]  mt-3 my-6 uppercase font-semibold">Expenses</h3>
            <button class="p-2 rounded-lg flex gap-4 items-center border border-gray-200 group-hover:bg-[#292a5e] duration-300" @click="showExpenseForm=true">
                <IconsAddIcon class="h-7 w-7 cursor-pointer" />
                <span class="text-sm text-[#292a5e] group-hover:text-white duration-700">
                Add Cost
            </span>
            </button>
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
                <tr v-for="item in expenses" :key="item.id">
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

          <FormsCreateConsignmentCostForm v-if="showExpenseForm" :consignmentId="consignment.ID" @close="handleExpenseClosed"/>

    </div>
</template>

<script setup>
import {ref, onMounted} from 'vue';

const { $axios } = useNuxtApp()

const route = useRoute()

const expenses = ref([])

const showExpenseForm = ref(false)

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

onMounted(async ()=>{
    await getConsignment()
    await getconsignmentExpenses()
})
</script>