//Bot for liking profiles

const likeButton = document.querySelector('.profile-action--yes');
const dislikeButton = document.querySelector('.profile-action--no');

const options = ['👻', 'snap', 'Snap', 'snapchat', 'Snapchat', 'sc:', 'Sc:', 'SNAP', 'SNAPCHAT'];

let snapchats = []; //here is catched snapchat nicks

let likeCounter = 0;

let dislikeCounter = 0;

let interval = null;

let text = '';

let botStatus = '';

//not used

let timer = 0;
//


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
    let stats = {
        profile_likes: likeCounter,
        profile_dislikes: dislikeCounter,
        snapchats_catch: snapchats.length,
        snapchats_profiles: snapchats,
        snapchat_profiles_string: snapchats.toString()
    }

    return console.log(stats)
}

function stopBot() {
    clearInterval(interval);
    botStatus = 'Off';
    showBotStatus();
    showStats();
}

function showBotStatus(){
    return console.log(`Bot is: ${botStatus}`)
}

function showSnapchats(){
    return console.log(snapchats.toString());
}

function changeLocation(){
    document.querySelector('.sidebar-info__name').click(); // go to profile 
    document.querySelector('.js-profile-edit-block-toggle:nth-child(2)').click(); // click for select location
    document.querySelector('#location_field').value = 'Chorzów'; // set location value

    //this function reloaded page
}


function init(timeout, whatDo) {
    botStatus = 'On';
    let stopBotInterval = null;

    stopBotInterval = setInterval(function(){
        if(document.querySelector('.responsive-text') == null){
            stopBot();
            clearInterval(stopBotInterval);
        }
    }, 5000);


    interval = setInterval(function() {
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