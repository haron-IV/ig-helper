import global_data from './global_data';
import color_log from './helpers/color_log';
import like from './like-bot/like';

let data = null;

const interval = setInterval(() => {
    if ( document.querySelector('.profile-action--yes') ){
        data = global_data();
        clearInterval(interval);
    }
}, 1000);


setTimeout(() => {
    like(data.like_button, data);
}, 6000);

setTimeout(() => {
    console.log(data)    
}, 6500);


chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        // console.log(sender.tab ?
        //         "from a content script:" + sender.tab.url :
        //         "from the extension");

        if (request.greeting == "hello") {
            console.log(1)
        }
            sendResponse({farewell: "goodbye"});
});