<template>
    <v-layout row class="saved-profiles">
        <v-flex xs12 class="my2">
            <h1>Saved Profiles</h1>
        </v-flex>
        
        <div class="saved-profiles__list">
            <div class="card-wrapper" v-for="profile of $store.getters.getSavedProfiles" :key="profile">
                <v-card class="card">
                    <v-card-content class="card__content">
                        <a class="link" @click="openProfile(profile)">{{ profile.replace("https://www.instagram.com/", "").slice(0, -1) }}</a>
                    </v-card-content>

                    <v-card-actions>
                        <v-spacer></v-spacer>

                        <v-btn icon small @click="removeProfile(profile)" title="remove profile">
                            <v-icon small>mdi-delete</v-icon>
                        </v-btn>

                        <v-btn icon small @click="blockProfile(profile)" title="Block user">
                            <v-icon small>mdi-block-helper</v-icon>
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </div>
        </div>
    </v-layout>
</template>

<script>
import eventBus from "../eventBus.js";

export default {
  name: 'SavedProfiles',
  components: {},
  data(){
    return {}
  },
  computed: {
    width(){
      return this.$store.getters['appearance/getAppWidtg'] - this.$store.getters['appearance/getMenuLeftSpace'];
    }
  },
  created(){},
  methods: {
    removeProfile(profile){
        if (this.$store.state.data.igHelperStore.savedProfiles.includes(profile)){
            this.$store.state.data.igHelperStore.savedProfiles = this.$store.state.data.igHelperStore.savedProfiles.filter(el => el != profile);
            chrome.storage.sync.set(this.$store.state.data);
        }
    },
    blockProfile(profile){
        eventBus.sendMessageToContentScript("blockUserFromSavedProfiles", profile);
    },
    openProfile(profile){
      window.open(profile);
    },
    clearsavedProfilesList(){
      this.$store.commit("clearFollowedProfilesList");
      chrome.storage.sync.set(this.$store.state.data);
    }
  }
}
</script>

<style lang="scss">
.saved-profiles {
    display: flex;
    justify-content: center;

    &__list {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        height: 87vh;
        overflow: scroll;

        .card-wrapper {
            margin: .2rem .1rem;

            .card {
                padding-top: 1rem;

                &__content {
                    padding: 0 .4rem;
                    display: flex;    
                    justify-content: center;
                    
                    .link {
                        font-weight: 900;
                        color: rgba(0, 0, 0, .75);
                        cursor: pointer;
                    }
                }
            }
        }
    }
}
</style>