<template>
  <div class="flex flex-wrap sm:flex-row gap-4">
    <div class="w-full lg:w-3/5">
      <div class="mb-4">
        <div class="w-full rounded-2xl bg-white p-4 shadow-lg">
          <div class="flex items-center justify-between group">
            <p class="font-bold text-black">Staff</p>
            <button class="p-2 rounded-lg flex gap-4 items-center border border-gray-200 grouphover:bg-[#292a5e] duration-300" @click="showCreateEmployeeForm=true">
                <IconsAddIcon class="h-6 w-6" />
                <span class="text-sm text-[#292a5e] hover:text-white duration-700">
                  Employee
                </span>
              </button>
          </div>
          
          <ul>
            <li class="my-6 flex items-center justify-between space-x-2" v-for="st,i in staff" :key="i">
              <a href="#" class="relative flex gap-8">
                <img
                  alt="profile photo"
                  :src="st.avatar ? $axios.getUri() + st.avatar.substring(1): $axios.getUri() + '/uploads/pfp.avif'"
                  class="mx-auto h-10 w-10 rounded-full object-cover"
                />

                <div class="flex flex-col">
                <span class="ml-2 text-sm font-semibold text-gray-900">
                  {{ st.firstName }} {{ st.lastName }}
                </span>
                <span class="ml-2 text-sm text-gray-400">
                  {{ st.email }}
                </span>
              </div>


              </a>
              

              <div class="flex gap-4 items-center justify-self-end">
                <span 
                    class="text-[#292a5e] text-sm font-medium hover:font-semibold duration-300 cursor-pointer"
                    @click="viewEmployeeClicked(st)"
                    >View</span>

                <span class="text-[#d4af37] text-sm font-medium hover:font-semibold duration-300 cursor-pointer"
                  @click="loadEditEmployeeForm(st)">
                  Edit
                </span>

                <span class="text-red-600 text-sm font-medium hover:font-semibold duration-300 cursor-pointer" 
                  @click="loadDeleteEmployeeDialog(st.ID)"
                  >Delete</span>
              </div>
            </li>
            
          </ul>
        </div>
      </div>
    </div>
    <div class="w-full lg:w-1/3">
      <div class="mb-4">
        <div class="w-full rounded-2xl bg-white p-4 shadow-lg">
          <div class="mb-6 flex items-center justify-between">
            <div class="flex items-center">
              <span class="relative rounded-xl bg-blue-100 p-2">
              </span>
              <div class="flex flex-col">
                <span class="ml-2 font-bold text-black">
                  {{ title || "Employee roles" }}
                </span>
                <span class="ml-2 text-sm text-gray-500">Available roles</span>
              </div>
            </div>
            <div class="flex items-center group">
              <DropDowner class="inline-flex flex-col gap-3">
                  <div class="flex flex-col gap-3">
                    <button class="p-2 rounded-lg flex gap-4 items-center border border-gray-200 hover:bg-[#292a5e] duration-300 w-full"  @click="showCreateRoleForm=true">
                      <IconsAddIcon class="h-7 w-7 cursor-pointer" />
                      <span class="text-sm text-[#292a5e] hover:text-white duration-700">
                        New Role
                      </span>
                    </button>

                    <button 
                      class="p-2 rounded-lg flex gap-4 items-center border border-gray-200 hover:bg-[#292a5e] duration-300"
                      @click="()=>showAssignRoleForm=true"
                      >
                        <IconsAddIcon class="h-5 w-5 cursor-pointer"  />
                        <span class="text-sm text-[#292a5e] hover:text-white duration-700">
                        Assign Employee Role
                        </span>
                    </button>
                  </div>
                </DropDowner>
              
            </div>
          </div>
          <div class="m-auto block">
            <div class="flex flex-col gap-2">
              <div class="flex justify-between py-3 h-14 bg-gray-100"  v-for="role, i in roles">
                <p class="p-3 text-md capitalize flex items-center"> {{ role.name }}</p>
                <div class="flex gap-4 p-3 items-center">
                  <span 
                    class="text-[#292a5e] text-sm font-medium hover:font-semibold duration-300 cursor-pointer"
                    @click="viewRoleClicked(role)"
                    >View</span>

                  <span 
                    class="text-[#d4af37] text-sm font-medium hover:font-semibold duration-300 cursor-pointer"
                    @click="loadEditRoleForm(role)"
                    >Edit</span>
                  <span 
                    class="text-red-600 text-sm font-medium hover:font-semibold duration-300 cursor-pointer" 
                    @click="loadDeleteRoleDialog(role.name)"
                    >Delete</span>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mb-4">
        <div class="w-full rounded-2xl bg-white p-4 shadow-lg">
          <div class="mb-6 flex items-center justify-between">
            <div class="flex items-center">
              <span class="relative rounded-xl bg-blue-100 p-2">
              </span>
              <div class="flex flex-col">
                <span class="ml-2 font-bold text-black">Leaderboard</span>
                <span class="ml-2 text-sm text-gray-500">
                  Top Performers
                </span>
              </div>
            </div>
            
          </div>
          <div class="mb-4 flex items-center justify-between space-x-12">
            <span
              class="flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-semibold text-green-700"
            >
              {{ formattedDate }}
            </span>
          </div>
          <div class="m-auto block">
            <ul>
            <li class="my-6 flex items-center space-x-2" v-for="st,i in staff.slice(0,2)" :key="i">
              <a href="#" class="relative block">
                <img
                  alt="Maurice Lokumba"
                  :src="st.avatar ? $axios.getUri() + st.avatar.substring(1): $axios.getUri() + '/uploads/pfp.avif'"
                  class="mx-auto h-10 w-10 rounded-full object-cover"
                />
              </a>
              <div class="flex flex-col">
                <span class="ml-2 text-sm font-semibold text-gray-900">
                  {{ st.firstName }}
                </span>
                <span class="ml-2 text-sm text-gray-400">
                  {{ st.email }}
                </span>
              </div>
            </li>
            
          </ul>
          </div>
        </div>
      </div>
    </div>
    
    <CreateEmployeeForm v-if="showCreateEmployeeForm" @close="handleformClosed"/>
    <FormsEditEmployeeForm v-if="showEditEmployeeForm" :userdata="employeeToEdit" @close="handleEditformClosed"/>
    <FormsCreateRoleForm v-if="showCreateRoleForm" @close="handleCreateRoleFormClosed" />
    <FormsEditRoleForm v-if="showEditRoleForm" :roledata="roleToEdit" @close="handleEditRoleformClosed" />
    <DeleteDialog v-if="showEmployeeDeleteDialog" entity="employee" :loading="deleteInProgress" @proceed="deleteEmployee" @close="showEmployeeDeleteDialog=false"/>
    <DeleteDialog v-if="showRoleDeleteDialog" entity="role" :loading="deleteInProgress" @proceed="deleteRole" @close="showRoleDeleteDialog=false"/>
    <FormsAssignRoleForm v-if="showAssignRoleForm"  @close="handleAssignRoleFormClosed"/>
    <RoleDetailsModal v-if="showRoleDetails" :role="currentRole" @close="showRoleDetails=false" @reload-roles="loadRoles" :key="fakeKey"/>
    <EmployeeDetailsModal v-if="showEmployeeDetails" :staff="currentEmployee" @close="showEmployeeDetails=false"/>
  </div>
