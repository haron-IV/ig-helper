<template>
  <div id="app" v-cloak>
    <router></router>
  </div>
</template>

<script>
import router from "./components/views/router.vue";

export default {
  components: { Router: router },
  data() {
    return {};
  }
};
</script>
