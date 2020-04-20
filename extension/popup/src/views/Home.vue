<template>
  <div>
    <Control-pannel />  
    
    <hr class="divider">

    <v-layout row class="info">
      <v-flex xs6 class="card-wrapper">
        <v-card class="card">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="headline mb-1">Followed Profiles</v-list-item-title>
              <div>
                <p v-for="(profile, i) in $store.getters.getFollowedProfiles" :key="i" @click="openProfile(profile)" class="profile">
                  {{i}}) <a>{{profile.split("/")[3]}}</a> 
                </p>
              </div>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-flex>
    
      <v-flex xs6 class="card-wrapper">
        <v-card class="card">
          <v-list-item>
            <v-list-item-content>
              <div class="overline mb-4">OVERLINE</div>
              <v-list-item-title class="headline mb-1">Headline 5</v-list-item-title>
              <v-list-item-subtitle>Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import ControlPannel from "@/components/ControlPannel";

export default {
  name: 'Home',
  components: {
    'Control-pannel': ControlPannel
  },
  data(){
    return {
    }
  },
  computed: {
    width(){
      return this.$store.state.appWidth - menuLeftSpace;
    }
  },
  created(){},
  methods: {
    openProfile(profile){
      window.open(profile);
    }
  }
}
</script>

<style lang="scss">
.divider {
  width: 100%;
  margin: .2rem auto;
  border-top: 1px solid rgba(0, 0, 0, .05);
}
.info {
  display: flex;
  justify-content: space-between;
  height: -webkit-fill-available;

  .card-wrapper {
    margin: .65rem 0;
    
    .card {
      min-height: 25%;  
      height: 75%;

      .profile {
        cursor: pointer;
        transition: all ease-in-out 200ms;

        &:hover {
          text-shadow: 2px 3px 8px rgba(127,206,99,0.7);
        }
      }
    }
  }
}
</style>