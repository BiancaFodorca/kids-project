import { Component, OnInit } from "@angular/core";
import { GeneralBookService } from "../../shared/services/books/book-service.service";
import { saveAs as importedSaveAs } from "file-saver";
import { LocalStorageService } from "../../shared/services/localStorage/local-storage.service";

@Component({
  selector: "app-download-book",
  templateUrl: "./download-book.component.html",
  styleUrls: ["./download-book.component.css"]
})
export class DownloadBookComponent implements OnInit {
  linkBook = null;
  linkAttachmentsList = [];
  bookList = [];
  selectedBook;

  constructor(
    private bookService: GeneralBookService,
    private locaStorageService: LocalStorageService
  ) {
    this.getAllBooks();
    this.getAllAttachements();
  }

  ngOnInit() {}

  getAllBooks() {
    this.bookService.getAllByType("carte").subscribe(response => {
      // this.bookList = JSON.parse(response._body);
    });
  }

  getAllAttachements() {
    this.bookService.getAllByType("atasament").subscribe(response => {
      // this.linkAttachmentsList = JSON.parse(response._body);
    });
  }

  selectBookFromList(event) {
    this.linkBook = event.target.value;
    this.bookList.forEach(item => {
      if (item.fileName === event.target.value) {
        this.selectedBook = item;
      }
    });
  }

  downloadBook(name, type) {
    const idBook = this.selectedBook.id.toString();
    if (type === "carte") {
      this.locaStorageService.set("bookId", idBook);
      this.locaStorageService.set("bookName", this.selectedBook.fileName);
    }
    this.bookService
      .downloadBookByNameAndType(name, type)
      .subscribe(response => {
        // importedSaveAs(response._body, name);
      });
  }
}
