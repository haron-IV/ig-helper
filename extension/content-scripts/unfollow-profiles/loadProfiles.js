const loadProfiles = (howMuch) => {
    const scrollCount = howMuch / 12;
    let i = 0;
    scroll(scrollCount, i)
}

const scroll = (scrollCount, i) => {
    if (i < scrollCount) {
        document.querySelector("body > div.RnEpo.Yx5HN > div > div.isgrP").scrollTop += 1000;
        i++;
        console.log(`Loaded profiles: ${document.querySelector("body > div.RnEpo.Yx5HN > div > div.isgrP > ul > div").children.length} | i: ${i}`);
        
        setTimeout(() => {
            scroll(scrollCount, i);    
        }, 2000);
    }
};