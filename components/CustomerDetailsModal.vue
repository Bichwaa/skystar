<template>
    <Modal @close-modal="close">
        <div class="flex flex-col p-5 lg:mx-24 lg:mb-24">
            <h1 class="font-semibold text-lg Lg:text-xl my-5">Customer Deails</h1>

            <div class="role flex flex-col items-start mb-4">
                <h2 class="font-medium capitalize text-lg lg:text-xl">Name: {{customer?.fullName}}</h2>

                <div class="flex gap-4">
                    <span class="font-medium">Email: </span>
                    <span class="font-medium capitalize"> {{customer.email}} </span>
                </div>

                <div class="flex gap-4">
                    <span class="font-medium">Email: </span>
                    <span class="font-medium capitalize"> {{customer.phone}} </span>
                </div>

                <div class="flex gap-4">
                    <span class="font-medium">Filed by: </span>
                    <span class="font-medium capitalize"> {{ customer.AccountManager.firstName + " " + customer.AccountManager.lastName }} </span>
                </div>

                
            </div>

            <div class="role flex flex-col items-start">
                <span class="text-[#292a5e] text-sm mt-3 my-2 uppercase font-semibold"> Customer Consignment History  </span>

                <div class="perms flex flex-col items-start">
                    <table class="w-full divide-y divide-gray-200">
                <thead class="bg-gray-100">
                  <tr class="">
                    <th class="px-4 py-2 text-left">Consignee</th>
                    <th class="px-4 py-2 text-left">No. Containers</th>
                    <th class="px-4 py-2 text-left">Luggage</th>
                    <th class="px-4 py-2 text-left">Transport</th>
                    <th class="px-4 py-2 text-left">Destination</th>
                    <th class="px-4 py-2 text-left">Overseer</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in consignments" :key="item.id" @click="openConsignment(item.ID)" class="cursor-pointer hover:bg-yellow-100 duration-300">
                    <td class="px-4 py-2">{{ item.Consignee.fullName }}</td>
                    <td class="px-4 py-2">{{ item.cont10 + item.cont20 + item.cont40 }}</td>
                    <td class="px-4 py-2">{{ item.luggage }}</td>
                    <td class="px-4 py-2">{{ item.transport}}</td>
                    <td class="px-4 py-2">{{ item.destination }}</td>
                    <td class="px-4 py-2">
                      <span v-if="item.Overseer">{{ item.Overseer.firstName + " " + item.Overseer.lastName }}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
                </div>

            </div>
        </div>
    </Modal>
</template>

<script setup>
import {ref, onMounted} from "vue";
const { $axios } = useNuxtApp()

const props = defineProps({
    customer:{
        type:Object,
        default:{
            ID:0,
            fullName:"John Doent",
            consignments:10,
            email:"john@doe.com",
        }
    }
})

const consignments = ref([])

const emit = defineEmits(["close"])

function close(){
    emit("close")
}

async function getConsignments(){
  try {
    const response = await $axios.get(`/api/consignments/customer/${props.customer.ID}`);
    if(response.status === 200|201){
      consignments.value = response.data;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

function openConsignment(id){
    navigateTo(`/admin/consignments/${id}`)
}

onMounted(async ()=>{
 await getConsignments()
})

</script>