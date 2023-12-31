'use strict';

const myLibrary = [];
const booksEl = document.querySelector('.books');
const addBtn = document.querySelector('.btn-add-book');
const form = document.querySelector('form');
const inputTitle = document.querySelector('.title');
const inputAuthor = document.querySelector('.author');
const inputPages = document.querySelector('.pages');
const inputStatus = document.querySelector('.status');

const showBook = function (book, index) {
  const el = `
    <div class="book" data-index="${index}">
        <h1 class="title">${book.title}</h1>
        <h2 class="author">By ${book.author}</h2>
        <h5 class="pages">${book.numberOfPages} pages</h5>
        <h5 class="status" data-status = "${book.status}">${
    book.status ? 'read' : 'want to read'
  }</h5>
        <h3 class="delete"> remove book? </h3>
    </div>`;

  booksEl.insertAdjacentHTML('afterbegin', el);
};

const displayBooks = function () {
  booksEl.innerHTML = '';
  myLibrary.forEach(showBook.bind());
};

// TODO: Add a function that fixes the capitalization of the name of the book and title
const addBookToLibrary = function (author, title, noOfPages, read = false) {
  const book = {
    title: title,
    author: author,
    numberOfPages: noOfPages,
    status: read,
  };
  myLibrary.push(book);

  showBook(book, myLibrary.length - 1);
};

const removeBook = function (index) {
  myLibrary.splice(index, 1);
  console.log(myLibrary);
  displayBooks();
};

const updateStatus = function (index) {
  myLibrary[index].status = !myLibrary[index].status;

  const allBooks = document.querySelectorAll('.book');
  allBooks.forEach(element => {
    if (element.dataset.index === index) {
      const status = element.querySelector('.status');
      status.innerHTML = status.dataset.status ? 'read' : 'want to read';
    }
  });
};

// TODO: Create a modal that queries the user to remove the data
booksEl.addEventListener('click', function (element) {
  const book = element.target;

  console.log(book.closest('div'));
  if (book.className === 'delete')
    removeBook(book.closest('div').dataset.index);

  if (book.className === 'status')
    updateStatus(book.closest('div').dataset.index);
});

addBtn.addEventListener('click', function (event) {
  console.log('click!');
});

form.addEventListener('submit', function (event) {
  event.preventDefault();

  addBookToLibrary(
    inputAuthor.value,
    inputTitle.value,
    inputPages.value,
    inputStatus.checked
  );
});

addBookToLibrary('Jonathan Stroud', 'The Screaming Staircase', 358, true);
addBookToLibrary('George Orwell', '1984', 256, true);
addBookToLibrary('Fyodor Dostoevsky', 'The Idiot', 456, false);
addBookToLibrary('Albert Camus', 'The Myth of Sisyphus', 136, true);
addBookToLibrary('Leigh Bardugo', 'The Crooked Kingdom', 358, true);
