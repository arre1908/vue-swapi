<template>
  <div>
    <!-- Results -->
    <transition-group name="results" tag="div" class="results-grid">
      <router-link
        v-for="[index, item] of items.entries()"
        :key="index"
        class="link-wrapper"
        :to="stripBaseUrl(item.url)"
      >
        <div class="card">
          <img
            src="https://via.placeholder.com/400x400.jpg/3d4049/dddddd/?text=NO+IMAGE+FOUND"
          />

          <div class="card-text text-capitalize">
            {{ item.name || item.title }}
          </div>
        </div>
      </router-link>
    </transition-group>
  </div>
</template>

<script>
import { stripBaseUrl } from "@/apiService";

export default {
  props: {
    items: { type: Array, required: true }
  },
  methods: {
    stripBaseUrl: stripBaseUrl
  }
};
</script>

<style lang="scss" scoped>
@use "@/css/variables";

.results-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;

  .link-wrapper {
    text-decoration: none;

    .card {
      height: 100%;
      color: variables.$text-primary;
      border: 1px solid variables.$bg-secondary;
      border-radius: 10px;
      overflow: hidden;
      transition: all 0.2s;

      img {
        width: 100%;
      }

      .card-text {
        padding: 10px 10px;
        text-align: center;
      }

      &:hover {
        color: variables.$link;
        transform: scale(1.05);
      }
    }
  }
}

.results-enter-active {
  transition: all 0.3s;
}

.results-enter {
  opacity: 0;
  transform: translateY(-1rem);
}

/* Mobile styles */
@media all and (max-width: 576px) {
  .results-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
