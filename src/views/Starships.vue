<template>
  <div>
    <h1>Starships</h1>

    <Table url="starships/" :columns="columns" />
  </div>
</template>

<script>
import Table from "@/components/Table";

export default {
  data() {
    return {
      columns: [
        { key: "name", label: "Name" },
        { key: "starship_class", label: "Class" },
        { key: "model", label: "Model" }
      ]
    };
  },
  components: { Table }
};
</script>

<style lang="scss" scoped></style>
