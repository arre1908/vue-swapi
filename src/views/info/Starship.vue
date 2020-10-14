<template>
  <div>
    <!-- Text Attributes -->
    <Info v-if="item.name" :item="item" :attributes="attributes" :links="links">
      <template v-slot:cost_in_credits>
        {{ format(item.cost_in_credits, "Credits") }}
      </template>

      <template v-slot:length>
        {{ format(item.length, "m") }}
      </template>

      <template v-slot:cargo_capacity>
        {{ format(item.cargo_capacity, "kg") }}
      </template>

      <template v-slot:MGLT>
        {{ format(item.MGLT, "MGLT/hr") }}
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
        { key: "model", label: "Model" },
        { key: "manufacturer", label: "Manufacturer" },
        { key: "starship_class", label: "Starship Class" },
        { key: "cost_in_credits", label: "Cost" },
        { key: "length", label: "Length" },
        { key: "crew", label: "Crew" },
        { key: "passengers", label: "Passengers" },
        { key: "cargo_capacity", label: "Cargo Capacity" },
        { key: "consumables", label: "Consumables" },
        { key: "hyperdrive_rating", label: "Hyperdrive Rating" },
        { key: "MGLT", label: "Megalight Speed" },
        { key: "max_atmosphering_speed", label: "Max Atmosphering Speed" }
      ],
      links: [
        { key: "people", label: "Pilots" },
        { key: "films", label: "Films" }
      ]
    };
  },
  methods: {
    // Overrides mixin method
    handleData(data) {
      // Rename 'pilots' attribute as 'people'
      let people, rest;
      ({ pilots: people, ...rest } = data);
      this.item = { people, ...rest };
    }
  }
};
</script>
