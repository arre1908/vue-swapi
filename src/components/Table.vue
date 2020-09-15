<template>
  <div>
    <table>
      <thead>
        <th v-for="col of columns" :key="col.key">{{ col.label }}</th>
      </thead>
      <tbody>
        <tr v-for="[index, item] of items.entries()" :key="index">
          <td v-for="col of columns" :key="col.key">
            <!-- Optional slot for any cell (uses column 'key' as the name) -->
            <slot :name="col.key" :item="item">
              {{ item[col.key] }}
            </slot>
          </td>
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
  border: 1px solid variables.$text-primary;
  border-spacing: 0;
}

th,
td {
  padding: 5px;
}

th {
  border: 1px solid variables.$text-primary;
}

td {
  border: 1px solid variables.$bg-secondary;
}
</style>
