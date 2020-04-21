import getMessageFromPopup from '../utils/getMessageFromPopup';

const unfollowProfiles = () => {
    getMessageFromPopup("unfollowProfiles", (data) => {
        openFollowedProfilesList(data.value);
        setTimeout(() => {
            unfollow();
        }, 1000);
        
    });
};

const openFollowedProfilesList = () => {
    document.querySelector("#react-root > section > main > div > header > section > ul > li:nth-child(3) > a").click();
};

const profilesToUnfollow = () => {
    return document.querySelector("body > div.RnEpo.Yx5HN > div > div.isgrP > ul > div").children;
};

const unfollow = () => {
    const profiles = profilesToUnfollow();
    const countOfLoadedProfiles = profiles.length;
    let i = 0;

    const interval = setInterval(() => {
        if (i < 1) {
            profiles[i].children[0].children[2].children[0].click()
            document.querySelector("body > div:nth-child(19) > div > div > div.mt3GC > button.aOOlW.-Cab_").click();
            i++;
        } else {
            clearInterval(interval);
        }
    }, 2000);
};

export default unfollowProfiles;