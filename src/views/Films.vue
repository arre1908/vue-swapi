<template>
  <div>
    <h1>Films</h1>
    <ResultsGrid url="films/" :columns="columns" />
  </div>
</template>

<script>
import ResultsGrid from "@/components/ResultsGrid";

export default {
  components: { ResultsGrid },
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
