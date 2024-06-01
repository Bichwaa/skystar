<template>
    <Modal @close-modal="close">
        
        <form class="lg:px-6 w-full">
            <p class="font-medium flex items-center mb-3">Create New Tax Invoice</p>
            
            <div class="flex flex-col mb-3 w-full">
                <label for="email" class="text-sm font-medium my-1">Consignment Booking Number</label>
                <select v-model="payload.consignmentId" class="p-2">
                    <option :value="`january`">January</option>
                    <option v-for="con in consignments" :value="con.ID" >{{ con.bookingNumber }}</option>
                    
                </select>
            </div>
            <div class="flex gap-4 justify-between items-center">
                <div class="flex flex-col w-full">
                    <label for="limit" class="text-xs font-medium my-1 pl-2">Currency </label>
                    <select v-model="payload.currency" class="w-full p-2 text-sm">
                        <option class="text-sm" :value="`TSH`">TSH</option>
                        <option class="text-sm" :value="`USD`">USD</option>
                    </select>
                </div>

                <div class="flex flex-col my-2">
                    <label for="limit" class="text-xs font-medium my-1 pl-2">Vat Amount</label>
                    <input v-model="payload.vat" type="number" name="referenceNumber" placeholder="JSFL/PIC454/04/2024" class="border border-gray-300 p-2 rounded-lg text-sm">
                </div>
            </div>

            

            <div class="flex items-center gap-4 justify-between">
                <div class="flex flex-col my-2">
                    <label for="limit" class="text-xs font-medium my-1 pl-2">Reference Number </label>
                    <input v-model="payload.referenceNumber" type="text" name="referenceNumber" placeholder="JSFL/PIC454/04/2024" class="border border-gray-300 p-2 rounded-lg text-sm">
                </div>

                <div class="flex flex-col my-2">
                    <label for="limit" class="text-xs font-medium my-1 pl-2">Invoice Number </label>
                    <input v-model="payload.invoiceNumber" type="text" name="referenceNumber" placeholder="IV2532" class="border border-gray-300 p-2 rounded-lg text-sm">
                </div>
            </div>

            <div class="m-auto block mt-3">
            <table class="w-full divide-y divide-gray-200">
              <thead class="bg-gray-100">
                <tr class="">
                  <th class="px-4 py-2 text-left text-sm text-[#292a5e]"># </th>
                  <th class="px-4 py-2 text-left text-sm text-[#292a5e]">Description</th>
                  <th class="px-4 py-2 text-left text-sm text-[#292a5e]">Quantity</th>
                  <th class="px-4 py-2 text-left text-sm text-[#292a5e]">Unit price ({{ payload.currency }})</th>
                  <th class="px-4 py-2 text-left text-sm text-[#292a5e]">action</th>
                  
                </tr>
              </thead>
              <tbody>
                <tr v-for="item,idx in particulars" :key="item.id">
                  <td class="px-4 py-2 text-sm"> <span>{{ idx+1 }}</span> </td>
                  <td class="px-4 py-2 text-sm truncate max-w-[200px]">{{ item.description}}</td>
                  <td class="px-4 py-2 text-sm">{{ item.quantity }}</td>
                  <th class="px-4 py-2 text-left text-sm">{{ item.unitPrice }}</th>
                  <td class="flex tems-center gap-6 px-4 py-2">
                    <span class="text-red-600 text-sm font-medium hover:text-black duration-300 cursor-pointer" 
                      @click="loadDeleteExpenseDialog(item)"
                      >Remove</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div> 

            <div class="flex flex-col mb-2 mt-5 text-sm">
                <div 
                    class="flex flex-col transition-all duration-300"
                    :class="revealParticularsFields?'max-h-[500px]':'max-h-[0px] overflow-hidden'"
                    >
                    <div class="flex flex-col">
                        <label for="limit" class="text-xs font-medium my-1">description </label>
                        <textarea v-model="currentParticular.description"  placeholder="" class="border border-gray-300 p-2 rounded-lg text-sm"></textarea>
                    </div>
                    
                
                    <div class="flex gap-4 items-center justify-between my-3">
                        <div class="flex flex-col">
                            <label for="limit" class="text-xs font-medium my-1 pl-2">quantity </label>
                            <input type="number" v-model="currentParticular.quantity"  placeholder="" class="border border-gray-300 p-2 rounded-lg text-sm">
                        </div>
                        <div class="flex flex-col">
                            <label for="limit" class="text-xs font-medium my-1 pl-2">unit Price </label>
                            <input type="number" v-model="currentParticular.unitPrice"  placeholder="" class="border border-gray-300 p-2 rounded-lg text-sm">
                        </div>
                    </div>
                    <div class="grid place-items-center" v-if="unfiledError">
                        <span class="text-xs text-red-500"> make sure all fields are filled before adding item</span>
                    </div>
                </div>
                <div class="flex items-center justify-between">
                    <div class="flex">
                        <span v-if="!revealParticularsFields" 
                            class="cursor-pointer text-[#292a5e] text-sm font-medium underline my-3"
                            @click="toggleRevealParticularsFields"
                            >Add Particulars</span>
                        <span v-else 
                            @click="pushCurrentParticular"
                            class="cursor-pointer text-[#292a5e] text-sm font-medium underline my-3"
                            >+ Add Item</span>
                    </div>

                    <span 
                        class="cursor-pointer text-[#292a5e] text-sm font-medium underline my-3" 
                        v-if="revealParticularsFields"
                        @click="toggleRevealParticularsFields"
                        >{{ "hide" }}
                    </span>
                </div>
                
            </div>

            <div class="grid place-items-center">
                <button  type="submit" @click.prevent="submitForm" 
                    class="flex items-center justify-center py-2 px-3  mt-6 text-xs rounded-lg bg-[#292a5e] min-w-[150px] text-white font-medium hover:bg-gray-300 hover:text-[#292a5e] disabled:bg-gray-600 duration-300">
                    <span v-if="!formLoading">Create Invoice</span>
                    <Loader v-else size="small" class="h-4 w-4"/>
                </button>
            </div>
        </form>
    </Modal>
