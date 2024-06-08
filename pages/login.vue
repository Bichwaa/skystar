<template>
    <div class="h-full grid place-items-center ">
        <form 
        @submit.prevent="submitForm" 
            class="form-card bg-[#F5F6F7] p-2 lg:p-16 rounded-lg">

            <div class="flex flex-col lg:flex-row gap-8 justify-center py-1">
                <div class="grp flex flex-col ">
                    <label for="email" class="text-xs font-medium">Email</label>
                    <input v-model="payload.email" type="email" name="email" class=" border border-1 border-slate-400 rounded-md lg:h-8 w-full">
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
    </div>
</template>

<script setup>
import { ref } from "vue";
const { $axios } = useNuxtApp()

import {userStore} from "../store"

const store = userStore()

const formLoading = ref(false)

const payload = ref({
    email:"",
    password:""
})


async function submitForm(){
    const res = await $axios.post("/api/user-login",payload.value)
    formLoading.value = false
    console.log(res.data)
    store.storeEmail(payload.value.email)
    store.storeTokens(res.data)
    await store.getme()
    store.persistState()
    navigateTo("/profile")
}
</script>