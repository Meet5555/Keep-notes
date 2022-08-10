console.log("Welcome to Magic Notes");
showNotes();
// localStorage.removeItem('count');
let count = localStorage.getItem("count");
if (count == null) {
    count = 1;
}
localStorage.setItem('count', count);
count++;
mode();

function mode() {
    if ((count % 2) == 0) {
        document.getElementById("bulb").src = "dark theme icon/moon.png";
        count++;
        let body = document.getElementById('body');
        body.classList.remove('dark_back');
        let card_body = document.getElementById('card_body');
        card_body.classList.remove('dark_back');
        let card =document.getElementById('card');
        card.style.border = "";
        let nav = document.getElementById('nav');
        nav.classList.add('bg-light');
        nav.classList.add('navbar-light');
        nav.classList.remove('nav_dark');
        let icon = document.getElementById("icon");
        icon.classList.remove('icon_dark');
        let home = document.getElementById("home");
        home.classList.remove('icon_dark');

        let addTitle = document.getElementById('addTitle');
        addTitle.classList.remove('nav_dark');
        let addBtn = document.getElementById('addBtn');
        addBtn.classList.remove('dark_back_btn');

        let toggleButton = document.getElementById('toggleButton');
        toggleButton.classList.remove('toggleBtn');
    }
    else {
        document.getElementById("bulb").src = "dark theme icon/sun.png";
        count++;
        let body = document.getElementById('body');
        body.classList.add('dark_back');
        let card_body = document.getElementById('card_body');
        card_body.classList.add('dark_back');
        let card =document.getElementById('card');
        card.style.border = `1px solid black`;
        card.style.borderRadius = `0px`;
        let nav = document.getElementById('nav');
        nav.classList.remove('bg-light');
        nav.classList.remove('navbar-light');
        nav.classList.add('nav_dark');
        let icon = document.getElementById("icon");
        icon.classList.add('icon_dark');
        let home = document.getElementById("home");
        home.classList.add('icon_dark');
        let addBtn = document.getElementById('addBtn');
        addBtn.classList.add('dark_back_btn');
        let toggleButton = document.getElementById('toggleButton');
        toggleButton.classList.add('toggleBtn');
    }
    localStorage.setItem('count', count);
}


let addBtn = document.getElementById("addBtn");
addBtn.addEventListener('click', function (e) {
    let addTxt = document.getElementById("addTxt");
    let addTitle = document.getElementById("addTitle");
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let myObj = {
        title: addTitle.value,
        text: addTxt.value
    }
    notesObj.push(myObj);

    localStorage.setItem('notes', JSON.stringify(notesObj));

    addTxt.value = "";
    addTitle.value = "";
    showNotes();

    let search = document.getElementById("searchTxt");
    search.value = "";
})

function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }

    let html = "";
    notesObj.forEach(function (element, index) {
        html += `
        <div id="back_${index}" class="mx-2 my-2 noteCard card" style="width: 18rem;">
            <div class="card-body">
                <h5 id="nTitle" class="card-title">${element.title}</h5>
                <p class="card-text">${element.text}</p>
                <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
                <img src="bulb_off.png" class="imp" id="bulb_${index}" onclick="changeBulb(this.id)">
            </div>
        </div>
        `
       
    });

        let notesElm = document.getElementById('notes');
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    }
    else {
        notesElm.innerHTML = `Nothing to Show!! Use "Add new note" section to add notes! `;
    }

}


function deleteNote(index) {
    // console.log(`i am deleting note no ${++index} `);

    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }

    let title = localStorage.getItem("title");
    if (title == null) {
        notesTitle = [];
    }
    else {
        notesTitle = JSON.parse(title);
    }

    let search = document.getElementById("searchTxt");
    search.value = "";
    notesObj.splice(index, 1);

    localStorage.setItem('notes', JSON.stringify(notesObj));
    showNotes();
}

let search = document.getElementById("searchTxt");

search.addEventListener('input', function () {
    let inputVal = search.value;
    let noteCards = document.getElementsByClassName("noteCard")
    Array.from(noteCards).forEach(function (element) {
        let cardTxt = element.getElementsByTagName('p')[0].innerText;
        // console.log(cardTxt);
        if (cardTxt.includes(inputVal)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
    })
})


function changeBulb(index){
    let bulbCount = localStorage.getItem(`count-${index}`);
    let note = document.getElementById(`${index}`);

    // let back = document.getElementById(`back_${index}`);
    let back = note.parentNode.parentNode;
    console.log(back);
    
    if((bulbCount % 2) == 0){
        note.src = "bulb_on.png"
        bulbCount++;
        back.style.border = '2px solid red';
        back.style.backgroundColor = 'rgba(252, 187, 239,0.4)';
    }
    else{
        note.src = "bulb_off.png"
        bulbCount++;
        back.style.border = '2px solid white';
        back.style.backgroundColor = 'rgb(255,255,255)';
    }
    localStorage.setItem(`count-${index}`,bulbCount);
}
