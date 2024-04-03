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

</style>
