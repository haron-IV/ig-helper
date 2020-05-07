<template>
<div>
    <v-card class="card">
        <v-container>
            <v-row justify="space-between">
                <v-col cols="auto" class="card__avatar">
                    <v-img class="img" height="100" width="100" :src="$store.getters.getUserProfile.profileImg"></v-img>
                </v-col>
                
                <v-col class="card__content">
                    <p class="info">Followers: {{$store.getters.getUserProfile.followers}}</p>
                    <p class="info">Followed: {{$store.getters.getUserProfile.followed}}</p>
                </v-col>
            </v-row>
        </v-container>
    </v-card>
</div>
</template>

<script>
export default {
  name: 'Profile',
  components: {
    
  },
  data(){
    return {}
  },
  computed: {
    width(){
      return this.$store.getters['appearance/getAppWidtg'] - this.$store.getters['appearance/getMenuLeftSpace'];
    }
  },
  created(){},
  methods: {}    
}
</script>

<style lang="scss">
.card {
    &__avatar {
        .img {
            border-radius: 50%;
        }
    }

    &__content {
        display: flex;
        align-items: center;
        
        .info {
            
        }
    }
}
</style>