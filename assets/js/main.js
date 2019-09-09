const bookList = [];

class Book {
  constructor(title, author, pageNumbers, readingStatus) {
    this.title = title;
    this.author = author;
    this.pageNumbers = pageNumbers;
    this.readingStatus = readingStatus;
    this.bookId = Math.random().toString(32).substr(2, 9);
  }
}

function addBookToLibrary(args) {
  const book = new Book(...args);
  bookList.push(book);
}

function loadBookInfo() {
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pageNumbers = document.getElementById('pages').value;
  const readingStatus = document.getElementById('bookReadStatus').value;
  return [title, author, pageNumbers, readingStatus];
}

function clearInputData() {
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('pages').value = '';
}

function template({
  bookId, title, author, pageNumbers, readingStatus,
}) {
  let bgcolor = '';
  if (readingStatus === 'Not Started yet') {
    bgcolor = 'bg-danger';
  } else if (readingStatus === 'Finished') {
    bgcolor = 'bg-success';
  } else {
    bgcolor = 'bg-info';
  }
  return `<tr class = ${bgcolor} id = "row-${bookId}">
            <th scope="row">${bookId.toUpperCase()}</th>
            <td>${title}</td>
            <td>${author}</td>
            <td>${pageNumbers}</td>
            <td id = "readingstatus-${bookId}">${readingStatus}</td>
            <td>
              <button type="button" onclick="changeStatus(this)" id="change-${bookId}" class="btn btn-sm btn-warning statusbtn" ><i class="fas fa-dice"></i> Change status</button>
              <button type="button" onclick="deleteBook(this)" id="destroy-${bookId}" class="btn btn-sm btn-danger deletebtn"><i class="fas fa-trash-alt"></i></button>
            </td>
          </tr>`;
}


function render() {
  if (bookList.length > 0) {
    const contentBody = document.querySelector('#bookData');
    let html = '';
    bookList.forEach(book => {
      html += template(book);
    });
    contentBody.innerHTML = html;
  }
}

function bookIndexOf(id) {
  return bookList.findIndex((i) => i.bookId === id);
}

function deleteFromList(id) {
  bookList.splice(id, 1);
}

function deleteBook(deleteElement) {
  const bookId = deleteElement.id.split('-')[1];
  deleteFromList(bookIndexOf(bookId));
  const elem = document.querySelector(`#row-${bookId}`);
  elem.parentNode.removeChild(elem);
}

function bookInfoUpdate(changedStatus, id) {
  bookList.find((eachbook) => eachbook.bookId === id).readingStatus = changedStatus;
}


function changeStatus(curBtnId) {
  const [notStarted, finished, reading] = ['Not Started yet', 'Finished', 'Reading'];
  const bookId = curBtnId.id.split('-')[1];
  const currentStatus = document.querySelector(`#readingstatus-${bookId}`);
  const currentRow = document.querySelector(`#row-${bookId}`);
  if (currentStatus.innerText === notStarted) {
    bookInfoUpdate(finished, bookId);
    currentStatus.innerText = finished;
    currentRow.className = 'bg-success';
  } else if (currentStatus.innerText === finished) {
    bookInfoUpdate(reading, bookId);
    currentStatus.innerText = reading;
    currentRow.className = 'bg-info';
  } else {
    bookInfoUpdate(notStarted, bookId);
    currentStatus.innerText = notStarted;
    currentRow.className = 'bg-danger';
  }
}

document.getElementById('add').addEventListener('click', () => {
  addBookToLibrary(loadBookInfo());
  clearInputData();
  render();
});
