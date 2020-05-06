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
    clearFollowedProfilesList: state => state.data.igHelperStore.following.followedProfiles = [],
    setLastMenuPosition(state, lastPosition) {
      state.data.igHelperStore.menu.lastPosition = lastPosition;
      chrome.storage.local.set(state.data);
    }
  },
  actions: {
    setData({ commit }) {
      chrome.storage.local.get('igHelperStore', (chromeStorage) => { 
        commit('setData', chromeStorage);
      });
    }
  },
  getters: {
    getFollowedProfiles: state => state.data ? state.data.igHelperStore.following.followedProfiles : {},
    getSavedProfiles: state => state.data ? state.data.igHelperStore.savedProfiles : [],
    getLastMenuPosition: state => state.data ? state.data.igHelperStore.menu.lastPosition : ""
  },
  modules: {
    appearance,
    app
  }
})
