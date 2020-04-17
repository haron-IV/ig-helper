import getPopupMsg from "./utils/getMessageFromPopup";
import { setData, getData } from "./utils/chromeStore";

const test = () => {
    setData({
        babol: ""
    });

    getData("babol")
    
    // console.log(getData("test"))
    
    // chrome.storage.sync.get(["cojest"]), data => {
    //     console.log(data);
        
    // }
};

getPopupMsg('test', () => {test()});

// export default test;