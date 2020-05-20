export default {
    namespaced: true,
    state: {
        getFollowers: {
            unfollowModalVisible: false
        },
        version: "0.0.6"
    },
    mutations: {
        toggleUnfollowModal: (state, visible) => state.getFollowers.unfollowModalVisible = visible,
    },
    getters: {
        getUnfollowModalVisible: state => state.getFollowers.unfollowModalVisible,
        getAppVersion: state => state.version
    }
}