<template>
  <div>
    <h1>Characters</h1>
    <Table url="people/" :columns="columns">
      <template v-slot:name="slotProps">
        <router-link :to="`/characters/${getRouteId(slotProps.item.url)}`">
          {{ slotProps.item.name }}
        </router-link>
      </template>

      <template v-slot:height="slotProps">
        {{ slotProps.item.height / 100 }}
      </template>
    </Table>
  </div>
</template>

<script>
import { getRouteId } from "../apiService";
import Table from "@/components/Table";

export default {
  data() {
    return {
      columns: [
        { key: "name", label: "Name" },
        { key: "height", label: "Height (meters)" },
        { key: "eye_color", label: "Eye Color" },
        { key: "birth_year", label: "Birth Year" }
      ]
    };
  },
  methods: { getRouteId: getRouteId },
  components: { Table }
};
</script>

<style lang="scss" scoped></style>
