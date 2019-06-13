const vm_statistics = new Vue({
	el: '#statistics',
	data: {
		test: ''
	},

	methods: {},

	created() {
		alert(JSON.parse(localStorage.getItem('bot_stats')));
	},

	mounted() {}
});
