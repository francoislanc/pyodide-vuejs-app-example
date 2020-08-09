<template>
  <div class="container m-auto">
    <div class="grid grid-cols-2 gap-4">
      <div class="col-span-2">
        <div
          class="text-center m-4 p-4 bg-indigo-800 items-center text-indigo-100 leading-none rounded-lg"
          role="alert"
        >
          <span class="whitespace-pre text-lg font-semibold mr-2 text-left"
            >🤓 scikit-learn in a Vue.js App 🧐
          </span>
        </div>
      </div>
      <div class="col-span-2">
        <h1 class="text-xl text-center font-semibold">
          Inputs dataset ({{ languages.rows.length }})
        </h1>
      </div>

      <div class="col-span-2 flex justify-center">
        <Table :columns="languages.columns" :rows="languages.rows"> </Table>
      </div>
      <div class="col-span-2 flex justify-center">
        <template v-if="!pyodideLoaded">
          <loading msg="Loading pyodide..." />
        </template>
        <template v-else>
          <button class="button" v-on:click="splitDataset">
            <span style="white-space: pre;">
              Split dataset <br />(with scikit-learn 🐍)
            </span>
          </button>
        </template>
      </div>
      <div class="col-span-1 flex justify-center">
        <h1 class="text-xl text-center font-semibold">
          Train dataset ({{ languagesTrain.rows.length }})
        </h1>
      </div>
      <div class="col-span-1 flex justify-center">
        <h1 class="text-xl text-center font-semibold">
          Test dataset ({{ languagesTest.rows.length }})
        </h1>
      </div>
      <div class="col-span-1 flex justify-center">
        <template v-if="splittingDataset">
          <loading msg="Waiting results..." />
        </template>
        <template v-else>
          <Table :columns="languagesTrain.columns" :rows="languagesTrain.rows">
          </Table>
        </template>
      </div>
      <div class="col-span-1 flex justify-center">
        <template v-if="splittingDataset">
          <loading msg="Waiting results..." />
        </template>
        <template v-else>
          <Table :columns="languagesTest.columns" :rows="languagesTest.rows">
          </Table>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import Table from "./Table";
import Loading from "./Loading";
import code1 from "raw-loader!../assets/code1.py";
import code2 from "raw-loader!../assets/code2.py";

export default {
  name: "PyodideHelloWorld",
  components: {
    Table,
    Loading,
  },
  data() {
    return {
      splittingDataset: false,
      pyodideLoaded: false,
      languages: {
        columns: ["name", "language"],
        rows: [
          { name: "Pasquin", language: "java" },
          { name: "Flimflam", language: "java" },
          { name: "Flimflam2", language: "java" },
          { name: "Donvidn", language: "python" },
          { name: "Zoography", language: "python" },
          { name: "Tetramorph", language: "python" },
          { name: "Tetramorph1", language: "python" },
          { name: "Tetramorph2", language: "python" },
          { name: "Tetramorph3", language: "python" },
          { name: "Tetramorph4", language: "python" },
          { name: "Kamagraphy", language: "python" },
          { name: "Quietya57", language: "c" },
          { name: "Sequacious", language: "c" },
          { name: "Sequacious2", language: "c" },
        ],
      },
      languagesTrain: {
        columns: ["name", "language"],
        rows: [],
      },
      languagesTest: {
        columns: ["name", "language"],
        rows: [],
      },
    };
  },
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
        await window.pyodide.loadPackage(["pandas", "scikit-learn"]);
        this.pyodideLoaded = true;
      } catch (error) {
        console.log(error);
      }
    },
    runPythonSplitDataset: function() {
      const [train, test] = window.pyodide.runPython(code2);
      this.languagesTrain.rows = train;
      this.languagesTest.rows = test;
      this.splittingDataset = false;
    },
    splitDataset: function() {
      window.languages = this.languages;
      this.languagesTrain.rows = [];
      this.languagesTest.rows = [];
      this.splittingDataset = true;
      setTimeout(this.runPythonSplitDataset, 500);
    },
    runTestCommand: function() {
      console.log(window.pyodide.runPython(code1));
    },
  },
  mounted: async function() {
    await this.initializePyodide();
    // this.runTestCommand();
  },
};
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
