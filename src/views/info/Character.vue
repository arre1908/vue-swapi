<template>
  <div>
    <h3 v-if="!character.name">{{ error || "Loading..." }}</h3>

    <InfoList v-else :item="character" :attributes="attributes" :links="links">
      <template v-slot:height>
        {{
          character.height === "unknown" ? "Unknown" : character.height / 100
        }}
      </template>
    </InfoList>
  </div>
</template>

<script>
import InfoList from "@/components/InfoList";
import { apiClient } from "../../apiService";

export default {
  components: { InfoList },
  props: {
    id: { type: String, required: true },
    characterProp: { type: Object, default: () => null }
  },
  data() {
    return {
      character: {},
      attributes: [
        { key: "birth_year", label: "Birth Year" },
        { key: "height", label: "Height (meters)" },
        { key: "mass", label: "Mass (kg)" },
        { key: "hair_color", label: "Hair Color" },
        { key: "skin_color", label: "Skin Color" },
        { key: "eye_color", label: "Eye Color" },
        { key: "gender", label: "Gender" }
      ],
      links: {
        homeworld: { label: "Homeworld", urls: [] },
        species: { label: "Species", urls: [] },
        films: { label: "Films", urls: [] },
        vehicles: { label: "Vehicles", urls: [] },
        starships: { label: "Starships", urls: [] }
      },
      error: ""
    };
  },
  created() {
    if (this.characterProp) {
      this.character = this.characterProp;
    } else {
      this.fetchData();
    }
  },
  methods: {
    fetchData() {
      this.error = "";
      apiClient
        .get(`people/${this.id}/`)
        .then(response => {
          // Destructor assignment of data from response object
          let homeworld;
          ({
            homeworld,
            species: this.links.species.urls,
            films: this.links.films.urls,
            vehicles: this.links.vehicles.urls,
            starships: this.links.starships.urls,
            ...this.character
          } = response.data);

          this.links.homeworld.urls.push(homeworld);
        })
        .catch(err => {
          this.error = err;
        });
    }
  }
};
</script>
