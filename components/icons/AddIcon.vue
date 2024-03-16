
<script setup>

const props = defineProps({
    currentColor:{
        type: String,
        default:"#3b82f6"
    }
})
</script>
<template>
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path :fill="currentColor" d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2z"/></svg>
</template>