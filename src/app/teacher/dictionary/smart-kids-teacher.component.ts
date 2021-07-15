import { Component, OnInit } from '@angular/core';
import { SmartKidsService } from '../../smart-kids.service';
import { Subscription } from 'rxjs/Subscription';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-smart-kids-teacher',
  templateUrl: './smart-kids-teacher.component.html',
  styleUrls: ['./smart-kids-teacher.component.css']
})
export class SmartKidsTeacherComponent implements OnInit {
  title;
  description;
  link;
  fileToUpload1: File = null;
  fileToUpload2: File = null;
  infoForToday = {
    title: "Sistemul solar",
    image: ["./././assets/images/sistem-solar.jpg", "./././assets/images/sistem-solar2.jpg"],
    link: "https://www.descopera.org/sistemul-solar/",
    description: "Sistemul nostru solar cuprinde Soarele, cele opt planete, 162 de sateliti naturali ai acestora, 3 planete pitice si corpuri mici: asteorizi, comete, praf, meteoriti etc. Toate planetele orbiteaza in jurul Soarelui, acesta avand peste 99% din masa totala a sistemului solar."
  }
  options = {
    timeOut: 5000,
    showProgressBar: true,
    pauseOnHover: false,
    clickToClose: false,
    maxLength: 10
  };

  constructor(
    private smartKidsService: SmartKidsService,
    private _service: NotificationsService
  ) {

  }

  ngOnInit() {
  }

  handleFileInput(files: FileList, order: string) {
    if(order === "first") {
      this.fileToUpload1 = files.item(0);
    } else if(order === "second") {
      this.fileToUpload2 = files.item(0);
    }
  }

  
  saveLessonInformation() {
    this.smartKidsService.uploadLesson(this.fileToUpload1, this.fileToUpload2,this.title,this.link, this.description).subscribe(resp => {
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
