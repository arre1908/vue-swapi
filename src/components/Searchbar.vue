<template>
  <div>
    <form id="searchbar" @submit.prevent="submit()" @reset.prevent="reset()">
      <input
        v-model="query"
        :placeholder="placeholder || 'Search for a name'"
        :disabled="loading"
        class="search-input"
      />

      <input
        v-if="query && !loading"
        type="reset"
        class="btn btn-secondary reset-button"
        value="X"
      />

      <input
        type="submit"
        class="btn btn-primary submit-button"
        :value="loading ? 'Loading...' : 'Search'"
        :disabled="loading"
      />
    </form>

    <div class="msg">
      <span v-if="lastQuery">Search results for "{{ lastQuery }}"</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    loading: { type: Boolean, required: true },
    placeholder: { type: String, default: null }
  },
  data() {
    return {
      query: "",
      lastQuery: ""
    };
  },
  methods: {
    reset() {
      this.query = "";
      this.submit();
    },
    submit() {
      if (this.lastQuery !== this.query) {
        this.lastQuery = this.query;
        this.$emit("submit", this.query);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@use "@/css/variables";

#searchbar {
  display: flex;
  margin: 10px 0;
}

.search-input {
  flex-grow: 1;
  padding: 10px;
  background-color: variables.$bg-secondary;
  border: none;
  border-radius: 5px 0 0 5px;
  color: variables.$text-primary;

  &:focus {
    outline: none;
  }

  &:disabled {
    color: variables.$text-secondary;
  }
}

.reset-button {
  padding: 10px 15px;
  border-radius: 0;
  background-color: lighten(variables.$bg-secondary, 10%);
  color: variables.$text-primary;

  &:hover {
    background-color: lighten(variables.$bg-secondary, 5%);
  }

  &:active {
    background-color: variables.$bg-tertiary;
  }
}

.submit-button {
  padding: 10px 15px;
  border-radius: 0 5px 5px 0;
}

.msg {
  height: 30px;
  color: variables.$text-secondary;
  font-style: italic;
}
</style>
