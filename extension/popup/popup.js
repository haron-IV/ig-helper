// import Vue from 'vue';

new Vue ({
    el: '#app',
    data: {
        test: 1
    },

    methods: {
        test1(){
            console.log("popup.js > sendClicks()");

            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {
                    console.log(response.farewell);
                });
            });
        
            console.log("avra' inviato?");
        }
    }
});












// document.querySelector ('#start').addEventListener('click', () => {
//     chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//         chrome.tabs.sendMessage(tabs[0].id, {from: 'popup', greeting: "hello"}, function(response) {
//         //   console.log(response.farewell);
//         });
//     });
// })



// function test01() {
    // console.log("popup.js > sendClicks()");

    // chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    //     chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {
    //         console.log(response.farewell);
    //     });
    // });

    // console.log("avra' inviato?");
// }

// document.querySelector('#start').addEventListener('click', () => {test01() });