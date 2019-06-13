import get_localStorage_data from '../helpers/local-storage/get_localStorage_data';
import set_localStorage_data from '../helpers/local-storage/set_localStorage_data';
// import wait_for_element_visible from '../helpers/wait_for_element_visible';

const update_likes = () => {
	const stats = get_localStorage_data('bot_stats');
	console.log(stats);
	stats.likes++;

	set_localStorage_data('bot_stats', stats);
};

const set_listener = () => {
	// document.querySelector('.profile-action--yes').addEventListener('click', () => {
	// 	update();
	// });
};

// const update_likes = () => {
// wait_for_element_visible('.profile-action--yes', 500, () => {
// 	set_listener();
// });
// };

export default update_likes;
