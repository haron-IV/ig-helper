<template>
  <v-layout row class="control-pannel">
    <v-flex xs3 class="button-wrapper">
      <v-btn dark small @click.native="colletFollowedUsers()">Get followers</v-btn>
      <div class="button-caption">Go to profile which have a lot of followers before use this</div>
    </v-flex>

    <v-flex xs3 class="button-wrapper">
      <v-btn dark small @click.native="unfollow()">Unfollow</v-btn>
      <div class="button-caption">Go to your profile. Click button and set how many profiles you want to unfollow.</div>
    </v-flex>
  </v-layout>
</template>

<script>
import eventBus from "../eventBus.js";

export default {
  name: 'Control-pannel-home',
  methods: {
    colletFollowedUsers() {
      eventBus.sendMessageToContentScript('colletFollowedUsers');
    },
    unfollow(){
      this.$store.commit('app/toggleUnfollowModal', true);
    }
  }
}
</script>

<style lang="scss">
.control-pannel {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  .button-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;

    .button-caption {
      text-align: center;
      margin: .5rem 0;
    }
  }
}

</style>