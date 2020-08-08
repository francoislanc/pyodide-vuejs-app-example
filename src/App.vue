<template>
  <div id="app">
    <PyodideHelloWorld />
  </div>
</template>

<script>
import PyodideHelloWorld from "./components/PyodideHelloWorld.vue";

export default {
  name: "App",
  components: {
    PyodideHelloWorld,
  },
};
</script>
