const textarea = document.querySelector('#textarea');
const buttonAdd = document.querySelector('#button-add');
const buttonShowSnapchats = document.querySelector('#button-show-snapchats');
const showMarkedSnapchatList = document.querySelector('#button-show-marked-snapchats');
const list = document.querySelector('#list');
const makedList = document.querySelector('#list-marked');

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
    textareaValue = textareaValue.split(",");

    return removeDoubledSnapchats(textareaValue);
}

// function pushData() {
//     let Data = getData();
//     let textareaValue = getSnapchats();

//     textareaValue.forEach(el => {
//         Data.snapchats.push(el)
//     });

//     return Data
// }

function removeDoubledSnapchats(data) {
    clearData = [... new Set(data)];
    return clearData;
}

function checkDoubledBeforeSend(){
    let Data = getData();
    let dataToPush = getSnapchats();

    console.log("DATA: ")
    console.log(Data)

    if (dataToPush.length > 0){
        dataToPush.forEach(el=>{
            Data.snapchats.push(el)
        });
    }

    clearedData = [... new Set(Data.snapchats)]

    Data.snapchats = clearedData;

    return Data;
}

function sendData() {
    if( getSnapchats() == ''){
        console.log("Can't add empty array");
    }else{
        localStorage.setItem('Data', JSON.stringify( checkDoubledBeforeSend() ) );
    }
    
}

buttonAdd.addEventListener('click', ()=>{
    sendData();
})

let buttonCounter = false;
buttonShowSnapchats.addEventListener('click', ()=>{
    if (buttonCounter == false){
        showSnapchatsList();
        buttonCounter = true;
    }
})

function showSnapchatsList(){
    const Data = getData();
    filteredData = [... new Set(Data.snapchats) ]

    filteredData.forEach(el=>{
        const li = document.createElement('li');
        const marked = document.createElement('button');
        marked.classList.add('not-marked');

        li.classList.add('list__item');
        li.innerText = el;

        list.appendChild(li);
        li.appendChild(marked);
    })

    setTimeout(() => {
        markSnapListPosition();
        compareArrays();
    }, 1000);
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

let markedSnapchats = [];
function markSnapListPosition(){
    const snapList = document.querySelectorAll('.not-marked');

    snapList.forEach(el =>{
        el.addEventListener('click', ()=>{
            let selected_name = el.parentElement.innerText;
            console.log(selected_name)
            el.classList.add('marked');
            markedSnapchats.push(selected_name);
            addMarkedSnapchatsToData();
        })
    })
}

function checkLocalStorageMarkedSnapchats(){
    let Data = {
        snapchats: []
    }

    if(localStorage.getItem('markedData') == null){
        localStorage.setItem('markedData', JSON.stringify( Data ) );
    }else{
        console.log('Marked data was created :)')
    }
}

checkLocalStorageMarkedSnapchats();


function addMarkedSnapchatsToData(){
    let Data = JSON.parse( localStorage.getItem('markedData') );
    markedSnapchats.forEach(el=>{
        Data.snapchats.push(el)
    })

    cleared = [... new Set(Data.snapchats)]

    Data.snapchats = cleared;

    localStorage.setItem('markedData', JSON.stringify(Data))
}


function showMarked(){
    const Data = JSON.parse( localStorage.getItem('markedData') );
    filteredData = [... new Set(Data.snapchats) ]

    filteredData.forEach(el=>{
        const li = document.createElement('li');

        li.classList.add('list__item');
        li.innerText = el;

        makedList.appendChild(li);
    });
}

let button2counter = false;
showMarkedSnapchatList.addEventListener('click', ()=>{
    if (button2counter == false){
        showMarked();
        button2counter = true;
    }
})


function compareArrays(){
    const Data = JSON.parse( localStorage.getItem('Data') );
    const markedData = JSON.parse( localStorage.getItem('markedData') );
    const test = document.querySelector('.list');


    markedData.snapchats.forEach( (el, i) =>{
        if (Data.snapchats.indexOf(el) != null){
            test.children[Data.snapchats.indexOf(el)].style.color = "red"
        }
    })
}
