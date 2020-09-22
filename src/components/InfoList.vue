<template>
  <div id="info">
    <slot name="header">
      <h1>{{ item.name || item.title }}</h1>
    </slot>

    <div class="list">
      <!-- Info -->
      <div v-for="k of keys" :key="k.key">
        <h2>{{ k.label }}</h2>
        <slot :name="k.key">
          {{ item[k.key] }}
        </slot>
      </div>

      <!-- Links -->
      <div v-for="[key, l] of Object.entries(links)" :key="key">
        <div v-if="l.links.length">
          <h2>{{ l.label }}</h2>

          <ul>
            <li v-for="[index, data] of linkData[key].entries()" :key="index">
              <router-link :to="stripBaseUrl(data.url)">
                {{ data.name || data.title }}
              </router-link>
            </li>
          </ul>

          <button
            v-if="!linkData[key].length"
            :disabled="isLoading[key]"
            class="button"
            @click="resolveLinks(key)"
          >
            {{ isLoading[key] ? "Loading.." : "Load" }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { apiClient, stripBaseUrl } from "../apiService";
export default {
  props: {
    item: { type: Object, required: true },
    keys: { type: Array, required: true },
    links: { type: Object, default: () => {} }
  },
  data() {
    return {
      linkData: {},
      isLoading: {}
    };
  },
  created() {
    // Copy object keys from 'links' prop
    for (let key in this.links) {
      // Objects need to be reassigned when adding properties (for reactivity)
      this.linkData = { [key]: [], ...this.linkData };
      this.isLoading = { [key]: false, ...this.isLoading };
    }
  },
  methods: {
    stripBaseUrl: stripBaseUrl,
    resolveLinks(key) {
      // Load data from list of API links
      let promises = this.links[key].links.map(link => apiClient.get(link));
      this.isLoading[key] = true;

      Promise.all(promises)
        .then(responses => {
          this.linkData[key] = responses.map(re => re.data);
        })
        .finally(() => {
          this.isLoading[key] = false;
        });
    }
  }
};
</script>

<style lang="scss" scoped>
@use "@/css/variables";

#info {
  margin: 0 auto;
  max-width: 600px;
}

.list {
  padding: 20px;
}

ul {
  padding: 0;
  list-style-type: none;

  li {
    margin: 10px 0;
  }
}
</style>
