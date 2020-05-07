<template>
    <article class="profile">
        <section class="profile__section-info">
            <div class="avatar">
                <v-img class="img avatar__img" :src="$store.getters.getUserProfile.profileImg"></v-img>
            </div>
            
            <div class="content">
                <a @click="openProfile()" class="link">{{$store.getters.getUserProfile.profileLink.replace("https://www.instagram.com/", "").slice(0, -1)}}</a>

                <div class="d-flex">
                    <p class="content__info"><span class="title">Followers:</span> {{$store.getters.getUserProfile.followers}}</p>
                    <p class="content__info"><span class="title">Followed:</span> {{$store.getters.getUserProfile.followed}}</p>
                </div>

                <div class="update-info">
                    <b>last update:</b> {{$store.getters.getUserProfile.lastUpdate}}
                </div>
            </div>
        </section>
    </article>
</template>

<script>
export default {
  name: 'Profile',
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
    openProfile() {
        window.open( this.$store.getters.getUserProfile.profileLink, '_blank' );
    }
  }    
}
</script>

<style lang="scss">
.d-flex {
    display: flex;
}
.profile {
    &__section-info {
        display: flex;
        justify-content: space-between;
        padding-bottom: .5rem;
        border-bottom: 1px solid rgba(0, 0, 0, .2);

        .avatar {
            width: 20%;

            &__img {
                border-radius: 50%;
                height: auto;
                width: 100%;
            }
        }

        .content {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 75%;

            .link {
                font-weight: 600;
                font-size: 1.35rem;
                color: rgba(0, 0, 0, .65);
                text-decoration: none;
                cursor: pointer;
                transition: color ease-in-out 200ms;

                &:hover {
                    color: rgba(0, 0, 0, 1);
                }
            }
            
            &__info {
                padding: 1rem;

                .title {
                    font-weight: 600;
                }
            }

            .update-info {
                align-self: flex-end;
                font-size: .6rem;
            }
        }
    }
}
</style>