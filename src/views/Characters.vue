<template>
  <div>
    <h1>Characters</h1>
    <Table url="people/" :columns="columns">
      <template v-slot:height="slotProps">
        {{
          slotProps.item.height === "unknown"
            ? "Unknown"
            : slotProps.item.height / 100
        }}
      </template>
    </Table>
  </div>
</template>

<script>
import Table from "@/components/Table";

export default {
  components: { Table },
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
