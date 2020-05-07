import { updateStore } from "../store";

const updateProfile = (store) => {
    store.igHelperStore.userProfile = {
        profileLink: window.location.href,
        followers: JSON.parse( document.querySelector("#react-root > section > main > div > header > section > ul > li:nth-child(2) > a > span").innerText ),
        followed: JSON.parse( document.querySelector("#react-root > section > main > div > header > section > ul > li:nth-child(3) > a > span").innerText )
    };

    updateStore(store);
};

export { updateProfile };