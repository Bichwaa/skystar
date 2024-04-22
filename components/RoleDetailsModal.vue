<template>
    <Modal @close-modal="close">
        <div class="flex flex-col p-5 lg:mx-16 lg:mb-24">
            <div class="role flex flex-col items-start">
                <h2 class="font-medium capitalize text-lg lg:text-xl">Role name: {{role.name}}</h2>
            </div>

            <div class="role flex flex-col">
                <span class="text-[#292a5e] my-6 text-sm">People with this role have the permissions to:</span>

                <div class="perms flex flex-col items-start">
                    <div class="flex items-center justify-between w-full">
                        <!-- <span class="font-semibold text-xs text-[#292a5e]">status</span> -->
                        <span class="font-semibold text-xs text-[#292a5e] mr-10"> Permission</span>
                        <span class="font-semibold text-xs text-[#292a5e]"> Action </span>
                    </div>
                    <div v-for="perm in role.Permissions" :key="perm.name" class="flex items-center justify-between my-1 w-full">
                        <span class="font-medium text-sm text-start"> {{ perm.name }}</span>
                        <span class="text-red-600 text-xs font-medium cursor-pointer" @click="removePermission(perm.name, $event)">
                            - remove permission
                        </span>
                    </div>

                    <div v-if="loading" class="grid place-items-center w-full">
                        <Loader  color="#292a5e" class="h-7 w-7"/>
                    </div>
                </div>

            </div>

            <div class="flex gap-4 items-center mt-6 justify-between">
                <span class="text-[#292a5e] cursor-pointer text-sm font-medium my-6" @click="showAvailablePerms = !showAvailablePerms">Available permission(s)</span>
                <div v-if="!showAvailablePerms" @click="showAvailablePerms = true" class="flex gap-3">
                    <IconsShowIcon class="h-5 w-5"/>
                    <span class="text-[#d4af37] text-sm cursor-pointer font-medium">show</span>
                </div>
                <div v-else @click="showAvailablePerms = false" class="flex gap-3">
                    <IconsHideIcon class="h-5 w-5"/>
                    <span class="text-[#d4af37] text-sm cursor-pointer font-medium">hide</span>
                </div>
            </div>

            <form v-if="showAvailablePerms" class="perms flex flex-col items-start overflow-y-scroll max-h-[200px]">
                <div class="flex items-center justify-between w-full">
                    <span class="font-semibold text-xs text-[#292a5e] mr-10"> Permission</span>
                    <span class="font-semibold text-xs text-[#292a5e]"> Action </span>
                </div>

                <div v-for="i in availablePerms" :key="i.ID" class="flex items-center   justify-between  my-2 w-full">
                    <input class="rounded-full hidden" type="checkbox" >
                    <span class="font-medium text-sm  text-start"> {{ i.name }}</span>
                    <span class="text-green-600 text-xs font-medium cursor-pointer" @click="addPermission(i.name, $event)">
                        + add permission
                    </span>
                </div>
                <hr/>
            </form>
        </div>
    </Modal>
</template>

<script setup>
import {ref, onMounted, watch} from "vue";

const { $axios } = useNuxtApp()

const showAvailablePerms = ref(false)
const availablePerms = ref([])
const loading = ref(false)


const props = defineProps({
    role:{
        type:Object
    }
})

const emit = defineEmits(["close", "reloadRoles"])

function close(){
    emit("close")
}


async function addPermission(permName,$event){
    loading.value = true;
    const res = await $axios.post("/api/permissions/assign", {permName:permName, roleName:props.role.name}) 
    if(res.status == 200|201){
        loading.value = false
        emit("reloadRoles")
    }
}

async function removePermission(permName,$event){
    loading.value = true;
    const res = await $axios.post("/api/permissions/remove", {permName:permName, roleName:props.role.name}) 
    if(res.status == 200|201){
        loading.value = false
        emit("reloadRoles")
    }
}


onMounted(async function(){
    const res = await $axios.get("/api/permissions")
    if(res.status==200 || 201){
        availablePerms.value = res.data
    }
})
</script>