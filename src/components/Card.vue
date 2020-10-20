<template>
  <div :class="cardClasses">
    <CardImage :url="item.url" :mini="mini" />

    <slot>
      <div class="content text-capitalize">
        {{ item.name || item.title }}
      </div>
    </slot>
  </div>
</template>

<script>
import CardImage from "@/components/CardImage";

export default {
  components: { CardImage },
  props: {
    item: { type: Object, required: true },
    mini: { type: Boolean, default: false },
    rows: { type: Boolean, default: false }
  },
  computed: {
    cardClasses() {
      return ["card", { mini: this.mini, rows: this.rows }];
    }
  }
};
</script>

<style lang="scss" scoped>
@use "@/css/variables";

.card {
  display: flex;
  background-color: variables.$bg-header;
  border-radius: 10px;
  overflow: hidden;
  flex-direction: column;

  img {
    width: 100%;
  }

  .content {
    text-align: center;
    padding: 15px;
  }

  &.rows,
  &.mini {
    flex-direction: row;
    align-items: stretch;

    img {
      width: auto;
    }
  }

  &.rows {
    img {
      max-width: 50%;
    }
  }

  &.mini {
    height: 80px;

    img {
      height: 100%;
      max-width: 80px;
    }

    .content {
      display: flex;
      align-items: center;
    }
  }
}

/* Mobile styles */
@media all and (max-width: 576px) {
  .card.rows {
    flex-direction: column;

    img {
      max-width: unset;
      width: 100%;
      height: auto;
    }
  }
}
</style>
