,<template>
    <div class="rounded-2xl bg-white shadow-lg p-4 my-6">
        <div class="flex gap-6">
            <div class="icon-wrapper">
                <NuxtImg src="/images/pdf-logo.svg" width="100"/>
            </div>
            <div class="info-wrapper w-full">
                <div class="flex flex-col gap-4 w-full">
                    <span class="font-semibold text-sm" >
                       INV: {{doc.invoiceNumber}}
                    </span>
                    <span class="font-medium text-sm">
                        {{ new Date(doc.CreatedAt).toLocaleDateString('en-US',OPTIONS) }}
                    </span>
                </div>
            </div>
        </div>
        <div class="flex justify-between my-4 w-full">
            <span class="text-xs text-blue-500 cursor-pointer" @click="previewClicked">
                Preview
            </span>
            <span class="text-xs text-blue-500 cursor-pointer">
                Download
            </span>

            <span class="text-xs text-[#d4af37] cursor-pointer" @click="editClicked">
                Edit
            </span>
            <span class="text-xs text-red-500 cursor-pointer" @click="deleteClicked">
                Delete
            </span>
        </div>
    </div>
</template>

<script setup>

const props = defineProps({
    doc:{
        type:Object,
        default:{
            ID:1
        }
    }
})

const OPTIONS = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
const emit = defineEmits(["preview"])

function previewClicked(){
    emit("preview",props.doc)
}


function editClicked(){
    emit("edit",props.doc)
}


function deleteClicked(){
    emit("delete",props.doc.ID)
}
</script>