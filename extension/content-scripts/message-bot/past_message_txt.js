const past_message_txt = (chatter_name = '') => {
	if (document.querySelector('.messenger-tools__input') && document.querySelector('.message__content') === null) {
		if (
			document.querySelector('.messenger-tools__input') &&
			document.querySelector('.message__content') === null &&
			chatter_name !== ''
		) {
			const msg = JSON.parse(localStorage.getItem('last_message')).last_message;

			const splited = msg.split('{name}');

			const msg_with_name = `${splited[0]} ${chatter_name} ${splited[1]}`;
			console.log(msg_with_name);
			document.querySelector('.messenger-tools__input').innerText = msg_with_name;
		} else {
			document.querySelector('.messenger-tools__input').innerText = JSON.parse(
				localStorage.getItem('last_message')
			).last_message;
		}
	}
};

export default past_message_txt;
