import global_data from '../global_data';
import get_data_from_chrome from '../helpers/get_data_from_chrome';

const open_message = (message_list) => {
    let i = 0;
    
    get_data_from_chrome('last_message');

    global_data.message_bot_interval = setInterval(() => {
        message_list[i].click();
        i++;
    }, 1000);
};

export default open_message;