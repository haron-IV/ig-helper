const update_likes = () => {
	// if (document.querySelector('.photo-gallery__photo').children[0].getAttribute('src'))
	chrome.storage.sync.get([ 'bot_stats' ], (stats) => {
		stats.bot_stats.likes++;
		chrome.storage.sync.set(stats);
	});
};

export default update_likes;
