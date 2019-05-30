import get_user_mail from './get_user_mail';

const set_first_settings = () => {
	const user_mail = get_user_mail();
	const first_login =
		JSON.parse(localStorage.getItem('first_login')) !== null ? JSON.parse(localStorage.getItem('first_login')) : [];

	const check_and_add_new_user = () => {
		if (first_login.length === 0) {
			localStorage.setItem('first_login', JSON.stringify([ user_mail ]));
			localStorage.setItem('first_login_status', true);
		} else {
			for (let i = 0; i < first_login.length; i++) {
				if (!first_login.includes(user_mail)) {
					first_login.push(user_mail);
					localStorage.setItem('first_login', JSON.stringify(first_login));
					localStorage.setItem('first_login_status', true);
					return;
				}
			}
		}
	};

	check_and_add_new_user();
};

export default set_first_settings;
