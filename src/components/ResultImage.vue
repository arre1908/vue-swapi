<template>
  <img :src="imgUrl" @error="onError" />
</template>

<script>
import { stripBaseUrl } from "@/apiService";

export default {
  props: {
    url: { type: String, required: true },
    mini: { type: Boolean, default: false }
  },
  computed: {
    placeholderImg() {
      return this.mini
        ? "/img/placeholder-100.jpg"
        : "/img/placeholder-400.jpg";
    },
    imgUrl() {
      let url = stripBaseUrl(this.url);
      return `/img/${url.slice(1, url.length - 1)}.jpg`;
    }
  },
  methods: {
    onError(event) {
      // Use "not found" image
      event.target.onerror = null;
      event.target.src = this.placeholderImg;
    }
  }
};
</script>

<style lang="scss" scoped></style>
