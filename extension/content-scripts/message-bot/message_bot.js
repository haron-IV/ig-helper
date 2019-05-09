import get_message_from_popup from '../helpers/get_message_from_popup';
import check_message_window from './check_message_window';

const open_message_window = () => {
    document.querySelector('.sidebar-menu__item[href="/messenger/open"]').click();
};

const message_bot = () => {

    get_message_from_popup('start_messaging', () => {
        if ( check_message_window() === false ) {
            open_message_window();
            
            setTimeout(() => {
                //here interval
            }, 2000);
        }
    });
};


export default message_bot;