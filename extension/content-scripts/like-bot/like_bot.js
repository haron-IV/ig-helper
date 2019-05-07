import global_data from '../global_data';
import get_message_from_popup from '../helpers/get_message_from_popup';
import like from './like';

let data = null;

const interval = setInterval(() => {
    if ( document.querySelector('.profile-action--yes') ){
        data = global_data();
        clearInterval(interval);
    }
}, 1000);

get_message_from_popup('start_liking', () => {
    setInterval(() => {
        like(document.querySelector('.profile-action--yes'), data);
    }, 400);
});