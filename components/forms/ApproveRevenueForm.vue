<template>
<Modal @close-modal="close" class="w-full">
    <h2 class="text-xl text-center font-bold mb-6">Approve Revenue</h2>
    <form class="flex flex-col gap-6 items-center justify-center w-full" @submit.prevent="upload" ref="uploadForm" enctype="multipart/form-data">
    <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50">
        <div class="flex flex-col items-start justify-center pt-5 pb-6">
            
            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-medium">Requested by:</span> <br/> {{ revenue.Requested.firstName }}  {{ revenue.Requested.lastName }}</p>
            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-medium">Amount:</span> <br/> {{ revenue.amount }} ({{ revenue.currency }})</p>
            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-medium">Purpose:</span> <br/> {{ revenue.purpose }} </p>
            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-medium">Consignment:</span> <br/> {{ consignment?.bookingNumber }}</p>
        </div>
        <!-- <input id="dropzone-file" type="file" name="file" class="hidden" @change="(e) => filename = e.target.files[0].name"/> -->
    </label>

    <div class="grid place-items-center">
        <button class="bg-gray-800 text-white py-2 px-4 rounded hover:font-semibold duration-300">Approve</button>
    </div>

    <!-- <p v-if="uploadError" class="text-xs text-red-500">could not upload file. Make sure you select a file of size less than 10MB</p> -->
</form> 
</Modal>

</template>

<script setup>
import {ref, computed} from "vue";
import Modal from '../Modal.vue';
import {userStore} from "../../store";

const store = userStore();

const props = defineProps({
    revenue:{
        type:Object,
        default:{
            consignmentId:"",
            amount:0,
            currency:"USD",
            purpose:"",
            Requested:{},

        }
    },
    consignments:{
        type:Array,
        default:[]
    }
});

const consignment = computed(() =>{
     return props.consignments?.filter(consignment => consignment.ID == props.revenue.consignmentId)[0]
    })

const emit = defineEmits(["close"]);

const { $axios } = useNuxtApp();

function close(){
    emit("close")
}

const uploadForm = ref(null)

const uploadError = ref(false)

const loading = ref(false)

const filename = ref("No file selected")

async function upload(){
    loading.value = true;
    // const formdata = new FormData(uploadForm.value);
    try{
        const res = await $axios.patch(`/api/revenue/update/${props.revenue.ID}`,{approvedId:store.user.ID})
        loading.value = false;
        if(res?.status == 200 || 201){
            emit("close", res.data)
        }else{
            uploadError.value = true
            console.log(res?.statusText)
        }
    }catch(err){
        uploadError.value = true
    }
    
}

</script>