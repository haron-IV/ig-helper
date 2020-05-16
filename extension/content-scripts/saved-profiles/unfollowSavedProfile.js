import getMessageFromPopup from "../utils/getMessageFromPopup.js";
import { updateStore } from "../store";
import waitForElement from "../utils/waitForElement.js";
import { openProfile, openBlockModal, clickBlockButton, clickUnfollowButton, confirmBlock, confirmUnfollow } from "./elementsHelper.js";

const profileAction = (store, type, popupMessageName, localStorageitemName) => {
    switch (type) {
        case "block": {
            getMessageFromPopup(popupMessageName, msg => {
                localStorage.setItem(localStorageitemName, JSON.stringify(msg.value));
                openProfile(msg.value);
            });
            autoBlockProfile(store);
            break;
        };

        case "unfollow": {
            getMessageFromPopup(popupMessageName, msg => {
                localStorage.setItem(localStorageitemName, JSON.stringify(msg.value));
                openProfile(msg.value);
            });
            autoUnfollowProfile(store);
            break;
        };
    }
};

const autoBlockProfile = (store) => {
    const condition = localStorage.getItem("igHelperProfileToBlock") && JSON.parse(localStorage.getItem("igHelperProfileToBlock")) != null && JSON.parse( localStorage.getItem("igHelperProfileToBlock") ) == window.location.href;
    if (condition) {
        waitForElement("#react-root > section > main > div > header > section", 500, () => {
            openBlockModal();
             setTimeout(() => {
                clickBlockButton();
                confirmBlock();
                removeProfileFromStorage(store);
                removeProfile("igHelperProfileToBlock");
             }, 700);
            closeWindow();
        });
    }
};

const autoUnfollowProfile = (store) => {
    const condition = localStorage.getItem("igHelperProfileToUnfollow") && JSON.parse(localStorage.getItem("igHelperProfileToUnfollow")) != null && JSON.parse( localStorage.getItem("igHelperProfileToUnfollow") ) == window.location.href;
    if (condition) {
        waitForElement("#react-root > section > main > div > header > section", 500, () => {
            clickUnfollowButton();
            setTimeout(() => {
                confirmUnfollow();
                removeProfileFromStorage(store);
                removeProfile("igHelperProfileToUnfollow");
            }, 700);
            closeWindow();
        });
    }
};

const removeProfileFromStorage = (store) => {
    const profile = window.location.href;
    store.igHelperStore.savedProfiles = store.igHelperStore.savedProfiles.filter(el => el !== profile);
    updateStore(store);
};

const removeProfile = (localStorageItemName) => localStorage.setItem(localStorageItemName, "");
const closeWindow = () => setTimeout(window.close, 1000);

export { profileAction };