<template>
    <div class="flex flex-wrap sm:flex-row gap-4">
      <div class="w-full lg:w-[60%]">
        <div class="mb-4">
          <div class="w-full rounded-2xl bg-white p-4 shadow-lg">
            <div class="flex flex-col py-5 px-3 lg:mx-2 lg:mb-24">
                <div class="w-full flex justify-between group">
                <h1 class="font-semibold text-lg Lg:text-xl ">Employee Details</h1>
                
                </div>

                <div class="role flex flex-col items-start mb-4">
                    <h2 class="font-medium capitalize text-lg lg:text-xl">Name: {{employee.firstName + " " + employee.lastName}}</h2>

                    <div class="flex gap-4">
                        <span class="font-medium">Email: </span>
                        <span class="font-medium capitalize"> {{employee.email}} </span>
                    </div>
                    
                </div>
                
                <div class="role flex flex-col items-start my-6">
                    <span class="text-[#292a5e] text-sm mt-3 my-2 uppercase font-semibold"> is Responsible for these consignments  </span>

                    <div class="perms flex flex-col items-start">
                      <table class="w-full divide-y divide-gray-200">
                        <thead class="bg-gray-100">
                          <tr class="">
                            <th class="px-4 py-2 text-left">Customer</th>
                            <th class="px-4 py-2 text-left">Booking No</th>
                            <th class="px-4 py-2 text-left">Mode of transport</th>
                            <th class="px-4 py-2 text-left">Port of Loading</th>
                            <th class="px-4 py-2 text-left">Port of Discharge</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="item in consignments" @click="openConsignment(item.ID)" :key="item.id" class="cursor-pointer hover:bg-yellow-100 duration-300">
                            <td class="px-4 py-2">{{ item.customer.fullName }}</td>
                            <td class="px-4 py-2">{{ item.bookingNumber }}</td>
                            <td class="px-4 py-2">{{ item.modeOfTransport }}</td>
                            <td class="px-4 py-2">{{ item.portOfLoading }}</td>
                            <td class="px-4 py-2">{{ item.destination }}</td>
                            
                          </tr>
                        </tbody>
                      </table>
                    </div>

                </div>
            </div>
          </div>
        </div>
      </div>
      <div class="w-full lg:w-[38%]">
        <div class="mb-4">
          <div class="w-full rounded-2xl bg-white p-4 shadow-lg">
            
            <div class="role flex flex-col items-start my-3">
              <div class="w-full flex justify-between group mb-4">
                <span class="text-[#292a5e] text-sm mt-3 my-2 uppercase font-semibold"> Employee's Roles:  </span>
                <button 
                  class="p-2 rounded-lg flex gap-4 items-center border border-gray-200 group-hover:bg-[#292a5e] duration-300"
                  @click="()=>showAssignRoleForm=true"
                  >
                    <IconsAddIcon class="h-5 w-5 cursor-pointer"  />
                    <span class="text-sm text-[#292a5e] group-hover:text-white duration-700">
                      Assign Employee Role
                    </span>
                </button>
              </div>

                <div class="perms flex flex-col items-start">

                    <ul class="max-w-md space-y-1 list-inside">
                        <li v-for="item in employee.Roles" :key="item.ID" class="flex items-center my-3">
                            <svg class="w-3.5 h-3.5 me-2 text-[#d4af37]  flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                            </svg>
                            <div class="flex items-center gap-6 justify-end min-w-[150px]">
                              <span class="text-sm">{{ item.name }}</span>
                              <span class="text-sm text-red-500 cursor-pointer font-medium capitalize" @click="unassignRole(item.name)">remove</span>
                            </div>
                        </li>
                    </ul>
                </div>

            </div>
            
          </div>
        </div>
        <div class="mb-4">
          <div class="w-full rounded-2xl bg-white p-4 shadow-lg">
           
            <div class="role flex flex-col items-start my-3">
              <div class="w-full flex justify-between group mb-4">
                <span class="text-[#292a5e] text-sm mt-3 my-2 uppercase font-semibold"> Employee's Permissions:  </span>
              </div>

                <div class="perms flex flex-col items-start">
                  <ul class="max-w-md space-y-1 list-inside grid grid-cols-2 lg:gap-x-12">
                        <li v-for="item in perms" :key="item.ID" class="flex items-center">
                            <svg class="w-3.5 h-3.5 me-2 text-[#292a5e]  flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                            </svg>
                            {{ item.name }}
                        </li>
                    </ul>
                </div>

            </div>

          </div>
        </div>
      </div>
      
      
      <FormsAssignRoleForm v-if="showAssignRoleForm" :employeeId="Number(route.params.ID)" @close="handleAssignRoleFormClosed"/>
    </div>
  </template>
  h
  
  <script setup>
import {ref, onMounted, computed} from "vue";
const { $axios } = useNuxtApp()

const route = useRoute()


const employee = ref({
  ID:0,
  Roles:[],
})

const showAssignRoleForm = ref(false)

const consignments = ref([])

const emit = defineEmits(["close"])

const perms = computed(()=>{
  let permissions = []
  const permNames = []
  const permSet = []
  employee.value.Roles.forEach((role)=>{
      permissions.push(role.Permissions)
      permissions = permissions.flat()
  })
  permissions.forEach((x)=>{
    if(!permNames.includes(x.name)){
      permNames.push(x.name)
      permSet.push(x)
    }
  })
  return permSet
}) 


async function getConsignments(){
  try {
    const response = await $axios.get(`/api/consignments/employee/${route.params.ID}`);
    if(response.status === 200|201){
      consignments.value = response.data;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}


async function getEmployee(){
  try {
    const response = await $axios.get(`/api/users/${route.params.ID}`);
    if(response.status === 200|201){
      employee.value = response.data;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}


  async function handleAssignRoleFormClosed(payload){
    showAssignRoleForm.value = false
    if(payload){
      await getEmployee()
    }
  }

  async function unassignRole(rolename){
    // formLoading.value = true
    const res = await $axios.post("/api/roles/unassign",{
      roleName:rolename,
      employeeId: Number(route.params.ID)
    })
    // formLoading.value = false
    console.log(res)
    if(res.status==200 || 201){
      await getEmployee()
    }else{
        console.log(res.statusText)
    }
  }

onMounted(async ()=>{
    await getEmployee()
    await getConsignments()
})

</script>