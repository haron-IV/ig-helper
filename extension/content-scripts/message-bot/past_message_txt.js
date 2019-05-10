const past_message_txt = () => {
    document.querySelector('.messenger-tools__input').innerText = JSON.parse( localStorage.getItem('last_message') ).last_message;
};

export default past_message_txt;