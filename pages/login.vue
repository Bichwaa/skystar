<template>
    <div class="h-full grid place-items-center ">
        <form 
        @submit.prevent="submitForm" 
            class="form-card bg-[#F5F6F7] p-2 lg:p-16 rounded-lg">

            <div class="flex flex-col lg:flex-row gap-8 justify-center py-1">
                <pre v-if="hasErrors" class="text-red-500">error: {{ errors.email }}</pre>
            </div>

            <div class="flex flex-col lg:flex-row gap-8 justify-center py-1">
                <div class="grp flex flex-col ">
                    <label for="email" class="text-xs font-medium">Email</label>
                    <input v-model="email" type="email" name="email" class=" border border-1 border-slate-400 rounded-md lg:h-8 w-full">
                </div>
            </div>

            <div class="flex flex-col lg:flex-row gap-8 justify-center py-1">
                <div class="grp flex flex-col ">
                    <label for="password" class="text-xs font-medium">Password</label>
                    <input v-model="payload.password" type="password" name="password" class=" border border-1 border-slate-400 rounded-md lg:h-8 w-full">
                </div>
            </div>

            <div class="flex flex-col lg:mx-5">
                <button  type="submit" 
                class="flex items-center justify-center py-2 px-3  mt-6 text-xs rounded-lg bg-[#292a5e] min-w-[150px] text-white font-medium hover:bg-gray-300 hover:text-[#292a5e] disabled:bg-gray-600 duration-300">
                <span v-if="!formLoading">login</span>
                <Loader v-else size="small" class="h-4 w-4"/>
            </button>
            </div>

            <div class="flex flex-col my-3">
            <div class="grid place-items-center">
                <p>Don't have an account? <nuxt-link to="/register" class="text-blue-500 my-2">Register</nuxt-link></p>
            </div>
            </div>
        </form>
        <Toast v-if="toastMessage" :message="toastMessage" :type="toastType" />
    </div>
</template>

<script setup>
import { ref, computed } from "vue";
const { $axios } = useNuxtApp()

import {userStore} from "../store"
import { useForm } from 'vee-validate';
import * as yup from 'yup';

const { values, errors, defineField } = useForm({
  validationSchema: yup.object({
    email: yup.string().email().required(),
  }),
});

const [email, emailAttrs] = defineField('email');

const toastMessage = ref('');
const toastType = ref('info');

function showToast(message, type = 'info') {
  toastMessage.value = message;
  toastType.value = type;

  setTimeout(() => {
    toastMessage.value = '';
  }, 7000); // Same duration as the Toast component's default duration
}


const store = userStore()

const formLoading = ref(false)

const payload = ref({
    email:"",
    password:""
})

const hasErrors = computed(() => {
    return Object.keys(errors.value).length > 0
});

async function submitForm(){
    if(Object.entries(errors.value).length<=0){
        payload.value.email =values.email
        try{
            const res = await $axios.post("/api/user-login",payload.value)
            if(res?.status==200 || 201){
                true
            }else{
                showToast(res)
            }
            formLoading.value = false
            store.storeEmail(payload.value.email)
            store.storeTokens(res.data)
            await store.getme()
            store.persistState()
            navigateTo("/profile")
        }catch(e){
            console.log(e)
            showToast(e, "error")
        }
        
    }else{
        //toast: cannot login with errors
        console.log(errors.value)
        showToast(`cannot login with errors: ${errors.value.email}`)
    }
    
}
</script>