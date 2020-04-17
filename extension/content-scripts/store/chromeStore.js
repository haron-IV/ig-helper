const setData = obj => {
    chrome.storage.sync.set(obj);
};

const getData = async name => {
    let data;
    await chrome.storage.sync.get(name, (items) => { data = items });
    return data;
};

export { setData, getData };