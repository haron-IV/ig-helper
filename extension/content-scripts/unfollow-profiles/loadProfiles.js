const loadProfiles = (howMuch, callback) => {
    let scrollCount = 0;
    if (JSON.parse(howMuch) > 12) scrollCount = JSON.parse(howMuch) / 12;
    
    let i = 0;
    
    scroll(scrollCount, i).then( result => {
        callback();
    })
}

const scroll = (scrollCount, i) => {
    const scrollingPromise = new Promise( (resolve, reject) => {
        const interval = setInterval(() => {
            if (i >= scrollCount) {
                resolve("loadedProfilesDone");
                clearInterval(interval);
            } else {
                document.querySelector("body > div.RnEpo.Yx5HN > div > div.isgrP").scrollTop += 1000;
                i++;
            }
        }, 2200);
    });
    
    return scrollingPromise;
};

export default loadProfiles;