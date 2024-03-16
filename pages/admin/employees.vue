<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';

defineProps({
  title: {
    type: String,
    default: "",
  },
});
const staff = ref([]);
const roles = ref([]);

const currentDate = new Date();
const OPTIONS = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
const formattedDate = currentDate.toLocaleDateString('en-US',OPTIONS);

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:3006/api/users');
    staff.value = response.data;
    const roleResponse = await axios.get('http://localhost:3006/api/roles');
    roles.value = roleResponse.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    staff.value = null; // Set items to an empty array or handle error as needed
  }
});

</script>

<template>
  <div class="flex flex-wrap sm:flex-row gap-8">
    <div class="w-full sm:w-1/2 xl:w-1/3">
      <div class="mb-4">
        <div class="w-full rounded-2xl bg-white p-4 shadow-lg">
          <div class="mb-6 flex items-center justify-between">
            <div class="flex items-center">
              <span class="relative rounded-xl bg-blue-100 p-2">
              </span>
              <div class="flex flex-col">
                <span class="ml-2 font-bold text-black">
                  {{ title || "Employee roles" }}
                </span>
                <span class="ml-2 text-sm text-gray-500">Available roles</span>
              </div>
            </div>
            <div class="flex items-center">
              <button class="rounded-full border border-gray-200 p-1">
                <IconsAddIcon class="h-7 w-7"/>
              </button>
            </div>
          </div>
          <div class="m-auto block">
            <div class="flex flex-col gap-2">
              <div class="flex justify-between py-3 h-14 bg-gray-100"  v-for="role, i in roles">
                <p class="p-3 text-md capitalize flex items-center"> {{ role.name }}</p>
                <div class="flex gap-4 p-3 items-center">
                  <IconsPencilIcon class="w-6 h-6 cursor-pointer" :current-color="'#fbbf24'"/>
                <IconsDeleteIcon class="w-6 h-6 cursor-pointer"/>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mb-4">
        <div class="w-full rounded-2xl bg-white p-4 shadow-lg">
          <div class="mb-6 flex items-center justify-between">
            <div class="flex items-center">
              <span class="relative rounded-xl bg-blue-100 p-2">
              </span>
              <div class="flex flex-col">
                <span class="ml-2 font-bold text-black">Leaderboard</span>
                <span class="ml-2 text-sm text-gray-500">
                  Top Performers
                </span>
              </div>
            </div>
            
          </div>
          <div class="mb-4 flex items-center justify-between space-x-12">
            <span
              class="flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-semibold text-green-700"
            >
              {{ formattedDate }}
            </span>
          </div>
          <div class="m-auto block">
            <ul>
            <li class="my-6 flex items-center space-x-2" v-for="st,i in staff.slice(0,2)" :key="i">
              <a href="#" class="relative block">
                <img
                  alt="Maurice Lokumba"
                  src="/images/2.jpg"
                  class="mx-auto h-10 w-10 rounded-full object-cover"
                />
              </a>
              <div class="flex flex-col">
                <span class="ml-2 text-sm font-semibold text-gray-900">
                  {{ st.firstName }}
                </span>
                <span class="ml-2 text-sm text-gray-400">
                  {{ st.email }}
                </span>
              </div>
            </li>
            
          </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full sm:w-1/2 xl:w-1/3">
      <div class="mb-4">
        <div class="w-full rounded-2xl bg-white p-4 shadow-lg">
          <p class="font-bold text-black">Staff</p>
          <ul>
            <li class="my-6 flex items-center space-x-2" v-for="st,i in staff" :key="i">
              <a href="#" class="relative block">
                <img
                  alt="Maurice Lokumba"
                  src="/images/2.jpg"
                  class="mx-auto h-10 w-10 rounded-full object-cover"
                />
              </a>
              <div class="flex flex-col">
                <span class="ml-2 text-sm font-semibold text-gray-900">
                  {{ st.firstName }}
                </span>
                <span class="ml-2 text-sm text-gray-400">
                  {{ st.email }}
                </span>
              </div>
            </li>
            
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
