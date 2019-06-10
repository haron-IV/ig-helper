import colorLog from '../helpers/color_log';
import global_data from '../global_data';
import open_message from './open_message';
import past_message_txt from './past_message_txt';
import send_message from './send_message';
import get_conected_username from './get_conected_username';

const message_sender = (message_list) => {
	let i = 0;
	let chatter_name = null;
	// const user_name = localStorage.getItem('user_name');

	global_data.message_bot_interval = setInterval(() => {
		setTimeout(() => {
			past_message_txt(chatter_name);
		}, 200);

		if (document.querySelector('.message__content') !== null) {
			// check if message was send.
			// if (document.querySelector('.message__content').children[0].innertText !== `Hey ${user_name} ! How's your day?` || document.querySelector('.message__content').children[0].innertText !== `Hey ${user_name} ! What are you up to?`) {
			i++;
		}

		setTimeout(() => {
			send_message();
		}, 500);

		setTimeout(() => {
			open_message(message_list, i);
			chatter_name = get_conected_username(message_list, i);
		}, 800);

		if (message_list.length <= i) {
			colorLog('List of user for send message is over.', 'warning');
			clearInterval(global_data.message_bot_interval);
		}
	}, 1000);
};

export default message_sender;
