<template>
  <div class="container m-auto">
    <div class="grid grid-cols-2 gap-4">
      <div class="col-span-2">
        <div
          class="text-center m-4 p-4 bg-indigo-800 items-center text-indigo-100 leading-none rounded-lg"
          role="alert"
        >
          <span class="whitespace-pre text-lg font-semibold mr-2 text-left"
            >Running "train_test_split" from scikit-learn in a Vue.js App 🧐</span
          >
          <br />
          <br />
          <span class="whitespace-pre">#pyodide #webassembly #python #javascript</span>
        </div>
      </div>
      <div class="col-span-2 flex justify-center items-center gap-4">
        <template v-if="!state.pyodideLoaded">
          <LoadingButton msg="Loading pyodide..." />
        </template>
        <template v-else>
          <label for="file" class="label-file">Upload new csv</label>
          <input id="file" type="file" class="input-file" @change="onFileChanged" />
        </template>
      </div>
      <div class="col-span-2">
        <h1 class="text-xl text-center font-semibold">
          Input dataset ({{ state.csv.rows.length }})
        </h1>
        <p class="text-center">Select columns used for stratified split</p>
      </div>

      <div class="col-span-2 flex justify-center">
        <PaginatedTable
          :tableValues="state.csv"
          :selected="state.csv.selected"
          :toogleCheck="toogleCheck"
        ></PaginatedTable>
      </div>
      <div class="col-span-2 flex justify-center items-center gap-4">
        <template v-if="!state.pyodideLoaded">
          <LoadingButton msg="Loading pyodide..." />
        </template>
        <template v-else>
          <button class="button" v-on:click="splitDataset">
            <span style="white-space: pre">
              Split dataset
              <br />(with scikit-learn 🐍)
            </span>
          </button>
        </template>
      </div>
      <template v-if="state.errorMsg">
        <div class="col-span-2 flex justify-center items-center gap-4">
          <AlertMsg :msg="state.errorMsg" />
        </div>
      </template>
      <div class="col-span-1 flex justify-center">
        <h1 class="text-xl text-center font-semibold">
          Train dataset ({{ state.csvTrain.rows.length }})
        </h1>
      </div>
      <div class="col-span-1 flex justify-center">
        <h1 class="text-xl text-center font-semibold">
          Test dataset ({{ state.csvTest.rows.length }})
        </h1>
      </div>
      <div class="col-span-1 flex justify-center mb-4">
        <template v-if="state.splittingDataset">
          <LoadingButton msg="Waiting results..." />
        </template>
        <template v-else>
          <PaginatedTable :tableValues="state.csvTrain"></PaginatedTable>
        </template>
      </div>
      <div class="col-span-1 flex justify-center mb-4">
        <template v-if="state.splittingDataset">
          <LoadingButton msg="Waiting results..." />
        </template>
        <template v-else>
          <PaginatedTable :tableValues="state.csvTest"></PaginatedTable>
        </template>
      </div>
      <template v-if="state.csvTest.rows.length > 0">
        <div class="col-span-2 flex justify-center items-center gap-4 mb-4">
          <button class="button" v-on:click="downloadDataset">
            <span style="white-space: pre"> Download datasets </span>
          </button>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import PaginatedTable from './PaginatedTable.vue'
import LoadingButton from './LoadingButton.vue'
import AlertMsg from './AlertMsg.vue'

import python_version from '../assets/python_version.py?raw'
import train_test_split from '../assets/train_test_split.py?raw'
import load_csv from '../assets/load_csv.py?raw'

import { reactive, onMounted } from 'vue'
import type { State } from './Types'

const state: State = reactive({
  pyodide: null,
  splittingDataset: false,
  errorMsg: null,
  pyodideLoaded: false,
  csv: {
    selected: [false, false],
    columns: ['name', 'language'],
    rows: [
      { name: 'Pasquin', language: 'java' },
      { name: 'Flimflam', language: 'java' },
      { name: 'Flimflam2', language: 'java' },
      { name: 'Donvidn', language: 'python' },
      { name: 'Zoography', language: 'python' },
      { name: 'Tetramorph', language: 'python' },
      { name: 'Tetramorph1', language: 'python' },
      { name: 'Tetramorph2', language: 'python' },
      { name: 'Tetramorph3', language: 'python' },
      { name: 'Tetramorph4', language: 'python' },
      { name: 'Kamagraphy', language: 'python' },
      { name: 'Quietya57', language: 'c' },
      { name: 'Sequacious', language: 'c' },
      { name: 'Sequacious2', language: 'c' }
    ]
  },
  csvTrain: {
    columns: ['name', 'language'],
    rows: [],
    csv: ''
  },
  csvTest: {
    columns: ['name', 'language'],
    rows: [],
    csv: ''
  }
})

