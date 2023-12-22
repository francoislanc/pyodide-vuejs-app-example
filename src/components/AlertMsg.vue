<template>
  <div>
    <div
      class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
      role="alert"
    >
      <strong class="font-bold">{{ props.msg }}</strong>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  msg: String
})
</script>
