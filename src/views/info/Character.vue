<template>
  <div>
    <!-- Text Attributes -->
    <Info v-if="item.name" :item="item" :attributes="attributes" :links="links">
      <template v-slot:height>
        {{ format(item.height, "cm") }}
      </template>

      <template v-slot:mass>
        {{ format(item.mass, "kg") }}
      </template>
    </Info>

    <h3 v-else>{{ error || "Loading..." }}</h3>
  </div>
</template>

<script>
import Info from "@/components/Info";
import { infoMixins } from "@/mixins";

export default {
  components: { Info },
  mixins: [infoMixins],
  data() {
    return {
      attributes: [
        { key: "species", label: "Species", link: true },
        { key: "homeworld", label: "Homeworld", link: true },
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
  }
};
</script>
