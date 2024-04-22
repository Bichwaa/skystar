<template>
    <Modal @close-modal="close">
        
        <form class="lg:m-24">
            <p class="font-medium flex items-center mb-3">Create a new user role</p>
            <div class="flex flex-col my-2">
                <label for="roleName" class="text-xs font-medium my-1">Role Name</label>
                <input v-model="payload.name" type="text"  name="roleName" placeholder="Minstrel" class="border border-gray-300 p-2 rounded-lg text-sm">
            </div>

            <button  type="submit" @click.prevent="submitForm" 
                class="flex items-center justify-center py-2 px-3 mt-3 text-xs rounded-lg bg-[#292a5e] min-w-[150px] text-white font-medium hover:bg-gray-300 hover:text-[#292a5e] disabled:bg-gray-600 duration-300">
                <span v-if="!formLoading">Create Role</span>
                <Loader v-else size="small" class="h-4 w-4"/>
            </button>
        </form>
    </Modal>
</template>

<script setup>
import {ref} from 'vue';


const { $axios } = useNuxtApp()

const emit = defineEmits(['close'])

const formLoading = ref(false)

const payload  = ref({
    name:"",
})

async function submitForm(){
    console.log("calling submit")
    formLoading.value = true;
    const res = await $axios.post("/api/roles",{...payload.value});
    formLoading.value = false
    console.log(res)
    if(res.status==200 || 201){
        emit("close", res.data)
    }else{
        console.log(res.statusText)
    }
}

function close(){
    emit("close")
}


</script>