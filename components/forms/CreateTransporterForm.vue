<template>
    <Modal @close-modal="close">
        <p class="font-medium flex items-center mb-3">Add New Transporter</p>
        <div class="lg:mx-24 flex flex-col" v-if="!newMode">
            <div class="flex flex-col">
                <label for="email" class="text-sm font-medium my-1">Add from list of available transporters</label>
                <select v-model="attachPayload.transporterId">
                    <option v-for="item in transporters" :value="item.ID">{{ item.name }}</option>
                </select>

                <button  type="submit" @click.prevent="assignTransporter" 
                class="flex items-center justify-center py-2 px-3  mt-6 text-xs rounded-lg bg-[#292a5e] min-w-[150px] text-white font-medium hover:bg-gray-300 hover:text-[#292a5e] disabled:bg-gray-600 duration-300">
                <span v-if="!formLoading">Add Transporter</span>
                <Loader v-else size="small" class="h-4 w-4"/>
            </button>

                <span class="text-xs text-blue-500 cursor-pointer my-4" @click="()=>newMode=true">or create a new one</span>
            </div>


        </div>
        
        <form class="lg:mx-24 my-4" v-else>
            <div class="flex flex-col my-2">
                <label for="firstName" class="text-xs font-medium my-1">Full Name</label>
                <input v-model="payload.name" type="text" name="name" placeholder="Jane Kimweli" class="border border-gray-300 p-2 rounded-lg text-sm">
            </div>

            <div class="flex flex-col my-2">
                <label for="email" class="text-xs font-medium my-1">Email</label>
                <input v-model="payload.email" type="email" name="email" placeholder="John@doe.dot" class="border border-gray-300 p-2 rounded-lg text-sm">
            </div>

            <div class="flex flex-col my-2">
                <label for="phone" class="text-xs font-medium my-1">Phone Number</label>
                <input v-model="payload.phone" type="phone" name="phone" placeholder="+111000223344" class="border border-gray-300 p-2 rounded-lg text-sm">
            </div>


            <button type="submit" @click.prevent="submitForm" 
                class="w-full flex items-center justify-center py-2 px-3  mt-6 text-xs rounded-lg bg-[#292a5e] min-w-[150px] text-white font-medium hover:bg-gray-300 hover:text-[#292a5e] disabled:bg-gray-600 duration-300">
                <span v-if="!formLoading">Create New Transporter</span>
                <Loader v-else size="small" class="h-4 w-4"/>
            </button>

            <span class="text-xs text-blue-500 cursor-pointer my-4" @click="()=>newMode=false">or add from ist of available transporters</span>
        </form>
    </Modal>
</template>

<script setup>
import {ref, onMounted} from 'vue';
import { userStore } from '../../store';

const store = userStore()
const route = useRoute()

const { $axios } = useNuxtApp()

const emit = defineEmits(['close'])

const props = defineProps({
    customerID:{
        default:0
    }
})

const newMode = ref(false)
const transporters = ref([])


const formLoading = ref(false)

const attachPayload = ref({
    customerID:Number(route.params.ID), 
    transporterId:0
})
const payload  = ref({
    name:"",
    email:"",
    phone:""
})

async function assignTransporter(){
    formLoading.value = true
    const res = await $axios.post("/api/transporters/assign",attachPayload.value)
    formLoading.value = false
    // console.log(res)
    if(res.status==200 || 201){
        emit("close")
    }else{
        console.log(res.statusText)
    }
}

async function submitForm(){
    formLoading.value = true
    const res = await $axios.post("/api/transporters",{...payload.value})
    formLoading.value = false
    // console.log(res)
    if(res.status==200 || 201){
        emit("close")
    }else{
        console.log(res.statusText)
    }
}

async function getUnattachedTransporters(){
    const res = await $axios.get(`/api/customer-transporters/${props.customerID}`)
    formLoading.value = false
    // console.log(res)
    if(res.status==200 || 201){
        transporters.value = res.data
        // emit("close", res.data)
    }else{
        console.log(res.statusText)
    }
}

function close(){
    emit("close")
}

onMounted(async function(){
    await getUnattachedTransporters()
})

</script>