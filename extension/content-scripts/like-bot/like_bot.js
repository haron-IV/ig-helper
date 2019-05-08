import global_data from '../global_data';
import get_message_from_popup from '../helpers/get_message_from_popup';
import like from './like';

let data = null;
const like_bot_data = {
    interval: null
};

const interval = setInterval(() => {
    if ( document.querySelector('.profile-action--yes') ){
        data = global_data();
        clearInterval(interval);
    }
}, 1000);

get_message_from_popup('start_liking', () => {
    like_bot_data.interval = setInterval(() => {
        like(document.querySelector('.profile-action--yes'), data);
    }, 400); // this time offset should be setable from popup as 2 or 3 breakepoint.
});

get_message_from_popup('stop_liking', () => {
    clearInterval( like_bot_data.interval );
});