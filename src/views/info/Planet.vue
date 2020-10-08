<template>
  <div>
    <div v-if="item.name">
      <h1>{{ item.name }}</h1>

      <!-- Text Attributes -->
      <InfoCard :item="item" :attributes="attributes" />

      <!-- Links -->
      <InfoLinks
        v-for="{ key, label } of links"
        :key="key"
        :links="item[key]"
        :label="label"
      />
    </div>

    <h3 v-else>{{ error || "Loading..." }}</h3>
  </div>
</template>

<script>
import InfoCard from "@/components/InfoCard";
import InfoLinks from "@/components/InfoLinks";
import { apiClient } from "@/apiService";
import { infoMixins } from "@/mixins";

export default {
  components: { InfoCard, InfoLinks },
  mixins: [infoMixins],
  data() {
    return {
      species: {},
      homeworld: {},
      attributes: [
        { key: "climate", label: "Climate" },
        { key: "terrain", label: "Terrain" },
        { key: "surface_water", label: "Surface Water (%)" },
        { key: "gravity", label: "Gravity" },
        { key: "diameter", label: "Diameter (km)" },
        { key: "rotation_period", label: "Rotation Period (hours)" },
        { key: "orbital_period", label: "Orbital Period (days)" },
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
        .get(this.$route.fullPath)
        .then(response => {
          // Rename 'residents' attribute as 'people'
          let people, rest;
          ({ residents: people, ...rest } = response.data);
          this.item = { people, ...rest };

          this.$emit("breadcrumb", this.item);
        })
        .catch(err => {
          this.error = err;
        });
    }
  }
};
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
}
</style>
