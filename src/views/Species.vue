<template>
  <div>
    <h1>Species</h1>

    <Table url="species/" :columns="columns" />
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
        { key: "classification", label: "Classification" },
        { key: "designation", label: "Designation" },
        { key: "language", label: "Language" }
      ]
    };
  }
};
</script>

<style lang="scss" scoped></style>
