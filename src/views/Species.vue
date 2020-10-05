<template>
  <div>
    <h1>Species</h1>

    <ResultsGrid url="species/" :columns="columns" />
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
        { key: "classification", label: "Classification" },
        { key: "designation", label: "Designation" },
        { key: "language", label: "Language" }
      ]
    };
  }
};
</script>
