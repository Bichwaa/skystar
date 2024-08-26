<template>
    <Modal @close-modal="close">
        
        <form class="lg:m-24">
            <p class="font-medium flex items-center mb-3">Update Expense</p>
            
            <div class="flex flex-col my-4">
                <label for="email" class="text-xs font-medium my-1">Requested by</label>
                <select v-model="payload.requestedId">
                    <option v-for="em in employees" :value="em.ID">{{ em.firstName + " " + em.lastName }}</option>
                </select>
            </div>

            <div class="flex flex-col my-2">
                <label for="limit" class="text-xs font-medium my-1 pl-2">Currency </label>
                <select v-model="payload.currency" class="w-full p-2 text-sm">
                    <option class="text-sm" :value="`TSH`">TSH</option>
                    <option class="text-sm" :value="`USD`">USD</option>
                </select>
            </div>

            <div class="flex flex-col my-2">
                <label for="amount" class="text-xs font-medium my-1">Amount</label>
                <input v-model="payload.amount" type="number" name="amount" placeholder="John@doe.dot" class="border border-gray-300 p-2 rounded-lg text-sm">
            </div>

            
            <div class="flex flex-col my-2">
                <label for="amount" class="text-xs font-medium my-1">Purpose</label>
                <input v-model="payload.purpose" list="expenses" autocomplete="off" type="text" name="amount" placeholder="stationery" class="border border-gray-300 p-2 rounded-lg text-sm">
                <datalist id="expenses" class="max-h-[4rem]">
                    <option v-for="val, id in commonExpenses" :value="val" :key="id"></option>
                </datalist>
            </div>


            <button  type="submit" @click.prevent="submitForm" 
                class="flex items-center justify-center py-2 px-3  mt-6 text-xs rounded-lg bg-[#292a5e] min-w-[150px] text-white font-medium hover:bg-gray-300 hover:text-[#292a5e] disabled:bg-gray-600 duration-300">
                <span v-if="!formLoading">Update</span>
                <Loader v-else size="small" class="h-4 w-4"/>
            </button>
        </form>
    </Modal>
</template>

<script setup>
import {ref, onMounted} from 'vue';
import { userStore } from '../../store';
import {commonExpenses} from '../../commonExpenses'

const store = userStore()

const { $axios } = useNuxtApp()

const props = defineProps({
    expensedata:{
        type:Object,
        default:{
            ID:0,
            consignmentId:0,
            requestedId:0,
            approvedId:0,
            amount:0,
            purpose:"",
            currency:"Tsh"
        }
    },
    consignmentId:{
        default:0,
        
    }
})

const emit = defineEmits(['close'])

const employees = ref([])

const formLoading = ref(false)

const payload  = ref({
    consignmentId:Number(props.consignmentId),
    requestedId:0,
    approvedId:"",
    amount:0,
    purpose:"",
    currency:""
})

async function getEmployees(){
    try{
        const res = await $axios.get("api/users")
        if(res.status==200 || 201){
            employees.value = res.data
        }else{
            console.log(res.statusText)
        }
    }catch(e){
        throw e
    }
}

async function submitForm(){
    formLoading.value = true
        
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
    if (props.expensedata.consignmentId !=""){
        payload.value = {
            consignmentId:Number(props.expensedata.consignmentId),
            requestedId:Number(props.expensedata.requestedId),
            approvedId:props.expensedata.approvedId,
            amount:props.expensedata.amount,
            purpose:props.expensedata.purpose,
            currency:props.expensedata.currency
        }
    }
    await getEmployees()
})

</script>