<template>
  <div>
    <!-- Text Attributes -->
    <Info v-if="item.name" :item="item" :attributes="attributes" :links="links">
      <template v-slot:height>
        {{ item.height | cm }}
      </template>

      <template v-slot:mass>
        {{ item.mass | kg }}
      </template>

      <!-- Species Link -->
      <template v-slot:species>
        <router-link v-if="species.url" :to="stripBaseUrl(species.url)">
          {{ species.label }}
        </router-link>

        <span v-else>Loading...</span>
      </template>

      <!-- Homeworld Link -->
      <template v-slot:homeworld>
        <router-link v-if="homeworld.url" :to="stripBaseUrl(homeworld.url)">
          {{ homeworld.label }}
        </router-link>

        <span v-else>Loading...</span>
      </template>
    </Info>

    <h3 v-else>{{ error || "Loading..." }}</h3>
  </div>
</template>

<script>
import Info from "@/components/Info";
import { apiClient, stripBaseUrl } from "@/apiService";
import { infoMixins, filters } from "@/mixins";

export default {
  components: { Info },
  mixins: [infoMixins, filters],
  data() {
    return {
      species: {},
      homeworld: {},
      attributes: [
        { key: "species", label: "Species" },
        { key: "homeworld", label: "Homeworld" },
        { key: "birth_year", label: "Birth Year" },
        { key: "height", label: "Height" },
        { key: "mass", label: "Mass" },
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
    stripBaseUrl,
    // Overrides mixin method
    handleData(data) {
      this.item = data;

      // Resolve homeworld + species links
      this.resolveLink(this.item.homeworld, "homeworld");

      if (this.item.species.length) {
        this.resolveLink(this.item.species[0], "species");
      } else {
        this.species = { url: "/species/1/", label: "Human" };
      }
    },
    resolveLink(url, key) {
      apiClient.get(url).then(response => {
        this[key] = {
          url: stripBaseUrl(response.data.url),
          label: response.data.name
        };
      });
    }
  }
};
</script>
