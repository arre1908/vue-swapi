<template>
  <div>
    <h1>Characters</h1>
    <ResultsGrid url="people/" :columns="columns">
      <template v-slot:height="slotProps">
        {{ slotProps.item.height | meters }}
      </template>
    </ResultsGrid>
  </div>
</template>

<script>
import ResultsGrid from "@/components/ResultsGrid";
import { filters } from "../mixins";

export default {
  components: { ResultsGrid },
  mixins: [filters],
  data() {
    return {
      columns: [
        { key: "name", label: "Name" },
        { key: "height", label: "Height (meters)" },
        { key: "eye_color", label: "Eye Color" },
        { key: "birth_year", label: "Birth Year" }
      ]
    };
  }
};
</script>
