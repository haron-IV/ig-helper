import Vue from 'vue';
import App from './App.vue';
import store from './store/index';

export const eventBus = new Vue({
	methods: {
		sendMessageToContentScript(message_name, message_value = null) {
			chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
				chrome.tabs.sendMessage(tabs[0].id, {
					greeting: message_name,
					value: message_value
				});
			});
		}
	}
});

new Vue({
	el: '#app',
	render: (h) => h(App),
	store
});
