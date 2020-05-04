const waitForElement = (selector, time, callback) => {
    if (document.querySelector(selector) != null) {
        callback(); 
        return
    }else {
        setTimeout(() => {
            waitForElement(selector, time, callback);
        }, time);
    }
};

export default waitForElement;