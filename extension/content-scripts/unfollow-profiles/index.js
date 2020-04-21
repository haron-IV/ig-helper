import getMessageFromPopup from '../utils/getMessageFromPopup';

const unfollowProfiles = () => {
    getMessageFromPopup("unfollowProfiles", () => {
        openFollowedProfilesList();
    });
};

const openFollowedProfilesList = () => {
    document.querySelector("#react-root > section > main > div > header > section > ul > li:nth-child(3) > a").click();
};

export default unfollowProfiles;