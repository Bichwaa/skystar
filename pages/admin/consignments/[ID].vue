<template>
        <div class="flex flex-col p-5 lg:mx-24 lg:mb-24">
            <div class="grid place-items-center">
                <h1 class="font-semibold text-lg Lg:text-xl my-5">Consignment Details</h1>

            <div class="role flex flex-col items-start mb-4">
                <h2 class="font-medium capitalize text-lg lg:text-xl">Customer Name: {{consignment.Customer.fullName}}</h2>

                <div class="flex gap-4">
                    <span class="font-medium">Customer Email: </span>
                    <span class="font-medium capitalize"> {{consignment.Customer.email}} </span>
                </div>

                <div class="flex gap-4">
                    <span class="font-medium">Filed by: </span>
                    <span class="font-medium capitalize"> {{ consignment.Overseer.firstName + " " + consignment.Overseer.lastName }} </span>
                </div>

                
            </div>

            <div class="role flex flex-col items-start">
                <span class="text-[#292a5e] text-sm mt-3 my-2 uppercase font-semibold"> The Consignment  </span>

                <div class="perms flex flex-col items-start rounded-lg shadow-lg p-4 min-w-[500px]">
                    <div class="flex justify-between  w-full items-center my-2">
                        <div class="flex gap-4 items-center">
                            <IconsUserIcon class="w-5 h-5"/>
                            <span class="text-sm font-medium">Customer:</span>
                        </div>
                        <p>{{ consignment.Customer.fullName }}</p>
                    </div>

                    <div class="flex justify-between  w-full items-center my-2">
                        <div class="flex gap-4 items-center">
                            <IconsContainerIcon class="w-5 h-5" />
                            <span class="text-sm font-medium">Containers:</span>
                        </div>
                        <p>{{ consignment.cont10 + consignment.cont20 + consignment.cont40 }}</p>
                    </div>

                    <div class="flex justify-between  w-full items-center my-2">
                        <div class="flex gap-4 items-center">
                            <IconsDestinationIcon class="w-5 h-5" />
                            <span class="text-sm font-medium">Destination:</span>
                        </div>
                        <p>{{ consignment.destination }}</p>
                    </div>

                    <div class="flex justify-between  w-full items-center my-2">
                        <div class="flex gap-4 items-center">
                            <IconsShipIcon class="w-5 h-5" />
                            <span class="text-sm font-medium">Transport:</span>
                        </div>
                        <p>{{ consignment.transport }}</p>
                    </div>

                    <div class="flex justify-between  w-full items-center my-2">
                        <div class="flex gap-4 items-center">
                            <IconsLuggageIcon class="w-5 h-5" />
                            <span class="text-sm font-medium">Cargo:</span>
                        </div>
                        <p>{{ consignment.luggage }}</p>
                    </div>

                </div>

            </div>
            </div>
        </div>
</template>

<script setup>
import {ref, onMounted} from 'vue';

const { $axios } = useNuxtApp()

const route = useRoute()

const consignment = ref({
    ID:0,
    luggage: "",
    Customer: {},
    transport: "",
    destination: "",
    cont10: 0,
    cont20: 0,
    cont40: 0,
    Overseer: {}
  })

const emit = defineEmits(["close"])

function close(){
    emit("close")
}

async function getConsignment(){
  try {
    const response = await $axios.get(`/api/consignments/${route.params.ID}`);
    if(response.status === 200|201){
      consignment.value = response.data;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

onMounted(async ()=>{
    await getConsignment()
})
</script>