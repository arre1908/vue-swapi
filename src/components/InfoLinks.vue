<template>
  <div v-if="links.urls.length">
    <h3>{{ links.label }}</h3>

    <div class="details">
      <!-- Resolved Links -->
      <ul v-if="resolvedData.length">
        <li v-for="[index, data] of resolvedData.entries()" :key="index">
          <router-link :to="stripBaseUrl(data.url)" class="text-capitalize">
            {{ data.name || data.title }}
          </router-link>
        </li>
      </ul>

      <LoadButton
        v-else
        :loading="isLoading"
        :error="error"
        @click="resolveLinks()"
      />
    </div>
  </div>
</template>

<script>
import LoadButton from "@/components/LoadButton";
import { apiClient, stripBaseUrl } from "@/apiService";

export default {
  components: { LoadButton },
  props: {
    links: { type: Object, required: true }
  },
  data() {
    return {
      resolvedData: [],
      isLoading: false,
      error: null
    };
  },
  methods: {
    stripBaseUrl: stripBaseUrl,
    resolveLinks() {
      // Load data from list of API links
      let promises = this.links.urls.map(url => apiClient.get(url));
      this.isLoading = true;
      this.error = null;

      Promise.all(promises)
        .then(responses => {
          this.resolvedData = responses.map(response => response.data);
        })
        .catch(error => {
          this.error = error;
        })
        .finally(() => {
          this.isLoading = false;
        });
    }
  }
};
</script>

<style lang="scss" scoped>
@use "@/css/variables";

ul {
  padding: 0;
  list-style-type: none;

  li {
    margin: 10px 0;
  }
}
</style>
