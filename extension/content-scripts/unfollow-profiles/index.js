import getMessageFromPopup from '../utils/getMessageFromPopup';
import config from "./config.js";

const unfollowProfiles = () => {
    getMessageFromPopup("unfollowProfiles", (data) => {
        openFollowedProfilesList(data.value);
        setTimeout(() => {
            unfollow();
        }, 2000);
        
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
    console.log(Math.floor(Math.random() * (to - from + 1) + from));
    return Math.floor(Math.random() * (to - from + 1) + from);
};

const unfollow = () => {
    const profiles = profilesToUnfollow();
    const countOfLoadedProfiles = profiles.length;
    let i = 0;

    (function unfollowProfileLoop() {
        setTimeout(() => {
            if (i < countOfLoadedProfiles) {
                if (profiles[i].children[0].children[2].children[0]) profiles[i].children[0].children[2].children[0].click();
                if (document.querySelector("body > div:nth-child(19) > div > div > div.mt3GC > button.aOOlW.-Cab_")) document.querySelector("body > div:nth-child(19) > div > div > div.mt3GC > button.aOOlW.-Cab_").click();
                i++;
            }
            unfollowProfileLoop();
        }, randomTimeAfterUnfollow(config.sleepAfterUnfollow[0], config.sleepAfterUnfollow[1]));
    })();
};

export default unfollowProfiles;