<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/about">About</router-link>
    </div>
    <Email-input @revieveEmail="getMail(form.email = $event)"></Email-input>

    <!-- <router-view/> -->
  </div>
</template>

<script>
import emailInput from "./components/Email-input.vue";

export default {
  components: { "Email-input": emailInput },
  data() {
    return {
      form: {
        email: ""
      }
    };
  },
  methods: {
    getMail() {
      this.form.mail;
    }
  }
};
</script>


<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
