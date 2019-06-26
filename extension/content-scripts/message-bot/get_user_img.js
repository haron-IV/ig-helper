const get_user_img = () => {
	if (document.querySelector('.header-gallery__img')) {
		chrome.storage.sync.get([ 'message_bot' ], (data) => {
			if (data.message_bot) {
				const imgLink = document.querySelector('.header-gallery__img').getAttribute('src');
				data.message_bot.userImgs.push(imgLink);
				chrome.storage.sync.set(data);
			} else {
				chrome.storage.sync.set({ message_bot: { userImgs: [] } });
			}
		});
	}
};

export default get_user_img;
