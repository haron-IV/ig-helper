const textarea = document.querySelector('#botTextarea');
const button = document.querySelector('#sendButton');

const apiRoute = 'http://localhost:8080/api';

let txt;

function getSnapchats(){
    txt = textarea.value;
    txt = txt.split(',');
}

function sendData(){

    axios.post(`${apiRoute}/snapchats`, {title: 'test', snapchats: txt})
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