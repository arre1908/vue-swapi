<template>
  <div id="app">
    <Header />
    <router-view class="container" />
  </div>
</template>

<script>
import Header from "@/components/Header";
export default {
  components: {
    Header
  }
};
</script>

<style lang="scss">
.container {
  margin: 30px auto;
  padding: 0 10px;
  max-width: 1200px;
}
</style>
