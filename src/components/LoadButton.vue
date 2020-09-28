<template>
  <button :disabled="loading" class="btn btn-primary" @click="$emit('click')">
    {{ buttonText }}
  </button>
</template>

<script>
export default {
  props: {
    loading: { type: Boolean, required: true },
    error: { type: null, default: null },
    text: { type: String, default: null }
  },
  computed: {
    buttonText() {
      if (this.loading) {
        return "Loading...";
      } else if (this.error) {
        return "Error: Try Again";
      } else {
        return this.text || "Load";
      }
    }
  }
};
</script>

<style lang="scss">
@use "@/css/variables";
</style>
