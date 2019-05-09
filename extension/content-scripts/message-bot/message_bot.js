import get_message_from_popup from '../helpers/get_message_from_popup';
import check_message_window from './check_message_window';
import get_peoples_to_message from './get_peoples_to_message';
import open_message from './open_message';

let peoples_to_message; // node list with single message

const open_message_window = () => {
    document.querySelector('.sidebar-menu__item[href="/messenger/open"]').click();
};

const message_bot = () => {
    get_message_from_popup('start_messaging', () => {
        if ( check_message_window() === false ) {
            open_message_window();

            setTimeout(() => {
                peoples_to_message = get_peoples_to_message();
                console.log(peoples_to_message)
                // open_message(peoples_to_message);
            }, 2000);
        }
    });
};


export default message_bot;