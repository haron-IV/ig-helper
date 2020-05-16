const openProfile = (profile) => window.open(profile, "_self");
const openBlockModal = () => document.querySelector("#react-root > section > main > div > header > section > div.nZSzR > div.AFWDX > button").click();
const clickBlockButton = () => document.querySelector("body > div.RnEpo.Yx5HN > div > div > div > button:nth-child(1)").click();
const clickUnfollowButton = () => document.querySelector("#react-root > section > main > div > header > section > div.nZSzR > div.Igw0E.IwRSH.eGOV_._4EzTm > span > span.vBF20._1OSdk > button").click();
const confirmBlock = () => document.querySelector("body > div.RnEpo.Yx5HN > div > div > div.mt3GC > button.aOOlW.bIiDR").click();
const confirmUnfollow = () => document.querySelector("body > div.RnEpo.Yx5HN > div > div > div.mt3GC > button.aOOlW.-Cab_").click();

export { openProfile, openBlockModal, clickBlockButton, clickUnfollowButton, confirmBlock, confirmUnfollow };