import { updateStore } from "../store";

const updateProfile = (store) => {
    store.igHelperStore.userProfile = {
        profileLink: window.location.href,
        profileImg: document.querySelector("#react-root > section > main > div > header > div > div > div > button > img").src,
        followers: document.querySelector("#react-root > section > main > div > header > section > ul > li:nth-child(2) > a > span").innerText,
        followed: document.querySelector("#react-root > section > main > div > header > section > ul > li:nth-child(3) > a > span").innerText
    };

    updateStore(store);
};

export { updateProfile };