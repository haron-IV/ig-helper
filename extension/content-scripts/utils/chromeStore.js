const setData = obj => {
    chrome.storage.sync.set(obj);
};

const getData = name => {
    chrome.storage.sync.get(name, (items) => { console.log(items) });
};

export { setData, getData };