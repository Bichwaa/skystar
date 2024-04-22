<template>
    <div>
      <NuxtLayout>
        <NuxtPage/>
      </NuxtLayout>
    </div>
</template>


<script setup>
import {onMounted} from 'vue';
import {userStore} from "./store";

const store = userStore()

onMounted(()=>store.checkPersistedState())


</script>


<style >
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}

.page-enter-active,
.page-leave-active {
  transition: 0.2s ease-out;
}

</style>
