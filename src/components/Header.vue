<template>
  <header>
    <div class="title">
      <!-- Logo -->
      <router-link to="/" tag="picture">
        <source media="(min-width: 768px)" srcset="../assets/logo.png" />
        <source srcset="../assets/logo-text.png" />
        <img src="../assets/logo-text.png" alt="Vue-SWAPI" />
      </router-link>

      <!-- Menu Button -->
      <button :class="{ active: expandMenu }" @click="expandMenu = !expandMenu">
        <svg viewBox="0 0 100 100" width="20" height="20">
          <rect width="100" height="10" rx="5"></rect>
          <rect y="40" width="100" height="10" rx="5"></rect>
          <rect y="80" width="100" height="10" rx="5"></rect>
        </svg>
      </button>
    </div>

    <!-- Navigation Links -->
    <nav :class="{ 'mb-hidden': !expandMenu }" @click="expandMenu = false">
      <router-link
        v-for="link of links"
        :key="link.path"
        :to="link.path"
        class="btn btn-secondary nav-link"
      >
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
        { path: "/people", name: "Characters" },
        { path: "/planets", name: "Planets" },
        { path: "/species", name: "Species" },
        { path: "/starships", name: "Starships" },
        { path: "/vehicles", name: "Vehicles" },
        { path: "/about", name: "About" }
      ],
      expandMenu: false
    };
  }
};
</script>

<style lang="scss" scoped>
@use "@/css/variables.scss";

/* Desktop styles */
.title {
  text-align: center;
  margin: 30px 0;

  picture {
    cursor: pointer;
  }

  button {
    display: none;
  }
}

nav {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;

  .nav-link {
    margin: 10px;
    padding: 10px;
    text-decoration: none;

    &.router-link-exact-active,
    &.router-link-exact-active:hover {
      background-color: variables.$link;
      color: variables.$bg-primary;
    }
  }
}

/* Mobile styles */
@media screen and (max-width: 767px) {
  .title {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 50px;
    margin: 0;

    picture {
      height: 100%;
      padding: 15px 10px;

      img {
        height: 100%;
      }
    }

    button {
      display: initial;
      background-color: variables.$bg-primary;
      fill: variables.$text-secondary;
      padding: 15px;
      border: none;

      &.active {
        background-color: variables.$bg-secondary;
        fill: variables.$text-primary;
      }
    }
  }

  nav {
    display: flex;
    flex-direction: column;

    .nav-link {
      margin: 0;
      border-radius: 0;
    }
  }

  .mb-hidden {
    display: none;
  }
}
</style>
