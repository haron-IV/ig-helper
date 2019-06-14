import get_localStorage_data from '../helpers/local-storage/get_localStorage_data';
import set_localStorage_data from '../helpers/local-storage/set_localStorage_data';

const update_likes = () => {
	chrome.storage.sync.get([ 'bot_stats' ], (stats) => {
		stats.likes++;
		chrome.storage.sync.set(stats);
	});
};

export default update_likes;
