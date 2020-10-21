<template>
  <img :src="imgUrl" @error.once="onError" />
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
      return `/img${stripBaseUrl(this.url, ".jpg")}`;
    }
  },
  methods: {
    onError(event) {
      // Use placeholder for missing image
      event.target.src = this.placeholderImg;
    }
  }
};
</script>
