// import {test1} from "/Users/mabbyn/Desktop/workspace/self/tinder_badoo_bots/bot/test.js";


const likeButton = document.querySelector('.profile-action--yes');
const dislikeButton = document.querySelector('.profile-action--no');

const options = ['👻', 'snap', 'Snap', 'snapchat', 'Snapchat', 'sc:', 'Sc:', 'SNAP', 'SNAPCHAT'];

let snapchats = []; //here is catched snapchat nicks

let likeCounter = 0;

let dislikeCounter = 0;

let message_counter = 0;

let GeneralInterval = null;

let text = '';

let botStatus = '';

let startTimerValue = [];

let deletedMessages = 0;


/////////////////////////////////////////////

function colorLog(txt, way){
    if(way == 'warning'){
        console.log(`%c ${txt}`, 'background: red; color: black')
    }

    if(way == 'tip'){
        console.log(`%c ${txt}`, 'background: gold; color: black')
    }

    if(way == 'info'){
        console.log(`%c ${txt}`, 'background: green; color: white')
    }

    if(way == 'test'){
        console.log(`%c ${txt}`, 'background: yellow; color: green')
    }
}

function timer(){

    let startDate = new Date();
    let startTime = [startDate.getHours(), startDate.getMinutes(), startDate.getSeconds()]

    startTimerValue = startTime;
}


function like() {
    likeButton.click();
    likeCounter++;
}

function dislike() {
    dislikeButton.click();
    dislikeCounter++;
}

function searchSnapchat() {
    text = document.querySelector('.responsive-text').innerText;

    options.forEach( function (el) {

        if (text.indexOf(el) > 0) {
            let snapPosition = text.indexOf(el);

            snapchats.push(text.slice( snapPosition, snapPosition + 30 ));
        }

    } );
}

function removeDuplicatedSnapchats(){
    let cleared = [...new Set(snapchats)]

    return cleared;
}

let stats;
function showStats(){
    let endDate = new Date();
    let endTime = [endDate.getHours(), endDate.getMinutes(), endDate.getSeconds()]

    
    stats = {
        profile_likes: likeCounter,
        profile_dislikes: dislikeCounter,
        snapchats_catch: snapchats.length,
        snapchats_profiles: removeDuplicatedSnapchats(),
        snapchat_profiles_string: removeDuplicatedSnapchats().toString(),
        sned_messages: message_counter,
        timer: `${endTime[0] - startTimerValue[0]}:${endTime[1] - startTimerValue[1]}:${endTime[2] - startTimerValue[2]}`,
        deleted_messages: deletedMessages
    }

    return console.table(stats)
}

////////////////////////////////
function goToProfile(){
    document.querySelector('.sidebar-info__name').click(); //go to prfole section
    return document.querySelector('.sidebar-info__name').innerHTML;
}

function getRestProfileInfoData(){
    let restProfileInfo = {
        localization: document.querySelector('.js-location-label').innerText,
        age_range: document.querySelectorAll('.profile-section__content')[3].innerText.split('wieku')[1],
        profile_description: document.querySelectorAll('.profile-section__content')[5].children[0].children[0].innerText.trim()
    }
    return restProfileInfo;
}

function setProfileInfoData(){
    let profileInfo = {
        profile_name: goToProfile(),
        localization: getRestProfileInfoData().localization,
        age_range: getRestProfileInfoData().age_range,
        profile_description: getRestProfileInfoData().profile_description
    }

    return JSON.stringify( profileInfo );
}

function updateProfileInfoData(timeout){ //timeout 3000 ms down in code
    goToProfile();

    let localStorageCheck = checkGlobalStats('ProfileInfo');

    if(localStorageCheck == true){
        colorLog('Profile info was corretly created.', 'info');

        setTimeout(() => {
            localStorage.setItem('ProfileInfo', setProfileInfoData());
            colorLog('Profile info updated!', 'info');
            showProfileInfo();
            goToEncounters();
        }, timeout);
    }else{
        setTimeout(() => {
            localStorage.setItem('ProfileInfo', setProfileInfoData());
            colorLog('Profile info updated!', 'info');
            showProfileInfo();
            goToEncounters();
        }, timeout);
    }
}

function showProfileInfo(){
    colorLog('Profile Info:', 'info');
    console.table( JSON.parse( localStorage.getItem('ProfileInfo') ) );
}

function goToEncounters(){
    document.querySelector('.sidebar-menu__item[href="/encounters"]').click();
}

////////////////////////////////

/////////////////////////////////////////// GLOBAL STATS FUNCTIONS
function checkGlobalStats(dataName){
    if ( localStorage.getItem(dataName) == null ){
        return false;
    } else {
        return true;
    }
}

