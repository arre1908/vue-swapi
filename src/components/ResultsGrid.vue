<template>
  <div>
    <Searchbar :loading="isLoading" @submit="search($event)" />

    <transition-group name="rows" tag="div" class="results-grid">
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

    <div class="footer">
      <!-- Load more -->
      <div v-if="next">
        <LoadButton
          :loading="isLoading"
          :error="error"
          text="Load More"
          @click="fetchData()"
        />
      </div>

      <!-- No results -->
      <div v-else-if="!items.length">
        <div class="no-results">
          No results found
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Searchbar from "@/components/Searchbar";
import LoadButton from "@/components/LoadButton";
import { apiClient, stripBaseUrl } from "../apiService";

export default {
  components: { LoadButton, Searchbar },
  props: {
    url: { type: String, required: true },
    columns: { type: Array, required: true }
  },
  data() {
    return {
      items: [],
      next: "",
      isLoading: true,
      error: null
    };
  },
  created() {
    // Initialize 'next' URL from props
    this.next = this.url;
    this.fetchData();
  },
  methods: {
    stripBaseUrl: stripBaseUrl,
    fetchData() {
      this.isLoading = true;
      this.error = null;
      apiClient
        .get(this.next)
        .then(response => {
          // Append response data to list of items (table rows)
          this.items = this.items.concat(response.data.results);
          this.next = response.data.next;
        })
        .catch(error => {
          this.error = error;
        })
        .finally(() => {
          this.isLoading = false;
          // window.scrollTo(0, document.body.scrollHeight);
        });
    },
    search(query) {
      this.next = `${this.url}?search=${query}`;
      this.items = [];
      this.fetchData();
    }
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

.footer {
  margin: 30px 0;
  text-align: center;

  * {
    width: 100%;
  }
}

.rows-enter-active {
  transition: all 0.3s;
}

.rows-enter {
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
