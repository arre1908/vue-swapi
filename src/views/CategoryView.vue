<template>
  <div>
    <h1>{{ $route.name }}</h1>

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
import { apiClient, stripBaseUrl } from "@/apiService";

export default {
  name: "CategoryView",
  components: { Searchbar, ResultsGrid, LoadButton },
  data() {
    return {
      path: stripBaseUrl(this.$route.path, "/"),
      next: "",
      items: [],
      isLoading: true,
      error: false
    };
  },
  created() {
    this.next = this.path;
    this.fetchData();
  },
  methods: {
    fetchData() {
      // fetch data from API and append results
      this.isLoading = true;
      this.error = false;
      apiClient
        .get(this.next)
        .then(response => {
          // Append response data to list of items
          this.items = this.items.concat(response.data.results);
          this.next = stripBaseUrl(response.data.next);
        })
        .catch(() => {
          this.error = true;
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
