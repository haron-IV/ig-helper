chrome.runtime.onMessage.addListener( data => {
    data.options.type = "basic";
    data.options.iconUrl = "https://www.instagram.com/static/images/ico/favicon-192.png/68d99ba29cc8.png";

    if (data.type === 'notification-unfollowing') {
        chrome.notifications.create('unfollowingNotification', data.options);
    };
});