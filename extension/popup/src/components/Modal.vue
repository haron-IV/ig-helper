<template>
  <v-overlay class="overlay" v-if="$store.getters['app/getUnfollowModalVisible']">
    <v-card class="modal">
      <v-card-title>Set the number of profiles to unfollow.</v-card-title>

      <v-divider></v-divider>

      <!-- <div style="text-align: center; padding-top: 1rem; display: none;">
        TODO: not working
        Unfollowing {{unfollowCunt}} profiles will takes from 
        <span style="text-decoration: underline">{{calcSleepTime($store.state.data.igHelperStore.unfollowing.unfollowingConfig.sleepAfterUnfollow[0])}}</span> 
        to <span style="text-decoration: underline">{{calcSleepTime($store.state.data.igHelperStore.unfollowing.unfollowingConfig.sleepAfterUnfollow[1])}}</span>
      </div> -->

      <v-card-text class="modal__input-wrapper">
        <v-icon class="info-arrow" small>mdi-arrow-right</v-icon>
        <input type="number" class="unfollow-count-input" autofocus v-model="unfollowCount" /> / {{$store.getters.getFollowedProfiles.length}}
      </v-card-text>

      <v-divider></v-divider>
      <v-card-actions class="modal__button-section">
        <v-btn color="blue darken-1" text @click="$store.commit('app/toggleUnfollowModal', false)">Close</v-btn>
        <v-btn color="blue darken-1" text @click="unfollowProfiles(unfollowCount === 0 ? $store.getters.getFollowedProfiles.length : unfollowCount)">Start</v-btn>
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
      unfollowCount: 0
    };
  },
  computed: {},
  methods: {
    unfollowProfiles(unfollowCount){
      const data = {
        unfollowCount: JSON.parse(unfollowCount),
        profilesToUnfollow: this.$store.getters.getFollowedProfiles
      }
      
      eventBus.sendMessageToContentScript('unfollowProfiles', data);
      eventBus.sendMessageToContentScript("addExtensionOverlay");
      setTimeout(() => {
        window.close();
      }, 1000);
    },
    calcSleepTime(sleepDuration){
      // TODO: worse calculating ;)
      let time = 0;
      const timeInSeconds = this.unfollowCount * sleepDuration;
      if (timeInSeconds < 59) time = `${timeInSeconds}s`;
      if (timeInSeconds >= 60) {
        const minutes = `${ (timeInSeconds / 60).toString().slice(0, 1) }m`;
        const seconds = `${ (timeInSeconds / 60).toString().slice(2, 3) }s`;

        time = `${minutes} ${seconds}`;
      };
      if (timeInSeconds >= 3600) {
        const hours = `${( (timeInSeconds / 60)/60 ).toString().slice(0, 1)}h`;
        const minutes = `${ (timeInSeconds / 60).toString().slice(0, 1) }m`;
        const seconds = `${ (timeInSeconds / 60).toString().slice(2, 3) }s`;
        
        time = `${hours} ${minutes} ${seconds}`;
      };

      return time;
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