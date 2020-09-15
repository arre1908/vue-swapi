<template>
  <div>
    <h1>Films</h1>

    <Table :items="films" :columns="columns">
      <template v-slot:title="slotProps">
        <router-link :to="apiToRoute(slotProps.item.url)">
          {{ slotProps.item.title }}
        </router-link>
      </template>
    </Table>
  </div>
</template>

<script>
import api from "../apiService.js";
import Table from "@/components/Table";

export default {
  name: "Films",
  data() {
    return {
      films: [],
      columns: [
        { key: "title", label: "Title" },
        { key: "episode_id", label: "Episode" },
        { key: "director", label: "Director" },
        { key: "release_date", label: "Release Date" }
      ]
    };
  },
  methods: {
    apiToRoute(url) {
      let cleanUrl = url.replace(/\/$/, ""); // remove trailing '/'
      return `/films/${cleanUrl.split("/").pop()}`;
    }
  },
  created() {
    // Fetch all films
    api.films().then(re => {
      this.films = re.data.results;
    });
  },
  components: { Table }
};
</script>

<style lang="scss" scoped>
@use "@/css/variables";
</style>
