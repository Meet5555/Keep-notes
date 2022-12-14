console.log("Welcome to Magic Notes");
showNotes();

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
        <div class="mx-2 my-2 noteCard card" style="width: 18rem;">
            <div class="card-body">
                <h5 id="nTitle" class="card-title">${element.title}</h5>
                <p class="card-text">${element.text}</p>
                <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
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