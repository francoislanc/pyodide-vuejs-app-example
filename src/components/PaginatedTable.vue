<template>
  <div>
    <table v-if="tableValues.rows.length > 0" class="table-auto mx-auto">
      <thead>
        <tr class="bg-gray-100">
          <template :key="i" v-for="(c, i) in tableValues.columns">
            <th class="px-4 py-2 text-center">
              <input
                v-if="props.selected"
                type="checkbox"
                id="checkbox"
                :value="props.selected[i]"
                @change="(event) => props.toogleCheck && props.toogleCheck(i)"
              />
              <label for="checkbox"></label>
              {{ c }}
            </th>
          </template>
        </tr>
      </thead>
      <tbody>
        <template :key="i" v-for="(l, i) in displayedRows">
          <tr>
            <template :key="j" v-for="(c, j) in tableValues.columns">
              <td class="px-4 py-2 text-center">{{ l[c] }}</td>
            </template>
          </tr>
        </template>
      </tbody>
    </table>

    <div class="flex justify-center mb-4">
      <div role="alert">
        <button
          type="button"
          class="h-12 w-8 text-center m-1 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded"
          :key="p"
          v-for="(pageNumber, p) in state.pages"
          @click="state.page = pageNumber"
        >
          {{ pageNumber }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted, watch, computed } from 'vue'
import type { PropType } from 'vue'

import type { Csv } from './Types'

const props = defineProps({
  toogleCheck: Function,
  tableValues: {
    type: Object as PropType<Csv>,
    default: function () {
      return {
        rows: [],
        columns: [],
        csv: ''
      }
    }
  },
  selected: {
    type: Array,
    default: null
  }
})

interface Pagination {
  page: number
  perPage: number
  pages: Array<number>
}

const state: Pagination = reactive({
  page: 1,
  perPage: 5,
  pages: []
})

const displayedRows = computed(() => {
  return paginate(props.tableValues.rows)
})

const setPages = () => {
  let numberOfPages = Math.ceil(props.tableValues.rows.length / state.perPage)
  state.pages = []
  for (let index = 1; index <= numberOfPages; index++) {
    state.pages.push(index)
  }
}
const paginate = (rows: Array<{ [key: string]: string }>) => {
  let page = state.page
  let perPage = state.perPage
  let from = page * perPage - perPage
  let to = page * perPage
  return rows.slice(from, to)
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
watch(props.tableValues, (n, o) => {
  setPages()
})

onMounted(async () => {
  setPages()
})
</script>
