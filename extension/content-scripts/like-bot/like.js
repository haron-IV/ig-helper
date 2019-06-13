import update_likes from '../statistics/update_likes';

const like = (like_button, data) => {
	like_button.click();
	data.likeCounter++;
	update_likes(); // update likes in stats (local storage)
};

export default like;
