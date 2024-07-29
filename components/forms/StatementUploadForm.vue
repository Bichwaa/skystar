<template>
<Modal @close-modal="close" class="w-full">
    <form class="flex flex-col gap-6 items-center justify-center w-full" @submit.prevent="upload" ref="uploadForm" enctype="multipart/form-data">
    <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
        <div class="flex flex-col items-center justify-center pt-5 pb-6">
            <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
            </svg>
            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
            <p class="text-xs text-gray-500 dark:text-gray-400"> XSLS (MAX. 10MB)</p>
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-6">{{ filename }}</p>
        </div>
        <input id="dropzone-file" type="file" name="file" class="hidden" @change="(e) => filename = e.target.files[0].name"/>
    </label>

    <div class="grid place-items-center">
        <button class="bg-gray-800 text-white py-2 px-4 rounded hover:font-semibold duration-300">upload</button>
    </div>

    <p v-if="uploadError" class="text-xs text-red-500">could not upload file. Make sure you select a file of size less than 10MB</p>
</form> 
</Modal>

</template>

<script setup>
import {ref, computed} from "vue";
import Modal from '../Modal.vue';
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
    const formdata = new FormData(uploadForm.value);
    try{
        const res = await $axios.post("/api/statements", formdata);
        loading.value = false;
        if(res?.status == 200 || 201){
            emit("close")
        }else{
            uploadError.value = true
            console.log(res?.statusText)
        }
    }catch(err){
        uploadError.value = true
    }
    
}

</script>