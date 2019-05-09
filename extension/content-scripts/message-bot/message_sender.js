import global_data from '../global_data';
import open_message from "./open_message";
import past_message_txt from "./past_message_txt";

const message_sender = (message_list) => {
    // open_message(message_list, 1000); // open message on every 1000ms
    // past_message_txt();

    let i = 0;


    global_data.message_bot_interval = setInterval(() => {
        open_message(message_list, i);
        i++;
    }, 1000)
};

export default message_sender;