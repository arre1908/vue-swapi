<template>
  <div>
    <div v-if="items.length" class="table-container">
      <table>
        <thead>
          <th v-for="col of columns" :key="col.key">{{ col.label }}</th>
        </thead>
        <tbody>
          <tr v-for="[index, item] of items.entries()" :key="index">
            <td v-for="col of columns" :key="col.key">
              <!-- Optional slot for any cell (uses column 'key' as the name) -->
              <slot :name="col.key" :item="item">
                {{ item[col.key] }}
              </slot>
            </td>
          </tr>
        </tbody>
      </table>

      <button v-if="next" @click="fetchData()" :disabled="isLoading">
        {{ isLoading ? "Loading..." : "Load More" }}
      </button>
    </div>

    <h4 v-else>{{ error || "Loading..." }}</h4>
  </div>
</template>

<script>
import { apiClient } from "../apiService";

export default {
  props: {
    url: { type: String, required: true },
    columns: { type: Array, required: true }
  },
  data() {
    return {
      isLoading: true,
      items: [],
      next: null,
      error: ""
    };
  },
  methods: {
    fetchData() {
      // Fetch data
      this.isLoading = true;
      apiClient
        .get(this.next)
        .then(re => {
          this.items = this.items.concat(re.data.results);
          this.next = re.data.next;
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          this.isLoading = false;
          window.scrollTo(0, document.body.scrollHeight);
        });
    }
  },
  created() {
    this.next = this.url;
    this.fetchData();
  }
};
</script>

<style lang="scss" scoped>
@use "@/css/variables";

.table-container {
  margin: 30px 0;
}

button {
  background-color: variables.$link;
  padding: 5px 0;
  width: 100%;
  border: none;
  color: variables.$bg-primary;
  cursor: pointer;

  &:focus,
  &:disabled {
    background-color: variables.$bg-secondary;
    color: variables.$text-primary;
    outline: none;
  }

  &:disabled {
    cursor: initial;
  }
}

table {
  width: 100%;
  border: 1px solid variables.$text-primary;
  border-spacing: 0;
}

th,
td {
  padding: 5px;
}

th {
  border: 1px solid variables.$text-primary;
}

td {
  border: 1px solid variables.$bg-secondary;
}
</style>
