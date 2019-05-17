Vue.component('Main_header', {
    template: `
    <header class="main-header">
        <h1>Badoo Spam Bot</h1>

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
    `
});

const vm = new Vue ({
    el: '#app',
    data: {
        like_bot: {
            isStart: false,
            speed: localStorage.getItem('bot_like_speed') !== null ? parseInt( localStorage.getItem('bot_like_speed') ) : 50 
        },
        message_bot: {
            isStart: false,
            message: localStorage.getItem('last_message'),
            dletingIsStart: false
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

        toggle_deleting_messages(){
            if (this.message_bot.dletingIsStart === false){
                this.sendMessageToContentScript('start_delete_all_old_messages');
                this.message_bot.dletingIsStart = true;
            } else {
                this.sendMessageToContentScript('stop_delete_all_old_messages');
                this.message_bot.dletingIsStart = false;
            }
        },

        sendMessageToContentScript(message_name, message_value = null){
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                chrome.tabs.sendMessage(tabs[0].id, {greeting: message_name, value: message_value});
            });
        },

        set_like_speed(speed){
            this.like_bot.speed = speed;
            localStorage.setItem('bot_like_speed', speed);
            this.sendMessageToContentScript('set_like_speed', speed);
        }
    },

    mounted(){
        this.sendMessageToContentScript('update_statistics', {}); // should send obiect with stas
    }
});