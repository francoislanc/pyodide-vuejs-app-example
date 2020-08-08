<template>
  <div class="container m-auto">
    <div
      class="text-center m-4 p-4 bg-indigo-800 items-center text-indigo-100 leading-none rounded-lg"
      role="alert"
    >
      <span class="whitespace-pre text-lg font-semibold mr-2 text-left"
        >Pyodide in a Vue App
      </span>
    </div>
    <p>
      Editable table from vuejs
    </p>
    <button
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      Run train test split
    </button>
    <p>
      Output train using sklearn.model_selection.train_test_split
    </p>
    <p>Output test</p>
  </div>
</template>

<script>
import Vue from "vue";
import code1 from "raw-loader!../assets/code1.py";

export default {
  name: "PyodideHelloWorld",
  props: {
    msg: String,
  },
  methods: {
    initializePyodide: async function() {
      try {
        // load script
        await Vue.loadScript("/pyodide.js");
        // wait for pyodide ready
        await window.languagePluginLoader;
        // load pandas lib
        await window.pyodide.loadPackage(["pandas"]);
      } catch (error) {
        console.log(error);
      }
    },
    runTestCommand: function() {
      console.log(code1);
      console.log(window.pyodide.runPython(code1));
    },
  },
  mounted: async function() {
    await this.initializePyodide();
    this.runTestCommand();
  },
};
</script>
