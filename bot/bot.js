const textarea = document.querySelector('#botTextarea');
const button = document.querySelector('#sendButton');
const showButton = document.querySelector('#showButton');
const showArea = document.querySelector('#snapchats');

const apiRoute = 'http://localhost:8080/api';

let txt;

function getSnapchats(){
    txt = textarea.value.toString;
    console.log(txt)
}

function showSnapchats(){
    axios.get(`${apiRoute}/snapchats`, {title: 'test', snapchats: txt})
    .then(function (response) {
      textarea.value = '';
    
      showArea.innerHTML = response.toString();
      console.log(response)
    })
    .catch(function (error) {
		console.log(error)
    });
}

function sendData(){

    axios.post(`${apiRoute}/snapchats`, {title: 'girl', snapchats: txt})
    .then(function (response) {
      console.log(response)
    })
    .catch(function (error) {
		console.log(error)
    });
}

button.addEventListener('click', () => {
    getSnapchats();
    sendData();
})

showButton.addEventListener('click', () => {
    showSnapchats();
})