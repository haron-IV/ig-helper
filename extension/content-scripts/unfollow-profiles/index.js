import getMessageFromPopup from '../utils/getMessageFromPopup';
import config from "./config.js";
import { updateStore } from "../store/index.js";
import { removeOverlayFromPage } from "../utils/blockingOverlay.js";
import speedUnfollowSleepSetter from './speedUnfollowSleepSetter.js';
import randomTimeAfterUnfollow from './randomTimeAfterUnfollow.js';
import { openFollowedProfilesList, profilesToUnfollow, closeFollowerModal, confirmUnfollowButton } from "./elementsHelper.js";


const unfollowProfiles = (store) => {
    getMessageFromPopup("unfollowProfiles", (message) => {
        openFollowedProfilesList();
        setTimeout(() => {
            unfollow(JSON.parse(message.value.unfollowCunt), message.value.profilesToUnfollow, store);
        }, config.sleepBeforeStartUnfollow);
        
    });
};

const unfollow = (profilesToUnfollowCount, profilesToUnfollowFromPopup, store) => {
    let profiles = profilesToUnfollow();
    let countOfLoadedProfiles = profiles.length - 1;
    let i = 0;
    let scrollHeight = 0;
    const unfollowResults = {
        unfollowedProfilesCount: 0,
        unfollowedProfiles: []
    };

    function unfollowProfileLoop() {
        setTimeout(() => {
            if (i < countOfLoadedProfiles && i < profilesToUnfollowCount) {

                unfollowLogic(profiles[i], profiles, countOfLoadedProfiles, unfollowResults, profilesToUnfollowFromPopup, store, i);
                i++;
                profilesToUnfollowFromPopup.pop();
                store.igHelperStore.following.followedProfiles = profilesToUnfollowFromPopup;
                updateStore(store);

                console.log(`unfollowing... | removed ${i} profiles |`)
                
                if ( !JSON.stringify(i/3).includes(".") ) {
                    console.log(JSON.stringify(i/3));

                    scrollHeight += 150;
                    document.querySelector("body > div.RnEpo.Yx5HN > div > div.isgrP").scrollTo({top: scrollHeight, behavior: 'smooth'});
                    setTimeout(() => {
                        profiles = profilesToUnfollow(); //update
                        countOfLoadedProfiles = profiles.length - 1;    
                    }, 1000);   
                }

                if (i === profilesToUnfollowCount) {
                    updateStore(store);
                    // console.log(`Unfollowed profiles: ${unfollowResults.unfollowedProfilesCount}. Unfollowed profiles list: ${unfollowResults.unfollowedProfiles}`);
                    closeFollowerModal();
                    removeOverlayFromPage();

                    chrome.runtime.sendMessage('', {
                        type: 'notification-unfollowing',
                        options: {
                            title: "Unfollowing done.",
                            message: `Unfollowing done. Unfollowed ${profilesToUnfollowCount} profiles.`
                        }
                    });
                } // TODO: should show small modal or open popup
                unfollowProfileLoop();
            }
        }, randomTimeAfterUnfollow(
            speedUnfollowSleepSetter(profilesToUnfollowCount, store)[0], 
            speedUnfollowSleepSetter(profilesToUnfollowCount, store)[1]
        ));
    };

    unfollowProfileLoop();
};

const unfollowLogic = (profile) => {
    if (profile.children[0].children[2]) profile.children[0].children[2].children[0].click();
    if (profile.children[0].children[1]) profile.children[0].children[1].children[0].click();
    if (confirmUnfollowButton()) confirmUnfollowButton().click();
};

export default unfollowProfiles;