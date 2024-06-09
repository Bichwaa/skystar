<template>
  <Content />
</template>

<script setup>

definePageMeta({
  middleware: 'permissions',
  permissions: ['can-view-dashboard']
});

</script>