<template>
  <Modal @close-modal="close">
    <form class="lg:p-6 lg:min-w-[350px] w-full">
      <p class="font-medium flex items-center mb-3">Assign Role</p>

      <div class="flex flex-col my-4 w-full" v-if="employeeId == 0">
        <label for="email" class="text-xs font-medium my-1"
          >Select Employee</label
        >
        <select v-model="payload.employeeId" class="w-full">
          <option v-for="em in employees" :value="em.ID">
            {{ em.firstName + " " + em.lastName }}
          </option>
        </select>
      </div>

      <div class="flex flex-col my-4 w-full">
        <label for="email" class="text-xs font-medium my-1">Select Role</label>
        <select v-model="payload.roleName" class="w-full">
          <option v-for="em in roles" :value="em.name">{{ em.name }}</option>
        </select>
      </div>

      <button
        type="submit"
        @click.prevent="submitForm"
        class="flex items-center justify-center py-2 px-3 mt-6 text-xs rounded-lg bg-[#292a5e] min-w-[150px] text-white font-medium hover:bg-gray-300 hover:text-[#292a5e] disabled:bg-gray-600 duration-300"
      >
        <span v-if="!formLoading">Assign Role</span>
        <Loader v-else size="small" class="h-4 w-4" />
      </button>
    </form>
  </Modal>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { userStore } from "../../store";

const store = userStore();

const { $axios } = useNuxtApp();

const props = defineProps({
  employeeId: {
    type: Number,
    default: 0,
  },
});

const emit = defineEmits(["close"]);

const employees = ref([]);
const roles = ref([]);

const formLoading = ref(false);

const payload = ref({
  employeeId: 0,
  roleName: 0,
});

async function getEmployees() {
  try {
    const res = await $axios.get("api/users");
    if (res.status == 200 || 201) {
      employees.value = res.data;
    } else {
      console.log(res.statusText);
    }
  } catch (e) {
    throw e;
  }
}

async function getRoles() {
  try {
    const res = await $axios.get("api/roles");
    if (res.status == 200 || 201) {
      roles.value = res.data;
    } else {
      console.log(res.statusText);
    }
  } catch (e) {
    throw e;
  }
}

async function submitForm() {
  formLoading.value = true;
  const res = await $axios.post("/api/roles/assign", { ...payload.value });
  formLoading.value = false;
  if (res.status == 200 || 201) {
    emit("close", res.data);
  } else {
    console.log(res.statusText);
  }
}

function close() {
  emit("close");
}

onMounted(async () => {
  await getRoles();
  if (props.employeeId != 0) {
    payload.value.employeeId = props.employeeId;
  } else {
    await getEmployees();
  }
});
</script>
