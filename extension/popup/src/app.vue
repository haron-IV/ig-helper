<template>
  <div id="app" v-cloak>
    <template v-if="first_settings">
      <Main-header></Main-header>

      <main class="main main--popup">
        <Set-your-name></Set-your-name>
        <Like-bot></Like-bot>
        <Message-bot></Message-bot>
      </main>
    </template>

    <template v-else>
      <h3 class="medium-space">Before use bot you must configurate your badoo profile.</h3>

      <hr>

      <p class="medium-space">
        Go to your profile and click this button.
        <button
          @click="set_correct_settings"
          class="button"
        >Set correct setting</button>
      </p>

      <hr>

      <p class="medium-space">And set your language to English (United States) and save.</p>
    </template>
  </div>
</template>

<script>
import mainHeader from "./components/Main-header.vue";
import setYourName from "./components/Set-your-name.vue";
import likeBot from "./components/Like-bot.vue";
import messageBot from "./components/Message-bot.vue";

export default {
  components: {
    "Main-header": mainHeader,
    "Set-your-name": setYourName,
    "Like-bot": likeBot,
    "Message-bot": messageBot
  },
  data() {
    return {
      first_settings: true
    };
  },
  methods: {
    set_correct_settings() {
      this.sendMessageToContentScript("set_correct_settings");
    }
  },

  created() {
    const set_interface = () => {
      chrome.storage.sync.get(["first_login_status"], status => {
        this.first_settings = status.first_login_status;
      });
    };

    set_interface();
  },

  mounted() {
    // this.sendMessageToContentScript('update_statistics', {}); // should send obiect with stas
  },
  destroyed() {}
};
</script>

<style>
@import "../src/assets/scss/base.scss";
@import "../src/assets/scss/helpers.scss";
</style>