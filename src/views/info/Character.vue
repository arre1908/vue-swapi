<template>
  <div>
    <div v-if="item.name">
      <h1>{{ item.name }}</h1>

      <!-- Text Attributes -->
      <InfoCard :item="item" :attributes="attributes">
        <template v-slot:height>
          {{ item.height | meters }}
        </template>

        <template v-slot:species>
          <router-link v-if="species.url" :to="stripBaseUrl(species.url)">
            {{ species.label }}
          </router-link>

          <span v-else>Loading...</span>
        </template>

        <template v-slot:homeworld>
          <router-link v-if="homeworld.url" :to="stripBaseUrl(homeworld.url)">
            {{ homeworld.label }}
          </router-link>

          <span v-else>Loading...</span>
        </template>
      </InfoCard>

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
import { infoMixins, filters } from "@/mixins";

export default {
  components: { InfoCard, InfoLinks },
  mixins: [infoMixins, filters],
  data() {
    return {
      species: {},
      homeworld: {},
      attributes: [
        { key: "species", label: "Species" },
        { key: "homeworld", label: "Homeworld" },
        { key: "birth_year", label: "Birth Year" },
        { key: "height", label: "Height (meters)" },
        { key: "mass", label: "Mass (kg)" },
        { key: "hair_color", label: "Hair Color" },
        { key: "skin_color", label: "Skin Color" },
        { key: "eye_color", label: "Eye Color" },
        { key: "gender", label: "Gender" }
      ],
      links: [
        { key: "films", label: "Films" },
        { key: "vehicles", label: "Vehicles" },
        { key: "starships", label: "Starships" }
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
          this.item = response.data;

          // Resolve homeworld + species links
          this.resolveLink(this.item.homeworld, "homeworld");

          if (this.item.species.length) {
            this.resolveLink(this.item.species[0], "species");
          } else {
            this.species = { url: "/species/1/", label: "Human" };
          }
        })
        .catch(err => {
          this.error = err;
        });
    }
  }
};
</script>
