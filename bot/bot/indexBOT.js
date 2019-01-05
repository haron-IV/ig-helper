const textarea = document.querySelector('#textarea');
const buttonAdd = document.querySelector('#button-add');

function checkLocalStorage() {
    if(localStorage.getItem('Data') == null){
        initLocalStorage();
    }else{
        console.log("Data is ready")
    }
}

checkLocalStorage();

function initLocalStorage() {
    const Data = {
        snapchats: []
    }

    setTimeout(() => {
        localStorage.setItem('Data', JSON.stringify( Data ) );
        console.log("LocalStorage Data created")
    }, 1000);
}

function getData() {
    let Data = JSON.parse( localStorage.getItem('Data') );
    return Data;
}

function getSnapchats(){
    let textareaValue = textarea.value;
    return textareaValue.split(",");
}

function pushData() {
    let Data = getData();
    let textareaValue = getSnapchats();

    textareaValue.forEach(el => {
        Data.snapchats.push(el)
    });

    return Data
}

function removeDoubledSnapchats() {
    let Data = getData();
    clearData = [... new Set(Data.snapchats)]
    return clearData;
}


function sendData() {
    console.log(pushData())
    localStorage.setItem('Data', JSON.stringify( pushData() ) );
}

buttonAdd.addEventListener('click', ()=>{
    sendData();
})
