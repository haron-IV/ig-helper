<template>
  <div id="app" v-cloak>
    <template v-if="first_settings">
      <!-- <Main_header></Main_header> -->

      <main class="main main--popup">
        <article class="set-name">
          <template v-if="show_name_setter" class="test">
            <h4>Set your name*.</h4>
            <p
              class="small-info"
            >* Name should be same as your profile name for proper bot operation</p>
            <input type="text" class="input-text" v-model="user_name">
            <button class="button" @click="show_name_setter_status(false)">save</button>
          </template>

          <template v-else>
            <button class="button button--show-name-setter" @click="show_name_setter_status(true)">
              change Name
              <!-- <img src="../icons/down-arrow.png" class="img"> -->
            </button>
          </template>
        </article>

        <article class="like-bot">
          <header class="header">
            <h3>Like bot</h3>
          </header>

          <div>
            <div class="like-bot__speed">
              <span @click="set_like_speed(25)">Slow</span>
              <span @click="set_like_speed(50)">Medium</span>
              <span @click="set_like_speed(100)">Fast</span>
            </div>
            <progress class="like-bot__progress-bar" :value="like_bot.speed" max="100"></progress>
          </div>

          <div class="box bottom-line">
            <button
              class="button"
              :class="{ button_active: like_bot.isStart }"
              @click="toggle_liking"
            >{{like_bot.isStart === true ? 'Stop' : 'Start'}}</button>
          </div>
        </article>

        <article class="message-bot">
          <header class="header">
            <h3>Message Bot</h3>
          </header>

          <div class="saved-message">
            <button
              class="saved-message__item button"
              @click="set_message(1)"
              :class="{button_active: message_bot.active_message === 1}"
            >1</button>

            <button
              class="saved-message__item button"
              @click="set_message(2)"
              :class="{button_active: message_bot.active_message === 2}"
            >2</button>

            <button
              class="saved-message__item button"
              @click="set_message(3)"
              :class="{button_active: message_bot.active_message === 3}"
            >3</button>

            <button
              class="saved-message__item button"
              @click="save_message(message_bot.active_message - 1)"
            >save</button>
          </div>

          <div class="box">
            <textarea type="text" class="textarea" v-model="message_bot.message"></textarea>

            <button
              class="button"
              :class="{ button_active: message_bot.isStart }"
              @click="toggle_messaging"
            >{{message_bot.isStart === true ? 'Stop' : 'Start'}}</button>
          </div>

          <div class="box box--info-about-messages">
            <ul class="list">
              *In textarea you can use variables like:
              <li class="list__item">
                <b>{name}</b> in this place will be putting name person who receive message from you
              </li>
            </ul>
          </div>

          <button
            class="button"
            :class="{ button_active: message_bot.dletingIsStart }"
            @click="toggle_deleting_messages"
          >{{message_bot.dletingIsStart === true ? 'Stop' : 'Delete all old messages'}}</button>
        </article>
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
export default {
  data() {
    return {
      first_settings: false,
      show_name_setter:
        localStorage.getItem("show_name_setter") !== null
          ? JSON.parse(localStorage.getItem("show_name_setter"))
          : true,
      user_name: "",
      like_bot: {
        isStart: false,
        speed:
          localStorage.getItem("bot_like_speed") !== null
            ? parseInt(localStorage.getItem("bot_like_speed"))
            : 500
      },
      message_bot: {
        isStart: false,
        message: localStorage.getItem("last_message"),
        dletingIsStart: false,
        saved_messages: [],
        active_message:
          localStorage.getItem("last_message") !== null
            ? parseInt(localStorage.getItem("last_message"))
            : 1
      }
    };
  },
  methods: {
    save_user_name() {
      const vm = this;
      chrome.storage.sync.set({ user_name: vm.user_name });
    },

    show_name_setter_status(status) {
      if (status) {
        this.show_name_setter = true;
        localStorage.setItem("show_name_setter", true);
      } else {
        this.save_user_name();
        this.show_name_setter = false;
        localStorage.setItem("show_name_setter", false);
      }
    },

    sendMessageToContentScript(message_name, message_value = null) {
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
          greeting: message_name,
          value: message_value
        });
      });
    },

    toggle_liking() {
      if (this.like_bot.isStart === false) {
        this.sendMessageToContentScript("start_liking");
        this.like_bot.isStart = true;
      } else {
        this.sendMessageToContentScript("stop_liking");
        this.like_bot.isStart = false;
      }
    },

    toggle_messaging() {
      if (this.message_bot.isStart === false) {
        this.sendMessageToContentScript("start_messaging");

        chrome.storage.sync.set({ last_message: this.message_bot.message });
        localStorage.setItem("last_message", this.message_bot.active_message);

        this.message_bot.isStart = true;
      } else {
        this.sendMessageToContentScript("stop_messaging");
        this.message_bot.isStart = false;
      }
    },

    toggle_deleting_messages() {
      if (this.message_bot.dletingIsStart === false) {
        this.sendMessageToContentScript("start_delete_all_old_messages");
        this.message_bot.dletingIsStart = true;
      } else {
        this.sendMessageToContentScript("stop_delete_all_old_messages");
        this.message_bot.dletingIsStart = false;
      }
    },

    set_like_speed(speed) {
      this.like_bot.speed = speed;
      localStorage.setItem("bot_like_speed", speed);
      this.sendMessageToContentScript("set_like_speed", speed);

      if (this.like_bot.isStart) {
        this.sendMessageToContentScript("stop_liking");
        this.sendMessageToContentScript("start_liking");
      }
    },

    save_message(which_message) {
      const saved_messages = JSON.parse(localStorage.getItem("saved_messages"));
      let last_message = JSON.parse(localStorage.getItem("last_message"));

      last_message = which_message;
      saved_messages[which_message] = this.message_bot.message;

      localStorage.setItem("last_message", JSON.stringify(last_message));
      localStorage.setItem("saved_messages", JSON.stringify(saved_messages));
    },

    set_message(which) {
      switch (which) {
        case 1:
          this.message_bot.active_message = which;
          this.message_bot.message = this.message_bot.saved_messages[which - 1];
          break;

        case 2:
          this.message_bot.active_message = which;
          this.message_bot.message = this.message_bot.saved_messages[which - 1];
          break;

        case 3:
          this.message_bot.active_message = which;
          this.message_bot.message = this.message_bot.saved_messages[which - 1];
          break;
      }
    },

    set_correct_settings() {
      this.sendMessageToContentScript("set_correct_settings");
    }
  },

  created() {
    const vm = this;

    const check_localStorage = () => {
      const data = ["", "", ""];

      if (localStorage.getItem("saved_messages") === null) {
        localStorage.setItem("saved_messages", JSON.stringify(data));
      } else {
        this.message_bot.saved_messages = JSON.parse(
          localStorage.getItem("saved_messages")
        );
      }
    };

    const set_last_message = () => {
      const data = {
        messages: JSON.parse(localStorage.getItem("saved_messages")),
        last_message: JSON.parse(localStorage.getItem("last_message")) - 1
      };

      this.message_bot.message = data.messages[data.last_message];
      this.message_bot.active_message = data.last_message + 1;
    };

    const init = () => {
      check_localStorage();
      set_last_message();
    };

    init();

    const set_interface = () => {
      chrome.storage.sync.get(["first_login_status"], status => {
        this.first_settings = status.first_login_status;
      });
    };

    set_interface();

    if (!localStorage.getItem("show_name_setter")) {
      localStorage.setItem("show_name_setter", true);
    }

    chrome.storage.sync.get(["user_name"], user => {
      vm.user_name = user.user_name;
    });
  },

  mounted() {
    // this.sendMessageToContentScript('update_statistics', {}); // should send obiect with stas
  },
  destroyed() {}
};
</script>

<style>
</style>