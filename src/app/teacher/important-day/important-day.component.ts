import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
import { TodayImportanceService } from '../../shared/services/today-importance/today-importance-service.service';

@Component({
  selector: 'app-important-day',
  templateUrl: './important-day.component.html',
  styleUrls: ['./important-day.component.css']
})
export class ImportantDayComponent implements OnInit {
  fileToUpload: File = null;
  title;
  description;
  eventTypes = [
    { type: "GIRL_BDAY", name: "Aniversare fetita"},
    { type: "BOY_BDAY", name: "Aniversare baietel"},
    { type: "GENERIC_EVENT", name: "Eveniment generic"}
  ];
  eventType = "";
  options = {
    timeOut: 5000,
    showProgressBar: true,
    pauseOnHover: false,
    clickToClose: false,
    maxLength: 10
  };

  constructor(
    private _service: NotificationsService,
    private todayImportanceService: TodayImportanceService
  ) {
  }

  ngOnInit() {

  }


  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  saveInformationAboutTodayImportance() {
    this.todayImportanceService.uploadTodayImportance(this.fileToUpload,this.title,this.eventType, this.description).subscribe(resp => {
      this.openNotification("success");
    }, err => {
      this.openNotification("error");
    })
  }

  openNotification(message) {
    if (message.substring(0, 4) === 'succ') {
      this._service.success(
        'Yupiii! :)',
        'Felicitari, informatiile au fost adaugate cu succes!',
        this.options
      );
    } else {
      this._service.error(
        'Ohh, ne pare rau! :(',
        'Informatiile nu au putut fi adaugate. Mai incearca dupa ce ai dat refresh paginii',
        this.options
      );
    }
  }
}
