import Vue from 'vue'
import Vuex from 'vuex'

import appearance from './appearance.js';
import app from './app.js';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    data: null //chrome data store
  },
  mutations: {
    setData(state){
      chrome.storage.sync.get('igHelperStore', (items) => { localStorage.setItem('igHelper', JSON.stringify(items)) });
      state.data = JSON.parse(localStorage.getItem('igHelper'));
    },
  },
  actions: {
  },
  getters: {
    getData: state => state.data.igHelperStore,
    getFollowedProfiles: state => state.data.igHelperStore.following.followedProfiles,
  },
  modules: {
    appearance,
    app
  }
})
