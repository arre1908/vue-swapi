<template>
  <div id="root">
    <header :class="{ 'mb-expand': expandMenu }">
      <!-- Logo -->
      <router-link to="/">
        <img id="logo" src="../assets/logo.png" alt="Vue-SWAPI" />
      </router-link>

      <!-- Menu Button -->
      <button :class="{ active: expandMenu }" @click="expandMenu = !expandMenu">
        <svg viewBox="0 0 100 100" width="20" height="20">
          <rect id="r1" width="100" height="10" rx="5"></rect>
          <rect id="r2" y="45" width="100" height="10" rx="5"></rect>
          <rect id="r3" y="90" width="100" height="10" rx="5"></rect>
        </svg>
      </button>

      <!-- Navigation Links -->
      <nav @click="expandMenu = false">
        <router-link
          v-for="link of links"
          :key="link.path"
          :to="link.path"
          class="nav-link"
        >
          {{ link.name }}
        </router-link>
      </nav>
    </header>
  </div>
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
#root {
  background-color: variables.$bg-header;
}

header {
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  min-height: 50px;
  margin: 0 auto;
}

#logo {
  height: 20px;
  margin: 0 20px 0 10px;
}

button {
  display: none;
}

nav {
  flex: 1;
  display: flex;
  // justify-content: flex-end;

  .nav-link {
    margin: 0 10px;
    text-decoration: none;
    color: variables.$text-primary;

    &:hover {
      color: variables.$text-secondary;
    }

    &.router-link-active,
    &.router-link-active:hover {
      color: variables.$link-secondary;
    }
  }
}

/* Mobile styles */
@media screen and (max-width: 768px) {
  header {
    justify-content: space-between;
    overflow: hidden;
    max-height: 50px;
    transition: max-height 0.5s;

    &.mb-expand {
      max-height: 1000px;
      transition: max-height 1s;
    }
  }

  button {
    display: initial;
    background-color: transparent;
    fill: variables.$text-secondary;
    padding: 15px;
    border: none;

    &.active {
      fill: variables.$text-primary;

      // Transform to 'X'
      svg {
        #r1 {
          transform: rotateZ(-45deg) translateY(45px);
          transform-origin: center;
        }
        #r2 {
          transform: rotateZ(45deg);
          transform-origin: center;
        }
        #r3 {
          display: none;
        }
      }
    }
  }

  nav {
    flex: 1 100%;
    flex-direction: column;

    .nav-link {
      margin: 0;
      padding: 15px;
    }
  }
}
</style>
