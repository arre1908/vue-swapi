<template>
  <div id="info">
    <h1>
      <slot name="header">
        {{ item.name || item.title }}
      </slot>
    </h1>

    <div class="card">
      <ResultImage :url="item.url" />

      <!-- Text Attributes -->
      <div class="content">
        <div
          v-for="{ key, label, link } of attributes"
          :key="key"
          class="attributes"
        >
          <div class="label">{{ label }}:</div>

          <!-- Optional cell slot -->
          <div>
            <slot :name="key">
              <!-- Link -->
              <ResolveLink v-if="link" :data="item[key]" />

              <!-- Text -->
              <span v-else class="text-capitalize">{{ item[key] }}</span>
            </slot>
          </div>
        </div>
      </div>
    </div>

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
import ResolveLink from "@/components/ResolveLink";
import InfoLinks from "@/components/InfoLinks";
import ResultImage from "@/components/ResultImage";

export default {
  components: { ResolveLink, InfoLinks, ResultImage },
  props: {
    item: { type: Object, required: true },
    attributes: { type: Array, required: true },
    links: { type: Array, default: () => [] }
  }
};
</script>

<style lang="scss" scoped>
@use "@/css/variables";

.card {
  display: flex;
  background-color: variables.$bg-header;
  border-radius: 10px;
  overflow: hidden;

  img {
    max-width: 50%;
  }

  .content {
    padding: 15px;

    .attributes {
      display: flex;
      flex-flow: row wrap;
      margin: 5px 0;

      .label {
        font-weight: bold;
        margin-right: 10px;
      }
    }
  }
}

/* Mobile styles */
@media all and (max-width: 576px) {
  .card {
    flex-direction: column;

    img {
      max-width: unset;
      width: 100%;
      height: auto;
    }
  }
}
</style>
