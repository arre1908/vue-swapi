<template>
  <div>
    <!-- Results -->
    <transition-group name="results" tag="div" :class="gridClasses">
      <Result
        v-for="[index, item] of items.entries()"
        :key="index"
        :item="item"
        :mini="mini"
      />
    </transition-group>
  </div>
</template>

<script>
import Result from "@/components/Result";

export default {
  components: { Result },
  props: {
    items: { type: Array, required: true },
    mini: { type: Boolean, default: false }
  },
  computed: {
    gridClasses() {
      return ["results-grid", this.mini ? "mini" : "default"];
    }
  }
};
</script>

<style lang="scss" scoped>
@use "@/css/variables";

.results-grid {
  display: grid;
  gap: 1rem;

  &.default {
    grid-template-columns: repeat(5, 1fr);
  }

  &.mini {
    grid-template-columns: repeat(4, 1fr);
  }
}

.results-enter-active {
  transition: all 0.3s;
}

.results-enter {
  opacity: 0;
  transform: translateY(-1rem);
}

/* Tablet styles */
@media all and (max-width: 1024px) {
  .results-grid.default {
    grid-template-columns: repeat(4, 1fr);
  }

  .results-grid.mini {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* Mobile styles */
@media all and (max-width: 576px) {
  .results-grid.default {
    grid-template-columns: repeat(2, 1fr);
  }

  .results-grid.mini {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>
