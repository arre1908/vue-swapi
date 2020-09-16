<template>
  <div>
    <h1>Species</h1>

    <Table url="species/" :columns="columns" />
  </div>
</template>

<script>
import Table from "@/components/Table";

export default {
  data() {
    return {
      columns: [
        { key: "name", label: "Name" },
        { key: "classification", label: "Classification" },
        { key: "designation", label: "Designation" },
        { key: "language", label: "Language" }
      ]
    };
  },
  components: { Table }
};
</script>

<style lang="scss" scoped></style>
