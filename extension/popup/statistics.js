const vm_statistics = new Vue({
	el: '#statistics',
	data: {
		stats: null
	},

	methods: {
		removeUnderscore(item_name) {
			return item_name.replace(/_/g, ' ');
		},

		numberWithComma(number) {
			return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
		}
	},

	created() {
		const vm = this;
		chrome.storage.sync.get([ 'bot_stats' ], (stats) => {
			// stats = {bot_stats: {here are all stats}}
			vm.stats = stats;
		});
	},

	mounted() {}
});
