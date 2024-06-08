<template>
    <Modal @close-modal="close">
        
        <form class="lg:m-24">
            <p class="font-medium flex items-center mb-3">Add Expense</p>
            
            <div class="flex flex-col my-4">
                <label for="email" class="text-xs font-medium my-1">Requested by</label>
                <select v-model="payload.requestedId">
                    <option v-for="em in employees" :value="em.ID">{{ em.firstName + " " + em.lastName }}</option>
                </select>
            </div>

            <div class="flex flex-col my-2">
                <label for="amount" class="text-xs font-medium my-1">Amount</label>
                <input v-model="payload.amount" type="number" name="amount" placeholder="John@doe.dot" class="border border-gray-300 p-2 rounded-lg text-sm">
            </div>

            <div class="flex flex-col my-2">
                <label for="amount" class="text-xs font-medium my-1">Purpose</label>
                <textarea v-model="payload.purpose" type="text" name="amount" placeholder="stationery" class="border border-gray-300 p-2 rounded-lg text-sm"></textarea>
            </div>


            <button  type="submit" @click.prevent="submitForm" 
                class="flex items-center justify-center py-2 px-3  mt-6 text-xs rounded-lg bg-[#292a5e] min-w-[150px] text-white font-medium hover:bg-gray-300 hover:text-[#292a5e] disabled:bg-gray-600 duration-300">
                <span v-if="!formLoading">Add Cost</span>
                <Loader v-else size="small" class="h-4 w-4"/>
            </button>
        </form>
    </Modal>
</template>

<script setup>
import {ref, onMounted} from 'vue';
import { userStore } from '../../store';

const store = userStore()

const { $axios } = useNuxtApp()

const props = defineProps({
    consignmentId:{
        type:Number,
        default:0
    }
})

const emit = defineEmits(['close'])

const employees = ref([])
const cashbook = ref({})

const formLoading = ref(false)

const payload  = ref({
    consignmentId:Number(props.consignmentId),
    pettyCashId:0,
    requestedId:0,
    approvedId:store.user.ID,
    amount:0,
    purpose:""
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

async function getCashbook(){
    try{
        const res = await $axios.get(`/api/petty-cashbooks?consignment=${props.consignmentId}`)
        if(res.status==200 || 201){
            cashbook.value = res.data[0]
        }else{
            console.log(res.statusText)
        }
    }catch(e){
        throw e
    }
}



async function submitForm(){
    console.log("calling submit")
    formLoading.value = true
    payload.value.pettyCashId = cashbook.value.ID
    const res = await $axios.post("/api/expenses",{...payload.value})
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
    await getEmployees()
    await getCashbook()
})
</script>