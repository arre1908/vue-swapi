<template>
  <router-link :to="stripBaseUrl(data.url)" class="link-wrapper">
    <div :class="cardClasses">
      <img :src="placeholderImg" />

      <div class="content text-capitalize">
        {{ data.name || data.title }}
      </div>
    </div>
  </router-link>
</template>

<script>
import { stripBaseUrl } from "@/apiService";

export default {
  props: {
    data: { type: Object, required: true },
    mini: { type: Boolean, default: false }
  },
  computed: {
    cardClasses() {
      return ["card", this.mini ? "mini" : "default"];
    },
    placeholderImg() {
      return this.mini
        ? "https://via.placeholder.com/100x100.jpg/3d4049/dddddd/?text=NO+IMAGE"
        : "https://via.placeholder.com/400x400.jpg/3d4049/dddddd/?text=NO+IMAGE+FOUND";
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
  height: 100%;
  color: variables.$text-primary;
  border: 1px solid variables.$bg-secondary;
  border-radius: 10px;
  overflow: hidden;

  &.default {
    img {
      width: 100%;
    }

    .content {
      text-align: center;
    }
  }

  &.mini {
    display: flex;
    align-items: stretch;
    height: 80px;

    img {
      height: 100%;
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
