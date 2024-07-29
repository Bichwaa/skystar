<template>
    <div class=" rounded-md">
      <div @click="toggleAccordion" type="button" class="w-full flex justify-start gap-4 items-center px-4 py-2 bg-white text-sm font-medium text-gray-700">
        <IconsWalletIcon class="h-6 w-6"/>
        <span>{{ title }}</span>
        <svg v-if="!isOpen" class="ml-2 h-5 w-5 transform rotate-0 transition-transform" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06 0L10 10.88l3.71-3.67a.75.75 0 011.06 1.06l-4.24 4.18a.75.75 0 01-1.06 0L5.23 8.27a.75.75 0 010-1.06z" clip-rule="evenodd" />
        </svg>
        <svg v-if="isOpen" class="ml-2 h-5 w-5 transform rotate-180 transition-transform" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06 0L10 10.88l3.71-3.67a.75.75 0 011.06 1.06l-4.24 4.18a.75.75 0 01-1.06 0L5.23 8.27a.75.75 0 010-1.06z" clip-rule="evenodd" />
        </svg>
      </div>
      <transition
        enter-active-class="transition ease-out duration-100"
        enter-class="transform opacity-0 scale-95"
        enter-to-class="transform opacity-100 scale-100"
        leave-active-class="transition ease-in duration-75"
        leave-class="transform opacity-100 scale-100"
        leave-to-class="transform opacity-0 scale-95"
      >
        <div v-if="isOpen" class="p-4 bg-white">
          <slot></slot>
        </div>
      </transition>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        isOpen: false
      };
    },
    props: {
      title: {
        type: String,
        required: true
      }
    },
    methods: {
      toggleAccordion() {
        this.isOpen = !this.isOpen;
      }
    }
  };
  </script>
  
  <style scoped>
  /* Add any additional styles if necessary */
  </style>
  