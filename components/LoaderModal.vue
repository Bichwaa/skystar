<template>
    <Modal @close-modal="close">
        <Loader class="w-12 h-12"/>
    </Modal>
</template>

<script setup>

const props = defineProps({
    staff:{
        type:Object,
        default:{
            firstName:"John",
            lastName:"Doe",
            email:"john@doe.com",
        }
    }
})

const emit = defineEmits(["close"])

function close(){
    emit("close")
}

</script>