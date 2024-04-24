<template>
    <Modal @close-modal="close">
        
        <form class="lg:m-24">
            <p class="font-medium flex items-center mb-3">Add new customer</p>
            <div class="flex flex-col my-2">
                <label for="firstName" class="text-xs font-medium my-1">Full Name</label>
                <input v-model="payload.fullName" type="text" name="fullName" placeholder="Jane Kimweli" class="border border-gray-300 p-2 rounded-lg text-sm">
            </div>

            <div class="flex flex-col my-2">
                <label for="email" class="text-xs font-medium my-1">Email</label>
                <input v-model="payload.email" type="email" name="email" placeholder="John@doe.dot" class="border border-gray-300 p-2 rounded-lg text-sm">
            </div>

            <div class="flex flex-col my-2">
                <label for="phone" class="text-xs font-medium my-1">Phone Number</label>
                <input v-model="payload.phone" type="phone" name="phone" placeholder="+111000223344" class="border border-gray-300 p-2 rounded-lg text-sm">
            </div>


            <button  type="submit" @click.prevent="submitForm" 
                class="flex items-center justify-center py-2 px-3  mt-6 text-xs rounded-lg bg-[#292a5e] min-w-[150px] text-white font-medium hover:bg-gray-300 hover:text-[#292a5e] disabled:bg-gray-600 duration-300">
                <span v-if="!formLoading">Create Customer</span>
                <Loader v-else size="small" class="h-4 w-4"/>
            </button>
        </form>
    </Modal>
</template>

<script setup>
import {ref} from 'vue';
import { userStore } from '../../store';

const store = userStore()

const { $axios } = useNuxtApp()

const emit = defineEmits(['close'])

const formLoading = ref(false)

const payload  = ref({
    fullName:"",
    accountmanagerId:store.user.ID,
    email:"",
    phone:""
})

async function submitForm(){
    console.log("calling submit")
    formLoading.value = true
    const res = await $axios.post("/api/customers",{...payload.value})
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

</script>