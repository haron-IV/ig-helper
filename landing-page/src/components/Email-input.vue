<template>
  <input type="email" name="email" v-model="email" class="input input--email">
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
