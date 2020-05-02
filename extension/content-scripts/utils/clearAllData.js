import getMessageFromPopup from "./getMessageFromPopup.js";

const clearAllData = (store) => {
    getMessageFromPopup("clearAllData", () => {
        store = clearStore();
        updateStore(store);
    });
    
};

export default clearAllData;