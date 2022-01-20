//Book Class: Represents a Book
class Book {
    constructor(title, author, pages, isRead) {
        isRead = false;
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.isRead = isRead;
    }
}

//UI Class: Handle UI Tasks
class UI {
    static displayBooks() {
        
        const books = Store.getBooks();

        books.forEach((book) => {
            UI.addBookToList(book)
        })
    }
    static addBookToList(book) {
        const list = document.getElementById('book-list');
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.pages}</td>
            <td>${book.read}</td>
            <td><a href='#' class='delete'>X</a></td>
        `;
        list.appendChild(row);
    }
    static deleteBook(element) {
        if (element.classList.contains('delete')) {
            element.parentElement.parentElement.remove();
        }
    }

    static showAlert(message) {
        const titleAlert = document.getElementById('title');
        const authorAlert = document.getElementById('author');
        const pageAlert = document.getElementById('pages');
        titleAlert.placeholder = message;
        authorAlert.placeholder = message;
        pageAlert.placeholder = message;
        // Vanish in 3 seconds
        setTimeout(() => titleAlert.removeAttribute('placeholder'),3000);
        setTimeout(() => authorAlert.removeAttribute('placeholder'), 3000);
        setTimeout(() => pageAlert.removeAttribute('placeholder'), 3000);
    }

    static successAlert(message) {
        const div = document.querySelector('.success-remove-message');
        div.style.display = 'flex';
        div.style.justifyContent = 'center';
        div.style.color = '#4BB543';
        div.style.fontSize = '3rem'
        div.textContent = message;
        setTimeout(() => div.style.display = 'none', 3000);
    }

    static removeAlert(message) {
        const div = document.querySelector('.success-remove-message')
        div.style.display = 'flex';
        div.style.justifyContent = 'center';
        div.style.color = 'red';
        div.style.fontSize = '3rem';
        div.textContent = message;
        setTimeout(() => div.style.display = 'none', 3000);
    }


    static clearFields() {
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('pages').value = '';
        document.getElementById('slider-control').checked = false;
    }
}

//Store Class: Handles Storage(Local Storage);
class Store {
    static getBooks() {
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }
    static addBook(book) {
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }
    static removeBook(title) {
        const books = Store.getBooks();
        books.forEach((book, index) => {
            if (book.title === title) {
                books.splice(index, 1);
            }
        });
        localStorage.setItem('books', JSON.stringify(books));
    }
}

//Event: Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks);

//Event: Add Book
document.getElementById('book-form').addEventListener('submit', (e) => {
    //Prevent actual submit
    e.preventDefault();
    
    //Get form values
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const isReadCheck = document.getElementById('slider-control');

    //Validate
    if (title === '' || author === '' || pages === '') {
        UI.showAlert('*Please fill in all fields');
        return;
    } 

    //Instantiate Book
    const book = new Book(title, author, pages);
    if (isReadCheck.checked) {
        book.isRead = true;
        book.read = 'Read'
    } else if (!isReadCheck.checked) {
        book.isRead = false;
        book.read = 'Not Read'
    }
    console.log(book);
    //Add Book to UI
    UI.addBookToList(book);

    //Add Book to Store
    Store.addBook(book);

    //Success Message
    UI.successAlert('Success!  Book Added')

    //Clear Fields
    UI.clearFields()
})

//Event: Remove a Book
document.getElementById('book-list').addEventListener('click', (e) => {
    UI.deleteBook(e.target);
    Store.removeBook(e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.textContent);
    UI.removeAlert('Book Removed');
})









