<template>
  <v-container class="app">
    <router-view />  
  </v-container>
</template>

<script>
export default {
  name: 'App',
  components: {},
  data: () => ({}),
  created(){}
};
</script>

<style lang="scss" scoped>
  .app {
    min-width: 450px;
  }
</style>