const past_message_txt = () => {
    setInterval(() => {
        document.querySelector('.messenger-tools__input').innerText = JSON.parse( localStorage.getItem('last_message') ).last_message;    
    }, 1000);
};

export default past_message_txt;