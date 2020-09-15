<template>
  <div>
    <table>
      <thead>
        <th v-for="col of columns" :key="col.key">{{ col.label }}</th>
      </thead>
      <tbody>
        <tr v-for="[index, item] of items.entries()" :key="index">
          <td v-for="col of columns" :key="col.key">{{ item[col.key] }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    items: { type: Array, required: true },
    columns: { type: Array, required: true }
  }
};
</script>

<style lang="scss" scoped>
@use "@/css/variables";

table {
  width: 100%;
  border: 1px solid whitesmoke;
  border-spacing: 0;
}

th,
td {
  padding: 5px;
}

th {
  border: 1px solid whitesmoke;
}

td {
  border: 1px solid variables.$bg-secondary;
}
</style>
