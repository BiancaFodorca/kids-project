import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ResponsesService } from '../../shared/services/responses/responses.service';
import { LocalStorageService } from '../../shared/services/localStorage/local-storage.service';
import { NotificationsService } from 'angular2-notifications';
import { QuestionService } from '../../shared/services/questions/question.service';
import { DailyHelloService } from '../../shared/services/daily-hello/daily-hello.service';

@Component({
  selector: 'app-daily-hello',
  templateUrl: './daily-hello.component.html',
  styleUrls: ['./daily-hello.component.css']
})
export class DailyHelloComponent implements OnInit {
  question = {
    text:
      'Cum vrem sa fim intampinati astazi?'
  };
  typesOfHello = [];
  quote: string;
  existingtResponseId;
  options = {
    timeOut: 5000,
    showProgressBar: true,
    pauseOnHover: false,
    clickToClose: false,
    maxLength: 10
  };

  constructor(
    private _service: NotificationsService,
    private dailyHelloService: DailyHelloService
  ) {
    this.getSelectedTypesOfHello();
  }

  ngOnInit() {}

  getSelectedTypesOfHello() {
    this.dailyHelloService.getAllSelectedTypesOfHello().subscribe(resp => {
      this.typesOfHello = JSON.parse((<any>resp)._body);
    });
  }

  openNotification(message) {
    if (message === 'success') {
      this._service.success(
        'Yupiii! :)',
        'Felicitari, proverbul a fost salvat cu succes!',
        this.options
      );
    } else {
      this._service.error(
        'Ohh, ne pare rau! :(',
        'Proverbul nu a putut fi adaugat. Mai incearca dupa ce ai dat refresh paginii',
        this.options
      );
    }
  }
}
