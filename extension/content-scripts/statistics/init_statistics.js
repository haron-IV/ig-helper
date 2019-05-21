const init_statistics = () => {
    if (localStorage.getItem('bot_statistics') === null ) {
        const statistics = JSON.stringify({
            likes: 0,
            messages: 0,
            delete_messages: 0,
            matches: 0,
        });

        localStorage.setItem('bot_statistics', statistics);
    }
}

export default init_statistics;