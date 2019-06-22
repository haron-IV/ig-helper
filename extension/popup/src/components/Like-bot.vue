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

      <div class="like-bot__progress-bar" @click="set_like_speed_from_progress" ref="progress">
        <!-- //TODO: this should be another component -->
        <div class="value" :style="{'width': like_bot.speed + '%'}"></div>
      </div>
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
      eventBus.sendMessageToContentScript("set_like_speed", speed);

      if (this.like_bot.isStart) {
        eventBus.sendMessageToContentScript("stop_liking");
        eventBus.sendMessageToContentScript("start_liking");
      }
    },

    toggle_liking() {
      if (this.like_bot.isStart === false) {
        eventBus.sendMessageToContentScript("start_liking");
        this.like_bot.isStart = true;
      } else {
        eventBus.sendMessageToContentScript("stop_liking");
        this.like_bot.isStart = false;
      }
    },

    set_like_speed_from_progress(e) {
      const speed = Math.round(
        (e.clientX / this.$refs.progress.offsetWidth) * 100 - 1,
        2
      );

      this.set_like_speed(speed);
      this.eventBus.sendMessageToContentScript("set_like_speed", speed);
    }
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