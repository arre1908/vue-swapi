<template>
  <span class="text-capitalize">
    <router-link v-if="link" :to="link">
      {{ label }}
    </router-link>

    <span v-else-if="isLoading">Loading...</span>

    <span v-else-if="error" class="error-link" @click="resolveLink()">
      Error - Try Again
    </span>
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
      link: "",
      label: "",
      isLoading: false,
      error: false
    };
  },
  created() {
    // Empty or null
    if (!this.data) return;

    switch (typeof this.data) {
      case "string":
        // Homeworld
        if (this.data.length) {
          this.url = this.data;
          this.resolveLink();
        }
        break;
      case "object":
        // Species
        if (this.data.length) {
          this.url = this.data[0];
          this.resolveLink();
        } else {
          this.link = "/species/1";
          this.label = "Human";
        }
        break;
    }
  },
  methods: {
    resolveLink() {
      this.isLoading = true;
      this.error = false;
      apiClient
        .get(stripBaseUrl(this.url, "/"))
        .then(response => {
          this.link = stripBaseUrl(response.data.url);
          this.label = response.data.name;
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

<style lang="scss" scoped>
@use "@/css/variables";

.error-link {
  color: variables.$link;
  text-decoration: underline;

  &:hover {
    color: variables.$link-secondary;
    cursor: pointer;
  }
}
</style>
