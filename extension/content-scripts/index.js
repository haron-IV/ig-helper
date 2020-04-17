import {setStoreSchemaIfItIsEmty, updateStore} from "./store/index";

chrome.storage.sync.get("igHelperStore", store => { 
    // entire content-script shoud be inside store get cuz we need data in whole application    
    setStoreSchemaIfItIsEmty(store);

    store.test = "Changed";
    
    updateStore(store);

    console.log(store)
});