import get_user_mail from './get_user_mail';

const set_first_settings = () => {
	const user_mail = get_user_mail();
	const first_login = JSON.parse(localStorage.getItem('first_login'));

	if (localStorage.getItem('first_login') === null) {
		localStorage.setItem('first_login', JSON.stringify([ user_mail ]));
	} else {
		// FIXME: this foreach not working!

		for (let i = 0; i < first_login.length; i++) {
			if (first_login[i] !== user_mail) {
				first_login.push(user_mail);
				localStorage.setItem('first_login', JSON.stringify(first_login));

				// const data = JSON.parse(localStorage.getItem('first_login')).push(user_mail);
				// localStorage.setItem('first_login', JSON.stringify(data));
			}
		}
	}
};

export default set_first_settings;
