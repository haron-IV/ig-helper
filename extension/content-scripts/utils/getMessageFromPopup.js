const getMessageFromPopup = ( message_name, callback ) => {
    chrome.runtime.onMessage.addListener(
        function(request) {
            if (request.greeting == message_name) {
                callback(request);
            }
        }
    );
};

export default getMessageFromPopup;