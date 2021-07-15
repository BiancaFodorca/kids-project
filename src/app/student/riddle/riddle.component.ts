import { Component, OnInit } from '@angular/core';
import { UploadPhotoService } from '../../shared/services/upload-photo/upload-photo.service';
import { LocalStorageService } from '../../shared/services/localStorage/local-storage.service';
import { NotificationsService } from 'angular2-notifications';
import { QuestionService } from '../../shared/services/questions/question.service';
import { RiddleService } from '../../shared/services/riddle/riddle.service';

@Component({
  selector: 'app-riddle',
  templateUrl: './riddle.component.html',
  styleUrls: ['./riddle.component.css']
})
export class RiddleComponent implements OnInit {
  fileToUpload: File = null;
  question = {
    text: 'Incercati sa aflati misterul ghicitorii.'
  };
  riddle = {
    text: "Trece monstrul marea cu parul alb ca sarea. Ce-i?",
    imageUrl: "./././assets/images/cloud.png"
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
    private riddleService: RiddleService
  ) {
    this.getRiddle();
  }

  ngOnInit() {}

  getRiddle() {
    this.riddleService.getAll().subscribe(resp => {
      const response = JSON.parse((<any>resp)._body);
      
      this.riddle = response[response.length - 1];
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
        'Felicitari! :)',
        'Modificarea ghicitorii a fost realizata cu succes!',
        this.options
      );
    } else {
      this._service.error(
        'Ne pare rau! :(',
        'Modificarea ghicitorii nu a fost salvata. Te rugam reincearca, dupa ce ai dat refresh paginii!',
        this.options
      );
    }
  }
}
