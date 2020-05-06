import getMessageFromPopup from "./getMessageFromPopup.js";
import { clearStore, updateStore } from "../store/index.js";

const clearAllData = (store) => {
    getMessageFromPopup("clearAllData", () => {
        store = clearStore();
        updateStore(store);
    });
};

export default clearAllData;