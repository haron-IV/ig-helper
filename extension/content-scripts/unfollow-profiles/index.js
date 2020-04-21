import getMessageFromPopup from '../utils/getMessageFromPopup';

const unfollowProfiles = () => {
    getMessageFromPopup("unfollowProfiles", (data) => {
        openFollowedProfilesList(data.value);
        setTimeout(() => {
            getProfilesToUnfollow();    
        }, 1000);
    });
};

const openFollowedProfilesList = () => {
    document.querySelector("#react-root > section > main > div > header > section > ul > li:nth-child(3) > a").click();
};

const getProfilesToUnfollow = (profiles) => {
    profiles = document.querySelector("body > div.RnEpo.Yx5HN > div > div.isgrP > ul > div").children;    
    const countOfLoadedProfiles = profiles.length;
    let i = 0;
    
    const unfollow = () => {
        if (i < countOfLoadedProfiles) {
            profiles[i].children[0].children[1].children[0].click();
            document.querySelector("body > div:nth-child(19) > div > div > div.mt3GC > button.aOOlW.-Cab_").click();

            setTimeout(unfollow(), 2000);
            i++;
        }
    };

    unfollow();
};

export default unfollowProfiles;