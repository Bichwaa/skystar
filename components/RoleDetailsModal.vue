<template>
    <Modal @close-modal="close">
        <div class="flex gap-24 items-center p-5 lg:mx-16 lg:mb-24">
            <div class="left">
                <div class="role flex flex-col items-start">
                    <h2 class="font-medium capitalize text-lg lg:text-xl">Role name: {{role.name}}</h2>
                </div>

                <div class="role flex flex-col">
                    <span class="text-[#292a5e] my-6 text-sm">People with this role have the permissions to:</span>

                    <div class="perms flex flex-col items-start">

                        <div class="grid lg:grid-cols-2 xl:grid-cols-3 gap-x-20 gap-y-2">
                            <PermissionSwitch 
                                v-for="perm in availablePerms" 
                                :key="perm.ID" 
                                :permName="perm.name"
                                :state="roleHasPerm(perm.name)"
                                @update-role-perms="updateRolePermissions"
                            />
                        </div>

                        <div v-if="loading" class="grid place-items-center w-full">
                            <Loader  color="#292a5e" class="h-7 w-7"/>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    </Modal>
</template>

<script setup>
import {ref, onMounted, watch} from "vue";

const { $axios } = useNuxtApp()

const showAvailablePerms = ref(true)
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

const rolePerms = computed(()=>{
    return props.role.Permissions??[]
})

const permLength = computed(()=>{
   return availablePerms.value.length
})

function roleHasPerm(permission){
        const availablePermNames = rolePerms.value.map(i => i.name);
        // console.log(availablePermNames)
        return availablePermNames.includes(permission);
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


async function updateRolePermissions(data){
    // console.log(data, roleHasPerm(data.name))
    if(data.state){//meaning if role has permission
        await removePermission(data.name)
    }else{
        await addPermission(data.name)
    }
}



onMounted(async function(){
    const res = await $axios.get("/api/permissions")
    if(res.status==200 || 201){
        availablePerms.value = res.data
    }
})
</script>