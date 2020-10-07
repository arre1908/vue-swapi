<template>
  <div>
    <div v-if="item.title">
      <h1>{{ item.title }}</h1>

      <!-- Text Attributes -->
      <InfoCard :item="item" :attributes="attributes">
        <template v-slot:header>
          <OpeningCrawl :title="item.title" :text="item.opening_crawl" />
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
import { infoMixins } from "@/mixins";

export default {
  components: { InfoCard, InfoLinks },
  mixins: [infoMixins],
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
