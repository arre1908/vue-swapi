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
  data() {
    return { publicPath: process.env.BASE_URL };
  },
  computed: {
    placeholderImg() {
      return this.mini
        ? `${this.publicPath}img/placeholder-100.jpg`
        : `${this.publicPath}img/placeholder-400.jpg`;
    },
    imgUrl() {
      return `${this.publicPath}img${stripBaseUrl(this.url, ".jpg")}`;
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
