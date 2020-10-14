<template>
  <div>
    <!-- Text Attributes -->
    <Info v-if="item.name" :item="item" :attributes="attributes" :links="links">
      <template v-slot:diameter>
        {{ format(item.diameter, "km") }}
      </template>

      <template v-slot:surface_water>
        {{ format(item.surface_water, "%", "") }}
      </template>

      <template v-slot:rotation_period>
        {{ format(item.rotation_period, "Hours") }}
      </template>

      <template v-slot:orbital_period>
        {{ format(item.orbital_period, "Days") }}
      </template>

      <template v-slot:population>
        {{ format(item.population) }}
      </template>
    </Info>

    <h3 v-else>{{ error || "Loading..." }}</h3>
  </div>
</template>

<script>
import Info from "@/components/Info";
import { infoMixins } from "@/mixins";

export default {
  components: { Info },
  mixins: [infoMixins],
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
    handleData(data) {
      // Rename 'residents' attribute as 'people'
      let people, rest;
      ({ residents: people, ...rest } = data);
      this.item = { people, ...rest };
    }
  }
};
</script>
