<template>
  <div>
    <table v-if="rows.length > 0" class="table-auto mx-auto">
      <thead>
        <tr class="bg-gray-100">
          <template v-for="(c, i) in columns">
            <th :key="i" class="px-4 py-2 text-center">
              <p v-if="selected[i]">Selected</p>
              <p v-else>Not Selected</p>
              <template v-if="selected.length > 0">
                <template v-if="selected[i]">
                  <input type="checkbox" checked @change="toogleCheck(i)" />
                </template>
                <template v-else>
                  <input @change="toogleCheck(i)" type="checkbox" />
                </template>
              </template>
              {{ c }}
            </th>
          </template>
        </tr>
      </thead>
      <tbody>
        <template v-for="(l, i) in displayedRows">
          <tr :key="i">
            <template v-for="(c, j) in columns">
              <td :key="j" class="px-4 py-2 text-center">{{ l[c] }}</td>
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
          v-for="(pageNumber, p) in pages"
          @click="page = pageNumber"
        >
          {{ pageNumber }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Table",
  data() {
    return {
      page: 1,
      perPage: 5,
      pages: []
    };
  },
  computed: {
    displayedRows() {
      return this.paginate(this.rows);
    }
  },
  methods: {
    setPages() {
      let numberOfPages = Math.ceil(this.rows.length / this.perPage);
      this.pages = [];
      for (let index = 1; index <= numberOfPages; index++) {
        this.pages.push(index);
      }
    },
    paginate(rows) {
      let page = this.page;
      let perPage = this.perPage;
      let from = page * perPage - perPage;
      let to = page * perPage;
      return rows.slice(from, to);
    }
  },
  mounted: function() {
    this.setPages();
  },
  watch: {
    rows() {
      this.setPages();
    }
  },
  props: {
    toogleCheck: Function,
    columns: Array,
    rows: Array,
    selected: {
      type: Array,
      default: function() {
        return [];
      }
    }
  }
};
</script>
