<template>
  <div>
    <button type="button" class="animate-pulse button" disabled>
      {{ props.msg }}
    </button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  msg: String
})
</script>

<style lang="postcss" scoped>
.button {
  @apply bg-blue-500;
  @apply text-white;
  @apply font-bold;
  @apply py-2;
  @apply px-4;
  @apply rounded;
}

hover.button {
  @bg-blue-700;
}
</style>
