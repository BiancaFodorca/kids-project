import { Component, OnInit } from '@angular/core';
import { TodayImportanceService } from '../../shared/services/today-importance/today-importance-service.service';
import { saveAs as importedSaveAs } from 'file-saver';
import { NotificationsService } from 'angular2-notifications';
import { RiddleService } from '../../shared/services/riddle/riddle.service';

@Component({
  selector: 'app-upload-book',
  templateUrl: './upload-book.component.html',
  styleUrls: ['./upload-book.component.css']
})
export class UploadBookComponent implements OnInit {
  fileToUpload: File = null;
  riddleText: string;
  oldRiddle = "Trece monstrul marea cu parul alb ca sarea. Ce-i?";
  displayMoreInputs = false;
  errorText = "";
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
    private riddleService: RiddleService,
    private _service: NotificationsService
  ) {}

  ngOnInit() {}


  saveRiddle() {
    this.errorText = "";
    if (this.riddleText && this.fileToUpload) {
      this.oldRiddle = this.riddleText;
      this.riddleService.uploadRiddle(this.fileToUpload, this.riddleText).subscribe(resp => {
        this.openNotification("success");
      }, error => {
        this.openNotification("error");
      }
        )
    } else {
      this.errorText = "Ne pare rau, insa atat textul cat si fotografie trebuie adaugate pentru a putea schimba ghicitoarea.";
    }
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  openNotification(message) {
    if (message.substring(0, 4) === 'succ') {
      this._service.success(
        'Yupiii! :)',
        'Felicitari, ghicitoarea a fost adaugata cu succes!',
        this.options
      );
    } else {
      this._service.error(
        'Ohh, ne pare rau! :(',
        'Ghicitoarea nu au putut fi adaugata. Mai incearca dupa ce ai dat refresh paginii',
        this.options
      );
    }
  }
}
