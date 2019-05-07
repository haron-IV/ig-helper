const get_message_from_popup = ( message_name, function_to_do ) => {
    chrome.runtime.onMessage.addListener(
        function(request) {
            if (request.greeting == message_name) {
                function_to_do();
            }
        }
    );
};

export default get_message_from_popup;