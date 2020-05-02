const openFollowedProfilesList = () => {
    document.querySelector("#react-root > section > main > div > header > section > ul > li:nth-child(3) > a").click();
};

const profilesToUnfollow = () => {
    return document.querySelector("body > div.RnEpo.Yx5HN > div > div.isgrP > ul > div").children;
};

const closeFollowerModal = () => {
    document.querySelector("body > div.RnEpo.Yx5HN > div > div:nth-child(1) > div > div:nth-child(3) > button").click(); // close followers modal
}

const confirmUnfollowButton = () => {
    return document.querySelector("body > div:nth-child(19) > div > div > div.mt3GC > button.aOOlW.-Cab_");
}

export { openFollowedProfilesList, profilesToUnfollow, closeFollowerModal, confirmUnfollowButton }