<template>
  <div>
    <h1>Vehicles</h1>

    <ResultsGrid url="vehicles/" :columns="columns" />
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
        { key: "vehicle_class", label: "Class" },
        { key: "model", label: "Model" }
      ]
    };
  }
};
</script>
