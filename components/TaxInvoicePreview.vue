<template>
    <Modal  @close-modal="close">
        <div class="flex items-center justify-end my-6 ">
            <span 
                
                @click="generateInvoice"
                >
                <Loader class="h-6 w-6" v-if="loading"/>
                <span
                v-if="!loading"
                    class="cursor-pointer text-orange-400 hover:text-white hover:bg-orange-400 text-xs font-semibold p-3 rounded-lg border border-orange-400"    
                >Generate</span>
            </span>
        </div>
        <div class="pdf-wrapper flex flex-col gap-5 W-[100%] overflow-y-auto h-[80vh]" ref="ivc">

            <div class="pdf-header flex  justify-between">
                <div class="logo-wrapper">
                    <NuxtImg src="/images/logo.png" />
                </div>
                <div class="contact-iNfo-wrapper flex flex-col">
                    <span class="text-sm font-medium my-1">11<sup>th</sup> Floor IPS building,</span>
                    <span class="text-sm font-medium my-1">Samora Avenue/Azikiwe Street,</span>
                    <span class="text-sm font-medium my-1">P.O.Box 8680, Dar-es-salaam</span>
                    <span class="text-sm font-medium my-1">Tel: +255 22 2112049</span>
                    <span class="text-sm font-medium my-1">Cell: +255 754 276 123, +255 689 303 277</span>
                    <span class="text-sm font-medium my-1">Email: info@skystarfreight.co.tz</span>
                </div>
            </div>

            <hr/>

            <div class="invoice-id-info flex flex-col w-full">
                <div class="flex items-center justify-between w-full">
                    <span class="reference-number">Ref no:{{doc.referenceNumber}}</span>
                    <span class="date">{{ new Date(doc.CreatedAt).toLocaleDateString('en-US',OPTIONS) }}</span>
                </div>
                <p class="my-2">Invo no: {{doc.invoiceNumber}}7</p>
            </div>

            <div class="flex flex-col">
                <h3 class="uppercase text-lg text-center font-semibold mb-2">
                    TAX INVOICE 
                </h3>

                <table class="w-full divide-y divide-gray-200 mb-12">
                <tbody>
                  <tr class="border border-gray-200">
                    <td class="px-4 py-2">Name of Client</td>
                    <td class="px-4 py-2 border-l border-gray-200">{{ doc.consignment.customer.fullName }}</td>
                  </tr>
                  <tr class="border border-gray-200">
                    <td class="px-4 py-2">Address</td>
                    <td class="px-4 py-2 border-l border-gray-200">{{ doc.consignment.customer.address }}</td>
                  </tr>
                  <tr class="border border-gray-200">
                    <td class="px-4 py-2"> B.L Number</td>
                    <td class="px-4 py-2 border-l border-gray-200">{{ doc.consignment.blNumber }}</td>
                  </tr>
                  <tr class="border border-gray-200">
                    <td class="px-4 py-2"> Booking Number</td>
                    <td class="px-4 py-2 border-l border-gray-200">{{ doc.consignment.bookingNumber }}</td>
                  </tr>
                </tbody>
              </table>

              <h3 class="uppercase text-lg text-center font-semibold mb-2">
                    PARTICULARS
                </h3>

              <div class="container mx-auto px-4">
                    <table class="min-w-full bg-white border">
                        <thead>
                            <tr class="w-full bg-gray-200 text-left border-l border-gray-200">
                            <th class="py-2 px-4 border-b">
                                Description
                                <span class="text-xs invisible">invisible content to shift the table </span>
                            </th>
                            <th class="py-2 px-4 border-b">Quantity</th>
                            <th class="py-2 px-4 border-b">unit Price</th>
                            <th class="py-2 px-4 border-b">Amount({{ doc.currency }})</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item, idx in particulars" :key="idx" class=" border-l border-gray-200">
                            <td class="py-2 px-4 border-b truncate max-w-[250px]">{{ item.purpose }}</td>
                            <td class="py-2 px-4 border-b border-l border-gray-200">{{ numberWithCommas(item.amount) }}</td>
                            <td class="py-2 px-4 border-b border-l border-gray-200">{{ numberWithCommas(item.quantity) }}</td>
                            <td class="py-2 px-4 border-b border-l border-gray-200">{{ numberWithCommas(item.amount * item.quantity) }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="px-4">
                    <table class="w-full divide-y divide-gray-200 mb-12">
                        <tbody>
                        <tr class="border border-gray-200">
                            <td class="px-4 py-2 font-semibold">Value Amount({{ doc.currency }}) </td>
                            <td class="px-4 py-2 border-l border-gray-200 text-center">{{ numberWithCommas(valueAmount) }}</td>
                        </tr>
                        <tr class="border border-gray-200">
                            <td class="px-4 py-2 font-semibold">Amount Vat</td>
                            <td class="px-4 py-2 border-l border-gray-200 text-center">{{ numberWithCommas(doc.vat) }}</td>
                        </tr>
                        <tr class="border border-gray-200">
                            <td class="px-4 py-2 font-semibold"> Total Amount </td>
                            <td class="px-2 py-2 border-l border-gray-200 font-medium text-center w-[138px]">{{ numberWithCommas(valueAmount + doc.vat) }}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>

                <div class="border border-gray-200 flex flex-col gap-1 mx-4 px-4 py-2">
                    <h3 class="uppercase font-semibold">Bank Details</h3>
                    <div class="flex itens-center gap-2">
                        <span>Bank name:</span>
                        <span>NMB Bank Plc</span>
                    </div>

                    <div class="flex itens-center gap-2">
                        <span>Account name:</span>
                        <span>Skystar Freight Limited</span>
                    </div>

                    <div class="flex itens-center gap-2">
                        <span>A/C:</span>
                        <span>20110058242 For TZS</span>
                    </div>

                    <div class="flex itens-center gap-2">
                        <span>A/C:</span>
                        <span>20110058242 For USD</span>
                    </div>

                    <!-- <div class="flex itens-center gap-2">
                        <span>Swift code:</span>
                        <span>NMIBTZTZ</span>
                    </div> -->

                </div>

                <div class="flex items-center justify-between px-8 my-6">
                    <span>Prepared .........................</span>
                    <span>Approved .........................</span>
                </div>

                <div class="flex gap-2 items-center w-full">
                    <hr class="w-[26%]" /> <span class="text-sm font-semibold">HELPING YOU PLAN FOR TOMORROW</span> <hr class="w-[26%]" />
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
    }
})

const loading = ref(false)

const particulars = ref([])
const ivc = ref(null)

const valueAmount = computed(()=>{
    return particulars.value.reduce((sum,b)=>{
        const q2 = ( b.amount * b.quantity)
        return sum + q2
    },0)

})

async function getconsignmentExpenses(){
    try {
    const response = await $axios.get(`/api/filter-expenses?consignment=${props.doc.consignment.ID}`);
    if(response.status === 200|201){
      particulars.value = response.data;
    }
  } catch (error) {
    console.error('Error fetching cost data:', error);
  }
}


async function generateInvoice(){
    const opt = {
    margin:       1,
    filename:     'invoice.pdf',
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { scale: 2, scrollY: 0, windowHeight: ivc.value.scrollHeight*2},
    jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    
    loading.value = true
    await  html2pdf(ivc.value, opt);
    loading.value = false
}


function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const emit = defineEmits(["close"])

function close(){
    emit("close")
}

onMounted(async()=>{
    await getconsignmentExpenses()
})
</script>