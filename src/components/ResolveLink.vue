<template>
  <span class="text-capitalize">
    <router-link v-if="url" :to="stripBaseUrl(url)">
      {{ label }}
    </router-link>

    <span v-else-if="isLoading">Loading...</span>

    <span v-else-if="error">{{ error }}</span>
  </span>
</template>

<script>
import { apiClient, stripBaseUrl } from "@/apiService";

export default {
  props: {
    data: { type: [String, Array], default: null }
  },
  data() {
    return {
      url: "",
      label: "",
      isLoading: false,
      error: null
    };
  },
  created() {
    // Empty or null
    if (!this.data) return;

    switch (typeof this.data) {
      case "string":
        // Homeworld
        if (this.data.length) {
          this.resolveLink(this.data);
        }
        break;
      case "object":
        // Species
        if (this.data.length) {
          this.resolveLink(this.data[0]);
        } else {
          this.url = "/species/1/";
          this.label = "Human";
        }
        break;
    }
  },
  methods: {
    stripBaseUrl,
    resolveLink(url) {
      this.isLoading = true;
      apiClient
        .get(url)
        .then(response => {
          this.url = stripBaseUrl(response.data.url);
          this.label = response.data.name;
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
