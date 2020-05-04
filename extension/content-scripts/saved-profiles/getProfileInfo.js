const getPosts = () => document.querySelector("#react-root > section > main > div > header > section > ul > li:nth-child(1) > span > span").innerText;
const getFollowers = () => document.querySelector("#react-root > section > main > div > header > section > ul > li:nth-child(2) > a > span").innerText;
const getFollowed = () => document.querySelector("#react-root > section > main > div > header > section > ul > li:nth-child(3) > a > span").innerText;
const getAvatar = () => document.querySelector("#react-root > section > main > div > header > div > div > span > img").src;

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