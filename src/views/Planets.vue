<template>
  <div>
    <h1>Planets</h1>

    <ResultsGrid url="planets/" :columns="columns" />
  </div>
</template>

<script>
import ResultsGrid from "@/components/ResultsGrid";

export default {
  components: { ResultsGrid },
  data() {
    return {
      columns: [
        { key: "name", label: "Name" },
        { key: "terrain", label: "Terrain" },
        { key: "climate", label: "Climate" },
        { key: "population", label: "Population" }
      ]
    };
  }
};
</script>
