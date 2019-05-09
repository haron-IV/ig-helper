const get_people_to_message = () => {

    const data = [...document.querySelectorAll('.contact-card__message')].map(function callback(currentValue){ 
        if(currentValue.innerText.substring(0, 11) === "You matched"){ // here should be other examples
            return currentValue.parentElement.parentElement;
        }
    });

    return data.filter((value) => {
        return value !== undefined
    });
};

export default get_people_to_message;