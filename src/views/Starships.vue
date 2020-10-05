<template>
  <div>
    <h1>Starships</h1>

    <ResultsGrid url="starships/" :columns="columns" />
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
        { key: "starship_class", label: "Class" },
        { key: "model", label: "Model" }
      ]
    };
  }
};
</script>
