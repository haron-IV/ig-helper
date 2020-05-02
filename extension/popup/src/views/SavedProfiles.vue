<template>
    <v-layout row class="saved-profiles">
        <v-flex xs12 class="my2">
            <h1>Saved Profiles</h1>
        </v-flex>
        
        <div class="saved-profiles__list">
            <div class="card-wrapper" v-for="tt of 50" :key="tt">
                <v-card class="card">
                    <v-card-content class="card__content">
                        <a class="link" href="https://instagram.com">profile [{{tt}}]</a>
                    </v-card-content>

                    <v-card-actions>
                        <v-spacer></v-spacer>

                        <v-btn icon small>
                            <v-icon small>mdi-delete</v-icon>
                        </v-btn>

                        <v-btn icon small>
                            <v-icon small>mdi-bookmark</v-icon>
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </div>
        </div>
    </v-layout>
</template>

<script>
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
    openProfile(profile){
      window.open(profile);
    },
    clearFollowedProfilesList(){
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
                    display: flex;    
                    justify-content: center;
                    
                    .link {
                        color: rgba(0, 0, 0, .75);
                    }
                }
            }
        }
    }
}
</style>