import getMessageFromPopup from '../utils/getMessageFromPopup';
import config from "./config.js";
import { updateStore } from "../store/index.js";
import { removeOverlayFromPage } from "../utils/blockingOverlay.js";
import speedUnfollowSleepSetter from './speedUnfollowSleepSetter.js';
import randomTimeAfterUnfollow from './randomTimeAfterUnfollow.js';
import { openFollowedProfilesList, profilesToUnfollow, closeFollowerModal, confirmUnfollowButton } from "./elementsHelper.js";

import { updateProfile } from "../user-profile/userProfile.js";
import loadProfiles from './loadProfiles';
import {updateUnfollowCounter} from "../utils/blockingOverlay.js";

const unfollowProfiles = (store) => {
    getMessageFromPopup("unfollowProfiles", (message) => {
        updateProfile(store);
        openFollowedProfilesList();
        setTimeout(() => {
            const unfollowCount = JSON.parse(message.value.unfollowCount) > message.value.profilesToUnfollow.length ? JSON.parse(message.value.unfollowCount) : message.value.profilesToUnfollow.length;
            loadProfiles(unfollowCount, () => { unfollow(JSON.parse(message.value.unfollowCount), message.value.profilesToUnfollow, store) });
        }, config.sleepBeforeStartUnfollow);
    });
};

const unfollow = (profilesToUnfollowCount, profilesToUnfollowFromPopup, store) => {
    const profiles = profilesToUnfollow();
    const countOfLoadedProfiles = profiles.length - 1;
    let i = (profilesToUnfollowFromPopup.length - 1) > 0 ? profilesToUnfollowFromPopup.length - 1 : profilesToUnfollowCount - 1;

    function unfollowProfileLoop() {
        setTimeout(() => {
            if (i < countOfLoadedProfiles) {
                unfollowLogic(profiles[i]);
                profilesToUnfollowFromPopup.pop();
                store.igHelperStore.following.followedProfiles = profilesToUnfollowFromPopup.reverse();
                updateStore(store);
                updateUnfollowCounter(profilesToUnfollowCount);
                profilesToUnfollowCount--;
                i--;

                if (profilesToUnfollowCount === 0) unfollowingDone(store, profilesToUnfollowCount);
                else unfollowProfileLoop();
                console.log(`unfollowing... | still ${profilesToUnfollowCount} profiles to unfollow | loaded profiles to unfollow: ${profiles.length}`);
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