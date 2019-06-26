<template>
  <section class="show-more">
    <slot v-if="showContent"></slot>

    <button class="button button--transparent" @click="showContent = !showContent">
      {{buttonInfo}}
      <img
        :src="downArrow"
        class="img"
        :class="{'reverse': showContent}"
        ref="arrowImg"
      >
    </button>
  </section>
</template>

<script>
export default {
  data() {
    return {
      downArrow: "../assets/img/down-arrow.png",
      showContent: false,
      buttonInfo: "Show More options"
    };
  },

  methods: {}
};
</script>

<style lang="scss">
@import "../assets/scss/variables.scss";
@import "../assets/scss/helpers.scss";

.show-more {
  margin: 20px 0 0;
}

.button {
  margin: 10px auto;
}

.reverse {
  transform: rotateX(180deg);
}
</style>