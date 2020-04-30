import storeSchema from "./storeSchema";
import { setData } from "./chromeStore";

const checkIsStoreInitialized = (store) => {
    if ( store.igHelperStore &&  store.igHelperStore.initialized === false) {
        store.igHelperStore.initialized = true;
        updateStore(store);
        return false;
    }
    return true;


    // if (Object.keys(store).length <= 1) return false;
    // return true

    // TODO: Make it better ;)
    // if ( Object.keys(store).length <= 1 ) {
    //   return false;
    // };
    // return true;
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