export default {
    namespaced: true,
    state: {
        getFollowers: {
            unfollowModalVisible: false
        }
    },
    mutations: {
        toggleUnfollowModal: (state, visible) => state.getFollowers.unfollowModalVisible = visible,
    },
    getters: {
        getUnfollowModalVisible: state => state.getFollowers.unfollowModalVisible
    }
}