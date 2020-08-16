<template>
  <div class="container m-auto">
    <div class="grid grid-cols-2 gap-4">
      <div class="col-span-2">
        <div
          class="text-center m-4 p-4 bg-indigo-800 items-center text-indigo-100 leading-none rounded-lg"
          role="alert"
        >
          <span class="whitespace-pre text-lg font-semibold mr-2 text-left"
            >Running "train_test_split" from scikit-learn in a Vue.js App
            🧐</span
          >
          <br />
          <br />
          <span class="whitespace-pre"
            >#pyodide #webassembly #python #javascript</span
          >
        </div>
      </div>
      <div class="col-span-2 flex justify-center items-center gap-4">
        <template v-if="!pyodideLoaded">
          <loading msg="Loading pyodide..." />
        </template>
        <template v-else>
          <label for="file" class="label-file">Upload new csv</label>
          <input
            id="file"
            type="file"
            class="input-file"
            @change="onFileChanged"
          />
        </template>
      </div>
      <div class="col-span-2">
        <h1 class="text-xl text-center font-semibold">
          Inputs dataset ({{ languages.rows.length }})
        </h1>
        <p class="text-center">Select columns used for stratified split</p>
      </div>

      <div class="col-span-2 flex justify-center">
        <Table
          :columns="languages.columns"
          :rows="languages.rows"
          :selected="languages.selected"
          :toogleCheck="toogleCheck"
        ></Table>
      </div>
      <div class="col-span-2 flex justify-center items-center gap-4">
        <template v-if="!pyodideLoaded">
          <loading msg="Loading pyodide..." />
        </template>
        <template v-else>
          <button class="button" v-on:click="splitDataset">
            <span style="white-space: pre;">
              Split dataset
              <br />(with scikit-learn 🐍)
            </span>
          </button>
        </template>
      </div>
      <template v-if="errorMsg">
        <div class="col-span-2 flex justify-center items-center gap-4">
          <alert :msg="errorMsg" />
        </div>
      </template>
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
          <Table
            :columns="languagesTrain.columns"
            :rows="languagesTrain.rows"
          ></Table>
        </template>
      </div>
      <div class="col-span-1 flex justify-center">
        <template v-if="splittingDataset">
          <loading msg="Waiting results..." />
        </template>
        <template v-else>
          <Table
            :columns="languagesTest.columns"
            :rows="languagesTest.rows"
          ></Table>
        </template>
      </div>
      <template v-if="languagesTest.rows.length > 0">
        <div class="col-span-2 flex justify-center items-center gap-4 mb-4">
          <button class="button" v-on:click="downloadDataset">
            <span style="white-space: pre;">
              Download datasets
            </span>
          </button>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import Table from "./Table";
import Loading from "./Loading";
import Alert from "./Alert";
import python_version from "raw-loader!../assets/python_version.py";
import train_test_split from "raw-loader!../assets/train_test_split.py";
import load_csv from "raw-loader!../assets/load_csv.py";

export default {
  name: "TrainTestSplit",
  components: {
    Table,
    Alert,
    Loading
  },
  data() {
    return {
      splittingDataset: false,
      errorMsg: null,
      pyodideLoaded: false,
      languages: {
        selected: [false, false],
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
          { name: "Sequacious2", language: "c" }
        ]
      },
      languagesTrain: {
        columns: ["name", "language"],
        rows: [],
        csv: ""
      },
      languagesTest: {
        columns: ["name", "language"],
        rows: [],
        csv: ""
      }
    };
  },
  methods: {
    initializePyodide: async function() {
      try {
        // if local
        // window.languagePluginUrl = "http://localhost:8081/pyodide/v0.15.0/";
        // await Vue.loadScript("/pyodide/v0.15.0/pyodide.js");
        // else using cdn
        window.languagePluginUrl =
          "https://pyodide-cdn2.iodide.io/v0.15.0/full/";
        await Vue.loadScript(
          "https://pyodide-cdn2.iodide.io/v0.15.0/full/pyodide.js"
        );
        // load script
        // wait for pyodide ready
        await window.languagePluginLoader;
        // load pandas lib
        await window.pyodide.loadPackage(["pandas", "scikit-learn"]);
        this.pyodideLoaded = true;
      } catch (error) {
        this.errorMsg = error;
      }
    },
    runPythonSplitDataset: function() {
      try {
        const [train, test, trainCsv, testCsv] = window.pyodide.runPython(
          train_test_split
        );
        this.languagesTrain.rows = train;
        this.languagesTest.rows = test;
        this.languagesTrain.csv = trainCsv;
        this.languagesTest.csv = testCsv;
      } catch (error) {
        this.errorMsg = error;
      }

      this.splittingDataset = false;
    },
    resetTables: function(columns) {
      this.languagesTrain.rows = [];
      this.languagesTest.rows = [];
      this.languagesTrain.csv = "";
      this.languagesTest.csv = "";
      this.languagesTrain.columns = columns;
      this.languagesTest.columns = columns;
      this.errorMsg = null;
      this.languages.selected = Array.from(
        { length: columns.length },
        () => false
      );
    },
    splitDataset: function() {
      window.languages = JSON.stringify(this.languages);
      this.resetTables(this.languages.columns);
      this.splittingDataset = true;
      setTimeout(this.runPythonSplitDataset, 500);
    },
    downloadDataset: function() {
      this.download("train.csv", this.languagesTrain.csv);
      this.download("test.csv", this.languagesTest.csv);
    },
    onFileChanged: function(event) {
      const file = event.target.files[0];
      const reader = new FileReader();
      const that = this;
      reader.onload = e => {
        window.csvContent = e.target.result;
        const [columns, rows] = window.pyodide.runPython(load_csv);
        that.languages.columns = columns;
        that.languages.rows = rows;
        that.resetTables(that.languages.columns);
      };
      reader.readAsText(file);
    },
    runTestCommand: function() {
      console.log(window.pyodide.runPython(python_version));
    },
    download: function(filename, text) {
      var pom = document.createElement("a");
      pom.setAttribute(
        "href",
        "data:text/csv;charset=utf-8," + encodeURIComponent(text)
      );
      pom.setAttribute("download", filename);

      if (document.createEvent) {
        var event = document.createEvent("MouseEvents");
        event.initEvent("click", true, true);
        pom.dispatchEvent(event);
      } else {
        pom.click();
      }
    },
    toogleCheck(i) {
      this.$set(this.languages.selected, i, !this.languages.selected[i]);
    }
  },
  mounted: async function() {
    await this.initializePyodide();
    this.runTestCommand();
  }
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

.input-file {
  display: none;
}

.label-file {
  @apply bg-blue-500;
  @apply text-white;
  @apply font-bold;
  @apply py-2;
  @apply px-4;
  @apply rounded;
  cursor: pointer;
}
hover.label-file {
  @bg-blue-700;
}
</style>
