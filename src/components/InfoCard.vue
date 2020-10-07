<template>
  <div id="info">
    <img
      src="https://via.placeholder.com/400x400.jpg/3d4049/dddddd/?text=NO+IMAGE+FOUND"
    />

    <!-- Text Attributes -->
    <div class="content">
      <div v-for="{ key, label } of attributes" :key="key" class="attributes">
        <div class="label">{{ label }}:</div>
        <!-- Optional cell slot -->
        <div class="text-capitalize">
          <slot :name="key">{{ item[key] }}</slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: { type: Object, required: true },
    attributes: { type: Array, required: true }
  }
};
</script>

<style lang="scss" scoped>
@use "@/css/variables";

#info {
  display: flex;
  border: 1px solid variables.$bg-secondary;
  border-radius: 10px;
  overflow: hidden;

  img {
    max-width: 50%;
  }

  .content {
    padding: 15px;

    .attributes {
      display: flex;
      flex-flow: row wrap;
      margin: 5px 0;

      .label {
        font-weight: bold;
        margin-right: 5px;
      }
    }
  }
}

/* Mobile styles */
@media all and (max-width: 576px) {
  #info {
    flex-direction: column;

    img {
      max-width: unset;
      width: 100%;
      height: auto;
    }
  }
}
</style>
