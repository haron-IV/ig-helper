// import global_data from '../global_data';
import get_data_from_chrome from '../helpers/get_data_from_chrome';

const open_message = (message_list, index) => {

    
    get_data_from_chrome('last_message');

    // global_data.message_bot_interval = setInterval(() => {
        message_list[index].click();
        // i++;

        if ( message_list.length <= index ) {
            // clearInterval( global_data.message_bot_interval );
        }
    // }, timeout);
};

export default open_message;