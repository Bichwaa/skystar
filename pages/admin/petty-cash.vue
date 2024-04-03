<template>
  <div class="flex flex-wrap sm:flex-row gap-8">
    <div class="w-full">
      <div class="mb-4">
        <div class="w-full rounded-2xl bg-white p-4 shadow-lg">
          <div class="mb-6 flex items-center justify-between">
            <div class="flex items-center justify-between w-full">
              <div class="flex flex-col">
                <span class="ml-2 font-bold text-black">Petty Cashbook</span>
                <span class="ml-2 text-xs text-gray-500">
                  For the month of
                </span>
              </div>

              <button class="rounded-full border border-gray-200 p-1">
                <IconsAddIcon class="h-7 w-7 cursor-pointer" @click="showCreateCustomerForm=true" />
              </button>
            </div>
            
          </div>
         
          <div class="mb-4 flex items-center justify-between space-x-12">
            <span
              class="flex items-center rounded-md bg-green-50 px-2 py-1 text-xl font-semibold text-green-700"
            >
              {{ formattedDate }}
            </span>
          </div>

          <div class="summary flex flex-col gap-3 my-4">
            <div class="flex items-center justify-start gap-5">
              <span class="font-medium text-sm">Spent:</span>
              <span class="font-semibold text-sm">Tsh {{ "420,000" }}</span>
            </div>
            <div class="flex items-center justify-start gap-5">
              <span class="font-medium text-sm">Float:</span>
              <span class="font-semibold text-sm">Tsh {{ "1,500,000 "}}</span>
            </div>
            <div class="flex items-center justify-start gap-5">
              <span class="font-medium text-sm">Overspent:</span>
              <span class="font-semibold text-sm">Tsh {{ 0 }}</span>
            </div>
          </div>

          <div class="m-auto block">
            <table class="w-full divide-y divide-gray-200">
              <thead class="bg-gray-100">
                <tr class="">
                  <th class="px-4 py-2 text-left">Requested By</th>
                  <th class="px-4 py-2 text-left">Amount</th>
                  <th class="px-4 py-2 text-left">Purpose</th>
                  <th class="px-4 py-2 text-left">Date requested</th>
                  <th class="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in items" :key="item.id">
                  <td class="px-4 py-2">{{ item.requestedBy }}</td>
                  <td class="px-4 py-2">{{ item.amount}}</td>
                  <td class="px-4 py-2">{{ item.purpose }}</td>
                  <td class="px-4 py-2">{{ item.cashoutDate}}</td>
                  <td class="flex items-center gap-6 px-4 py-2">
                    <span 
                      class="text-[#292a5e] text-sm font-medium hover:text-black duration-300 cursor-pointer"
                      @click="viewCustomerClicked(item)"
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
    <DeleteDialog v-if="showDeleteCustomerDialog" entity="customer" :loading="deleteInProgress" @proceed="deleteCustomer" @close="showDeleteCustomerDialog=false"/>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const items = [
        {
          id: 1,
          requestedBy: 'John Doe',
          amount:"200,000",
          purpose: 'Clearance',
          cashoutDate: '7 March',
        },
        {
          id: 2,
          requestedBy: 'Jane Deer',
          amount:"220,000",
          purpose: 'Customs clearance',
          cashoutDate: '13 March'
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
const OPTIONS = {month: 'long'};
const formattedDate = currentDate.toLocaleDateString('en-US',OPTIONS);

//CRUD SHIT
const showCustomerDetails = ref(false)
const showCreateCustomerForm = ref(false)
const showEditCustomerForm = ref(false)
const showDeleteCustomerDialog = ref(false)
const currentCustomer = ref({});
const customerToEdit = ref({});
const customerToDelete = ref({});
const deleteInProgress = ref(false)

function viewCustomerClicked(customer){
  currentCustomer.value = customer;
  showCustomerDetails.value = true;
}

function loadEditCustomerForm(customer){
  customerToEdit.value = customer;
  showEditCustomerForm.value = true
}

function handleCreateCustomerformClosed(){
  showCreateCustomerForm.value=false;
  if(payload!=undefined){
  console.log("the payload",payload)
  customers.value.push(payload)
  }
}

function handleEditCustomerformClosed(){
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

function loadDeleteCustomerDialog(customer){
  customerToDelete.value = customer;
  showDeleteCustomerDialog.value = true
}

async function deleteCustomer(){
  deleteInProgress.value = true
  const res = await axios.delete(`http://localhost:3006/api/customer/delete/${customerToDelete.value.ID}`);
  console.log(res)
  if(res.status==200 || 201){
      deleteInProgress.value = false
      //remove employee from client state
      customers.value  = customers.value.filter(x=>{
        return x.ID!==employeeToDelete.value
      })
      showEmployeeDeleteDialog.value = false;
  }else{
      console.log(res.statusText)
  }
}


onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:3006/api/customers');
    customers.value = response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    customers.value = null; // Set items to an empty array or handle error as needed
  }
});

</script>