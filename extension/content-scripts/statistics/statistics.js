import init_statistics from './init_statistics';
import update_likes from './update_likes';

const statistics = () => {
	init_statistics();
	update_likes();
};

export default statistics;
