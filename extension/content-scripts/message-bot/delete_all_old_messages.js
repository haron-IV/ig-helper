const get_people_to_delete = () => {

    const data = [...document.querySelectorAll('.contact-card__message')].map(function callback(currentValue){ 
        if(currentValue.innerText.substring(0, 11) !== "You matched"){ // here should be other examples
            return currentValue.parentElement.parentElement;
        }
    });

    return data.filter((value) => {
        return value !== undefined;
    });
};

const delete_message = () => {
    const int = setInterval(() => {
        if (get_people_to_delete()[0]) {
            get_people_to_delete()[0].click(); // open message for delete
        }
        
        setTimeout(() => {
            if (document.querySelector('.js-im-contact-remove')) {
                document.querySelector('.js-im-contact-remove').click(); // open deleting menu
            }
        }, 300);

        setTimeout(() => {
            if (document.querySelector('.js-im-confirm-delete')) {
                document.querySelector('.js-im-confirm-delete').click(); // confirm deleting
            }
        }, 700);


        console.log(get_people_to_delete().length);

        if ( get_people_to_delete().length < 1 ){
            console.log('end working.')
            clearInterval(int);
        } 
    }, 1200);
};

export default delete_message;