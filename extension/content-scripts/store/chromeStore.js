const setData = obj => {
    chrome.storage.local.set(obj);
};

const getData = async name => {
    let data;
    await chrome.storage.local.get(name, (items) => { data = items });
    return data;
};

export { setData, getData };