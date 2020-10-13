<template>
  <div id="info">
    <h1>
      <slot name="header">
        {{ item.name || item.title }}
      </slot>
    </h1>

    <div class="card">
      <img
        src="https://via.placeholder.com/400x400.jpg/3d4049/dddddd/?text=NO+IMAGE+FOUND"
      />

      <!-- Text Attributes -->
      <div class="content">
        <div
          v-for="{ key, label, link } of attributes"
          :key="key"
          class="attributes"
        >
          <div class="label">{{ label }}:</div>

          <div class="text-capitalize">
            <!-- Optional cell slot -->
            <slot :name="key">
              <!-- Link -->
              <ResolveLink v-if="link" :data="item[key]" />

              <!-- Text -->
              <span v-else>{{ item[key] }}</span>
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

export default {
  components: { ResolveLink, InfoLinks },
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
  border: 1px solid variables.$bg-secondary;
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
