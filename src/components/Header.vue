<template>
  <header>
    <div>
      <img alt="Vue-SWAPI logo" src="../assets/logo.png" />
    </div>
    <nav>
      <router-link v-for="link of links" :key="link.path" :to="link.path">
        {{ link.name }}
      </router-link>
    </nav>
  </header>
</template>

<script>
export default {
  data() {
    return {
      links: [
        { path: "/films", name: "Films" },
        { path: "/characters", name: "Characters" },
        { path: "/planets", name: "Planets" },
        { path: "/species", name: "Species" },
        { path: "/starships", name: "Starships" },
        { path: "/vehicles", name: "Vehicles" },
        { path: "/about", name: "About" }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
@use "@/css/variables.scss";

header {
  margin: 30px 0;
  text-align: center;
}

nav {
  a {
    background: variables.$link;
    color: variables.$bg-primary;
    margin: 0 10px;
    padding: 10px;
    font-weight: bold;
    line-height: 3.5;
    text-decoration: none;

    &.router-link-exact-active {
      background: variables.$bg-secondary;
      color: variables.$text-primary;
    }
  }
}

img {
  max-width: 100%;
  margin-bottom: 40px;
}
</style>