const toObjectsList = (a: any) => {
  a = a.map(function (item: any) {
    return Object.fromEntries(item)
  })
  return a
}
const initializePyodide = async () => {
  try {
    // @ts-ignore : global loadPyodide
    state.pyodide = await loadPyodide({
      indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.20.0/full/'
    })
    // load pandas lib
    if (state.pyodide) {
      await state.pyodide.loadPackage(['pandas', 'scikit-learn'])
    }
    state.pyodideLoaded = true
  } catch (error: any) {
    state.errorMsg = error
  }
}
const runPythonSplitDataset = async () => {
  try {
    if (state.pyodide) {
      await state.pyodide.runPythonAsync(train_test_split)
      state.csvTrain = {
        rows: toObjectsList(state.pyodide.globals.get('X_train').toJs()),
        columns: state.csvTrain.columns,
        csv: state.pyodide.globals.get('X_train_csv')
      }
      state.csvTest = {
        rows: toObjectsList(state.pyodide.globals.get('X_test').toJs()),
        columns: state.csvTrain.columns,
        csv: state.pyodide.globals.get('X_test_csv')
      }
    }
  } catch (error: any) {
    state.errorMsg = error
  }

  state.splittingDataset = false
}
const resetTables = (columns: Array<string>, resetSelection: boolean) => {
  state.csvTrain = {
    rows: [],
    columns: columns,
    csv: ''
  }
  state.csvTest = {
    rows: [],
    columns: columns,
    csv: ''
  }
  state.errorMsg = null
  if (resetSelection) {
    state.csv.selected = []
    for (let i = 0; i < state.csv.selected.length; i++) {
      state.csv.selected.push(false)
    }
  }
}
const splitDataset = () => {
  // @ts-ignore
  window.csv = JSON.stringify(state.csv)
  resetTables(state.csv.columns, false)
  state.splittingDataset = true
  setTimeout(runPythonSplitDataset, 500)
}
const downloadDataset = () => {
  if (state.csvTrain.csv) {
    download('train.csv', state.csvTrain.csv)
  }
  if (state.csvTest.csv) {
    download('test.csv', state.csvTest.csv)
  }
}
const onFileChanged = (event: Event) => {
  if (event.target) {
    let inputEl = event.target as HTMLInputElement
    if (inputEl && inputEl.files && inputEl.files.length > 0) {
      const file = inputEl.files[0]
      const reader = new FileReader()
      reader.onload = (e) => {
        // @ts-ignore
        window.csvContent = e.target.result
        if (state.pyodide) {
          state.pyodide.runPython(load_csv)
          state.csv = {
            columns: state.pyodide.globals.get('headers').toJs(),
            rows: toObjectsList(state.pyodide.globals.get('rows').toJs())
          }
          resetTables(state.csv.columns, true)
        }
      }
      reader.readAsText(file)
    }
  }
}
const runTestCommand = () => {
  if (state.pyodide) {
    console.log(state.pyodide.runPython(python_version))
  }
}
const download = (filename: string, text: string) => {
  var pom = document.createElement('a')
  pom.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(text))
  pom.setAttribute('download', filename)
  pom.click()
}
const toogleCheck = (i: number) => {
  if (state.csv.selected) {
    state.csv.selected[i] = !state.csv.selected[i]
  }
}

onMounted(async () => {
  let pyodideScript = document.createElement('script')
  pyodideScript.setAttribute('src', 'https://cdn.jsdelivr.net/pyodide/v0.20.0/full/pyodide.js')
  pyodideScript.onload = async () => {
    await initializePyodide()
    runTestCommand()
  }
  document.head.appendChild(pyodideScript)
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
