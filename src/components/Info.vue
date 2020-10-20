<template>
  <div id="info">
    <h1>
      <slot name="header">
        {{ item.name || item.title }}
      </slot>
    </h1>

    <Card :item="item" :rows="true">
      <div class="attributes">
        <div v-for="{ key, label, link } of attributes" :key="key" class="attr">
          <div class="label">{{ label }}:</div>

          <!-- Link -->
          <ResolveLink v-if="link" :data="item[key]" />

          <!-- Text -->
          <span v-else class="text-capitalize">{{ item[key] }}</span>
        </div>
      </div>
    </Card>

    <!-- Links -->
    <InfoLinks
      v-for="{ key, label } of links"
      :key="key"
      :links="item[key]"
      :label="label"
    />
  </div>
</template>

<script>
import Card from "@/components/Card";
import ResolveLink from "@/components/ResolveLink";
import InfoLinks from "@/components/InfoLinks";

export default {
  components: { Card, ResolveLink, InfoLinks },
  props: {
    item: { type: Object, required: true },
    attributes: { type: Array, required: true },
    links: { type: Array, default: () => [] }
  }
};
</script>

<style lang="scss" scoped>
@use "@/css/variables";

.attributes {
  padding: 20px;

  .attr {
    display: flex;
    flex-flow: row wrap;
    margin: 5px 0;

    .label {
      font-weight: bold;
      margin-right: 10px;
    }
  }
}
</style>
