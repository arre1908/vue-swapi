<template>
  <div>
    <Searchbar :loading="isLoading" @submit="search($event)" />

    <table>
      <thead>
        <th v-for="col of columns" :key="col.key">{{ col.label }}</th>
      </thead>

      <transition-group name="rows" tag="tbody">
        <tr v-for="[index, item] of items.entries()" :key="index">
          <td v-for="col of columns" :key="col.key" class="text-capitalize">
            <!-- Optional cell slot -->
            <slot :name="col.key" :item="item">
              <!-- Name / Title links -->
              <router-link
                v-if="col.key === 'name' || col.key === 'title'"
                :to="stripBaseUrl(item.url)"
              >
                {{ item[col.key] }}
              </router-link>

              <!-- Default -->
              <span v-else>{{ item[col.key] }}</span>
            </slot>
          </td>
        </tr>
      </transition-group>

      <tfoot>
        <tr>
          <!-- Load more -->
          <td v-if="next" :colspan="columns.length">
            <LoadButton
              :loading="isLoading"
              :error="error"
              text="Load More"
              class="table-button"
              @click="fetchData()"
            />
          </td>

          <!-- No results -->
          <td v-else-if="!items.length" :colspan="columns.length">
            <div class="no-results">
              No results found
            </div>
          </td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script>
import Searchbar from "@/components/Searchbar";
import LoadButton from "@/components/LoadButton";
import { apiClient, stripBaseUrl } from "../apiService";

export default {
  components: { LoadButton, Searchbar },
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
          // window.scrollTo(0, document.body.scrollHeight);
        });
    },
    search(query) {
      this.next = `${this.url}?search=${query}`;
      this.items = [];
      this.fetchData();
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

.no-results {
  text-align: center;
  font-style: italic;
}

.rows-enter-active {
  transition: all 0.3s;
}

.rows-enter {
  opacity: 0;
  transform: translateY(20px);
}
</style>
