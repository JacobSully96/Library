let myLibrary = [];

function Book(title, author, pages, read) {
    //the constructor, initializing a book object
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

// IMPORTANT
// Every instance of a book will have this function for toggling the read status
// Good for efficiency (not having to 'create' a function for every book)
Book.prototype.toggleRead = function() {
    this.read = !this.read;
}

function toggleRead(index){
    myLibrary[index].toggleRead();
    render();
}

function render(){
    let libraryEl = document.querySelector("#library");
    libraryEl.innerHTML = "";
    for(let i = 0; i < myLibrary.length; i++){
        let book = myLibrary[i];
        let bookEl = document.createElement("div");
        bookEl.setAttribute("class", "book-card");
        
        bookEl.innerHTML = `
        <div class="card-header">
            <h3 class="title">${book.title}</h3>
            <h5 class="author">${book.author}</h5>
        </div>
        <div class="card-body">
            <p>${book.pages}</p>
            <p class="read-status">${book.read ? "Read" : "Not Read Yet"}</p>
            <button class="remove-btn" onclick="removeBook(${i})">Remove</button>
            <button class="toggle-read-btn" onclick="toggleRead(${i})">Toggle Read</button>
        </div>
        `;
        

        libraryEl.appendChild(bookEl);
    }
}

function removeBook(index){
    myLibrary.splice(index, 1);
    render();
}

function addBookToLibrary() {
    let title = document.querySelector("#title").value;
    let author = document.getElementById("author").value;
    let pages = document.getElementById("pages").value;
    let read = document.getElementById("read").checked;

    let newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    console.log(myLibrary);
    render();
}

let newBookBtn = document.querySelector("#new-book-btn");

// Blue new book button
newBookBtn.addEventListener("click", function () {
    let newBookForm = document.querySelector("#new-book-form");
    console.log(newBookForm);
    newBookForm.style.display = "block";
})

// Event listener for Add Book button in the form
document.querySelector("#new-book-form").addEventListener("submit", function(event){
    event.preventDefault();
    addBookToLibrary();
})