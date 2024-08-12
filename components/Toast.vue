<template>
    <div v-if="visible" :class="toastClass" class="fixed top-48 right-4 px-4 py-2 rounded shadow-lg text-white transition-opacity duration-300">
      {{ message }}
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  
  // Props
  const props = defineProps({
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: 'info',
    },
    duration: {
      type: Number,
      default: 3000,
    },
  });
  
  // Local state
  const visible = ref(true);
  
  // Hide toast after the specified duration
  setTimeout(() => {
    visible.value = false;
  }, props.duration);
  
  // Compute the class for the toast based on the type
  const toastClass = computed(() => {
    switch (props.type) {
      case 'success':
        return 'bg-green-500';
      case 'error':
        return 'bg-red-500';
      case 'info':
      default:
        return 'bg-blue-500';
    }
  });
  </script>
  