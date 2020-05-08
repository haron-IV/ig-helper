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
                <b>last update:</b> {{$store.getters.getUserProfile[0].updated}} <!-- should be last element not first -->
            </div>
        </section>

        <section class="profile__section-archive">
            <header class="archive__header"><h2>Archive</h2></header>

            <v-row class="date-picker-wrapper" v-if="archive.datepicker">
                <v-date-picker dark landscape multiple scrollable v-model="archive.date"></v-date-picker>
            </v-row>

            <v-row class="chart-wrapper">
                <Profile-chart 
                :archiveValues="$store.getters.getUserProfile.map( el => el.followers)" 
                name="Followers"
                :collapse="true"></Profile-chart>
                <Profile-chart 
                :archiveValues="$store.getters.getUserProfile.map( el => el.followed)"
                name="Followed"
                :collapse="true"></Profile-chart>
            </v-row>
        </section>
    </article>
</template>

<script>
import ProfileChart from "../components/ProfileChart";

export default {
  name: 'Profile',
  components: {
    'Profile-chart': ProfileChart
  },
  data(){
    return {
        archive: {
            datepicker: false,
            date: []
        }
    }
  },
  watch: {
    'archive.date'(){
        if (this.archive.date.length === 2) this.archive.datepicker = false;
    }
  },
  computed: {
    width(){
      return this.$store.getters['appearance/getAppWidtg'] - this.$store.getters['appearance/getMenuLeftSpace'];
    },
    archiveFollowers(){
        
    }
  },
  created(){
      
      
  },
  methods: {
    openProfile() {
        window.open( this.$store.getters.getUserProfile[0].profileLink, '_blank' );
    },
    textToNumber(txtNumber){
        console.log(JSON.stringify(txtNumber))
        return JSON.stringify(txtNumber);
    }
  }
}
</script>

<style lang="scss">
.d-flex {
    display: flex;
}
.profile {
    height: 100%;
    overflow: scroll;

    &__section-info {
        display: flex;
        padding-bottom: .5rem;
        border-bottom: 1px solid rgba(0, 0, 0, .2);
        position: sticky;
        top: -19%;
        z-index: 1;
        background-color: rgba(255, 255, 255, 1 );

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
        padding-top: 1rem;

        .date-picker-wrapper {
            .v-picker{
                width: 100%;

                &__body {
                    width: 65%;
                    margin-right: inherit;
                }
            }
        }

        .chart-wrapper {
            margin: 0;
        }
    }
}
</style>