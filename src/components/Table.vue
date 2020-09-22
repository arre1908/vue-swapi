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
              <!-- Name / Title links -->
              <router-link
                v-if="col.key == 'name' || col.key == 'title'"
                :to="stripBaseUrl(item.url)"
              >
                {{ item[col.key] }}
              </router-link>

              <span v-else>{{ item[col.key] }}</span>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Load more -->
      <button
        v-if="next"
        :disabled="isLoading"
        class="button"
        @click="fetchData()"
      >
        {{ isLoading ? "Loading..." : "Load More" }}
      </button>

      <h3 v-if="error">{{ error }}</h3>
    </div>

    <h4 v-else>{{ error || "Loading..." }}</h4>
  </div>
</template>

<script>
import { apiClient, stripBaseUrl } from "../apiService";

export default {
  props: {
    url: { type: String, required: true },
    columns: { type: Array, required: true }
  },
  data() {
    return {
      items: [],
      next: "",
      isLoading: true,
      error: ""
    };
  },
  created() {
    // Initialize 'next' URL from props
    this.next = this.url;
    this.fetchData();
  },
  methods: {
    stripBaseUrl: stripBaseUrl,
    fetchData() {
      this.isLoading = true;
      this.error = "";
      apiClient
        .get(this.next)
        .then(re => {
          // Append response data to list of items (table rows)
          this.items = this.items.concat(re.data.results);
          this.next = re.data.next;
        })
        .catch(err => {
          this.error = err;
        })
        .finally(() => {
          this.isLoading = false;
          window.scrollTo(0, document.body.scrollHeight);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
@use "@/css/variables";

.table-container {
  margin: 30px 0;
}

table {
  width: 100%;
  border: 1px solid variables.$text-primary;
  border-spacing: 0;
}

th,
td {
  border: none;
  padding: 10px;
}

th {
  border-bottom: 1px solid variables.$text-primary;
  text-align: left;
}

td {
  border-bottom: 1px solid variables.$bg-secondary;
}

.button {
  width: 100%;
  border-radius: 0;
  padding: 10px;
}
</style>
