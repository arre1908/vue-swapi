<template>
  <div id="app">
    <Header />
    <router-view />
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
@use "@/css/variables.scss";

#app {
  margin: 0 auto;
  max-width: 1200px;
  color: variables.$text-primary;
}
</style>
