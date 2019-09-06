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
  let title = document.getElementById("title").value;
  let author = document.getElementById("author").value;
  let pageNumbers = document.getElementById("pages").value;
  let readingStatus = document.getElementById("bookReadStatus").value;
  let book = new Book(title, author, pageNumbers, readingStatus);
  bookList.push(book);
  console.log(bookList);
}

function render() {
  if (bookList.length > 0) {
    let contentBody = document.querySelector("#bookData");
    let datas = "";
    for (const item of bookList) {
      datas += template(
        item.bookId,
        item.title,
        item.author,
        item.pageNumbers,
        item.readingStatus
      );
    }
    contentBody.innerHTML = datas;
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
  document.getElementById('add').addEventListener("click", addBookToLibrary());
  render();
}