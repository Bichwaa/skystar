<template>
    <div>
        <div @click="toggleDropdown" class="dropdown-trigger cursor-pointer flex gap-2 items-center group">
            <span class="font-medium text-xs invisible group-hover:visible duration-300">Options</span>
            <IconsMenuDotsIcon class="w-7 h-7"/>
        </div>
        <div v-if="isDropdownOpen" class="dropdown-menu absolute right-9  rounded-lg p-3 bg-white border border-slate-200">
        <slot></slot>
        </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const isDropdownOpen = ref(false);
  
  const toggleDropdown = () => {
    isDropdownOpen.value = !isDropdownOpen.value;
  };
  </script>
