<template>
  <v-container :style="{minWidth: $store.getters['appearance/getAppWidth'] + 'px'}" class="update-info">
    <h1>Your application version {{this.$store.getters["app/getAppVersion"]}} is out of date.</h1>
    <p>
      Now you should use {{remoteVersion}}.
      To use you should update your application. Check your email address for get latest version :)
    </p>
  </v-container>
</template>

<script>
    export default {
        name: "UpdateInfo",
        props: ['remoteVersion']
    }
</script>

<style lang="scss">
.update-info {
    padding: 0 3rem;
    line-height: 2;
    text-align: center;
    min-height: 450px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>