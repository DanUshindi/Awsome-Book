const author = document.querySelector('#author');
const title = document.querySelector('#title');
const addBookForm = document.querySelector('#add-book');
const list = document.querySelector('.list');

class Bookstore {
  constructor() {
    this.books = [];
  }

  addBook(author, title) {
    const id = this.books.length + 1;
    const bookData = {
      id,
      author,
      title,
    };
    this.books.push(bookData);
  }

  removeBook(id) {
    this.books.forEach((book) => {
      if (book.id === id) {
        this.books.splice(this.books.indexOf(book), 1);
      }
    });
  }

  displayBooks(list) {
    list.innerHTML = '';
    this.books.forEach((book) => {
      const li = `<li><div class="list-container"><h3>"${book.title}"</h3>
                  <p>by ${book.author}</p></div>
                  <button id="${book.id}" class="remove-btn">Remove</button></li>`;
      list.innerHTML += li;
    });
  }

  setStorage = () => {
    const formData = JSON.stringify(this.books);
    localStorage.setItem('books', formData);
  };

  getStorage = (key) => {
    this.books = JSON.parse(localStorage.getItem(key));
    return this.books;
  };
}

const bookStore = new Bookstore();

addBookForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if (author.value.trim() !== '' && title.value.trim() !== '') {
    bookStore.addBook(author.value, title.value);
    bookStore.setStorage();
    bookStore.displayBooks(list);
    e.target.reset();
  }
});

document.addEventListener('click', (e) => {
  if (e.target && e.target.classList.contains('remove-btn')) {
    const id = parseFloat(e.target.id);
    bookStore.removeBook(id);
    bookStore.setStorage();
    bookStore.displayBooks(list);
  }
});

document.addEventListener('DOMContentLoaded', () => {
  if (bookStore.getStorage('books')) {
    bookStore.getStorage('books');
    bookStore.displayBooks(list);
  }
});