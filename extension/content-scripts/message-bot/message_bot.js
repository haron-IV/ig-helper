import get_message_from_popup from '../helpers/get_message_from_popup';
import check_message_window from './check_message_window';
import get_people_to_message from './get_people_to_message';
import message_sender from './message_sender';
import stop_message_bot from './stop_message_bot';
import delete_all_old_messages from './delete_all_old_messages';
import save_user_name from './save_user_name';
import global_data from '../global_data';


let people_to_message; // node list with single message

const open_message_window = () => {
    document.querySelector('.sidebar-menu__item[href="/messenger/open"]').click();
};

const message_bot = () => {
    get_message_from_popup('start_messaging', () => {
        
        save_user_name();
        
        if ( check_message_window() === false ) {
            open_message_window();

            setTimeout(() => {
                people_to_message = get_people_to_message();
                message_sender(people_to_message);
            }, 2000);
        }
    });

    get_message_from_popup('stop_messaging', () => {
        stop_message_bot();
    });

    get_message_from_popup('start_delete_all_old_messages', () => {
        delete_all_old_messages();
    });

    get_message_from_popup('stop_delete_all_old_messages', () => {
        clearInterval(global_data.deleting_message_bot_interval);
    });
};

export default message_bot;