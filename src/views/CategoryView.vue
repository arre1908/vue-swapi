<template>
  <div>
    <h1>{{ title }}</h1>

    <Searchbar :loading="isLoading" @submit="search($event)" />

    <ResultsGrid :items="items" />

    <div class="footer">
      <!-- Load more -->
      <LoadButton
        v-if="next"
        :loading="isLoading"
        :error="error"
        text="Load More"
        @click="fetchData()"
      />

      <!-- No results -->
      <span v-else-if="!items.length">
        No results found
      </span>
    </div>
  </div>
</template>

<script>
import Searchbar from "@/components/Searchbar";
import ResultsGrid from "@/components/ResultsGrid";
import LoadButton from "@/components/LoadButton";
import { apiClient } from "@/apiService";

export default {
  components: { Searchbar, ResultsGrid, LoadButton },
  props: {
    path: { type: String, required: true },
    title: { type: String, required: true }
  },
  data() {
    return {
      next: "",
      items: [],
      isLoading: true,
      error: null
    };
  },
  created() {
    // Initialize 'next' to base URL path
    this.next = this.path;
    this.fetchData();
  },
  methods: {
    fetchData() {
      // fetch data from API and append results
      this.isLoading = true;
      this.error = null;
      apiClient
        .get(this.next)
        .then(response => {
          // Append response data to list of items
          this.items = this.items.concat(response.data.results);
          this.next = response.data.next;
        })
        .catch(error => {
          this.error = error;
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    search(query) {
      this.next = `${this.path}?search=${query}`;
      this.items = [];
      this.fetchData();
    }
  }
};
</script>

<style lang="scss" scoped>
.footer {
  margin: 30px 0;
  text-align: center;

  * {
    width: 100%;
  }
}
</style>
