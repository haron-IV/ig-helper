

const loadProfiles = (howMuch, callback) => {
    const scrollCount = JSON.parse(howMuch) / 12;
    let i = 0;
    
    scroll(scrollCount, i).then( result => {
        callback();
    })
}

const scroll = (scrollCount, i) => {
    const scrollingPromise = new Promise( (resolve, reject) => {
        const interval = setInterval(() => {
            document.querySelector("body > div.RnEpo.Yx5HN > div > div.isgrP").scrollTop += 1000;
            i++;
            // console.log(`Loaded profiles: ${document.querySelector("body > div.RnEpo.Yx5HN > div > div.isgrP > ul > div").children.length} | i: ${i} | scrollCount: ${scrollCount}`);
            if (i >= scrollCount) {
                clearInterval(interval);
                resolve("loadedProfilesDone");
            };
        }, 2000);
    });
    
    return scrollingPromise;
};

export default loadProfiles;

// console script need to implement in content scrpit