<template>
  <div>
    <h3 v-if="!film.title">{{ error || "Loading..." }}</h3>

    <InfoList v-else :item="film" :keys="keys" :links="links">
      <template v-slot:header>
        <div class="opening">
          <h1>{{ film.title }}</h1>
          <p>{{ film.opening_crawl }}</p>
        </div>
      </template>
    </InfoList>
  </div>
</template>

<script>
import { apiClient } from "../../apiService";
import InfoList from "@/components/InfoList";

export default {
  components: { InfoList },
  props: {
    id: { type: String, required: true },
    filmProp: { type: Object, default: () => null }
  },
  data() {
    return {
      film: {},
      keys: [
        { key: "episode_id", label: "Episode" },
        { key: "release_date", label: "Release Date" },
        { key: "director", label: "Director" },
        { key: "producer", label: "Producer" }
      ],
      links: {
        starships: { label: "Starships", urls: [] },
        planets: { label: "Planets", urls: [] },
        vehicles: { label: "Vehicles", urls: [] },
        characters: { label: "Characters", urls: [] }
        // species: { label: "Species", urls: [] }
      },
      error: ""
    };
  },
  created() {
    if (this.filmProp) {
      // Get film from props
      this.film = this.filmProp;
    } else {
      this.fetchData();
    }
  },
  methods: {
    fetchData() {
      this.error = "";
      apiClient
        .get(`films/${this.id}/`)
        .then(re => {
          // Destructor assignment of data members from response object
          ({
            starships: this.links.starships.urls,
            planets: this.links.planets.urls,
            vehicles: this.links.vehicles.urls,
            characters: this.links.characters.urls,
            // species: this.links.species.urls,
            ...this.film
          } = re.data);
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

.opening {
  background: black;
  padding: 20px 0;
  color: variables.$link;
  text-align: center;
  white-space: pre-line;
}
</style>
