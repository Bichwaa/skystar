<template>
    <Modal @close-modal="close">
        <div class="flex flex-col p-5 lg:mx-24 lg:mb-24">
            <h1 class="font-semibold text-lg Lg:text-xl my-5">Customer Deails</h1>

            <div class="role flex flex-col items-start mb-4">
                <h2 class="font-medium capitalize text-lg lg:text-xl">Name: {{customer.fullName}}</h2>

                <div class="flex gap-4">
                    <span class="font-medium">Email: </span>
                    <span class="font-medium capitalize"> {{customer.email}} </span>
                </div>

                <div class="flex gap-4">
                    <span class="font-medium">Filed by: </span>
                    <span class="font-medium capitalize"> Jason Mraz </span>
                </div>

                
            </div>

            <div class="role flex flex-col items-start">
                <span class="text-[#292a5e] text-sm mt-3 my-2 uppercase"> Customer history  </span>

                <div class="perms flex flex-col items-start">
                    <table class="w-full divide-y divide-gray-200">
                        <thead class="bg-gray-100">
                            <tr class="">
                                <th class="px-4 py-2 text-left">Full Name</th>
                                <th class="px-4 py-2 text-left">Email</th>
                                <th class="px-4 py-2 text-left">Consignments</th>
                                <th class="px-4 py-2 text-left">File Manager</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in 10" :key="item">
                                <td class="px-4 py-2">Detail {{ item }}</td>
                                <td class="px-4 py-2">Detail {{ item }}</td>
                                <td class="px-4 py-2">Detail {{ item }}</td>
                                <td class="px-4 py-2">Detail {{ item }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    </Modal>
</template>

<script setup>

const props = defineProps({
    customer:{
        type:Object,
        default:{
            fullName:"John Doent",
            consignments:10,
            email:"john@doe.com",
        }
    }
})

const emit = defineEmits(["close"])

function close(){
    emit("close")
}

</script>