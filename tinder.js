const likeButton = document.querySelector('.recsGamepad__button--like');
const profile = document.querySelector('.recCard__openProfile');

let snapchats = []; //here is catched snapchat nicks

const options = ['👻', 'snap', 'Snap', 'snapchat', 'Snapchat', 'sc:', 'Sc:', 'SNAP', 'SNAPCHAT'];

let likeCounter = 0;

function showProfile(){
    setTimeout(() => {
        profile.click();
    }, 700);
    
}

function like() {
    likeButton.click();
    likeCounter++;
}

function searchSnapchat() {
    let profileBio = document.querySelector('.profileCard__bio');
    let text = '';

    if (profileBio > 1) {
        text = document.querySelector('.profileCard__bio').innerText;

        options.forEach( function (el) {

            if (text.indexOf(el) > 0) {
                let snapPosition = text.indexOf(el);
    
                snapchats.push(text.slice( snapPosition, snapPosition + 30 ));
            }
    
        } );

    }

    return console.log(snapchats)
}

function init(timeout) {
    setInterval(function() {
        showProfile();//
        searchSnapchat();
        setTimeout(like(), 1000);
    }, timeout)
}

init(3500);






///// NEW

const likeButton = document.querySelector('.recsGamepad__button--like');

likeButton.setAttribute('id', 'likeButton');

const profile = document.querySelector('.recCard__openProfile');

let profileBio;

const options = ['👻', 'snap', 'Snap', 'snapchat', 'Snapchat', 'sc:', 'Sc:', 'SNAP', 'SNAPCHAT'];

let snapchats = []; //here is catched snapchat nicks


function showProfile() {
    profile.click();

    setTimeout(() => {
        profileBio = document.querySelector('.profileCard__bio').innerText;
    }, 1000);
    
    setTimeout(() => {
        console.log(profileBio)
    }, 1000)
}

function searchSnapchat() {
    if (profileBio > 1) {
        options.forEach( function (el) {

            if (profileBio.indexOf(el) > 0) {
                let snapPosition = profileBio.indexOf(el);
    
                snapchats.push(profileBio.slice( snapPosition, snapPosition + 30 ));
            }
    
        } );

    }

    return console.log(snapchats)
}

function like(){
    document.querySelector('#likeButton').click();
}


function init(timeout) {
    setInterval(function() {
        showProfile();
        searchSnapchat();
        setTimeout(like(), 1500);
    }, timeout)
}