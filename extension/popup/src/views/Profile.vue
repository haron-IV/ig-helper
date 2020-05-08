<template>
    <article class="profile">
        <section class="profile__section-info">
            <div class="avatar">
                <v-img class="img avatar__img" :src="$store.getters.getUserProfile[0].profileImg"></v-img>
            </div>
            
            <div class="content">
                <a @click="openProfile()" class="link">{{$store.getters.getUserProfile[0].profileLink.replace("https://www.instagram.com/", "").slice(0, -1)}}</a>

                <div class="d-flex">
                    <p class="content__info"><span class="title">Followers:</span> {{$store.getters.getUserProfile[0].followers}}</p>
                    <p class="content__info"><span class="title">Followed:</span> {{$store.getters.getUserProfile[0].followed}}</p>
                </div>
            </div>

            <div class="update-info">
                <b>last update:</b> {{$store.getters.getUserProfile[0].updated}}
            </div>
        </section>

        <section class="profile__section-archive">
            <header class="archive__header"><h2>Archive</h2></header>

            <v-row class="date-picker-wrapper">
                <v-date-picker dark landscape multiple scrollable v-model="archive.date"></v-date-picker>
            </v-row>
        </section>
    </article>
</template>

<script>
export default {
  name: 'Profile',
  components: {},
  data(){
    return {
        archive: {
            date: []// if length will be equals 2 close date picer and show archive stats
        }
    }
  },
  computed: {
    width(){
      return this.$store.getters['appearance/getAppWidtg'] - this.$store.getters['appearance/getMenuLeftSpace'];
    }
  },
  created(){},
  methods: {
    openProfile() {
        window.open( this.$store.getters.getUserProfile[0].profileLink, '_blank' );
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
        }

        .update-info {
            width: 100%;
            position: absolute;
            right: 0;
            align-self: flex-end;
            justify-self: flex-end;
            text-align: right;
            font-size: .6rem;
        }
    }

    &__section-archive {
        .date-picker-wrapper {
            .v-picker{
                width: 100%;

                &__body {
                    width: 65%;
                    margin-right: inherit;
                }
            }
        }
    }

}
</style>