import getMessageFromPopup from '../utils/getMessageFromPopup';
import config from "./config.js";
import { updateStore } from "../store/index.js";
import { updateUnfollowResults } from "./unfollowDataHelper.js";
import { removeOverlayFromPage } from "../utils/blockingOverlay.js";
import speedUnfollowSleepSetter from './speedUnfollowSleepSetter.js';
import randomTimeAfterUnfollow from './randomTimeAfterUnfollow.js';
import checkAndScrollList from "./checkAndScrollList.js";

const unfollowProfiles = (store) => {
    getMessageFromPopup("unfollowProfiles", (message) => {
        openFollowedProfilesList();
        setTimeout(() => {
            unfollow(JSON.parse(message.value.unfollowCunt), message.value.profilesToUnfollow, store);
        }, config.sleepBeforeStartUnfollow);
        
    });
};

const openFollowedProfilesList = () => {
    document.querySelector("#react-root > section > main > div > header > section > ul > li:nth-child(3) > a").click();
};

const profilesToUnfollow = () => {
    return document.querySelector("body > div.RnEpo.Yx5HN > div > div.isgrP > ul > div").children;
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
                
                checkAndScrollList(i, scrollHeight, ()=> {
                    profiles = profilesToUnfollow(); //update
                    countOfLoadedProfiles = profiles.length - 1;    
                });

                if (i === profilesToUnfollowCount) {
                    updateStore(store);
                    // console.log(`Unfollowed profiles: ${unfollowResults.unfollowedProfilesCount}. Unfollowed profiles list: ${unfollowResults.unfollowedProfiles}`);
                    document.querySelector("body > div.RnEpo.Yx5HN > div > div:nth-child(1) > div > div:nth-child(3) > button").click(); // close followers modal
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

const unfollowLogic = (profile, profiles, countOfLoadedProfiles, unfollowResults, profilesToUnfollowFromPopup, store, i) => {

    // for (const profile in profiles) {

        // if ( profilesToUnfollowFromPopup.includes(profiles[index].children[0].children[1].children[0].children[0].children[0].children[0].href) ) {
            // console.log(store.igHelperStore.following.followedProfiles);
            // console.log('removed: ', profile.children[0].children[1].children[0].children[0].children[0].children[0].href);
            // console.log('--------------------------------');


            // profilesToUnfollowFromPopup = profilesToUnfollowFromPopup.filter( el => el != profile.children[0].children[1].children[0].children[0].children[0].children[0].href);
            // const filteredProfilesToUnfollowFromPopup = profilesToUnfollowFromPopup.filter( el => el != profile.children[0].children[1].children[0].children[0].children[0].children[0].href);
            // store.igHelperStore.following.followedProfiles = profilesToUnfollowFromPopup;
            // console.log(store.igHelperStore.following.followedProfiles)
            // updateStore(store);

            if (profile.children[0].children[2]) profile.children[0].children[2].children[0].click();
            if (profile.children[0].children[1]) profile.children[0].children[1].children[0].click();
            if (document.querySelector("body > div:nth-child(19) > div > div > div.mt3GC > button.aOOlW.-Cab_")) document.querySelector("body > div:nth-child(19) > div > div > div.mt3GC > button.aOOlW.-Cab_").click();
            // updateUnfollowResults(unfollowResults, profile.children[0].children[1].children[0].children[0].children[0].children[0].href);

            // const unfollowedProfile = profilesToUnfollowFromPopup.filter( profile => profile === profiles[i].children[0].children[1].children[0].children[0].children[0].children[0].href);
            // const mappedStoreFollowedProfiles = store.igHelperStore.following.followedProfiles.map( profile => unfollowedProfile.includes(profile) ? null : profile);
            // store.igHelperStore.following.followedProfiles = mappedStoreFollowedProfiles.filter( el => el !== null);
            // updateStore(store);
            // console.log("updated profiles ", store.igHelperStore.following.followedProfiles);
            // i++;
            // profile.remove();
            // TODO: not unfollowing excatly profiles
            // return;
        // } else {
            // TODO: scroll
            // this code is used below move it to function
            // document.querySelector("body > div.RnEpo.Yx5HN > div > div.isgrP").scrollTop += "420";
            // setTimeout(() => {
            //     profiles = profilesToUnfollow(); //update
            //     countOfLoadedProfiles = profiles.length - 1;
            // }, 2000);
        // }
    // }
};

export default unfollowProfiles;