<template>
  <div>
    <h1>Vehicles</h1>

    <Table url="vehicles/" :columns="columns" />
  </div>
</template>

<script>
import Table from "@/components/Table";

export default {
  data() {
    return {
      columns: [
        { key: "name", label: "Name" },
        { key: "vehicle_class", label: "Class" },
        { key: "model", label: "Model" }
      ]
    };
  },
  components: { Table }
};
</script>

<style lang="scss" scoped></style>
