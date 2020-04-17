import getPopupMsg from "./utils/getMessageFromPopup";

const test = () => {
    alert();
};

getPopupMsg('test', () => {test()});

// export default test;