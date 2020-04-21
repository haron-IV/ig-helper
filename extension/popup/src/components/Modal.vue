<template>
  <v-overlay class="overlay" v-if="$store.getters.getFollowersModalVisible">
    <v-card class="modal">
      <v-card-title>Set count for unfollow.</v-card-title>

      <v-divider></v-divider>

      <v-card-text>
        <input type="number" v-model="unfollowCunt" />
      </v-card-text>

      <v-divider></v-divider>
      <v-card-actions class="modal__button-section">
        <v-btn color="blue darken-1" text @click="$store.commit('closeFollowersModal')">Close</v-btn>
        <v-btn color="blue darken-1" text @click="unfollowProfiles()">Start</v-btn>
      </v-card-actions>
    </v-card>
  </v-overlay>
</template>

<script>
export default {
  name: "Modal",
  data() {
    return {
        isVisible: false,
        unfollowCunt: 0
    };
  },
  methods: {
    unfollowProfiles(){
        eventBus.sendMessageToContentScript('unfollowProfiles');
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
  }
}
</style>