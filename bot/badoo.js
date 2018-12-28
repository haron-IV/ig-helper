
const likeButton = document.querySelector('.profile-action--yes');
const dislikeButton = document.querySelector('.profile-action--no');

const options = ['👻', 'snap', 'Snap', 'snapchat', 'Snapchat', 'sc:', 'Sc:', 'SNAP', 'SNAPCHAT'];

let snapchats = []; //here is catched snapchat nicks

let likeCounter = 0;

let dislikeCounter = 0;

let GeneralInterval = null;

let text = '';

let botStatus = '';

let startTimerValue = [];


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

function showStats(){
    let endDate = new Date();
    let endTime = [endDate.getHours(), endDate.getMinutes(), endDate.getSeconds()]

    
    let stats = {
        profile_likes: likeCounter,
        profile_dislikes: dislikeCounter,
        snapchats_catch: snapchats.length,
        snapchats_profiles: snapchats,
        snapchat_profiles_string: snapchats.toString(),
        timer: `${endTime[0] - startTimerValue[0]}:${endTime[1] - startTimerValue[1]}:${endTime[2] - startTimerValue[2]}`
    }

    return console.log(stats)
}

function stopBot() {
    clearInterval(generalInterval);
    botStatus = 'Off';
    showBotStatus();
    showStats();
}

function showBotStatus(){
    return colorLog(`Bot is: ${botStatus}`, 'info')
}

function showSnapchats(){
    return console.log(snapchats.toString());
}

function changeFromLikeToDislike(){

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
        }
    }
   
}

//////////// function for messaging

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

        console.log(newConectedPeople)
    }, 3000);
}

function sendMessage(message){
    let sendMessageInterval = null;
    let count = 0;

    sendMessageInterval = setInterval(() => {
        document.querySelector(`#${newConectedPeople[count]}`).children[2].click(); //open chat
        count++;

        setTimeout(() => {
            document.querySelector('.messenger-tools__input').innerText = message;
        }, 500);
        

        setTimeout(() => {
            document.querySelector('.messenger-tools__btn').click();
        }, 1500);
        

        console.log(document.querySelector(`#${newConectedPeople[count]}`));
        if(count == newConectedPeople.length){
            clearInterval(sendMessageInterval);
            colorLog('stop messaging click', 'test')
        }
    }, 3500);
    
}

function startMessaging(){
    getNewConectedPeoples();
    setTimeout(() => {
        sendMessage('Hejka. Jeśli masz insta odezwij się do mnie, poniewaz organizuję konkurs :D');
    }, 5000);
}

startMessaging();




///////////


let stopBotInterval = null;
let changedToDislike = false;

let timeoutForChangeLikeFunction = 0; // this variable let us use the same time after change from liking to disliking

function init(timeout, whatDo) {
    botStatus = 'On';
    timeoutForChangeLikeFunction = timeout;
    timer();

    stopBotInterval = setInterval(function(){
        if(document.querySelector('.responsive-text') == null){
            stopBot();
            clearInterval(stopBotInterval);
        }

        if(changedToDislike === false){
            changeFromLikeToDislike();
        }
        
    }, 5000);


    generalInterval = setInterval(function() {
        searchSnapchat();
        setTimeout(whatDo, 500);
    }, timeout)
}

init(1500, dislike);




// documentation \\
/*

1.
***************************************************************************
init (time, whatDo)

time - time space between bot actions in ms fe. 1500
whatDo - action which bot do like or dislike 
example: init(1500, like)
***************************************************************************

2.
***************************************************************************
stopBot()

this commant stops the bot and show us: bot status, and bot stats
***************************************************************************

3.
***************************************************************************
showSnapchats()

this commant show us array with catched snapchats nicknames
***************************************************************************

4.
***************************************************************************
showBotStatus()

this command show us bot status :)
***************************************************************************

5.
***************************************************************************


***************************************************************************





*/