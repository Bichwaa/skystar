<template>
    <Modal @close-modal="close">
        <div class="flex flex-col p-5 lg:mx-24 lg:mb-24">
            <div class="role flex flex-col items-start">
                <h2 class="font-medium capitalize text-lg lg:text-xl">Role name: {{role.name}}</h2>
            </div>

            <div class="role flex flex-col items-start">
                <span class="text-[#292a5e] text-sm mt-3 mb-1">People with this role have the permission to:</span>

                <div class="perms flex flex-col items-start">
                    <div v-for="i in 5" :key="i" class="flex gap-3 items-center p-2 my-1">
                        <input class="rounded-full" type="checkbox" checked >
                        <span class="font-medium text-sm"> permission {{ i }}</span>
                        <span class="text-red-600 text-xs font-medium cursor-pointer">
                            remove
                        </span>
                    </div>
                </div>

            </div>

            <span class="text-[#d4af37] cursor-pointer my-6 text-sm font-medium">+ Add permission(s)</span>
        </div>
    </Modal>
</template>

<script setup>

const props = defineProps({
    role:{
        type:Object
    }
})

const emit = defineEmits(["close"])

function close(){
    emit("close")
}

</script>