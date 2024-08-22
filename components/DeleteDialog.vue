<template>
    <Modal @close-modal="close">
        <div class="flex flex-col gap-6 items-center ">
            <p class="text-center">
                Are you sure you want to delete this {{ entity }} ?
                <br/>
                this action is not reversible
            </p>

            <Loader v-if="loading" class="h-12 w-12"/>
            
            <div class="flex gap-4 items-center">
                <button 
                    class="flex items-center justify-center py-2 px-3 mt-3 text-xs rounded-lg bg-[#292a5e] min-w-[150px] text-white font-medium hover:bg-gray-300 hover:text-[#292a5e] disabled:bg-gray-600 duration-300"
                    @click="close"
                    >
                    No
                </button>

                <span class="text-red-600 cursor-pointer font-semibold" @click="proceed">Yes, Delete</span>
            </div>
        </div>
    </Modal>
</template>

<script setup>

const props = defineProps({
    entity:{
        type:String,
        default: "item"
    },
    loading:{
        type:Boolean,
        default:false
     }
})

const emit = defineEmits(['close'])

function close(){
    emit("close")
}

function proceed(){
    emit("proceed")
}

</Script>