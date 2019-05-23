Vue.component('Main_header', {
	template: `
    <header class="main-header">
        <h1 @click="open_badoo" class="main-header__title" title="Clicke here to go to badoo.com">Badoo Spam Bot</h1>
        
        <nav class="navigation">
            <ul class="navigation__list">
                <li class="item">
                    <a class="link" href="./popup.html">Home</a>
                </li>
                
                <li class="item">
                    <a class="link" href="./statistics.html">Statistics 2</a>
                </li>
            </ul>
        </nav>
    </header>
    `,

	methods: {
		open_badoo() {
			chrome.tabs.create({ url: 'https://badoo.com' });
		}
	}
});

const vm = new Vue({
	el: '#app',
	data: {
		like_bot: {
			isStart: false,
			speed:
				localStorage.getItem('bot_like_speed') !== null ? parseInt(localStorage.getItem('bot_like_speed')) : 500
		},
		message_bot: {
			isStart: false,
			message: localStorage.getItem('last_message'),
			dletingIsStart: false,
			saved_messages: [],
			active_message:
				localStorage.getItem('last_message') !== null ? parseInt(localStorage.getItem('last_message')) : 1
		}
	},

	methods: {
		toggle_liking() {
			if (this.like_bot.isStart === false) {
				this.sendMessageToContentScript('start_liking');
				this.like_bot.isStart = true;
			} else {
				this.sendMessageToContentScript('stop_liking');
				this.like_bot.isStart = false;
			}
		},

		toggle_messaging() {
			if (this.message_bot.isStart === false) {
				this.sendMessageToContentScript('start_messaging');

				chrome.storage.sync.set({ last_message: this.message_bot.message });
				localStorage.setItem('last_message', this.message_bot.active_message);

				this.message_bot.isStart = true;
			} else {
				this.sendMessageToContentScript('stop_messaging');
				this.message_bot.isStart = false;
			}
		},

		toggle_deleting_messages() {
			if (this.message_bot.dletingIsStart === false) {
				this.sendMessageToContentScript('start_delete_all_old_messages');
				this.message_bot.dletingIsStart = true;
			} else {
				this.sendMessageToContentScript('stop_delete_all_old_messages');
				this.message_bot.dletingIsStart = false;
			}
		},

		sendMessageToContentScript(message_name, message_value = null) {
			chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
				chrome.tabs.sendMessage(tabs[0].id, { greeting: message_name, value: message_value });
			});
		},

		set_like_speed(speed) {
			this.like_bot.speed = speed;
			localStorage.setItem('bot_like_speed', speed);
			this.sendMessageToContentScript('set_like_speed', speed);
		},

		save_message(which_message) {
			const saved_messages = JSON.parse(localStorage.getItem('saved_messages'));
			let last_message = JSON.parse(localStorage.getItem('last_message'));

			last_message = which_message;
			saved_messages[which_message] = this.message_bot.message;

			localStorage.setItem('last_message', JSON.stringify(last_message));
			localStorage.setItem('saved_messages', JSON.stringify(saved_messages));
		},

		set_message(which) {
			switch (which) {
				case 1:
					this.message_bot.active_message = which;
					this.message_bot.message = this.message_bot.saved_messages[which - 1];
					break;

				case 2:
					this.message_bot.active_message = which;
					this.message_bot.message = this.message_bot.saved_messages[which - 1];
					break;

				case 3:
					this.message_bot.active_message = which;
					this.message_bot.message = this.message_bot.saved_messages[which - 1];
					break;
			}
		}
	},

	created() {
		const check_localStorage = () => {
			const data = [ '', '', '' ];

			if (localStorage.getItem('saved_messages') === null) {
				localStorage.setItem('saved_messages', JSON.stringify(data));
			} else {
				this.message_bot.saved_messages = JSON.parse(localStorage.getItem('saved_messages'));
			}
		};

		const set_last_message = () => {
			const data = {
				messages: JSON.parse(localStorage.getItem('saved_messages')),
				last_message: JSON.parse(localStorage.getItem('last_message')) - 1
			};

			this.message_bot.message = data.messages[data.last_message];
			this.message_bot.active_message = data.last_message + 1;
		};

		const init = () => {
			check_localStorage();
			set_last_message();
		};

		init();
	},

	mounted() {
		this.sendMessageToContentScript('update_statistics', {}); // should send obiect with stas
	}
});
