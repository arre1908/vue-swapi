<template>
  <div>
    <h1>Planets</h1>

    <Table url="planets/" :columns="columns" />
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
        { key: "terrain", label: "Terrain" },
        { key: "climate", label: "Climate" },
        { key: "population", label: "Population" }
      ]
    };
  }
};
</script>

<style lang="scss" scoped></style>
