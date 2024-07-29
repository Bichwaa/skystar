<template>
    <Modal @close-modal="close">
        <div class="flex items-center justify-end my-6 ">
            <div class="flex gap-4 items-center">

                <span 
                    class="cursor-pointer text-[#292a5e] hover:text-white hover:bg-[#292a5e] text-xs font-semibold p-3 rounded-lg border border-[#292a5e]"
                    @click="resetParticulars"    
                >Reset Particulars</span>

                <span 
                @click="generateDebitNote"
                >
                <Loader class="h-6 w-6" v-if="loading"/>
                <span
                v-if="!loading"
                    class="cursor-pointer text-orange-400 hover:text-white hover:bg-orange-400 text-xs font-semibold p-3 rounded-lg border border-orange-400"    
                >Generate</span>
                </span>
                </div>
        </div>
        <div class="pdf-wrapper flex flex-col gap-5 W-[100%] overflow-y-auto max-h-[80vh]" ref="note">

            <div class="pdf-header flex  justify-between">
                <div class="logo-wrapper">
                    <NuxtImg src="/images/logo.png" />
                </div>
                <div class="contact-iNfo-wrapper flex flex-col">
                    <span class="text-sm font-medium my-1">11<sup>th</sup> Floor IPS building,</span>
                    <span class="text-sm font-medium my-1">Samora Avenue/Azikiwe Street,</span>
                    <span class="text-sm font-medium my-1">P.O.Box 8680, Dar-es-salaam</span>
                    <span class="text-sm font-medium my-1">Tel: +255 22 2112049</span>
                    <span class="text-sm font-medium my-1">Cell: +255 784 371 352, +255 689 303 277</span>
                    <span class="text-sm font-medium my-1">Email: account@skystarfreight.co.tz</span>
                </div>
            </div>

            <hr/>

            <div class="invoice-id-info flex flex-col w-full">
                <div class="flex items-center justify-between w-full">
                    <div class="flex gap-2 items-center">
                        <span class="text-xs">REF:</span>
                        <span class="reference-number text-xs">{{doc.referenceNumber}}</span>
                    </div>
                    <span class="date text-xs">
                        {{ doc.CreatedAt? 
                            new Date(doc.CreatedAt).toLocaleDateString('en-US',OPTIONS):
                            new Date().toLocaleDateString('en-US',OPTIONS)}}
                    </span>
                </div>

                <p class="my-2 text-xs">D/N no: {{ doc.debitNoteNumber }}</p>
            </div>

            <div class="flex flex-col gap-4">
                <div class="flex itens-center gap-2">
                    <span class="text-xs">CUSTOMER NAME:</span>
                    <span class="text-xs">{{ doc.consignment?.customer?.fullName }}</span>
                </div>
                <div class="flex itens-center gap-2">
                    <span class="text-xs">BOOKING NUMBER:</span>
                    <span class="text-xs">{{ doc.consignment?.bookingNumber }}</span>
                </div>
            
                <h3 class="uppercase text-xs text-center font-semibold mb-2">
                    DEBIT NOTE
                </h3>

              <div class="container mx-auto px-4">
                    <table class="min-w-full bg-white border">
                        <thead>
                            <tr class="w-full bg-gray-200 text-left border-l border-gray-200">
                            <th class="py-2 px-4 border-b text-xs">Particulars 
                                <span class="text-xs invisible">exra content to shift the table </span>
                            </th>
                            <th class="py-2 px-4 border-b text-xs">Quantity</th>
                            <th class="py-2 px-4 border-b text-xs">unit Price</th>
                            <th class="py-2 px-4 border-b text-xs">Amount(Tsh)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item, idx in particulars" :key="idx" class=" border-l border-gray-200 group cursor-pointer hover:bg-yellow-50">
                                <td class="py-1 px-4 border-b truncate max-w-[250px] text-xs">{{ item.purpose }}</td>
                                <td class="py-1 px-4 border-b border-l border-gray-200 text-xs">{{ numberWithCommas(item.amount) }}</td>
                                <td class="py-1 px-4 border-b border-l border-gray-200 text-xs">{{ numberWithCommas(item.quantity) }}</td>
                                <td class="py-1 px-4 border-b border-l border-gray-200 text-xs flex justify-around">
                                    <span>{{ numberWithCommas(item.amount * item.quantity) }}</span>
                                    <span class="invisible group-hover:visible duration-300 text-red-500 font-semibold" @click="pluckParticular(idx)">X</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <div class="">
                    <table class="w-full divide-y divide-gray-200 mb-12">
                        <tbody>
                            <tr class="border border-gray-200">
                                <td class="px-4 py-1 font-semibold text-xs">Value Amount({{ doc.currency }}) </td>
                                <td class="px-4 py-1 border-l border-gray-200 text-center text-xs">{{ numberWithCommas(valueAmount) }}</td>
                            </tr>
                            <tr class="border border-gray-200">
                                <td class="px-4 py-1 font-semibold text-xs">Vat({{ doc.vat }}%)</td>
                                <td class="px-4 py-1 border-l border-gray-200 text-center text-xs">{{ numberWithCommas(doc.vat*valueAmount*0.01) }}</td>
                            </tr>
                            <tr class="border border-gray-200">
                                <td class="px-4 py-2 text-xs">Total Value </td>
                                <td class="px-4 py-2 border-l border-gray-200 text-center text-xs">{{ numberWithCommas(valueAmount + doc.vat*valueAmount*0.01)}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                </div>

                

                <div class=" flex flex-col gap-1 mx-4 px-4 py-2">
                    <h3 class="uppercase font-semibold text-xs">Bank Details</h3>
                    <div class="flex itens-center gap-2">
                        <span class="text-xs">Bank name:</span>
                        <span class="text-xs">NMB Bank Plc</span>
                    </div>

                    <div class="flex itens-center gap-2">
                        <span class="text-xs">Account name:</span>
                        <span class="text-xs">Skystar Freight Limited</span>
                    </div>

                    <div class="flex itens-center gap-2">
                        <span class="text-xs">A/C:</span>
                        <span class="text-xs">20110058241 For TZS</span>
                    </div>

                    <div class="flex itens-center gap-2">
                        <span class="text-xs">A/C:</span>
                        <span class="text-xs">20110058242 For USD</span>
                    </div>

                    <div class="flex itens-center gap-2">
                        <span class="text-xs">Swift code:</span>
                        <span class="text-xs">NMIBTZTZ</span>
                    </div>

                </div>

                <div class="flex items-center justify-between px-8 my-2">
                    <span class="text-xs">Prepared By: .........................</span>
                    <!-- <span>Approved .........................</span> -->
                </div>

                <div class="flex gap-2 items-center w-full mb-3">
                    <hr class="w-[26%]" /> <span class="text-xs font-semibold">HELPING YOU PLAN FOR TOMORROW</span> <hr class="w-[26%]" />
                </div>
            </div>

        </div>
    </Modal>
</template>

<script setup>
import html2pdf from "html2pdf.js"
import {computed, ref, onMounted} from 'vue';

const { $axios } = useNuxtApp()

const OPTIONS = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

const props = defineProps({
    doc:{
        type:Object,
        default:{
            ID:1
        }
    },
    entries:{
        type:Array,
        default:[]
    }
})

const loading = ref(false)

const particulars = ref([])
const fixedParticulars = ref([])
const note = ref(null)

function pluckParticular(idx){
    particulars.value = particulars.value.filter((val, index)=>{
        return index!=idx;
    })
}

function resetParticulars(){
    particulars.value = fixedParticulars.value;
}


const emit = defineEmits(["close"])

function close(){
    emit("close")
}

const valueAmount = computed(()=>{
    return particulars.value.reduce((sum,b)=>{
        const q2 = ( b.amount * b.quantity)
        return sum + q2
    },0)

})

async function getconsignmentRevenue(){
    try {
    const response = await $axios.get(`/api/filter-revenue?consignment=${props.doc.consignment.ID}`);
    if(response.status === 200|201){
      particulars.value = response.data;
      fixedParticulars.value = response.data;
    }
  } catch (error) {
    console.error('Error fetching cost data:', error);
  }
}

async function generateDebitNote(){
    const opt = {
    margin:       1,
    filename:     'invoice.pdf',
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { scale: 2, scrollY: 0, windowHeight: note.value.scrollHeight*2},
    jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
    };
    
    loading.value = true
    await  html2pdf(note.value, opt);
    loading.value = false
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


onMounted(async()=>{
    if(props.entries.length == 0){
        await getconsignmentRevenue()
    }else{
        fixedParticulars.value = props.entries;
        particulars.value = props.entries;
    }
    console.log(props.entries)
})
</script>