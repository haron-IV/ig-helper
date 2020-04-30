<template>
  <v-overlay class="overlay" v-if="$store.getters['app/getUnfollowModalVisible']">
    <v-card class="modal">
      <v-card-title>Set the number of profiles to unfollow.</v-card-title>

      <v-divider></v-divider>

      <v-card-text class="modal__input-wrapper">
        <v-icon class="info-arrow" small>mdi-arrow-right</v-icon>
        <input type="number" class="unfollow-count-input" autofocus v-model="unfollowCunt" /> / {{$store.getters.getFollowedProfiles.length}}
      </v-card-text>

      <v-divider></v-divider>
      <v-card-actions class="modal__button-section">
        <v-btn color="blue darken-1" text @click="$store.commit('app/toggleUnfollowModal', false)">Close</v-btn>
        <v-btn color="blue darken-1" text @click="unfollowProfiles()">Start</v-btn>
      </v-card-actions>
    </v-card>
  </v-overlay>
</template>

<script>
import eventBus from "@/eventBus";

export default {
  name: "Modal",
  data() {
    return {
      unfollowCunt: 0
    };
  },
  methods: {
    unfollowProfiles(){
      const data = {
        unfollowCunt: this.unfollowCunt,
        profilesToUnfollow: this.$store.getters.getFollowedProfiles
      }
      eventBus.sendMessageToContentScript('unfollowProfiles', data);
    }
  }
};
</script>

<style lang="scss">
.overlay {
  .modal {
    &__button-section {
      display: flex;
      justify-content: center;
    }
    &__input-wrapper {
      display: flex;
      justify-content: center;

      .info-arrow {
        animation-name: pulsating;
        animation-duration: .7s;
        animation-iteration-count: infinite;
        animation-timing-function: ease-in-out;
      }

      @keyframes pulsating {
        0% {transform: translateX(-2px)}
        100% {transform: translateX(0px)}
      }

      .unfollow-count-input {
        text-align: end;
        width: 50px;
      }
    }
    
  }
}
</style>