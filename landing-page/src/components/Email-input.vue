<template>
  <!-- <input type="email" name="email" v-model="email" class="input input--email"> -->

  <div>
    <header>
      <slot name="header"></slot>
    </header>

    <article>
      <slot name="content"></slot>
    </article>
  </div>
</template>

<script>
export default {
  data() {
    return { email: "" };
  },
  watch: {
    email() {
      const vm = this;
      this.$emit("recieveEmail", vm.email);
    }
  }
};
</script>


<style lang="scss">
.input {
  &--email {
  }
}
</style>