</template>
h

<script setup>
import { ref, onMounted, watch, onUpdated } from 'vue';

definePageMeta({
    middleware: 'permissions',
    permissions: ['can-read-users']
  });

const { $axios } = useNuxtApp()

defineProps({
  title: {
    type: String,
    default: "",
  },
});
const staff = ref([]);
const roles = ref([]);

//form & crud related
const showCreateEmployeeForm = ref(false)
const showAssignRoleForm = ref(false)
const showEditEmployeeForm = ref(false)
const employeeToEdit = ref({})
const showEmployeeDeleteDialog = ref(false)
const employeeToDelete = ref(0)
const deleteInProgress = ref(false)
const showCreateRoleForm = ref(false)
const showEditRoleForm = ref(false)
const roleToEdit = ref({})
const showRoleDeleteDialog = ref(false)
const roleToDelete = ref("")
const showRoleDetails = ref(false)
const currentRole = ref({})
const showEmployeeDetails = ref(false)
const currentEmployee = ref({})
const fakeKey = ref(1)

const currentDate = new Date();
const OPTIONS = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
const formattedDate = currentDate.toLocaleDateString('en-US',OPTIONS);

function handleformClosed(payload){
  showCreateEmployeeForm.value=false;
  if(payload!=undefined){
  console.log("the payload",payload)
  staff.value.push(payload)
  }
}

