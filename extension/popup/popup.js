// import Vue from 'vue';

new Vue ({
    el: '#app',
    data: {
        test: 1
    },

    methods: {
        sendMessageToContentScript(message_name){
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                chrome.tabs.sendMessage(tabs[0].id, {greeting: message_name});
            });
        }
    }
});