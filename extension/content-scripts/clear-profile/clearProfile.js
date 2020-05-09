// TODO: section
// - remove all background DOM elements for optimize
// - add overlay
// - increase list size

import waitForElement from "../utils/waitForElement.js";


// This functionality should be limited and for premium users
const clearProfile = () => {
    let i = 0;
    const jumpCount = 3;

    waitForElement("body > div.RnEpo.Yx5HN > div", 500, () => {
        setInterval(() => {
            const profiles = document.querySelector("body > div.RnEpo.Yx5HN > div > div.isgrP > ul > div").children;
            
            window.open(profiles[i + 1], "blank");
            window.open(profiles[i + 2], "blank");
            window.open(profiles[i + 3], "blank");
            // this profiles should be stored in storage for checking it on other window


            // scroll here

            i++;
            setTimeout(() => {
                // check stored profiles and compare with window.location.href
                // if exist:
                    // check profile authentic:
                        // - if profile followers are smaller than followed add fake point
                        // - if profile followed profiles is over f.e: 2k - 5k add point
                        // - if profile posts are smaller than 5 or 10 add point
                        // - if profile bio will be looking as fake add point (create how to check it)
                        // - if profile last post is older than 3 - 6 monts add point
                        // - if profile are not tagged in any post add point
                        // - if profile last post has less like than 50 - 80 add point

                        // ^^^^ each state should have specyfic point range for better calculating that this profile is fake

                // If profile is rated by this above add to saved profiles with info about it
            }, 4000);
        }, 3000);
    });
};

