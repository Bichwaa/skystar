<template>
    <Modal @close-modal="close">
        
        <form 
            @submit.prevent="submitForm" 
            class="form-card bg-[#F5F6F7] p-2 lg:p-16 rounded-lg">
            <div class="flex flex-col items-center my-6">
                Change your password
            </div>

            <div class="flex flex-col lg:flex-row gap-8 justify-center py-1">
                
                <div class="grp flex flex-col ">
                    <label for="password" class="text-xs font-medium">Password</label>
                    <input v-model="payload.password" type="password" name="password1" class=" border border-1 border-slate-400 rounded-md lg:h-8 w-full">
                </div>
            </div>
            <div class="flex flex-col lg:flex-row gap-8 justify-center py-1">
                <div class="grp flex flex-col ">
                    <label for="password" class="text-xs font-medium">Confirm Password</label>
                    <input v-model="password2" type="password" name="password2" class=" border border-1 border-slate-400 rounded-md lg:h-8 w-full">
                </div>
            </div>

            <div class="flex flex-col lg:mx-5">
                <button  type="submit" 
                class="flex items-center justify-center py-2 px-3  mt-6 text-xs rounded-lg bg-[#292a5e] min-w-[150px] text-white font-medium hover:bg-gray-300 hover:text-[#292a5e] disabled:bg-gray-600 duration-300">
                <span v-if="!formLoading">Change password</span>
                <Loader v-else size="small" class="h-4 w-4"/>
            </button>
            </div>
        </form>
    </Modal>
</template>

<script setup>
import {ref, onMounted} from 'vue';
import { userStore } from '../../store';

const store = userStore()

const formLoading = ref(false)

const { $axios } = useNuxtApp()



const emit = defineEmits(['close'])

const password2 = ref("")

const payload  = ref({
    password:"",
})

function close(){
    emit("close")
}


async function submitForm(){
    console.log("calling submit")
    formLoading.value = true
    const res = await $axios.patch(`/api/users/update/${store.user.ID}`,{...payload.value})
    formLoading.value = false
    console.log(res)
    if(res.status==200 || 201){
        emit("close", res.data)
    }else{
        console.log(res.statusText)
    }
}

</script>