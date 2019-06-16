import send_message_on_arrow from './send_message_on_arrow';

const usables = () => {
	window.addEventListener('keypress', (e) => {
		if (e.keyCode === 13) {
			send_message_on_arrow();
		}
	});
};

export default usables;
