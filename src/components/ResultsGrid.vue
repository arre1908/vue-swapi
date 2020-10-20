<template>
  <div>
    <!-- Results -->
    <transition-group name="results" tag="div" :class="gridClasses">
      <router-link
        v-for="[index, item] of items.entries()"
        :key="index"
        :to="stripBaseUrl(item.url)"
        class="link-wrapper"
      >
        <Card :item="item" :mini="mini" class="hover-animate" />
      </router-link>
    </transition-group>
  </div>
</template>

<script>
import Card from "@/components/Card";
import { stripBaseUrl } from "@/apiService";

export default {
  components: { Card },
  props: {
    items: { type: Array, required: true },
    mini: { type: Boolean, default: false }
  },
  computed: {
    gridClasses() {
      return ["results-grid", { mini: this.mini }];
    }
  },
  methods: { stripBaseUrl }
};
</script>

<style lang="scss" scoped>
@use "@/css/variables";

.results-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;

  &.mini {
    grid-template-columns: repeat(4, 1fr);
  }
}

.link-wrapper {
  color: variables.$text-primary;
  text-decoration: none;

  // Card
  & > div {
    height: 100%;
  }
}

/* transition-group animation */
.results-enter-active {
  transition: all 0.3s;
}

.results-enter {
  opacity: 0;
  transform: translateY(-1rem);
}

/* Desktop styles */
@media all and (min-width: 1025px) {
  .hover-animate {
    transition: transform 0.2s;

    &:hover {
      color: variables.$link;
      transform: scale(1.05);
    }
  }
}

/* Laptop styles */
@media all and (max-width: 1024px) {
  .results-grid {
    grid-template-columns: repeat(4, 1fr);

    &.mini {
      grid-template-columns: repeat(3, 1fr);
    }
  }
}

/* Tablet styles */
@media all and (max-width: 768px) {
  .results-grid {
    grid-template-columns: repeat(3, 1fr);

    &.mini {
      grid-template-columns: repeat(2, 1fr);
    }
  }
}

/* Mobile styles */
@media all and (max-width: 576px) {
  .results-grid {
    grid-template-columns: repeat(2, 1fr);

    &.mini {
      grid-template-columns: repeat(1, 1fr);
    }
  }
}
</style>
