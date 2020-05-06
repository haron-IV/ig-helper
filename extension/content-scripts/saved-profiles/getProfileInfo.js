const getPosts = () => document.querySelector("#react-root > section > main > div > header > section > ul > li:nth-child(1) > span > span").innerText;
const getFollowers = () => {
    if (document.querySelector("#react-root > section > main > div > header > section > ul > li:nth-child(2) > a > span"))
    return document.querySelector("#react-root > section > main > div > header > section > ul > li:nth-child(2) > a > span").innerText;
    return document.querySelector("#react-root > section > main > div > header > section > ul > li:nth-child(2) > span > span").innerText;
}
const getFollowed = () => {
    if (document.querySelector("#react-root > section > main > div > header > section > ul > li:nth-child(3) > a > span")) 
    return document.querySelector("#react-root > section > main > div > header > section > ul > li:nth-child(3) > a > span").innerText;
    return document.querySelector("#react-root > section > main > div > header > section > ul > li:nth-child(3) > span > span").innerText;
}
const getAvatar = () => {
    if (document.querySelector("#react-root > section > main > div > header > div > div > span > img"))
    return document.querySelector("#react-root > section > main > div > header > div > div > span > img").src;
    return document.querySelector("#react-root > section > main > div > header > div > div > div > button > img").src;
}

const profileObject = () => {
    return {
        profileLink: window.location.href,
        posts: getPosts(),
        followers: getFollowers(),
        followed: getFollowed(),
        avatar: getAvatar()
    };
};

export { profileObject };