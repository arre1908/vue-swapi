<template>
  <div>
    <div v-if="item.name">
      <!-- Text Attributes -->
      <Info :item="item" :attributes="attributes" :links="links">
        <template v-slot:diameter>
          {{ item.diameter | km }}
        </template>

        <template v-slot:surface_water>
          {{ item.surface_water | percent }}
        </template>

        <template v-slot:rotation_period>
          {{ item.rotation_period | hours }}
        </template>

        <template v-slot:orbital_period>
          {{ item.orbital_period | days }}
        </template>

        <template v-slot:population>
          {{ item.population | number }}
        </template>
      </Info>
    </div>

    <h3 v-else>{{ error || "Loading..." }}</h3>
  </div>
</template>

<script>
import Info from "@/components/Info";
import { apiClient } from "@/apiService";
import { infoMixins, filters } from "@/mixins";

export default {
  components: { Info },
  mixins: [infoMixins, filters],
  data() {
    return {
      attributes: [
        { key: "climate", label: "Climate" },
        { key: "terrain", label: "Terrain" },
        { key: "surface_water", label: "Surface Water" },
        { key: "gravity", label: "Gravity" },
        { key: "diameter", label: "Diameter" },
        { key: "rotation_period", label: "Rotation Period" },
        { key: "orbital_period", label: "Orbital Period" },
        { key: "population", label: "Population" }
      ],
      links: [
        { key: "people", label: "Residents" },
        { key: "films", label: "Films" }
      ]
    };
  },
  methods: {
    // Overrides mixin method
    fetchData() {
      this.error = "";
      return apiClient
        .get(this.$route.path)
        .then(response => {
          // Rename 'residents' attribute as 'people'
          let people, rest;
          ({ residents: people, ...rest } = response.data);
          this.item = { people, ...rest };
        })
        .catch(err => {
          this.error = err;
        });
    }
  }
};
</script>
