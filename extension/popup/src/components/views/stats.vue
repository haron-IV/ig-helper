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
    </article>
  </main>
</template>

<script>
export default {
  data: {
    stats: null
  },

  created() {
    chrome.storage.sync.get(["bot_stats"], stats => {
      localStorage.setItem("stats", JSON.stringify(stats));
    });
  },

  beforeMount() {
    this.stats = JSON.parse(localStorage.getItem("stats"));
  },

  methods: {
    removeUnderscore(item_name) {
      return item_name.replace(/_/g, " ");
    },

    numberWithComma(number) {
      return number.toLocaleString();
    }
  }
};
</script>

<style lang="scss">
</style>