</template>

<script setup>
import {ref, onMounted} from 'vue';



const year = new Date().getFullYear()

const { $axios } = useNuxtApp()

const emit = defineEmits(['close'])

const formLoading = ref(false)
const unfiledError = ref(false)
const consignments = ref([])
const revealParticularsFields =ref(false)
const particulars = ref([])

const currentParticular = ref({
    description:"",
    quantity:"",
    unitPrice:null
})

const payload  = ref({
    consignmentId: 0,
    referenceNumber:"",
    invoiceNumber:"",
    currency:"TSH",
    vat:0,
    particulars:[]
})

function resetparticularForm(){
    unfiledError.value = false
    currentParticular.value = {
    description:"",
    quantity:"",
    unitPrice:null
}
}

function pushCurrentParticular(){
    if(
        currentParticular.value.description!=="" &&
        currentParticular.value.quantity!=="" &&
        currentParticular.value.unitPrice!== null
    ){
        particulars.value.push(currentParticular.value)
        resetparticularForm()
    }else{
        unfiledError.value = true
    }
}


function toggleRevealParticularsFields(){
    revealParticularsFields.value = ! revealParticularsFields.value
}

async function getConsignments(){
    try {
      const response = await $axios.get('/api/consignments');
      consignments.value = response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      consignments.value = null; // Set items to an empty array or handle error as needed
    }
  }

async function submitForm(){
    console.log("calling submit")
    formLoading.value = true
    payload.value.particulars = particulars.value
    const res = await $axios.post("/api/tax-invoice",{...payload.value})
    formLoading.value = false
    console.log(res)
    if(res.status==200 || 201){
        emit("close", res.data)
    }else{
        console.log(res.statusText)
    }
}

function close(){
    emit("close")
}

onMounted(async()=>{
    await getConsignments()
})

</script>