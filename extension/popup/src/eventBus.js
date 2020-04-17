import Vue from "vue";

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

export default eventBus;