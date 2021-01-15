import { Component, OnInit } from '@angular/core';
import { UploadPhotoService } from '../../shared/services/upload-photo/upload-photo.service';
import { LocalStorageService } from '../../shared/services/localStorage/local-storage.service';
import { NotificationsService } from 'angular2-notifications';
import { QuestionService } from '../../shared/services/questions/question.service';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css']
})
export class UploadImageComponent implements OnInit {
  fileToUpload: File = null;
  question = {
    text: 'Incarcati o fotografie sugestiva textului citit.'
  };
  imageUploaded = null;
  bookId;
  noSelectedBook = true;
  options = {
    timeOut: 5000,
    showProgressBar: true,
    pauseOnHover: false,
    clickToClose: false,
    maxLength: 10
  };
  exerciceNumber = 4;

  constructor(
    private uploadImgService: UploadPhotoService,
    private lsService: LocalStorageService,
    private _service: NotificationsService,
    private questionService: QuestionService
  ) {
    this.getBookId();
    this.getQuestionSentence();
  }

  ngOnInit() {}

  getQuestionSentence() {
    this.questionService
      .getQuestionByExerciseNumber(this.exerciceNumber)
      .subscribe(resp => {
        // this.question.text = JSON.parse(resp._body).question;
      });
  }

  handleFileInput(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.fileToUpload = file;
      };
    }
  }

  getBookId() {
    this.bookId = this.lsService.get('bookId');
    if (this.bookId) {
      this.noSelectedBook = false;
    }
  }

  savePhoto() {
    this.uploadImgService
      .uploadNewPhoto(4, this.bookId, this.fileToUpload)
      .subscribe(
        resp => {
          this.openNotification('success');
        },
        error => {
          this.openNotification('error');
        }
      );
  }

  openNotification(message) {
    if (message === 'success') {
      this._service.success(
        'Yupiii! :)',
        'Felicitari, imaginea a fost salvata cu succes!',
        this.options
      );
    } else {
      this._service.error(
        'Ohh, ne pare rau! :(',
        'Imaginea nu a putut fi adaugata. Mai incearca dupa ce ai dat refresh paginii.',
        this.options
      );
    }
  }
}
