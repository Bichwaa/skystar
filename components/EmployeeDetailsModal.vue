<template>
    <Modal @close-modal="close">
        <div class="flex flex-col p-5 lg:mx-24 lg:mb-24">
            <div class="role flex flex-col items-start">
                <h2 class="font-medium capitalize text-lg lg:text-xl">Name: {{staff.firstName + " " + staff.lastName}}</h2>
                <div class="flex gap-4">
                    <span class="font-medium">Roles: </span>
                    <span class="font-medium capitalize">Employee, </span>
                </div>

                <div class="flex gap-4">
                    <span class="font-medium">Email: </span>
                    <span class="font-medium capitalize"> {{staff.email}} </span>
                </div>
            </div>

            <div class="role flex flex-col items-start">
                <span class="text-[#292a5e] text-sm mt-3 mb-1">{{}} is responsible for these consignments:</span>

                <div class="perms flex flex-col items-start">
                    <div v-for="i in 5" :key="i" class="flex gap-3 items-center p-2 my-1">
                        <span class="font-medium text-sm"> Consignment {{ i }}</span>
                        <span class="text-red-600 text-xs font-medium cursor-pointer">
                            remove
                        </span>
                    </div>
                </div>

            </div>

            <!-- <span class="text-[#d4af37] cursor-pointer my-6 text-sm font-medium">+ Add permission(s)</span> -->
        </div>
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