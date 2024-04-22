<template>
    <Modal @close-modal="close">
        
        <form class="lg:m-24">
            <p class="font-medium flex items-center mb-3">Update customer data</p>
            <div class="flex flex-col my-2">
                <label for="firstName" class="text-xs font-medium my-1">Full Name</label>
                <input v-model="payload.fullName" type="text" name="fullName" placeholder="Jane" class="border border-gray-300 p-2 rounded-lg text-sm">
            </div>

            <div class="flex flex-col my-2">
                <label for="email" class="text-xs font-medium my-1">Email</label>
                <input v-model="payload.email" type="email" name="email" placeholder="John@doe.dot" class="border border-gray-300 p-2 rounded-lg text-sm">
            </div>

            <div class="flex flex-col my-4">
                <label for="email" class="text-xs font-medium my-1">Filed by</label>
                <select>
                    <option value="John">John</option>
                    <option value="Jane">Jane</option>
                    <option value="Bob">Bob</option>
                    <option value="Alice">Alice</option>
                    <option value="Mike">Mike</option>
                    <option value="Sarah">Sarah</option>
                    <option value="Tom">Tom</option>
                    <option value="Emily">Emily</option>
                    <option value="David">David</option>
                    <option value="Samantha">Samantha</option>
                </select>
            </div>


            <button  type="submit" @click.prevent="submitForm" 
                class="flex items-center justify-center py-2 px-3  mt-6 text-xs rounded-lg bg-[#292a5e] min-w-[150px] text-white font-medium hover:bg-gray-300 hover:text-[#292a5e] disabled:bg-gray-600 duration-300">
                <span v-if="!formLoading">Update Customer</span>
                <Loader v-else size="small" class="h-4 w-4"/>
            </button>
        </form>
    </Modal>
</template>

<script setup>
import {ref, onMounted} from 'vue';

const { $axios } = useNuxtApp()

const props = defineProps({
    customerdata:{
        type:Object,
        default:{
            ID:"",
            fullName:"",
            accountmanager:"",
            email:""
        }
    }
})

const emit = defineEmits(['close'])

const formLoading = ref(false)

const payload  = ref({
    fullName:"",
    accountmanager:"",
    email:""
})

async function submitForm(){
    console.log("calling submit")
    formLoading.value = true
    const res = await $axios.patch(`/api/customers/update/${props.customerdata.ID}`,{...payload.value})
    formLoading.value = false
    console.log(res.data)
    if(res.status==200 || 201){
        emit("close", res.data)
    }else{
        console.log(res.statusText)
    }
}

function close(){
    emit("close")
}

onMounted(function(){
    if (props.customerdata.firstName!=""){
        payload.value = {...props.customerdata}
    }
})
</script>