<template>
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
</template>

<script>
import { eventBus } from "../main.js";

export default {
  data() {
    return {
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

    save_message(which_message) {
      const saved_messages = JSON.parse(localStorage.getItem("saved_messages"));
      let last_message = JSON.parse(localStorage.getItem("last_message"));

      last_message = which_message;
      saved_messages[which_message] = this.message_bot.message;

      localStorage.setItem("last_message", JSON.stringify(last_message));
      localStorage.setItem("saved_messages", JSON.stringify(saved_messages));
    },

    toggle_messaging() {
      if (this.message_bot.isStart === false) {
        eventBus.sendMessageToContentScript("start_messaging");

        chrome.storage.sync.set({ last_message: this.message_bot.message });
        localStorage.setItem("last_message", this.message_bot.active_message);

        this.message_bot.isStart = true;
      } else {
        eventBus.sendMessageToContentScript("stop_messaging");
        this.message_bot.isStart = false;
      }
    },

    toggle_deleting_messages() {
      if (this.message_bot.dletingIsStart === false) {
        eventBus.sendMessageToContentScript("start_delete_all_old_messages");
        this.message_bot.dletingIsStart = true;
      } else {
        eventBus.sendMessageToContentScript("stop_delete_all_old_messages");
        this.message_bot.dletingIsStart = false;
      }
    }
  },

  created() {
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
  }
};
</script>

<style lang="scss">
@import "../assets/scss/variables.scss";
@import "../assets/scss/helpers.scss";

.like-bot {
  &__speed {
    display: flex;
    justify-content: space-between;

    span {
      cursor: pointer;
    }
  }

  &__progress-bar {
    margin: 5px 0;
    width: 100%;
    height: 5px;
    border: 1px solid rgba($blue, 0.1);
    border-radius: 15px;

    .value {
      width: 50%;
      height: 5px;
      border-radius: 15px;
      background-color: $blue;
      transition: width ease-in 200ms;
    }
  }
}
</style>