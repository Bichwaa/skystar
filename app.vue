<template>
    <div>
      <NuxtLayout>
        <NuxtPage/>
      </NuxtLayout>
    </div>
  </template>

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

/* .layout-enter-from,
.layout-leave-to {
  opacity: 0;
  filter: blur(1rem);
}

.layout-enter-active,
.layout-leave-active {
  transition: 0.3s ease-out;
} */
</style>
