let bookList = [];

class Book {
  constructor(title, author, pageNumbers, readingStatus) {
    this.title = title;
    this.author = author;
    this.pageNumbers = pageNumbers;
    this.readingStatus = readingStatus;
    this.bookId = Math.random().toString(32).substr(2, 9);
  }
}
  
function addBookToLibrary( args ) {
  const book = new Book(...args);
  bookList.push(book);
}

function loadBookInfo(){
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pageNumbers = document.getElementById("pages").value;
  const readingStatus = document.getElementById("bookReadStatus").value;
  return [title, author, pageNumbers, readingStatus];
}

function clearInputData() {
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("pages").value = "";
}

function render() {
  if (bookList.length > 0) {
    const contentBody = document.querySelector("#bookData");
    let html = "";
    for (const item of bookList) {
      html += template(
        item.bookId,
        item.title,
        item.author,
        item.pageNumbers,
        item.readingStatus
      );
    }
    contentBody.innerHTML = html;
  }
}

function bookInfoUpdate(changedStatus, id) {
  bookList.find( eachbook => eachbook.bookId === id).readingStatus = changedStatus;
}


function changeStatus(curBtnId) {
  const possibleStatus = [ "Not Started yet", "Finished", "Reading" ];
  let bookId = curBtnId.id.split("-")[1];
  let currentStatus = document.querySelector(`#readingstatus-${bookId}`);
  if (currentStatus.innerText === possibleStatus[0]) {
    bookInfoUpdate(possibleStatus[1], bookId);
    currentStatus.innerText = possibleStatus[1];
  } else if(currentStatus.innerText === possibleStatus[1]){
    bookInfoUpdate(possibleStatus[2], bookId);
    currentStatus.innerText = possibleStatus[2];
  } else {
    bookInfoUpdate(possibleStatus[0], bookId);
    currentStatus.innerText = possibleStatus[0];
  }
}


function template(id, title, author, pageNumbers, readingStatus){
  let bgcolor = "";
  if (readingStatus === "Not Started yet") {
    bgcolor = "bg-danger";
  } else if (readingStatus === "Finished") {
    bgcolor = "bg-success";
  } else {
    bgcolor = "bg-info";
  }
  return `<tr class = ${bgcolor}>
            <th scope="row">${id.toUpperCase()}</th>
            <td>${title}</td>
            <td>${author}</td>
            <td>${pageNumbers}</td>
            <td id = "readingstatus-${id}">${readingStatus}</td>
            <td>
              <button type="button" onclick="changeStatus(this)" id="change-${id}" class="btn btn-sm btn-warning statusbtn" ><i class="fas fa-dice"></i> Change status</button>
              <button type="button" onclick="deleteBook(this)" id="destroy-${id}" class="btn btn-sm btn-danger deletebtn"><i class="fas fa-trash-alt"></i></button>
            </td>
          </tr>`
}


document.getElementById('add').addEventListener("click",() => {
  addBookToLibrary(loadBookInfo());
  clearInputData();
  render();
});
