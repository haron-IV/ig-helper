<template>
  <main class="main main--statistics">
    <article class="statistics-box">
      <header class="statistics-box__header">Bot Stats:</header>

      <div class="statistics-box__content">
        <ul class="list" v-if="stats !== null">
          <li
            class="list__item"
            v-for="(stats_item, item_name) in stats.bot_stats"
            :key="stats_item.index"
          >{{removeUnderscore(item_name)}}: {{numberWithComma(stats_item)}}</li>
        </ul>
      </div>

      <Show-more buttonText="Show chatters">
        <div v-if="profiles != null" class="chatters">
          <div class="single-profile" v-for="(profile, index) in profiles" :key="index">
            <div class="single-profile__img-holder">
              <img :src="profile.img" class="img">
            </div>

            <div class="single-profile__overlap">
              <h3>{{profile.userName}} {{profile.userAge}}</h3>
              <button
                class="button button--wiev-profile"
                @click="openProfile(profile.profileLink)"
              >View Profile</button>
            </div>
          </div>
        </div>
      </Show-more>
    </article>
  </main>
</template>

<script>
import _ from "lodash";
import showMore from "../Show-more.vue";

export default {
  components: { "Show-more": showMore },

  data: {
    stats: null,
    profiles: null
  },

  computed: {},

  methods: {
    removeUnderscore(item_name) {
      return item_name.replace(/_/g, " ");
    },

    numberWithComma(number) {
      return number.toLocaleString();
    },

    openProfile(profile) {
      chrome.tabs.create({ url: `https://badoo.com${profile}` });
    },

    filteredChatters() {
      const chatters = JSON.parse(localStorage.getItem("chatters"));
      const filteredChatters = _.uniqBy(chatters.chatters, "img");

      return filteredChatters;
    },

    clearChatters() {
      const vm = this;

      chrome.storage.sync.get(["chatters"], data => {
        data.chatters = vm.filteredChatters();
        chrome.storage.sync.set(data);
      });
    }
  },

  created() {
    chrome.storage.sync.get(["bot_stats"], stats => {
      localStorage.setItem("stats", JSON.stringify(stats));
    });

    chrome.storage.sync.get(["chatters"], data => {
      localStorage.setItem("chatters", JSON.stringify(data));
    });
  },

  beforeMount() {
    this.stats = JSON.parse(localStorage.getItem("stats"));

    this.profiles = this.filteredChatters(); // clear array

    this.clearChatters();
  }
};
</script>

<style lang="scss" scoped>
.main {
  &--statistics {
    max-width: 400px;
  }
}

.chatters {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  .single-profile {
    width: 100px;
    height: 100px;
    margin: 10px;
    position: relative;
    z-index: 0;

    &__img-holder {
      .img {
        width: 100%;
      }
    }

    &__overlap {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
      color: #fff;
      background-color: rgba(0, 0, 0, 0.6);
      text-align: center;
      height: 100%;
      width: 100%;
      opacity: 0;
      transition: opacity ease-in-out 400ms;

      &:hover {
        opacity: 1;
      }
    }
  }
}
</style>