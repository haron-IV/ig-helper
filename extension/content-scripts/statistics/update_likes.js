const update_likes = () => {
	chrome.storage.sync.get([ 'bot_stats' ], (stats) => {
		stats.bot_stats.likes++;
		console.log(stats);
		chrome.storage.sync.set(stats);
	});
};

export default update_likes;
