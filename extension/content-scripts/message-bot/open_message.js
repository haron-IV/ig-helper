const open_message = (message_list) => {
    let i = 0;

    setInterval(() => {
        message_list[i].click();
        i++;
    }, 1000);
};

export default open_message;