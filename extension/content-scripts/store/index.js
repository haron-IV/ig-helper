import storeSchema from "./storeSchema";
import { setData } from "./chromeStore";

const checkIsStoreInitialized = data => {
    if ( Object.keys(data).length === 0) {
      return false;
    };
    return true;
};

const setStoreSchemaIfItIsEmty = data => {
    if (!checkIsStoreInitialized(data)) {
        setData(storeSchema);
    }
};

const updateStore = data => {
    setData(data);
};

export { setStoreSchemaIfItIsEmty, updateStore };