function loadEditEmployeeForm(employeedata){
  employeeToEdit.value = employeedata
  showEditEmployeeForm.value=true
}

function handleEditformClosed(payload){
  showEditEmployeeForm.value=false;
  if(payload!=undefined){
  console.log("the payload",payload)
  staff.value = staff.value.map(x=>{
    if(x.ID==payload.ID){
      return payload
    }else{
      return x
    }
  })
  }
}

async function handleAssignRoleFormClosed(){
  showAssignRoleForm.value = false
    if(payload){
      await getEmployees()
    }
}

function loadDeleteEmployeeDialog(employeeID){
  employeeToDelete.value = employeeID
  showEmployeeDeleteDialog.value = true
}

async function loadRoles(){
  const roleResponse = await $axios.get('/api/roles');
    if(roleResponse.status==200 || 201){
    roles.value = roleResponse.data;
    }
    try{
      if(currentRole.value.name!=""){
      currentRole.value = roles.value.find(x=>x.name==currentRole.value.name)
      // fakeKey.value += 1
      console.log("changed Current role")
    }
    }catch(err){
      console.log(err.message)
    }
}

async function deleteEmployee(){
  deleteInProgress.value = true
  const res = await $axios.delete(`/api/users/delete/${employeeToDelete.value}`);
  console.log(res)
  if(res.status==200 || 201){
      deleteInProgress.value = false
      //remove employee from client state
      staff.value  = staff.value.filter(x=>{
        return x.ID!==employeeToDelete.value
      })
      showEmployeeDeleteDialog.value = false;
  }else{
      console.log(res.statusText)
  }
}

async function deleteRole(){
  deleteInProgress.value = true
  const res = await $axios.delete(`/api/roles/delete/${roleToDelete.value}`);
  console.log(res)
  if(res.status==200 || 201){
      deleteInProgress.value = false
      //remove employee from client state
      roles.value  = roles.value.filter(x=>{
        return x.name !== roleToDelete.value
      })
      showRoleDeleteDialog.value = false;
  }else{
      console.log(res.statusText)
  }
}


async function handleCreateRoleFormClosed(role){
  showCreateRoleForm.value = false
  if(role!=undefined){
    await getRoles()
  }
}

function loadEditRoleForm(roledata){
  roleToEdit.value = roledata
  showEditRoleForm.value=true
}

function loadDeleteRoleDialog(rolename){
  roleToDelete.value = rolename
  showRoleDeleteDialog.value = true
}


function handleEditRoleformClosed(payload){
  showEditRoleForm.value=false
  if(payload!=undefined){
  console.log("the payload",payload)
  roles.value = roles.value.map(x=>{
    if(x.name==payload.name){
      return payload
    }else{
      return x
    }
  })
  }
}

function viewRoleClicked(role){
  currentRole.value = role;
  showRoleDetails.value = true
}

function viewEmployeeClicked(employee){
  navigateTo(`/admin/employees/${employee.ID}`)
}

async function getEmployees(){
  try {
    const response = await $axios.get('/api/users');
    if(response.status==200 || 201){
      staff.value = response.data;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    staff.value = []; 
  }
}

async function getRoles(){
  try {
    const roleResponse = await $axios.get('/api/roles');
    if(roleResponse.status==200 || 201){
    roles.value = roleResponse.data;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    roles.value = []; 
  }
}


onMounted(async () => {
  await getEmployees()
  await getRoles()
});


onUpdated( async function(){
  // await loadRoles()
  // try{
  //       if(currentRole.value.name!=""){
  //       currentRole.value = roles.value.find(x=>x.name==currentRole.value.name)
  //       console.log("changed Current role")
  //     }
  //     }catch(err){
  //       console.log(err.message)
  //     }
})
</script>