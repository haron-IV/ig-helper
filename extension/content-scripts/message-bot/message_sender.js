import global_data from '../global_data';
import open_message from "./open_message";
import past_message_txt from "./past_message_txt";
import send_message from './send_message';

const message_sender = (message_list) => {
    let i = 0;

    global_data.message_bot_interval = setInterval(() => {
        past_message_txt();
        
        setTimeout(() => {
            send_message();
        }, 200);
        
        setTimeout(() => {
            open_message(message_list, i);
            i++;
        }, 700);

        if ( message_list.length <= i ) {
            clearInterval( global_data.message_bot_interval );
        }
        
    }, 800);
};

export default message_sender;