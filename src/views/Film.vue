<template>
  <div id="film">
    <h1 v-if="!film.title">Loading...</h1>

    <div v-else class="opening">
      <h1>{{ film.title.toUpperCase() }}</h1>
      <p>{{ film.opening_crawl }}</p>
    </div>

    <p>WASD WASD wasdwasd awdsadwasd.</p>
    <a href="google.com">Google</a>
  </div>
</template>

<script>
import { apiClient } from "../apiService";

export default {
  props: {
    id: { type: String, required: true }
  },
  data() {
    return {
      film: {}
    };
  },
  created() {
    apiClient.get(`films/${this.id}/`).then(re => {
      this.film = re.data;
    });
  }
};
</script>

<style lang="scss" scoped>
@use "@/css/variables";

#film {
  margin: 0 auto;
  max-width: 600px;
}

.opening {
  background: black;
  padding: 20px 0;
  color: variables.$link;
  text-align: center;
  white-space: pre-line;
}
</style>
