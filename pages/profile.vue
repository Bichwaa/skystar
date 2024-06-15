<template>
    <div class="flex flex-wrap sm:flex-row gap-8">
      <div class="w-full">
        <div class="mb-4">
          <div class="w-full rounded-2xl bg-white p-4 shadow-lg">
          
            <div class="flex justify-center items-center min-h-screen bg-gradient-to-b from-[#292a5ea8] to-white">
                <div class="bg-white rounded-xl shadow-lg p-6 w-80">
                <button class="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
                <div class="flex flex-col items-center">
                    <img 
                        class="w-24 h-24 rounded-full border-2 border-white my-1 cursor-pointer" 
                        :src="user.avatar!=undefined ? $axios.getUri() + user?.avatar?.substring(1) : $axios.getUri() + '/uploads/pfp.avif'" 
                        lazy
                        alt="Profile Image"
                        @click="()=>showAvatarForm=true"
                        >

                    <h2 class="mt-4 text-lg font-semibold">{{ me.firstName }} {{ me.lastName }}</h2>
                    <p class="text-sm text-gray-500 text-center">Email:</p>
                    <p class="text-sm text-gray-500"> {{ me.email }}</p>
                </div>

                <div class="flex flex-wrap gap-1 items-center my-1">
                   <span class="text-sm text-gray-500 basis-full text-center">Roles: </span>  
                   <span class="text-sm text-gray-500"  v-for="role in user.Roles">{{ role.name + "," }}</span>
                </div>
                <div class="flex flex-col items-center mt-4 text-blue-500">
                    <!-- <a href="#" class="hover:underline">Control Panel</a>
                    <span>&bull;</span> -->
                    <span class="text-blue-500 hover:underline my-1 cursor-pointer" @click="()=>showChangePWordForm=true">Change password</span>
                </div>
                <div class="flex flex-cil items-center mt-4">
                    <button class="flex-1 ml-2 py-2 px-4 bg-gray-100 rounded-lg hover:bg-gray-200">Logout</button>
                </div>
                </div>
            </div>
          </div>
        </div>
      </div>
      <FormsChangePassWordForm v-if="showChangePWordForm" @close="()=>showChangePWordForm=false" />
      <FormsAvatarForm v-if="showAvatarForm" @close="()=>showAvatarForm=false" />
      </div>
  </template>
  
  <script setup>
  import { ref, onMounted, computed } from 'vue';
  import {userStore} from "../store"

const store = userStore()
  
  const { $axios } = useNuxtApp()
  
  const me = ref(store.user);
  
  const showChangePWordForm = ref(false)
  const showAvatarForm = ref(false)
  const user = computed(()=>{
    console.log()
    return store.user
  })
  

//   onMounted(async () => {
//     try {
//       const response = await $axios.post('/api/users/me', {email:store.user.email});
//       if(response.status==200 || 201){
//       me.value = response.data;
//       }
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   });
  
  </script>