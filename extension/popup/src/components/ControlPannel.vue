<template>
  <v-layout row>
    <v-flex xs3>
      <v-btn dark small @click.native="colletFollowedUsers()">Get followers</v-btn>
      <div class="button-caption">Go to profile which have a lot of followers before use this</div>
    </v-flex>
  </v-layout>
</template>

<script>
import eventBus from "../eventBus.js";

export default {
  name: 'Control-pannel',
  methods: {
    colletFollowedUsers() {
      eventBus.sendMessageToContentScript('colletFollowedUsers');
    }
  }
}
</script>

<style lang="scss">
.button-caption {
  text-align: center;
  margin: .5rem 0;
}
</style>