const textarea = document.querySelector('#botTextarea');
const button = document.querySelector('#sendButton');
const showButton = document.querySelector('#showButton');
const showArea = document.querySelector('#snapchats');

const apiRoute = 'http://localhost:8080/api';

let txt;

function getSnapchats(){
    txt = textarea.value.split(',');
    console.log(txt)
}

function showSnapchats(){
    axios.get(`${apiRoute}/snapchats`, {title: 'TEST-01', snapchats: txt}) // this post should send array
    .then(function (response) {
      textarea.value = '';
      
      console.log('Response:')
      console.log(response)
    
      let snapchatsArrays = [];

      response.data.data.forEach(el => {
        snapchatsArrays.push(el.snapchats)
      });

      const allSnapchatNicknames = snapchatsArrays.flatMap(e => e); // connect all inside tabs

      console.log('allSnapchatNicknames: ')
      console.log(allSnapchatNicknames)

      showArea.innerHTML = allSnapchatNicknames; //list of catched snapchat accounts (last array)
    })
    .catch(function (error) {
		console.log(error)
    });
}

function TEST_sendData(){
    //smt
}

function sendData(){

    axios.post(`${apiRoute}/snapchats`, {title: 'girl', snapchats: txt}) // txt should be array
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