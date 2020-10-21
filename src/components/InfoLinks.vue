<template>
  <div v-if="links.length" class="info-links">
    <h2>{{ label }}</h2>

    <!-- Links -->
    <ResultsGrid :items="resolvedData" :mini="true" />

    <LoadButton
      v-if="!resolvedData.length"
      :loading="isLoading"
      :error="error"
      @click="resolveLinks()"
    />
  </div>
</template>

<script>
import LoadButton from "@/components/LoadButton";
import ResultsGrid from "@/components/ResultsGrid";
import { apiClient, stripBaseUrl } from "@/apiService";

export default {
  components: { LoadButton, ResultsGrid },
  props: {
    links: { type: Array, required: true },
    label: { type: String, required: true }
  },
  data() {
    return {
      resolvedData: [],
      isLoading: false,
      error: false
    };
  },
  created() {
    this.resolveLinks();
  },
  methods: {
    resolveLinks() {
      // Load data from list of API links
      let promises = this.links.map(url => {
        return apiClient.get(stripBaseUrl(url, "/"));
      });
      this.isLoading = true;
      this.error = false;

      Promise.all(promises)
        .then(responses => {
          this.resolvedData = responses.map(response => response.data);
        })
        .catch(() => {
          this.error = true;
        })
        .finally(() => {
          this.isLoading = false;
        });
    }
  }
};
</script>

<style lang="scss">
.info-links {
  margin-top: 50px;
}
</style>
