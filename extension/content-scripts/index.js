import { checkIsStoreInitialized } from "./store/index";
import storeFollowedProfiles from "./get-followers/index";
import unfollowProfiles from './unfollow-profiles/index';
import { overlay } from "./utils/blockingOverlay.js";
import clearAllData from "./utils/clearAllData.js";
import savedProfiles from "./saved-profiles/savedProfiles";
import logObj from "./utils/logObject.js";

logObj();

chrome.storage.local.get("igHelperStore", store => { 
    console.json(store);
    // entire content-script shoud be inside store get cuz we need data in whole application    
    checkIsStoreInitialized(store);

    clearAllData(store);
    
    storeFollowedProfiles(store);
    unfollowProfiles(store);
    savedProfiles(store);

    overlay();
});