function initGlobalStats(){
    if( checkGlobalStats('GlobalDataBot') == false ){
        let stats = {
            profile_likes: 0,
            profile_dislikes: 0,
            snapchats_catch: 0,
            snapchats_profiles: 0,
            snapchat_profiles_string: '',
            sned_messages: 0,
            deleted_messages: 0
        }

        localStorage.setItem('GlobalDataBot', JSON.stringify(stats) );
        colorLog('Bot init global data instance in browser local sotrage.', 'info');
    }
}

function updateGlobalStats(){
    let storage = JSON.parse( localStorage.getItem('GlobalDataBot') );

    let snapchatsCheck = snapchats.length;
    if( snapchatsCheck > 0 ){
        snapchatsCheck = snapchats.length;
    }else{
        snapchatsCheck = 0;
    }

    let stats = {
        profile_likes: storage.profile_likes + likeCounter,
        profile_dislikes: storage.profile_dislikes + dislikeCounter,
        snapchats_catch: storage.snapchats_catch + snapchatsCheck,
        sendMessage: storage.sendMessage + message_counter,
        deleted_messages: storage.deleted_messages + deletedMessages
    }

    localStorage.setItem('GlobalDataBot', JSON.stringify(stats) );
}

function showGlobalStats(){
    colorLog('Global Stats: ', 'info')
    console.table(JSON.parse( localStorage.getItem('GlobalDataBot') ) );
}

let secureUpdateCounter = 0;
function secureUpdateGlobalData() {
    if (secureUpdateCounter == 0 ){
        updateGlobalStats();
        colorLog('Global data is updated.', 'info')
    }
    secureUpdateCounter++;

    setTimeout(() => {
        secureUpdateCounter = 0;
    }, 5000);
}

function clearGlobalData(){
    localStorage.removeItem('GlobalDataBot')
}
///////////////////////////////////////////

function stopBot(message) {
    clearInterval(generalInterval);
    botStatus = 'Off';
    showBotStatus();
    showStats();
    secureUpdateGlobalData();

    if(message == true){
        sendMessage = true;
        colorLog('send message', 'test')
        console.log(sendMessage)
    }

    if(messagingFunc == true && snedMessageNow == true){
        startMessaging();
    }
   
}

function showBotStatus(){
    return colorLog(`Bot is: ${botStatus}`, 'info')
}

function showSnapchats(){
    return console.log(snapchats.toString());
}

let snedMessageNow = true; // this variable let us off messaging when bot change likes to dislikes

function changeFromLikeToDislike(){
    snedMessageNow = false;

    let dodajGłosyButton = document.querySelectorAll('.btn__text')[1];

    if(dodajGłosyButton != null){
        if(dodajGłosyButton.innerText == "Dodaj głosy"){
            stopBot();
            clearInterval(stopBotInterval);
    
            setTimeout(() => {
                document.querySelector('.js-ovl-close').click();
                changedToDislike = true;
                colorLog('Bot auto change action from liking profiles to dislike', 'info');
            }, 1000);
    
            init(timeoutForChangeLikeFunction, dislike);
            snedMessageNow = true;
        }
    }
   
}

//////////// function for messaging to new people

let newConectedPeople = []; // peoples with no message from you
function getNewConectedPeoples(){
    const openMessagerButton = document.querySelector('a[href="/messenger/open"]');

    openMessagerButton.click();

    setTimeout(() => {
        document.querySelectorAll('.contacts__msg').forEach(el => {
            if(el.innerText.substring(0, 22) == "Zostaliście dopasowani"){
                newConectedPeople.push(el.parentElement.parentElement.id);
            }
        })

        colorLog("Don't close messenger window. Bot autoclose this after send messages.", 'warning')
    }, 3000);
}

function sendMessage(message){
    let sendMessageInterval = null;
    let count = 0;

    sendMessageInterval = setInterval(() => {

        if(document.querySelector(`#${newConectedPeople[0]}`)){
            document.querySelector(`#${newConectedPeople[count]}`).children[2].click();
        }else{
            clearInterval(sendMessageInterval);
            colorLog('stop messaging click', 'test')
        }

        count++;

        setTimeout(() => {
            document.querySelector('.messenger-tools__input').innerText = message;
        }, 1000);
        

        setTimeout(() => {
            document.querySelector('.messenger-tools__btn').click();
            message_counter++;
        }, 1500);
        
        if(count == newConectedPeople.length){
            clearInterval(sendMessageInterval);
            colorLog('Messaging is stopped', 'info')
            secureUpdateGlobalData();

            setTimeout(()=>{ // close messenger
                document.querySelector('.im-close').click()
            }, 2000)
        }
    }, 3500);
    
}

function startMessaging(){
    getNewConectedPeoples();
    setTimeout(() => {
        sendMessage(messageText);
    }, 5000);
}


