<template>
  <div>
    <div
      class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
      role="alert"
    >
      <strong class="font-bold">{{ msg }}</strong>
    </div>
  </div>
</template>

<script>
export default {
  name: "Loading",
  props: {
    msg: String,
  },
};
</script>
