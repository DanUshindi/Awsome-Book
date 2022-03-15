const author = document.querySelector('#author');
const title = document.querySelector('#title');
const addBookForm = document.querySelector('#add-book');
const list = document.querySelector('.list');
const inputs = document.querySelector('.inputs')
let books = [];

function addBook(author, title, books) {
  const id = books.length + 1;
  const bookData = {
    id,
    author,
    title
  };
  books.push(bookData);
}

function removeBook(id, books){
  books.forEach((book) => {
    if(book.id === id) {
      books.splice(books.indexOf(book), 1);
    }
  })
}

function displayBooks(list, books) {
  list.innerHTML = "";
  books.forEach((book) =>{
    const li = `<li><p>${book.author}</p>
                <h3>${book.title}</h3>
                <button id="${book.id}" class="remove-btn">remove</button></li><hr />`;
    list.innerHTML += li;
  });
}

const setStorage = (data) => {
  const formData = JSON.stringify(data);
  localStorage.setItem('books', formData);
}

const getStorage = (key) => {
  const data = JSON.parse(localStorage.getItem(key));
  return data;
}

addBookForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if(author.value === '' || title.value === ''){
    e.preventDefault();
  }else {
    addBook(author.value, title.value, books);
    setStorage(books);
    displayBooks(list, books);
    e.target.reset();
  }
})

document.addEventListener('click', (e) => {
  if(e.target && e.target.classList.contains('remove-btn')){
    const id= parseInt(e.target.id)
    removeBook(id, books);
    setStorage(books);
    displayBooks(list, books);
    console.log(e.target);
  }
})


document.addEventListener('DOMContentLoaded', () => {
  if(localStorage.getItem('books')) {
    books = getStorage('books');
    displayBooks(list, books);
    console.log(books);
  }
})
