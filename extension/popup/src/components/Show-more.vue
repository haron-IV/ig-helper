<template>
  <section class="show-more">
    <slot v-if="showContent"></slot>

    <button class="button button--transparent" @click="toggleContent">
      {{buttonInfo}}
      <img :src="downArrow" class="img" ref="arrowImg">
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

  methods: {
    toggleContent() {
      this.showContent = !this.showContent;

      if (this.showContent === true) {
        this.buttonInfo = "Hide options";
        this.$refs.arrowImg.classList.add("reverse");
      } else {
        this.buttonInfo = "Show More options";
        this.$refs.arrowImg.classList.remove("reverse");
      }
    }
  }
};
</script>

<style lang="scss">
@import "../assets/scss/variables.scss";
@import "../assets/scss/helpers.scss";

.show-more {
  margin: 20px 0;
}

.button {
  margin: 0 auto;
}

.reverse {
  transform: rotateX(180deg);
}
</style>