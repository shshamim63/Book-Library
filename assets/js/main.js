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
  
function addBookToLibrary() {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pageNumbers = document.getElementById("pages").value;
  const readingStatus = document.getElementById("bookReadStatus").value;
  const book = new Book(title, author, pageNumbers, readingStatus);
  bookList.push(book);
}

function clearInputData() {
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("pages").value = "";
  document.getElementById("bookReadStatus").value = "";
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
            <td>${readingStatus}</td>
            <td>
              <button type="button" id="change-${id}" class="btn btn-sm btn-warning"><i class="fas fa-dice"></i> Change status</button>
              <button type="button" id="destroy-${id}" class="btn btn-sm btn-danger"><i class="fas fa-trash-alt"></i></button>
            </td>
          </tr>`
}

{
  document.getElementById('add').addEventListener("click",() => {
    addBookToLibrary();
    clearInputData();
    render();
  });
}