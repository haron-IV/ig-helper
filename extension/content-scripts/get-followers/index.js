import debounce from "lodash.debounce";

import getMessageFromPopup from "../utils/getMessageFromPopup";
import {updateStore} from "../store/index";

const storeFollowedProfiles = store => {
    addListenerForFollowButtonAndStoreProfiles(store);
};

const addListenerForFollowButtonAndStoreProfiles = store => {
    getMessageFromPopup("colletFollowedUsers", () => {
        openFollowList(store);
    });
};

const openFollowList = store => {
    const btnShowList = document.querySelector("#react-root > section > main > div > header > section > div.nZSzR > div.Igw0E.IwRSH.eGOV_._4EzTm > span > span.mLCHD._1OSdk > button");

    if (btnShowList) {
        btnShowList.click();

        setTimeout(() => {
            const btnShowModalList = document.querySelector("#react-root > section > main > div > div.NP414.ccgHY.GZkEI > div.EM8Od > a");
            btnShowModalList.click();

            setTimeout(() => {
                addListenersToButtons(store);    
            }, 200);
        }, 650);
    };
};

const addListenersToButtons = store => {
    if (document.querySelector("body > div.RnEpo.Yx5HN > div") && document.querySelector("body > div.RnEpo.Yx5HN > div > div.Igw0E.IwRSH.eGOV_.vwCYk.lDRO1 > div")) {
        let profilesToFollow = document.querySelectorAll("body > div.RnEpo.Yx5HN > div > div.Igw0E.IwRSH.eGOV_.vwCYk.lDRO1 > div > div > div");

        document.querySelector("body > div.RnEpo.Yx5HN > div > div.Igw0E.IwRSH.eGOV_.vwCYk.lDRO1 > div").addEventListener("scroll", debounce(() => {
            profilesToFollow = document.querySelectorAll("body > div.RnEpo.Yx5HN > div > div.Igw0E.IwRSH.eGOV_.vwCYk.lDRO1 > div > div > div");
            loopThroughtButtons(profilesToFollow, store);    
        }, 1350)); 

        loopThroughtButtons(profilesToFollow, store);  
    }
};

const loopThroughtButtons = (profilesToFollow, store) => {
    for (const profile of profilesToFollow) {
        profile.children[2].children[0].addEventListener("click", () => {
            store.igHelperStore.following.followedProfiles.push(profile.children[0].children[0].children[1].href);
            updateStore(store);
        });
    }
};

export default storeFollowedProfiles;