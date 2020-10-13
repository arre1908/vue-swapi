<template>
  <div>
    <!-- Text Attributes -->
    <Info v-if="item.name" :item="item" :attributes="attributes" :links="links">
      <template v-slot:average_height>
        {{ item.average_height | cm }}
      </template>

      <template v-slot:average_lifespan>
        {{ item.average_lifespan | years }}
      </template>
    </Info>

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
        { key: "homeworld", label: "Homeworld", link: true },
        { key: "classification", label: "Classification" },
        { key: "designation", label: "Designation" },
        { key: "language", label: "Language" },
        { key: "average_height", label: "Average Height" },
        { key: "average_lifespan", label: "Average Lifespan" },
        { key: "hair_colors", label: "Hair Colors" },
        { key: "skin_colors", label: "Skin Colors" },
        { key: "eye_colors", label: "Eye Colors" }
      ],
      links: [
        { key: "people", label: "Characters" },
        { key: "films", label: "Films" }
      ],
      homeworld: {}
    };
  }
};
</script>
