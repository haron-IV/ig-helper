<template>
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
</template>

<script>
import { eventBus } from "../main.js";

export default {
  data() {
    return {
      like_bot: {
        isStart: false,
        speed:
          localStorage.getItem("bot_like_speed") !== null
            ? parseInt(localStorage.getItem("bot_like_speed"))
            : 500
      }
    };
  },

  methods: {
    set_like_speed(speed) {
      this.like_bot.speed = speed;
      localStorage.setItem("bot_like_speed", speed);
      this.eventBus.sendMessageToContentScript("set_like_speed", speed); // need eventBus

      if (this.like_bot.isStart) {
        this.eventBus.sendMessageToContentScript("stop_liking");
        this.eventBus.sendMessageToContentScript("start_liking");
      }
    },

    toggle_liking() {
      if (this.like_bot.isStart === false) {
        this.eventBus.sendMessageToContentScript("start_liking");
        this.like_bot.isStart = true;
      } else {
        this.eventBus.sendMessageToContentScript("stop_liking");
        this.like_bot.isStart = false;
      }
    }
  }
};
</script>

<style lang="scss">
@import "../assets/scss/variables.scss";
</style>