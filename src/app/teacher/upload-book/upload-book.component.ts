import { Component, OnInit } from '@angular/core';
import { GeneralBookService } from '../../shared/services/books/book-service.service';
import { saveAs as importedSaveAs } from 'file-saver';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-upload-book',
  templateUrl: './upload-book.component.html',
  styleUrls: ['./upload-book.component.css']
})
export class UploadBookComponent implements OnInit {
  fileToUpload: File = null;
  name: string;
  displayMoreInputs = false;
  suplimentedFilesList = [];
  typeSelected = '';
  pastFilesList = [];
  generalTypeSelected = '';
  options = {
    timeOut: 5000,
    showProgressBar: true,
    pauseOnHover: false,
    clickToClose: false,
    maxLength: 10
  };

  constructor(
    private bookService: GeneralBookService,
    private _service: NotificationsService
  ) {}

  ngOnInit() {}

  getAllUploadedFiles(type: string) {
    this.generalTypeSelected = type;
    if (this.generalTypeSelected === 'carte') {
      this.typeSelected = 'Capitole';
    } else if (this.generalTypeSelected === 'atasament') {
      this.typeSelected = 'Atasamente';
    }
    this.bookService.getAllByType(type).subscribe(resp => {
      // this.pastFilesList = JSON.parse(resp._body);
    });
  }

  deleteSelectedBook(name) {
    this.bookService
      .deleteBook(name, this.generalTypeSelected)
      .subscribe(resp => {
        this.getAllUploadedFiles(this.generalTypeSelected);
      });
  }

  downloadSelectedBook(name) {
    this.bookService
      .downloadBookByNameAndType(name, this.generalTypeSelected)
      .subscribe(resp => {
        // importedSaveAs(resp._body, name);
      });
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  handleSuplimentedFileInput(files: FileList) {
    this.suplimentedFilesList.push(files.item(0));
  }

  uploadMoreFiles() {
    this.displayMoreInputs = true;
    this.uploadSelectedFile();
  }

  uploadSelectedFile() {
    let title = this.name;
    if (!this.name) {
      title = this.fileToUpload.name;
    }
    this.bookService.uploadNewBook(this.fileToUpload, title, 'carte').subscribe(
      response => {
        this.openNotification('success', 'cartea', 'salvata');
      },
      error => {
        this.openNotification('error', 'cartea', 'nu a putut fi adaugata');
      }
    );
  }

  uploadSelectedFiles() {
    if (this.suplimentedFilesList.length !== 0) {
      this.suplimentedFilesList.forEach(item => {
        this.bookService
          .uploadNewBook(item, item.name.split('.')[0], 'atasament')
          .subscribe(
            response => {
              this.openNotification('success', 'atasamentele', 'salvate');
            },
            error => {
              this.openNotification(
                'error',
                'atasamentele',
                'nu au putut fi adaugate'
              );
            }
          );
      });
    }
  }

  openNotification(message, type, action) {
    if (message === 'success') {
      this._service.success(
        'Yupiii! :)',
        'Felicitari, ' + type + ' a fost ' + action + ' cu succes!',
        this.options
      );
    } else {
      this._service.error(
        'Ohh, ne pare rau! :(',
        type + ' ' + action + ' . Mai incearca dupa ce ai dat refresh paginii',
        this.options
      );
    }
  }
}
