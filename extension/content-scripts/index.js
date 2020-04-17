import {setStoreSchemaIfItIsEmty, updateStore, clearStore} from "./store/index";



chrome.storage.sync.get("igHelperStore", store => { 
    // entire content-script shoud be inside store get cuz we need data in whole application    
    setStoreSchemaIfItIsEmty(store);

    // how to update and clear store
    // store.test = "changed"
    // updateStore(store);
    // store = clearStore();
});