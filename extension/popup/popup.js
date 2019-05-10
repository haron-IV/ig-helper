const vm = new Vue ({
    el: '#app',
    data: {
        like_bot: {
            isStart: false
        },
        message_bot: {
            isStart: false,
            message: localStorage.getItem('last_message')
        }
    },

    methods: {
        toggle_liking(){
            if (this.like_bot.isStart === false){
                this.sendMessageToContentScript('start_liking');
                this.like_bot.isStart = true;
            } else {
                this.sendMessageToContentScript('stop_liking');
                this.like_bot.isStart = false;
            }
        },

        toggle_messaging(){
            if (this.message_bot.isStart === false){
                this.sendMessageToContentScript('start_messaging');

                chrome.storage.sync.set({'last_message': this.message_bot.message});
                localStorage.setItem('last_message', this.message_bot.message);

                this.message_bot.isStart = true;
            } else {
                this.sendMessageToContentScript('stop_messaging');
                this.message_bot.isStart = false;
            }
        },

        sendMessageToContentScript(message_name){
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                chrome.tabs.sendMessage(tabs[0].id, {greeting: message_name});
            });
        }
    },

    mounted(){
        // this.message_bot.message = localStorage.getItem('last_message');
    }
});