import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    appWidth: 600,
    menuLeftSpace: 56,
    data: null
  },
  mutations: {
    setData(state){
      chrome.storage.sync.get('igHelperStore', (items) => { localStorage.setItem('igHelper', JSON.stringify(items)) });
      state.data = JSON.parse(localStorage.getItem('igHelper'));
    }
  },
  actions: {
  },
  getters: {
    getData: state => state.data.igHelperStore,
    getFollowedProfiles: state => state.data.igHelperStore.following.followedProfiles
  },
  modules: {
  }
})
