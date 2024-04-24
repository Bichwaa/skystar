<template>
    <Modal @close-modal="close">
        
        <form class="lg:m-24">
            <p class="font-medium flex items-center mb-3">Add new cashbook</p>
            <div class="flex flex-col my-2">
                <label for="limit" class="text-xs font-medium my-1">Limit </label>
                <input v-model="payload.limit" type="number" name="limit" placeholder="Jane Kimweli" class="border border-gray-300 p-2 rounded-lg text-sm">
            </div>

            <div class="flex flex-col my-4">
                <label for="email" class="text-sm font-medium my-1">Month</label>
                <select v-model="payload.period">
                    <option :value="`january-${year}`">January</option>
                    <option :value="`february-${year}`">February</option>
                    <option :value="`march-${year}`">March</option>
                    <option :value="`april-${year}`">April</option>
                    <option :value="`may-${year}`">May</option>
                    <option :value="`june-${year}`">June</option>
                    <option :value="`july-${year}`">July</option>
                    <option :value="`august-${year}`">August</option>
                    <option :value="`september-${year}`">September</option>
                    <option :value="`october-${year}`">October</option>
                    <option :value="`november-${year}`">November</option>
                    <option :value="`december-${year}`">Decemebr</option>
                </select>
            </div>

            <button  type="submit" @click.prevent="submitForm" 
                class="flex items-center justify-center py-2 px-3  mt-6 text-xs rounded-lg bg-[#292a5e] min-w-[150px] text-white font-medium hover:bg-gray-300 hover:text-[#292a5e] disabled:bg-gray-600 duration-300">
                <span v-if="!formLoading">Create Cashbook</span>
                <Loader v-else size="small" class="h-4 w-4"/>
            </button>
        </form>
    </Modal>
</template>


<script setup>
import {ref, onMounted} from 'vue';
// import { userStore } from '../../store';

const year = new Date().getFullYear()

const { $axios } = useNuxtApp()

// const store = userStore()

const props = defineProps({
    cashbookdata:{
        type:Object,
        default:{
    ID:0,
    limit: 1,
    period: "june",
  }
    }
})

const emit = defineEmits(['close'])

const formLoading = ref(false)

const payload  = ref({
    ID:props.cashbookdata.ID,
    limit: "",
    period: "",
  })

async function submitForm(){
    console.log("calling submit")
    formLoading.value = true
    const res = await $axios.patch(`/api/petty-cashbooks/update/${props.cashbookdata.ID}`,{...payload.value})
    formLoading.value = false
    console.log(res.data)
    if(res.status==200 || 201){
        emit("close", res.data)
    }else{
        console.log(res.statusText)
    }
}

function close(){
    emit("close")
}

onMounted(function(){
    if (props.cashbookdata.firstName!=""){
        payload.value = {...props.cashbookdata}
    }
})
</script>