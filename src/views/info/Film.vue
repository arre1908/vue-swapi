<template>
  <div>
    <div v-if="item.title">
      <!-- Text Attributes -->
      <Info :item="item" :attributes="attributes" :links="links">
        <template v-slot:header>
          <OpeningCrawl :title="item.title" :text="item.opening_crawl" />
        </template>

        <template v-slot:release_date>
          {{ item.release_date | date }}
        </template>
      </Info>
    </div>

    <h3 v-else>{{ error || "Loading..." }}</h3>
  </div>
</template>

<script>
import Info from "@/components/Info";
import { filters, infoMixins } from "@/mixins";

export default {
  components: { Info },
  mixins: [infoMixins, filters],
  data() {
    return {
      attributes: [
        { key: "episode_id", label: "Episode" },
        { key: "release_date", label: "Release Date" },
        { key: "director", label: "Director" },
        { key: "producer", label: "Producer" }
      ],
      links: [
        { key: "characters", label: "Characters" },
        { key: "planets", label: "Planets" },
        { key: "starships", label: "Starships" },
        { key: "vehicles", label: "Vehicles" },
        { key: "species", label: "Species" }
      ]
    };
  }
};
</script>
