<template>
    <v-layout row class="saved-profiles">
        <v-flex xs12 class="my2">
            <div>
                <h1 style="display: inline">Saved Profiles</h1><sup style="top: -1.85em; left: 5px;">({{$store.getters.getSavedProfiles.length}})</sup>
            </div>
        </v-flex>
        
        <div class="saved-profiles__list">
            <div class="card-wrapper" v-if="$store.getters.getFollowedProfiles">
                <v-card class="card" v-for="profile of $store.getters.getSavedProfiles" :key="profile">
                    <v-avatar class="card__avatar" @click="openProfile(profile.profileLink)">
                        <img :src="profile.avatar">
                    </v-avatar>

                    <v-card-content class="card__content" @click="openProfile(profile.profileLink)">
                        <a class="link">{{ profile.profileLink.replace("https://www.instagram.com/", "").slice(0, -1) }}</a>
                        <div class="stats">
                            <span class="stats__info-label">Posts: </span>{{profile.posts}}
                            <span class="stats__info-label">Followers:</span> {{profile.followers}}
                            <span class="stats__info-label">Followed:</span> {{profile.followed}}
                        </div>
                    </v-card-content>

                    <v-card-actions class="card__actions">
                        <v-spacer></v-spacer>

                        <v-btn icon medium @click="removeProfile(profile)" title="Remove Profile - Just remove profile from this list">
                            <v-icon small>mdi-delete</v-icon>
                        </v-btn>

                        <v-btn icon medium @click="blockProfile(profile)" title="Block Profile - Remove profile from this list and block profile. If this user following you after this operation his following disapear.">
                            <v-icon small>mdi-block-helper</v-icon>
                        </v-btn>

                        <v-btn icon medium @click="unfollowProfile(profile)" title="Unfollow Profile - Remove profile from this list and unfollow profile.">
                            <v-icon small>mdi-account-off</v-icon>
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
      return this.$store.getters['appearance/getAppWidth'] - this.$store.getters['appearance/getMenuLeftSpace'];
    },
  },
  created(){},
  methods: {
    removeProfile(profile){
        if (this.$store.state.data.igHelperStore.savedProfiles.includes(profile)){
            this.$store.state.data.igHelperStore.savedProfiles = this.$store.state.data.igHelperStore.savedProfiles.filter(el => el != profile);
            chrome.storage.local.set(this.$store.state.data);
        }
    },
    blockProfile(profile){
        eventBus.sendMessageToContentScript("blockUserFromSavedProfiles", profile.profileLink);
        this.removeProfile(profile);
    },
    unfollowProfile(profile) {
        eventBus.sendMessageToContentScript("unfollowUserFromSavedProfiles", profile.profileLink);
        this.removeProfile(profile);
    },
    openProfile(profile){
      window.open(profile);
    },
    clearsavedProfilesList(){
      this.$store.commit("clearFollowedProfilesList");
      chrome.storage.local.set(this.$store.state.data);
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
            width: 100%;
            margin: 1rem .1rem;

            .card {
                margin: .3rem 0;
                display: flex;
                justify-content: space-between;
                transition: all ease-in-out 400ms;

                &:hover {
                    background-color: rgba(0, 0, 0, .1);
                }

                &__avatar {
                    border-radius: 50% !important;
                    margin: 8px;
                    cursor: pointer;
                }

                &__content {
                    padding: 0 .4rem;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    cursor: pointer;

                    .stats {
                        padding: .2rem 0;

                        &__info-label {
                            padding: 0 .2rem;
                            font-weight: 600;
                        }
                    }
                    
                    .link {
                        font-weight: 900;
                        color: rgba(0, 0, 0, .75);
                        cursor: pointer;
                    }
                }

                &__actions {
                    flex: auto;
                }
            }
        }
    }
}
</style>