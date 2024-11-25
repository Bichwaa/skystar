<template>
    <Modal @close-modal="close">
        
        <form class="lg:m-24">
            <p class="font-medium flex items-center mb-3">Add a payment</p>
            <div class="flex flex-col my-2">
                <label class="text-xs font-medium my-1">Payment For:</label>
                <div class="my-1 flex gap-2">
                    <input 
                        type="radio" 
                        for="type" 
                        value="invoice" 
                        v-model="payload.type" 
                        checked 
                    />
                    <label for="invoice" class="text-sm">Invoice</label>
                </div>
                <div class="my-1 flex gap-2">
                    <input 
                        type="radio" 
                        for="type" 
                        value="debitNote" 
                        v-model="payload.type" 
                    />
                    <label for="debitNote" class="text-sm">Debit Note</label>
                </div>
            </div>

            <div class="flex flex-col my-2" v-if="payload.type=='invoice'">
                <label for="invoice" class="text-xs font-medium my-1">Invoice Number</label>
                <select v-model="payload.ivdocNumber" name="invoice" required class="border border-gray-300 p-2 rounded-lg text-sm" @change="console.log('we live')">
                    <option value="" disabled></option>
                    <option v-for="invoice in props.invoices" :key="invoice.ID" :value="invoice.ID">
                        {{ invoice.invoiceNumber }}
                    </option>
                </select>
            </div>

            <div class="flex flex-col my-2" v-else>
                <label for="email" class="text-xs font-medium my-1">Select D/N Number</label>
                <select v-model="payload.dndocNumber" name="debitNote" required class="border border-gray-300 p-2 rounded-lg text-sm" @change="console.log('we live')">
                    <option value="" disabled></option>
                    <option v-for="dn in props.debitNotes" :key="dn.ID" :value="dn.ID">
                        {{ dn.debitNoteNumber }}
                    </option>
                </select>
            </div>

            <div class="flex flex-col my-2">
                <label for="phone" class="text-xs font-medium my-1" v-if="payload.type=='invoice'">Amount({{ invoices[0].currency }})</label>
                <label for="phone" class="text-xs font-medium my-1" v-else>Amount({{ debitNotes[0].currency }})</label>
                <input v-model="payload.paid" type="number" name="amount" required class="border border-gray-300 p-2 rounded-lg text-sm">
            </div>


            <button  type="submit" @click.prevent="submitForm" 
                class="flex items-center justify-center py-2 px-3  mt-6 text-xs rounded-lg bg-[#292a5e] min-w-[150px] text-white font-medium hover:bg-gray-300 hover:text-[#292a5e] disabled:bg-gray-600 duration-300">
                <span v-if="!formLoading">Record Payment</span>
                <Loader v-else size="small" class="h-4 w-4"/>
            </button>
        </form>
    </Modal>
</template>

<script setup>
import {ref} from 'vue';

const { $axios } = useNuxtApp()

const emit = defineEmits(['close'])

const props = defineProps({
    invoices:{
        default:[{invoiceNumber:0, ID:0, currency:"TSH"}]
    },
    debitNotes:{
        default:[{debitNoteNumber:0, ID:0, currency:"TSH"}]
    }
})

const formLoading = ref(false)

const payload  = ref({
  ivdocNumber:0,
  dndocNumber:0,
  paid:0
})

async function submitForm(){
    console.log("calling submit", payload.value)
    formLoading.value = true
    if(payload.value.ivdocNumber != 0){
        const res = await $axios.patch(`/api//tax-invoice/${payload.value.ivdocNumber}/payment`,{paid:payload.value.paid})
        formLoading.value = false
        console.log(res)
        if(res.status==200 || 201){
            emit("close", res.data)
        }else{
            console.log(res.statusText)
        }
    }else{
        const res = await $axios.patch(`/api/debit-note/${payload.value.dndocNumber}/payment`,{paid:payload.value.paid})
        formLoading.value = false
        console.log(res)
        if(res.status==200 || 201){
            emit("close", res.data)
        }else{
            console.log(res.statusText)
        }
    }
}

function close(){
    emit("close")
}

</script>