<template>
    <Modal @close-modal="close">
        
        <form class="lg:m-24">
            <p class="font-medium flex items-center mb-3">Update employee data</p>
            <div class="flex flex-col my-2">
                <label for="firstName" class="text-xs font-medium my-1">First Name</label>
                <input v-model="payload.firstName" type="text" name="firstName" placeholder="Jane" class="border border-gray-300 p-2 rounded-lg text-sm">
            </div>

            <div class="flex flex-col my-2">
                <label for="lastName" class="text-xs font-medium my-1">Last Name</label>
                <input v-model="payload.lastName" type="text" name="lastName" placeholder="Doe" class="border border-gray-300 p-2 rounded-lg text-sm">
            </div>

            <div class="flex flex-col my-2">
                <label for="email" class="text-xs font-medium my-1">Email</label>
                <input v-model="payload.email" type="email" name="email" placeholder="John@doe.dot" class="border border-gray-300 p-2 rounded-lg text-sm">
            </div>

            <div class="flex items-center my-2">
                <span class="font-medium text-xs text-[#d4af37]" >All new employees have the password <span class="font-bold" >Employee00</span> </span>
            </div>

            <button  type="submit" @click.prevent="submitForm" 
                class="flex items-center justify-center py-2 px-3 mt-3 text-xs rounded-lg bg-[#292a5e] min-w-[150px] text-white font-medium hover:bg-gray-300 hover:text-[#292a5e] disabled:bg-gray-600 duration-300">
                <span v-if="!formLoading">Create Employee</span>
                <Loader v-else size="small" class="h-4 w-4"/>
            </button>
        </form>
    </Modal>
</template>

<script setup>
import {ref, onMounted} from 'vue';

const { $axios } = useNuxtApp()
const props = defineProps({
    userdata:{
        type:Object,
        default:{
            ID:"",
            firstName:"",
            lastName:"",
            email:""
        }
    }
})

const emit = defineEmits(['close'])

const formLoading = ref(false)

const payload  = ref({
    firstName:"",
    lastName:"",
    email:""
})

async function submitForm(){
    console.log("calling submit")
    formLoading.value = true
    const res = await $axios.patch(`/api/users/update/${props.userdata.ID}`,{...payload.value})
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

onMounted(function(){
    if (props.userdata.firstName!=""){
        payload.value = {...props.userdata}
    }
})
</script>