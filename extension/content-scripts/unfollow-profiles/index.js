import getMessageFromPopup from '../utils/getMessageFromPopup';
import config from "./config.js";
import { updateStore } from "../store/index.js";
import { removeOverlayFromPage } from "../utils/blockingOverlay.js";
import speedUnfollowSleepSetter from './speedUnfollowSleepSetter.js';
import randomTimeAfterUnfollow from './randomTimeAfterUnfollow.js';
import { openFollowedProfilesList, profilesToUnfollow, closeFollowerModal, confirmUnfollowButton } from "./elementsHelper.js";

import { updateProfile } from "../user-profile/userProfile.js";
import loadProfiles from './loadProfiles';

const unfollowProfiles = (store) => {
    getMessageFromPopup("unfollowProfiles", (message) => {
        updateProfile(store);
        openFollowedProfilesList();
        setTimeout(() => {
            loadProfiles(message.value.unfollowCunt, () => {
                unfollow(JSON.parse(message.value.unfollowCunt), message.value.profilesToUnfollow, store);
            });
        }, config.sleepBeforeStartUnfollow);
    });
};

const unfollow = (profilesToUnfollowCount, profilesToUnfollowFromPopup, store) => {
    let i = 0;
    let scrollHeight = 0;

    function unfollowProfileLoop() {
        setTimeout(() => {
            const profiles = profilesToUnfollow();
            const countOfLoadedProfiles = profiles.length - 1;

            if (i < countOfLoadedProfiles && i < profilesToUnfollowCount) {
                unfollowLogic(profiles[i]);
                i++;
                profilesToUnfollowFromPopup.pop();
                store.igHelperStore.following.followedProfiles = profilesToUnfollowFromPopup;
                updateStore(store);

                console.log(`unfollowing... | removed ${i} profiles | loaded profiles to unfollow: ${profiles.length}`);
                
                if ( !JSON.stringify(i/3).includes(".") ) {
                    scrollHeight += 150;
                    document.querySelector("body > div.RnEpo.Yx5HN > div > div.isgrP").scrollTo({top: scrollHeight, behavior: 'smooth'});
                }

                if (i === profilesToUnfollowCount) unfollowingDone(store, profilesToUnfollowCount);
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

const unfollowingDone = (store, profilesToUnfollowCount) => {
    updateStore(store);
    closeFollowerModal();
    removeOverlayFromPage();

    chrome.runtime.sendMessage('', {
        type: 'notification-unfollowing',
        options: {
            title: "Unfollowing done.",
            message: `Unfollowing done. Unfollowed ${profilesToUnfollowCount} profiles.`
        }
    });

    window.location.reload();
};

export default unfollowProfiles;