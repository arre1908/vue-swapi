<template>
  <div>
    <h1>Films</h1>

    <Table url="films/" :columns="columns">
      <template v-slot:title="slotProps">
        <router-link :to="`/films/${getRouteId(slotProps.item.url)}`">
          {{ slotProps.item.title }}
        </router-link>
      </template>
    </Table>
  </div>
</template>

<script>
import { getRouteId } from "../apiService.js";
import Table from "@/components/Table";

export default {
  data() {
    return {
      columns: [
        { key: "title", label: "Title" },
        { key: "episode_id", label: "Episode" },
        { key: "director", label: "Director" },
        { key: "release_date", label: "Release Date" }
      ]
    };
  },
  methods: { getRouteId: getRouteId },
  components: { Table }
};
</script>

<style lang="scss" scoped>
@use "@/css/variables";
</style>
