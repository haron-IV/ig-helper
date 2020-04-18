<template>
  <v-container class="my-2">
    <v-layout row>
      <v-flex xs3>
        <v-btn dark @click.native="colletFollowedUsers()">Get followers</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
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