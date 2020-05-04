import getMessageFromPopup from "../utils/getMessageFromPopup.js";
import { updateStore } from "../store";
import waitForElement from "../utils/waitForElement.js";

const unfollowSavedProfile = (store) => {
    getMessageFromPopup("blockUserFromSavedProfiles", (msg) => {
        localStorage.setItem("igHelperProfileToBlock", JSON.stringify(msg.value));
        openProfile(msg.value);
    });

    autoBlockProfile(store);
};

const autoBlockProfile = (store) => {
    const condition = localStorage.getItem("igHelperProfileToBlock") && JSON.parse(localStorage.getItem("igHelperProfileToBlock")) != null && JSON.parse( localStorage.getItem("igHelperProfileToBlock") ) == window.location.href;
    if (condition) {
        waitForElement("#react-root > section > main > div > header > section", 500, () => {
            openUnfollowModal();
            setTimeout(() => {
                clickUnfollowButton();
                confirmBlock();
                removeProfileFromStorage(store);
                removeProfileToBlock();
            }, 700);
        });
    }
};

const openProfile = (profile) => {
    window.open(profile, "_self");
};

const openUnfollowModal = () => {
    document.querySelector("#react-root > section > main > div > header > section > div.nZSzR > div.AFWDX > button").click();
};

const clickUnfollowButton = () => {
    document.querySelector("body > div.RnEpo.Yx5HN > div > div > div > button:nth-child(1)").click();
};

const confirmBlock = () => {
    document.querySelector("body > div.RnEpo.Yx5HN > div > div > div.mt3GC > button.aOOlW.bIiDR").click();
};

const removeProfileFromStorage = (store) => {
    const profile = window.location.href;
    store.igHelperStore.savedProfiles = store.igHelperStore.savedProfiles.filter(el => el !== profile);
    updateStore(store);
};

const removeProfileToBlock = () => {
    localStorage.setItem("igHelperProfileToBlock", "");
};

export default unfollowSavedProfile;