const global_data = () => {
    return {
        options: ['👻', 'snap', 'Snap', 'snapchat', 'Snapchat', 'sc:', 'Sc:', 'SNAP', 'SNAPCHAT'],
        snapchats: [],
        likeCounter: 0,
        dislikeCounter: 0,
        message_counter: 0,
        GeneralInterval: null,
        text: '',
        botStatus: false,
        startTimerValue: [],
        deletedMessages: 0,
        initCounter: 0,
        updateCalendarCounter: 0,

        like_button: document.querySelector('.profile-action--yes')
    }
};

export default global_data;