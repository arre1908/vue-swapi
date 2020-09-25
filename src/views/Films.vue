<template>
  <div>
    <h1>Films</h1>
    <Table url="films/" :columns="columns" />
  </div>
</template>

<script>
import Table from "@/components/Table";

export default {
  components: { Table },
  data() {
    return {
      columns: [
        { key: "title", label: "Title" },
        { key: "episode_id", label: "Episode" },
        { key: "director", label: "Director" },
        { key: "release_date", label: "Release Date" }
      ]
    };
  }
};
</script>
