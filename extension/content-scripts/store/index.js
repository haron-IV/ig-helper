import storeSchema from "./storeSchema";
import { setData } from "./chromeStore";

const checkIsStoreInitialized = (store) => {
    if ( store.igHelperStore &&  store.igHelperStore.initialized === false) {
        store.igHelperStore.initialized = true;
        updateStore(store);
        return false;
    }
    return true;
};

const setStoreSchemaIfItIsEmty = store => {
    if (!checkIsStoreInitialized(store)) {
        setData(storeSchema);
    }
};

const updateStore = store => {
    setData(store);
};

const clearStore = () => {
    setData(storeSchema);
    return storeSchema;
};

export { setStoreSchemaIfItIsEmty, updateStore, clearStore };