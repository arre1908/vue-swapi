<template>
  <router-link :to="stripBaseUrl(item.url)" class="link-wrapper">
    <div :class="cardClasses">
      <ResultImage :url="item.url" :mini="mini" />

      <div class="content text-capitalize">
        {{ item.name || item.title }}
      </div>
    </div>
  </router-link>
</template>

<script>
import ResultImage from "@/components/ResultImage";
import { stripBaseUrl } from "@/apiService";

export default {
  components: { ResultImage },
  props: {
    item: { type: Object, required: true },
    mini: { type: Boolean, default: false }
  },
  computed: {
    cardClasses() {
      return ["card", this.mini ? "mini" : "default"];
    }
  },
  methods: {
    stripBaseUrl
  }
};
</script>

<style lang="scss" scoped>
@use "@/css/variables";

.link-wrapper {
  text-decoration: none;
}

.card {
  display: flex;
  height: 100%;
  color: variables.$text-primary;
  background-color: variables.$bg-header;
  border-radius: 10px;
  overflow: hidden;

  &.default {
    flex-direction: column;

    img {
      width: 100%;
    }

    .content {
      text-align: center;
    }
  }

  &.mini {
    align-items: stretch;
    height: 80px;

    img {
      height: 100%;
      max-width: 80px;
    }

    .content {
      display: flex;
      align-items: center;
    }
  }

  .content {
    padding: 10px 10px;
  }
}

/* Desktop styles */
@media all and (min-width: 1025px) {
  .card {
    transition: transform 0.2s;

    &:hover {
      color: variables.$link;
      transform: scale(1.05);
    }
  }
}
</style>
