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
    setData(state, data){
      state.data = data;
      console.log("setData:", state);
    },
  },
  actions: {
    setData({ commit }) {
      chrome.storage.sync.get('igHelperStore', (chromeStorage) => { 
        commit('setData', chromeStorage);
      });
    }
  },
  getters: {
    getFollowedProfiles: state => state.data ? state.data.igHelperStore.following.followedProfiles : {}
  },
  modules: {
    appearance,
    app
  }
})
