import global_data from '../global_data';

const open_message = (message_list) => {
    let i = 0;

    global_data.message_bot_interval = setInterval(() => {
        message_list[i].click();
        i++;
    }, 1000);
};

export default open_message;