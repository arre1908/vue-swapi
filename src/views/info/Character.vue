<template>
  <div>
    <h3 v-if="!character.name">{{ error || "Loading..." }}</h3>

    <InfoList v-else :item="character" :keys="keys" :links="links" />
  </div>
</template>

<script>
import { apiClient } from "../../apiService";
import InfoList from "@/components/InfoList";

export default {
  components: { InfoList },
  props: {
    id: { type: String, required: true },
    characterProp: { type: Object, default: () => null }
  },
  data() {
    return {
      character: {},
      keys: [
        { key: "birth_year", label: "Birth Year" },
        { key: "height", label: "Height" },
        { key: "mass", label: "Mass" },
        { key: "hair_color", label: "Hair Color" },
        { key: "skin_color", label: "Skin Color" },
        { key: "eye_color", label: "Eye Color" },
        { key: "gender", label: "Gender" }
      ],
      links: {
        homeworld: { label: "Homeworld", urls: [] },
        films: { label: "Films", urls: [] },
        vehicles: { label: "Vehicles", urls: [] },
        starships: { label: "Starships", urls: [] }
        // species: { label: "Species", urls: [] },
      },
      error: ""
    };
  },
  created() {
    if (this.characterProp) {
      // Get character from props
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
        .then(re => {
          let homeworld;
          // Destructor assignment of data members from response object
          ({
            homeworld,
            films: this.links.films.urls,
            vehicles: this.links.vehicles.urls,
            starships: this.links.starships.urls,
            // species: this.links.species.urls,
            ...this.character
          } = re.data);
          this.links.homeworld.urls = [homeworld];
        })
        .catch(err => {
          this.error = err;
        });
    }
  }
};
</script>

<style lang="scss" scoped>
@use "@/css/variables";
</style>
