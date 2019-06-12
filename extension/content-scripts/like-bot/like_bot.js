import global_data from '../global_data';
import get_message_from_popup from '../helpers/get_message_from_popup';
import DOM_listener from '../helpers/DOM_listener';
import like from './like';

let data = null;
const like_bot_data = {
	interval: null
};

const interval = setInterval(() => {
	if (document.querySelector('.profile-action--yes')) {
		data = global_data();
		clearInterval(interval);
	}
}, 1000);

get_message_from_popup('start_liking', () => {
	let timeout = parseInt(localStorage.getItem('bot_like_speed'));

	switch (timeout) {
		case 25:
			timeout = 1000;
			break;

		case 50:
			timeout = 500;
			break;

		case 100:
			timeout = 200;
			break;
	}

	like_bot_data.interval = setInterval(() => {
		like(document.querySelector('.profile-action--yes'), data);

		DOM_listener('body', undefined, (mutation) => {
			if (mutation.target.classList[0] === 'body' && mutation.addedNodes[0].classList[0] === 'ovl') {
				console.log(mutation);
				console.log('chuja!');
			}
		});
	}, timeout);
});

get_message_from_popup('stop_liking', () => {
	clearInterval(like_bot_data.interval);
});

get_message_from_popup('set_like_speed', (request) => {
	localStorage.setItem('bot_like_speed', request.value);
});
