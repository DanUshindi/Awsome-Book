const author = document.querySelector('#author');
const title = document.querySelector('#title');
const addBookForm = document.querySelector('#add-book');
const list = document.querySelector('.list');
// let books = [];

// addBook(author, title, books) {
//   const id = books.length + 1;
//   const bookData = {
//     id,
//     author,
//     title,
//   };
//   books.push(bookData);
// }

// removeBook(id, books) {
//   books.forEach((book) => {
//     if (book.id === id) {
//       books.splice(books.indexOf(book), 1);
//     }
//   });
// }

// displayBooks(list, books) {
//   list.innerHTML = '';
//   books.forEach((book) => {
//     const li = `<li><p>${book.author}</p>
//                 <h3>${book.title}</h3>
//                 <button id="${book.id}" class="remove-btn">remove</button></li><hr />`;
//     list.innerHTML += li;
//   });
// }

// const setStorage = (data) => {
//   const formData = JSON.stringify(data);
//   localStorage.setItem('books', formData);
// };

// const getStorage = (key) => {
//   const data = JSON.parse(localStorage.getItem(key));
//   return data;
// };

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
      const li = `<li><p>${book.author}</p>
                  <h3>${book.title}</h3>
                  <button id="${book.id}" class="remove-btn">remove</button></li><hr />`;
      list.innerHTML += li;
    });
  }

  setStorage = () => {
    const formData = JSON.stringify(this.books);
    localStorage.setItem('books', formData);
  };

  getStorage = (key) => {
    const data = JSON.parse(localStorage.getItem(key));
    return data;
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
  if (localStorage.getItem('books')) {
    bookStore.getStorage('books');
    bookStore.displayBooks(list);
  }
});