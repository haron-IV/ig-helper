<template>
  <div>
    <Update-info v-if="needUpdate && showApp === false" :actualVersion="remoteVersion"/>
    <Loader v-if="loader" />

    <v-container class="app" :style="{minWidth: $store.getters['appearance/getAppWidth'] + 'px'}" v-if="showApp">
      <v-navigation-drawer
        :permanent="true"
        :expand-on-hover="true"
        absolute
        dark
      >
        <v-list
          dense
          nav
          class="py-0"
        >
          <v-list-item two-line>
            <v-icon>mdi-instagram</v-icon>

            <v-list-item-content class="space-item">
              <v-list-item-title>Instagram Helper Tool</v-list-item-title>
              <v-list-item-subtitle>Easly get a lot of followers</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-divider></v-divider>

          <v-list-item
            v-for="route in $router.options.routes"
            :key="route.name"
            link
            @click="setRoute(route)"
          >
            <v-list-item-icon>
              <v-icon>{{ route.menuIcon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content class="space-item">
              <v-list-item-title>{{ route.name }}</v-list-item-title>
              <div class="space-item__badge">{{badgeContent(route)}}</div>
            </v-list-item-content>

          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <transition name="slide-x-transition">
        <router-view style="position: absolute; width: calc(81%); margin: 0 4.5rem"/>
      </transition>

      <Modal />
    </v-container>
  </div>
</template>

<script>
import Axios from "axios";
import Modal from "@/components/Modal";
import Loader from "@/components/Loader";
import UpdateInfo from "@/components/UpdateInfo";

export default {
  name: 'App',
  components: {
    Modal,
    Loader,
    'Update-info': UpdateInfo
  },
  data: () => ({
    showApp: false,
    loader: true,
    needUpdate: false,
    remoteVersion: null
  }),
  beforeCreate(){
    this.$store.dispatch('setData');

    //checking version and show update or app  
    Axios.get("http://demo1488314.mockable.io/isActive").then( res => {
      this.loader = false;

      if (res.status == 200 && res.data.version === this.$store.getters["app/getAppVersion"]) {
        this.showApp = true;
        this.remoteVersion = res.data.version;
      } else { this.needUpdate = true; }
    });

    //INIT GA
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

    ga('create', 'UA-167301033-1', 'auto');

    ga('set', 'checkProtocolTask', null);
    ga('send', 'pageview', '/app');
  },
  watch: {
    '$store.getters.getLastMenuPosition'(){
      this.$router.push(this.$store.getters.getLastMenuPosition);
    }
  },
  methods: {
    badgeContent(route) {
      switch(route.name) {
        case "Get Followers": {
          return this.$store.getters.getFollowedProfiles.length;
        }

        case "Saved Profiles": {
          return this.$store.getters.getSavedProfiles.length;
        }
      }
    },
    setRoute(route) {
      this.$router.push(route.path);
      this.$store.commit("setLastMenuPosition", route.path);
    },
  }
};
</script>

<style lang="scss" scoped>
.app {
  min-height: 450px;
  
  .v-navigation-drawer {
    z-index: 2;
  }

  .space-item {
    margin: 0 .5rem;

    &:hover {
      .space-item__badge {
        opacity: 1;
      }
    }

    &__badge {
      transition: opacity ease-in-out 200ms;
      opacity: 0;
      position: fixed;
      right: 2rem;
      font-size: 10px;
    }
  }
}
</style>