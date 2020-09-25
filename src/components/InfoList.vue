<template>
  <div id="info">
    <slot name="header">
      <h1>{{ item.name || item.title }}</h1>
    </slot>

    <!-- Text Attributes -->
    <div v-for="attr of attributes" :key="attr.key">
      <h3>{{ attr.label }}</h3>
      <slot :name="attr.key">
        <span class="text-capitalize">
          {{ item[attr.key] }}
        </span>
      </slot>
    </div>

    <!-- Links -->
    <InfoLinks
      v-for="[key, l] of Object.entries(links)"
      :key="key"
      :links="l"
    />
  </div>
</template>

<script>
import InfoLinks from "@/components/InfoLinks";

export default {
  components: { InfoLinks },
  props: {
    item: { type: Object, required: true },
    attributes: { type: Array, required: true },
    links: { type: Object, default: () => {} }
  }
};
</script>

<style lang="scss" scoped>
@use "@/css/variables";

#info {
  margin: 0 auto;
  padding: 0 10px;
  max-width: 600px;
  text-align: center;
}
</style>
