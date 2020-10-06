<template>
  <div>
    <h3 v-if="!film.title">{{ error || "Loading..." }}</h3>

    <InfoList v-else :item="film" :attributes="attributes" :links="links">
      <template v-slot:header>
        <OpeningCrawl :title="film.title" :text="film.opening_crawl" />
      </template>
    </InfoList>
  </div>
</template>

<script>
import { apiClient } from "@/apiService";
import InfoList from "@/components/InfoList";
import OpeningCrawl from "@/components/OpeningCrawl";

export default {
  components: { InfoList, OpeningCrawl },
  props: {
    id: { type: String, required: true },
    filmProp: { type: Object, default: () => null }
  },
  data() {
    return {
      film: {},
      attributes: [
        { key: "episode_id", label: "Episode" },
        { key: "release_date", label: "Release Date" },
        { key: "director", label: "Director" },
        { key: "producer", label: "Producer" }
      ],
      links: {
        characters: { label: "Characters", urls: [], data: [], loading: false },
        planets: { label: "Planets", urls: [], data: [], loading: false },
        starships: { label: "Starships", urls: [], data: [], loading: false },
        vehicles: { label: "Vehicles", urls: [], data: [], loading: false }
        // species: { label: "Species", urls: [], data: [], loading: false }
      },
      error: ""
    };
  },
  created() {
    if (this.filmProp) {
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
        .then(response => {
          // Destructor assignment of data members from response object
          ({
            characters: this.links.characters.urls,
            planets: this.links.planets.urls,
            starships: this.links.starships.urls,
            vehicles: this.links.vehicles.urls,
            // species: this.links.species.urls,
            ...this.film
          } = response.data);
        })
        .catch(err => {
          this.error = err;
        });
    }
  }
};
</script>