/////////// end function for messaging to new people


/////////// function for deleting all messages

function deleteAllMessages(){
    let int = null;
    colorLog("Don't close messenger window when bot deleting.", 'warning');

    int = setInterval(()=>{
        if(document.querySelector('.js-im-contact-remove')){
            document.querySelector('.js-im-contact-remove').click(); //click remove

            setTimeout(()=>{
                if(document.querySelector('.js-im-confirm-delete')){
                    document.querySelector('.js-im-confirm-delete').click(); // confirm remove
                    deletedMessages++;
                }
                
            }, 1000)
        }else{
            clearInterval(int);
            colorLog('All messages deleted', 'info')
            colorLog(`Deleted messages: ${deletedMessages}`, 'info')
            secureUpdateGlobalData();
        }
    }, 1000)
    
}

//////////


///////// function for deleting old messages
let oldMessagesToRemove = [];

function getOldMessages() {
    const openMessagerButton = document.querySelector('a[href="/messenger/open"]');

    openMessagerButton.click();

    setTimeout(() => {
        document.querySelectorAll('.contacts__msg').forEach(el => {
            if(el.innerText.substring(0, 22) != "Zostaliście dopasowani"){
                oldMessagesToRemove.push(el.parentElement.parentElement.id);
            }
        });
    }, 1500);
}

function removeOldMessages() {
    let removeOldMessagesInterval = null;
    let counter = 1;

    colorLog("Don't close messenger window. Bot autoclose this after send messages.", 'warning')

    removeOldMessagesInterval = setInterval(()=>{

        if(counter < oldMessagesToRemove.length ){

            if ( oldMessagesToRemove[counter] != 'js-notification-empty' ){
                document.querySelector('#'+oldMessagesToRemove[counter]).children[2].click();
            }

        }

        if(document.querySelector('.js-im-contact-remove')){
            document.querySelector('.js-im-contact-remove').click(); //click remove

            setTimeout(()=>{
                if(document.querySelector('.js-im-confirm-delete')){
                    document.querySelector('.js-im-confirm-delete').click(); // confirm remove
                    counter++;
                    deletedMessages++;
                }
                
            }, 1000)
        }
        if(oldMessagesToRemove.length <= counter){
            clearInterval(removeOldMessagesInterval);
            colorLog('All old messages deleted', 'info')
            secureUpdateGlobalData();
        }
        
    }, 1500)
}

function deleteAllOldMessages(){
    getOldMessages();

    setTimeout(() => {
        removeOldMessages();
    }, 2500);
}

/////////


////////////////////////////// function for messaging to visitors

function getIntoVisitors(){
    const openVisitorsButton = document.querySelector('a[href="/visitors"]');
    openVisitorsButton.click();
}

function pasteMessageToChat(message){
    document.querySelector('.messenger-tools__input').innerText = message;
}

function sendMessageToVisitor(){
    document.querySelector('.messenger-tools__btn').click();
}

let visitors = [];
function getNewVisitors(){
	let visitorsList = document.querySelectorAll('.users-list__cell');	
	
	visitorsList.forEach(el => {
		if(el.children[0].children[2].children[1].innerText.trim() != "Użytkownik niewidoczny"){
            visitors.push(el);
        }
	})
   
}

function startMessagingToVisitors(){
    let sendMessageInterval = null;
    let count = 0;

    sendMessageInterval = setInterval(() => {

        visitors[count].children[0].children[2].children[0].children[0].children[0].children[0].click();

        count++;

        setTimeout(() => {
            pasteMessageToChat(messageText);
        }, 500);
        

        setTimeout(() => {
            sendMessageToVisitor();
            message_counter++;
        }, 1500);
        

        if(count == visitors.length){
            clearInterval(sendMessageInterval);
            document.querySelectorAll('.pagination__nav')[2].children[0].click(); //go to next visitor page

            // setTimeout(() => { //start sending to users from next page
            //     messagingToVisitorsInit();
            // }, 2500);

            colorLog('Messaging to visitors is stopped', 'test')
        }
    }, 3500);
}

function messagingToVisitors(){
    // getIntoVisitors();  //add this in better way

    setTimeout(() => {
        getNewVisitors();
    }, 2000);
    
    setTimeout(() => {
        startMessagingToVisitors();    
    }, 5000);
    
}

////////////////////////////////


//////////////////////////////// function to create show and hide bot dock

function createDock(){
    const BOTdock = document.createElement('div');
    BOTdock.classList.add('dock');
    BOTdock.style.width = "100vw";
    BOTdock.style.height = "100vh";
    BOTdock.style.backgroundColor = "white";
    BOTdock.style.zIndex = '99999';
    BOTdock.style.position = "absolute";
    BOTdock.style.top = "0";

    document.querySelector('body').appendChild(BOTdock);

    stats.snapchats_profiles.forEach( (el, i) =>{
        const BOTstats = document.createElement('div');
        BOTstats.classList.add('stats');

        BOTstats.innerText = el;
        BOTdock.appendChild(bott);
    })
    
}

