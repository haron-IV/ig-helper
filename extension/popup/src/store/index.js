import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    appWidth: 600,
    menuLeftSpace: 56,
    modals: {
      getFollowers: {
        isVisible: false
      }
    },
    data: null //chrome data store
  },
  mutations: {
    setData(state){
      chrome.storage.sync.get('igHelperStore', (items) => { localStorage.setItem('igHelper', JSON.stringify(items)) });
      state.data = JSON.parse(localStorage.getItem('igHelper'));
    },
    closeFollowersModal: state => state.modals.getFollowers.isVisible = false,
    showFollowersModal: state => state.modals.getFollowers.isVisible = true
  },
  actions: {
  },
  getters: {
    getData: state => state.data.igHelperStore,
    getFollowedProfiles: state => state.data.igHelperStore.following.followedProfiles,
    getFollowersModalVisible: state => state.modals.getFollowers.isVisible
  },
  modules: {
  }
})
