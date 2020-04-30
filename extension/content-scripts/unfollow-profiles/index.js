import getMessageFromPopup from '../utils/getMessageFromPopup';
import config from "./config.js";

const unfollowProfiles = () => {
    getMessageFromPopup("unfollowProfiles", (message) => {
        openFollowedProfilesList();
        setTimeout(() => {
            unfollow(JSON.parse(message.value));
        }, config.sleepBeforeStartUnfollow);
        
    });
};

const openFollowedProfilesList = () => {
    document.querySelector("#react-root > section > main > div > header > section > ul > li:nth-child(3) > a").click();
};

const profilesToUnfollow = () => {
    return document.querySelector("body > div.RnEpo.Yx5HN > div > div.isgrP > ul > div").children;
};

const randomTimeAfterUnfollow = (from, to) => {
    from = from * 1000;
    to = to * 1000;
    return Math.floor(Math.random() * (to - from + 1) + from);
};

const unfollow = (profilesToUnfollowCount) => {
    let profiles = profilesToUnfollow();
    let countOfLoadedProfiles = profiles.length - 1;
    let i = 0;

    function unfollowProfileLoop() {
        // TODO: show look for last followed profiles from list
        setTimeout(() => {
            if (i < countOfLoadedProfiles && i < profilesToUnfollowCount) {
                if (profiles[i].children[0].children[2]) profiles[i].children[0].children[2].children[0].click();
                if (profiles[i].children[0].children[1]) profiles[i].children[0].children[1].children[0].click(); // after scrolling and refresh the list DOM in list looks different so need to use second case.
                if (document.querySelector("body > div:nth-child(19) > div > div > div.mt3GC > button.aOOlW.-Cab_")) document.querySelector("body > div:nth-child(19) > div > div > div.mt3GC > button.aOOlW.-Cab_").click();
                i++;
                
                if ( i === countOfLoadedProfiles ) {
                    document.querySelector("body > div.RnEpo.Yx5HN > div > div.isgrP").scrollTop += "420";
                    setTimeout(() => {
                        profiles = profilesToUnfollow(); //update
                        countOfLoadedProfiles = profiles.length - 1;
                    }, 2000);
                }

                if (i === profilesToUnfollowCount) alert("Unfollowing Done"); // TODO: should show small modal or open popup
                unfollowProfileLoop();
            }
        }, randomTimeAfterUnfollow(config.sleepAfterUnfollow[0], config.sleepAfterUnfollow[1]));
    };

    unfollowProfileLoop();
};

export default unfollowProfiles;