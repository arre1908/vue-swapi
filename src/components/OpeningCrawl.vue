<template>
  <div class="opening-crawl">
    <h1>{{ title }}</h1>
    <p>{{ text }}</p>
  </div>
</template>

<script>
export default {
  props: {
    title: { type: String, required: true },
    text: { type: String, required: true }
  }
};
</script>

<style lang="scss" scoped>
@use "@/css/variables";

.opening-crawl {
  background: black;
  margin: 20px 0;
  padding: 20px 0;
  color: variables.$link;
  text-align: center;
  white-space: pre-line;
}
</style>
