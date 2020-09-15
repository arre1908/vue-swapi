<template>
  <div>
    <h1>Films</h1>
    <Table :items="films" :columns="columns" />
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
  created() {
    // Fetch all films
    api.films().then(re => {
      this.films = re.data.results;
    });
  },
  components: { Table }
};
</script>

<style lang="scss" scoped></style>
