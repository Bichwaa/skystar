<template>
    <div 
      class="flex items-center justify-between cursor-pointer my-1" 
      @click="toggleSwitch"
    >
      <span class="mr-2 font-medium text-sm">{{permName}}</span>
      <div 
        :class="[
          'w-12 h-6 rounded-full flex items-center transition-colors duration-300',
          isActive ? 'bg-[#292a5e]' : 'bg-gray-300'
        ]"
      >
        <div 
          :class="[
            'w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300',
            isActive ? 'translate-x-6' : 'translate-x-1'
          ]"
        ></div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed, defineProps, defineEmits } from 'vue';
  
  // Define props using the `defineProps` function
  const props = defineProps({
    state: {
      type: Boolean,
      required: true,
      default:false
    },
    permName:{
        type:String,
        required:true, 
        default:""
    }
  });
  
  // Define emits using the `defineEmits` function
  const emit = defineEmits(['updateRolePerms']);
  
  // Computed property to determine if the switch is active
  const isActive = computed(() => props.state);
  
  // Method to toggle the switch state
  const toggleSwitch = () => {
    emit('updateRolePerms', {name:props.permName, state:props.state});
  };
  </script>
  
  <style scoped>
  </style>
  