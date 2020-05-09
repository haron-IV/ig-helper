import { updateStore } from "../store";

const updateProfile = (store) => {
    clearArchiveFromDoubledDays(store);

    store.igHelperStore.userProfile.archive.push({
        profileLink: window.location.href,
        profileImg: getProfileImg(),
        followers: document.querySelector("#react-root > section > main > div > header > section > ul > li:nth-child(2) > a > span").innerText,
        followed: document.querySelector("#react-root > section > main > div > header > section > ul > li:nth-child(3) > a > span").innerText,
        updated: `${new Date().toLocaleDateString().replace(/[.]/g, "/")} ${new Date().toLocaleTimeString('en-US', { hour12: false, hour: "numeric", minute: "numeric"})}`,
    });
    
    updateStore(store);
};

const clearArchiveFromDoubledDays = (store) => {
    store.igHelperStore.userProfile.archive = store.igHelperStore.userProfile.archive.filter( el => !el.updated.includes(new Date().toLocaleDateString().replace(/[.]/g, "/")) );
};

const getProfileImg = () => {
    if ( document.querySelector("#react-root > section > main > div > header > div > div > div > button > img")) return document.querySelector("#react-root > section > main > div > header > div > div > div > button > img").src;
    return document.querySelector("#react-root > section > main > div > header > div > div > span > img").src;
};

export { updateProfile };