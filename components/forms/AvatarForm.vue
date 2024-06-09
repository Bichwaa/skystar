<template>
    <Modal @close-modal="close">
        <form class="relative p-6 w-96" ref="form" @submit.prevent="submitForm" enctype="multipart/form-data">
            <div class="flex flex-col my-2">
                <div class="grp flex flex-col  my-2">
                    <label for="email" class="text-xs font-medium">First name</label>
                    <input v-model="me.firstName" type="text" name="firstName" class=" border border-1 border-slate-400 rounded-md lg:h-8 w-full">
                </div>

                <div class="grp flex flex-col my-2 ">
                    <label for="email" class="text-xs font-medium">Last Name</label>
                    <input v-model="me.lastName" type="text" name="lastName" class=" border border-1 border-slate-400 rounded-md lg:h-8 w-full">
                </div>


                <div class="grp flex flex-col  my-2">
                    <label for="email" class="text-xs font-medium">Email</label>
                    <input v-model="me.email" type="email" name="email" class=" border border-1 border-slate-400 rounded-md lg:h-8 w-full">
                </div>

            </div>
            <div class="border-dotted border-2 border-gray-300 rounded-lg p-6 text-center">
            <svg class="w-16 h-16 mx-auto mb-4 text-[#292a5e]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 0 1 4-4h10a4 4 0 1 1 0 8H7a4 4 0 0 1-4-4z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11l-4-4-4 4"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15V3"></path>
            </svg>
            <input type="file" name="file" class="bg-[#292a5e] text-white py-2 px-4 rounded hover:bg-[#292a5e91] w-64"/>
            <p class="mt-4 text-gray-500">Or drop file here</p>
            </div>

            <div class="flex flex-col lg:mx-5">
                <button  type="submit" 
                class="flex items-center justify-center py-2 px-3  mt-6 text-xs rounded-lg bg-[#292a5e] min-w-[150px] text-white font-medium hover:bg-gray-300 hover:text-[#292a5e] disabled:bg-gray-600 duration-300">
                <span v-if="!formLoading">Update</span>
                <Loader v-else size="small" class="h-4 w-4"/>
            </button>
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

const form = ref(null)

const formLoading = ref(false)

const me = ref({
    firstName:"",
    lastName:'',
    email:''
})

const emit = defineEmits(['close'])


function close(){
    emit("close")
}

const user = computed(()=>{
    return store.user
  })


async function submitForm(){
    console.log("calling submit")
    formLoading.value = true

    const payload = new FormData(form.value)
    const res = await $axios.patch(`/api/users/full-update/${store.user.ID}`,payload)
    formLoading.value = false
    console.log(res)
    if(res.status==200 || 201){
        await store.getme()
        emit("close", res.data)
    }else{
        console.log(res.statusText)
    }
}

onMounted(()=>{
    me.value = store.user
})
</script>