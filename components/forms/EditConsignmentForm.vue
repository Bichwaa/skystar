<template>
    <Modal @close-modal="close">
        
        <form class="lg:m-12">
            <p class="font-semibold flex items-center mb-3">Update consignment data</p>
            <div class="flex flex-col my-4">
                <label for="email" class="text-sm font-medium my-1">Filed by</label>
                <select v-model="payload.consigneeId">
                    <option v-for="cus in customers" :value="cus.ID">{{ cus.fullName }}</option>
                </select>
            </div>
            
            <div class="flex items-center gap-4">
                <div class="flex flex-col my-2">
                    <label for="luggage" class="text-sm font-medium my-1">Luggage</label>
                    <input v-model="payload.luggage" type="text" name="luggage" placeholder="Cargo pants" class="border border-gray-300 p-2 rounded-lg text-sm">
                </div>

                <div class="flex flex-col my-2">
                    <label for="consigneeName" class="text-sm font-medium my-1">Shipper</label>
                    <input v-model="payload.transport" type="text" name="transport" placeholder="Maersk" class="border border-gray-300 p-2 rounded-lg text-sm">
                </div>
                
            </div>

            
            <div class="flex items-center gap-4">
                <div class="flex flex-col my-2">
                    <label for="consigneeName" class="text-sm font-medium my-1">Destination</label>
                    <input v-model="payload.destination" type="text" name="destination" placeholder="Mombasa" class="border border-gray-300 p-2 rounded-lg text-sm">
                </div>

                <div class="flex flex-col my-2">
                <label for="consigneeName" class="text-sm font-medium my-1">10FT Containers</label>
                <input v-model="payload.cont10" type="number" name="cont10" placeholder="0" class="border border-gray-300 p-2 rounded-lg text-sm">
            </div>

            </div>
            

            <div class="flex items-center gap-4">
                <div class="flex flex-col my-2">
                    <label for="consigneeName" class="text-sm font-medium my-1">20FT Containers</label>
                    <input v-model="payload.cont20" type="number" name="cont20" placeholder="0" class="border border-gray-300 p-2 rounded-lg text-sm">
                </div>

                <div class="flex flex-col my-2">
                    <label for="consigneeName" class="text-sm font-medium my-1">40FT Containers</label>
                    <input v-model="payload.cont40" type="number" name="cont40" placeholder="0" class="border border-gray-300 p-2 rounded-lg text-sm">
                </div>
            </div>

            <button  type="submit" @click.prevent="submitForm" 
                class="flex items-center justify-center py-2 px-3  mt-6 text-xs rounded-lg bg-[#292a5e] min-w-[150px] text-whiem font-medium hover:bg-gray-300 hover:text-[#292a5e] disabled:bg-gray-600 duration-300">
                <span v-if="!formLoading" class="text-white font-medium">Update Consignment</span>
                <Loader v-else size="small" class="h-4 w-4"/>
            </button>
        </form>
    </Modal>
</template>

<script setup>
import {ref, onMounted} from 'vue';
import { userStore } from '../../store';

const { $axios } = useNuxtApp()

const store = userStore()

const props = defineProps({
    consignmentdata:{
        type:Object,
        default:{
    ID:0,
    luggage: "a lot",
    consignee: {},
    transport: "some vehicle",
    destination: "Somewhere",
    cont10: 3,
    cont20: 2,
    cont40: 0,
    overseerId: 0
  }
    }
})

const emit = defineEmits(['close'])

const formLoading = ref(false)

const customers = ref([])

const payload  = ref({
    ID:props.consignmentdata.ID,
    luggage: props.consignmentdata.luggage,
    consigneeId: props.consignmentdata.consigneeId,
    transport: props.consignmentdata.transport,
    destination: props.consignmentdata.destination,
    cont10: props.consignmentdata.cont10,
    cont20: props.consignmentdata.cont20,
    cont40: props.consignmentdata.cont40,
    overseerId: store.user.ID
  })

async function submitForm(){
    console.log("calling submit")
    formLoading.value = true
    const res = await $axios.patch(`/api/consignments/update/${props.consignmentdata.ID}`,{...payload.value})
    formLoading.value = false
    console.log(res.data)
    if(res.status==200 || 201){
        emit("close", res.data)
    }else{
        console.log(res.statusText)
    }
}

async function getCustomers(){
    try{
        const res = await $axios.get("api/customers")
        if(res.status==200 || 201){
            customers.value = res.data
        }else{
            console.log(res.statusText)
        }
    }catch(e){
        throw e
    }
}

function close(){
    emit("close")
}

onMounted(async function(){

    await getCustomers()
})
</script>