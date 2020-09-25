<template>
  <div>
    <table>
      <thead>
        <th v-for="col of columns" :key="col.key">{{ col.label }}</th>
      </thead>

      <tbody>
        <tr v-for="[index, item] of items.entries()" :key="index">
          <td v-for="col of columns" :key="col.key" class="text-capitalize">
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

      <!-- Load more -->
      <tfoot v-if="next">
        <tr>
          <td :colspan="columns.length">
            <LoadButton
              :loading="isLoading"
              :error="error"
              text="Load More"
              class="table-button"
              @click="fetchData()"
            />
          </td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script>
import LoadButton from "@/components/LoadButton";
import { apiClient, stripBaseUrl } from "../apiService";

export default {
  components: { LoadButton },
  props: {
    url: { type: String, required: true },
    columns: { type: Array, required: true }
  },
  data() {
    return {
      items: [],
      next: "",
      isLoading: true,
      error: null
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
      this.error = null;
      apiClient
        .get(this.next)
        .then(response => {
          // Append response data to list of items (table rows)
          this.items = this.items.concat(response.data.results);
          this.next = response.data.next;
        })
        .catch(error => {
          this.error = error;
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

table {
  width: 100%;
  border: 1px solid variables.$text-primary;
  border-spacing: 0;
  border-radius: 5px;

  th,
  td {
    padding: 10px;
    border: none;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 1px;
  }

  th {
    border-bottom: 1px solid variables.$text-primary;
    text-align: left;
  }

  td {
    border-bottom: 1px solid variables.$bg-secondary;
  }
}

.table-button {
  width: 100%;
}
</style>
