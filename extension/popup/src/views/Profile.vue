<template>
    <article class="profile">
        <section class="profile__section-info">
            <div class="avatar">
                <v-img class="img avatar__img" :src="$store.getters.getLastItemInProfileArchive.profileImg"></v-img>
            </div>
            
            <div class="content">
                <a @click="openProfile()" class="link">{{$store.getters.getLastItemInProfileArchive.profileLink.replace("https://www.instagram.com/", "").slice(0, -1)}}</a>

                <div class="d-flex">
                    <p class="content__info"><span class="title">Followers:
                        </span> {{$store.getters.getLastItemInProfileArchive.followers}} <span class="difference"> {{differenceInNumbers($store.getters.getLastItemInProfileArchive.followers, $store.getters.getUserProfileArchive[1].followers)}} </span>
                    </p>
                    <p class="content__info"><span class="title">Followed:</span> {{$store.getters.getLastItemInProfileArchive.followed}}</p>
                </div>
            </div>

            <div class="update-info">
                <b>last update:</b> {{$store.getters.getLastItemInProfileArchive.updated}} <!-- should be last element not first -->
            </div>
        </section>

        <section class="profile__section-archive">
            <header class="archive__header"><h2>Archive</h2></header>

            <v-row class="chart-wrapper">
                <Profile-chart 
                :archiveValues="$store.getters.getUserProfileArchive.map( el => el.followers)" 
                name="Followers"
                :collapse="true" />

                <Profile-chart 
                :archiveValues="$store.getters.getUserProfileArchive.map( el => el.followed)"
                name="Followed"
                :collapse="true" />
            </v-row>

            <v-row class="date-picker-wrapper">
                <div class="checkbox-wrapper">
                    <v-checkbox v-model="archive.datepicker" id="chartByRange"></v-checkbox> <label style="padding: 0 1rem" for="chartByRange">Show charts from date range</label>
                </div>
                
                <v-date-picker dark landscape multiple v-model="archive.date" v-if="archive.datepicker"></v-date-picker>
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
        if (this.archive.date.length === 2) { 
            this.archive.datepicker = false;

            this.mapArchiveByDateRange();
        };

        // console.log(`
        // selected date range: ${this.archive.date}
        // archive: 
        // `, this.$store.getters.getUserProfileArchive);

        // console.log(this.archive.date);
        // console.log(this.$store.getters.getUserProfileArchive);

        // this.selectDatesBetween(new Date().toLocaleDateString());

    },
    'archive.datepicker'() {
        setTimeout(() => {
            document.querySelector(".profile").scrollTop += 300;    
        }, 5);
    }
  },
  computed: {},
  created(){},
  methods: {
    openProfile() {
        window.open( this.$store.getters.getUserProfile[0].profileLink, '_blank' );
    },
    differenceInNumbers(number1, number2) {
        number1 = JSON.parse( number1.replace(" ", "") );
        number2 = JSON.parse( number2.replace(" ", "") );
        
        if ( number1 > number2 ) {
            return `+${number1 - number2}`;
        } else {
            return `${number1 - number2}`
        }
    },
    dateBetween(checkDate){
        const dateFrom = this.archive.date[0].replace(/[-]/g, "/").split("/");
        const dateTo = this.archive.date[1].replace(/[-]/g, "/").split("/");

        const from = new Date( dateFrom[2], parseInt( dateFrom[1] ) -1, dateFrom[0] );
        const to = new Date( dateTo[2], parseInt( dateTo[1] ) -1, dateTo[0] );
        const check = new Date( checkDate[2], parseInt( checkDate[1] ) -1, checkDate[0] );
        
        return check > from && check < to;
    },
    mapArchiveByDateRange() {
        const datesInRange = this.$store.getters.getUserProfileArchive.filter( el => 
            this.dateBetween(el.updated.split(" ")[0].split("/").reverse())
        );

        console.log(datesInRange);
    }
  }
}
</script>

<style lang="scss">
.d-flex {
    display: flex;
}
.profile {
    height: 95%;
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
            margin: 0;

            .checkbox-wrapper {
                display: flex;
                align-items: center;
                width: 100%;
            }
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