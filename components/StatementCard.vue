,<template>
    <div class="rounded-2xl bg-white shadow-lg p-2 my-6 min-w-[300px]">
        <div class="flex gap-6">
            <div class="icon-wrapper">
                <NuxtImg :src="iconSource" width="100"/>
            </div>
            <div class="info-wrapper w-full">
                <div class="flex flex-col gap-4 w-full">
                    <span class="font-semibold text-sm" >
                       File: <br/> {{doc?.filename?.substring(15,doc?.filename?.length)}}
                    </span>
                    <span class="font-medium text-sm">
                        {{ new Date(doc.CreatedAt).toLocaleDateString('en-US',OPTIONS) }}
                    </span>
                </div>
            </div>
        </div>
        <div class="flex justify-between my-4 w-full">
            <span class="text-xs text-blue-500 cursor-pointer" :class="showPreview? '':'hidden'" @click="previewClicked">
                Preview
            </span>
            <span class="text-xs text-blue-500 cursor-pointer" :class="showDownload? '':'hidden'" @click="downloadClicked">
                Download
            </span>

            <span class="hidden text-xs text-[#d4af37] cursor-pointer" :class="showEdit? '':'hidden'" @click="editClicked">
                Edit
            </span>
            <span class="text-xs text-red-500 cursor-pointer" :class="showDelete? '':'hidden'" @click="deleteClicked">
                Delete
            </span>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    doc:{
        type:Object,
        default:{
            ID:1
        }
    },
    type:{
      type:String,
      default:"pdf"  
    },
    showEdit: {
        type: Boolean,
        default: false
    },
    showDownload: {
        type: Boolean,
        default: false
    },
    showDelete: {
        type: Boolean,
        default: false
    },
    showPreview: {
        type: Boolean,
        default: false
    }
})

const iconSource = computed(() => {
    switch (props.type) {
        case "pdf":
            return "/images/pdf-logo.png";
        case "xls":
            return "/images/xls.png";
        default:
            return "/images/pdf-logo.png";
    }
})

const OPTIONS = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
const emit = defineEmits(["preview, edit, delete", "download"]);

function previewClicked(){
    emit("preview",props.doc)
}


function editClicked(){
    emit("edit",props.doc)
}

function downloadClicked(){
    emit("download",props.doc)
}

function deleteClicked(){
    emit("delete",props.doc.ID)
}
</script>