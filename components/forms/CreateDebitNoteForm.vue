<template>
    <div>
        <Modal @close-modal="close">
            
            <form class="lg:px-6 w-full">
                <p class="font-medium flex items-center mb-3">Create New Debit Note</p>
                
                <div class="flex flex-col mb-3 w-full" v-if="consignment.ID==0">
                    <label for="email" class="text-sm font-medium my-1">Consignment Booking Number</label>
                    <select v-model="payload.consignmentId" class="p-2">
                        <option v-for="con in consignments" :value="con.ID" >{{ con.bookingNumber }}</option>
                    </select>
                </div>
                <div class="flex flex-col mb-3 w-full" v-else>
                    <label for="email" class="text-sm font-medium my-1">Consignment Booking Number</label>
                    <select disabled="p-2">
                        <!-- <option :value="`january`" selected><span class="text-xs">select booking number</span></option> -->
                        <option >{{ consignment.bookingNumber }}</option>
                        <!-- <input type="text" name="" id="" disabled :value="consignment.bookingNumber "> -->
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
                        <label for="limit" class="text-xs font-medium my-1 pl-2">VAT (%)</label>
                        <input v-model="payload.vat" type="number" name="referenceNumber" placeholder="JSFL/PIC454/04/2024" class="border border-gray-300 p-2 rounded-lg text-sm">
                    </div>
                </div>

                

                <div class="flex items-center gap-4 justify-between">
                    <div class="flex flex-col my-2">
                        <label for="limit" class="text-xs font-medium my-1 pl-2">Reference Number </label>
                        <input v-model="payload.referenceNumber" type="text" name="referenceNumber" placeholder="JSFL/PIC454/04/2024" class="border border-gray-300 p-2 rounded-lg text-sm">
                    </div>

                    <div class="flex flex-col my-2">
                        <label for="limit" class="text-xs font-medium my-1 pl-2">D/N Number </label>
                        <input v-model="payload.debitNoteNumber" type="text" name="referenceNumber" placeholder="DBN2532" class="border border-gray-300 p-2 rounded-lg text-sm">
                    </div>
                </div>

                <div class="grid place-items-center" >
                <button  type="submit" @click.prevent="showPreview = true" 
                    class="flex items-center justify-center py-2 px-3  mt-6 text-xs rounded-lg bg-[#292a5e] min-w-[150px] text-white font-medium hover:bg-gray-300 hover:text-[#292a5e] disabled:bg-gray-600 duration-300">
                    <span v-if="!formLoading">Show Preview</span>
                    <Loader v-else size="small" class="h-4 w-4"/>
                </button>
            </div>
            </form>
        </Modal>
        <DebitNotePreview
            v-if="showPreview" 
            @close="showPreview=false" 
            :doc="payload" 
            :entries="entries"
        />
    </div>
</template>

<script setup>
import {ref, onMounted} from 'vue';
import DebitNotePreview from '../DebitNotePreview.vue';

const props = defineProps({
    consignment:{
        type:Object,
        default:{ID:0}
    },
    entries:{
        type:Array,
        default:[]
    }
})

const year = new Date().getFullYear()

const { $axios } = useNuxtApp()

const emit = defineEmits(['close'])

const formLoading = ref(false)
const unfiledError = ref(false)
const showPreview  = ref(false)
const consignments = ref([])
const revealParticularsFields =ref(false)
const particulars = ref([])
const idPair = ref({})

const currentParticular = ref({
    description:"",
    quantity:"",
    unitPrice:null
})

const payload  = ref({
    consignmentId: 0,
    referenceNumber:"",
    debitNoteNumber:"",
    currency:"TSH",
    consignment:props.consignment,
    vat:18, //!8% default assumed
    // particulars:[]
})

function resetparticularForm(){
    unfiledError.value = false
    currentParticular.value = {
    description:"",
    quantity:"",
    unitPrice:null
}
}

async function getUidPair(){
    try {
      const response = await $axios.get('/api/id-pair');
      idPair.value = response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
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
    // payload.value.particulars = particulars.value
    const {consignment, ...rest} = payload.value
    const res = await $axios.post("/api/debit-note",{...rest})
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
    await getUidPair()
    if(idPair.value.invoiceNumber){
        payload.value.debitNoteNumber = idPair.value.invoiceNumber;
        payload.value.referenceNumber = idPair.value.refNumber;
    }
    if(props.consignment.ID==0){
        await getConsignments()
        console.log("did fetch consignmen'ts")
    }else{
        consignments.value.push(props.consignment)
        payload.value.consignmentId = props.consignment.ID
        console.log("didn't fetch consignmen'ts")
    }
    console.log(props.entries, "from consignment form")
})

</script>