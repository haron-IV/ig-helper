import {setStoreSchemaIfItIsEmty, updateStore, clearStore} from "./store/index";
import storeFollowedProfiles from "./get-followers/index";
import unfollowProfiles from './unfollow-profiles/index';

chrome.storage.sync.get("igHelperStore", store => { 
    // entire content-script shoud be inside store get cuz we need data in whole application    
    setStoreSchemaIfItIsEmty(store);
    console.log(store)

    // how to update and clear store
    // store.test = "changed"
    // store = clearStore();
    // updateStore(store);

    storeFollowedProfiles(store);
    unfollowProfiles();
});