import storeSchema from "./storeSchema";
import { setData } from "./chromeStore";

const checkIsStoreInitialized = (store) => {
    if ( store.igHelperStore && store.igHelperStore.initialized === false) {
        store.igHelperStore.initialized = true;
        updateStore(store);   
    }
};

const updateStore = store => {
    setData(store);
};

const clearStore = () => {
    setData(storeSchema);
    return storeSchema;
};

export { checkIsStoreInitialized, updateStore, clearStore };