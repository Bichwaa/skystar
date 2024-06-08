<template>
    <Modal @close-modal="close">
        <form class="relative p-6 w-96" @submit="submitForm">
            <div class="border-dotted border-2 border-gray-300 rounded-lg p-6 text-center">
            <svg class="w-16 h-16 mx-auto mb-4 text-[#292a5e]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 0 1 4-4h10a4 4 0 1 1 0 8H7a4 4 0 0 1-4-4z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11l-4-4-4 4"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15V3"></path>
            </svg>
            <input type="file" class="bg-[#292a5e] text-white py-2 px-4 rounded hover:bg-[#292a5e91] w-64"/>
            <p class="mt-4 text-gray-500">Or drop file here</p>
            </div>
        </form>
    </Modal>
  </template>
  
  <script>
  export default {
    name: 'FileUploadDialog'
  }
  </script>
  
  <style scoped>
  /* Additional custom styles if needed */
  </style>
  

<script setup>
import {ref, onMounted} from 'vue';
import { userStore } from '../../store';

const store = userStore()

const { $axios } = useNuxtApp()



const emit = defineEmits(['close'])


function close(){
    emit("close")
}


async function submitForm(){
    console.log("calling submit")
    formLoading.value = true
    const res = await $axios.post("/api/revenue",{...payload.value})
    formLoading.value = false
    console.log(res)
    if(res.status==200 || 201){
        emit("close", res.data)
    }else{
        console.log(res.statusText)
    }
}

</script>