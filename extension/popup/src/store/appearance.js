const appearance = {
    namespaced: true,
    state: {
        appWidth: 600,
        menuLeftSpace: 56
    },
    getters: {
        getAppWidth: state => state.appWidth,
        getMenuLeftSpace: state => state.menuLeftSpace
    }
};

export {appearance};