function hideDock(){
    document.querySelector('.dock').style.display = 'none'
}

function showDock(){
    document.querySelector('.dock').style.display = 'block'
}

////////////////////////////////

///////////////////////////////Function for set timer after this bot will be stoped

function stopBotTimer(timeout){//'1h22m'
    // let example = '1h22m';
    let timer = 0;

    if(timeout.indexOf('h') >= 1 ){
        console.log(timeout.split('h')[0] )

        if(JSON.parse( timeout.split('h')[0] ) > 1){
            let hours = JSON.parse( timeout.split('h')[0] );
        }else{
            let hours = 0;
        }

        if(JSON.parse( timeout.split('h')[1].split('m')[0] ) > 1){
            let minutes = JSON.parse( timeout.split('h')[1].split('m')[0] );
        }else{
            minutes = 0;
        }
        
        console.log(`hours: ${hours}`)
        setTimeout(() => {
            let minutesMS = minutes*60*1000;
            let hoursMS = hours*60*60*1000;
            timer = hours+minutesMS;
        }, 200);
        
    }
    setTimeout(() => {
        console.log('end');
    }, timer);
}
//maybe next time hahahah


//////////////////////////////// 


function stopClock(howMuch){
    let stopClockInterval = null;

    stopClockInterval = setInterval(() => {
        let stop = dislikeCounter + likeCounter;
        //console.log(stop); // after clear interval console log alive, try to fix this

        if( stop >= howMuch){
            colorLog('Bot stopped after get over set value', 'info');
            stopBot();
            updateProfileInfoData(3000);
            clearInterval(stopClockInterval);
        }
    }, 1000);
    
}


function playSound(){
    var audio = new Audio('/Users/mabbyn/Desktop/workspace/self/tinder badoo bots/bot/plucky.mp3');
    audio.play()
}

///////////////////////////////


let stopBotInterval = null;
let changedToDislike = false;

let timeoutForChangeLikeFunction = 0; // this variable let us use the same time after change from liking to disliking

let messagingFunc = false;
let messageText = ''; // this message will be sending after stop bot

function init(timeout, whatDo, message, messageTxt, stopCounter) {
    botStatus = 'On';
    timeoutForChangeLikeFunction = timeout;
    timer();
    stopClock(stopCounter);

    initGlobalStats();

    stopBotInterval = setInterval(function(){
        if(document.querySelector('.responsive-text') == null){
            stopBot();
            clearInterval(stopBotInterval);
        }

        if(changedToDislike === false){
            changeFromLikeToDislike();
        }
        
    }, 5000);

    if(message == true){
        messagingFunc = true;
        messageText = messageTxt; 
    }

    generalInterval = setInterval(function() {
        searchSnapchat();
        setTimeout(whatDo, 500);
    }, timeout)
}

// init(500, like, false, '', 1500);




// documentation \\
/*

1.
***************************************************************************
init (time, whatDo, message)

time - time space between bot actions in ms fe. 1500
whatDo - action which bot do like or dislike
message - bot after stop automatic start sending message to new people (set false if u don't need this)
example: init(1500, like, true)
***************************************************************************

2.
***************************************************************************
stopBot()

this command stops the bot and show us: bot status, and bot stats
***************************************************************************

3.
***************************************************************************
showSnapchats()

this commantd show us array with catched snapchats nicknames
***************************************************************************

4.
***************************************************************************
showBotStatus()

this command show us bot status :)
***************************************************************************

5.
***************************************************************************
showStats()

Show us all bot statistics
***************************************************************************

6.
***************************************************************************
startMessaging()

If u only want to send message u can use this command
if u dont pass message text in init function u can set this via -> messageText = 'your message' <- this must be declared before use commadn
***************************************************************************

7.
***************************************************************************
deleteAllMessages()

This command run function which will be deleting all messages
***************************************************************************

8.
***************************************************************************
messagingToVisitors()

This command run function which will be messaging to visitors.
Message which will be sending is message used in global init function.
Function after sending messages automatic change visitor's page to next page.
After messaging you must refresh page and run bot.
***************************************************************************

9.
***************************************************************************
showGlobalStats() 

Command which show us global stats.
Global stats are auto updated after end all actions.
If u wanna update statsmanually u can type secureUpdateGlobalData()

Global stats are in localStorage, if u open bot in incognito they will be deleting 
after close the browser
***************************************************************************

10.
***************************************************************************
showProfileInfo() 

Show our profile information in console.
***************************************************************************
*/