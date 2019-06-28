import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import * as firebase from 'firebase/app';

const firebaseConfig = {
	apiKey: 'AIzaSyAjQGGvmB_9r4AUxzA-_r5DCrcWP4MWEqQ',
	authDomain: 'badoo-spam-bot.firebaseapp.com',
	databaseURL: 'https://badoo-spam-bot.firebaseio.com',
	projectId: 'badoo-spam-bot',
	storageBucket: 'badoo-spam-bot.appspot.com',
	messagingSenderId: '243314857773',
	appId: '1:243314857773:web:f118d592b4f4c14f'
};

Vue.config.productionTip = false;
firebase.initializeApp(firebaseConfig);

new Vue({
	router,
	store,
	render: (h) => h(App)
}).$mount('#app');
