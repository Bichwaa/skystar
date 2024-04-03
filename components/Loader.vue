<template>
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <path
      :stroke="color"
      stroke-linecap="round"
      :stroke-width="border"
      :d="path"
    />
  </svg>
</template>

<script>
export default {
  name: "Loader",

  props: {
    border: {
      type: Number,
      default: 2,
    },
    color: {
      type: String,
      default: "#d4af37",
    }
  },

  computed: {
    path() {
      const delta = this.border / 2;

      const radius = 12 - delta;
      const startX = 24 - delta;
      const endX = delta;

      return `M${startX} 12A${radius} ${radius} 0 1 1 12 ${endX}`;
    },
  },
};
</script>

<style scoped>
@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  20% {
    transform: rotate(50deg);
  }
  80% {
    transform: rotate(310deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

svg {
  animation: rotate 1.8s linear infinite;
}
</style>
