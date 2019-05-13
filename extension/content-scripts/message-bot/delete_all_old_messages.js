import global_data from '../global_data';

const get_people_to_delete = () => {

    const data = [...document.querySelectorAll('.contact-card__message')].map(function callback(currentValue){ 
        if(currentValue.innerText.substring(0, 11) !== "You matched" && !currentValue.parentElement.parentElement.children[2].classList.contains('is-active')){ // here should be other examples
            return currentValue.parentElement.parentElement;
        }
    });

    return data.filter((value) => {
        return value !== undefined;
    });
};

const delete_all_old_messages = () => {
    
        global_data.deleting_message_bot_interval = setInterval(() => {
        if ( get_people_to_delete()[0] && document.querySelector('.js-im-contact-remove') ) {
            get_people_to_delete()[0].click(); // open message for delete

            setTimeout(() => {
                document.querySelector('.js-im-contact-remove').click(); // open deleting menu
            }, 300);
        }

        setTimeout(() => {
            if (document.querySelector('.js-im-confirm-delete')) {
                document.querySelector('.js-im-confirm-delete').click(); // confirm deleting
            }
        }, 700);

        if ( get_people_to_delete().length < 1 ){
            clearInterval(global_data.deleting_message_bot_interval);
        } 
    }, 1200);
};

export default delete_all_old_messages;