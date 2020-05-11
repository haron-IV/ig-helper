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
            loadProfiles(JSON.parse( message.value.unfollowCunt ), () => {
                // add default if message.value.unfollowCunt === 0 then push lenght of profiles array as this
                // fix name this variable
                unfollow(JSON.parse(message.value.unfollowCunt), message.value.profilesToUnfollow, store);
            });
        }, config.sleepBeforeStartUnfollow);
    });
};

const unfollow = (profilesToUnfollowCount, profilesToUnfollowFromPopup, store) => {
    const profiles = profilesToUnfollow();
    const countOfLoadedProfiles = profiles.length - 1;
    let i = profilesToUnfollowCount - 1;

    function unfollowProfileLoop() {
        setTimeout(() => {
            if (i < countOfLoadedProfiles) {
                unfollowLogic(profiles[i]);

                profilesToUnfollowFromPopup.pop();
                store.igHelperStore.following.followedProfiles = profilesToUnfollowFromPopup.reverse();
                updateStore(store);
                // todo: check this. If unfollowing remove goog item from popup array

                if (i === 0) unfollowingDone(store, profilesToUnfollowCount);
                else unfollowProfileLoop();
                console.log(`unfollowing... | still ${i} profiles to unfollow | loaded profiles to unfollow: ${profiles.length}`);
                i--;
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
    setTimeout(() => {
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
    }, 1000);
};

export default unfollowProfiles;