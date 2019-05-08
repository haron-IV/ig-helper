const vm = new Vue ({
    el: '#app',
    data: {
        like_bot: {
            isStart: false
        }
    },

    methods: {
        toggle_liking(){
            if (this.like_bot.isStart === false){
                this.sendMessageToContentScript('start_liking', true);
            } else {
                this.sendMessageToContentScript('stop_liking', false);
            }
        },

        sendMessageToContentScript(message_name, set_value){
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                chrome.tabs.sendMessage(tabs[0].id, {greeting: message_name});
            });

            
            this.toggleValue(this.like_bot.isStart = set_value);
        },

        toggleValue( which ){
            const toggle = () => {
                which;
            };

            return toggle();
        }
    }
});